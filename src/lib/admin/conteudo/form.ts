/** Blocos de formulário do editor de conteúdo: campos ligados ao estado por caminho ("local.nome", "sessoes.0.data"). */
import opcoes from "../../../data/opcoes.json";
import { esc } from "../../api";
import { icone } from "../../conteudo";
import { CLASSES } from "../componentes";
import { eStatusErro } from "../http";
import { icone as iconeAdmin } from "../icones";

export type Erros = Record<string, string>;
/** Estado de um editor: objeto lido e escrito por caminho ("local.nome", "sessoes.0.data"). */
export type Estado = object;
type No = Record<string, unknown>;

export const obter = (o: Estado, c: string): unknown => c.split(".").reduce<unknown>((a, k) => (a as No | undefined)?.[k], o);
export const obterLista = (o: Estado, c: string) => obter(o, c) as unknown[];
export function definir(o: Estado, c: string, v: unknown) {
  const ps = c.split(".");
  const ultimo = ps.pop()!;
  (ps.reduce<unknown>((a, k) => (a as No)[k], o) as No)[ultimo] = v;
}

export const MSG_CORRIGIR = "Corrija os campos destacados.";

const CAMPO = "w-full rounded-campo border-[1.5px] border-borda bg-white px-3.5 text-[15px] text-chumbo outline-none focus:border-verde-medio";
export const idDe = (nome: string) => `c-${nome.replace(/\./g, "-")}`;

export type OpcCampo = {
  tipo?: string; linhas?: number; ajuda?: string; obrigatorio?: boolean; placeholder?: string;
  /** Lista gravada como array: "linhas" (uma por linha) ou "paragrafos" (separados por linha em branco). */
  lista?: "linhas" | "paragrafos"; classe?: string;
};

export function campo(estado: Estado, nome: string, rotulo: string, erros: Erros, o: OpcCampo = {}) {
  const bruto = obter(estado, nome);
  const valor = Array.isArray(bruto) ? bruto.join(o.lista === "paragrafos" ? "\n\n" : "\n") : String(bruto ?? "");
  const erro = erros[nome];
  const id = idDe(nome);
  const atributos = `id="${id}" name="${esc(nome)}" ${o.lista ? `data-lista="${o.lista}"` : ""} ${o.placeholder ? `placeholder="${esc(o.placeholder)}"` : ""} ${erro ? `aria-invalid="true" aria-describedby="e-${id}"` : o.ajuda ? `aria-describedby="e-${id}"` : ""}`;
  const controle = o.linhas
    ? `<textarea ${atributos} rows="${o.linhas}" class="${CAMPO} py-2.5 ${erro ? "!border-2 !border-erro" : ""}">${esc(valor)}</textarea>`
    : `<input ${atributos} type="${o.tipo ?? "text"}" value="${esc(valor)}" class="${CAMPO} h-12 ${erro ? "!border-2 !border-erro" : ""}" />`;
  return `<div class="flex flex-col gap-1.5 ${o.classe ?? ""}"><label for="${id}" class="text-sm leading-[1.4] font-semibold text-chumbo">${esc(rotulo)}${o.obrigatorio ? " *" : ""}</label>${controle}
    ${erro ? `<p id="e-${id}" class="text-[13px] text-erro">${esc(erro)}</p>` : o.ajuda ? `<p id="e-${id}" class="text-[13px] leading-normal text-texto-suave">${esc(o.ajuda)}</p>` : ""}</div>`;
}

export function selecao(estado: Estado, nome: string, rotulo: string, itens: [string, string][], erros: Erros, classe = "") {
  const atual = String(obter(estado, nome) ?? "");
  const id = idDe(nome);
  return `<div class="flex flex-col gap-1.5 ${classe}"><label for="${id}" class="text-sm leading-[1.4] font-semibold text-chumbo">${esc(rotulo)}</label>
    <select id="${id}" name="${esc(nome)}" class="${CAMPO} h-12 cursor-pointer ${erros[nome] ? "!border-2 !border-erro" : ""}">${itens.map(([v, t]) => `<option value="${esc(v)}" ${v === atual ? "selected" : ""}>${esc(t)}</option>`).join("")}</select>
    ${erros[nome] ? `<p class="text-[13px] text-erro">${esc(erros[nome])}</p>` : ""}</div>`;
}

export const secao = (titulo: string, corpo: string, descricao = "") =>
  `<section class="${CLASSES.cartao} flex flex-col gap-4"><div><h2 class="${CLASSES.titulo}">${esc(titulo)}</h2>${descricao ? `<p class="mt-1 text-[13px] leading-normal text-texto-suave">${esc(descricao)}</p>` : ""}</div>${corpo}</section>`;

/** Caixa de um item de lista editável (quadro, passo, grupo, seção...) com as ações de mover/remover abaixo. */
export const caixaItem = (corpo: string, acoes: string) =>
  `<div class="flex flex-col gap-3 rounded-campo border border-borda bg-palha p-4"><div class="flex flex-col gap-3">${corpo}</div><div class="flex justify-end">${acoes}</div></div>`;

export const botaoPeq = "flex cursor-pointer items-center gap-1.5 rounded-full border-2 border-borda bg-white px-3.5 py-1.5 max-md:min-h-11 max-md:min-w-11 max-md:justify-center text-[13px] font-bold text-verde-escuro hover:bg-palha disabled:opacity-40";
export const botaoAdicionar = (caminho: string, modelo: string, rotulo: string) =>
  `<button type="button" data-add="${esc(caminho)}" data-modelo="${modelo}" class="${botaoPeq} w-fit">${iconeAdmin("plus", "size-4")}${esc(rotulo)}</button>`;
/** Remover / mover um item de lista (caminho do item, ex.: "inicioSobre.1"). */
export const acoesItem = (caminho: string, i: number, total: number) =>
  `<div class="flex shrink-0 gap-1.5">
    <button type="button" data-mover="${caminho}:-1" ${i === 0 ? "disabled" : ""} aria-label="Mover para cima" class="${botaoPeq} !px-2.5">↑</button>
    <button type="button" data-mover="${caminho}:1" ${i === total - 1 ? "disabled" : ""} aria-label="Mover para baixo" class="${botaoPeq} !px-2.5">↓</button>
    <button type="button" data-rm="${caminho}" aria-label="Remover" class="${botaoPeq} !px-2.5 !border-erro-borda !text-erro">${iconeAdmin("trash", "size-4")}</button></div>`;

/** Ícone da biblioteca do conteúdo escolhido numa grade (um <details> com o ícone atual no resumo). */
export function seletorIcone(nome: string, atual: string, rotulo: string, ajuda = "") {
  const grade = opcoes.icones.map((id) => `<label title="${id}" class="cursor-pointer"><input type="radio" class="peer sr-only" name="${esc(nome)}" value="${id}" data-icone-radio ${id === atual ? "checked" : ""} />
    <span class="flex size-10 items-center justify-center rounded-campo border-[1.5px] border-borda bg-white text-verde-escuro peer-checked:border-2 peer-checked:border-verde-medio peer-checked:bg-entregue-fundo peer-focus-visible:outline-2 peer-focus-visible:outline-azul hover:bg-palha">${icone(id, "size-5")}</span></label>`).join("");
  return `<details class="rounded-campo border-[1.5px] border-borda bg-white"><summary class="flex cursor-pointer items-center gap-3 px-3.5 py-2.5 text-sm font-semibold text-chumbo">
    <span data-resumo-icone class="flex size-9 items-center justify-center rounded-campo bg-entregue-fundo text-verde-escuro">${icone(atual, "size-5")}</span>
    <span class="flex-1">${esc(rotulo)}${ajuda ? `<span class="block text-[13px] font-normal text-texto-suave">${esc(ajuda)}</span>` : ""}</span><span class="text-xs text-texto-suave">Trocar ícone</span></summary>
    <div class="flex flex-wrap gap-1.5 border-t border-borda p-3" role="radiogroup" aria-label="${esc(rotulo)}">${grade}</div></details>`;
}

export function erroDe(e: unknown): { mensagem: string; campos: Erros } {
  const x = eStatusErro(e);
  return { mensagem: x.message, campos: Object.fromEntries(Object.entries(x.campos ?? {}).map(([k, v]) => [k, String(v)])) };
}
export const caixaErro = (mensagem: string, campos: Erros = {}) =>
  mensagem ? `<div role="alert" class="rounded-campo border border-erro-borda bg-erro-fundo p-4 text-sm font-semibold text-erro">${esc(mensagem)}${Object.keys(campos).length ? `<ul class="mt-1.5 list-disc pl-5 font-normal">${Object.entries(campos).map(([k, v]) => `<li>${esc(k)}: ${esc(v)}</li>`).join("")}</ul>` : ""}</div>` : "";

export type Ligacao = { modelos?: Record<string, () => unknown>; aoEstrutura: () => void; aoMudar?: (nome: string, valor: unknown, el: HTMLInputElement) => void };

const valorDe = (el: HTMLInputElement): unknown => {
  if (el.dataset.lista) {
    const partes = el.dataset.lista === "paragrafos" ? el.value.split(/\n\s*\n/) : el.value.split("\n");
    return partes.map((l) => l.trim()).filter(Boolean);
  }
  if (el.type === "checkbox") return el.checked;
  if (el.type === "number") return el.value === "" ? null : Number(el.value);
  return el.value;
};

/** Liga os campos [name] ao estado e trata adicionar/remover/mover itens de lista. */
export function ligar(raiz: HTMLElement, estado: Estado, { modelos = {}, aoEstrutura, aoMudar }: Ligacao) {
  const aoAlterar = (e: Event) => {
    const el = e.target as HTMLInputElement;
    if (!el.name || (el.type === "radio" && !el.checked)) return;
    if (el.dataset.multi !== undefined) {
      definir(estado, el.name, [...raiz.querySelectorAll<HTMLInputElement>(`input[name="${el.name}"]:checked`)].map((x) => x.value));
    } else definir(estado, el.name, valorDe(el));
    if (el.hasAttribute("data-icone-radio")) {
      const det = el.closest("details")!;
      det.querySelector("[data-resumo-icone]")!.innerHTML = el.nextElementSibling!.innerHTML;
      det.open = false;
    }
    aoMudar?.(el.name, obter(estado, el.name), el);
  };
  raiz.addEventListener("input", aoAlterar);
  raiz.addEventListener("change", aoAlterar);
  raiz.addEventListener("click", (e) => {
    const alvo = (e.target as HTMLElement).closest<HTMLElement>("[data-add],[data-rm],[data-mover]");
    if (!alvo || (alvo as HTMLButtonElement).disabled) return;
    const separar = (c: string) => [c.slice(0, c.lastIndexOf(".")), Number(c.slice(c.lastIndexOf(".") + 1))] as const;
    if (alvo.dataset.add) obterLista(estado, alvo.dataset.add).push(modelos[alvo.dataset.modelo!]());
    else if (alvo.dataset.rm) {
      const [lista, i] = separar(alvo.dataset.rm);
      obterLista(estado, lista).splice(i, 1);
    } else if (alvo.dataset.mover) {
      const [item, dir] = alvo.dataset.mover.split(":");
      const [lista, i] = separar(item);
      const arr = obterLista(estado, lista);
      const j = i + Number(dir);
      if (j >= 0 && j < arr.length) [arr[i], arr[j]] = [arr[j], arr[i]];
    } else return;
    aoEstrutura();
  });
}
