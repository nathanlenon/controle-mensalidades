const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const { existsSync } = require("node:fs");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || (process.env.RENDER ? "0.0.0.0" : "127.0.0.1");
const DB_PATH = path.resolve(process.env.DATABASE_FILE || path.join(ROOT, "data", "database.json"));
const DATA_DIR = path.dirname(DB_PATH);
const HISTORY_LIMIT = 5000;
let dbQueue = Promise.resolve();

const seedState = {
  students: [
    {
      code: "A0001",
      name: "João Paulo Silva Ximenes Bandeira de Almeida",
      cpf: "",
      email: "",
      group: "Baby - Tarde",
      enrollment: "2026-01-06",
      monthlyDueDate: "",
      leaveDate: "",
      chargeLeaveMonth: true,
    },
    {
      code: "A0002",
      name: "Maria José Bezerra da Silva",
      cpf: "",
      email: "",
      group: "Adulto - Tarde",
      enrollment: "2026-02-02",
      monthlyDueDate: "",
      leaveDate: "",
      chargeLeaveMonth: true,
    },
  ],
  payments: [],
  settings: {
    groups: ["Adulto - Tarde", "Adulto - Noite", "Crianças - Tarde", "Baby - Tarde"],
    methods: ["Dinheiro", "Crédito", "Débito", "Pix"],
    defaultAmount: 0,
    referenceMonth: 4,
    reference: "2026-04",
  },
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
};

function jsonResponse(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(data));
}

function notFound(res) {
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
}

async function ensureDb() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  if (!existsSync(DB_PATH)) {
    await writeDb({
      state: seedState,
      history: [],
      meta: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }
}

async function readDb() {
  await ensureDb();
  const raw = await fs.readFile(DB_PATH, "utf8");
  const parsed = JSON.parse(raw);
  return {
    state: sanitizeState(parsed.state || seedState),
    history: Array.isArray(parsed.history) ? parsed.history : [],
    meta: parsed.meta || {},
  };
}

async function writeDb(db) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const payload = JSON.stringify(db, null, 2);
  const tempPath = `${DB_PATH}.tmp`;
  await fs.writeFile(tempPath, payload, "utf8");
  await fs.rename(tempPath, DB_PATH);
}

function sanitizeState(candidate) {
  const state = {
    students: Array.isArray(candidate.students) ? candidate.students : seedState.students,
    payments: Array.isArray(candidate.payments) ? candidate.payments : seedState.payments,
    settings: { ...seedState.settings, ...(candidate.settings || {}) },
  };
  state.students = state.students.map((student) => ({
    code: String(student.code || ""),
    name: String(student.name || ""),
    cpf: String(student.cpf || "").replace(/\D/g, ""),
    email: String(student.email || ""),
    group: String(student.group || ""),
    enrollment: String(student.enrollment || "2026-01-01"),
    monthlyDueDate: String(student.monthlyDueDate || ""),
    leaveDate: String(student.leaveDate || ""),
    chargeLeaveMonth: Boolean(student.chargeLeaveMonth ?? true),
  }));
  state.payments = state.payments.map((payment) => ({
    id: String(payment.id || `P${Date.now()}`),
    studentCode: String(payment.studentCode || ""),
    studentName: String(payment.studentName || ""),
    month: clamp(Number(payment.month) || 1, 1, 12),
    amount: Number(payment.amount || 0),
    method: String(payment.method || state.settings.methods[0] || "Pix"),
    paidAt: String(payment.paidAt || new Date().toISOString().slice(0, 10)),
    note: String(payment.note || ""),
    createdAt: String(payment.createdAt || new Date().toISOString()),
  }));
  state.settings.groups = Array.isArray(state.settings.groups) ? state.settings.groups : seedState.settings.groups;
  state.settings.methods = Array.isArray(state.settings.methods) ? state.settings.methods : seedState.settings.methods;
  state.settings.defaultAmount = Number(state.settings.defaultAmount || 0);
  state.settings.referenceMonth = clamp(Number(state.settings.referenceMonth) || 4, 1, 12);
  state.settings.reference = state.settings.reference || `2026-${String(state.settings.referenceMonth).padStart(2, "0")}`;
  return state;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function withDbLock(operation) {
  const run = dbQueue.then(operation, operation);
  dbQueue = run.catch(() => {});
  return run;
}

async function handleApi(req, res, url) {
  if (req.method === "OPTIONS") {
    jsonResponse(res, 204, {});
    return;
  }

  if (url.pathname === "/api/health" && req.method === "GET") {
    jsonResponse(res, 200, {
      ok: true,
      storage: process.env.DATABASE_FILE ? "external" : "local",
    });
    return;
  }

  if (url.pathname === "/api/state" && req.method === "GET") {
    const db = await readDb();
    jsonResponse(res, 200, {
      state: db.state,
      history: db.history.slice(0, 100),
      meta: db.meta,
    });
    return;
  }

  if (url.pathname === "/api/state" && (req.method === "PUT" || req.method === "POST")) {
    const body = await readBody(req);
    const db = await withDbLock(async () => {
      const current = await readDb();
      current.state = sanitizeState(body.state || seedState);
      current.meta = {
        ...(current.meta || {}),
        updatedAt: new Date().toISOString(),
      };
      await writeDb(current);
      return current;
    });
    jsonResponse(res, 200, { ok: true, state: db.state, meta: db.meta });
    return;
  }

  if (url.pathname === "/api/history" && req.method === "GET") {
    const limit = clamp(Number(url.searchParams.get("limit")) || 100, 1, HISTORY_LIMIT);
    const db = await readDb();
    jsonResponse(res, 200, { history: db.history.slice(0, limit) });
    return;
  }

  if (url.pathname === "/api/history" && req.method === "POST") {
    const body = await readBody(req);
    const db = await withDbLock(async () => {
      const current = await readDb();
      const entry = {
        ...(body.entry || {}),
        id: body.entry?.id || `H${Date.now()}`,
        createdAt: body.entry?.createdAt || new Date().toISOString(),
      };
      current.history = [entry, ...current.history].slice(0, HISTORY_LIMIT);
      current.meta = {
        ...(current.meta || {}),
        updatedAt: new Date().toISOString(),
      };
      await writeDb(current);
      return current;
    });
    jsonResponse(res, 200, { ok: true, history: db.history.slice(0, 100) });
    return;
  }

  notFound(res);
}

async function serveStatic(req, res, url) {
  let requestedPath = decodeURIComponent(url.pathname);
  if (requestedPath === "/") requestedPath = "/index.html";
  const filePath = path.normalize(path.join(ROOT, requestedPath));
  if (!filePath.startsWith(ROOT)) {
    notFound(res);
    return;
  }
  try {
    const extension = path.extname(filePath).toLowerCase();
    const body = await fs.readFile(filePath);
    res.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(body);
  } catch (error) {
    notFound(res);
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || `127.0.0.1:${PORT}`}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }
    await serveStatic(req, res, url);
  } catch (error) {
    console.error(error);
    jsonResponse(res, 500, { error: "Erro interno do servidor" });
  }
});

server.listen(PORT, HOST, () => {
  const displayHost = HOST === "0.0.0.0" ? "127.0.0.1" : HOST;
  console.log(`Raiz JJC Mensalidades rodando em http://${displayHost}:${PORT}`);
});
