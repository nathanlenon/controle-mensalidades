const HISTORY_LIMIT = 5000;
let pool;
let Pool;

const seedState = {
  students: [
    {
      code: "A0001",
      name: "Joao Paulo Silva Ximenes Bandeira de Almeida",
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
      name: "Maria Jose Bezerra da Silva",
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
    groups: ["Adulto - Tarde", "Adulto - Noite", "Criancas - Tarde", "Baby - Tarde"],
    methods: ["Dinheiro", "Credito", "Debito", "Pix"],
    defaultAmount: 0,
    referenceMonth: 4,
    reference: "2026-04",
  },
};

function jsonResponse(statusCode, data) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(data),
  };
}

function emptyResponse(statusCode) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
      "Cache-Control": "no-store",
    },
    body: "",
  };
}

function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL nao foi configurada no Netlify.");
  }
  if (!pool) {
    if (!Pool) {
      ({ Pool } = require("pg"));
    }
    pool = new Pool({
      connectionString,
      ssl: process.env.PGSSLMODE === "disable" ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

function createSeedDb() {
  const now = new Date().toISOString();
  return {
    state: seedState,
    history: [],
    meta: {
      createdAt: now,
      updatedAt: now,
    },
  };
}

function normalizeDb(db) {
  return {
    state: sanitizeState(db.state || seedState),
    history: Array.isArray(db.history) ? db.history : [],
    meta: db.meta || {},
  };
}

async function ensureDb(client) {
  await client.query(`
    create table if not exists app_store (
      id text primary key,
      payload jsonb not null,
      updated_at timestamptz not null default now()
    )
  `);
  await client.query(
    `
      insert into app_store (id, payload, updated_at)
      values ($1, $2::jsonb, now())
      on conflict (id) do nothing
    `,
    ["default", JSON.stringify(createSeedDb())],
  );
}

async function readDb() {
  const dbPool = getPool();
  const client = await dbPool.connect();
  try {
    await ensureDb(client);
    const result = await client.query("select payload from app_store where id = $1", ["default"]);
    return normalizeDb(result.rows[0]?.payload || createSeedDb());
  } finally {
    client.release();
  }
}

async function updateDb(mutator) {
  const dbPool = getPool();
  const client = await dbPool.connect();
  try {
    await client.query("begin");
    await ensureDb(client);
    const result = await client.query("select payload from app_store where id = $1 for update", ["default"]);
    const current = normalizeDb(result.rows[0]?.payload || createSeedDb());
    const next = normalizeDb(await mutator(current));
    await client.query(
      `
        insert into app_store (id, payload, updated_at)
        values ($1, $2::jsonb, now())
        on conflict (id)
        do update set payload = excluded.payload, updated_at = now()
      `,
      ["default", JSON.stringify(next)],
    );
    await client.query("commit");
    return next;
  } catch (error) {
    await client.query("rollback").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}

function getApiPath(event) {
  const rawPath = event.path || new URL(event.rawUrl || "https://local/.netlify/functions/api").pathname;
  const normalized = rawPath.replace(/^\/\.netlify\/functions\/api/, "/api");
  return normalized === "/api" ? "/api/health" : normalized;
}

function parseBody(event) {
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event.body || "";
  return raw ? JSON.parse(raw) : {};
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

exports.handler = async function handler(event) {
  try {
    if (event.httpMethod === "OPTIONS") return emptyResponse(204);

    const path = getApiPath(event);

    if (path === "/api/health" && event.httpMethod === "GET") {
      return jsonResponse(200, {
        ok: true,
        storage: process.env.DATABASE_URL ? "postgres" : "missing-database-url",
        runtime: "netlify",
      });
    }

    if (path === "/api/state" && event.httpMethod === "GET") {
      const db = await readDb();
      return jsonResponse(200, {
        state: db.state,
        history: db.history.slice(0, 100),
        meta: db.meta,
      });
    }

    if (path === "/api/state" && ["PUT", "POST"].includes(event.httpMethod)) {
      const body = parseBody(event);
      const db = await updateDb((current) => ({
        ...current,
        state: sanitizeState(body.state || seedState),
        meta: {
          ...(current.meta || {}),
          updatedAt: new Date().toISOString(),
        },
      }));
      return jsonResponse(200, { ok: true, state: db.state, meta: db.meta });
    }

    if (path === "/api/history" && event.httpMethod === "GET") {
      const limit = clamp(Number(event.queryStringParameters?.limit) || 100, 1, HISTORY_LIMIT);
      const db = await readDb();
      return jsonResponse(200, { history: db.history.slice(0, limit) });
    }

    if (path === "/api/history" && event.httpMethod === "POST") {
      const body = parseBody(event);
      const db = await updateDb((current) => {
        const entry = {
          ...(body.entry || {}),
          id: body.entry?.id || `H${Date.now()}`,
          createdAt: body.entry?.createdAt || new Date().toISOString(),
        };
        return {
          ...current,
          history: [entry, ...current.history].slice(0, HISTORY_LIMIT),
          meta: {
            ...(current.meta || {}),
            updatedAt: new Date().toISOString(),
          },
        };
      });
      return jsonResponse(200, { ok: true, history: db.history.slice(0, 100) });
    }

    return jsonResponse(404, { error: "Not found" });
  } catch (error) {
    console.error(error);
    return jsonResponse(500, { error: error.message || "Erro interno do servidor" });
  }
};
