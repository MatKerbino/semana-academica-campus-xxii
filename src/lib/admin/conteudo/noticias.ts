/** Notícias: lista, busca e formulário (título, resumo, texto em parágrafos, data, imagem, link). */
import { esc } from "../../api";
import { obterConteudo, type Conteudo, type Noticia } from "../../conteudo";
import { CLASSES, cabecalhoPagina, normalizar } from "../componentes";
import { criarNoticia, editarNoticia, excluirNoticia } from "../conteudo-api";
import { icone } from "../icones";
import { toast } from "../interacao";
import { barraBusca, botaoLinha, botaoLinhaPerigo, botoesForm, confirmarExclusao } from "./crud";
import { caixaErro, campo, erroDe, ligar, MSG_CORRIGIR, type Erros } from "./form";
import { botaoRestaurar, ligarRestauracao } from "./restaurar";

const hoje = () => new Date().toLocaleDateString("sv"); // AAAA-MM-DD no fuso local
const VAZIO = (): Noticia => ({ slug: "", titulo: "", resumo: "", corpo: [], data: hoje(), imagem: "", imagemAlt: "", link: "" });
const dataBR = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`;
const http = (v: string) => /^https?:\/\//.test(v);

export async function iniciarNoticias(raiz: HTMLElement) {
  let c: Conteudo = await obterConteudo();
  let busca = "";
  let editando: string | null | undefined; // undefined = lista; null = nova; string = slug
  let erros: Erros = {};
  let geral = "";
  const f: Noticia = VAZIO();

  const linha = (n: Noticia) =>
    `<article class="${CLASSES.cartao} flex flex-wrap items-start justify-between gap-3 !p-4">
      <div class="min-w-0 flex-1"><p class="text-base font-semibold text-verde-escuro">${esc(n.titulo)}</p>
        <p class="text-[13px] text-chumbo">${esc(n.resumo)}</p><p class="mt-1 text-[13px] text-texto-suave">${dataBR(n.data)}${n.imagem ? " · com imagem" : ""}</p></div>
      <div class="flex gap-2"><button type="button" data-editar="${esc(n.slug)}" class="${botaoLinha}">${icone("pencil", "size-4")}Editar</button>
        <button type="button" data-excluir="${esc(n.slug)}" class="${botaoLinhaPerigo}">${icone("trash", "size-4")}Excluir</button></div></article>`;
  const filtradas = () =>
    c.noticias.filter((n) => !busca || normalizar(`${n.titulo} ${n.resumo}`).includes(normalizar(busca))).sort((a, b) => b.data.localeCompare(a.data));
  const desenharLista = () => {
    const itens = filtradas();
    raiz.querySelector("#lista")!.innerHTML = itens.length ? itens.map(linha).join("") : `<p class="text-sm text-texto-suave">Nenhuma notícia encontrada.</p>`;
  };
  const desenhar = () => {
    if (editando === undefined) {
      raiz.innerHTML = `${cabecalhoPagina("Notícias", "Aparecem na página Notícias e as três mais recentes na página inicial.")}
        <div class="flex flex-wrap items-center gap-3">${barraBusca(busca, "Buscar por título ou resumo", "sm:w-80")}<span class="flex-1"></span>
          ${botaoRestaurar("noticias")}<button type="button" data-novo class="${CLASSES.botaoPrimario}">${icone("plus")}Nova notícia</button></div>
        <div id="lista" class="grid gap-3 lg:grid-cols-2"></div>`;
      desenharLista();
      return;
    }
    raiz.innerHTML = `${cabecalhoPagina(editando === null ? "Nova notícia" : "Editar notícia")}
      <form id="form" novalidate class="${CLASSES.cartao} flex flex-col gap-4">
        ${campo(f, "titulo", "Título", erros, { obrigatorio: true })}${campo(f, "data", "Data de publicação", erros, { tipo: "date", obrigatorio: true })}
        ${campo(f, "resumo", "Resumo (aparece nas listas)", erros, { linhas: 3, obrigatorio: true })}
        ${campo(f, "corpo", "Texto", erros, { linhas: 10, lista: "paragrafos", obrigatorio: true, ajuda: "Separe os parágrafos com uma linha em branco." })}
        ${campo(f, "imagem", "Imagem (endereço)", erros, { tipo: "url", placeholder: "https://…" })}
        ${campo(f, "imagemAlt", "Texto alternativo da imagem", erros, { ajuda: "Obrigatório quando há imagem: descreve a imagem para quem não a enxerga." })}
        ${campo(f, "link", "Link para saber mais (opcional)", erros, { tipo: "url", placeholder: "https://…" })}
        ${caixaErro(geral)}${botoesForm("Salvar notícia")}</form>`;
    raiz.querySelector<HTMLElement>("input")?.focus();
  };
  const abrir = (slug: string | null) => {
    editando = slug; erros = {}; geral = "";
    Object.assign(f, VAZIO(), slug ? c.noticias.find((n) => n.slug === slug) : {});
    desenhar();
  };
  const voltar = (novo?: Conteudo) => { if (novo) c = novo; editando = undefined; desenhar(); };
  const validar = () => {
    if (!f.titulo.trim()) erros.titulo = "Informe o título.";
    if (!f.resumo.trim()) erros.resumo = "Informe o resumo.";
    if (!f.corpo.length) erros.corpo = "Escreva o texto da notícia.";
    if (!f.data) erros.data = "Informe a data.";
    if (f.imagem && !http(f.imagem)) erros.imagem = "Informe um endereço http:// ou https://.";
    if (f.imagem && !f.imagemAlt.trim()) erros.imagemAlt = "Descreva a imagem.";
    if (f.link && !http(f.link)) erros.link = "Informe um endereço http:// ou https://.";
  };

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
      const n = c.noticias.find((x) => x.slug === a.dataset.excluir)!;
      confirmarExclusao({
        titulo: "Excluir notícia?", texto: `“${n.titulo}” será removida do site.`,
        acao: async () => { const novo = await excluirNoticia(n.slug); voltar(novo); toast("Notícia excluída."); },
      });
    }
  });
  raiz.addEventListener("submit", async (e) => {
    e.preventDefault();
    erros = {}; geral = "";
    validar();
    if (Object.keys(erros).length) { geral = MSG_CORRIGIR; desenhar(); return; }
    try {
      const novo = editando ? await editarNoticia(editando, f) : await criarNoticia(f);
      voltar(novo);
      toast("Notícia salva. Já aparece na página Notícias.");
    } catch (err) {
      const r = erroDe(err);
      geral = r.mensagem; erros = r.campos;
      desenhar();
    }
  });
  desenhar();
}
