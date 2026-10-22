/** Página inicial desenhada a partir do conteúdo editável (hero, quadros, grupos de atividades e local). */
import { esc } from "../api";
import { atividadesListadas, extrasTexto, icone, iconeDoSlot, obterConteudo, texto, type Conteudo, type SlotIcone } from "../conteudo";
import { obterForma } from "../forma-participacao";
import { url } from "../url";
import { registrarPronto } from "./comum";

const cartao = "flex flex-col gap-3.5 rounded-cartao border border-borda bg-white p-[22px] shadow-[0_1px_3px_rgba(15,41,8,0.08)]";
const titulo = "text-lg leading-[1.4] font-semibold text-verde-escuro";
const corpo = "text-[15px] leading-normal text-chumbo";

const GRUPOS: { slot: SlotIcone; titulo: string; tipos: string[]; unidade: string }[] = [
  { slot: "minicurso", titulo: "Minicursos", tipos: ["minicurso"], unidade: "atividades" },
  { slot: "palestra", titulo: "Palestras", tipos: ["palestra", "mesa-redonda"], unidade: "atividades" },
  { slot: "curso", titulo: "Cursos", tipos: ["curso"], unidade: "atividades" },
  { slot: "banner", titulo: "Exposição de Banners", tipos: ["banner"], unidade: "sessões" },
  { slot: "artigo", titulo: "Apresentação de artigos", tipos: ["artigo"], unidade: "sessões" },
];

function hero(c: Conteudo, forma: string) {
  const e = c.evento;
  const itens: [SlotIcone, string][] = [
    ["periodo", texto(c, "{{periodo}}")],
    ["local", e.local.curto],
    ["participacao", `Forma de participação: ${forma}`],
    ["publico", "Aberto à comunidade interna e externa"],
  ];
  document.querySelector("[data-info]")!.innerHTML = itens
    .map(([slot, t]) => `<li class="flex items-center gap-2 text-sm leading-[1.4] font-semibold text-verde-escuro">${iconeDoSlot(c, slot, "size-[18px] text-verde-medio")}<span>${esc(t)}</span></li>`)
    .join("");

  const img = document.querySelector<HTMLImageElement>("[data-banner]")!;
  const b = c.aparencia.banner;
  const base = ((import.meta.env.PUBLIC_API_URL as string | undefined) ?? "").replace(/\/+$/, "");
  const fonte = b.origem === "enviado" ? `${base}/banner?v=${encodeURIComponent(b.versao ?? "")}` : b.origem === "url" && b.url ? b.url : "";
  if (fonte) {
    img.removeAttribute("srcset");
    img.removeAttribute("sizes");
    img.src = fonte;
  }
  img.alt = texto(c, b.alt);
}

function quadros(c: Conteudo, extras: Awaited<ReturnType<typeof extrasTexto>>) {
  const e = c.evento;
  const sobre = c.quadros.inicioSobre
    .map((q) => `<article class="${cartao}">${icone(q.icone, "size-[26px] text-verde-escuro")}<h2 class="${titulo}">${esc(texto(c, q.titulo, extras))}</h2><p class="${corpo}">${esc(texto(c, q.texto, extras))}</p></article>`)
    .join("");
  const tema = `<article class="flex flex-col gap-3.5 rounded-cartao border border-verde-escuro bg-verde-escuro p-[22px] text-white shadow-[0_1px_3px_rgba(15,41,8,0.08)]">
    <h2 class="${titulo} !text-white">Tema do evento</h2><p class="text-[15px] leading-normal">"${esc(e.lema)}"</p>
    <p class="text-[13px] leading-normal text-verde-claro">Realização: ${esc(e.realizacao.join(" · "))}</p></article>`;
  document.querySelector("[data-sobre]")!.innerHTML = sobre + tema;

  document.querySelector("[data-passos]")!.innerHTML = c.quadros.inicioPassos
    .map((p, i) => `<article class="${cartao}"><span class="flex size-8 items-center justify-center rounded-full bg-verde-escuro text-sm font-bold text-white">${i + 1}</span><h2 class="${titulo}">${esc(texto(c, p.titulo, extras))}</h2><p class="${corpo}">${esc(texto(c, p.texto, extras))}</p></article>`)
    .join("");
}

function grupos(c: Conteudo) {
  const lista = atividadesListadas(c);
  document.querySelector("[data-grupos]")!.innerHTML = GRUPOS.map((g) => {
    const n = lista.filter((a) => g.tipos.includes(a.tipo)).length;
    return `<article class="flex flex-col gap-2 rounded-cartao border border-borda bg-creme p-5">${iconeDoSlot(c, g.slot, "size-[22px] text-verde-escuro")}
      <h2 class="${titulo}">${g.titulo}</h2><p class="text-[13px] leading-normal text-texto-suave">${n} ${g.unidade}</p>
      <a href="${url("/atividades")}" class="flex items-center gap-1 text-sm font-semibold text-azul hover:underline">Ver na página de atividades →</a></article>`;
  }).join("");
}

function local(c: Conteudo) {
  const l = c.evento.local;
  document.querySelector("[data-local]")!.innerHTML = `<article class="${cartao} max-w-xl items-start">${iconeDoSlot(c, "local", "size-[26px] text-verde-escuro")}
    <h2 class="${titulo}">${esc(l.nome)}</h2><p class="${corpo}">${esc(l.endereco)} · ${esc(l.cidade)}</p>
    <a href="${esc(l.mapsUrl)}" target="_blank" rel="noopener" class="flex items-center gap-2 rounded-full bg-azul px-[22px] py-3 text-[15px] leading-[1.3] font-bold text-white hover:opacity-90">${iconeDoSlot(c, "local", "size-[18px]")}Abrir no Google Maps</a></article>`;
}

export function iniciarInicio() {
  registrarPronto(
    (async () => {
      const [c, extras, forma] = await Promise.all([obterConteudo(), extrasTexto(), obterForma()]);
      hero(c, forma.destaque);
      quadros(c, extras);
      grupos(c);
      local(c);
    })(),
  );
}
