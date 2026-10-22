/** Atividades: lista com busca e filtros, e formulário de criar/editar/excluir. */
import opcoes from "../../../data/opcoes.json";
import { esc } from "../../api";
import { diasDoEvento, dataCurta, obterConteudo, rotuloDoTipo, type Atividade, type Conteudo } from "../../conteudo";
import { CLASSES, cabecalhoPagina, filtroHtml, normalizar } from "../componentes";
import { criarAtividade, editarAtividade, excluirAtividade } from "../conteudo-api";
import { icone } from "../icones";
import { toast } from "../interacao";
import { atividadeVazia, desenharFormulario, novaSessao, validarAtividade } from "./atividade-form";
import { botaoLinha, botaoLinhaPerigo, confirmarExclusao } from "./crud";
import { erroDe, ligar, type Erros } from "./form";

export async function iniciarAtividades(raiz: HTMLElement) {
  let c: Conteudo = await obterConteudo();
  const filtro = { busca: "", tipo: "todos", dia: "todos" };
  let editando: string | null | undefined;
  let erros: Erros = {};
  let geral = "";
  const f: Atividade = atividadeVazia(c);

  const linha = (a: Atividade) => `<article class="${CLASSES.cartao} flex flex-wrap items-start justify-between gap-3 !p-4">
      <div class="min-w-0 flex-1"><p class="text-xs font-bold tracking-[0.4px] text-verde-medio uppercase">${esc(rotuloDoTipo(a.tipo))}</p>
        <p class="text-base font-semibold text-verde-escuro">${esc(a.titulo)}</p>
        <p class="mt-1 text-[13px] text-chumbo">${esc(a.sessoes.map((s) => `${dataCurta(s.data)} ${s.inicio}–${s.fim}`).join(" · "))}${a.local ? ` · ${esc(a.local)}` : ""}</p></div>
      <div class="flex gap-2"><button type="button" data-editar="${esc(a.slug)}" class="${botaoLinha}">${icone("pencil", "size-4")}Editar</button>
        <button type="button" data-excluir="${esc(a.slug)}" class="${botaoLinhaPerigo}">${icone("trash", "size-4")}Excluir</button></div></article>`;
  const filtradas = () => c.atividades
    .filter((a) => (!filtro.busca || normalizar(`${a.titulo} ${a.local}`).includes(normalizar(filtro.busca))) && (filtro.tipo === "todos" || a.tipo === filtro.tipo) && (filtro.dia === "todos" || a.sessoes.some((s) => s.data === filtro.dia)))
    .sort((x, y) => (x.sessoes[0].data + x.sessoes[0].inicio).localeCompare(y.sessoes[0].data + y.sessoes[0].inicio));
  const desenharLista = () => {
    const itens = filtradas();
    raiz.querySelector("#lista")!.innerHTML = itens.length ? itens.map(linha).join("") : `<p class="text-sm text-texto-suave">Nenhuma atividade encontrada.</p>`;
    raiz.querySelector("#total")!.textContent = `${itens.length} de ${c.atividades.length} atividades`;
  };
  const desenhar = () => {
    if (editando === undefined) {
      raiz.innerHTML = `${cabecalhoPagina("Atividades", "Palestras, minicursos, cursos e demais atividades. O cronograma e a página Atividades são montados a partir daqui.")}
        <div class="flex flex-wrap items-center gap-3"><label class="flex h-12 w-full items-center gap-2.5 rounded-campo border-[1.5px] border-borda bg-white px-3.5 focus-within:border-verde-medio sm:w-72"><span class="sr-only">Buscar</span>${icone("search", "size-5 text-chumbo")}
          <input id="busca" type="search" value="${esc(filtro.busca)}" placeholder="Buscar por nome ou local" class="${CLASSES.entrada}" /></label>
          ${filtroHtml("f-tipo", "Tipo", [["todos", "Todos"], ...opcoes.tipos.map((t) => [t.id, t.rotulo] as [string, string])], filtro.tipo, "todos")}
          ${filtroHtml("f-dia", "Dia", [["todos", "Todos"], ...diasDoEvento(c.evento).map((d) => [d.id, d.curta] as [string, string])], filtro.dia, "todos")}
          <span class="flex-1"></span><button type="button" data-novo class="${CLASSES.botaoPrimario}">${icone("plus")}Nova atividade</button></div>
        <p id="total" class="text-[13px] text-texto-suave"></p><div id="lista" class="flex flex-col gap-3"></div>`;
      desenharLista();
      return;
    }
    raiz.innerHTML = `${cabecalhoPagina(editando === null ? "Nova atividade" : "Editar atividade")}${desenharFormulario(f, c, erros, geral, editando === null)}`;
    raiz.querySelector<HTMLElement>("input")?.focus();
  };
  const abrir = (slug: string | null) => {
    editando = slug; erros = {}; geral = "";
    Object.assign(f, atividadeVazia(c), slug ? structuredClone(c.atividades.find((a) => a.slug === slug)) : {});
    desenhar();
  };
  const voltar = (novo?: Conteudo) => { if (novo) c = novo; editando = undefined; desenhar(); };

  ligar(raiz, f, { modelos: { sessao: () => novaSessao(c) }, aoEstrutura: desenhar });
  raiz.addEventListener("input", (e) => {
    if ((e.target as HTMLElement).id !== "busca") return;
    filtro.busca = (e.target as HTMLInputElement).value;
    desenharLista();
  });
  raiz.addEventListener("change", (e) => {
    const id = (e.target as HTMLElement).id;
    if (id !== "f-tipo" && id !== "f-dia") return;
    filtro[id === "f-tipo" ? "tipo" : "dia"] = (e.target as HTMLSelectElement).value;
    desenhar();
  });
  raiz.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest<HTMLElement>("[data-novo],[data-editar],[data-excluir],[data-cancelar]");
    if (!a) return;
    if (a.dataset.novo !== undefined) abrir(null);
    else if (a.dataset.editar) abrir(a.dataset.editar);
    else if (a.dataset.cancelar !== undefined) voltar();
    else if (a.dataset.excluir) {
      const x = c.atividades.find((y) => y.slug === a.dataset.excluir)!;
      confirmarExclusao({
        titulo: "Excluir atividade?", texto: `“${x.titulo}” será removida do cronograma e da página Atividades. A exclusão é recusada se houver inscrições confirmadas nela.`,
        acao: async () => { const novo = await excluirAtividade(x.slug); voltar(novo); toast("Atividade excluída."); },
      });
    }
  });
  raiz.addEventListener("submit", async (e) => {
    e.preventDefault();
    erros = validarAtividade(f, c); geral = "";
    if (Object.keys(erros).length) { geral = "Corrija os campos destacados."; desenhar(); raiz.querySelector<HTMLElement>("[aria-invalid=true]")?.focus(); return; }
    try {
      const novo = editando ? await editarAtividade(editando, f) : await criarAtividade(f);
      voltar(novo);
      toast("Atividade salva. O cronograma e a página Atividades já foram atualizados.");
    } catch (err) {
      const r = erroDe(err);
      geral = r.mensagem; erros = r.campos;
      desenhar();
      raiz.querySelector<HTMLElement>("#form")?.scrollIntoView({ block: "end" });
    }
  });
  desenhar();
}
