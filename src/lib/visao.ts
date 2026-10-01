/** Fragmentos de tela renderizados no navegador (HTML como texto, sempre escapado com esc()). */
import { esc, formatarCPF, formatarData, formatarDataHora, formatarMoeda, rotuloPerfil, type Dados, type Inscricao } from "./api";

export type ItemCatalogo = {
  slug: string; titulo: string; tipo: "palestra" | "minicurso" | "curso" | "banner" | "artigo";
  dia: string; data: string; hora: string; horario: string; local: string; vagas: number | null;
};

/** Clona um ícone de <IconesCliente /> aplicando as classes. */
export function ico(nome: string, classe = "size-4"): string {
  const svg = document.querySelector(`#icones-cliente [data-icone="${nome}"] svg`)?.cloneNode(true) as SVGElement | undefined;
  if (!svg) return "";
  svg.setAttribute("class", `${classe} shrink-0`);
  svg.setAttribute("aria-hidden", "true");
  return svg.outerHTML;
}

const TAGS = {
  palestra: ["mic", "Palestra", "text-verde-medio"],
  minicurso: ["apresentacao", "Minicurso", "text-info-texto"],
  curso: ["capelo", "Curso", "text-curso"],
  banner: ["imagem", "Exposição de Banners", "text-divisor"],
  artigo: ["arquivo", "Apresentação de artigos", "text-chumbo"],
} as const;

export const tagTipo = (tipo: ItemCatalogo["tipo"]) => {
  const [icone, rotulo, cor] = TAGS[tipo];
  return `<span class="flex items-center gap-1.5 text-xs leading-[1.3] font-bold tracking-[0.4px] uppercase ${cor}">${ico(icone, "size-3.5")}${esc(rotulo)}</span>`;
};

export const formatarTelefone = (v = "") => v.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");

const rotuloCampo = "text-[13px] leading-normal text-texto-suave";
const valorCampo = "text-[15px] leading-normal text-chumbo";

export function gradeDados(d: Dados, extra = ""): string {
  const campo = (r: string, v: string) => `<div><p class="${rotuloCampo}">${r}</p><p class="${valorCampo}">${esc(v)}</p></div>`;
  return `<div class="grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
    ${campo("Nome completo", d.nome ?? "—")}${campo("CPF", formatarCPF(d.cpf))}
    ${campo("E-mail", d.email ?? "—")}${campo("Telefone", formatarTelefone(d.telefone))}
    ${campo("Data de nascimento", formatarData(d.dataNascimento))}${campo("Perfil", d.perfil ? rotuloPerfil[d.perfil] : "—")}
  </div>${extra}`;
}

export const seloEmail = (verificado: boolean) =>
  verificado
    ? `<span class="inline-flex items-center gap-1.5 rounded-full border border-info-borda bg-info-fundo px-2.5 py-1 text-[11px] font-bold tracking-[0.4px] text-info-texto uppercase">${ico("email-ok", "size-3.5")}E-mail verificado</span>`
    : `<span class="inline-flex items-center gap-1.5 rounded-full border border-pendente-borda bg-pendente-fundo px-2.5 py-1 text-[11px] font-bold tracking-[0.4px] text-pendente-texto uppercase">${ico("email", "size-3.5")}E-mail não verificado</span>`;

const SELOS: Record<string, string> = {
  verde: "border-entregue-borda bg-entregue-fundo text-entregue-texto",
  ambar: "border-pendente-borda bg-pendente-fundo text-pendente-texto",
  cinza: "border-borda bg-[#eeeeee] text-chumbo",
  azul: "border-info-borda bg-info-fundo text-info-texto",
};
export const selo = (cor: keyof typeof SELOS, icone: string, texto: string) =>
  `<span class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] leading-[1.3] font-bold tracking-[0.4px] uppercase ${SELOS[cor]}">${ico(icone, "size-3.5")}${esc(texto)}</span>`;

export const seloInscricao = (s: Inscricao["status"]) =>
  ({
    confirmada: selo("verde", "circulo-ok", "Inscrição confirmada"),
    cancelada: selo("cinza", "circulo-x", "Inscrição cancelada"),
    rascunho: selo("azul", "lapis", "Inscrição em preenchimento"),
  })[s];

/** Separa a descrição em destaque + detalhe: por quebra de linha ou, na falta dela, na primeira vírgula. */
export function separarDescricao(descricao: string | null): { destaque: string; detalhe: string } {
  const texto = (descricao ?? "").trim();
  const [primeira, ...resto] = texto.split("\n");
  if (resto.length) return { destaque: primeira, detalhe: resto.join(" ").trim() };
  const i = texto.indexOf(", ");
  if (i < 0) return { destaque: texto, detalhe: "" };
  const detalhe = texto.slice(i + 2);
  return { destaque: texto.slice(0, i), detalhe: detalhe.charAt(0).toUpperCase() + detalhe.slice(1) };
}

/** Cartão bege da forma de participação vigente. A 1ª linha de `descricao` é o destaque; o restante, o detalhe. */
export function formaParticipacao(p: { modalidade: string; valor: number | null; descricao: string | null } | null): string {
  if (!p) return "";
  const monetaria = p.modalidade === "monetaria";
  const { destaque, detalhe: resto } = separarDescricao(p.descricao);
  const titulo = monetaria ? `${formatarMoeda(p.valor ?? 0)} por participante` : destaque;
  const detalhe = monetaria ? p.descricao : resto;
  return `<div class="max-w-[360px] rounded-cartao border border-borda bg-creme p-4">
    <div class="flex items-center gap-2.5">
      <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-verde-escuro">${ico(monetaria ? "dinheiro" : "maca", "size-5")}</span>
      <div><p class="text-[13px] leading-[1.3] font-semibold text-verde-escuro">Forma de participação</p>
      <p class="text-xs leading-[1.3] text-texto-suave">${monetaria ? "Monetária" : "Não monetária"} · definida pela organização</p></div>
    </div>
    <p class="mt-3 text-[18px] leading-[1.4] font-semibold text-chumbo">${esc(titulo)}</p>
    ${detalhe ? `<p class="mt-2 text-[13px] leading-normal text-chumbo">${esc(detalhe)}</p>` : ""}
  </div>`;
}

export const linhaAtividade = (a: ItemCatalogo, extra = "") => `
  <li class="flex gap-4 rounded-campo border border-borda bg-white p-3.5">
    <div class="w-11 shrink-0"><p class="text-sm leading-[1.4] font-bold text-chumbo">${esc(a.data)}</p><p class="text-[13px] leading-normal text-texto-suave">${esc(a.hora)}</p></div>
    <div class="min-w-0 flex-1 space-y-1">
      ${tagTipo(a.tipo)}
      <p class="text-sm leading-[1.4] font-semibold text-chumbo">${esc(a.titulo)}</p>
      ${a.local ? `<p class="flex items-center gap-1.5 text-[13px] leading-normal text-texto-suave">${ico("pin", "size-3.5")}${esc(a.local)}</p>` : ""}
      ${extra}
    </div>
  </li>`;

const EVENTOS: Record<string, (i: Inscricao) => string | null> = {
  nova_inscricao_iniciada: () => "Nova inscrição iniciada",
  aceite_politica: () => "Aceite da Política de Privacidade registrado",
  inscricao_confirmada: () => "Inscrição confirmada",
  inscricao_editada: () => "Dados ou atividades da inscrição atualizados",
  email_verificado: () => "E-mail verificado",
  inscricao_cancelada: () => "Inscrição cancelada pelo participante",
  pagamento_regularizada: (i) =>
    i.pagamento?.modalidade === "monetaria"
      ? `Pagamento de ${formatarMoeda(i.pagamento.valor ?? 0)} registrado como regularizado pela organização`
      : "Compensação registrada como regularizada pela organização",
  pagamento_pendente: () => "Situação do pagamento voltou para pendente",
  devolucao_pendente: (i) => `Pendência de devolução de ${formatarMoeda(i.devolucao?.valor ?? 0)} registrada`,
  devolucao_devolvido: (i) => `Devolução de ${formatarMoeda(i.devolucao?.valor ?? 0)} registrada como concluída pela organização`,
};

export function historico(i: Inscricao): string {
  const linhas = (i.historico ?? [])
    .map((h) => ({ em: h.em, texto: EVENTOS[h.evento]?.(i) }))
    .filter((h) => h.texto);
  return linhas
    .map((h) => `<li class="flex items-start gap-2.5 text-[15px] leading-normal"><span class="mt-0.5 text-verde-medio">${ico("historico", "size-4")}</span><span class="w-[118px] shrink-0 text-[13px] leading-[1.7] text-texto-suave">${esc(formatarDataHora(h.em).replace(", ", " ").replace(":", "h"))}</span><span class="text-chumbo">${esc(h.texto)}</span></li>`)
    .join("");
}

/** Indicador de etapas (desktop) e barra de progresso (mobile) do fluxo de inscrição. */
export function passos(atual: 1 | 2 | 3): string {
  const nomes = ["Dados e política", "Atividades", "Revisão e confirmação"];
  const item = (n: number, nome: string) => {
    const feito = n < atual;
    const ativo = n === atual;
    const bolha = feito
      ? `<span class="flex size-[26px] items-center justify-center rounded-full bg-verde-medio text-white">${ico("ok", "size-3.5")}</span>`
      : `<span class="flex size-[26px] items-center justify-center rounded-full text-[13px] font-semibold ${ativo ? "bg-verde-escuro text-white" : "border-[1.5px] border-borda bg-white text-texto-suave"}">${n}</span>`;
    return `<li class="flex items-center gap-2.5" ${ativo ? 'aria-current="step"' : ""}>${bolha}<span class="text-sm ${ativo ? "font-bold text-verde-escuro" : feito ? "text-chumbo" : "text-texto-suave"}">${nome}</span></li>`;
  };
  const linha = (n: number) => `<li aria-hidden="true" class="h-px w-[52px] ${n < atual ? "bg-verde-medio" : "bg-borda"}"></li>`;
  return `<ol class="hidden flex-wrap items-center gap-3 sm:flex">${nomes.map((nm, i) => item(i + 1, nm) + (i < 2 ? linha(i + 1) : "")).join("")}</ol>
    <div class="sm:hidden"><p class="text-sm text-chumbo"><strong class="font-bold text-verde-escuro">Etapa ${atual} de 3</strong> · ${nomes[atual - 1]}</p>
    <div class="mt-2 flex h-1.5 gap-0.5 overflow-hidden rounded-full bg-borda"><span class="bg-verde-medio" style="width:${(atual / 3) * 100}%"></span></div></div>`;
}

export const cartao = "rounded-cartao border border-borda bg-white p-6 shadow-[0_1px_3px_rgba(15,41,8,0.08)]";
export const btnPrimario = "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-verde-cta px-[22px] py-3 text-[15px] leading-[1.3] font-bold text-verde-noite hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60";
export const btnContorno = "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-verde-escuro bg-white px-[22px] py-2.5 text-[15px] leading-[1.3] font-bold text-verde-escuro hover:bg-palha";
export const btnTexto = "inline-flex cursor-pointer items-center gap-2 py-2 text-[15px] leading-[1.3] font-bold text-verde-medio hover:underline";

/** Aviso temporário no canto superior direito (toast do protótipo). */
export function aviso(texto: string) {
  const el = document.createElement("div");
  el.setAttribute("role", "status");
  el.className = "fixed top-20 right-4 z-50 flex max-w-[380px] items-center gap-3 rounded-campo border border-entregue-borda bg-entregue-fundo px-4 py-3 text-[15px] text-entregue-texto shadow-lg";
  el.innerHTML = `${ico("circulo-ok", "size-5")}<span class="flex-1">${esc(texto)}</span><button type="button" aria-label="Fechar" class="cursor-pointer">${ico("fechar", "size-4")}</button>`;
  el.querySelector("button")!.addEventListener("click", () => el.remove());
  document.body.append(el);
  setTimeout(() => el.remove(), 6000);
}
