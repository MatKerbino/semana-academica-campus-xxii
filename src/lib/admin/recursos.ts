/** Chamadas à API usadas pelas telas do painel. */
import { api } from "./http";
import type { Catalogo, FormaCatalogo, FormaPagamento, InscricaoAdmin, ParticipanteLinha } from "./tipos";

export const resumo = () =>
  api<{
    atualizadoEm: string;
    inscricoesConfirmadas: number;
    compensacoesPendentes: number;
    compensacoesRegularizadas: number;
    contasSemInscricao: number;
    pagamento: FormaPagamento;
    recentes: InscricaoAdmin[];
  }>("/admin/resumo");
export const participantes = () => api<{ participantes: ParticipanteLinha[] }>("/admin/participantes").then((r) => r.participantes);
export const participante = (login: string) =>
  api<{ participante: { login: string; criadoEm: string; ultimoAcesso: string | null; inscricao: InscricaoAdmin | null } }>(
    `/admin/participantes/${encodeURIComponent(login)}`,
  ).then((r) => r.participante);
export const inscricoes = () => api<{ inscricoes: InscricaoAdmin[] }>("/admin/inscricoes").then((r) => r.inscricoes);
export const inscricao = (login: string) =>
  api<{ inscricao: InscricaoAdmin }>(`/admin/inscricoes/${encodeURIComponent(login)}`).then((r) => r.inscricao);
export const formaPagamento = () => api<FormaPagamento>("/admin/pagamento");
export const listarFormas = () => api<Catalogo>("/admin/formas-pagamento");
export const criarForma = (corpo: Record<string, unknown>) =>
  api<Catalogo & { forma: FormaCatalogo }>("/admin/formas-pagamento", { metodo: "POST", corpo });
export const editarForma = (id: string, corpo: Record<string, unknown>) =>
  api<Catalogo & { forma: FormaCatalogo }>(`/admin/formas-pagamento/${encodeURIComponent(id)}`, { metodo: "PUT", corpo });
export const tornarFormaVigente = (id: string) =>
  api<Catalogo & { forma: FormaCatalogo }>(`/admin/formas-pagamento/${encodeURIComponent(id)}/vigente`, { metodo: "POST" });
export const excluirForma = (id: string) => api<Catalogo>(`/admin/formas-pagamento/${encodeURIComponent(id)}`, { metodo: "DELETE" });
export const salvarFormaPagamento = (corpo: Record<string, unknown>) =>
  api<FormaPagamento>("/admin/pagamento", { metodo: "PUT", corpo });
export const atualizarPagamento = (login: string, corpo: { situacao: string; observacao?: string }) =>
  api<{ inscricao: InscricaoAdmin }>(`/admin/inscricoes/${encodeURIComponent(login)}/pagamento`, { metodo: "PATCH", corpo }).then((r) => r.inscricao);
export const atualizarDevolucao = (login: string, corpo: { situacao: string; dataDevolucao?: string; observacao?: string }) =>
  api<{ inscricao: InscricaoAdmin }>(`/admin/inscricoes/${encodeURIComponent(login)}/devolucao`, { metodo: "PATCH", corpo }).then((r) => r.inscricao);
export const minhaConta = () =>
  api<{ login: string; papel: string; nome: string | null; ultimoAcesso: string | null }>("/me");
export const alterarSenha = (corpo: { senhaAtual: string; novaSenha: string; confirmacaoNovaSenha: string }) =>
  api<{ mensagem: string }>("/me/senha", { metodo: "POST", corpo, sairEm401: false });
