/** Peças comuns das telas públicas de artigos (autor e avaliador). */
import { esc, formatarDataHora } from "../api";
import type { ConfigArtigos } from "./api";

export const CARTAO = "rounded-cartao border border-borda bg-white p-6 shadow-[0_1px_3px_rgba(15,41,8,0.08)]";
export const LINK_BOTAO = "flex w-fit items-center justify-center gap-2 rounded-full border-2 border-verde-escuro bg-white px-[22px] py-2.5 text-[15px] leading-[1.3] font-bold text-verde-escuro hover:bg-palha";

export const avisoErro = (mensagem: string) =>
  `<div role="alert" class="rounded-campo border border-erro-borda bg-erro-fundo p-4 text-[15px] text-erro">${esc(mensagem)}</div>`;
export const avisoInfo = (mensagem: string) =>
  `<div role="status" class="rounded-campo border border-info-borda bg-info-fundo p-4 text-[15px] text-chumbo">${esc(mensagem)}</div>`;

const periodo = (c: ConfigArtigos) =>
  c.inicio || c.fim ? ` Período: ${c.inicio ? `de ${formatarDataHora(c.inicio)}` : ""}${c.fim ? ` até ${formatarDataHora(c.fim)}` : ""}.` : "";

/** Motivo de a submissão (ou a edição) estar fechada; vazio quando aberta. */
export function motivoFechado(c: ConfigArtigos, acao: "submissao" | "edicao"): string {
  const nome = acao === "submissao" ? "submissão" : "edição";
  const ativa = acao === "submissao" ? c.submissaoAtiva : c.edicaoAtiva;
  const aberta = acao === "submissao" ? c.abertaParaSubmissao : c.abertaParaEdicao;
  if (aberta) return "";
  return ativa ? `Fora do período de submissão: a ${nome} de artigos está encerrada ou ainda não começou.${periodo(c)}` : `A ${nome} de artigos está desativada pela organização no momento.`;
}

export function mostrarErroPagina(raiz: HTMLElement, e: unknown) {
  raiz.innerHTML = avisoErro(e instanceof Error ? e.message : "Não foi possível carregar a página.");
}
