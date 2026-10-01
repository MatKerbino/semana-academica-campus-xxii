import { api, erroCampos, limparErro, mostrarErro, type Inscricao } from "../api";
import { lerDados, validarDados } from "../dados-form";
import { montarSeletor } from "../seletor";
import { passos } from "../visao";
import { $ } from "./dom";
import type { Estado, Etapa } from "./estado";
import { desenharRevisao } from "./revisao";

const MENSAGEM_CAMPOS = "Preencha os campos obrigatórios, selecione um perfil e aceite a Política de Privacidade para continuar.";
const telaDe = (n: Etapa) => $(`#etapa-${n}`);

const aceite = (e: Estado) => (e.form.elements.namedItem("aceitePrivacidade") as HTMLInputElement).checked;

export const dadosDoForm = (e: Estado) => ({ dados: lerDados(e.form), aceitePrivacidade: aceite(e) });

function validarEtapa1(e: Estado) {
  const { dados, aceitePrivacidade } = dadosDoForm(e);
  const campos = validarDados(dados);
  if (!aceitePrivacidade) campos.aceitePrivacidade = "O aceite da Política de Privacidade é obrigatório para concluir a inscrição.";
  return campos;
}

/** Grava a inscrição (rascunho) na API e guarda a resposta no estado. */
export async function salvar(e: Estado, corpo: object) {
  e.insc = (await api<{ inscricao: Inscricao }>("/inscricao", { metodo: "PUT", corpo })).inscricao;
}

function desenharSeletor(e: Estado) {
  limparErro($("#etapa-2"));
  e.seletor = montarSeletor({ raiz: $("#seletor"), catalogo: e.catalogo, vagas: e.vagas, selecionadas: e.insc.atividades.filter((s) => e.porSlug.has(s)), salvas: [] });
}

export function irPara(e: Estado, n: Etapa) {
  e.etapa = n;
  ([1, 2, 3] as const).forEach((i) => (telaDe(i).hidden = i !== n));
  $("#confirmada").hidden = true;
  $("#cabecalho").hidden = false;
  $("#passos").innerHTML = passos(n);
  // Aviso só enquanto a etapa 1 ainda não foi salva (aceite da política ainda não registrado).
  $("#aviso-perfil").hidden = !(n === 1 && e.insc.dadosDoPerfil && !e.insc.aceitePrivacidade);
  if (n === 2) desenharSeletor(e);
  if (n === 3) desenharRevisao(e);
  scrollTo({ top: 0 });
}

/** Valida/salva a etapa atual e navega para `destino`. */
export async function avancar(e: Estado, destino: Etapa) {
  limparErro(e.form);
  try {
    if (e.etapa === 1 && destino > 1) {
      const campos = validarEtapa1(e);
      if (Object.keys(campos).length) {
        mostrarErro(e.form, erroCampos(campos, MENSAGEM_CAMPOS));
        $("#etapa-1 [data-erro-geral]").scrollIntoView({ block: "center" });
        return;
      }
      await salvar(e, dadosDoForm(e));
    }
    if (e.etapa === 2) await salvar(e, { atividades: e.seletor!.obter() });
    irPara(e, destino);
  } catch (erro) {
    mostrarErro(e.etapa === 1 ? e.form : $("#etapa-2"), erro);
  }
}

/** Liga os botões de navegação ([data-ir]) e o envio do formulário da etapa 1. */
export function ligarNavegacao(e: Estado) {
  document.addEventListener("click", (ev) => {
    const alvo = (ev.target as HTMLElement).closest<HTMLElement>("[data-ir]");
    if (alvo) void avancar(e, Number(alvo.dataset.ir) as Etapa);
  });
  e.form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    void avancar(e, 2);
  });
}
