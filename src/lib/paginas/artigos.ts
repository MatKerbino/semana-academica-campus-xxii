import { esc } from "../api";
import { gtsTrabalhos } from "../../data/trabalhos-aprovados";
import { aplicarConteudo, extrasTexto, horarioCompleto, icone, linkAtividade, obterConteudo, porTipo } from "../conteudo";
import { url } from "../url";

/** Página Artigos: sessões de apresentação (artigo/banner) e trabalhos aprovados. */
export async function iniciar() {
  const c = await obterConteudo();
  aplicarConteudo(c, await extrasTexto());
  const sessoes = porTipo(c, "artigo", "banner");
  const gts = [...new Map(gtsTrabalhos.map((b) => [b.gt, b.nomeGt])).entries()];
  document.getElementById("sessoes")!.innerHTML = sessoes.length
    ? sessoes.map((a) => `<article class="flex flex-col gap-1.5 rounded-cartao border border-verde-medio bg-palha p-4">
        ${icone("file-text", "size-6 text-verde-escuro")}
        <span class="w-fit rounded-full bg-creme px-2.5 py-0.5 text-xs font-bold text-verde-escuro">${esc(horarioCompleto(a).replace(" às ", "–"))}</span>
        <h2 class="text-lg leading-[1.3] font-semibold text-verde-escuro">${esc(a.titulo)}</h2>
        ${a.descricao[0] ? `<p class="text-[15px] text-chumbo">${esc(a.descricao[0])}</p>` : ""}
        <div class="mt-auto flex items-center justify-between gap-2 pt-1 text-[13px]"><span class="text-chumbo/80">${esc(a.local)}</span>
          <a href="${esc(url(linkAtividade(a.slug)))}" class="font-semibold text-azul hover:underline">Ver página da atividade →</a></div></article>`).join("")
    : '<p class="text-sm text-texto-suave">Nenhuma sessão cadastrada.</p>';
  document.getElementById("gts")!.innerHTML = gts.map(([gt, nome]) => `<div class="rounded-cartao border border-borda bg-white p-4"><h3 class="text-base font-bold text-verde-escuro">${esc(gt)}: ${esc(nome)}</h3>
    ${gtsTrabalhos.filter((b) => b.gt === gt).map((b) => `<details class="mt-2"><summary class="cursor-pointer text-tabela font-semibold text-verde-medio">${b.forma === "oral" ? "Comunicação oral" : "Pôster"} (${b.trabalhos.length})</summary>
      <ul class="mt-2 space-y-2">${b.trabalhos.map((t) => `<li class="text-sm text-chumbo"><span class="font-semibold">${esc(t.titulo)}</span><span class="block text-tabela text-chumbo/75">${esc(t.autores)}</span></li>`).join("")}</ul></details>`).join("")}</div>`).join("");
}
