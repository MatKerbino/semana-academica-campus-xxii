/** Tag de tipo de atividade (ícone do slot + rótulo constante). Fonte única: páginas, seletor e painel. */
import { esc } from "../api";
import { rotuloDoTipo } from "./consultas";
import { icone } from "./icones";
import type { Aparencia, SlotIcone, TipoAtividade } from "./tipos";

const COR: Partial<Record<TipoAtividade, string>> = {
  palestra: "text-verde-medio", "mesa-redonda": "text-verde-medio", minicurso: "text-info-texto",
  curso: "text-curso", banner: "text-divisor", artigo: "text-chumbo",
};

/** HTML da tag do tipo (mesa-redonda aparece como "Palestra"); vazio para tipos de programação geral. */
export function tagTipo(aparencia: Pick<Aparencia, "icones">, tipo: TipoAtividade): string {
  const cor = COR[tipo];
  if (!cor) return "";
  const base = tipo === "mesa-redonda" ? "palestra" : tipo;
  return `<span class="flex items-center gap-1.5 text-xs leading-[1.3] font-bold tracking-[0.4px] uppercase ${cor}">${icone(aparencia.icones[base as SlotIcone], "size-3.5")}${esc(rotuloDoTipo(base))}</span>`;
}
