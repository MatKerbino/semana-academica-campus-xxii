/** Ícones do conteúdo editável: clonados de <BibliotecaIcones /> (um <span data-icone="id"> por ícone permitido). */
import type { Conteudo, SlotIcone } from "./tipos";

/** SVG (como texto) do ícone `id` com as classes dadas; vazio se o ícone não estiver na biblioteca. */
export function icone(id: string, classe = "size-4"): string {
  const svg = document.querySelector(`#biblioteca-icones [data-icone="${id}"] svg`)?.cloneNode(true) as SVGElement | undefined;
  if (!svg) return "";
  svg.setAttribute("class", `${classe} shrink-0`);
  svg.setAttribute("aria-hidden", "true");
  return svg.outerHTML;
}

/** Ícone do slot (posição fixa no site) conforme a aparência escolhida pelo admin. */
export const iconeDoSlot = (c: Pick<Conteudo, "aparencia">, slot: SlotIcone, classe?: string) => icone(c.aparencia.icones[slot], classe);
