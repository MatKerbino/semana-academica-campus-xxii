/** Consultas derivadas do conteúdo (cronograma, palestrantes, catálogo de inscrição). Funções puras. */
import opcoes from "../../data/opcoes.json";
import { dataCurta, horarioCompleto, sessoesOrdenadas } from "./formatar";
import type { Atividade, Conteudo, ItemCatalogo, Palestrante, TipoAtividade } from "./tipos";

/** Tipos que o participante pode escolher na inscrição (RN-05). */
export const tiposSelecionaveis = opcoes.tipos.filter((t) => t.selecionavel).map((t) => t.id as TipoAtividade);
export const rotuloDoTipo = (tipo: TipoAtividade) => opcoes.tipos.find((t) => t.id === tipo)?.rotulo ?? tipo;

export const palestrantePor = (c: Conteudo, slug: string) => c.palestrantes.find((p) => p.slug === slug);
export const palestrantesDe = (c: Conteudo, a: Atividade) =>
  a.responsaveis.map((s) => palestrantePor(c, s)).filter((p): p is Palestrante => !!p);
export const atividadesDe = (c: Conteudo, slugPalestrante: string) => c.atividades.filter((a) => a.responsaveis.includes(slugPalestrante));
export const porTipo = (c: Conteudo, ...tipos: TipoAtividade[]) => c.atividades.filter((a) => tipos.includes(a.tipo));

/** Atividades que aparecem na página de Atividades (as demais são só programação geral do cronograma). */
export const atividadesListadas = (c: Conteudo) => porTipo(c, ...tiposSelecionaveis);
export const eSelecionavel = (a: Pick<Atividade, "tipo">) => tiposSelecionaveis.includes(a.tipo);

/** Sessões de um dia (data ISO), em ordem de horário. Uma atividade com mais de uma sessão aparece em cada dia. */
export const sessoesDoDia = (c: Conteudo, dataIso: string) =>
  c.atividades
    .flatMap((a) => a.sessoes.filter((s) => s.data === dataIso).map((sessao) => ({ atividade: a, sessao })))
    .sort((x, y) => x.sessao.inicio.localeCompare(y.sessao.inicio) || x.atividade.titulo.localeCompare(y.atividade.titulo));

/** Espaços do campus citados na programação. */
export const espacosDoEvento = (c: Conteudo) => [...new Set(c.atividades.map((a) => a.local).filter(Boolean))];

/** Catálogo da inscrição: atividades selecionáveis (mesa-redonda conta como palestra). */
export function catalogoSelecionavel(c: Conteudo): ItemCatalogo[] {
  return atividadesListadas(c).map((a) => {
    const primeira = sessoesOrdenadas(a)[0];
    return {
      slug: a.slug,
      titulo: a.titulo,
      tipo: (a.tipo === "mesa-redonda" ? "palestra" : a.tipo) as ItemCatalogo["tipo"],
      dia: primeira.data,
      data: dataCurta(primeira.data),
      hora: primeira.inicio.replace(":", "h"),
      horario: horarioCompleto(a),
      local: a.local,
      vagas: a.vagas,
    };
  });
}

/** Caminho (sem base) da página de Atividades com a atividade selecionada (RN-06). */
export const linkAtividade = (slug: string, de?: string) => `/atividades?atividade=${slug}${de ? `&de=${de}` : ""}`;

/** Responsáveis de uma atividade como texto ("Nome; Nome; texto livre"). */
export const responsaveisTexto = (c: Conteudo, a: Atividade) =>
  [...palestrantesDe(c, a).map((p) => p.nome), a.responsavelTexto].filter(Boolean).join("; ");
