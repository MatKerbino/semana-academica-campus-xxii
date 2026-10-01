import type { Inscricao, Pagamento, Sessao, Vagas } from "../api";
import type { montarSeletor } from "../seletor";
import type { ItemCatalogo } from "../visao";
import { $ } from "./dom";

export type Etapa = 1 | 2 | 3;

/** Estado compartilhado entre as etapas da inscrição (preenchido em `carga.ts`). */
export type Estado = {
  sessao: Sessao | null;
  catalogo: ItemCatalogo[];
  porSlug: Map<string, ItemCatalogo>;
  form: HTMLFormElement;
  insc: Inscricao;
  pagamento: Pagamento;
  vagas: Vagas;
  seletor: ReturnType<typeof montarSeletor> | null;
  etapa: Etapa;
  indisponiveis: string[];
};

export function criarEstado(sessao: Sessao | null): Estado {
  const catalogo = JSON.parse($("#catalogo").textContent!) as ItemCatalogo[];
  return {
    sessao,
    catalogo,
    porSlug: new Map(catalogo.map((a) => [a.slug, a])),
    form: $<HTMLFormElement>("#etapa-1"),
    insc: undefined as unknown as Inscricao,
    pagamento: undefined as unknown as Pagamento,
    vagas: {},
    seletor: null,
    etapa: 1,
    indisponiveis: [],
  };
}
