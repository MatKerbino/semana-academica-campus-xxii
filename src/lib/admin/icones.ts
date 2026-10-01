/** Ícones renderizados no servidor pelo AdminLayout e clonados no navegador. */
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
