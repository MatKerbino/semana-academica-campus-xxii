/** Peças compartilhadas das páginas desenhadas no cliente (início, cronograma, atividades). */
import { tagTipo as tagTipoHtml, type Conteudo, type TipoAtividade } from "../conteudo";

const fila: Promise<unknown>[] = [];
/** A página registra aqui o desenho das suas listas; o Base só libera a tela depois delas. */
export const registrarPronto = (p: Promise<unknown>) => void fila.push(p);
/** Espera todas as páginas registradas terminarem de desenhar (o Base libera a tela depois). */
export const todosProntos = () => Promise.allSettled(fila);

/** Tag de tipo com a aparência vigente (ver conteudo/tag-tipo). */
export const tagTipo = (c: Conteudo, tipo: TipoAtividade) => tagTipoHtml(c.aparencia, tipo);
