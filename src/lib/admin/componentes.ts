/** Blocos de página: classes comuns, paginação, busca, filtros, botões de ação e rodapé de tabela. */
import { esc } from "../api";
import { eStatusErro } from "./http";
import { icone } from "./icones";

export const CLASSES = {
  botaoPrimario: "flex cursor-pointer items-center justify-center gap-2 rounded-full bg-verde-cta px-[22px] py-3 text-[15px] leading-[1.3] font-bold text-verde-noite hover:brightness-95 disabled:opacity-60",
  botaoContorno: "flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-verde-escuro bg-white px-[22px] py-3 text-[15px] leading-[1.3] font-bold text-verde-escuro hover:bg-palha",
  campo: "group flex h-12 items-center gap-2.5 rounded-campo border-[1.5px] border-borda bg-white px-3.5 focus-within:border-verde-medio",
  entrada: "min-w-0 flex-1 bg-transparent text-[15px] text-chumbo outline-none placeholder:text-texto-suave",
  cartao: "rounded-cartao border border-borda bg-white p-6 shadow-[0_1px_3px_rgba(15,41,8,0.08)]",
  titulo: "text-[18px] leading-[1.4] font-semibold text-verde-escuro",
};

/** Paginação simples no cliente ("Anterior" / "Próxima"). */
export function paginar<T>(itens: T[], pagina: number, tamanho: number) {
  const paginas = Math.max(1, Math.ceil(itens.length / tamanho));
  const atual = Math.min(Math.max(pagina, 1), paginas);
  return { itens: itens.slice((atual - 1) * tamanho, atual * tamanho), atual, paginas };
}

export const normalizar = (t: string) => t.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export const cabecalhoPagina = (titulo: string, descricao?: string) =>
  `<div class="flex flex-col gap-1.5"><h1 class="text-[32px] leading-[1.3] font-bold text-verde-escuro max-lg:text-[26px]">${esc(titulo)}</h1>${descricao ? `<p class="text-[15px] leading-normal text-chumbo">${esc(descricao)}</p>` : ""}</div>`;

/** Filtro em pílula ("Inscrição: Todas ˅"): fica verde quando o valor difere do padrão. */
export function filtroHtml(id: string, rotulo: string, opcoes: [string, string][], valor: string, padrao: string, extra = "") {
  const ativo = valor !== padrao;
  return `<label class="${extra} relative flex cursor-pointer items-center gap-1 rounded-full border-solid bg-white py-2.5 pr-9 pl-4 text-sm leading-[1.3] font-semibold text-verde-escuro ${ativo ? "border-2 border-verde-medio bg-entregue-fundo" : "border-[1.5px] border-borda"}">
    <span>${esc(rotulo)}:</span>
    <select id="${id}" class="cursor-pointer appearance-none bg-transparent font-semibold outline-none">${opcoes.map(([v, t]) => `<option value="${v}" ${v === valor ? "selected" : ""}>${esc(t)}</option>`).join("")}</select>
    <span class="pointer-events-none absolute right-3.5">${icone("chevron-down", "size-4")}</span></label>`;
}

export const buscaHtml = (id: string, valor = "") =>
  `<label class="flex h-12 w-full items-center gap-2.5 rounded-campo border-[1.5px] border-borda bg-white px-3.5 focus-within:border-verde-medio sm:w-80"><span class="sr-only">Buscar</span>${icone("search", "size-5 text-chumbo")}
   <input id="${id}" type="search" value="${esc(valor)}" placeholder="Buscar por nome, CPF ou e-mail" class="${CLASSES.entrada}" /></label>`;

export const botaoOlho = (href: string, rotulo: string) =>
  `<a href="${href}" aria-label="${esc(rotulo)}" class="flex size-9 items-center justify-center rounded-campo border-[1.5px] border-borda bg-white text-verde-escuro hover:bg-palha">${icone("eye", "size-[18px]")}</a>`;

/** Atalho para registrar o pagamento como regularizado sem abrir a inscrição (só para confirmadas com pagamento pendente). */
export const botaoConfirmarPagamento = (login: string, rotulo: string, larguraTotal = false) =>
  `<button type="button" data-confirmar-pagamento="${esc(login)}" aria-label="Confirmar pagamento de ${esc(rotulo)}" title="Marcar o pagamento como regularizado" class="flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-verde-cta px-3.5 text-[13px] leading-[1.3] font-bold whitespace-nowrap text-verde-noite hover:brightness-95 disabled:cursor-wait disabled:opacity-60 ${larguraTotal ? "w-full" : ""}">${icone("check", "size-4")}Confirmar pagamento</button>`;

export const rodapeTabela = (texto: string, atual: number, paginas: number) =>
  `<div class="flex flex-wrap items-center justify-between gap-3"><p class="text-[13px] text-texto-suave">${esc(texto)}</p>
   <div class="flex gap-3"><button type="button" data-pag="-1" ${atual <= 1 ? "disabled" : ""} class="flex cursor-pointer items-center gap-2 rounded-full border-2 border-borda bg-white px-[22px] py-2.5 text-[15px] font-bold text-verde-escuro disabled:opacity-50">${icone("arrow-left", "size-[18px]")}Anterior</button>
   <button type="button" data-pag="1" ${atual >= paginas ? "disabled" : ""} class="cursor-pointer rounded-full border-2 border-verde-escuro bg-white px-[22px] py-2.5 text-[15px] font-bold text-verde-escuro disabled:opacity-50">Próxima</button></div></div>`;

export const cabecalhoColuna = "px-3 py-3 text-left text-xs leading-[1.3] font-bold tracking-[0.4px] text-texto-suave uppercase";

export const erroCarregar = (e: unknown) =>
  `<div role="alert" class="rounded-campo border border-erro-borda bg-erro-fundo p-4 text-sm font-semibold text-erro">${esc(eStatusErro(e).message)}</div>`;
