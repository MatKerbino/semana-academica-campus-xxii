/** Seletor de atividades (filtro por tipo + cartões), compartilhado entre a inscrição e a edição de atividades. */
import { esc, type Vagas } from "./api";
import { ico, tagTipo, type ItemCatalogo } from "./visao";

const GRUPOS: [ItemCatalogo["tipo"], string][] = [
  ["palestra", "Palestras"],
  ["minicurso", "Minicursos"],
  ["curso", "Cursos"],
  ["banner", "Exposição de Banners"],
  ["artigo", "Apresentação de artigos"],
];

type Opcoes = {
  raiz: HTMLElement;
  catalogo: ItemCatalogo[];
  vagas: Vagas;
  selecionadas: string[];
  /** Atividades já salvas na inscrição: continuam marcáveis mesmo sem vagas, e servem de base para o resumo de alterações. */
  salvas?: string[];
  aoMudar?: (selecionadas: string[]) => void;
};

export function montarSeletor({ raiz, catalogo, vagas, selecionadas, salvas = [], aoMudar }: Opcoes) {
  const marcadas = new Set(selecionadas);
  let filtro: string = "todas";

  const contagem = (tipo: string) => (tipo === "todas" ? catalogo.length : catalogo.filter((a) => a.tipo === tipo).length);
  const restantes = (slug: string) => {
    const v = vagas[slug];
    return v && v.vagas != null ? Math.max(v.vagas - v.ocupadas, 0) : null;
  };
  const semVagas = (a: ItemCatalogo) => {
    const v = vagas[a.slug];
    return !!v && !v.disponivel && !salvas.includes(a.slug);
  };

  function cartao(a: ItemCatalogo) {
    const sel = marcadas.has(a.slug);
    const bloqueada = semVagas(a);
    // Já marcada e sem vagas (lotou depois da escolha): continua desmarcável, só não pode ser marcada de novo.
    const desabilitada = bloqueada && !sel;
    const rest = restantes(a.slug);
    const status = bloqueada
      ? `<span class="inline-flex items-center gap-1.5 rounded-full border border-borda bg-[#eeeeee] px-2.5 py-1 text-[11px] font-bold tracking-[0.4px] text-chumbo uppercase">${ico("proibido", "size-3.5")}Sem vagas</span>`
      : `<span class="text-[13px] leading-[1.4] text-texto-suave">${sel ? "Selecionada · " : ""}${rest == null ? "Entrada livre · sem limite de vagas" : `${rest} de ${a.vagas} vagas restantes`}</span>`;
    return `<label class="flex w-full items-start gap-3 rounded-campo border p-3.5 ${sel ? "border-2 border-verde-medio bg-verde-claro" : "border-borda bg-white"} ${desabilitada ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:border-verde-medio"} has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-azul">
      <input type="checkbox" class="peer sr-only" name="atividade" value="${esc(a.slug)}" ${sel ? "checked" : ""} ${desabilitada ? "disabled" : ""} />
      <span aria-hidden="true" class="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded border-[1.5px] ${sel ? "border-verde-medio bg-verde-medio text-white" : "border-chumbo/60 bg-white text-transparent"}">${ico("ok", "size-3")}</span>
      <span class="min-w-0 flex-1 space-y-1">
        <span class="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">${tagTipo(a.tipo)}${status}</span>
        <span class="block text-sm leading-[1.4] font-semibold text-chumbo">${esc(a.titulo)}</span>
        <span class="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] leading-normal text-texto-suave">
          <span class="flex items-center gap-1.5">${ico("calendario", "size-3.5")}${esc(a.data)} · ${esc(a.horario)}</span>
          ${a.local ? `<span class="flex items-center gap-1.5">${ico("pin", "size-3.5")}${esc(a.local)}</span>` : ""}
        </span>
      </span>
    </label>`;
  }

  function resumo() {
    const n = marcadas.size;
    const texto = `${n} ${n === 1 ? "atividade selecionada" : "atividades selecionadas"}`;
    if (!salvas.length) return { texto, detalhe: "Você pode alterar a seleção depois, dentro do prazo, em Minha inscrição." };
    const add = [...marcadas].filter((s) => !salvas.includes(s)).length;
    const rem = salvas.filter((s) => !marcadas.has(s)).length;
    const partes = [`${add} ${add === 1 ? "adicionada" : "adicionadas"}`, `${rem} ${rem === 1 ? "removida" : "removidas"} em relação à seleção salva`];
    return { texto, detalhe: partes.join(" · ") };
  }

  function desenhar() {
    const { texto, detalhe } = resumo();
    const chips = [["todas", `Todas (${contagem("todas")})`], ...GRUPOS.map(([t, r]) => [t, `${r} (${contagem(t)})`])]
      .map(
        ([t, r]) =>
          `<button type="button" data-filtro="${t}" aria-pressed="${filtro === t}" class="cursor-pointer rounded-full border px-3.5 py-1.5 text-[13px] leading-[1.3] font-semibold ${filtro === t ? "border-verde-escuro bg-verde-escuro text-white" : "border-borda bg-white text-verde-escuro hover:border-verde-medio"}">${r}</button>`,
      )
      .join("");
    const grupos = GRUPOS.filter(([t]) => filtro === "todas" || filtro === t)
      .map(([t, r]) => {
        const itens = catalogo.filter((a) => a.tipo === t);
        return `<section class="space-y-3"><h3 class="text-[18px] leading-[1.4] font-semibold text-verde-escuro">${r} (${itens.length})</h3>
          <div class="grid items-start gap-3 md:grid-cols-2">${itens.map(cartao).join("")}</div></section>`;
      })
      .join("");
    raiz.innerHTML = `
      <p class="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-campo border border-entregue-borda bg-verde-claro px-4 py-2.5 text-[13px] leading-normal text-chumbo" role="status">
        <span class="flex items-center gap-2 font-bold text-verde-escuro">${ico("lista", "size-[18px]")}${texto}</span><span>${detalhe}</span></p>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">${chips}</div>
      <div class="space-y-6">${grupos}</div>`;
  }

  raiz.addEventListener("change", (e) => {
    const alvo = e.target as HTMLInputElement;
    if (alvo.name !== "atividade") return;
    alvo.checked ? marcadas.add(alvo.value) : marcadas.delete(alvo.value);
    const foco = alvo.value;
    desenhar();
    raiz.querySelector<HTMLInputElement>(`input[value="${foco}"]`)?.focus();
    aoMudar?.([...marcadas]);
  });
  raiz.addEventListener("click", (e) => {
    const chip = (e.target as HTMLElement).closest<HTMLElement>("[data-filtro]");
    if (!chip) return;
    filtro = chip.dataset.filtro!;
    desenhar();
    raiz.querySelector<HTMLElement>(`[data-filtro="${filtro}"]`)?.focus();
  });

  desenhar();
  return {
    obter: () => catalogo.filter((a) => marcadas.has(a.slug)).map((a) => a.slug),
    atualizarVagas(novas: Vagas) {
      Object.assign(vagas, novas);
      desenhar();
    },
  };
}
