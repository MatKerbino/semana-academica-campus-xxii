/** Escritas do conteúdo editável (somente administrador). Toda resposta é o conteúdo completo. */
import type { Atividade, Conteudo, Palestrante } from "../conteudo";
import { limparConteudo } from "../conteudo";
import { api } from "./http";

const gravar = async (rota: string, metodo: string, corpo?: unknown) => {
  const c = await api<Conteudo>(rota, { metodo, corpo });
  limparConteudo(c);
  return c;
};

export const salvarParte = (parte: "evento" | "aparencia" | "quadros" | "informacoes", corpo: unknown) =>
  gravar(`/admin/conteudo/${parte}`, "PUT", corpo);
export const restaurarParte = (parte: string) => gravar("/admin/conteudo/restaurar", "POST", { parte });
export const enviarBanner = (tipo: string, base64: string) => gravar("/admin/banner", "PUT", { tipo, base64 });
export const removerBanner = () => gravar("/admin/banner", "DELETE");

export const criarAtividade = (a: Partial<Atividade>) => gravar("/admin/atividades", "POST", a);
export const editarAtividade = (slug: string, a: Partial<Atividade>) => gravar(`/admin/atividades/${encodeURIComponent(slug)}`, "PUT", a);
export const excluirAtividade = (slug: string) => gravar(`/admin/atividades/${encodeURIComponent(slug)}`, "DELETE");

export const criarPalestrante = (p: Partial<Palestrante>) => gravar("/admin/palestrantes", "POST", p);
export const editarPalestrante = (slug: string, p: Partial<Palestrante>) => gravar(`/admin/palestrantes/${encodeURIComponent(slug)}`, "PUT", p);
export const excluirPalestrante = (slug: string) => gravar(`/admin/palestrantes/${encodeURIComponent(slug)}`, "DELETE");
