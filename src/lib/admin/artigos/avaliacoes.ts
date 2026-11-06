/** Avaliações: todas as registradas, com as observações para o autor e para a administração. */
import { esc } from "../../api";
import { avaliacoesAdmin, rotuloResultado, type AvaliacaoAdmin } from "../../artigos/api";
import { CLASSES, cabecalhoPagina, erroCarregar, filtroHtml } from "../componentes";
import { selo } from "../selos";

const OPCOES: [string, string][] = [["todas", "Todas"], ["pendente", "Pendentes"], ["concluida", "Concluídas"]];
const obs = (rotulo: string, v: string | null) =>
  `<div><p class="text-[13px] font-semibold text-texto-suave">${rotulo}</p><p class="text-[15px] leading-normal whitespace-pre-line text-chumbo">${v ? esc(v) : "—"}</p></div>`;

const cartao = (a: AvaliacaoAdmin) =>
  `<article class="${CLASSES.cartao} flex flex-col gap-3 !p-4"><div class="flex flex-wrap items-start justify-between gap-2">
    <div class="min-w-0 flex-1"><p class="text-base font-semibold text-verde-escuro">${esc(a.titulo)}</p><p class="text-[13px] text-texto-suave">Avaliador: ${esc(a.avaliador)}</p></div>
    <div class="flex flex-wrap gap-1.5">${a.status === "concluida" ? selo("Concluída", "ok", "circle-check") : selo("Pendente", "pendente", "clock")}${a.status === "concluida" ? selo(a.liberada ? "Liberada ao autor" : "Não liberada", a.liberada ? "info" : "neutro") : ""}</div></div>
    ${a.status === "concluida" ? `<p class="text-sm font-semibold text-chumbo">Resultado: ${a.resultado ? esc(rotuloResultado[a.resultado]) : "—"}</p>${obs("Observações para o autor", a.observacoesAutor)}${obs("Observações só para a administração", a.observacoesAdmin)}` : ""}</article>`;

export async function iniciarAvaliacoes(raiz: HTMLElement) {
  let lista: AvaliacaoAdmin[];
  try {
    lista = await avaliacoesAdmin();
  } catch (e) {
    raiz.innerHTML = erroCarregar(e);
    return;
  }
  const desenhar = (filtro: string, foco = false) => {
    const itens = lista.filter((a) => filtro === "todas" || a.status === filtro);
    raiz.innerHTML = `${cabecalhoPagina("Avaliações", "Todas as avaliações registradas, liberadas ou não. A consulta não altera a liberação.")}
      <div>${filtroHtml("filtro", "Situação", OPCOES, filtro, "todas")}</div>
      <div class="grid gap-3 lg:grid-cols-2">${itens.length ? itens.map(cartao).join("") : `<p class="text-sm text-texto-suave">Nenhuma avaliação encontrada.</p>`}</div>`;
    if (foco) raiz.querySelector<HTMLElement>("#filtro")!.focus();
  };
  raiz.addEventListener("change", (e) => {
    if ((e.target as HTMLElement).id === "filtro") desenhar((e.target as HTMLSelectElement).value, true);
  });
  desenhar("todas");
}
