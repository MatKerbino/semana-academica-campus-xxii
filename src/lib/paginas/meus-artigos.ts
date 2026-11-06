/** Meus artigos: lista, edição (com troca do PDF) e avaliações liberadas pela organização. */
import { esc, exigirLogin } from "../api";
import {
  abrirArquivo, configuracao, meusArtigos, minhasAvaliacoes, rotuloResultado, urlDoArquivo,
  type Artigo, type ConfigArtigos,
} from "../artigos/api";
import { avisoErro, avisoInfo, CARTAO, LINK_BOTAO, mostrarErroPagina, motivoFechado } from "../artigos/comum";
import { montarEditor } from "../artigos/editor";
import { url } from "../url";

type Avaliacoes = Awaited<ReturnType<typeof minhasAvaliacoes>>;

const TOM = { aprovado: "border-entregue-borda bg-entregue-fundo text-entregue-texto", aprovado_com_ressalvas: "border-pendente-borda bg-pendente-fundo text-pendente-texto", rejeitado: "border-erro-borda bg-erro-fundo text-erro" };

export async function iniciar() {
  if (!exigirLogin()) return;
  const raiz = document.getElementById("lista")!;
  let config: ConfigArtigos;
  let artigos: Artigo[];
  let avaliacoes: Avaliacoes;

  const avaliacoesDe = (id: string) => avaliacoes.artigos.find((a) => a.artigoId === id)?.avaliacoes ?? [];
  const blocoAvaliacoes = (id: string) => {
    if (!avaliacoes.liberadas) return `<p class="text-[13px] text-texto-suave">As avaliações ainda não foram liberadas pela organização.</p>`;
    const lista = avaliacoesDe(id);
    if (!lista.length) return `<p class="text-[13px] text-texto-suave">Nenhuma avaliação concluída para este artigo.</p>`;
    return lista
      .map((a, i) => `<div class="rounded-campo border border-borda bg-palha p-4"><p class="text-[13px] font-semibold text-texto-suave">Avaliação ${i + 1}</p>
        <span class="mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-bold tracking-[0.4px] uppercase ${TOM[a.resultado]}">${esc(rotuloResultado[a.resultado])}</span>
        ${a.observacoesAutor ? `<p class="mt-2 text-[15px] leading-normal whitespace-pre-line text-chumbo">${esc(a.observacoesAutor)}</p>` : ""}</div>`)
      .join("");
  };

  const cartao = (a: Artigo) => `<article class="${CARTAO} flex flex-col gap-3" aria-labelledby="t-${esc(a.id)}">
    <div><h2 id="t-${esc(a.id)}" class="text-[18px] leading-[1.4] font-semibold text-verde-escuro">${esc(a.titulo)}</h2></div>
    <div class="flex flex-wrap gap-3"><button type="button" data-pdf="${esc(a.id)}" class="${LINK_BOTAO} cursor-pointer">Abrir PDF${a.arquivo ? ` (${esc(a.arquivo.nome)})` : ""}</button>
      ${motivoFechado(config, "edicao") ? "" : `<button type="button" data-editar="${esc(a.id)}" class="${LINK_BOTAO} cursor-pointer">Editar</button>`}</div>
    <div class="flex flex-col gap-2 border-t border-borda pt-3"><h3 class="text-sm font-semibold text-chumbo">Avaliações</h3>${blocoAvaliacoes(a.id)}</div></article>`;

  const desenhar = () => {
    const fechado = motivoFechado(config, "edicao");
    raiz.innerHTML = `${fechado ? avisoInfo(`Edição indisponível. ${fechado}`) : ""}
      ${artigos.length ? artigos.map(cartao).join("") : `<div class="${CARTAO} flex flex-col gap-3"><p class="text-[15px] text-chumbo">Você ainda não submeteu nenhum artigo.</p><a href="${url("/submeter-artigo")}" class="${LINK_BOTAO}">Submeter artigo</a></div>`}`;
  };

  const carregar = async () => {
    [config, artigos, avaliacoes] = await Promise.all([configuracao(), meusArtigos(), minhasAvaliacoes()]);
    desenhar();
  };

  raiz.addEventListener("click", async (e) => {
    const alvo = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-pdf],[data-editar]");
    if (!alvo) return;
    if (alvo.dataset.pdf) {
      try {
        await abrirArquivo(() => urlDoArquivo(alvo.dataset.pdf!));
      } catch (err) {
        alvo.insertAdjacentHTML("afterend", avisoErro(err instanceof Error ? err.message : "Não foi possível abrir o arquivo."));
      }
      return;
    }
    const artigo = artigos.find((a) => a.id === alvo.dataset.editar)!;
    raiz.innerHTML = `<section class="${CARTAO} flex flex-col gap-4"><h2 class="text-[18px] font-semibold text-verde-escuro">Editar artigo</h2><div id="editor"></div></section>`;
    montarEditor(raiz.querySelector<HTMLElement>("#editor")!, {
      config, artigo,
      aoCancelar: desenhar,
      aoSalvar: () => carregar().catch((err) => mostrarErroPagina(raiz, err)),
    });
    raiz.querySelector<HTMLElement>("input")?.focus();
  });

  try {
    await carregar();
  } catch (e) {
    mostrarErroPagina(raiz, e);
  }
}
