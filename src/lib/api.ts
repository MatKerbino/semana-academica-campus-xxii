/** Cliente da API da Semana Acadêmica (contrato em semana-academica-api/docs/API.md). */
const BASE = ((import.meta.env.PUBLIC_API_URL as string | undefined) ?? "").replace(/\/+$/, "");
const CHAVE = "semana:sessao";

export type Papel = "participante" | "admin";
export type Sessao = { token: string; expiraEm: string; usuario: { login: string; papel: Papel; nome?: string | null } };

export type Pagamento = {
  modalidade: "monetaria" | "nao_monetaria";
  valor: number | null;
  descricao: string | null;
  orientacoes?: string | null;
  prazoCancelamento: string | null;
  prazoAlteracao: string | null;
  atualizadoEm: string | null;
  atualizadoPor: string | null;
};

export type Dados = {
  nome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  dataNascimento?: string;
  perfil?: "estudante" | "professor" | "profissional" | "outro";
};

export type Inscricao = {
  numero: string | null;
  status: "rascunho" | "confirmada" | "cancelada";
  dados: Dados;
  emailVerificado: boolean;
  /** O rascunho foi criado já preenchido com os dados salvos na conta. */
  dadosDoPerfil?: boolean;
  versaoPolitica: string | null;
  historico: { evento: string; em: string }[];
  atividades: string[];
  aceitePrivacidade: boolean;
  aceiteEm: string | null;
  pagamento: { modalidade: Pagamento["modalidade"]; valor: number | null; descricao: string | null } | null;
  situacaoPagamento: "pendente" | "regularizada" | null;
  devolucao: { situacao: "pendente" | "devolvido"; valor: number | null; atualizadaEm: string } | null;
  criadaEm: string;
  atualizadaEm: string;
  confirmadaEm: string | null;
  canceladaEm: string | null;
  podeEditar: boolean;
  podeAlterarAtividades: boolean;
  podeCancelar: boolean;
};

export type Vagas = Record<string, { vagas: number | null; ocupadas: number; disponivel: boolean }>;

export class ApiError extends Error {
  constructor(
    mensagem: string,
    public status: number,
    public campos: Record<string, string> = {},
  ) {
    super(mensagem);
  }
}

export function sessao(): Sessao | null {
  try {
    const s = JSON.parse(localStorage.getItem(CHAVE) ?? "null") as Sessao | null;
    if (s && new Date(s.expiraEm).getTime() > Date.now()) return s;
    localStorage.removeItem(CHAVE);
  } catch {
    /* armazenamento indisponível: trata como deslogado */
  }
  return null;
}

export const salvarSessao = (s: Sessao) => localStorage.setItem(CHAVE, JSON.stringify(s));
export const sair = () => {
  try {
    localStorage.removeItem(CHAVE);
  } catch {}
};

type Opcoes = { metodo?: string; corpo?: unknown; auth?: boolean };

export async function api<T = unknown>(caminho: string, { metodo = "GET", corpo, auth = true }: Opcoes = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (corpo !== undefined) headers["Content-Type"] = "application/json";
  const s = auth ? sessao() : null;
  if (s) headers.Authorization = `Bearer ${s.token}`;

  let resposta: Response;
  try {
    resposta = await fetch(`${BASE}${caminho}`, {
      method: metodo,
      headers,
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
    });
  } catch {
    throw new ApiError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.", 0);
  }
  const json = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    if (resposta.status === 401 && s) {
      sair();
      const voltar = encodeURIComponent(location.pathname + location.search);
      location.href = `${import.meta.env.BASE_URL}/entrar?voltar=${voltar}`.replace(/\/{2,}/g, "/");
    }
    throw new ApiError(json.erro ?? "Ocorreu um erro inesperado.", resposta.status, json.campos);
  }
  return json as T;
}

/** Guarda de rota no cliente: redireciona para o login quando não há sessão (ou papel insuficiente). A autorização real é da API. */
export function exigirLogin(papel?: Papel): Sessao | null {
  const s = sessao();
  const base = import.meta.env.BASE_URL;
  if (!s) {
    location.replace(`${base}/entrar?voltar=${encodeURIComponent(location.pathname + location.search)}`.replace(/\/{2,}/g, "/"));
    return null;
  }
  if (papel && s.usuario.papel !== papel) {
    location.replace(`${base}/`.replace(/\/{2,}/g, "/"));
    return null;
  }
  return s;
}

export const rotuloPerfil = { estudante: "Estudante", professor: "Professor(a)", profissional: "Profissional", outro: "Outro" } as const;

export const formatarCPF = (v = "") => v.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
export const formatarData = (iso?: string | null) => {
  if (!iso) return "—";
  const [a, m, d] = iso.slice(0, 10).split("-");
  return `${d}/${m}/${a}`;
};
export const formatarDataHora = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "—";
export const formatarMoeda = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const descreverPagamento = (p: { modalidade: string; valor: number | null; descricao: string | null } | null) =>
  !p ? "Não definida" : p.modalidade === "monetaria" ? `Pagamento de ${formatarMoeda(p.valor ?? 0)}` : (p.descricao ?? "Compensação não monetária");

export const rotuloSituacaoInscricao = { rascunho: "Em preenchimento", confirmada: "Confirmada", cancelada: "Cancelada" } as const;
export const rotuloSituacaoPagamento = { pendente: "Pendente", regularizada: "Regularizada" } as const;
export const rotuloDevolucao = { pendente: "Devolução pendente", devolvido: "Devolvido" } as const;

export const esc = (t: unknown) =>
  String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const soDigitos = (v: string) => v.replace(/\D/g, "");

/** Mostra erros gerais (região aria-live) e por campo em um formulário. */
export function mostrarErro(form: HTMLElement, erro: unknown) {
  const e = erro instanceof ApiError ? erro : new ApiError("Ocorreu um erro inesperado.", 0);
  const geral = form.querySelector<HTMLElement>("[data-erro-geral]");
  form.querySelectorAll<HTMLElement>("[data-erro]").forEach((el) => (el.textContent = ""));
  form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  const semAlvo: string[] = [];
  for (const [chave, msg] of Object.entries(e.campos ?? {})) {
    const campo = chave.split(".").pop()!; // aceita "dados.cpf" e "cpf"
    const alvo = form.querySelector<HTMLElement>(`[data-erro="${campo}"]`);
    if (!alvo) semAlvo.push(msg);
    if (alvo) {
      alvo.textContent = msg;
      form.querySelector(`[name="${campo}"]`)?.setAttribute("aria-invalid", "true");
    }
  }
  if (geral) {
    (geral.querySelector("[data-erro-texto]") ?? geral).textContent = [e.message, ...semAlvo].join(" ");
    geral.hidden = false;
  }
  (form.querySelector("[aria-invalid]") as HTMLElement | null)?.focus();
}

export function limparErro(form: HTMLElement) {
  form.querySelectorAll<HTMLElement>("[data-erro]").forEach((el) => (el.textContent = ""));
  const geral = form.querySelector<HTMLElement>("[data-erro-geral]");
  if (geral) {
    (geral.querySelector("[data-erro-texto]") ?? geral).textContent = "";
    geral.hidden = true;
  }
}

export const caminho = (p: string) => `${import.meta.env.BASE_URL}/${p}`.replace(/\/{2,}/g, "/");

/** Após login: só aceita retorno para caminho interno do próprio site. */
export function destinoSeguro(voltar: string | null, padrao: string) {
  const base = import.meta.env.BASE_URL as string;
  return voltar && voltar.startsWith(base) && !voltar.startsWith("//") ? voltar : caminho(padrao);
}

/** Erro de validação local, no mesmo formato dos erros da API. */
export const erroCampos = (campos: Record<string, string>, mensagem = "Corrija os campos destacados.") =>
  new ApiError(mensagem, 400, campos);
