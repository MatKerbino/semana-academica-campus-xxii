/** Motor dos editores de uma parte do conteúdo (evento, aparência, quadros, informações): desenha, liga, valida e salva. */
import { toast } from "../interacao";
import { salvarParte, type ParteEditavel } from "../conteudo-api";
import type { Conteudo } from "../../conteudo";
import { CLASSES } from "../componentes";
import { caixaErro, erroDe, ligar, MSG_CORRIGIR, type Erros, type Estado, type Ligacao } from "./form";
import { botaoRestaurar, ligarRestauracao } from "./restaurar";

type Opcoes<T extends Estado> = {
  raiz: HTMLElement;
  parte: ParteEditavel;
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
  /** Depois de "Restaurar padrão": copie o conteúdo devolvido para o estado (a tela é redesenhada em seguida). */
  aoRestaurar: (c: Conteudo) => void;
  mensagem: string;
};

/** Monta o editor de uma parte: formulário + "Salvar alterações" + "Restaurar padrão". */
export function montarEditor<T extends Estado>(o: Opcoes<T>) {
  let erros: Erros = {};
  let geral = "";
  const desenhar = () => {
    const y = window.scrollY;
    o.raiz.innerHTML = `<form id="editor" novalidate class="flex flex-col gap-6">${o.desenhar(o.estado, erros)}
      <div data-erro-geral>${caixaErro(geral, geral && Object.keys(erros).length ? erros : {})}</div>
      <div class="flex flex-wrap items-center justify-between gap-3 max-md:sticky max-md:bottom-0 max-md:z-10 max-md:-mx-4 max-md:border-t max-md:border-borda max-md:bg-white max-md:px-4 max-md:py-3">${botaoRestaurar(o.parte)}<button type="submit" class="${CLASSES.botaoPrimario}">Salvar alterações</button></div></form>`;
    window.scrollTo(0, y);
    o.aposDesenhar?.(o.estado);
  };
  ligar(o.raiz, o.estado, { modelos: o.modelos, aoEstrutura: desenhar, aoMudar: o.aoMudar });
  ligarRestauracao(o.raiz, (c) => {
    erros = {};
    geral = "";
    o.aoRestaurar(c);
    desenhar();
  });
  o.raiz.addEventListener("submit", async (e) => {
    e.preventDefault();
    erros = o.validar?.(o.estado) ?? {};
    geral = Object.keys(erros).length ? MSG_CORRIGIR : "";
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
