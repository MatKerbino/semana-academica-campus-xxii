/** Configuração de artigos: ativar/desativar submissão e edição (independentes), período, limite de tamanho e critérios. */
import { configuracaoAdmin, salvarConfiguracao, type ConfigAdmin } from "../../artigos/api";
import { CLASSES, erroCarregar } from "../componentes";
import { icone } from "../icones";
import { toast } from "../interacao";
import { caixaErro, campo, erroDe, ligar, secao, MSG_CORRIGIR, type Erros } from "../conteudo/form";

const paraLocal = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};
const paraIso = (v: string) => (v ? new Date(v).toISOString() : null);

const interruptor = (chave: string, rotulo: string, ajuda: string, ligado: boolean) =>
  `<label class="flex cursor-pointer items-start gap-3 rounded-campo border border-borda bg-palha p-4"><input type="checkbox" data-alternar="${chave}" ${ligado ? "checked" : ""} class="mt-1 size-5 shrink-0 accent-verde-medio" />
    <span><span class="block text-[15px] font-semibold text-chumbo">${rotulo}</span><span class="block text-[13px] leading-normal text-texto-suave">${ajuda}</span></span></label>`;

export async function montarConfiguracao(raiz: HTMLElement) {
  let c: ConfigAdmin;
  try {
    c = await configuracaoAdmin();
  } catch (e) {
    raiz.innerHTML = erroCarregar(e);
    return;
  }
  const f = {
    inicio: paraLocal(c.inicio),
    fim: paraLocal(c.fim),
    limiteMb: c.limiteMb ?? (c.limiteBytes ? Math.round((c.limiteBytes / 1048576) * 10) / 10 : null),
    criterios: c.criterios ?? [],
  };
  let erros: Erros = {};
  let geral = "";
  let avisoToggle = "";

  const desenhar = () => {
    raiz.innerHTML = secao(
      "Configuração de artigos",
      `<div class="grid gap-3 md:grid-cols-2">
        ${interruptor("submissaoAtiva", "Submissão de novos artigos", "Quando desativada, ninguém envia novos artigos. Não altera os já enviados.", !!c.submissaoAtiva)}
        ${interruptor("edicaoAtiva", "Edição de artigos enviados", "Independente da submissão. Mesmo ativa, só vale dentro do período.", !!c.edicaoAtiva)}</div>
      ${caixaErro(avisoToggle)}
      <form id="form-config" novalidate class="flex flex-col gap-4">
        <div class="grid gap-4 md:grid-cols-3">
          ${campo(f, "inicio", "Início do período", erros, { tipo: "datetime-local" })}${campo(f, "fim", "Fim do período", erros, { tipo: "datetime-local" })}
          ${campo(f, "limiteMb", "Tamanho máximo do PDF (MB)", erros, { tipo: "number", obrigatorio: true })}</div>
        ${campo(f, "criterios", "Critérios de avaliação", erros, { linhas: 6, lista: "linhas", ajuda: "Um critério por linha. O avaliador os vê ao avaliar." })}
        ${caixaErro(geral)}
        <div class="flex justify-end"><button type="submit" class="${CLASSES.botaoPrimario}">${icone("check")}Salvar configuração</button></div></form>`,
      "Período vazio significa sem restrição de data.",
    );
  };

  ligar(raiz, f, { aoEstrutura: () => {} });
  raiz.addEventListener("change", async (e) => {
    const el = e.target as HTMLInputElement;
    const chave = el.dataset.alternar;
    if (!chave) return;
    avisoToggle = "";
    try {
      await salvarConfiguracao({ [chave]: el.checked });
      (c as Record<string, unknown>)[chave] = el.checked;
      toast(`${chave === "submissaoAtiva" ? "Submissão" : "Edição"} ${el.checked ? "ativada" : "desativada"}.`);
    } catch (err) {
      avisoToggle = erroDe(err).mensagem;
      desenhar();
    }
  });
  raiz.addEventListener("submit", async (e) => {
    e.preventDefault();
    erros = {};
    geral = "";
    if (!f.limiteMb || f.limiteMb <= 0) erros.limiteMb = "Informe um tamanho maior que zero.";
    if (f.inicio && f.fim && f.fim < f.inicio) erros.fim = "O fim não pode ser anterior ao início.";
    if (Object.keys(erros).length) geral = MSG_CORRIGIR;
    else {
      try {
        await salvarConfiguracao({ inicio: paraIso(f.inicio), fim: paraIso(f.fim), limiteMb: f.limiteMb, criterios: f.criterios });
        toast("Configuração de artigos salva.");
      } catch (err) {
        const r = erroDe(err);
        geral = r.mensagem;
        erros = r.campos;
      }
    }
    desenhar();
  });
  desenhar();
}
