/** Editor dos quadros de informação: cartões e passos da página inicial e grupos de apoio (Patrocinadores). */
import { obterConteudo, type Quadros } from "../../conteudo";
import { acoesItem, botaoAdicionar, caixaItem as item, campo, secao, seletorIcone, type Erros } from "./form";
import { montarEditor } from "./editor";

export const AJUDA_MARCADORES = "Marcadores trocados no site: {{nome}}, {{periodo}}, {{local}}, {{forma}} (forma de participação), {{email}}, {{ano}}, {{lema}}, {{organizacao}}.";

export async function iniciarQuadros(raiz: HTMLElement) {
  const c = await obterConteudo();
  const estado: Quadros = structuredClone(c.quadros);
  const modelos = {
    sobre: () => ({ icone: "star", titulo: "", texto: "" }),
    passo: () => ({ titulo: "", texto: "" }),
    grupo: () => ({ id: `grupo-${Date.now().toString(36)}`, rotulo: "", itens: [] }),
    apoio: () => ({ nome: "", detalhe: "", url: "" }),
  };

  const desenhar = (q: Quadros, erros: Erros) => [
    secao("Página inicial · aba “Sobre o evento”", q.inicioSobre.map((s, i) => item(
      seletorIcone(`inicioSobre.${i}.icone`, s.icone, "Ícone do quadro") + campo(q, `inicioSobre.${i}.titulo`, "Título", erros) + campo(q, `inicioSobre.${i}.texto`, "Texto", erros, { linhas: 3 }),
      acoesItem(`inicioSobre.${i}`, i, q.inicioSobre.length))).join("") + botaoAdicionar("inicioSobre", "sobre", "Adicionar quadro"),
    `Máximo de 6 quadros. O quadro escuro do tema (lema do evento) é fixo. ${AJUDA_MARCADORES}`),
    secao("Página inicial · aba “Como se inscrever”", q.inicioPassos.map((p, i) => item(
      campo(q, `inicioPassos.${i}.titulo`, `Passo ${i + 1} · título`, erros) + campo(q, `inicioPassos.${i}.texto`, "Texto", erros, { linhas: 3 }),
      acoesItem(`inicioPassos.${i}`, i, q.inicioPassos.length))).join("") + botaoAdicionar("inicioPassos", "passo", "Adicionar passo"), AJUDA_MARCADORES),
    secao("Realização e apoio (página Patrocinadores)", q.apoio.map((g, gi) => item(
      campo(q, `apoio.${gi}.rotulo`, "Nome do grupo (aba)", erros) +
      `<div class="flex flex-col gap-3 border-l-2 border-borda pl-4">${g.itens.map((it, ii) => item(
        campo(q, `apoio.${gi}.itens.${ii}.nome`, "Nome", erros) + campo(q, `apoio.${gi}.itens.${ii}.detalhe`, "Detalhe", erros) + campo(q, `apoio.${gi}.itens.${ii}.url`, "Link do site", erros, { tipo: "url", placeholder: "https://…" }),
        acoesItem(`apoio.${gi}.itens.${ii}`, ii, g.itens.length))).join("")}${botaoAdicionar(`apoio.${gi}.itens`, "apoio", "Adicionar entidade")}</div>`,
      acoesItem(`apoio.${gi}`, gi, q.apoio.length))).join("") + botaoAdicionar("apoio", "grupo", "Adicionar grupo")),
  ].join("");

  montarEditor<Quadros>({
    raiz, parte: "quadros", estado, desenhar, modelos,
    mensagem: "Quadros salvos. As mudanças já aparecem no site.",
    aoRestaurar: (novo) => Object.assign(estado, structuredClone(novo.quadros)),
    validar: (q) => {
      const e: Erros = {};
      q.inicioSobre.forEach((s, i) => { if (!s.titulo.trim()) e[`inicioSobre.${i}.titulo`] = "Informe o título."; });
      q.inicioPassos.forEach((p, i) => { if (!p.titulo.trim()) e[`inicioPassos.${i}.titulo`] = "Informe o título."; });
      q.apoio.forEach((g, gi) => {
        if (!g.rotulo.trim()) e[`apoio.${gi}.rotulo`] = "Informe o nome do grupo.";
        g.itens.forEach((it, ii) => { if (!it.nome.trim()) e[`apoio.${gi}.itens.${ii}.nome`] = "Informe o nome."; });
      });
      return e;
    },
  });
}
