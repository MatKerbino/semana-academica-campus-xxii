/** Seletor de atividades compartilhado entre a inscrição e a edição da inscrição. */
import { esc, type Vagas } from "./api";

export type ItemCatalogo = {
  slug: string;
  titulo: string;
  tipo: string;
  tipoRotulo: string;
  dia: string;
  horario: string;
  local: string;
  vagas?: string;
};

export function renderSeletor(
  raiz: HTMLElement,
  catalogo: ItemCatalogo[],
  vagas: Vagas,
  selecionadas: string[],
  atividadesAtuais: string[] = [],
) {
  const grupos = new Map<string, ItemCatalogo[]>();
  catalogo.forEach((a) => grupos.set(a.tipoRotulo, [...(grupos.get(a.tipoRotulo) ?? []), a]));
  raiz.innerHTML = [...grupos.entries()]
    .map(
      ([rotulo, itens]) => `
      <fieldset class="rounded-cartao border border-borda bg-white p-3">
        <legend class="px-1 text-sm font-bold text-verde-escuro">${esc(rotulo)}</legend>
        <ul class="grid gap-1.5 md:grid-cols-2">
          ${itens
            .map((a) => {
              const v = vagas[a.slug];
              /* Uma atividade já escolhida continua marcável mesmo lotada. */
              const indisponivel = v ? !v.disponivel && !atividadesAtuais.includes(a.slug) : false;
              const restantes = v && v.vagas != null ? Math.max(v.vagas - v.ocupadas, 0) : null;
              return `<li>
                <label class="flex items-start gap-2 rounded-lg p-2 text-sm ${indisponivel ? "opacity-60" : "cursor-pointer hover:bg-palha"}">
                  <input type="checkbox" name="atividade" value="${esc(a.slug)}" class="mt-1 size-4 accent-verde-medio"
                    ${selecionadas.includes(a.slug) ? "checked" : ""} ${indisponivel ? "disabled" : ""} />
                  <span>
                    <span class="block font-semibold text-verde-escuro">${esc(a.titulo.replace(/^[^:]+:\s*/, ""))}</span>
                    <span class="block text-tabela text-chumbo/80">${esc(a.dia)} · ${esc(a.horario)} · ${esc(a.local)}</span>
                    <span class="block text-tabela ${indisponivel ? "font-semibold text-red-700" : "text-chumbo/70"}">${
                      indisponivel ? "Indisponível — vagas esgotadas" : restantes != null ? `${restantes} vagas restantes` : "Sem limite de vagas"
                    }</span>
                  </span>
                </label>
              </li>`;
            })
            .join("")}
        </ul>
      </fieldset>`,
    )
    .join("");
  return () => [...raiz.querySelectorAll<HTMLInputElement>("input[name=atividade]:checked")].map((i) => i.value);
}
