/** Formulário de artigo (submissão e edição): campos, validação local e envio do PDF direto ao armazenamento. */
import { ApiError, erroCampos, esc, limparErro, mostrarErro } from "../api";
import { criarArtigo, editarArtigo, megabytes, solicitarUpload, type Artigo, type ConfigArtigos } from "./api";

const CAMPO = "w-full rounded-campo border-[1.5px] border-borda bg-white px-3.5 text-[15px] text-chumbo outline-none focus:border-azul aria-[invalid=true]:border-2 aria-[invalid=true]:border-erro";
export const BOTAO = "flex cursor-pointer items-center justify-center gap-2 rounded-full bg-verde-cta px-[22px] py-3 text-[15px] leading-[1.3] font-bold text-verde-noite hover:brightness-95 disabled:opacity-60";
export const BOTAO_CONTORNO = "flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-verde-escuro bg-white px-[22px] py-2.5 text-[15px] leading-[1.3] font-bold text-verde-escuro hover:bg-palha disabled:opacity-60";

const entrada = (nome: string, rotulo: string, valor: string, o: { linhas?: number; ajuda?: string; maxlength: number }) => {
  const id = `artigo-${nome}`;
  const attrs = `id="${id}" name="${nome}" maxlength="${o.maxlength}" aria-describedby="${id}-erro${o.ajuda ? ` ${id}-ajuda` : ""}"`;
  return `<div class="flex flex-col gap-1.5"><label for="${id}" class="text-sm leading-[1.4] font-semibold text-chumbo">${rotulo}</label>
    ${o.linhas ? `<textarea ${attrs} rows="${o.linhas}" class="${CAMPO} py-2.5">${esc(valor)}</textarea>` : `<input ${attrs} type="text" value="${esc(valor)}" class="${CAMPO} h-12" />`}
    ${o.ajuda ? `<p id="${id}-ajuda" class="text-[13px] leading-normal text-texto-suave">${esc(o.ajuda)}</p>` : ""}
    <p id="${id}-erro" data-erro="${nome}" class="text-[13px] leading-normal text-erro empty:hidden"></p></div>`;
};

export const caixaGeral = (titulo: string) =>
  `<div role="alert" data-erro-geral hidden class="rounded-campo border border-erro-borda bg-erro-fundo p-4"><p class="text-sm font-semibold text-erro">${esc(titulo)}</p><p data-erro-texto class="text-[15px] text-chumbo"></p></div>`;

const ehPdf = (f: File) => f.type === "application/pdf" || /\.pdf$/i.test(f.name);

/** Desenha o formulário em `raiz`. Na edição o arquivo é opcional (mantém o atual). */
export function montarEditor(raiz: HTMLElement, o: { config: ConfigArtigos; artigo?: Artigo; aoSalvar: (a: Artigo) => void; aoCancelar?: () => void }) {
  const { config, artigo } = o;
  const limite = megabytes(config.limiteBytes);
  raiz.innerHTML = `<form novalidate class="flex flex-col gap-4">
    ${caixaGeral("Não foi possível salvar o artigo")}
    ${entrada("titulo", "Título *", artigo?.titulo ?? "", { maxlength: 250 })}
    <div class="flex flex-col gap-1.5"><label for="artigo-arquivo" class="text-sm leading-[1.4] font-semibold text-chumbo">Arquivo do artigo (PDF)${artigo ? "" : " *"}</label>
      <input id="artigo-arquivo" name="arquivo" type="file" accept="application/pdf,.pdf" aria-describedby="artigo-arquivo-ajuda artigo-arquivo-erro" class="text-[15px] text-chumbo file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-verde-claro file:px-4 file:py-2 file:text-sm file:font-bold file:text-verde-escuro" />
      <p id="artigo-arquivo-ajuda" class="text-[13px] leading-normal text-texto-suave">Tamanho máximo: ${limite}.${artigo?.arquivo ? ` Arquivo atual: ${esc(artigo.arquivo.nome)}. Envie outro só se quiser substituí-lo.` : ""}</p>
      <p id="artigo-arquivo-erro" data-erro="arquivo" class="text-[13px] leading-normal text-erro empty:hidden"></p></div>
    <div class="flex flex-wrap justify-end gap-3">${o.aoCancelar ? `<button type="button" data-cancelar class="${BOTAO_CONTORNO}">Cancelar</button>` : ""}<button type="submit" class="${BOTAO}">${artigo ? "Salvar alterações" : "Enviar artigo"}</button></div></form>`;

  const form = raiz.querySelector("form")!;
  raiz.querySelector("[data-cancelar]")?.addEventListener("click", () => o.aoCancelar!());
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    limparErro(form);
    const d = Object.fromEntries(new FormData(form)) as Record<string, string | File>;
    const arquivo = d.arquivo as File;
    const temArquivo = arquivo.size > 0;
    const campos: Record<string, string> = {};
    if (!String(d.titulo).trim()) campos.titulo = "Informe o título.";
    if (!temArquivo && !artigo) campos.arquivo = "Selecione o arquivo em PDF.";
    else if (temArquivo && !ehPdf(arquivo)) campos.arquivo = "O arquivo precisa estar em PDF.";
    else if (temArquivo && arquivo.size > config.limiteBytes) campos.arquivo = `O arquivo tem ${megabytes(arquivo.size)}; o máximo é ${limite}.`;
    if (Object.keys(campos).length) return mostrarErro(form, erroCampos(campos));

    const botao = form.querySelector<HTMLButtonElement>("button[type=submit]")!;
    botao.disabled = true;
    botao.textContent = temArquivo ? "Enviando arquivo…" : "Salvando…";
    try {
      const corpo = {
        titulo: String(d.titulo).trim(),
        ...(temArquivo && { arquivo: await enviarArquivo(arquivo) }),
      };
      o.aoSalvar(artigo ? await editarArtigo(artigo.id, corpo) : await criarArtigo(corpo));
    } catch (err) {
      mostrarErro(form, err);
      botao.disabled = false;
      botao.textContent = artigo ? "Salvar alterações" : "Enviar artigo";
    }
  });
}

async function enviarArquivo(arquivo: File) {
  const { chave, url, headers } = await solicitarUpload(arquivo);
  let r: Response;
  try {
    r = await fetch(url, { method: "PUT", headers: headers ?? { "Content-Type": "application/pdf" }, body: arquivo });
  } catch {
    throw new ApiError("Não foi possível enviar o arquivo. Verifique sua conexão e tente novamente.", 0);
  }
  if (!r.ok) throw new ApiError("O armazenamento recusou o arquivo. Tente novamente em instantes.", r.status);
  return { chave, nome: arquivo.name, tamanho: arquivo.size };
}
