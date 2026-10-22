/** Abas desenhadas no cliente (mesmo visual de components/Abas.astro). */
import { esc } from "../api";

export type Aba = { id: string; rotulo: string; html: string; classe?: string };

/** Desenha abas (mesmo visual do componente Abas) em `raiz`, uma por vez, a partir dos painéis informados. */
export function montarAbas(raiz: HTMLElement, rotuloLista: string, abas: Aba[]) {
  raiz.innerHTML = `<div role="tablist" aria-label="${esc(rotuloLista)}" class="flex flex-wrap gap-2">${abas
    .map(
      (a, i) =>
        `<button type="button" role="tab" data-aba="${esc(a.id)}" aria-selected="${i === 0}" class="cursor-pointer rounded-full max-md:min-h-11 border border-verde-medio/40 bg-white px-4 py-1 text-[13px] leading-[1.5] font-semibold text-verde-escuro aria-selected:border-verde-escuro aria-selected:bg-verde-escuro aria-selected:text-white">${esc(a.rotulo)}</button>`,
    )
    .join("")}</div><div class="mt-2.5">${abas
    .map((a) => `<div data-painel="${esc(a.id)}" ${a.classe ? `class="${a.classe}"` : ""}>${a.html}</div>`)
    .join("")}</div>`;
  const botoes = [...raiz.querySelectorAll<HTMLButtonElement>("[data-aba]")];
  const paineis = [...raiz.querySelectorAll<HTMLElement>("[data-painel]")];
  const mostrar = (id: string) => {
    botoes.forEach((b) => b.setAttribute("aria-selected", String(b.dataset.aba === id)));
    paineis.forEach((p) => (p.hidden = p.dataset.painel !== id));
  };
  botoes.forEach((b) => b.addEventListener("click", () => mostrar(b.dataset.aba!)));
  if (abas[0]) mostrar(abas[0].id);
}
