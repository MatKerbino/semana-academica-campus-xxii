import { esc } from "../api";
import { aplicarConteudo, espacosDoEvento, extrasTexto, icone, obterConteudo, texto } from "../conteudo";

/** Página Local: endereço, mapa e espaços usados pela programação. */
export async function iniciar() {
  const c = await obterConteudo();
  const extras = await extrasTexto();
  aplicarConteudo(c, extras);
  const l = c.evento.local;
  const itens = [
    ["map-pin", "Local", l.nome], ["map-pin", "Endereço", l.endereco], ["map-pin", "Cidade", l.cidade],
    ["building-2", "Espaços utilizados", espacosDoEvento(c).join(" · ")], ["mail", "Contato", c.evento.email],
  ].filter(([, , v]) => v);
  const mapa = document.getElementById("mapa") as HTMLIFrameElement;
  mapa.src = l.mapaEmbed;
  mapa.title = `Mapa da região do ${l.nome}`;
  document.getElementById("endereco")!.innerHTML = itens
    .map(([i, r, v]) => `<li class="flex gap-2">${icone(i, "mt-0.5 size-4 text-verde-medio")}<span><span class="block text-xs font-bold text-verde-medio">${r}</span><span class="block text-tabela text-chumbo">${esc(texto(c, v, extras))}</span></span></li>`)
    .join("");
}
