const YEAR = 2026;
const STORAGE_KEY = "controle-mensalidades-2026-v1";
const VIEW_KEY = "controle-mensalidades-2026-current-view";
const HISTORY_DB_NAME = "raiz-jjc-controle-db";
const HISTORY_DB_VERSION = 1;
const HISTORY_STORE = "changeLog";
const APP_VERSION = "20260420-8";
const API_PORT = 4173;
const API_BASE = location.protocol === "file:" ? `http://127.0.0.1:${API_PORT}` : "";

const monthNames = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const longMonthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const icons = {
  dashboard:
    '<svg viewBox="0 0 24 24"><path d="M4 13h6v7H4v-7Zm10-9h6v16h-6V4ZM4 4h6v6H4V4Zm10 13h6v3h-6v-3Z"/></svg>',
  users:
    '<svg viewBox="0 0 24 24"><path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7.5 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2 20a7 7 0 0 1 14 0v1H2v-1Zm13.2-4.8A6.5 6.5 0 0 1 22 21h-4v-1a8.9 8.9 0 0 0-2.8-4.8Z"/></svg>',
  receipt:
    '<svg viewBox="0 0 24 24"><path d="M6 2h12a1 1 0 0 1 1 1v19l-3-2-2 2-2-2-2 2-2-2-3 2V3a1 1 0 0 1 1-1Zm3 5v2h6V7H9Zm0 4v2h8v-2H9Zm0 4v2h5v-2H9Z"/></svg>',
  settings:
    '<svg viewBox="0 0 24 24"><path d="M19.4 13.5c.1-.5.1-1 .1-1.5s0-1-.1-1.5l2-1.5-2-3.5-2.4 1a8 8 0 0 0-2.6-1.5L14 2h-4l-.4 2.5A8 8 0 0 0 7 6L4.6 5 2.6 8.5l2 1.5c-.1.5-.1 1-.1 1.5s0 1 .1 1.5l-2 1.5 2 3.5L7 18a8 8 0 0 0 2.6 1.5L10 22h4l.4-2.5A8 8 0 0 0 17 18l2.4 1 2-3.5-2-1.5ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/></svg>',
  upload:
    '<svg viewBox="0 0 24 24"><path d="M12 3 7 8h3v7h4V8h3l-5-5ZM5 19h14v2H5v-2Z"/></svg>',
  download:
    '<svg viewBox="0 0 24 24"><path d="M10 3h4v8h3l-5 5-5-5h3V3ZM5 19h14v2H5v-2Z"/></svg>',
  money:
    '<svg viewBox="0 0 24 24"><path d="M3 6h18v12H3V6Zm2 3a3 3 0 0 0 3-1H5v1Zm0 6v1h3a3 3 0 0 0-3-1Zm14 1v-1a3 3 0 0 0-3 1h3Zm0-7V8h-3a3 3 0 0 0 3 1Zm-7 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>',
  plus:
    '<svg viewBox="0 0 24 24"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z"/></svg>',
  edit:
    '<svg viewBox="0 0 24 24"><path d="m4 17.2-.7 3.5 3.5-.7L18.9 7.9l-2.8-2.8L4 17.2ZM18 3.2 20.8 6l-1.2 1.2-2.8-2.8L18 3.2Z"/></svg>',
  trash:
    '<svg viewBox="0 0 24 24"><path d="M8 4h8l1 2h4v2H3V6h4l1-2Zm1 6h2v8H9v-8Zm4 0h2v8h-2v-8ZM6 10h12l-1 11H7L6 10Z"/></svg>',
  close:
    '<svg viewBox="0 0 24 24"><path d="m6.4 5 12.6 12.6-1.4 1.4L5 6.4 6.4 5Zm12.6 1.4L6.4 19 5 17.6 17.6 5 19 6.4Z"/></svg>',
  check:
    '<svg viewBox="0 0 24 24"><path d="m9.2 16.6-4.1-4.1L3.7 14l5.5 5.5L21 7.7l-1.4-1.4-10.4 10.3Z"/></svg>',
  alert:
    '<svg viewBox="0 0 24 24"><path d="M12 2 1 21h22L12 2Zm1 15h-2v2h2v-2Zm0-8h-2v6h2V9Z"/></svg>',
  search:
    '<svg viewBox="0 0 24 24"><path d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0-2a8 8 0 1 0 4.9 14.3l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0 0 10 2Z"/></svg>',
  csv:
    '<svg viewBox="0 0 24 24"><path d="M5 3h10l4 4v14H5V3Zm9 1.5V8h3.5L14 4.5ZM8 12h8v2H8v-2Zm0 4h8v2H8v-2Z"/></svg>',
  reset:
    '<svg viewBox="0 0 24 24"><path d="M12 5a7 7 0 1 1-6.3 4H3l4-4 4 4H7.9A5 5 0 1 0 12 7V5Z"/></svg>',
};

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
    referenceMonth: getDefaultReferenceMonth(),
    reference: getDefaultReferenceValue(),
  },
};

let lastSavedAt = "";
let storageError = "";
let state = loadState();
let currentView = loadCurrentView();
let editingStudentCode = null;
let editingPaymentId = null;
let toastTimer = 0;
let filterRenderTimer = 0;
let historyEntries = [];
let historyDbPromise = null;
let historyError = "";
let backendAvailable = false;
let backendError = "";
const filters = {
  query: "",
  group: "all",
  status: "all",
  paymentMonth: "all",
  paymentMethod: "all",
  referenceDraft: getActiveReferenceValue(),
};

document.addEventListener("DOMContentLoaded", () => {
  hydrateIcons(document);
  bindGlobalEvents();
  saveState({ silent: true, localOnly: true });
  render();
  void initializeDataLayer();
});

function bindGlobalEvents() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      setCurrentView(button.dataset.view);
    });
  });

  document.querySelector("#logoHomeButton").addEventListener("click", () => setCurrentView("dashboard"));
  document.querySelector("#newStudentTopButton").addEventListener("click", () => openStudentDialog());
  document.querySelector("#newPaymentTopButton").addEventListener("click", () => openPaymentDialog());
  document.querySelector("#exportJsonButton").addEventListener("click", exportJson);
  document.querySelector("#importJsonButton").addEventListener("click", () => {
    document.querySelector("#jsonFileInput").click();
  });
  document.querySelector("#jsonFileInput").addEventListener("change", importJson);
  document.querySelector("#studentForm").addEventListener("submit", saveStudentFromForm);
  document.querySelector("#paymentForm").addEventListener("submit", savePaymentFromForm);
  document.querySelector("#studentCpf").addEventListener("input", (event) => {
    event.target.value = formatCpf(event.target.value);
  });
  document.querySelectorAll("[data-dialog-close]").forEach((button) => {
    button.addEventListener("click", () => closeDialog(button.dataset.dialogClose));
  });
  document.querySelector("#paymentStudentSearch").addEventListener("input", (event) => {
    event.target.value = event.target.value.slice(0, 120);
    renderPaymentStudentOptions("");
  });

  ["paymentStudent", "paymentMonth"].forEach((id) => {
    document.querySelector(`#${id}`).addEventListener("change", updateDuplicateAlert);
  });
}

function render() {
  updateSaveStatus();
  syncActiveTab();
  const app = document.querySelector("#app");
  if (currentView === "dashboard") app.innerHTML = renderDashboard();
  if (currentView === "students") app.innerHTML = renderStudents();
  if (currentView === "payments") app.innerHTML = renderPayments();
  if (currentView === "settings") app.innerHTML = renderSettings();
  hydrateIcons(app);
  bindViewEvents(app);
}

function setCurrentView(view) {
  currentView = isValidView(view) ? view : "dashboard";
  saveCurrentView();
  render();
  document.querySelector("#app").focus({ preventScroll: true });
}

function syncActiveTab() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.view === currentView);
  });
}

function renderDashboard() {
  const stats = getStats();
  const filteredStudents = getFilteredStudents();
  const inadimplentes = filteredStudents
    .map((student) => ({
      student,
      pending: getDashboardPendingMonths(student),
    }))
    .filter((item) => item.pending.length)
    .sort((a, b) => b.pending.length - a.pending.length)
    .slice(0, 6);

  return `
    <section class="view-header">
      <div>
        <h2>Dashboard</h2>
        <p>${getReferenceTitle()}</p>
      </div>
      <div class="inline-actions">
        <button class="ghost-button" type="button" data-action="export-dashboard-csv">
          <span data-icon="csv"></span>
          CSV
        </button>
        <button class="ghost-button" type="button" data-action="new-student">
          <span data-icon="plus"></span>
          Aluno
        </button>
        <button class="primary-button" type="button" data-action="new-payment">
          <span data-icon="money"></span>
          Pagamento
        </button>
      </div>
    </section>

    <section class="toolbar">
      <div class="filters">
        <label class="search-field">
          Buscar
          <input type="search" maxlength="120" value="${escapeAttr(filters.query)}" data-filter="query" placeholder="Código, nome, CPF ou e-mail" />
        </label>
        <label>
          Turma
          ${renderGroupSelect(filters.group, "all", "data-filter=\"group\"")}
        </label>
        <label>
          Status
          <select data-filter="status">
            ${option("all", "Todos", filters.status)}
            ${option("good", "Adimplentes", filters.status)}
            ${option("bad", "Inadimplentes", filters.status)}
            ${option("neutral", "Sem cobrança", filters.status)}
          </select>
        </label>
        <label>
          Referência
          ${renderReferenceSelect(filters.referenceDraft, "data-filter-draft=\"referenceDraft\"")}
        </label>
        <button class="primary-button" type="button" data-action="apply-reference">
          <span data-icon="search"></span>
          Buscar
        </button>
      </div>
    </section>

    <section class="kpi-grid">
      ${renderKpi("Matriculados", stats.enrolled, "Até a referência")}
      ${renderKpi("Adimplentes", stats.good, `${stats.goodRate}% dos cobrados`)}
      ${renderKpi("Inadimplentes", stats.bad, `${stats.badRate}% dos cobrados`)}
      ${renderKpi("Pagamentos", stats.paidInReference, getReferenceShortLabel())}
      ${renderKpi("Recebido", formatCurrency(stats.receivedInReference), "No mês de referência")}
    </section>

    <section class="dashboard-grid">
      <div class="panel">
        <div class="panel-header">
          <h3>Mensalidades por mês</h3>
          <div class="legend">
            <span><i class="paid-dot"></i>Pagas</span>
            <span><i class="pending-dot"></i>Pendentes</span>
          </div>
        </div>
        <div class="panel-body">
          ${renderMonthlyChart()}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <h3>Inadimplência</h3>
          <span class="status-pill ${stats.bad ? "status-bad" : "status-good"}">${stats.bad} alunos</span>
        </div>
        <div class="panel-body">
          ${renderPendingList(inadimplentes)}
        </div>
      </div>
    </section>

    <div class="table-shell">
      ${renderDashboardTable(filteredStudents)}
    </div>
  `;
}

function renderStudents() {
  const students = getFilteredStudents(false);
  return `
    <section class="view-header">
      <div>
        <h2>Alunos</h2>
        <p>${state.students.length} cadastrados</p>
      </div>
      <div class="inline-actions">
        <button class="ghost-button" type="button" data-action="export-students-csv">
          <span data-icon="csv"></span>
          CSV
        </button>
        <button class="primary-button" type="button" data-action="new-student">
          <span data-icon="plus"></span>
          Aluno
        </button>
      </div>
    </section>

    <section class="toolbar">
      <div class="filters">
        <label class="search-field">
          Buscar
          <input type="search" maxlength="120" value="${escapeAttr(filters.query)}" data-filter="query" placeholder="Código, nome, CPF ou e-mail" />
        </label>
        <label>
          Turma
          ${renderGroupSelect(filters.group, "all", "data-filter=\"group\"")}
        </label>
      </div>
    </section>

    <div class="table-shell">
      <table>
        <thead>
          <tr>
            <th class="code-col">Código</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Turma</th>
            <th>Matrícula</th>
            <th>Vencimento</th>
            <th>Desligamento</th>
            <th>Status</th>
            <th class="action-col">Ações</th>
          </tr>
        </thead>
        <tbody>
          ${
            students.length
              ? students
                  .map((student) => {
                    const status = getStudentListStatus(student);
                    return `
                      <tr>
                        <td>${escapeHtml(student.code)}</td>
                        <td class="student-name-cell"><strong>${escapeHtml(student.name)}</strong></td>
                        <td>${escapeHtml(formatCpf(student.cpf) || "-")}</td>
                        <td>${student.email ? `<a href="mailto:${escapeAttr(student.email)}">${escapeHtml(student.email)}</a>` : "-"}</td>
                        <td>${escapeHtml(student.group || "Sem turma")}</td>
                        <td>${formatDate(student.enrollment)}</td>
                        <td>${student.monthlyDueDate ? formatDate(student.monthlyDueDate) : "-"}</td>
                        <td>${student.leaveDate ? formatDate(student.leaveDate) : "-"}</td>
                        <td>${renderStatusPill(status)}</td>
                        <td>
                          <div class="inline-actions">
                            <button class="icon-button" type="button" data-action="edit-student" data-code="${student.code}" title="Editar" aria-label="Editar ${escapeAttr(student.name)}"><span data-icon="edit"></span></button>
                            <button class="icon-button" type="button" data-action="delete-student" data-code="${student.code}" title="Excluir" aria-label="Excluir ${escapeAttr(student.name)}"><span data-icon="trash"></span></button>
                          </div>
                        </td>
                      </tr>
                    `;
                  })
                  .join("")
              : `<tr><td colspan="10"><div class="empty-state">Nenhum aluno encontrado.</div></td></tr>`
          }
        </tbody>
      </table>
    </div>
  `;
}

function renderPayments() {
  const payments = getFilteredPayments();
  return `
    <section class="view-header">
      <div>
        <h2>Pagamentos</h2>
        <p>${state.payments.length} lançados</p>
      </div>
      <div class="inline-actions">
        <button class="ghost-button" type="button" data-action="export-payments-csv">
          <span data-icon="csv"></span>
          CSV
        </button>
        <button class="primary-button" type="button" data-action="new-payment">
          <span data-icon="money"></span>
          Pagamento
        </button>
      </div>
    </section>

    <section class="toolbar">
      <div class="filters">
        <label class="search-field">
          Buscar
          <input type="search" maxlength="120" value="${escapeAttr(filters.query)}" data-filter="query" placeholder="Código, nome, CPF ou e-mail" />
        </label>
        <label>
          Mês
          ${renderMonthSelect(filters.paymentMonth, "data-filter=\"paymentMonth\"", true)}
        </label>
        <label>
          Forma
          <select data-filter="paymentMethod">
            ${option("all", "Todas", filters.paymentMethod)}
            ${state.settings.methods.map((method) => option(method, method, filters.paymentMethod)).join("")}
          </select>
        </label>
      </div>
    </section>

    <div class="table-shell">
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Código</th>
            <th>Aluno</th>
            <th>Mês</th>
            <th>Valor</th>
            <th>Forma</th>
            <th>Alerta</th>
            <th class="action-col">Ações</th>
          </tr>
        </thead>
        <tbody>
          ${
            payments.length
              ? payments.map(renderPaymentRow).join("")
              : `<tr><td colspan="8"><div class="empty-state">Nenhum pagamento lançado.</div></td></tr>`
          }
        </tbody>
      </table>
    </div>
  `;
}

function renderSettings() {
  return `
    <section class="view-header">
      <div>
        <h2>Config</h2>
        <p>Listas usadas nos cadastros e pagamentos</p>
      </div>
      <div class="inline-actions">
        <button class="danger-button" type="button" data-action="reset-data">
          <span data-icon="reset"></span>
          Restaurar base
        </button>
      </div>
    </section>

    <section class="settings-grid">
      <div class="panel">
        <div class="panel-header">
          <h3>Turmas</h3>
        </div>
        <div class="panel-body">
          <div class="chip-row">
            ${state.settings.groups.map((group) => renderTag(group, "group")).join("")}
          </div>
          <div class="toolbar">
            <label class="search-field">
              Nova turma
              <input type="text" data-setting-input="group" autocomplete="off" />
            </label>
            <button class="primary-button" type="button" data-action="add-group">
              <span data-icon="plus"></span>
              Adicionar
            </button>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header">
          <h3>Formas de pagamento</h3>
        </div>
        <div class="panel-body">
          <div class="chip-row">
            ${state.settings.methods.map((method) => renderTag(method, "method")).join("")}
          </div>
          <div class="toolbar">
            <label class="search-field">
              Nova forma
              <input type="text" data-setting-input="method" autocomplete="off" />
            </label>
            <button class="primary-button" type="button" data-action="add-method">
              <span data-icon="plus"></span>
              Adicionar
            </button>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header">
          <h3>Mensalidade padrão</h3>
        </div>
        <div class="panel-body">
          <label>
            Valor
            <input type="number" min="0" step="0.01" value="${state.settings.defaultAmount}" data-setting="defaultAmount" />
          </label>
        </div>
      </div>

      <div class="panel history-panel">
        <div class="panel-header">
          <h3>Histórico de alterações</h3>
          <div class="inline-actions">
            <button class="ghost-button" type="button" data-action="refresh-history">
              <span data-icon="reset"></span>
              Atualizar
            </button>
            <button class="ghost-button" type="button" data-action="export-history">
              <span data-icon="download"></span>
              Exportar
            </button>
          </div>
        </div>
        <div class="panel-body">
          ${renderHistoryTable()}
        </div>
      </div>
    </section>
  `;
}

function renderHistoryTable() {
  if (historyError) {
    return `<div class="empty-state">${escapeHtml(historyError)}</div>`;
  }
  if (!historyEntries.length) {
    return `<div class="empty-state">Nenhuma alteração registrada ainda.</div>`;
  }
  return `
    <div class="table-shell">
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Ação</th>
            <th>Registro</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          ${historyEntries
            .map(
              (entry) => `
                <tr>
                  <td>${formatDateTime(entry.createdAt)}</td>
                  <td>${escapeHtml(formatHistoryAction(entry.action))}</td>
                  <td>${escapeHtml(entry.entityId || "-")}</td>
                  <td>${escapeHtml(entry.summary || "-")}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderKpi(label, value, detail) {
  return `
    <article class="kpi-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(String(value))}</strong>
      <small>${escapeHtml(detail)}</small>
    </article>
  `;
}

function renderMonthlyChart() {
  const monthly = monthNames.map((_, index) => {
    const month = index + 1;
    let paid = 0;
    let pending = 0;
    state.students.forEach((student) => {
      const monthState = getMonthState(student, month);
      if (monthState === "paid") paid += 1;
      if (monthState === "pending") pending += 1;
    });
    return { month, paid, pending, total: paid + pending };
  });
  const max = Math.max(1, ...monthly.map((item) => item.total));

  return `
    <div class="month-chart">
      ${monthly
        .map((item, index) => {
          const paidHeight = `${(item.paid / max) * 100}%`;
          const pendingHeight = `${(item.pending / max) * 100}%`;
          return `
            <div class="chart-column" title="${monthNames[index]}: ${item.paid} pagas, ${item.pending} pendentes">
              <div class="bar-track" aria-hidden="true">
                <div style="height:${pendingHeight}" class="bar-pending"></div>
                <div style="height:${paidHeight}" class="bar-paid"></div>
              </div>
              <div class="chart-label">${monthNames[index]}</div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderPendingList(items) {
  if (!items.length) {
    return `<div class="empty-state">Nenhuma pendência na referência atual.</div>`;
  }
  return `
    <div class="summary-list">
      ${items
        .map(
          ({ student, pending }) => `
          <div class="summary-row">
            <div>
              <strong>${escapeHtml(student.name)}</strong>
              <small>${escapeHtml(student.code)} · ${escapeHtml(student.group || "Sem turma")}</small>
            </div>
            <span class="status-pill status-bad">${pending.map((month) => monthNames[month - 1]).join(", ")}</span>
          </div>
        `,
        )
        .join("")}
    </div>
  `;
}

function renderDashboardTable(students) {
  return `
    <table>
      <thead>
        <tr>
          <th class="sticky-col code-col">Código</th>
          <th class="name-col">Nome</th>
          <th>Turma</th>
          <th>Status</th>
          ${monthNames.map((month) => `<th class="month-col">${month}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${
          students.length
            ? students
                .map((student) => {
                  const status = getDashboardStudentStatus(student);
                  return `
                    <tr>
                      <td class="sticky-col code-col">${escapeHtml(student.code)}</td>
                      <td class="student-name-cell"><strong>${escapeHtml(student.name)}</strong><small>${formatDate(student.enrollment)}</small></td>
                      <td>${escapeHtml(student.group || "Sem turma")}</td>
                      <td>${renderStatusPill(status)}</td>
                      ${monthNames
                        .map((_, index) => {
                          const month = index + 1;
                          return `<td class="month-col">${renderMonthChip(student, month)}</td>`;
                        })
                        .join("")}
                    </tr>
                  `;
                })
                .join("")
            : `<tr><td colspan="16"><div class="empty-state">Nenhum aluno encontrado.</div></td></tr>`
        }
      </tbody>
    </table>
  `;
}

function renderPaymentRow(payment) {
  const student = getStudent(payment.studentCode);
  const duplicateCount = state.payments.filter(
    (item) => item.studentCode === payment.studentCode && Number(item.month) === Number(payment.month),
  ).length;
  return `
    <tr>
      <td>${formatDate(payment.paidAt)}</td>
      <td>${escapeHtml(payment.studentCode)}</td>
      <td class="student-name-cell">
        <strong>${escapeHtml(student?.name || payment.studentName || "Aluno não encontrado")}</strong>
        <small>${escapeHtml(student?.group || "Sem turma")}</small>
      </td>
      <td>${monthNames[payment.month - 1]}</td>
      <td class="amount">${formatCurrency(Number(payment.amount || 0))}</td>
      <td>${escapeHtml(payment.method)}</td>
      <td>${duplicateCount > 1 ? `<span class="status-pill status-bad">Duplicado</span>` : ""}</td>
      <td>
        <div class="inline-actions">
          <button class="icon-button" type="button" data-action="edit-payment" data-id="${payment.id}" title="Editar" aria-label="Editar pagamento"><span data-icon="edit"></span></button>
          <button class="icon-button" type="button" data-action="delete-payment" data-id="${payment.id}" title="Excluir" aria-label="Excluir pagamento"><span data-icon="trash"></span></button>
        </div>
      </td>
    </tr>
  `;
}

function renderStatusPill(status) {
  const label = status === "good" ? "Adimplente" : status === "bad" ? "Inadimplente" : "Sem cobrança";
  const cls = status === "good" ? "status-good" : status === "bad" ? "status-bad" : "status-neutral";
  return `<span class="status-pill ${cls}">${label}</span>`;
}

function renderMonthChip(student, month) {
  const stateName = getMonthState(student, month);
  const payment = getPayment(student.code, month);
  const labels = {
    paid: "Pago",
    pending: "Pendente",
    future: "Futuro",
    off: "-",
  };
  const titles = {
    paid: `Editar pagamento de ${monthNames[month - 1]}`,
    pending: `Lançar pagamento de ${monthNames[month - 1]}`,
    future: `${monthNames[month - 1]} ainda não venceu`,
    off: `${monthNames[month - 1]} sem cobrança`,
  };
  const paymentId = payment ? `data-payment-id="${payment.id}"` : "";
  return `
    <button class="month-chip ${stateName}" type="button" data-action="month-click" data-code="${student.code}" data-month="${month}" ${paymentId} title="${titles[stateName]}">
      ${labels[stateName]}
    </button>
  `;
}

function renderTag(value, type) {
  return `
    <span class="tag">
      ${escapeHtml(value)}
      <button type="button" data-action="remove-${type}" data-value="${escapeAttr(value)}" title="Remover" aria-label="Remover ${escapeAttr(value)}">×</button>
    </span>
  `;
}

function renderGroupSelect(selected, allValue = "", attrs = "") {
  return `
    <select ${attrs}>
      ${renderGroupOptions(selected, allValue)}
    </select>
  `;
}

function renderMonthSelect(selected, attrs = "", includeAll = false) {
  return `
    <select ${attrs}>
      ${renderMonthOptions(selected, includeAll)}
    </select>
  `;
}

function renderReferenceSelect(selected, attrs = "") {
  return `
    <select ${attrs}>
      ${option("all", "Todos", selected)}
      ${monthNames.map((_, index) => {
        const value = `${YEAR}-${String(index + 1).padStart(2, "0")}`;
        return option(value, value, selected);
      }).join("")}
    </select>
  `;
}

function renderGroupOptions(selected, allValue = "") {
  return `
    ${allValue ? option(allValue, allValue === "all" ? "Todas" : "Sem turma", selected) : option("", "Sem turma", selected)}
    ${state.settings.groups.map((group) => option(group, group, selected)).join("")}
  `;
}

function renderMonthOptions(selected, includeAll = false) {
  return `
    ${includeAll ? option("all", "Todos", selected) : ""}
    ${monthNames.map((month, index) => option(index + 1, month, selected)).join("")}
  `;
}

function option(value, label, selected) {
  return `<option value="${escapeAttr(value)}" ${String(value) === String(selected) ? "selected" : ""}>${escapeHtml(label)}</option>`;
}

function bindViewEvents(root) {
  root.querySelectorAll("[data-filter]").forEach((control) => {
    const eventName = control.matches('input[type="search"]') ? "input" : "change";
    control.addEventListener(eventName, () => {
      const key = control.dataset.filter;
      const value = control.matches('input[type="search"]') ? control.value.slice(0, 120) : control.value;
      const selectionStart = control.selectionStart;
      filters[key] = value;
      if (control.matches('input[type="search"]')) {
        window.clearTimeout(filterRenderTimer);
        filterRenderTimer = window.setTimeout(() => {
          render();
          const nextControl = document.querySelector(`[data-filter="${key}"]`);
          if (!nextControl) return;
          nextControl.focus({ preventScroll: true });
          const nextPosition = Math.min(selectionStart ?? value.length, value.length);
          nextControl.setSelectionRange(nextPosition, nextPosition);
        }, 120);
        return;
      }
      render();
    });
  });

  root.querySelectorAll("[data-filter-draft]").forEach((control) => {
    control.addEventListener("change", () => {
      filters[control.dataset.filterDraft] = control.value;
    });
  });

  root.querySelectorAll("[data-setting]").forEach((control) => {
    control.addEventListener("change", () => {
      const key = control.dataset.setting;
      const before = clone(state.settings);
      state.settings[key] = key === "defaultAmount" ? Number(control.value || 0) : Number(control.value);
      if (!saveState()) return;
      void recordChange({
        action: "settings.updated",
        entity: "settings",
        entityId: key,
        before,
        after: clone(state.settings),
        summary: `${key}: ${state.settings[key]}`,
      });
      render();
    });
  });

  root.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button));
  });
}

function handleAction(button) {
  const action = button.dataset.action;
  if (action === "new-student") openStudentDialog();
  if (action === "new-payment") openPaymentDialog();
  if (action === "edit-student") openStudentDialog(button.dataset.code);
  if (action === "delete-student") deleteStudent(button.dataset.code);
  if (action === "edit-payment") openPaymentDialogById(button.dataset.id);
  if (action === "delete-payment") deletePayment(button.dataset.id);
  if (action === "month-click") openPaymentFromMonth(button);
  if (action === "export-dashboard-csv") exportDashboardCsv();
  if (action === "export-students-csv") exportStudentsCsv();
  if (action === "export-payments-csv") exportPaymentsCsv();
  if (action === "refresh-history") refreshHistory();
  if (action === "export-history") exportHistoryCsv();
  if (action === "apply-reference") applyReferenceFilter();
  if (action === "add-group") addListItem("group");
  if (action === "add-method") addListItem("method");
  if (action === "remove-group") removeListItem("groups", button.dataset.value);
  if (action === "remove-method") removeListItem("methods", button.dataset.value);
  if (action === "reset-data") resetData();
}

function openStudentDialog(code = null) {
  editingStudentCode = code;
  const student = code ? getStudent(code) : null;
  document.querySelector("#studentDialogTitle").textContent = student ? "Editar aluno" : "Novo aluno";
  document.querySelector("#studentCode").value = student?.code || nextStudentCode();
  document.querySelector("#studentName").value = student?.name || "";
  document.querySelector("#studentCpf").value = formatCpf(student?.cpf || "");
  document.querySelector("#studentEmail").value = student?.email || "";
  document.querySelector("#studentGroup").innerHTML = renderGroupOptions(student?.group || "", "");
  document.querySelector("#studentEnrollment").value = student?.enrollment || `${YEAR}-01-01`;
  document.querySelector("#studentMonthlyDueDate").value = student?.monthlyDueDate || "";
  document.querySelector("#studentLeaveDate").value = student?.leaveDate || "";
  document.querySelector("#studentChargeLeave").value = String(student?.chargeLeaveMonth ?? true);
  showDialog("#studentDialog");
}

function saveStudentFromForm(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const code = String(form.get("code")).trim();
  const student = {
    code,
    name: String(form.get("name")).trim(),
    cpf: onlyDigits(String(form.get("cpf") || "")),
    email: String(form.get("email") || "").trim(),
    group: String(form.get("group") || ""),
    enrollment: String(form.get("enrollment")),
    monthlyDueDate: String(form.get("monthlyDueDate") || ""),
    leaveDate: String(form.get("leaveDate") || ""),
    chargeLeaveMonth: String(form.get("chargeLeave")) === "true",
  };
  if (!student.name) {
    showToast("Informe o nome do aluno.");
    return;
  }
  if (!student.enrollment) {
    showToast("Informe a data de matrícula.");
    return;
  }
  if (student.email && !isValidEmail(student.email)) {
    showToast("Informe um e-mail válido ou deixe o campo em branco.");
    return;
  }
  const beforeStudent = editingStudentCode ? clone(getStudent(editingStudentCode)) : null;
  const historyAction = editingStudentCode ? "student.updated" : "student.created";
  if (editingStudentCode) {
    state.students = state.students.map((item) => (item.code === editingStudentCode ? student : item));
  } else {
    state.students.push(student);
  }
  sortStudents();
  if (!saveState()) return;
  void recordChange({
    action: historyAction,
    entity: "student",
    entityId: student.code,
    before: beforeStudent,
    after: student,
    summary: `${student.code} · ${student.name}`,
  });
  closeDialog("#studentDialog");
  showToast("Aluno salvo.");
  render();
}

function openPaymentDialog(prefill = {}) {
  editingPaymentId = prefill.id || null;
  const payment = editingPaymentId ? state.payments.find((item) => item.id === editingPaymentId) : null;
  const studentCode = payment?.studentCode || prefill.studentCode || state.students[0]?.code || "";
  const scope = getReferenceScope();
  const month = Number(payment?.month || prefill.month || (scope.all ? getDefaultReferenceMonth() : scope.month));
  document.querySelector("#paymentDialogTitle").textContent = payment ? "Editar pagamento" : "Novo pagamento";
  document.querySelector("#paymentStudentSearch").value = "";
  renderPaymentStudentOptions(studentCode);
  document.querySelector("#paymentMonth").innerHTML = renderMonthOptions(month, false);
  document.querySelector("#paymentAmount").value =
    payment?.amount ?? (state.settings.defaultAmount > 0 ? state.settings.defaultAmount : "");
  document.querySelector("#paymentMethod").innerHTML = state.settings.methods
    .map((method) => option(method, method, payment?.method || state.settings.methods[0]))
    .join("");
  document.querySelector("#paymentDate").value = payment?.paidAt || todayIso();
  document.querySelector("#paymentNote").value = payment?.note || "";
  updateDuplicateAlert();
  showDialog("#paymentDialog");
}

function renderPaymentStudentOptions(selectedCode = "") {
  const search = document.querySelector("#paymentStudentSearch");
  const select = document.querySelector("#paymentStudent");
  if (!search || !select) return;
  const query = search.value;
  let students = state.students.filter((student) => studentMatchesQuery(student, query));
  const selectedStudent = getStudent(selectedCode);
  if (selectedStudent && !students.some((student) => student.code === selectedStudent.code)) {
    students = [selectedStudent, ...students];
  }
  select.innerHTML = students.length
    ? students.map((student) => option(student.code, formatPaymentStudentLabel(student), selectedCode)).join("")
    : option("", "Nenhum aluno encontrado", "");
  if (students.some((student) => student.code === selectedCode)) {
    select.value = selectedCode;
  } else if (students[0]) {
    select.value = students[0].code;
  }
  updateDuplicateAlert();
}

function openPaymentDialogById(id) {
  const payment = state.payments.find((item) => item.id === id);
  if (payment) openPaymentDialog(payment);
}

function openPaymentFromMonth(button) {
  const paymentId = button.dataset.paymentId;
  if (paymentId) {
    openPaymentDialogById(paymentId);
    return;
  }
  const studentCode = button.dataset.code;
  const month = Number(button.dataset.month);
  const stateName = getMonthState(getStudent(studentCode), month);
  if (stateName === "future" || stateName === "off") {
    showToast("Esse mês não está aberto para cobrança.");
    return;
  }
  openPaymentDialog({ studentCode, month });
}

function savePaymentFromForm(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const studentCode = String(form.get("student"));
  const month = Number(form.get("month"));
  const rawAmount = String(form.get("amount") || "").replace(",", ".");
  const amount = Number(rawAmount);
  const method = String(form.get("method") || "");
  const paidAt = String(form.get("paidAt") || "");
  if (!studentCode || !getStudent(studentCode)) {
    showToast("Selecione um aluno válido.");
    return;
  }
  if (!month || month < 1 || month > 12) {
    showToast("Selecione um mês válido.");
    return;
  }
  if (!rawAmount || !Number.isFinite(amount) || amount < 0) {
    showToast("Informe um valor pago válido.");
    return;
  }
  if (!method) {
    showToast("Selecione a forma de pagamento.");
    return;
  }
  if (!paidAt) {
    showToast("Informe a data do pagamento.");
    return;
  }
  const duplicate = getPayment(studentCode, month, editingPaymentId);
  if (duplicate) {
    showToast("Esse mês já foi pago para este aluno.");
    updateDuplicateAlert();
    return;
  }
  const student = getStudent(studentCode);
  const beforePayment = editingPaymentId
    ? clone(state.payments.find((item) => item.id === editingPaymentId))
    : null;
  const historyAction = editingPaymentId ? "payment.updated" : "payment.created";
  const payment = {
    id: editingPaymentId || uniqueId("P"),
    studentCode,
    studentName: student?.name || "",
    month,
    amount,
    method,
    paidAt,
    note: String(form.get("note") || "").trim(),
    createdAt: editingPaymentId
      ? state.payments.find((item) => item.id === editingPaymentId)?.createdAt || new Date().toISOString()
      : new Date().toISOString(),
  };
  if (editingPaymentId) {
    state.payments = state.payments.map((item) => (item.id === editingPaymentId ? payment : item));
  } else {
    state.payments.push(payment);
  }
  if (!saveState()) return;
  void recordChange({
    action: historyAction,
    entity: "payment",
    entityId: payment.id,
    before: beforePayment,
    after: payment,
    summary: `${student?.code || payment.studentCode} · ${student?.name || payment.studentName} · ${monthNames[payment.month - 1]} · ${formatCurrency(payment.amount)}`,
  });
  closeDialog("#paymentDialog");
  showToast("Pagamento salvo.");
  render();
}

function updateDuplicateAlert() {
  const alert = document.querySelector("#duplicateAlert");
  const studentCode = document.querySelector("#paymentStudent").value;
  const month = Number(document.querySelector("#paymentMonth").value);
  if (!studentCode || !month) {
    alert.hidden = true;
    alert.textContent = "";
    return;
  }
  const duplicate = getPayment(studentCode, month, editingPaymentId);
  if (duplicate) {
    alert.hidden = false;
    alert.textContent = `O mês ${monthNames[month - 1]} já foi pago para este aluno.`;
  } else {
    alert.hidden = true;
    alert.textContent = "";
  }
}

function deleteStudent(code) {
  const student = getStudent(code);
  if (!student) return;
  const hasPayments = state.payments.some((payment) => payment.studentCode === code);
  const message = hasPayments
    ? `Excluir ${student.name} e os pagamentos vinculados?`
    : `Excluir ${student.name}?`;
  if (!window.confirm(message)) return;
  const beforeStudent = clone(student);
  const removedPayments = state.payments.filter((payment) => payment.studentCode === code);
  state.students = state.students.filter((item) => item.code !== code);
  state.payments = state.payments.filter((payment) => payment.studentCode !== code);
  if (!saveState()) return;
  void recordChange({
    action: "student.deleted",
    entity: "student",
    entityId: code,
    before: { student: beforeStudent, payments: removedPayments },
    after: null,
    summary: `${code} · ${student.name}`,
  });
  showToast("Aluno excluído.");
  render();
}

function deletePayment(id) {
  const payment = state.payments.find((item) => item.id === id);
  if (!payment) return;
  if (!window.confirm("Excluir este pagamento?")) return;
  const student = getStudent(payment.studentCode);
  state.payments = state.payments.filter((payment) => payment.id !== id);
  if (!saveState()) return;
  void recordChange({
    action: "payment.deleted",
    entity: "payment",
    entityId: id,
    before: payment,
    after: null,
    summary: `${payment.studentCode} · ${student?.name || payment.studentName} · ${monthNames[payment.month - 1]}`,
  });
  showToast("Pagamento excluído.");
  render();
}

function addListItem(type) {
  const input = document.querySelector(`[data-setting-input="${type}"]`);
  const value = input.value.trim();
  const key = type === "group" ? "groups" : "methods";
  if (!value) return;
  if (state.settings[key].includes(value)) return;
  const before = clone(state.settings[key]);
  state.settings[key].push(value);
  input.value = "";
  if (!saveState()) return;
  void recordChange({
    action: "settings.list_added",
    entity: "settings",
    entityId: key,
    before,
    after: clone(state.settings[key]),
    summary: `${key}: ${value}`,
  });
  render();
}

function removeListItem(key, value) {
  const before = clone(state.settings[key]);
  state.settings[key] = state.settings[key].filter((item) => item !== value);
  if (!saveState()) return;
  void recordChange({
    action: "settings.list_removed",
    entity: "settings",
    entityId: key,
    before,
    after: clone(state.settings[key]),
    summary: `${key}: ${value}`,
  });
  render();
}

function applyReferenceFilter() {
  const before = {
    reference: state.settings.reference,
    referenceMonth: state.settings.referenceMonth,
  };
  const reference = normalizeReferenceValue(filters.referenceDraft);
  filters.referenceDraft = reference;
  state.settings.reference = reference;
  state.settings.referenceMonth = getReferenceScope(reference).month;
  if (!saveState()) return;
  void recordChange({
    action: "settings.reference_updated",
    entity: "settings",
    entityId: "reference",
    before,
    after: {
      reference: state.settings.reference,
      referenceMonth: state.settings.referenceMonth,
    },
    summary: `Referência: ${getReferenceShortLabel()}`,
  });
  render();
}

function resetData() {
  if (!window.confirm("Restaurar a base inicial importada da planilha?")) return;
  const before = clone(state);
  state = clone(seedState);
  state.settings.reference = getDefaultReferenceValue();
  state.settings.referenceMonth = getReferenceScope(state.settings.reference).month;
  filters.referenceDraft = state.settings.reference;
  if (!saveState()) return;
  void recordChange({
    action: "system.reset",
    entity: "system",
    entityId: "base",
    before,
    after: clone(state),
    summary: "Base restaurada",
  });
  showToast("Base restaurada.");
  render();
}

function getStats() {
  const scope = getReferenceScope();
  const statuses = state.students.map(getDashboardStudentStatus);
  const dueStudents = statuses.filter((status) => status !== "neutral").length;
  const bad = statuses.filter((status) => status === "bad").length;
  const good = statuses.filter((status) => status === "good").length;
  const scopedPayments = state.payments.filter((payment) => scope.all || Number(payment.month) === scope.month);
  const paidInReference = scopedPayments.length;
  const receivedInReference = state.payments
    .filter((payment) => scope.all || Number(payment.month) === scope.month)
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  return {
    enrolled: state.students.length,
    good,
    bad,
    goodRate: dueStudents ? Math.round((good / dueStudents) * 100) : 0,
    badRate: dueStudents ? Math.round((bad / dueStudents) * 100) : 0,
    paidInReference,
    receivedInReference,
  };
}

function getFilteredStudents(useStatusFilter = true) {
  return state.students
    .filter((student) => {
      const matchesQuery = studentMatchesQuery(student, filters.query);
      const matchesGroup = filters.group === "all" || student.group === filters.group;
      const status = getStudentStatus(student);
      const matchesStatus = !useStatusFilter || filters.status === "all" || status === filters.status;
      return matchesQuery && matchesGroup && matchesStatus;
    })
    .sort((a, b) => a.code.localeCompare(b.code, "pt-BR"));
}

function getFilteredPayments() {
  return state.payments
    .filter((payment) => {
      const student = getStudent(payment.studentCode);
      const fallbackStudent = {
        code: payment.studentCode,
        name: payment.studentName,
        cpf: "",
        email: "",
        group: "",
      };
      const matchesQuery = studentMatchesQuery(student || fallbackStudent, filters.query);
      const matchesMonth = filters.paymentMonth === "all" || String(payment.month) === String(filters.paymentMonth);
      const matchesMethod = filters.paymentMethod === "all" || payment.method === filters.paymentMethod;
      return matchesQuery && matchesMonth && matchesMethod;
    })
    .sort((a, b) => {
      const dateCompare = String(b.paidAt).localeCompare(String(a.paidAt));
      return dateCompare || Number(b.month) - Number(a.month);
    });
}

function getMonthState(student, month) {
  if (!student) return "off";
  const scope = getReferenceScope();
  const enrollmentMonth = getMonthFromIso(student.enrollment) || 1;
  if (month < enrollmentMonth) return "off";
  if (student.leaveDate) {
    const leaveMonth = getMonthFromIso(student.leaveDate);
    if (leaveMonth && month > leaveMonth) return "off";
    if (leaveMonth === month && !student.chargeLeaveMonth) return "off";
  }
  if (!scope.all && month > scope.month) return "future";
  return getPayment(student.code, month) ? "paid" : "pending";
}

function getStudentStatus(student) {
  let hasCharge = false;
  const scope = getReferenceScope();
  for (let month = 1; month <= scope.month; month += 1) {
    const monthState = getMonthState(student, month);
    if (monthState === "pending") return "bad";
    if (monthState === "paid") hasCharge = true;
  }
  return hasCharge ? "good" : "neutral";
}

function getDashboardStudentStatus(student) {
  const scope = getReferenceScope();
  return scope.all ? getStudentStatus(student) : getStudentListStatus(student);
}

function getDashboardPendingMonths(student) {
  const scope = getReferenceScope();
  if (!scope.all) {
    return getMonthState(student, scope.month) === "pending" ? [scope.month] : [];
  }
  return monthNames
    .map((_, index) => index + 1)
    .filter((month) => getMonthState(student, month) === "pending");
}

function getStudentListStatus(student) {
  const scope = getReferenceScope();
  if (scope.all) {
    return state.payments.some((payment) => payment.studentCode === student.code) ? "good" : "neutral";
  }
  const monthState = getMonthState(student, scope.month);
  if (monthState === "paid") return "good";
  if (monthState === "pending") return "bad";
  return "neutral";
}

function getStudent(code) {
  return state.students.find((student) => student.code === code);
}

function studentMatchesQuery(student, rawQuery) {
  const query = normalize(rawQuery);
  const digits = onlyDigits(rawQuery);
  if (!query && !digits) return true;
  const text = normalize(`${student.code} ${student.name} ${student.cpf} ${formatCpf(student.cpf)} ${student.email} ${student.group}`);
  return text.includes(query) || Boolean(digits && onlyDigits(student.cpf).includes(digits));
}

function formatPaymentStudentLabel(student) {
  const details = [formatCpf(student.cpf), student.email].filter(Boolean).join(" · ");
  return `${student.code} · ${student.name}${details ? ` · ${details}` : ""}`;
}

function getPayment(studentCode, month, ignoreId = null) {
  return state.payments.find(
    (payment) =>
      payment.studentCode === studentCode &&
      Number(payment.month) === Number(month) &&
      payment.id !== ignoreId,
  );
}

function nextStudentCode() {
  const next =
    Math.max(
      0,
      ...state.students.map((student) => Number(String(student.code).replace(/\D/g, "")) || 0),
    ) + 1;
  return `A${String(next).padStart(4, "0")}`;
}

function sortStudents() {
  state.students.sort((a, b) => a.code.localeCompare(b.code, "pt-BR"));
}

function exportJson() {
  downloadFile(
    `controle-mensalidades-${YEAR}-backup.json`,
    JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2),
    "application/json;charset=utf-8",
  );
}

async function importJson(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!Array.isArray(imported.students) || !Array.isArray(imported.payments)) {
      throw new Error("Formato invalido");
    }
    const before = clone(state);
    state = migrateState(imported);
    filters.referenceDraft = getActiveReferenceValue();
    if (!saveState()) return;
    void recordChange({
      action: "system.imported",
      entity: "system",
      entityId: "backup",
      before,
      after: clone(state),
      summary: `${state.students.length} alunos · ${state.payments.length} pagamentos importados`,
    });
    showToast("Backup importado.");
    render();
  } catch (error) {
    showToast("Não consegui importar esse arquivo JSON.");
  }
}

async function initializeDataLayer() {
  await initializeBackendSync();
  await initializeHistoryLog();
  render();
}

async function initializeBackendSync() {
  try {
    const remote = await fetchApi("/api/state");
    backendAvailable = true;
    backendError = "";
    const remoteState = migrateState(remote.state || seedState);
    const localState = migrateState(state);
    if (isStateMeaningful(localState) && !isStateMeaningful(remoteState)) {
      await pushStateToServer(localState);
      state = localState;
    } else {
      const mergedState = mergeLocalIntoRemote(remoteState, localState);
      state = mergedState;
      if (JSON.stringify(mergedState) !== JSON.stringify(remoteState)) {
        await pushStateToServer(mergedState);
      }
      writeLocalStateSnapshot();
    }
    filters.referenceDraft = getActiveReferenceValue();
    historyEntries = Array.isArray(remote.history) ? remote.history : [];
  } catch (error) {
    backendAvailable = false;
    backendError = getBackendErrorMessage(error);
  }
}

async function fetchApi(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let payload = {};
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch (error) {
      payload = { error: text };
    }
  }
  if (!response.ok) {
    throw new Error(payload.error || `API ${response.status}`);
  }
  return payload;
}

async function pushStateToServer(nextState) {
  const response = await fetchApi("/api/state", {
    method: "PUT",
    body: JSON.stringify({ state: nextState }),
  });
  backendAvailable = true;
  backendError = "";
  return response;
}

function writeLocalStateSnapshot() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...state,
      meta: {
        appVersion: APP_VERSION,
        savedAt: new Date().toISOString(),
      },
    }));
  } catch (error) {
    storageError = "Armazenamento local indisponível";
  }
}

function isStateMeaningful(candidate) {
  const seed = clone(seedState);
  return (
    candidate.students.length !== seed.students.length ||
    candidate.payments.length > 0 ||
    JSON.stringify(candidate.students) !== JSON.stringify(seed.students) ||
    JSON.stringify(candidate.settings) !== JSON.stringify(seed.settings)
  );
}

function shouldTryBackend() {
  return backendAvailable || (!backendError && (location.protocol !== "file:" || API_BASE !== ""));
}

function getBackendErrorMessage(error) {
  const message = String(error?.message || "");
  if (message.includes("DATABASE_URL")) {
    return "Banco online sem DATABASE_URL";
  }
  if (location.protocol === "file:") {
    return "Servidor local não conectado";
  }
  if (location.hostname.endsWith(".netlify.app")) {
    return "Banco online indisponível no Netlify";
  }
  if (location.hostname.endsWith(".onrender.com")) {
    return "Banco online indisponível no Render";
  }
  return "Servidor indisponível";
}

function getBackendSourceLabel() {
  if (location.hostname.endsWith(".netlify.app")) return "Banco online";
  if (location.hostname.endsWith(".onrender.com")) return "Banco online";
  if (["127.0.0.1", "localhost"].includes(location.hostname)) return "Banco local compartilhado";
  return "Banco compartilhado";
}

function mergeLocalIntoRemote(remoteState, localState) {
  if (!isStateMeaningful(localState)) return remoteState;
  const merged = clone(remoteState);
  const studentCodes = new Set(merged.students.map((student) => student.code));
  localState.students.forEach((student) => {
    if (!studentCodes.has(student.code)) {
      merged.students.push(student);
      studentCodes.add(student.code);
    }
  });
  const paymentIds = new Set(merged.payments.map((payment) => payment.id));
  localState.payments.forEach((payment) => {
    if (!paymentIds.has(payment.id)) {
      merged.payments.push(payment);
      paymentIds.add(payment.id);
    }
  });
  merged.settings.groups = Array.from(new Set([
    ...(merged.settings.groups || []),
    ...(localState.settings.groups || []),
  ]));
  merged.settings.methods = Array.from(new Set([
    ...(merged.settings.methods || []),
    ...(localState.settings.methods || []),
  ]));
  return migrateState(merged);
}

function exportDashboardCsv() {
  const header = ["Código", "Nome", "Turma", "Status", ...monthNames];
  const rows = state.students.map((student) => [
    student.code,
    student.name,
    student.group || "Sem turma",
    getStudentStatusLabel(student),
    ...monthNames.map((_, index) => getMonthStateLabel(getMonthState(student, index + 1))),
  ]);
  downloadCsv(`controle-mensalidades-${YEAR}-dashboard.csv`, [header, ...rows]);
}

function exportStudentsCsv() {
  const rows = state.students.map((student) => [
    student.code,
    student.name,
    formatCpf(student.cpf),
    student.email,
    student.group,
    student.enrollment,
    student.monthlyDueDate,
    student.leaveDate,
    student.chargeLeaveMonth ? "Sim" : "Não",
  ]);
  downloadCsv(`controle-mensalidades-${YEAR}-alunos.csv`, [
    ["Código", "Nome", "CPF", "E-mail", "Turma", "Matrícula", "Desligamento", "Cobrar no mês de desligamento"],
    ...rows,
  ]);
}

function exportPaymentsCsv() {
  const rows = state.payments.map((payment) => {
    const student = getStudent(payment.studentCode);
    return [
      payment.studentCode,
      student?.name || payment.studentName,
      payment.month,
      payment.amount,
      payment.method,
      payment.paidAt,
      payment.note || "",
    ];
  });
  downloadCsv(`controle-mensalidades-${YEAR}-pagamentos.csv`, [
    ["Código Aluno", "Nome", "Mês", "Valor pago", "Forma de pagamento", "Data", "Observação"],
    ...rows,
  ]);
}

function getStudentStatusLabel(student) {
  const status = getStudentStatus(student);
  if (status === "good") return "Adimplente";
  if (status === "bad") return "Inadimplente";
  return "Sem cobrança";
}

function getMonthStateLabel(stateName) {
  if (stateName === "paid") return "Pago";
  if (stateName === "pending") return "Pendente";
  if (stateName === "future") return "Futuro";
  return "Sem cobrança";
}

function downloadCsv(fileName, rows) {
  const csv = rows.map((row) => row.map(csvCell).join(";")).join("\n");
  downloadFile(fileName, `\ufeff${csv}`, "text/csv;charset=utf-8");
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function downloadFile(fileName, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

async function initializeHistoryLog() {
  try {
    if (backendAvailable) {
      await loadHistoryEntries();
      if (currentView === "settings") render();
      return;
    }
    await getHistoryDb();
    await loadHistoryEntries();
    if (currentView === "settings") render();
  } catch (error) {
    historyError = "Banco de histórico indisponível neste navegador.";
    console.error(error);
  }
}

function getHistoryDb() {
  if (!("indexedDB" in window)) {
    return Promise.reject(new Error("IndexedDB indisponível"));
  }
  if (historyDbPromise) return historyDbPromise;
  historyDbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(HISTORY_DB_NAME, HISTORY_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(HISTORY_STORE)) {
        const store = db.createObjectStore(HISTORY_STORE, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt", { unique: false });
        store.createIndex("entity", "entity", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Erro ao abrir histórico"));
  });
  return historyDbPromise;
}

async function recordChange({ action, entity, entityId, before, after, summary }) {
  try {
    const entry = {
      id: uniqueId("H"),
      appVersion: APP_VERSION,
      createdAt: new Date().toISOString(),
      action,
      entity,
      entityId,
      summary,
      before,
      after,
    };
    if (shouldTryBackend()) {
      await pushStateToServer(state);
      const result = await fetchApi("/api/history", {
        method: "POST",
        body: JSON.stringify({ entry }),
      });
      backendAvailable = true;
      backendError = "";
      historyEntries = Array.isArray(result.history) ? result.history : [entry, ...historyEntries];
      if (currentView === "settings") render();
      return;
    }
    const db = await getHistoryDb();
    await writeHistoryEntry(db, entry);
    await loadHistoryEntries();
    if (currentView === "settings") render();
  } catch (error) {
    historyError = "Não consegui registrar a alteração no banco de histórico.";
    showToast(historyError);
    console.error(error);
  }
}

function writeHistoryEntry(db, entry) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(HISTORY_STORE, "readwrite");
    transaction.objectStore(HISTORY_STORE).add(entry);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error("Erro ao salvar histórico"));
  });
}

async function loadHistoryEntries(limit = 100) {
  if (backendAvailable) {
    const result = await fetchApi(`/api/history?limit=${limit}`);
    historyEntries = Array.isArray(result.history) ? result.history : [];
    historyError = "";
    return historyEntries;
  }
  const db = await getHistoryDb();
  historyEntries = await new Promise((resolve, reject) => {
    const transaction = db.transaction(HISTORY_STORE, "readonly");
    const store = transaction.objectStore(HISTORY_STORE);
    const index = store.index("createdAt");
    const entries = [];
    const cursorRequest = index.openCursor(null, "prev");
    cursorRequest.onsuccess = () => {
      const cursor = cursorRequest.result;
      if (!cursor || entries.length >= limit) {
        resolve(entries);
        return;
      }
      entries.push(cursor.value);
      cursor.continue();
    };
    cursorRequest.onerror = () => reject(cursorRequest.error || new Error("Erro ao ler histórico"));
  });
  historyError = "";
  return historyEntries;
}

async function refreshHistory() {
  try {
    await loadHistoryEntries();
    showToast("Histórico atualizado.");
    render();
  } catch (error) {
    historyError = "Não consegui carregar o histórico.";
    showToast(historyError);
    render();
  }
}

function exportHistoryCsv() {
  if (!historyEntries.length) {
    showToast("Não há histórico para exportar.");
    return;
  }
  const rows = historyEntries.map((entry) => [
    formatDateTime(entry.createdAt),
    formatHistoryAction(entry.action),
    entry.entity,
    entry.entityId,
    entry.summary,
    JSON.stringify(entry.before ?? ""),
    JSON.stringify(entry.after ?? ""),
  ]);
  downloadCsv(`controle-mensalidades-${YEAR}-historico.csv`, [
    ["Data", "Ação", "Tipo", "Registro", "Resumo", "Antes", "Depois"],
    ...rows,
  ]);
}

function formatHistoryAction(action) {
  const labels = {
    "student.created": "Aluno cadastrado",
    "student.updated": "Aluno alterado",
    "student.deleted": "Aluno excluído",
    "payment.created": "Pagamento cadastrado",
    "payment.updated": "Pagamento alterado",
    "payment.deleted": "Pagamento excluído",
    "settings.updated": "Configuração alterada",
    "settings.list_added": "Item de lista adicionado",
    "settings.list_removed": "Item de lista removido",
    "settings.reference_updated": "Referência alterada",
    "system.reset": "Base restaurada",
    "system.imported": "Backup importado",
  };
  return labels[action] || action;
}

function isValidView(view) {
  return ["dashboard", "students", "payments", "settings"].includes(view);
}

function loadCurrentView() {
  try {
    const view = localStorage.getItem(VIEW_KEY);
    return isValidView(view) ? view : "dashboard";
  } catch (error) {
    return "dashboard";
  }
}

function saveCurrentView() {
  try {
    localStorage.setItem(VIEW_KEY, currentView);
  } catch (error) {
    console.error(error);
  }
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return migrateState(JSON.parse(saved));
  } catch (error) {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (removeError) {
      storageError = "Armazenamento local indisponível";
    }
  }
  return clone(seedState);
}

function migrateState(candidate) {
  const merged = clone(seedState);
  merged.students = Array.isArray(candidate.students) ? candidate.students : merged.students;
  merged.payments = Array.isArray(candidate.payments) ? candidate.payments : merged.payments;
  merged.settings = { ...merged.settings, ...(candidate.settings || {}) };
  merged.settings.groups = Array.isArray(merged.settings.groups) ? merged.settings.groups : [];
  merged.settings.methods = Array.isArray(merged.settings.methods) ? merged.settings.methods : [];
  merged.settings.referenceMonth = clamp(Number(merged.settings.referenceMonth) || getDefaultReferenceMonth(), 1, 12);
  merged.settings.reference = normalizeReferenceValue(
    merged.settings.reference || `${YEAR}-${String(merged.settings.referenceMonth).padStart(2, "0")}`,
  );
  merged.settings.referenceMonth = getReferenceScope(merged.settings.reference).month;
  merged.settings.defaultAmount = Number(merged.settings.defaultAmount || 0);
  merged.students = merged.students.map((student) => ({
    code: String(student.code),
    name: String(student.name || ""),
    cpf: onlyDigits(String(student.cpf || "")),
    email: String(student.email || ""),
    group: String(student.group || ""),
    enrollment: String(student.enrollment || `${YEAR}-01-01`),
    monthlyDueDate: String(student.monthlyDueDate || ""),
    leaveDate: String(student.leaveDate || ""),
    chargeLeaveMonth: Boolean(student.chargeLeaveMonth ?? true),
  }));
  merged.payments = merged.payments.map((payment) => ({
    id: String(payment.id || uniqueId("P")),
    studentCode: String(payment.studentCode),
    studentName: String(payment.studentName || ""),
    month: clamp(Number(payment.month) || 1, 1, 12),
    amount: Number(payment.amount || 0),
    method: String(payment.method || merged.settings.methods[0] || "Pix"),
    paidAt: String(payment.paidAt || todayIso()),
    note: String(payment.note || ""),
    createdAt: String(payment.createdAt || new Date().toISOString()),
  }));
  return merged;
}

function saveState(options = {}) {
  try {
    const payload = JSON.stringify({
      ...state,
      meta: {
        appVersion: APP_VERSION,
        savedAt: new Date().toISOString(),
      },
    });
    localStorage.setItem(STORAGE_KEY, payload);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== payload) {
      throw new Error("Falha ao confirmar gravação local");
    }
    storageError = "";
    lastSavedAt = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date());
    if (!options.localOnly && shouldTryBackend()) {
      void pushStateToServer(state).catch((error) => {
        backendAvailable = false;
        backendError = getBackendErrorMessage(error);
        updateSaveStatus();
        console.error(error);
      });
    }
    updateSaveStatus();
    return true;
  } catch (error) {
    storageError = "Não foi possível salvar neste navegador";
    updateSaveStatus();
    if (!options.silent) {
      showToast("Não consegui salvar no navegador. Exporte um backup e recarregue a página.");
    }
    console.error(error);
    return false;
  }
}

function updateSaveStatus() {
  const status = document.querySelector("#saveStatus");
  if (!status) return;
  const summary = `${state.students.length} alunos · ${state.payments.length} pagamentos · ${getReferenceShortLabel()}`;
  if (storageError) {
    status.textContent = `${storageError} · ${summary}`;
    return;
  }
  if (backendError && !backendAvailable) {
    status.textContent = `${backendError} · modo navegador · ${summary}`;
    return;
  }
  const source = backendAvailable ? getBackendSourceLabel() : "Dados deste navegador";
  status.textContent = `${lastSavedAt ? `Salvo às ${lastSavedAt}` : source} · ${summary}`;
}

function showDialog(selector) {
  const dialog = document.querySelector(selector);
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeDialog(selector) {
  const dialog = document.querySelector(selector);
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function hydrateIcons(root) {
  root.querySelectorAll("[data-icon]").forEach((node) => {
    const name = node.dataset.icon;
    if (icons[name]) node.innerHTML = icons[name];
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

function formatDate(value) {
  if (!value) return "-";
  const [year, month, day] = String(value).slice(0, 10).split("-");
  if (!year || !month || !day) return String(value);
  return `${day}/${month}/${year}`;
}

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(date);
}

function todayIso() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 10);
}

function getDefaultReferenceMonth() {
  const today = new Date();
  if (today.getFullYear() === YEAR) return today.getMonth() + 1;
  return 4;
}

function getDefaultReferenceValue() {
  return `${YEAR}-${String(getDefaultReferenceMonth()).padStart(2, "0")}`;
}

function getActiveReferenceValue() {
  return normalizeReferenceValue(state?.settings?.reference || getDefaultReferenceValue());
}

function normalizeReferenceValue(value) {
  if (String(value) === "all") return "all";
  const match = String(value || "").match(/^(\d{4})-(0[1-9]|1[0-2])$/);
  if (!match) return getDefaultReferenceValue();
  return `${match[1]}-${match[2]}`;
}

function getReferenceScope(value = getActiveReferenceValue()) {
  const reference = normalizeReferenceValue(value);
  if (reference === "all") return { all: true, year: YEAR, month: 12, value: "all" };
  const [year, month] = reference.split("-").map(Number);
  return { all: false, year, month, value: reference };
}

function getReferenceTitle() {
  const scope = getReferenceScope();
  if (scope.all) return `Todos os meses de ${YEAR}`;
  return `${longMonthNames[scope.month - 1]} de ${scope.year} (${scope.value})`;
}

function getReferenceShortLabel() {
  const scope = getReferenceScope();
  return scope.all ? "Todos" : scope.value;
}

function getMonthFromIso(value) {
  const month = Number(String(value).slice(5, 7));
  return month >= 1 && month <= 12 ? month : null;
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatCpf(value) {
  const digits = onlyDigits(value).slice(0, 11);
  if (!digits) return "";
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function uniqueId(prefix) {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
