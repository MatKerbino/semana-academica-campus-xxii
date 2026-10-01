/** Cartões e listas em HTML: atividades, histórico da inscrição e forma de participação. */
import { atividades, dias, tagsTipo, type TipoAtividade } from "../../data/evento";
import { esc } from "../api";
import { dataHora, formaTexto } from "./formatacao";
import { icone } from "./icones";
import type { FormaPagamento, InscricaoAdmin } from "./tipos";

export function tagTipo(tipo: TipoAtividade) {
  const tag = tagsTipo[tipo];
  if (!tag) return "";
  const ic = { mic: "mic-vocal", apresentacao: "presentation", capelo: "graduation-cap", imagem: "image", arquivo: "file-text" }[tag.icone];
  return `<span class="flex items-center gap-1.5 text-xs leading-[1.3] font-bold tracking-[0.4px] uppercase ${tag.cor}">${icone(ic, "size-3.5")}${esc(tag.rotulo)}</span>`;
}

/** Quantas das atividades da inscrição existem no catálogo atual (slugs antigos são ignorados). */
export const atividadesConhecidas = (slugs: string[]) => slugs.filter((s) => atividades.some((a) => a.slug === s));

/** Cartão de atividade (dia/hora, tipo, título e local), como nas telas de detalhe. */
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
