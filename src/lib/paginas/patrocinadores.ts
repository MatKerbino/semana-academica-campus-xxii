import { esc } from "../api";
import { aplicarConteudo, extrasTexto, icone, obterConteudo } from "../conteudo";
import { montarAbas } from "./abas";

const colunas = (n: number) => (n <= 2 ? "sm:grid-cols-2" : n === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4");

/** Página Patrocinadores: grupos de realização e apoio. */
export async function iniciar() {
  const c = await obterConteudo();
  aplicarConteudo(c, await extrasTexto());
  const grupos = c.quadros.apoio.filter((g) => g.itens.length);
  const raiz = document.getElementById("abas")!;
  if (!grupos.length) return void (raiz.innerHTML = '<p class="text-sm text-texto-suave">Nenhuma instituição cadastrada.</p>');
  montarAbas(raiz, "Realização e apoio", grupos.map((g) => ({
    id: g.id, rotulo: g.rotulo, classe: `grid gap-4 ${colunas(g.itens.length)}`,
    html: g.itens.map((p) => `<article class="flex flex-col items-center rounded-cartao border border-borda bg-white p-4">
      <span class="flex h-16 w-full items-center justify-center rounded-cartao bg-creme" aria-hidden="true">${icone("building-2", "size-7 text-verde-medio")}</span>
      <h2 class="mt-3 text-center text-sm font-semibold text-verde-escuro">${esc(p.nome)}</h2>
      ${p.detalhe ? `<p class="mt-1 text-center text-tabela text-chumbo/75">${esc(p.detalhe)}</p>` : ""}
      ${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener" class="mt-1.5 flex items-center gap-1.5 text-tabela font-semibold text-azul hover:underline">Visitar site ↗</a>` : ""}
    </article>`).join(""),
  })));
}
