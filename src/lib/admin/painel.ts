/** Guarda de rota e inicialização do layout do painel (barra superior, menu mobile e botão Sair). */
import { caminho, sair, sessao, type Sessao } from "../api";

/** Só deixa passar administradores; os demais vão para o login do painel ou para "acesso restrito". */
export function exigirAdmin(): Sessao | null {
  const s = sessao();
  if (!s) {
    location.replace(`${caminho("/admin/entrar")}?voltar=${encodeURIComponent(location.pathname + location.search)}`);
    return null;
  }
  if (s.usuario.papel !== "admin") {
    location.replace(caminho("/admin/acesso-negado"));
    return null;
  }
  return s;
}

const iniciais = (nome: string) =>
  nome.replace(/[^\p{L}\p{N}]+/gu, " ").trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

/** Preenche a barra superior, liga o menu mobile e o botão Sair; devolve a sessão (ou null se redirecionou). */
export function iniciarPainel(): Sessao | null {
  const s = exigirAdmin();
  if (!s) return null;
  const nome = (s.usuario as { nome?: string | null }).nome || s.usuario.login;
  document.querySelectorAll("[data-admin-nome]").forEach((e) => (e.textContent = nome));
  document.querySelectorAll("[data-admin-iniciais]").forEach((e) => (e.textContent = iniciais(nome)));
  document.getElementById("admin-raiz")!.hidden = false;

  const gaveta = document.getElementById("admin-menu")!;
  const fundo = document.getElementById("admin-fundo")!;
  const alternar = (aberto: boolean) => {
    gaveta.classList.toggle("-translate-x-full", !aberto);
    fundo.hidden = !aberto;
    document.querySelector("[data-abrir-menu]")?.setAttribute("aria-expanded", String(aberto));
  };
  document.querySelector("[data-abrir-menu]")?.addEventListener("click", () => alternar(true));
  fundo.addEventListener("click", () => alternar(false));
  document.querySelectorAll("[data-sair]").forEach((b) =>
    b.addEventListener("click", () => {
      sair();
      location.href = caminho("/admin/entrar");
    }),
  );
  return s;
}
