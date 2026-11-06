/** Área do avaliador: artigos alocados, critérios e formulário de avaliação. */
import { ApiError, erroCampos, esc, exigirLogin, limparErro, mostrarErro } from "../api";
import {
  abrirArquivo, artigosDoAvaliador, enviarAvaliacao, rotuloResultado, urlDoArquivoAvaliador,
  type ArtigoAvaliador, type Resultado,
} from "../artigos/api";
import { avisoErro, avisoInfo, CARTAO, LINK_BOTAO, mostrarErroPagina } from "../artigos/comum";
import { BOTAO, caixaGeral } from "../artigos/editor";

const CAMPO = "w-full rounded-campo border-[1.5px] border-borda bg-white px-3.5 py-2.5 text-[15px] text-chumbo outline-none focus:border-azul aria-[invalid=true]:border-2 aria-[invalid=true]:border-erro";

const observacao = (id: string, nome: string, rotulo: string, ajuda: string, valor: string) =>
  `<div class="flex flex-col gap-1.5"><label for="${id}-${nome}" class="text-sm leading-[1.4] font-semibold text-chumbo">${rotulo}</label>
    <textarea id="${id}-${nome}" name="${nome}" rows="4" maxlength="3000" aria-describedby="${id}-${nome}-ajuda ${id}-${nome}-erro" class="${CAMPO}">${esc(valor)}</textarea>
    <p id="${id}-${nome}-ajuda" class="text-[13px] leading-normal text-texto-suave">${ajuda}</p>
    <p id="${id}-${nome}-erro" data-erro="${nome}" class="text-[13px] leading-normal text-erro empty:hidden"></p></div>`;

function cartao(a: ArtigoAvaliador) {
  const m = a.minhaAvaliacao;
  const id = `av-${esc(a.id)}`;
  const opcoes = (Object.entries(rotuloResultado) as [Resultado, string][])
    .map(([v, r]) => `<label class="flex cursor-pointer items-center gap-2 text-[15px] text-chumbo"><input type="radio" name="resultado" value="${v}" ${m?.resultado === v ? "checked" : ""} class="size-4 accent-verde-medio" />${r}</label>`)
    .join("");
  return `<article class="${CARTAO} flex flex-col gap-4" data-artigo="${esc(a.id)}">
    <div class="flex flex-wrap items-start justify-between gap-3"><div class="min-w-0 flex-1"><h2 class="text-[18px] leading-[1.4] font-semibold text-verde-escuro">${esc(a.titulo)}</h2></div>
      <span data-situacao class="rounded-full border px-2.5 py-1 text-xs font-bold tracking-[0.4px] uppercase ${m ? "border-entregue-borda bg-entregue-fundo text-entregue-texto" : "border-pendente-borda bg-pendente-fundo text-pendente-texto"}">${m ? "Avaliação concluída" : "Pendente"}</span></div>
    <button type="button" data-pdf class="${LINK_BOTAO} cursor-pointer">Abrir PDF do artigo</button>
    <form novalidate class="flex flex-col gap-4 border-t border-borda pt-4">
      ${caixaGeral("Não foi possível salvar a avaliação")}
      <fieldset class="flex flex-col gap-2" aria-describedby="${id}-resultado-erro"><legend class="text-sm font-semibold text-chumbo">Resultado *</legend>${opcoes}
        <p id="${id}-resultado-erro" data-erro="resultado" class="text-[13px] leading-normal text-erro empty:hidden"></p></fieldset>
      ${observacao(id, "observacoesAutor", "Observações para o autor", "O autor lê este texto quando a organização liberar as avaliações.", m?.observacoesAutor ?? "")}
      ${observacao(id, "observacoesAdmin", "Observações só para a administração", "Não aparece para o autor em nenhuma etapa.", m?.observacoesAdmin ?? "")}
      <div class="flex flex-wrap items-center justify-end gap-3"><p data-ok role="status" class="text-sm font-semibold text-entregue-texto empty:hidden"></p><button type="submit" class="${BOTAO}">${m ? "Atualizar avaliação" : "Enviar avaliação"}</button></div></form></article>`;
}

export async function iniciar() {
  if (!exigirLogin()) return;
  const raiz = document.getElementById("lista")!;
  let artigos: ArtigoAvaliador[];
  try {
    const r = await artigosDoAvaliador();
    artigos = r.artigos;
    const criterios = r.criterios.length
      ? `<section class="${CARTAO}" aria-labelledby="criterios"><h2 id="criterios" class="text-[18px] font-semibold text-verde-escuro">Critérios de avaliação</h2>
          <ul class="mt-3 list-disc space-y-1 pl-5 text-[15px] leading-normal text-chumbo">${r.criterios.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></section>`
      : avisoInfo("A organização ainda não cadastrou os critérios de avaliação.");
    raiz.innerHTML = criterios + (artigos.length ? artigos.map(cartao).join("") : avisoInfo("Nenhum artigo foi alocado para você até o momento."));
  } catch (e) {
    mostrarErroPagina(raiz, e instanceof ApiError && e.status === 403 ? new Error("Esta área é exclusiva para avaliadores habilitados pela organização.") : e);
    return;
  }

  raiz.addEventListener("click", async (e) => {
    const botao = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-pdf]");
    if (!botao) return;
    const id = botao.closest<HTMLElement>("[data-artigo]")!.dataset.artigo!;
    try {
      await abrirArquivo(() => urlDoArquivoAvaliador(id));
    } catch (err) {
      botao.insertAdjacentHTML("afterend", avisoErro(err instanceof Error ? err.message : "Não foi possível abrir o arquivo."));
    }
  });

  raiz.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const id = form.closest<HTMLElement>("[data-artigo]")!.dataset.artigo!;
    const ok = form.querySelector<HTMLElement>("[data-ok]")!;
    ok.textContent = "";
    limparErro(form);
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!d.resultado) return mostrarErro(form, erroCampos({ resultado: "Selecione o resultado." }));
    const botao = form.querySelector<HTMLButtonElement>("button[type=submit]")!;
    botao.disabled = true;
    try {
      await enviarAvaliacao(id, { resultado: d.resultado as Resultado, observacoesAutor: d.observacoesAutor.trim(), observacoesAdmin: d.observacoesAdmin.trim() });
      ok.textContent = "Avaliação salva.";
      botao.textContent = "Atualizar avaliação";
      const situacao = form.closest("article")!.querySelector<HTMLElement>("[data-situacao]")!;
      situacao.textContent = "Avaliação concluída";
      situacao.className = "rounded-full border px-2.5 py-1 text-xs font-bold tracking-[0.4px] uppercase border-entregue-borda bg-entregue-fundo text-entregue-texto";
    } catch (err) {
      mostrarErro(form, err);
    }
    botao.disabled = false;
  });
}
