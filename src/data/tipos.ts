export const dias = [
  { id: "21-10", rotulo: "21/10 · Terça", data: "Terça-feira · 21 de outubro" },
  { id: "22-10", rotulo: "22/10 · Quarta", data: "Quarta-feira · 22 de outubro" },
  { id: "23-10", rotulo: "23/10 · Quinta", data: "Quinta-feira · 23 de outubro" },
  { id: "24-10", rotulo: "24/10 · Sexta", data: "Sexta-feira · 24 de outubro" },
] as const;

export type DiaId = (typeof dias)[number]["id"];

/** Tipos selecionáveis (documento, RN-05): minicurso, palestra (inclui mesas-redondas), curso, banner, artigo. Os demais são programação geral. */
export type TipoAtividade =
  | "palestra" | "minicurso" | "curso" | "banner" | "artigo" | "mesa-redonda"
  | "abertura" | "encerramento" | "campanha" | "exibicao" | "mostra" | "outro";

export type Sessao = { dia: DiaId; hora: string; horario: string };

export type Atividade = {
  slug: string;
  titulo: string;
  tipo: TipoAtividade;
  /** Primeira sessão (uma atividade pode ter mais de uma; ver `sessoes`). */
  dia: DiaId;
  hora: string;
  horario: string;
  sessoes: Sessao[];
  local?: string;
  vagas?: string;
  cargaHoraria?: string;
  palestrantes?: string[];
  descricao: string[];
  topicos?: string[];
};

export const rotulosTipo: Record<TipoAtividade, string> = {
  palestra: "Palestra",
  minicurso: "Minicurso",
  curso: "Curso",
  banner: "Exposição",
  artigo: "Artigos",
  "mesa-redonda": "Mesa-redonda",
  abertura: "Abertura",
  encerramento: "Encerramento",
  campanha: "Campanha",
  exibicao: "Exibição",
  mostra: "Mostra",
  outro: "Programação geral",
};

/** Tag de tipo (ícone + texto, sem fundo) usada no cronograma, nas atividades e no seletor. */
export const tagsTipo: Record<TipoAtividade, { rotulo: string; icone: "mic" | "apresentacao" | "capelo" | "imagem" | "arquivo"; cor: string } | null> = {
  palestra: { rotulo: "Palestra", icone: "mic", cor: "text-verde-medio" },
  "mesa-redonda": { rotulo: "Palestra", icone: "mic", cor: "text-verde-medio" },
  minicurso: { rotulo: "Minicurso", icone: "apresentacao", cor: "text-info-texto" },
  curso: { rotulo: "Curso", icone: "capelo", cor: "text-curso" },
  banner: { rotulo: "Exposição de Banners", icone: "imagem", cor: "text-divisor" },
  artigo: { rotulo: "Apresentação de artigos", icone: "arquivo", cor: "text-chumbo" },
  abertura: null,
  encerramento: null,
  campanha: null,
  exibicao: null,
  mostra: null,
  outro: null,
};
