/** Formulário de atividade (nome, tipo, sessões, local, responsáveis, vagas, descrição e tópicos). */
import opcoes from "../../../data/opcoes.json";
import { esc } from "../../api";
import { diasDoEvento, type Atividade, type Conteudo } from "../../conteudo";
import { CLASSES } from "../componentes";
import { botoesForm } from "./crud";
import { acoesItem, botaoAdicionar, caixaErro, campo, selecao, type Erros } from "./form";

export const atividadeVazia = (c: Conteudo): Atividade => ({
  slug: "", titulo: "", tipo: "palestra", sessoes: [{ data: c.evento.dataInicio, inicio: "08:00", fim: "09:00" }],
  local: "", responsaveis: [], responsavelTexto: "", vagas: null, cargaHoraria: "", descricao: [], topicos: [],
});

export const novaSessao = (c: Conteudo) => ({ data: c.evento.dataInicio, inicio: "08:00", fim: "09:00" });

export function validarAtividade(a: Atividade, c: Conteudo): Erros {
  const e: Erros = {};
  if (!a.titulo.trim()) e.titulo = "Informe o nome da atividade.";
  const dias = new Set(diasDoEvento(c.evento).map((d) => d.id));
  a.sessoes.forEach((s, i) => {
    if (!s.data || !dias.has(s.data)) e[`sessoes.${i}.data`] = "Escolha um dia do evento.";
    if (!s.inicio) e[`sessoes.${i}.inicio`] = "Informe o início.";
    if (!s.fim) e[`sessoes.${i}.fim`] = "Informe o fim.";
    else if (s.inicio && s.fim <= s.inicio) e[`sessoes.${i}.fim`] = "O fim deve ser depois do início.";
  });
  if (a.vagas != null && (!Number.isInteger(a.vagas) || a.vagas < 1)) e.vagas = "Use um número inteiro maior que zero ou deixe em branco.";
  return e;
}

export function desenharFormulario(a: Atividade, c: Conteudo, erros: Erros, geral: string, novo: boolean) {
  const dias = diasDoEvento(c.evento);
  const opDias = (atual: string): [string, string][] => {
    const l: [string, string][] = dias.map((d) => [d.id, d.data]);
    if (atual && !dias.some((d) => d.id === atual)) l.unshift([atual, `${atual} (fora do período)`]);
    return l;
  };
  const sessoes = a.sessoes.map((s, i) => `<div class="flex flex-col gap-3 rounded-campo border border-borda bg-palha p-4"><div class="grid gap-3 sm:grid-cols-3">
      ${selecao(a, `sessoes.${i}.data`, "Dia", opDias(s.data), erros)}${campo(a, `sessoes.${i}.inicio`, "Início", erros, { tipo: "time" })}${campo(a, `sessoes.${i}.fim`, "Fim", erros, { tipo: "time" })}</div>
      ${a.sessoes.length > 1 ? `<div class="flex justify-end">${acoesItem(`sessoes.${i}`, i, a.sessoes.length)}</div>` : ""}</div>`).join("");
  const pessoas = c.palestrantes.map((p) => `<label class="flex cursor-pointer items-start gap-2 text-[14px] text-chumbo"><input type="checkbox" name="responsaveis" data-multi value="${esc(p.slug)}" ${a.responsaveis.includes(p.slug) ? "checked" : ""} class="mt-0.5 size-4 cursor-pointer accent-verde-medio" /><span>${esc(p.nome)}</span></label>`).join("");
  return `<form id="form" novalidate class="${CLASSES.cartao} flex flex-col gap-4">
    ${campo(a, "titulo", "Nome da atividade", erros, { obrigatorio: true })}
    ${selecao(a, "tipo", "Tipo de atividade", opcoes.tipos.map((t) => [t.id, t.rotulo] as [string, string]), erros)}
    <fieldset class="flex flex-col gap-3"><legend class="text-sm font-semibold text-chumbo">Data e horário</legend>${sessoes}${botaoAdicionar("sessoes", "sessao", "Adicionar outra sessão")}
      <p class="text-[13px] text-texto-suave">Só dias entre o primeiro e o último dia do evento. O cronograma é montado a partir destas sessões.</p></fieldset>
    ${campo(a, "local", "Local", erros, { placeholder: "Ex.: Sala 5" })}
    <fieldset class="flex flex-col gap-2"><legend class="text-sm font-semibold text-chumbo">Responsável (palestrantes / ministrantes)</legend>
      <div class="grid max-h-56 gap-1.5 overflow-y-auto rounded-campo border-[1.5px] border-borda bg-white p-3 sm:grid-cols-2">${pessoas || `<p class="text-sm text-texto-suave">Nenhum palestrante cadastrado.</p>`}</div></fieldset>
    ${campo(a, "responsavelTexto", "Outro responsável (texto livre)", erros, { ajuda: "Para quem não é palestrante cadastrado. Ex.: Bolsistas do DAE." })}
    <div class="grid gap-4 sm:grid-cols-2">${campo(a, "vagas", "Vagas", erros, { tipo: "number", ajuda: "Em branco = sem limite. Vale para atividades selecionáveis na inscrição." })}${campo(a, "cargaHoraria", "Carga horária", erros, { placeholder: "Ex.: 4 horas" })}</div>
    ${campo(a, "descricao", "Descrição (parágrafos separados por linha em branco)", erros, { linhas: 6, lista: "paragrafos" })}
    ${campo(a, "topicos", "Tópicos (um por linha)", erros, { linhas: 4, lista: "linhas" })}
    ${caixaErro(geral)}${botoesForm(novo ? "Criar atividade" : "Salvar atividade")}</form>`;
}
