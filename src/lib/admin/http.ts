/** Chamada à API do painel e tratamento de erros (contrato em semana-academica-api/docs/API.md). */
import { ApiError, caminho, sair, sessao } from "../api";

const BASE = ((import.meta.env.PUBLIC_API_URL as string | undefined) ?? "").replace(/\/+$/, "");

/** Chamada autenticada à API. Em 401 encerra a sessão e volta ao login do painel (exceto quando `sairEm401` é false). */
export async function api<T = unknown>(rota: string, { metodo = "GET", corpo, sairEm401 = true }: { metodo?: string; corpo?: unknown; sairEm401?: boolean } = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (corpo !== undefined) headers["Content-Type"] = "application/json";
  const s = sessao();
  if (s) headers.Authorization = `Bearer ${s.token}`;
  let resposta: Response;
  try {
    resposta = await fetch(`${BASE}${rota}`, { method: metodo, headers, body: corpo === undefined ? undefined : JSON.stringify(corpo) });
  } catch {
    throw new ApiError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.", 0);
  }
  const json = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    if (resposta.status === 401 && sairEm401) {
      sair();
      location.href = `${caminho("/admin/entrar")}?voltar=${encodeURIComponent(location.pathname + location.search)}`;
    }
    throw new ApiError(json.erro ?? "Ocorreu um erro inesperado.", resposta.status, json.campos);
  }
  return json as T;
}

export const eStatusErro = (e: unknown) => (e instanceof ApiError ? e : new ApiError("Ocorreu um erro inesperado.", 0));
