/** Editor da página de informações do evento: título, descrição e seções com itens (rótulo, detalhe, link). */
import { obterConteudo, type Informacoes } from "../../conteudo";
import { acoesItem, botaoAdicionar, caixaItem as caixa, campo, secao, type Erros } from "./form";
import { AJUDA_MARCADORES } from "./quadros";
import { montarEditor } from "./editor";

export async function iniciarInformacoes(raiz: HTMLElement) {
  const c = await obterConteudo();
  const estado: Informacoes = structuredClone(c.informacoes);
  const modelos = {
    secao: () => ({ titulo: "", texto: "", itens: [] }),
    item: () => ({ rotulo: "", detalhe: "", url: "" }),
  };

  const desenhar = (e: Informacoes, erros: Erros) => [
    secao("Cabeçalho da página", campo(e, "titulo", "Título", erros, { obrigatorio: true }) + campo(e, "descricao", "Descrição", erros, { linhas: 2, ajuda: AJUDA_MARCADORES })),
    secao("Seções", e.secoes.map((s, si) => caixa(
      campo(e, `secoes.${si}.titulo`, "Título da seção", erros, { obrigatorio: true }) + campo(e, `secoes.${si}.texto`, "Texto (opcional)", erros, { linhas: 2 }) +
      `<div class="flex flex-col gap-3 border-l-2 border-borda pl-4"><p class="text-sm font-semibold text-chumbo">Itens (datas, links de edital, templates…)</p>${s.itens.map((it, ii) => caixa(
        campo(e, `secoes.${si}.itens.${ii}.rotulo`, "Rótulo", erros, { obrigatorio: true }) + campo(e, `secoes.${si}.itens.${ii}.detalhe`, "Detalhe / data", erros, { ajuda: "Ex.: 23/09/2025 a 08/10/2025" }) + campo(e, `secoes.${si}.itens.${ii}.url`, "Link (opcional)", erros, { tipo: "url", placeholder: "https://…" }),
        acoesItem(`secoes.${si}.itens.${ii}`, ii, s.itens.length))).join("")}${botaoAdicionar(`secoes.${si}.itens`, "item", "Adicionar item")}</div>`,
      acoesItem(`secoes.${si}`, si, e.secoes.length))).join("") + botaoAdicionar("secoes", "secao", "Adicionar seção"),
    "Máximo de 12 seções e 30 itens por seção."),
  ].join("");

  montarEditor<Informacoes>({
    raiz, parte: "informacoes", estado, desenhar, modelos,
    mensagem: "Informações salvas. A página de informações já foi atualizada.",
    aoRestaurar: (novo) => Object.assign(estado, structuredClone(novo.informacoes)),
    validar: (e) => {
      const r: Erros = {};
      if (!e.titulo.trim()) r.titulo = "Informe o título.";
      e.secoes.forEach((s, si) => {
        if (!s.titulo.trim()) r[`secoes.${si}.titulo`] = "Informe o título da seção.";
        s.itens.forEach((it, ii) => { if (!it.rotulo.trim()) r[`secoes.${si}.itens.${ii}.rotulo`] = "Informe o rótulo."; });
      });
      return r;
    },
  });
}
