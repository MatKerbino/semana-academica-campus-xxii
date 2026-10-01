import { atividades } from "./atividades";
import { palestrantes, type Palestrante } from "./palestrantes";
import { tagsTipo, type Atividade, type DiaId, type TipoAtividade } from "./tipos";

export const palestrantePor = (slug?: string) => palestrantes.find((p) => p.slug === slug);
export const palestrantesDe = (a: Atividade) => (a.palestrantes ?? []).map(palestrantePor).filter((p): p is Palestrante => !!p);
export const atividadesDe = (slug: string) => atividades.filter((a) => a.palestrantes?.includes(slug));

/** Grupos da página de Palestrantes, derivados das atividades que cada pessoa ministra. */
export const gruposPalestrantes = [
  { id: "mesas", rotulo: "Mesas-redondas", tipos: ["mesa-redonda"] },
  { id: "minicursos", rotulo: "Minicursos e oficinas", tipos: ["minicurso"] },
  { id: "cursos", rotulo: "Cursos", tipos: ["curso"] },
  { id: "outros", rotulo: "Outras atividades", tipos: ["abertura", "encerramento", "campanha", "exibicao", "mostra", "outro", "palestra", "banner", "artigo"] },
] as const;

export const palestrantesDoGrupo = (tipos: readonly string[]) =>
  palestrantes.filter((p) => atividadesDe(p.slug).some((a) => tipos.includes(a.tipo)));

export const porTipo = (...tipos: TipoAtividade[]) => atividades.filter((a) => tipos.includes(a.tipo));

/** Sessões de um dia, em ordem de horário (uma atividade com mais de uma sessão aparece em cada dia). */
export const sessoesDoDia = (dia: DiaId) =>
  atividades
    .flatMap((a) => a.sessoes.filter((s) => s.dia === dia).map((sessao) => ({ atividade: a, sessao })))
    .sort((x, y) => x.sessao.hora.localeCompare(y.sessao.hora) || x.atividade.titulo.localeCompare(y.atividade.titulo));

/** Texto de horário com todas as sessões (ex.: "22/10 · 08h30 às 10h00 e 23/10 · 10h00 às 12h00"). */
export const horarioCompleto = (a: Atividade) =>
  a.sessoes.length === 1 ? a.horario : a.sessoes.map((s) => `${s.dia.replace("-", "/")} · ${s.horario}`).join(" e ");

/** Espaços do campus citados na programação. */
export const espacosDoEvento = [...new Set(atividades.map((a) => a.local).filter((l): l is string => !!l))];

/** Tipos que o participante pode escolher na inscrição (RN-05). Espelha o catálogo da API. */
export const tiposSelecionaveis: TipoAtividade[] = ["palestra", "mesa-redonda", "minicurso", "curso", "banner", "artigo"];

export const catalogoSelecionavel = porTipo(...tiposSelecionaveis).map((a) => ({
  slug: a.slug,
  titulo: a.titulo,
  tipo: a.tipo === "mesa-redonda" ? "palestra" : a.tipo,
  dia: a.dia,
  data: a.dia.replace("-", "/"),
  hora: a.hora,
  horario: horarioCompleto(a),
  local: a.local ?? "",
  vagas: a.vagas ? Number.parseInt(a.vagas, 10) || null : null,
}));

/** Caminho da página única de atividades com a atividade selecionada (RN-06). */
export const linkAtividade = (slug: string, de?: string) =>
  `/atividades?atividade=${slug}${de ? `&de=${de}` : ""}`;

/** Atividades que aparecem na página de Atividades (as demais são programação geral do cronograma). */
export const atividadesListadas = atividades.filter((a) => tagsTipo[a.tipo] !== null);
