/** Tipos de dados trocados com a API do painel. */
export type Modalidade = "monetaria" | "nao_monetaria";
export type Perfil = "estudante" | "professor" | "profissional" | "outro";

export type FormaPagamento = {
  id?: string;
  modalidade: Modalidade;
  valor: number | null;
  descricao: string | null;
  orientacoes?: string | null;
  atualizadoEm?: string | null;
  atualizadoPor?: string | null;
};

export type InscricaoAdmin = {
  login: string;
  numero: string | null;
  status: "rascunho" | "confirmada" | "cancelada";
  dados: { nome?: string; cpf?: string; email?: string; telefone?: string; dataNascimento?: string; perfil?: Perfil };
  emailVerificado?: boolean;
  atividades: string[];
  aceiteEm: string | null;
  versaoPolitica: string | null;
  pagamento: { modalidade: Modalidade; valor: number | null; descricao: string | null } | null;
  situacaoPagamento: "pendente" | "regularizada" | null;
  devolucao: { situacao: "pendente" | "devolvido"; valor: number | null; atualizadaEm: string } | null;
  historico?: { evento: string; em: string }[];
  criadaEm: string;
  confirmadaEm: string | null;
  canceladaEm: string | null;
};

export type ParticipanteLinha = {
  login: string;
  criadoEm: string;
  ultimoAcesso?: string | null;
  nome: string | null;
  statusInscricao: InscricaoAdmin["status"] | null;
};

export type FormaCatalogo = FormaPagamento & { id: string; vigente: boolean };
export type Catalogo = { vigenteId: string; formas: FormaCatalogo[] };
