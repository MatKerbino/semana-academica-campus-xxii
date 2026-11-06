/** Submissão e avaliação de artigos (contrato em semana-academica-api/docs/API.md). */
import { api } from "../api";

export type Resultado = "aprovado" | "aprovado_com_ressalvas" | "rejeitado";
export const rotuloResultado: Record<Resultado, string> = { aprovado: "Aprovado", aprovado_com_ressalvas: "Aprovado com ressalvas", rejeitado: "Rejeitado" };

export type ConfigArtigos = {
  submissaoAtiva: boolean;
  edicaoAtiva: boolean;
  inicio: string | null;
  fim: string | null;
  limiteBytes: number;
  abertaParaSubmissao: boolean;
  abertaParaEdicao: boolean;
};
export type ConfigAdmin = Partial<ConfigArtigos> & { limiteMb?: number; criterios?: string[] };

export type ArquivoArtigo = { nome: string; tamanho: number };
export type Artigo = {
  id: string;
  titulo: string;
  arquivo?: ArquivoArtigo | null;
  atualizadoEm?: string;
};
export type ArtigoAdmin = Artigo & { autorLogin: string; avaliadores: { login: string; status: string }[] };
export type AvaliacaoAdmin = {
  artigoId: string;
  titulo: string;
  avaliador: string;
  status: "concluida" | "pendente";
  resultado: Resultado | null;
  observacoesAutor: string | null;
  observacoesAdmin: string | null;
  liberada: boolean;
};
export type MinhaAvaliacao = { resultado: Resultado; observacoesAutor: string; observacoesAdmin: string };
export type ArtigoAvaliador = { id: string; titulo: string; minhaAvaliacao: MinhaAvaliacao | null };
export type CorpoArtigo = { titulo: string; arquivo?: { chave: string; nome: string; tamanho: number } };

const enc = encodeURIComponent;
const put = (rota: string, corpo: unknown) => api(rota, { metodo: "PUT", corpo });

export const configuracao = () => api<ConfigArtigos>("/artigos/configuracao", { auth: false });
export const meusArtigos = () => api<{ artigos: Artigo[] }>("/artigos").then((r) => r.artigos);
export const solicitarUpload = (arquivo: File) =>
  api<{ chave: string; url: string; headers?: Record<string, string> }>("/artigos/upload-url", {
    metodo: "POST",
    corpo: { nome: arquivo.name, tamanho: arquivo.size, tipo: arquivo.type || "application/pdf" },
  });
export const criarArtigo = (corpo: CorpoArtigo) => api<{ artigo: Artigo }>("/artigos", { metodo: "POST", corpo }).then((r) => r.artigo);
export const editarArtigo = (id: string, corpo: CorpoArtigo) => api<{ artigo: Artigo }>(`/artigos/${enc(id)}`, { metodo: "PUT", corpo }).then((r) => r.artigo);
export const urlDoArquivo = (id: string) => api<{ url: string }>(`/artigos/${enc(id)}/arquivo`).then((r) => r.url);
export const minhasAvaliacoes = () =>
  api<{ liberadas: boolean; artigos: { artigoId: string; titulo: string; avaliacoes: { resultado: Resultado; observacoesAutor: string | null }[] }[] }>("/artigos/avaliacoes");

export const configuracaoAdmin = () => api<ConfigAdmin>("/admin/artigos/configuracao");
export const salvarConfiguracao = (corpo: ConfigAdmin) => put("/admin/artigos/configuracao", corpo);
export const artigosAdmin = () => api<{ artigos: ArtigoAdmin[] }>("/admin/artigos").then((r) => r.artigos);
export const usuarios = () => api<{ usuarios: { login: string; nome: string | null; avaliador: boolean }[] }>("/admin/avaliadores").then((r) => r.usuarios);
export const definirAvaliador = (login: string, avaliador: boolean) => put(`/admin/avaliadores/${enc(login)}`, { avaliador });
export const alocar = (id: string, avaliadores: string[]) => put(`/admin/artigos/${enc(id)}/avaliadores`, { avaliadores });
export const avaliacoesAdmin = () => api<{ avaliacoes: AvaliacaoAdmin[] }>("/admin/avaliacoes").then((r) => r.avaliacoes);
export const liberarAvaliacoes = () => api<{ liberadasEm: string | null; liberadas: number }>("/admin/avaliacoes/liberar", { metodo: "POST" });

export const artigosDoAvaliador = () => api<{ criterios: string[]; artigos: ArtigoAvaliador[] }>("/avaliador/artigos");
export const urlDoArquivoAvaliador = (id: string) => api<{ url: string }>(`/avaliador/artigos/${enc(id)}/arquivo`).then((r) => r.url);
export const enviarAvaliacao = (id: string, corpo: MinhaAvaliacao) => put(`/avaliador/artigos/${enc(id)}/avaliacao`, corpo);

export const megabytes = (bytes: number) => `${(bytes / 1048576).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} MB`;

/** Abre o PDF numa nova aba: a URL assinada é pedida no clique, por expirar em minutos. */
export async function abrirArquivo(obter: () => Promise<string>) {
  const aba = window.open("", "_blank");
  try {
    const url = await obter();
    if (aba) aba.location.href = url;
    else location.href = url;
  } catch (e) {
    aba?.close();
    throw e;
  }
}
