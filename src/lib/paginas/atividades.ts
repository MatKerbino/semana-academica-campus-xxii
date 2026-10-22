/** Página única de atividades (RN-04): filtro por tipo e atividade selecionada via ?atividade=slug ou #slug (RN-06). */
import { esc, sessao } from "../api";
import {
  atividadesListadas, dia, diasDoEvento, horarioCompleto, icone, obterConteudo, palestrantesDe, sessoesDoDia, sessoesOrdenadas,
  type Atividade, type Conteudo,
} from "../conteudo";
import { ico } from "../visao";
import { url } from "../url";
import { registrarPronto, tagTipo } from "./comum";

const FILTROS = [
  { id: "todas", rotulo: "Todas", tipos: [] as string[] },
  { id: "minicurso", rotulo: "Minicursos", tipos: ["minicurso"] },
  { id: "palestra", rotulo: "Palestras", tipos: ["palestra", "mesa-redonda"] },
  { id: "curso", rotulo: "Cursos", tipos: ["curso"] },
  { id: "banner", rotulo: "Exposição de Banners", tipos: ["banner"] },
  { id: "artigo", rotulo: "Apresentação de artigos", tipos: ["artigo"] },
];
const filtroDe = (tipo: string) => FILTROS.find((f) => f.tipos.includes(tipo))?.id ?? "todas";

function detalhe(c: Conteudo, a: Atividade) {
  const ps = palestrantesDe(c, a);
  const resp = [...ps.map((p) => p.nome), a.responsavelTexto].filter(Boolean);
  const datas = [...new Set(sessoesOrdenadas(a).map((s) => dia(s.data).data))].join(" e ");
  const linhas: [string, string, string][] = [
    [ico("calendario", "size-4"), a.sessoes.length > 1 ? "Datas" : "Data", datas],
    [ico("relogio", "size-4"), "Horário", horarioCompleto(a)],
  ];
  if (a.local) linhas.push([ico("pin", "size-4"), "Local", a.local]);
  if (resp.length) linhas.push([ico("usuario", "size-4"), resp.length > 1 ? "Responsáveis" : "Responsável", resp.join("; ")]);
  if (a.vagas != null) linhas.push([icone("users", "size-4"), "Vagas", String(a.vagas)]);
  if (a.cargaHoraria) linhas.push([ico("capelo", "size-4"), "Carga horária", a.cargaHoraria]);
  const titulo = "text-sm leading-[1.4] font-semibold text-chumbo";
  return `<article class="flex flex-col gap-4 rounded-cartao border-2 border-verde-medio bg-white p-5 shadow-[0_1px_3px_rgba(15,41,8,0.08)] lg:p-7">
    <div class="flex flex-wrap items-center gap-2.5">${tagTipo(c, a.tipo)}<span class="text-xs leading-[1.3] font-bold tracking-[0.4px] text-verde-escuro uppercase">Atividade selecionada</span></div>
    <h2 class="text-2xl leading-[1.3] font-bold text-verde-escuro">${esc(a.titulo)}</h2>
    <dl class="flex flex-col gap-2.5 rounded-campo bg-palha p-4">${linhas
      .map(([i, r, v]) => `<div class="flex items-start gap-2.5"><span class="mt-0.5 text-verde-medio">${i}</span><div class="leading-normal"><dt class="text-[13px] text-texto-suave">${r}</dt><dd class="text-[15px] text-chumbo">${esc(v)}</dd></div></div>`)
      .join("")}</dl>
    ${a.descricao.length ? `<h3 class="${titulo}">Descrição</h3><div class="space-y-4 text-[15px] leading-normal text-chumbo">${a.descricao.map((p) => `<p>${esc(p)}</p>`).join("")}</div>` : ""}
    ${a.topicos.length ? `<h3 class="${titulo}">Tópicos</h3><ul class="space-y-2 text-[15px] leading-normal text-chumbo">${a.topicos.map((t) => `<li class="flex gap-2"><span aria-hidden="true">•</span>${esc(t)}</li>`).join("")}</ul>` : ""}
    <div class="flex flex-wrap items-center gap-3">
      <a href="${url(sessao() ? "/inscricao" : "/cadastro")}" class="flex items-center gap-2 rounded-full bg-verde-cta px-[22px] py-3 text-[15px] leading-[1.3] font-bold text-verde-noite hover:brightness-95">${ico("usuario-mais", "size-[18px]")}Inscrever-se</a>
      ${ps.length ? `<a href="${url("/palestrantes")}" class="flex items-center gap-2 px-2 py-3 text-[15px] leading-[1.3] font-bold text-verde-medio hover:underline">${ico("usuario", "size-[18px]")}Ver responsável</a>` : ""}
    </div>
    <p class="flex items-center gap-2 text-[13px] leading-normal text-texto-suave">${ico("info", "size-4")}A consulta das atividades não exige cadastro, entrada no sistema ou inscrição.</p>
  </article>`;
}

function desenhar(c: Conteudo) {
  const lista = atividadesListadas(c);
  const porSlug = new Map(lista.map((a) => [a.slug, a]));
  const total = (f: (typeof FILTROS)[number]) => (f.id === "todas" ? lista.length : lista.filter((a) => f.tipos.includes(a.tipo)).length);
  const $ = <T extends HTMLElement>(s: string) => document.querySelector<T>(s)!;

  $("[data-filtros]").innerHTML = FILTROS.map(
    (f) => `<button type="button" data-filtro="${f.id}" aria-pressed="${f.id === "todas"}" class="cursor-pointer rounded-full max-md:min-h-11 border border-verde-claro bg-white px-3.5 py-1.5 text-sm leading-[1.4] font-semibold text-verde-escuro aria-pressed:border-verde-escuro aria-pressed:bg-verde-escuro aria-pressed:text-white">${f.rotulo} (${total(f)})</button>`,
  ).join("");

  $("[data-lista]").innerHTML = diasDoEvento(c.evento)
    .map((d) => {
      const itens = sessoesDoDia(c, d.id).filter(({ atividade }) => porSlug.has(atividade.slug));
      return `<section data-dia class="flex flex-col gap-2.5"><h2 class="text-lg leading-[1.4] font-semibold text-verde-escuro">${esc(d.data)}</h2>${itens
        .map(({ atividade: a, sessao: s }) => `<div data-item="${esc(a.slug)}" data-tipo="${filtroDe(a.tipo)}" class="flex flex-col gap-2.5">
          <button type="button" data-abrir="${esc(a.slug)}" class="flex w-full cursor-pointer items-start gap-3.5 rounded-campo border border-borda bg-white px-4 py-3.5 text-left hover:bg-palha aria-[current=true]:border-2 aria-[current=true]:border-verde-medio aria-[current=true]:bg-entregue-fundo">
            <span class="flex w-16 shrink-0 flex-col"><span class="text-sm leading-[1.4] font-semibold text-verde-escuro">${d.curta}</span><span class="text-[13px] leading-normal text-texto-suave">${s.inicio.replace(":", "h")}</span></span>
            <span class="flex min-w-0 flex-1 flex-col gap-1">${tagTipo(c, a.tipo)}<span class="text-sm leading-[1.4] font-semibold text-verde-escuro">${esc(a.titulo)}</span>
              ${a.local ? `<span class="flex items-center gap-1.5 text-[13px] leading-normal text-texto-suave">${ico("pin", "size-3.5")}${esc(a.local)}</span>` : ""}</span>
            <span data-selecionada hidden class="shrink-0 text-xs leading-[1.3] font-bold tracking-[0.4px] text-verde-escuro uppercase">Selecionada</span>
          </button>
          <div data-detalhe-movel hidden class="lg:hidden"></div></div>`)
        .join("")}</section>`;
    })
    .join("");

  const itens = [...document.querySelectorAll<HTMLElement>("[data-item]")];
  const botoes = [...document.querySelectorAll<HTMLButtonElement>("[data-abrir]")];
  const filtros = [...document.querySelectorAll<HTMLButtonElement>("[data-filtro]")];
  const desktop = window.matchMedia("(min-width: 1024px)");

  const selecionar = (slug: string, rolar = false) => {
    botoes.forEach((b) => {
      const ativo = b.dataset.abrir === slug;
      b.setAttribute("aria-current", String(ativo));
      b.querySelector<HTMLElement>("[data-selecionada]")!.hidden = !ativo;
    });
    const html = detalhe(c, porSlug.get(slug)!);
    $("[data-detalhe]").innerHTML = html;
    document.querySelectorAll<HTMLElement>("[data-detalhe-movel]").forEach((d) => {
      const meu = d.closest<HTMLElement>("[data-item]")!.dataset.item === slug;
      d.hidden = !meu;
      d.innerHTML = meu ? html : "";
    });
    history.replaceState(null, "", `?atividade=${slug}`);
    if (rolar && !desktop.matches) botoes.find((b) => b.dataset.abrir === slug)?.scrollIntoView({ block: "start" });
  };

  const filtrar = (id: string) => {
    filtros.forEach((f) => f.setAttribute("aria-pressed", String(f.dataset.filtro === id)));
    itens.forEach((i) => (i.hidden = id !== "todas" && i.dataset.tipo !== id));
    document.querySelectorAll<HTMLElement>("[data-dia]").forEach((d) => (d.hidden = ![...d.querySelectorAll<HTMLElement>("[data-item]")].some((i) => !i.hidden)));
  };

  botoes.forEach((b) => b.addEventListener("click", () => selecionar(b.dataset.abrir!, true)));
  filtros.forEach((f) =>
    f.addEventListener("click", () => {
      filtrar(f.dataset.filtro!);
      const primeiro = itens.find((i) => !i.hidden);
      if (primeiro && !itens.some((i) => !i.hidden && i.querySelector("[aria-current=true]"))) selecionar(primeiro.dataset.item!);
    }),
  );

  const params = new URLSearchParams(location.search);
  const slug = params.get("atividade") ?? decodeURIComponent(location.hash.slice(1));
  const alvo = itens.find((i) => i.dataset.item === slug);
  if (alvo) filtrar("todas");
  const inicial = alvo ?? itens[0];
  if (inicial) selecionar(inicial.dataset.item!, Boolean(alvo));
  else $("[data-lista]").innerHTML = `<p class="rounded-cartao border border-borda bg-white p-5 text-sm text-texto-suave">Nenhuma atividade cadastrada.</p>`;
  if (params.get("de") === "cronograma") $("[data-voltar]").hidden = false;
}

/** Página Atividades: filtro por tipo, lista por dia e detalhe da atividade selecionada. */
export const iniciarAtividades = () => registrarPronto(obterConteudo().then(desenhar));
