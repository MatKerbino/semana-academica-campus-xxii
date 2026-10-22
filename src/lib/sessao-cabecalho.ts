/** Cabeçalho do visitante autenticado: chip com o login, Sair e "Inscreva-se" levando direto à inscrição. */
import { sair, sessao } from "./api";
import { url } from "./url";

/** Troca Entrar/Inscreva-se pelo chip do usuário e Sair quando há sessão. */
export function aplicarSessaoNoCabecalho() {
  const s = sessao();
  if (!s) return;
  const area = s.usuario.papel === "admin" ? "/admin" : "/minha-area";
  const parteLocal = s.usuario.login.split("@")[0];
  const iniciais = (parteLocal.replace(/[^a-z0-9]/gi, " ").trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("") || "?").toUpperCase();
  const login = s.usuario.login.replace(/[&<>"']/g, "");
  const sairIcone = '<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>';
  const borda = "border-[1.5px] border-white/35 rounded-full text-white hover:border-white";
  document.querySelector("[data-sessao]")!.innerHTML =
    `<a href="${url(area)}" class="flex items-center gap-2 ${borda} py-1.5 pr-3.5 pl-1.5 text-[13px] font-semibold">` +
    `<span class="flex size-[26px] items-center justify-center rounded-full bg-verde-claro text-[10px] font-bold text-verde-escuro">${iniciais}</span><span class="max-w-[170px] truncate" title="${login}">${login}</span></a>` +
    `<button type="button" data-sair class="flex cursor-pointer items-center gap-2 ${borda} px-4 py-[11px] text-sm leading-[1.3] font-bold">${sairIcone}Sair</button>`;
  // Autenticado: "Inscreva-se" passa a levar direto à inscrição.
  document.querySelectorAll<HTMLAnchorElement>("[data-inscreva]").forEach((a) => {
    a.href = url("/inscricao");
    const rotulo = a.querySelector("[data-rotulo]");
    if (rotulo && a.dataset.inscrevaRotulo) rotulo.textContent = a.dataset.inscrevaRotulo;
  });
  document.querySelector("[data-sessao-mobile]")!.innerHTML =
    `<a href="${url(area)}" class="mx-auto mb-3 block max-w-full truncate text-center text-sm font-semibold text-white">${login}</a>` +
    '<button type="button" data-sair class="flex w-full cursor-pointer items-center justify-center rounded-full bg-white px-6 py-3 text-[15px] font-bold text-verde-escuro">Sair</button>';
  document.querySelector<HTMLAnchorElement>("[data-entrar-icone]")!.href = url(area);
  document.querySelectorAll("[data-sair]").forEach((b) =>
    b.addEventListener("click", () => {
      sair();
      location.href = url("/");
    }),
  );
}
