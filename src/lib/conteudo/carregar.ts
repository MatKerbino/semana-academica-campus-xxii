/** Carga do conteúdo editável: GET /conteudo (API), com cópia local e o conteúdo padrão como reserva. */
import padrao from "../../data/conteudo-padrao.json";
import { coresDaAparencia } from "./paleta";
import type { Conteudo } from "./tipos";

const BASE = ((import.meta.env.PUBLIC_API_URL as string | undefined) ?? "").replace(/\/+$/, "");
const CHAVE = "semana:conteudo";
const CHAVE_CORES = "semana:cores";
const LIMITE_MS = 4000;

/** Conteúdo de fábrica (mesmos dados que a API usa enquanto o admin não altera nada). */
export const conteudoPadrao = padrao as unknown as Conteudo;

const completo = (c: unknown): c is Conteudo => {
  const x = c as Partial<Conteudo> | null;
  return !!x && !!x.evento && !!x.aparencia && Array.isArray(x.atividades) && Array.isArray(x.palestrantes) && !!x.quadros && !!x.informacoes;
};

/** Última cópia recebida da API (ou null). */
export function conteudoEmCache(): Conteudo | null {
  try {
    const c = JSON.parse(localStorage.getItem(CHAVE) ?? "null");
    return completo(c) ? c : null;
  } catch {
    return null;
  }
}

/** Cópia local do conteúdo e das cores resolvidas (o script do <head> aplica `semana:cores` antes da pintura). */
function guardar(c: Conteudo) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(c));
    localStorage.setItem(CHAVE_CORES, JSON.stringify(coresDaAparencia(c.aparencia)));
  } catch {
    /* sem armazenamento: segue sem cópia local */
  }
}

let pendente: Promise<Conteudo> | null = null;

async function buscar(): Promise<Conteudo> {
  const controle = new AbortController();
  const relogio = setTimeout(() => controle.abort(), LIMITE_MS);
  try {
    const r = await fetch(`${BASE}/conteudo`, { signal: controle.signal, cache: "no-store" });
    const c = await r.json();
    if (!r.ok || !completo(c)) throw new Error("conteúdo inválido");
    guardar(c);
    return c;
  } catch {
    return conteudoEmCache() ?? conteudoPadrao;
  } finally {
    clearTimeout(relogio);
  }
}

/** Conteúdo vigente (uma busca por carga de página). */
export const obterConteudo = (): Promise<Conteudo> => (pendente ??= buscar());

/** Troca o conteúdo em cache (o painel passa o conteúdo salvo) ou, sem argumento, descarta cópia e busca em andamento. */
export function limparConteudo(c?: Conteudo) {
  pendente = c ? Promise.resolve(c) : null;
  if (c) return guardar(c);
  try {
    localStorage.removeItem(CHAVE);
    localStorage.removeItem(CHAVE_CORES);
  } catch {
    /* sem armazenamento */
  }
}
