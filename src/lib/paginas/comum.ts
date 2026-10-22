/** Peças compartilhadas das páginas desenhadas no cliente (início, cronograma, atividades). */
import { esc } from "../api";
import { iconeDoSlot, rotuloDoTipo, type Conteudo, type SlotIcone, type TipoAtividade } from "../conteudo";

const fila: Promise<unknown>[] = [];
/** A página registra aqui o desenho das suas listas; o Base só libera a tela depois delas. */
export const registrarPronto = (p: Promise<unknown>) => void fila.push(p);
export const todosProntos = () => Promise.allSettled(fila);

const COR: Partial<Record<TipoAtividade, string>> = {
  palestra: "text-verde-medio", "mesa-redonda": "text-verde-medio", minicurso: "text-info-texto",
  curso: "text-curso", banner: "text-divisor", artigo: "text-chumbo",
};

/** Tag de tipo (ícone do slot + rótulo constante); vazio para tipos de programação geral. */
export function tagTipo(c: Conteudo, tipo: TipoAtividade): string {
  const cor = COR[tipo];
  if (!cor) return "";
  const slot = (tipo === "mesa-redonda" ? "palestra" : tipo) as SlotIcone;
  const rotulo = tipo === "mesa-redonda" ? rotuloDoTipo("palestra") : rotuloDoTipo(tipo);
  return `<span class="flex items-center gap-1.5 text-xs leading-[1.3] font-bold tracking-[0.4px] uppercase ${cor}">${iconeDoSlot(c, slot, "size-3.5")}${esc(rotulo)}</span>`;
}
