/** Artigos submetidos: alocação de avaliadores e liberação geral das avaliações. */
import { esc } from "../../api";
import { abrirArquivo, alocar, artigosAdmin, liberarAvaliacoes, urlDoArquivo, usuarios, type ArtigoAdmin } from "../../artigos/api";
import { CLASSES, erroCarregar } from "../componentes";
import { botaoLinha, confirmarAcao } from "../conteudo/crud";
import { secao } from "../conteudo/form";
import { icone } from "../icones";
import { abrirModal, toast } from "../interacao";

const chip = (a: { login: string; status: string }) =>
  `<span class="rounded-full border border-borda bg-palha px-2.5 py-1 text-xs font-semibold text-chumbo">${esc(a.login)} · ${a.status === "concluida" ? "concluída" : "pendente"}</span>`;

const linha = (a: ArtigoAdmin) =>
  `<article class="${CLASSES.cartao} flex flex-col gap-3 !p-4">
    <div><p class="text-base font-semibold text-verde-escuro">${esc(a.titulo)}</p>
      <p class="text-[13px] text-texto-suave">conta ${esc(a.autorLogin)}</p></div>
    <div class="flex flex-wrap items-center gap-1.5"><span class="text-[13px] font-semibold text-texto-suave">Avaliadores:</span>${a.avaliadores.length ? a.avaliadores.map(chip).join("") : `<span class="text-[13px] text-texto-suave">nenhum</span>`}</div>
    <div class="flex flex-wrap gap-2"><button type="button" data-pdf="${esc(a.id)}" class="${botaoLinha}">${icone("file-text", "size-4")}Abrir PDF</button>
      <button type="button" data-alocar="${esc(a.id)}" class="${botaoLinha}">${icone("users", "size-4")}Definir avaliadores</button></div></article>`;

export async function montarLista(raiz: HTMLElement) {
  let artigos: ArtigoAdmin[] = [];
  const recarregar = async () => {
    artigos = await artigosAdmin();
    raiz.innerHTML =
      secao("Artigos submetidos", artigos.length ? `<div class="grid gap-3 lg:grid-cols-2">${artigos.map(linha).join("")}</div>` : `<p class="text-sm text-texto-suave">Nenhum artigo submetido.</p>`) +
      `<div class="mt-6">${secao(
        "Liberar avaliações aos autores",
        `<button type="button" data-liberar class="${CLASSES.botaoPrimario} w-fit">${icone("check")}Liberar avaliações</button>`,
        "Ação única do evento: todas as avaliações já concluídas passam a aparecer para os respectivos autores. Não há liberação individual. As observações para a administração nunca são exibidas aos autores.",
      )}</div>`;
  };

  async function abrirAlocacao(a: ArtigoAdmin) {
    const avaliadores = (await usuarios()).filter((u) => u.avaliador);
    const marcados = new Set(a.avaliadores.map((x) => x.login));
    const { dialogo, fechar } = abrirModal(`<h2 class="${CLASSES.titulo} !text-[20px]">Avaliadores do artigo</h2>
      <p class="mt-1 text-[13px] text-texto-suave">${esc(a.titulo)}</p>
      ${avaliadores.length ? `<fieldset class="mt-4 flex max-h-72 flex-col gap-2 overflow-y-auto"><legend class="sr-only">Avaliadores</legend>${avaliadores.map((u) => `<label class="flex cursor-pointer items-center gap-2.5 text-[15px] text-chumbo"><input type="checkbox" value="${esc(u.login)}" ${marcados.has(u.login) ? "checked" : ""} class="size-5 accent-verde-medio" />${esc(u.nome ?? u.login)}${u.nome ? `<span class="text-[13px] text-texto-suave">${esc(u.login)}</span>` : ""}</label>`).join("")}</fieldset>` : `<p class="mt-4 text-[15px] text-chumbo">Nenhum usuário foi habilitado como avaliador. Habilite em Avaliadores.</p>`}
      <div data-erro-modal hidden role="alert" class="mt-4 rounded-campo border border-erro-borda bg-erro-fundo p-4 text-sm font-semibold text-erro"></div>
      <div class="mt-6 flex flex-wrap justify-end gap-3"><button type="button" data-voltar class="${CLASSES.botaoContorno}">Cancelar</button>${avaliadores.length ? `<button type="button" data-salvar class="${CLASSES.botaoPrimario}">Salvar</button>` : ""}</div>`);
    dialogo.querySelector("[data-voltar]")!.addEventListener("click", fechar);
    dialogo.querySelector<HTMLButtonElement>("[data-salvar]")?.addEventListener("click", async (e) => {
      const botao = e.currentTarget as HTMLButtonElement;
      botao.disabled = true;
      try {
        await alocar(a.id, [...dialogo.querySelectorAll<HTMLInputElement>("input:checked")].map((i) => i.value));
        fechar();
        await recarregar();
        toast("Avaliadores do artigo atualizados.");
      } catch (err) {
        const caixa = dialogo.querySelector<HTMLElement>("[data-erro-modal]")!;
        caixa.textContent = err instanceof Error ? err.message : "Não foi possível salvar.";
        caixa.hidden = false;
        botao.disabled = false;
      }
    });
  }

  raiz.addEventListener("click", async (e) => {
    const alvo = (e.target as HTMLElement).closest<HTMLElement>("[data-pdf],[data-alocar],[data-liberar]");
    if (!alvo) return;
    if (alvo.dataset.liberar !== undefined) {
      confirmarAcao({
        titulo: "Liberar todas as avaliações?",
        texto: "Todas as avaliações concluídas ficarão visíveis para os autores de uma só vez. Não é possível liberar uma avaliação isoladamente.",
        rotuloOk: "Liberar avaliações",
        acao: async () => toast(`Avaliações liberadas (${(await liberarAvaliacoes()).liberadas}).`),
      });
    } else if (alvo.dataset.pdf) {
      try {
        await abrirArquivo(() => urlDoArquivo(alvo.dataset.pdf!));
      } catch (err) {
        alvo.insertAdjacentHTML("afterend", `<span role="alert" class="text-[13px] text-erro">${esc(err instanceof Error ? err.message : "Não foi possível abrir o arquivo.")}</span>`);
      }
    } else {
      try {
        await abrirAlocacao(artigos.find((a) => a.id === alvo.dataset.alocar)!);
      } catch (err) {
        alvo.insertAdjacentHTML("afterend", `<span role="alert" class="text-[13px] text-erro">${esc(err instanceof Error ? err.message : "Não foi possível carregar os avaliadores.")}</span>`);
      }
    }
  });

  try {
    await recarregar();
  } catch (e) {
    raiz.innerHTML = erroCarregar(e);
  }
}
