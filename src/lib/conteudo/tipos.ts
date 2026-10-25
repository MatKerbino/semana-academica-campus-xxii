/** Modelo do conteúdo editável do evento (contrato: semana-academica-api/docs/CONTEUDO.md). */
export type TipoAtividade =
  | "palestra" | "mesa-redonda" | "minicurso" | "curso" | "banner" | "artigo"
  | "abertura" | "encerramento" | "campanha" | "exibicao" | "mostra" | "outro";

/** Slots de ícone: cada posição do site tem um slot fixo; o admin só troca o ícone do slot. */
export type SlotIcone =
  | "marca" | "periodo" | "local" | "participacao" | "publico"
  | "palestra" | "minicurso" | "curso" | "banner" | "artigo";

export type Sessao = { data: string; inicio: string; fim: string };

export type Atividade = {
  slug: string;
  titulo: string;
  tipo: TipoAtividade;
  sessoes: Sessao[];
  local: string;
  /** Slugs de palestrantes/ministrantes. */
  responsaveis: string[];
  /** Responsável que não é palestrante cadastrado (ex.: "Bolsistas do DAE"). */
  responsavelTexto: string;
  vagas: number | null;
  cargaHoraria: string;
  descricao: string[];
  topicos: string[];
};

/** Notícia publicada pelo admin. `corpo` = parágrafos; `imagem` e `link` vazios ou http(s). */
export type Noticia = { slug: string; titulo: string; resumo: string; corpo: string[]; data: string; imagem: string; imagemAlt: string; link: string };

export type Palestrante = { slug: string; nome: string; cargo: string; lattes: string; bio: string; email: string };

export type Evento = {
  nome: string;
  organizacao: string;
  lema: string;
  descricao: string;
  publico: string;
  email: string;
  dataInicio: string;
  dataFim: string;
  local: { nome: string; curto: string; endereco: string; cidade: string; mapsUrl: string; mapaEmbed: string };
  realizacao: string[];
  /** "" = padrão (política: página interna; termos: não exibido). */
  links: { politicaPrivacidade: string; termos: string };
};

export type Aparencia = {
  /** Id de `opcoes.paletas` ou "personalizada" (usa `coresPersonalizadas`). */
  paleta: string;
  coresPersonalizadas: Record<string, string>;
  icones: Record<SlotIcone, string>;
  banner: { origem: "padrao" | "enviado" | "url"; url: string; alt: string; versao: string | null };
};

export type QuadroSobre = { icone: string; titulo: string; texto: string };
export type QuadroPasso = { titulo: string; texto: string };
export type GrupoApoio = { id: string; rotulo: string; itens: { nome: string; detalhe: string; url: string }[] };
export type Quadros = { inicioSobre: QuadroSobre[]; inicioPassos: QuadroPasso[]; apoio: GrupoApoio[] };

export type Informacoes = {
  titulo: string;
  descricao: string;
  secoes: { titulo: string; texto: string; itens: { rotulo: string; detalhe: string; url: string }[] }[];
};

export type Conteudo = {
  evento: Evento;
  aparencia: Aparencia;
  atividades: Atividade[];
  palestrantes: Palestrante[];
  noticias: Noticia[];
  quadros: Quadros;
  informacoes: Informacoes;
};

export type Dia = { id: string; rotulo: string; data: string; curta: string };

/** Item do catálogo de inscrição (atividades selecionáveis). */
export type ItemCatalogo = {
  slug: string; titulo: string; tipo: "palestra" | "minicurso" | "curso" | "banner" | "artigo";
  dia: string; data: string; hora: string; horario: string; local: string; vagas: number | null;
};
