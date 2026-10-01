/** Aviso (toast) e diálogo modal. */
import { esc } from "../api";
import { icone } from "./icones";

const CLASSE_TOAST = "fixed top-20 right-4 left-4 z-50 flex items-start gap-3 rounded-campo border border-entregue-borda bg-entregue-fundo p-4 shadow-lg sm:left-auto sm:w-[366px] lg:right-6";
export function toast(mensagem: string) {
  document.getElementById("admin-toast")?.remove();
  const el = document.createElement("div");
  el.id = "admin-toast";
  el.setAttribute("role", "status");
  el.className = CLASSE_TOAST;
  el.innerHTML = `${icone("circle-check", "mt-0.5 size-5 text-entregue-texto")}<p class="flex-1 text-sm leading-[1.4] font-medium text-entregue-texto">${esc(mensagem)}</p><button type="button" aria-label="Fechar aviso" class="cursor-pointer text-texto-suave">${icone("x", "size-[18px]")}</button>`;
  el.querySelector("button")!.addEventListener("click", () => el.remove());
  document.body.append(el);
  setTimeout(() => el.remove(), 8000);
}

/** Abre um diálogo modal com o HTML dado; devolve o elemento e uma função para fechar. */
export function abrirModal(html: string) {
  const anterior = document.activeElement as HTMLElement | null;
  const fundo = document.createElement("div");
  fundo.className = "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-verde-noite/70 p-4";
  fundo.innerHTML = `<div role="dialog" aria-modal="true" class="w-full max-w-[434px] rounded-[16px] bg-white p-6 shadow-2xl">${html}</div>`;
  const fechar = () => {
    fundo.remove();
    document.removeEventListener("keydown", tecla);
    anterior?.focus();
  };
  const tecla = (e: KeyboardEvent) => e.key === "Escape" && fechar();
  document.addEventListener("keydown", tecla);
  document.body.append(fundo);
  const dialogo = fundo.firstElementChild as HTMLElement;
  dialogo.querySelector<HTMLElement>("input:checked, input, button")?.focus();
  return { dialogo, fechar };
}
