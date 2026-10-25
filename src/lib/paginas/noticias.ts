import { esc } from "../api";
import { aplicarConteudo, dataUtc, extrasTexto, obterConteudo, texto, type Conteudo, type ExtrasTexto, type Noticia } from "../conteudo";
import { url } from "../url";

const linkNoticia = (slug: string) => url(`/noticias?n=${encodeURIComponent(slug)}`);
const dataLonga = (iso: string) => dataUtc(iso).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const http = (u: string) => (/^https?:\/\//i.test(u) ? u : "");

/** Mais recentes primeiro (data igual: a última gravada vem antes). */
export const noticiasRecentes = (c: Conteudo): Noticia[] =>
  [...(c.noticias ?? [])].reverse().sort((a, b) => b.data.localeCompare(a.data));

const imagem = (n: Noticia, classe: string) =>
  http(n.imagem) ? `<img src="${esc(http(n.imagem))}" alt="${esc(n.imagemAlt)}" loading="lazy" class="${classe}" />` : "";

/** Cartão da lista (também usado na página inicial). */
export function cartaoNoticia(c: Conteudo, n: Noticia, extras: ExtrasTexto) {
  const t = (s: string) => esc(texto(c, s, extras));
  return `<article class="flex min-w-0 flex-col overflow-hidden rounded-cartao border border-borda bg-white shadow-[0_1px_3px_rgba(15,41,8,0.08)]">
    ${imagem(n, "h-40 w-full object-cover")}
    <div class="flex flex-1 flex-col gap-2 p-5">
      <time datetime="${esc(n.data)}" class="text-[13px] font-semibold text-verde-medio">${esc(dataLonga(n.data))}</time>
      <h2 class="text-lg leading-[1.4] font-semibold text-verde-escuro">${t(n.titulo)}</h2>
      <p class="text-[15px] leading-normal text-chumbo">${t(n.resumo)}</p>
      <a href="${esc(linkNoticia(n.slug))}" class="mt-auto pt-1 text-sm font-semibold text-azul hover:underline">Ler notícia →</a>
    </div></article>`;
}

function detalhe(c: Conteudo, n: Noticia, extras: ExtrasTexto) {
  const t = (s: string) => esc(texto(c, s, extras));
  return `<article class="mx-auto flex max-w-3xl flex-col gap-3 rounded-cartao border border-borda bg-white p-5 md:p-7">
    <a href="${esc(url("/noticias"))}" class="text-sm font-semibold text-azul hover:underline">← Todas as notícias</a>
    <time datetime="${esc(n.data)}" class="text-[13px] font-semibold text-verde-medio">${esc(dataLonga(n.data))}</time>
    <h2 class="text-2xl leading-[1.3] font-bold text-verde-escuro">${t(n.titulo)}</h2>
    <p class="text-[15px] font-medium leading-normal text-chumbo">${t(n.resumo)}</p>
    ${imagem(n, "h-auto max-h-[420px] w-full rounded-campo object-cover")}
    ${n.corpo.map((p) => `<p class="text-[15px] leading-relaxed text-chumbo">${t(p)}</p>`).join("")}
    ${http(n.link) ? `<a href="${esc(http(n.link))}" target="_blank" rel="noopener" class="self-start text-sm font-semibold text-azul hover:underline">Saiba mais ↗</a>` : ""}
  </article>`;
}

/** Página Notícias: lista (mais recentes primeiro) ou, com `?n=slug`, a notícia completa. */
export async function iniciar() {
  const c = await obterConteudo();
  const extras = await extrasTexto();
  aplicarConteudo(c, extras);
  const raiz = document.getElementById("noticias")!;
  const slug = new URLSearchParams(location.search).get("n");
  const lista = noticiasRecentes(c);
  const escolhida = slug ? lista.find((n) => n.slug === slug) : undefined;
  if (escolhida) {
    document.title = `${texto(c, escolhida.titulo, extras)} · ${texto(c, "{{nome}}", extras)}`;
    raiz.innerHTML = detalhe(c, escolhida, extras);
    return;
  }
  const aviso = slug
    ? `<p class="mb-3 rounded-campo border border-borda bg-white p-3 text-sm text-chumbo" role="status">Notícia não encontrada. Veja as demais abaixo.</p>`
    : "";
  raiz.innerHTML = lista.length
    ? `${aviso}<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${lista.map((n) => cartaoNoticia(c, n, extras)).join("")}</div>`
    : `${aviso}<p class="text-sm text-texto-suave">Nenhuma notícia publicada.</p>`;
}
