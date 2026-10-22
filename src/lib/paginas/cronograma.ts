/** Cronograma: uma aba por dia do evento, com as sessões das atividades cadastradas. */
import { esc } from "../api";
import { diasDoEvento, eSelecionavel, horaTexto, icone, linkAtividade, obterConteudo, sessoesDoDia, type Conteudo } from "../conteudo";
import { url } from "../url";
import { registrarPronto, tagTipo } from "./comum";

const linha = (c: Conteudo, { atividade: a, sessao }: ReturnType<typeof sessoesDoDia>[number]) => {
  const selecionavel = eSelecionavel(a);
  return `<li class="flex flex-col gap-x-5 gap-y-1.5 px-5 py-3.5 even:bg-palha md:flex-row md:items-center">
    <span class="flex w-[130px] shrink-0 items-center gap-2 text-sm leading-[1.4] font-semibold text-verde-escuro">${icone("clock", "size-4")}${horaTexto(sessao.inicio)}–${horaTexto(sessao.fim)}</span>
    <span class="flex min-w-0 flex-1 flex-col gap-1">
      ${selecionavel ? tagTipo(c, a.tipo) : `<span class="text-xs leading-[1.3] font-bold tracking-[0.4px] text-texto-suave uppercase">Programação geral · Não requer seleção</span>`}
      <span class="text-sm leading-[1.4] font-semibold text-chumbo">${esc(a.titulo)}</span>
      ${a.local ? `<span class="flex items-center gap-1.5 text-[13px] leading-normal text-texto-suave">${icone("map-pin", "size-3.5")}${esc(a.local)}</span>` : ""}
    </span>
    ${selecionavel ? `<a href="${esc(url(linkAtividade(a.slug, "cronograma")))}" class="shrink-0 text-sm leading-[1.4] font-semibold text-azul hover:underline">Ver na página de atividades →</a>` : ""}
  </li>`;
};

function desenhar(c: Conteudo) {
  const raiz = document.querySelector<HTMLElement>("[data-cronograma]")!;
  const dias = diasDoEvento(c.evento);
  raiz.innerHTML = `<div role="tablist" aria-label="Dias do evento" class="flex flex-wrap gap-2">${dias
    .map((d, i) => `<button type="button" role="tab" data-aba="${d.id}" aria-selected="${i === 0}" class="cursor-pointer rounded-full max-md:min-h-11 border border-verde-claro bg-white px-4 py-1.5 text-sm leading-[1.4] font-semibold text-verde-escuro aria-selected:border-verde-escuro aria-selected:bg-verde-escuro aria-selected:text-white">${esc(d.rotulo)}</button>`)
    .join("")}</div><div class="mt-5">${dias
    .map((d) => {
      const sessoes = sessoesDoDia(c, d.id);
      return `<div data-painel="${d.id}" hidden><h2 class="sr-only">${esc(d.data)}</h2>${
        sessoes.length
          ? `<ol class="overflow-hidden rounded-cartao border border-borda bg-white">${sessoes.map((s) => linha(c, s)).join("")}</ol>`
          : `<p class="rounded-cartao border border-borda bg-white p-5 text-sm text-texto-suave">Nenhuma atividade cadastrada para este dia.</p>`
      }</div>`;
    })
    .join("")}</div>`;
  const abas = [...raiz.querySelectorAll<HTMLButtonElement>("[data-aba]")];
  const paineis = [...raiz.querySelectorAll<HTMLElement>("[data-painel]")];
  const mostrar = (id: string) => {
    abas.forEach((b) => b.setAttribute("aria-selected", String(b.dataset.aba === id)));
    paineis.forEach((p) => (p.hidden = p.dataset.painel !== id));
  };
  abas.forEach((b) => b.addEventListener("click", () => mostrar(b.dataset.aba!)));
  if (dias[0]) mostrar(dias[0].id);
}

/** Página Cronograma: uma aba por dia do evento com as sessões do dia. */
export const iniciarCronograma = () => registrarPronto(obterConteudo().then(desenhar));
