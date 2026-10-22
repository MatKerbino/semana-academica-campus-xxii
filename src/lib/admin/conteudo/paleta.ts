/** Editor de paleta: cartões das paletas prontas, paleta personalizada (9 cores, prévia ao vivo e contraste). */
import opcoes from "../../../data/opcoes.json";
import { esc } from "../../api";
import { avisosDeContraste, previa, type Aparencia } from "../../conteudo";
import { caixaErro, type Erros } from "./form";

type Cores = Record<string, string>;
const HEX = /^#[0-9a-f]{6}$/i;
const NOME = (token: string) => `coresPersonalizadas.${token}`;
const AMOSTRA = ["verde-escuro", "verde-medio", "verde-cta", "verde-claro", "creme", "palha"];

/** Cores editáveis e onde cada uma aparece no site (o admin escolhe a cor; o lugar é fixo). */
const CORES: Record<string, { rotulo: string; uso: string }> = {
  "verde-escuro": { rotulo: "Cor principal escura", uso: "Cabeçalho, rodapé, títulos e botões de contorno." },
  "verde-medio": { rotulo: "Cor de destaque", uso: "Links de seção, tags de palestra, ícones e cartão selecionado." },
  "verde-cta": { rotulo: "Cor do botão de ação", uso: "Botão “Inscreva-se” e destaques do menu." },
  "verde-claro": { rotulo: "Cor clara de apoio", uso: "Fundos de seleção e textos secundários sobre a cor escura." },
  divisor: { rotulo: "Cor dos divisores", uso: "Linhas sobre fundo escuro e menu lateral do painel." },
  "verde-noite": { rotulo: "Cor do texto sobre o botão de ação", uso: "Texto dos botões de ação e fundo das janelas de confirmação." },
  creme: { rotulo: "Fundo dos destaques", uso: "Faixas de título e cartão da página inicial." },
  palha: { rotulo: "Fundo da página", uso: "Fundo geral do site." },
  borda: { rotulo: "Cor das bordas", uso: "Contorno de cartões, campos e tabelas." },
};

const amostras = (cores: Cores) => AMOSTRA.map((t) => `<span class="size-7 rounded-full border border-black/10" style="background:${esc(cores[t])}"></span>`).join("");

const cartao = (valor: string, rotulo: string, cores: Cores, marcado: boolean) =>
  `<label class="cursor-pointer"><input type="radio" class="peer sr-only" name="paleta" value="${valor}" ${marcado ? "checked" : ""} />
    <span class="flex h-full flex-col gap-2 rounded-cartao border-[1.5px] border-borda bg-white p-3 peer-checked:border-2 peer-checked:border-verde-medio peer-checked:bg-entregue-fundo peer-focus-visible:outline-2 peer-focus-visible:outline-azul">
      <span class="flex gap-1">${amostras(cores)}</span><span class="text-sm font-semibold text-chumbo">${esc(rotulo)}</span></span></label>`;

/** Grade com as paletas prontas e a opção "Personalizada". */
export const cartoesPaleta = (a: Aparencia) =>
  `<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">${opcoes.paletas.map((p) => cartao(p.id, p.rotulo, p.cores, a.paleta === p.id)).join("")}${cartao("personalizada", "Personalizada (escolha as cores)", a.coresPersonalizadas, a.paleta === "personalizada")}</div>`;

const avisosHtml = (a: Aparencia, erros: Erros = {}) => {
  const avisos = avisosDeContraste(a.coresPersonalizadas);
  const erro = erros.coresPersonalizadas ? caixaErro(erros.coresPersonalizadas) : "";
  const lista = avisos.length
    ? `<ul role="status" class="flex list-disc flex-col gap-1 rounded-campo border border-pendente-borda bg-pendente-fundo p-4 pl-8 text-sm text-pendente-texto">${avisos.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>`
    : `<p role="status" class="text-[13px] text-texto-suave">Contraste adequado: os textos continuam legíveis.</p>`;
  return erro + lista;
};

const linhaCor = (a: Aparencia, token: string) => {
  const { rotulo, uso } = CORES[token];
  const valor = a.coresPersonalizadas[token];
  return `<div class="flex flex-wrap items-center gap-3 rounded-campo border border-borda bg-palha p-3">
    <input type="color" name="${NOME(token)}" value="${esc(valor)}" aria-label="${esc(rotulo)}" class="size-11 shrink-0 cursor-pointer rounded-campo border border-borda bg-white p-0.5" />
    <div class="min-w-48 flex-1"><p class="text-sm font-semibold text-chumbo">${esc(rotulo)}</p><p class="text-[13px] leading-normal text-texto-suave">${esc(uso)}</p></div>
    <input type="text" data-hex="${token}" value="${esc(valor)}" maxlength="7" spellcheck="false" aria-label="${esc(`Código hexadecimal: ${rotulo}`)}" class="h-10 w-28 rounded-campo border-[1.5px] border-borda bg-white px-3 font-mono text-sm text-chumbo aria-invalid:border-2 aria-invalid:border-erro" /></div>`;
};

/** Seção das 9 cores (só aparece com a paleta "Personalizada"); vazia nas demais. */
export function secaoPersonalizada(a: Aparencia, erros: Erros): string {
  if (a.paleta !== "personalizada") return "";
  const prontas = opcoes.paletas.map((p) => `<option value="${p.id}">${esc(p.rotulo)}</option>`).join("");
  return `<div class="flex flex-col gap-3 border-t border-borda pt-4">
    <div class="flex flex-wrap items-center gap-3"><h3 class="text-sm font-semibold text-chumbo">Suas cores</h3><span class="flex-1"></span>
      <label class="flex items-center gap-2 text-[13px] text-chumbo">Copiar de uma paleta pronta
        <select id="copiar-paleta" class="h-10 cursor-pointer rounded-campo border-[1.5px] border-borda bg-white px-2.5 text-sm"><option value="">Escolher…</option>${prontas}</select></label></div>
    <div class="grid gap-2.5 lg:grid-cols-2">${opcoes.coresEditaveis.map((t) => linhaCor(a, t)).join("")}</div>
    <div id="avisos-contraste" class="flex flex-col gap-2">${avisosHtml(a, erros)}</div></div>`;
}

/** Erro de salvamento: a paleta personalizada precisa passar nas regras de legibilidade (a API repete a checagem). */
export function validarPaleta(a: Aparencia): Erros {
  if (a.paleta !== "personalizada") return {};
  if (!Object.values(a.coresPersonalizadas).every((v) => HEX.test(v))) return { coresPersonalizadas: "Use cores no formato #rrggbb." };
  const avisos = avisosDeContraste(a.coresPersonalizadas);
  return avisos.length ? { coresPersonalizadas: `Ajuste as cores antes de salvar. ${avisos.join(" ")}` } : {};
}

/** Aplica a prévia ao vivo e atualiza os avisos de contraste. */
export function atualizarPrevia(raiz: HTMLElement, a: Aparencia) {
  previa(a);
  const avisos = raiz.querySelector("#avisos-contraste");
  if (avisos) avisos.innerHTML = avisosHtml(a);
}

/** Uma cor foi alterada no seletor nativo (`nome` = "coresPersonalizadas.<token>"): sincroniza o campo hexadecimal. */
export function aoMudarCor(raiz: HTMLElement, a: Aparencia, nome: string) {
  const token = nome.slice(nome.indexOf(".") + 1);
  const hex = raiz.querySelector<HTMLInputElement>(`[data-hex="${token}"]`);
  if (hex) {
    hex.value = a.coresPersonalizadas[token];
    hex.removeAttribute("aria-invalid");
  }
  atualizarPrevia(raiz, a);
}

/** Liga o campo hexadecimal e o "Copiar de uma paleta pronta" (por delegação; chamar uma vez). */
export function ligarPaletaPersonalizada(raiz: HTMLElement, a: Aparencia, redesenhar: () => void) {
  raiz.addEventListener("input", (e) => {
    const campo = e.target as HTMLInputElement;
    const token = campo.dataset.hex;
    if (!token) return;
    const valor = campo.value.trim();
    campo.toggleAttribute("aria-invalid", !HEX.test(valor));
    if (!HEX.test(valor)) return;
    a.coresPersonalizadas[token] = valor.toLowerCase();
    raiz.querySelector<HTMLInputElement>(`input[type=color][name="${NOME(token)}"]`)!.value = valor.toLowerCase();
    atualizarPrevia(raiz, a);
  });
  raiz.addEventListener("change", (e) => {
    const sel = e.target as HTMLSelectElement;
    if (sel.id !== "copiar-paleta" || !sel.value) return;
    const origem = opcoes.paletas.find((p) => p.id === sel.value) as { cores: Cores } | undefined;
    if (!origem) return;
    for (const t of opcoes.coresEditaveis) a.coresPersonalizadas[t] = origem.cores[t];
    previa(a);
    redesenhar();
  });
}
