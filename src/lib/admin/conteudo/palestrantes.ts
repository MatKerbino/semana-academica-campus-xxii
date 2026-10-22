/** Palestrantes / ministrantes: lista, busca e formulário (nome, cargo, link do Lattes, descrição). */
import { esc } from "../../api";
import { atividadesDe, obterConteudo, type Conteudo, type Palestrante } from "../../conteudo";
import { CLASSES, cabecalhoPagina, normalizar } from "../componentes";
import { criarPalestrante, editarPalestrante, excluirPalestrante } from "../conteudo-api";
import { icone } from "../icones";
import { toast } from "../interacao";
import { barraBusca, botaoLinha, botaoLinhaPerigo, botoesForm, confirmarExclusao } from "./crud";
import { caixaErro, campo, erroDe, ligar, MSG_CORRIGIR, type Erros } from "./form";
import { botaoRestaurar, ligarRestauracao } from "./restaurar";

const VAZIO = (): Palestrante => ({ slug: "", nome: "", cargo: "", lattes: "", bio: "", email: "" });

export async function iniciarPalestrantes(raiz: HTMLElement) {
  let c: Conteudo = await obterConteudo();
  let busca = "";
  let editando: string | null | undefined; // undefined = lista; null = novo; string = slug
  let erros: Erros = {};
  let geral = "";
  const f: Palestrante = VAZIO();

  const linha = (p: Palestrante) => {
    const n = atividadesDe(c, p.slug).length;
    return `<article class="${CLASSES.cartao} flex flex-wrap items-start justify-between gap-3 !p-4">
      <div class="min-w-0 flex-1"><p class="text-base font-semibold text-verde-escuro">${esc(p.nome)}</p>${p.cargo ? `<p class="text-[13px] text-chumbo">${esc(p.cargo)}</p>` : ""}
        <p class="mt-1 text-[13px] text-texto-suave">${n} ${n === 1 ? "atividade" : "atividades"}${p.lattes ? " · com Lattes" : " · sem Lattes"}</p></div>
      <div class="flex gap-2"><button type="button" data-editar="${esc(p.slug)}" class="${botaoLinha}">${icone("pencil", "size-4")}Editar</button>
        <button type="button" data-excluir="${esc(p.slug)}" class="${botaoLinhaPerigo}">${icone("trash", "size-4")}Excluir</button></div></article>`;
  };
  const filtradas = () => c.palestrantes.filter((p) => !busca || normalizar(`${p.nome} ${p.cargo}`).includes(normalizar(busca)));
  const desenharLista = () => {
    const itens = filtradas();
    raiz.querySelector("#lista")!.innerHTML = itens.length ? itens.map(linha).join("") : `<p class="text-sm text-texto-suave">Nenhum palestrante encontrado.</p>`;
  };
  const desenhar = () => {
    if (editando === undefined) {
      raiz.innerHTML = `${cabecalhoPagina("Palestrantes e ministrantes", "Quem aparece na página Palestrantes e pode ser indicado como responsável por atividades.")}
        <div class="flex flex-wrap items-center gap-3">${barraBusca(busca, "Buscar por nome ou cargo", "sm:w-80")}<span class="flex-1"></span>
          ${botaoRestaurar("palestrantes")}<button type="button" data-novo class="${CLASSES.botaoPrimario}">${icone("plus")}Novo palestrante</button></div>
        <div id="lista" class="grid gap-3 lg:grid-cols-2"></div>`;
      desenharLista();
      return;
    }
    raiz.innerHTML = `${cabecalhoPagina(editando === null ? "Novo palestrante" : "Editar palestrante")}
      <form id="form" novalidate class="${CLASSES.cartao} flex flex-col gap-4">
        ${campo(f, "nome", "Nome", erros, { obrigatorio: true })}${campo(f, "cargo", "Cargo / vínculo", erros)}
        ${campo(f, "lattes", "Link do currículo Lattes", erros, { tipo: "url", placeholder: "https://lattes.cnpq.br/…" })}
        ${campo(f, "bio", "Descrição / currículo resumido", erros, { linhas: 6 })}${campo(f, "email", "E-mail (opcional)", erros, { tipo: "email" })}
        ${caixaErro(geral)}${botoesForm("Salvar palestrante")}</form>`;
    raiz.querySelector<HTMLElement>("input")?.focus();
  };
  const abrir = (slug: string | null) => {
    editando = slug; erros = {}; geral = "";
    Object.assign(f, VAZIO(), slug ? c.palestrantes.find((p) => p.slug === slug) : {});
    desenhar();
  };
  const voltar = (novo?: Conteudo) => { if (novo) c = novo; editando = undefined; desenhar(); };

  ligar(raiz, f, { aoEstrutura: desenhar });
  ligarRestauracao(raiz, (novo) => voltar(novo));
  raiz.addEventListener("input", (e) => {
    if ((e.target as HTMLElement).id !== "busca") return;
    busca = (e.target as HTMLInputElement).value;
    desenharLista();
  });
  raiz.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest<HTMLElement>("[data-novo],[data-editar],[data-excluir],[data-cancelar]");
    if (!a) return;
    if (a.dataset.novo !== undefined) abrir(null);
    else if (a.dataset.editar) abrir(a.dataset.editar);
    else if (a.dataset.cancelar !== undefined) voltar();
    else if (a.dataset.excluir) {
      const p = c.palestrantes.find((x) => x.slug === a.dataset.excluir)!;
      confirmarExclusao({
        titulo: "Excluir palestrante?", texto: `“${p.nome}” será removido(a). Se estiver vinculado(a) a atividades, a exclusão é recusada até que seja retirado(a) delas.`,
        acao: async () => { const novo = await excluirPalestrante(p.slug); voltar(novo); toast("Palestrante excluído."); },
      });
    }
  });
  raiz.addEventListener("submit", async (e) => {
    e.preventDefault();
    erros = {}; geral = "";
    if (!f.nome.trim()) erros.nome = "Informe o nome.";
    else if (f.lattes && !/^https?:\/\//.test(f.lattes)) erros.lattes = "Informe um endereço http:// ou https://.";
    if (Object.keys(erros).length) { geral = MSG_CORRIGIR; desenhar(); return; }
    try {
      const novo = editando ? await editarPalestrante(editando, f) : await criarPalestrante(f);
      voltar(novo);
      toast("Palestrante salvo. Já aparece na página Palestrantes.");
    } catch (err) {
      const r = erroDe(err);
      geral = r.mensagem; erros = r.campos;
      desenhar();
    }
  });
  desenhar();
}
