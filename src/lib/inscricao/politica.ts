import { $ } from "./dom";

/** Painel lateral da Política de Privacidade (abrir, fechar, Esc, retorno do foco). */
/** `externo`: link http(s) configurado pelo admin; quando existe, o botão abre esse link em nova aba em vez do painel. */
export function ligarPolitica(externo = "") {
  const painel = $("#politica");
  const abrir = $("#abrir-politica");
  const fechar = () => {
    painel.hidden = true;
    document.body.style.overflow = "";
    abrir.focus();
  };
  abrir.addEventListener("click", () => {
    if (/^https?:/.test(externo)) return void window.open(externo, "_blank", "noopener");
    painel.hidden = false;
    document.body.style.overflow = "hidden";
    painel.querySelector<HTMLElement>("button")!.focus();
  });
  painel.querySelectorAll("[data-fechar-politica]").forEach((el) => el.addEventListener("click", fechar));
  document.addEventListener("keydown", (ev) => ev.key === "Escape" && !painel.hidden && fechar());
}
