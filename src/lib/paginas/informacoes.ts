import { esc } from "../api";
import { aplicarConteudo, extrasTexto, obterConteudo, texto } from "../conteudo";

/** Página Informações: seções editáveis (datas, edital, templates…). */
export async function iniciar() {
  const c = await obterConteudo();
  const extras = await extrasTexto();
  aplicarConteudo(c, extras);
  const i = c.informacoes;
  const t = (s: string) => esc(texto(c, s, extras));
  document.getElementById("info-titulo")!.textContent = texto(c, i.titulo, extras);
  document.getElementById("info-descricao")!.textContent = texto(c, i.descricao, extras);
  const item = (x: { rotulo: string; detalhe: string; url: string }) => {
    const corpo = `<span class="font-semibold text-verde-escuro">${t(x.rotulo)}</span>${x.detalhe ? `<span class="block text-tabela text-chumbo">${t(x.detalhe)}</span>` : ""}`;
    return x.url
      ? `<a href="${esc(x.url)}" target="_blank" rel="noopener" class="flex items-center justify-between gap-2 rounded-campo border border-borda bg-white p-3 text-sm hover:border-verde-medio"><span>${corpo}</span><span class="shrink-0 font-semibold text-azul">Abrir ↗</span></a>`
      : `<div class="rounded-campo border border-borda bg-white p-3 text-sm">${corpo}</div>`;
  };
  document.getElementById("info-secoes")!.innerHTML = i.secoes.length
    ? i.secoes.map((s) => `<section class="rounded-cartao border border-verde-medio bg-palha p-4"><h2 class="text-lg font-semibold text-verde-escuro">${t(s.titulo)}</h2>
        ${s.texto ? `<p class="mt-1 text-tabela text-chumbo">${t(s.texto)}</p>` : ""}
        ${s.itens.length ? `<div class="mt-2.5 grid gap-2.5 sm:grid-cols-2">${s.itens.map(item).join("")}</div>` : ""}</section>`).join("")
    : '<p class="text-sm text-texto-suave">Nenhuma informação publicada.</p>';
}
