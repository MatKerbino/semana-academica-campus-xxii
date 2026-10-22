/** Motor dos editores de uma parte do conteúdo (evento, aparência, quadros, informações): desenha, liga, valida e salva. */
import { toast } from "../interacao";
import { salvarParte } from "../conteudo-api";
import type { Conteudo } from "../../conteudo";
import { caixaErro, erroDe, ligar, type Erros, type Ligacao } from "./form";

type Opcoes<T> = {
  raiz: HTMLElement;
  parte: "evento" | "aparencia" | "quadros" | "informacoes";
  estado: T;
  /** HTML dos campos (dentro do <form>). */
  desenhar: (estado: T, erros: Erros) => string;
  modelos?: Ligacao["modelos"];
  /** Corpo enviado (padrão: o próprio estado). */
  corpo?: (estado: T) => unknown;
  validar?: (estado: T) => Erros;
  aoMudar?: Ligacao["aoMudar"];
  /** Chamado depois de desenhar (ex.: prévias). */
  aposDesenhar?: (estado: T) => void;
  aoSalvar?: (c: Conteudo) => void;
  mensagem: string;
};

export function montarEditor<T>(o: Opcoes<T>) {
  let erros: Erros = {};
  let geral = "";
  const desenhar = () => {
    const y = window.scrollY;
    o.raiz.innerHTML = `<form id="editor" novalidate class="flex flex-col gap-6">${o.desenhar(o.estado, erros)}
      <div data-erro-geral>${caixaErro(geral, geral && Object.keys(erros).length ? erros : {})}</div>
      <div class="flex justify-end"><button type="submit" class="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-verde-cta px-[22px] py-3 text-[15px] font-bold text-verde-noite hover:brightness-95 disabled:opacity-60">Salvar alterações</button></div></form>`;
    window.scrollTo(0, y);
    o.aposDesenhar?.(o.estado);
  };
  ligar(o.raiz, o.estado, { modelos: o.modelos, aoEstrutura: desenhar, aoMudar: o.aoMudar });
  o.raiz.addEventListener("submit", async (e) => {
    e.preventDefault();
    erros = o.validar?.(o.estado) ?? {};
    geral = Object.keys(erros).length ? "Corrija os campos destacados." : "";
    if (geral) {
      desenhar();
      o.raiz.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    const botao = o.raiz.querySelector<HTMLButtonElement>("button[type=submit]")!;
    botao.disabled = true;
    try {
      const c = await salvarParte(o.parte, o.corpo ? o.corpo(o.estado) : o.estado);
      o.aoSalvar?.(c);
      toast(o.mensagem);
      botao.disabled = false;
    } catch (err) {
      const r = erroDe(err);
      geral = r.mensagem;
      erros = r.campos;
      desenhar();
      o.raiz.querySelector<HTMLElement>("[data-erro-geral]")?.scrollIntoView({ block: "center" });
    }
  });
  desenhar();
  return { redesenhar: desenhar };
}
