/**
 * Aplica o conteúdo à página já renderizada: paleta, título, textos e links ligados por atributos.
 *   data-t="modelo {{nome}}"     → textContent com os marcadores trocados
 *   data-slot="marca"            → innerHTML = ícone do slot (classe em data-classe)
 *   data-link="politica|termos|email|maps" → href (e some quando o link está vazio)
 */
import { minuscula, obterForma } from "../forma-participacao";
import { url } from "../url";
import { iconeDoSlot } from "./icones";
import { coresDaAparencia, type Cores } from "./paleta";
import { linkPolitica, texto, type ExtrasTexto } from "./formatar";
import type { Aparencia, Conteudo, SlotIcone } from "./tipos";

/** Aplica cores já resolvidas (`coresDaAparencia`) como variáveis CSS; as classes do Tailwind leem `--color-*`. */
export function aplicarPaleta(cores: Cores) {
  for (const [nome, valor] of Object.entries(cores)) document.documentElement.style.setProperty(`--color-${nome}`, valor);
}

/** Prévia ao vivo para o painel: aplica a paleta da aparência sem salvar nada (recarregar a página desfaz). */
export const previa = (aparencia: Pick<Aparencia, "paleta" | "coresPersonalizadas">) => aplicarPaleta(coresDaAparencia(aparencia));

/** Extras dos modelos de texto que dependem de outra chamada à API (forma de participação vigente). */
export async function extrasTexto(): Promise<ExtrasTexto> {
  return { forma: minuscula(await obterForma()) };
}

const externo = (h: string) => /^https?:/.test(h);

/** Aplica paleta, título, textos (`data-t`), ícones (`data-slot`) e links (`data-link`) da página. */
export function aplicarConteudo(c: Conteudo, extras: ExtrasTexto = {}) {
  aplicarPaleta(coresDaAparencia(c.aparencia));
  const titulo = document.documentElement.dataset.tituloPagina;
  if (titulo) document.title = `${titulo} · ${c.evento.nome}`;

  document.querySelectorAll<HTMLElement>("[data-t]").forEach((el) => (el.textContent = texto(c, el.dataset.t!, extras)));
  document.querySelectorAll<HTMLElement>("[data-slot]").forEach((el) => {
    const svg = iconeDoSlot(c, el.dataset.slot as SlotIcone, el.dataset.classe);
    if (svg) el.innerHTML = svg;
  });
  document.querySelectorAll<HTMLAnchorElement>("[data-link]").forEach((a) => {
    const links: Record<string, string> = {
      politica: linkPolitica(c), termos: c.evento.links.termos, email: c.evento.email ? `mailto:${c.evento.email}` : "", maps: c.evento.local.mapsUrl,
    };
    const destino = links[a.dataset.link!] ?? "";
    a.hidden = !destino;
    if (!destino) return;
    a.href = externo(destino) || destino.startsWith("mailto:") ? destino : url(destino);
    if (externo(destino)) {
      a.target = "_blank";
      a.rel = "noopener";
    }
  });
}
