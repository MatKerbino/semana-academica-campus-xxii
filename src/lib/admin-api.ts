/** Cliente e utilitários do painel administrativo (contrato em semana-academica-api/docs/API.md). */
import { atividades, dias, tagsTipo, type TipoAtividade } from "../data/evento";
import { ApiError, caminho, esc, formatarCPF, formatarData, formatarMoeda, sair, sessao, type Sessao } from "./api";

export { ApiError, caminho, esc, formatarCPF, formatarData, formatarMoeda, sair };

const BASE = ((import.meta.env.PUBLIC_API_URL as string | undefined) ?? "").replace(/\/+$/, "");

/** Chamada autenticada à API. Em 401 encerra a sessão e volta ao login do painel (exceto quando `sairEm401` é false). */
export async function api<T = unknown>(rota: string, { metodo = "GET", corpo, sairEm401 = true }: { metodo?: string; corpo?: unknown; sairEm401?: boolean } = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (corpo !== undefined) headers["Content-Type"] = "application/json";
  const s = sessao();
  if (s) headers.Authorization = `Bearer ${s.token}`;
  let resposta: Response;
  try {
    resposta = await fetch(`${BASE}${rota}`, { method: metodo, headers, body: corpo === undefined ? undefined : JSON.stringify(corpo) });
  } catch {
    throw new ApiError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.", 0);
  }
  const json = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    if (resposta.status === 401 && sairEm401) {
      sair();
      location.href = `${caminho("/admin/entrar")}?voltar=${encodeURIComponent(location.pathname + location.search)}`;
    }
    throw new ApiError(json.erro ?? "Ocorreu um erro inesperado.", resposta.status, json.campos);
  }
  return json as T;
}

export type Modalidade = "monetaria" | "nao_monetaria";
export type Perfil = "estudante" | "professor" | "profissional" | "outro";

export type FormaPagamento = {
  modalidade: Modalidade;
  valor: number | null;
  descricao: string | null;
  orientacoes?: string | null;
  atualizadoEm?: string | null;
  atualizadoPor?: string | null;
};

export type InscricaoAdmin = {
  login: string;
  numero: string | null;
  status: "rascunho" | "confirmada" | "cancelada";
  dados: { nome?: string; cpf?: string; email?: string; telefone?: string; dataNascimento?: string; perfil?: Perfil };
  emailVerificado?: boolean;
  atividades: string[];
  aceiteEm: string | null;
  versaoPolitica: string | null;
  pagamento: { modalidade: Modalidade; valor: number | null; descricao: string | null } | null;
  situacaoPagamento: "pendente" | "regularizada" | null;
  devolucao: { situacao: "pendente" | "devolvido"; valor: number | null; atualizadaEm: string } | null;
  historico?: { evento: string; em: string }[];
  criadaEm: string;
  confirmadaEm: string | null;
  canceladaEm: string | null;
};

export type ParticipanteLinha = {
  login: string;
  criadoEm: string;
  ultimoAcesso?: string | null;
  nome: string | null;
  statusInscricao: InscricaoAdmin["status"] | null;
};

// ---------- sessão e guarda de rota ----------

/** Só deixa passar administradores; os demais vão para o login do painel ou para "acesso restrito". */
export function exigirAdmin(): Sessao | null {
  const s = sessao();
  if (!s) {
    location.replace(`${caminho("/admin/entrar")}?voltar=${encodeURIComponent(location.pathname + location.search)}`);
    return null;
  }
  if (s.usuario.papel !== "admin") {
    location.replace(caminho("/admin/acesso-negado"));
    return null;
  }
  return s;
}

const iniciais = (nome: string) =>
  nome.replace(/[^\p{L}\p{N}]+/gu, " ").trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

/** Preenche a barra superior, liga o menu mobile e o botão Sair; devolve a sessão (ou null se redirecionou). */
export function iniciarPainel(): Sessao | null {
  const s = exigirAdmin();
  if (!s) return null;
  const nome = (s.usuario as { nome?: string | null }).nome || s.usuario.login;
  document.querySelectorAll("[data-admin-nome]").forEach((e) => (e.textContent = nome));
  document.querySelectorAll("[data-admin-iniciais]").forEach((e) => (e.textContent = iniciais(nome)));
  document.getElementById("admin-raiz")!.hidden = false;

  const gaveta = document.getElementById("admin-menu")!;
  const fundo = document.getElementById("admin-fundo")!;
  const alternar = (aberto: boolean) => {
    gaveta.classList.toggle("-translate-x-full", !aberto);
    fundo.hidden = !aberto;
    document.querySelector("[data-abrir-menu]")?.setAttribute("aria-expanded", String(aberto));
  };
  document.querySelector("[data-abrir-menu]")?.addEventListener("click", () => alternar(true));
  fundo.addEventListener("click", () => alternar(false));
  document.querySelectorAll("[data-sair]").forEach((b) =>
    b.addEventListener("click", () => {
      sair();
      location.href = caminho("/admin/entrar");
    }),
  );
  return s;
}

// ---------- API ----------

export const resumo = () =>
  api<{
    atualizadoEm: string;
    inscricoesConfirmadas: number;
    compensacoesPendentes: number;
    compensacoesRegularizadas: number;
    contasSemInscricao: number;
    pagamento: FormaPagamento;
    recentes: InscricaoAdmin[];
  }>("/admin/resumo");
export const participantes = () => api<{ participantes: ParticipanteLinha[] }>("/admin/participantes").then((r) => r.participantes);
export const participante = (login: string) =>
  api<{ participante: { login: string; criadoEm: string; ultimoAcesso: string | null; inscricao: InscricaoAdmin | null } }>(
    `/admin/participantes/${encodeURIComponent(login)}`,
  ).then((r) => r.participante);
export const inscricoes = () => api<{ inscricoes: InscricaoAdmin[] }>("/admin/inscricoes").then((r) => r.inscricoes);
export const inscricao = (login: string) =>
  api<{ inscricao: InscricaoAdmin }>(`/admin/inscricoes/${encodeURIComponent(login)}`).then((r) => r.inscricao);
export const formaPagamento = () => api<FormaPagamento>("/admin/pagamento");
export const salvarFormaPagamento = (corpo: Record<string, unknown>) =>
  api<FormaPagamento>("/admin/pagamento", { metodo: "PUT", corpo });
export const atualizarPagamento = (login: string, corpo: { situacao: string; observacao?: string }) =>
  api<{ inscricao: InscricaoAdmin }>(`/admin/inscricoes/${encodeURIComponent(login)}/pagamento`, { metodo: "PATCH", corpo }).then((r) => r.inscricao);
export const atualizarDevolucao = (login: string, corpo: { situacao: string; dataDevolucao?: string; observacao?: string }) =>
  api<{ inscricao: InscricaoAdmin }>(`/admin/inscricoes/${encodeURIComponent(login)}/devolucao`, { metodo: "PATCH", corpo }).then((r) => r.inscricao);
export const minhaConta = () =>
  api<{ login: string; papel: string; nome: string | null; ultimoAcesso: string | null }>("/me");
export const alterarSenha = (corpo: { senhaAtual: string; novaSenha: string; confirmacaoNovaSenha: string }) =>
  api<{ mensagem: string }>("/me/senha", { metodo: "POST", corpo, sairEm401: false });

// ---------- formatação ----------

export const rotuloPerfil: Record<Perfil, string> = { estudante: "Estudante", professor: "Professor(a)", profissional: "Profissional", outro: "Outro" };
export const formatarTelefone = (v = "") =>
  v.length === 11 ? v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : v.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
export const dataHora = (iso?: string | null, separador = " ") => {
  if (!iso) return "—";
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}${separador}${p(d.getHours())}h${p(d.getMinutes())}`;
};
export const dataCurta = (iso?: string | null) => {
  const d = iso ? new Date(iso) : null;
  return d && !Number.isNaN(d.getTime()) ? formatarData(d.toISOString()) : "—";
};
export const contar = (n: number, singular: string, plural: string) => `${n} ${n === 1 ? singular : plural}`;

export const formaTexto = (f: FormaPagamento) =>
  f.modalidade === "monetaria"
    ? { titulo: f.valor == null ? "—" : `${formatarMoeda(f.valor)} por participante`, apoio: f.descricao ?? "", rotulo: "Monetária" }
    : { titulo: f.descricao ?? "—", apoio: f.orientacoes ?? "", rotulo: "Não monetária" };

// ---------- ícones (renderizados no servidor pelo AdminLayout e clonados aqui) ----------

export function icone(nome: string, classe = "size-[18px]") {
  const molde = document.querySelector<HTMLElement>(`#admin-icones [data-i="${nome}"] svg`);
  if (!molde) return "";
  const svg = molde.cloneNode(true) as SVGElement;
  svg.setAttribute("class", `${classe} shrink-0`);
  svg.setAttribute("aria-hidden", "true");
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  return svg.outerHTML;
}

// ---------- componentes em HTML ----------

type Tom = "ok" | "pendente" | "neutro" | "info";
const tons: Record<Tom, string> = {
  ok: "border-entregue-borda bg-entregue-fundo text-entregue-texto",
  pendente: "border-pendente-borda bg-pendente-fundo text-pendente-texto",
  neutro: "border-[#ccc] bg-[#ececec] text-[#555]",
  info: "border-info-borda bg-info-fundo text-info-texto",
};

export function selo(texto: string, tom: Tom, ic?: string) {
  return `<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs leading-[1.3] font-bold tracking-[0.4px] uppercase ${tons[tom]}">${ic ? icone(ic, "size-3.5") : ""}${esc(texto)}</span>`;
}

const STATUS = {
  confirmada: ["Confirmada", "ok", "circle-check"],
  cancelada: ["Cancelada", "neutro", "circle-x"],
  rascunho: ["Em preenchimento", "info", "clock"],
  sem: ["Sem inscrição", "neutro", "minus"],
} as const;
export function seloInscricao(status: keyof typeof STATUS | null, comIcone = false, prefixo = "") {
  const [t, tom, ic] = STATUS[status ?? "sem"];
  return selo(prefixo + t, tom, comIcone ? ic : undefined);
}

/** Situação do pagamento ou compensação de uma inscrição (não se aplica a canceladas sem devolução). */
export function situacaoPagamento(i: InscricaoAdmin): "pendente" | "regularizada" | "nao_aplica" {
  if (i.status === "rascunho") return "nao_aplica";
  if (i.status === "cancelada" && !i.devolucao) return "nao_aplica";
  return i.situacaoPagamento ?? "nao_aplica";
}
export function seloPagamento(i: InscricaoAdmin, comIcone = false, prefixo = "") {
  const s = situacaoPagamento(i);
  if (s === "pendente") return selo(prefixo + "Pendente", "pendente", comIcone ? "clock" : undefined);
  if (s === "regularizada") return selo(prefixo + "Regularizada", "ok", comIcone ? "circle-check" : undefined);
  return selo(prefixo + "Não se aplica", "neutro", comIcone ? "minus" : undefined);
}
export const situacaoDevolucao = (i: InscricaoAdmin) => i.devolucao?.situacao ?? "nao_aplica";
export function seloDevolucao(i: InscricaoAdmin, comIcone = false) {
  const s = situacaoDevolucao(i);
  if (s === "pendente") return selo("Pendente", "pendente", comIcone ? "undo-2" : undefined);
  if (s === "devolvido") return selo("Devolvido", "ok", comIcone ? "circle-check" : undefined);
  return selo("Não se aplica", "neutro", comIcone ? "minus" : undefined);
}

export function tagTipo(tipo: TipoAtividade) {
  const tag = tagsTipo[tipo];
  if (!tag) return "";
  const ic = { mic: "mic-vocal", apresentacao: "presentation", capelo: "graduation-cap", imagem: "image", arquivo: "file-text" }[tag.icone];
  return `<span class="flex items-center gap-1.5 text-xs leading-[1.3] font-bold tracking-[0.4px] uppercase ${tag.cor}">${icone(ic, "size-3.5")}${esc(tag.rotulo)}</span>`;
}

/** Cartão de atividade (dia/hora, tipo, título e local), como nas telas de detalhe. */
/** Quantas das atividades da inscrição existem no catálogo atual (slugs antigos são ignorados). */
export const atividadesConhecidas = (slugs: string[]) => slugs.filter((s) => atividades.some((a) => a.slug === s));

export function cartaoAtividade(slug: string) {
  const a = atividades.find((x) => x.slug === slug);
  if (!a) return ""; // slug desconhecido (atividade de um catálogo antigo): não exibir
  const dia = dias.find((d) => d.id === a.dia)!.rotulo.slice(0, 5);
  return `<li class="flex gap-4 rounded-campo border border-borda bg-white p-3.5">
    <div class="w-11 shrink-0"><p class="text-sm leading-[1.4] font-semibold text-chumbo">${dia}</p><p class="text-[13px] text-texto-suave">${esc(a.hora)}</p></div>
    <div class="flex min-w-0 flex-col gap-1">${tagTipo(a.tipo)}<p class="text-sm leading-[1.4] font-semibold text-chumbo">${esc(a.titulo)}</p>
    ${a.local ? `<p class="flex items-center gap-1.5 text-[13px] text-texto-suave">${icone("map-pin", "size-3.5")}${esc(a.local)}</p>` : ""}</div></li>`;
}

const EVENTOS: Record<string, string> = {
  aceite_politica: "Aceite da Política de Privacidade registrado",
  inscricao_confirmada: "Inscrição confirmada pelo participante",
  email_verificado: "E-mail verificado",
  inscricao_editada: "Dados ou atividades da inscrição alterados",
  inscricao_cancelada: "Inscrição cancelada pelo participante",
  pagamento_pendente: "Pagamento/compensação: Regularizada → Pendente",
  pagamento_regularizada: "Pagamento/compensação: Pendente → Regularizada",
  devolucao_pendente: "Devolução do pagamento: pendente",
  devolucao_devolvido: "Devolução do pagamento: registrada como Devolvido",
};
export const historicoLinhas = (i: InscricaoAdmin) =>
  (i.historico ?? [])
    .filter((h) => h.evento in EVENTOS)
    .sort((a, b) => a.em.localeCompare(b.em))
    .map((h) => `<li class="flex items-start gap-2 text-[13px] leading-normal text-chumbo">${icone("history", "mt-0.5 size-3.5 text-verde-medio")}<span>${dataHora(h.em, " ")} · ${esc(EVENTOS[h.evento])}</span></li>`)
    .join("");

export function formaParticipacaoCartao(f: FormaPagamento, classe = "") {
  const t = formaTexto(f);
  return `<div class="flex flex-col gap-2.5 rounded-campo border border-borda bg-creme p-5 ${classe}">
    <div class="flex items-center gap-3"><span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-verde-escuro">${icone(f.modalidade === "monetaria" ? "banknote" : "apple", "size-5")}</span>
    <div><p class="text-sm leading-[1.4] font-semibold text-verde-escuro">Forma de participação</p><p class="text-[13px] text-texto-suave">${t.rotulo} · definida pela organização</p></div></div>
    <p class="text-lg leading-[1.4] font-semibold text-chumbo">${esc(t.titulo)}</p>${t.apoio ? `<p class="text-[13px] leading-normal text-chumbo">${esc(t.apoio)}</p>` : ""}</div>`;
}

// ---------- interação ----------

const CLASSE_TOAST = "fixed top-20 right-4 left-4 z-50 flex items-start gap-3 rounded-campo border border-entregue-borda bg-entregue-fundo p-4 shadow-lg sm:left-auto sm:w-[366px] lg:right-6";
export function toast(mensagem: string) {
  document.getElementById("admin-toast")?.remove();
  const el = document.createElement("div");
  el.id = "admin-toast";
  el.setAttribute("role", "status");
  el.className = CLASSE_TOAST;
  el.innerHTML = `${icone("circle-check", "mt-0.5 size-5 text-entregue-texto")}<p class="flex-1 text-sm leading-[1.4] font-medium text-entregue-texto">${esc(mensagem)}</p><button type="button" aria-label="Fechar aviso" class="cursor-pointer text-texto-suave">${icone("x", "size-[18px]")}</button>`;
  el.querySelector("button")!.addEventListener("click", () => el.remove());
  document.body.append(el);
  setTimeout(() => el.remove(), 8000);
}

/** Abre um diálogo modal com o HTML dado; devolve o elemento e uma função para fechar. */
export function abrirModal(html: string) {
  const anterior = document.activeElement as HTMLElement | null;
  const fundo = document.createElement("div");
  fundo.className = "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-verde-noite/70 p-4";
  fundo.innerHTML = `<div role="dialog" aria-modal="true" class="w-full max-w-[434px] rounded-[16px] bg-white p-6 shadow-2xl">${html}</div>`;
  const fechar = () => {
    fundo.remove();
    document.removeEventListener("keydown", tecla);
    anterior?.focus();
  };
  const tecla = (e: KeyboardEvent) => e.key === "Escape" && fechar();
  document.addEventListener("keydown", tecla);
  document.body.append(fundo);
  const dialogo = fundo.firstElementChild as HTMLElement;
  dialogo.querySelector<HTMLElement>("input:checked, input, button")?.focus();
  return { dialogo, fechar };
}

export const CLASSES = {
  botaoPrimario: "flex cursor-pointer items-center justify-center gap-2 rounded-full bg-verde-cta px-[22px] py-3 text-[15px] leading-[1.3] font-bold text-verde-noite hover:brightness-95 disabled:opacity-60",
  botaoContorno: "flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-verde-escuro bg-white px-[22px] py-3 text-[15px] leading-[1.3] font-bold text-verde-escuro hover:bg-palha",
  campo: "group flex h-12 items-center gap-2.5 rounded-campo border-[1.5px] border-borda bg-white px-3.5 focus-within:border-verde-medio",
  entrada: "min-w-0 flex-1 bg-transparent text-[15px] text-chumbo outline-none placeholder:text-texto-suave",
  cartao: "rounded-cartao border border-borda bg-white p-6 shadow-[0_1px_3px_rgba(15,41,8,0.08)]",
  titulo: "text-[18px] leading-[1.4] font-semibold text-verde-escuro",
};

export const eStatusErro = (e: unknown) => (e instanceof ApiError ? e : new ApiError("Ocorreu um erro inesperado.", 0));

/** Paginação simples no cliente ("Anterior" / "Próxima"). */
export function paginar<T>(itens: T[], pagina: number, tamanho: number) {
  const paginas = Math.max(1, Math.ceil(itens.length / tamanho));
  const atual = Math.min(Math.max(pagina, 1), paginas);
  return { itens: itens.slice((atual - 1) * tamanho, atual * tamanho), atual, paginas };
}

export const normalizar = (t: string) => t.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

// ---------- blocos de página ----------

export const cabecalhoPagina = (titulo: string, descricao?: string) =>
  `<div class="flex flex-col gap-1.5"><h1 class="text-[32px] leading-[1.3] font-bold text-verde-escuro max-lg:text-[26px]">${esc(titulo)}</h1>${descricao ? `<p class="text-[15px] leading-normal text-chumbo">${esc(descricao)}</p>` : ""}</div>`;

/** Filtro em pílula ("Inscrição: Todas ˅"): fica verde quando o valor difere do padrão. */
export function filtroHtml(id: string, rotulo: string, opcoes: [string, string][], valor: string, padrao: string, extra = "") {
  const ativo = valor !== padrao;
  return `<label class="${extra} relative flex cursor-pointer items-center gap-1 rounded-full border-solid bg-white py-2.5 pr-9 pl-4 text-sm leading-[1.3] font-semibold text-verde-escuro ${ativo ? "border-2 border-verde-medio bg-entregue-fundo" : "border-[1.5px] border-borda"}">
    <span>${esc(rotulo)}:</span>
    <select id="${id}" class="cursor-pointer appearance-none bg-transparent font-semibold outline-none">${opcoes.map(([v, t]) => `<option value="${v}" ${v === valor ? "selected" : ""}>${esc(t)}</option>`).join("")}</select>
    <span class="pointer-events-none absolute right-3.5">${icone("chevron-down", "size-4")}</span></label>`;
}

export const buscaHtml = (id: string, valor = "") =>
  `<label class="flex h-12 w-full items-center gap-2.5 rounded-campo border-[1.5px] border-borda bg-white px-3.5 focus-within:border-verde-medio sm:w-80"><span class="sr-only">Buscar</span>${icone("search", "size-5 text-chumbo")}
   <input id="${id}" type="search" value="${esc(valor)}" placeholder="Buscar por nome, CPF ou e-mail" class="${CLASSES.entrada}" /></label>`;

export const botaoOlho = (href: string, rotulo: string) =>
  `<a href="${href}" aria-label="${esc(rotulo)}" class="flex size-9 items-center justify-center rounded-campo border-[1.5px] border-borda bg-white text-verde-escuro hover:bg-palha">${icone("eye", "size-[18px]")}</a>`;

export const rodapeTabela = (texto: string, atual: number, paginas: number) =>
  `<div class="flex flex-wrap items-center justify-between gap-3"><p class="text-[13px] text-texto-suave">${esc(texto)}</p>
   <div class="flex gap-3"><button type="button" data-pag="-1" ${atual <= 1 ? "disabled" : ""} class="flex cursor-pointer items-center gap-2 rounded-full border-2 border-borda bg-white px-[22px] py-2.5 text-[15px] font-bold text-verde-escuro disabled:opacity-50">${icone("arrow-left", "size-[18px]")}Anterior</button>
   <button type="button" data-pag="1" ${atual >= paginas ? "disabled" : ""} class="cursor-pointer rounded-full border-2 border-verde-escuro bg-white px-[22px] py-2.5 text-[15px] font-bold text-verde-escuro disabled:opacity-50">Próxima</button></div></div>`;

export const cabecalhoColuna = "px-3 py-3 text-left text-xs leading-[1.3] font-bold tracking-[0.4px] text-texto-suave uppercase";

export const erroCarregar = (e: unknown) =>
  `<div role="alert" class="rounded-campo border border-erro-borda bg-erro-fundo p-4 text-sm font-semibold text-erro">${esc(eStatusErro(e).message)}</div>`;
