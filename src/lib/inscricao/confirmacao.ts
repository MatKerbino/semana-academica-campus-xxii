import { api, ApiError, mostrarErro, type Inscricao } from "../api";
import { separarDescricao } from "../visao";
import { caixaErro } from "./alertas";
import { $ } from "./dom";
import { buscarVagas } from "./carga";
import type { Estado } from "./estado";
import { irPara } from "./etapas";
import { dataComAs, desenharRevisao } from "./revisao";

const moeda = (n?: number | null) => n?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function textoProximoPasso(e: Estado) {
  const p = e.insc.pagamento;
  const { destaque, detalhe } = separarDescricao(p?.descricao ?? null);
  return p?.modalidade === "monetaria"
    ? `Sua forma de participação é o pagamento de ${moeda(p.valor)} por participante. ${p.descricao ?? ""} A organização atualizará a situação na sua área.`
    : `${destaque.replace(/\.$/, "")}. ${detalhe} A organização atualizará a situação na sua área.`.replace(/\s+/g, " ");
}

function mostrarConfirmada(e: Estado) {
  ([1, 2, 3] as const).forEach((i) => ($(`#etapa-${i}`).hidden = true));
  $("#cabecalho").hidden = true;
  $("#confirmada").hidden = false;
  $("#confirmada-texto").textContent = `Inscrição nº ${e.insc.numero ?? "—"} registrada em ${dataComAs(e.insc.confirmadaEm)} e vinculada à conta ${e.sessao!.usuario.login}.`;
  $("#confirmada-email").textContent = `Solicitamos o envio de um link de verificação para ${e.insc.dados.email}. Se não chegar em alguns minutos, use Reenviar.`;
  $("#confirmada-proximo").textContent = textoProximoPasso(e);
  scrollTo({ top: 0 });
}

/** Trata a falha da confirmação: atividade lotada, dados incompletos ou erro genérico. */
async function tratarFalha(e: Estado, erro: unknown) {
  e.vagas = await buscarVagas().catch(() => e.vagas);
  e.indisponiveis = e.insc.atividades.filter((s) => e.vagas[s] && !e.vagas[s].disponivel);
  if (erro instanceof ApiError && erro.status === 400 && Object.keys(erro.campos).some((c) => c !== "atividades")) {
    // dados incompletos: volta para a etapa 1 com os erros da API
    irPara(e, 1);
    mostrarErro(e.form, erro);
  } else if (e.indisponiveis.length) {
    desenharRevisao(e);
  } else {
    $("#alerta-revisao").innerHTML = caixaErro("Não foi possível confirmar a inscrição", erro instanceof Error ? erro.message : "Tente novamente.");
  }
}

/** Liga o botão "Confirmar inscrição" e o reenvio do e-mail de verificação. */
export function ligarConfirmacao(e: Estado) {
  $("#confirmar").addEventListener("click", async () => {
    if (e.indisponiveis.length) return irPara(e, 2);
    const botao = $<HTMLButtonElement>("#confirmar");
    botao.disabled = true;
    try {
      e.insc = (await api<{ inscricao: Inscricao }>("/inscricao/confirmar", { metodo: "POST" })).inscricao;
      mostrarConfirmada(e);
    } catch (erro) {
      await tratarFalha(e, erro);
    } finally {
      botao.disabled = false;
    }
  });

  $("#reenviar").addEventListener("click", async () => {
    const status = $("#reenvio-status");
    try {
      await api("/inscricao/reenviar-verificacao", { metodo: "POST" });
      status.textContent = "Solicitamos o reenvio do e-mail de verificação.";
    } catch (erro) {
      status.textContent = erro instanceof Error ? erro.message : "Não foi possível reenviar.";
    }
    status.hidden = false;
  });
}
