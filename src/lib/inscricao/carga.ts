import { api, ApiError, type Inscricao, type Pagamento, type Vagas } from "../api";
import { preencherDados } from "../dados-form";
import { formaParticipacao } from "../visao";
import { url } from "../url";
import { $ } from "./dom";
import type { Estado } from "./estado";
import { irPara } from "./etapas";

export const buscarVagas = () => api<{ atividades: Vagas }>("/atividades/vagas", { auth: false }).then((r) => r.atividades);

/** Obtém a inscrição em rascunho (cria se ainda não existir). */
const rascunho = () =>
  api<{ inscricao: Inscricao }>("/inscricao")
    .then((r) => r.inscricao)
    .catch(async (erro) => {
      if (erro instanceof ApiError && erro.status === 404) return (await api<{ inscricao: Inscricao }>("/inscricao", { metodo: "POST" })).inscricao;
      throw erro;
    });

function preencher(e: Estado) {
  preencherDados(e.form, e.insc.dados);
  (e.form.elements.namedItem("aceitePrivacidade") as HTMLInputElement).checked = e.insc.aceitePrivacidade;
  document.querySelectorAll("[data-forma]").forEach((el) => (el.innerHTML = formaParticipacao(e.pagamento)));
}

/** Carrega pagamento, vagas e rascunho e abre a etapa em que a pessoa parou. */
export async function carregar(e: Estado) {
  if (!e.sessao) return;
  document.querySelectorAll("[data-login]").forEach((el) => (el.textContent = e.sessao!.usuario.login));
  try {
    [e.pagamento, e.vagas] = await Promise.all([api<Pagamento>("/pagamento", { auth: false }), buscarVagas()]);
    e.insc = await rascunho();
    if (e.insc.status !== "rascunho") return void (location.href = url("/minha-inscricao"));
    preencher(e);
    const d = e.insc.dados;
    const completos = d.nome && d.cpf && d.email && d.telefone && d.dataNascimento && d.perfil && e.insc.aceitePrivacidade;
    irPara(e, !completos ? 1 : e.insc.atividades.length ? 3 : 2);
    $("#conteudo").hidden = false;
  } catch (erro) {
    const caixa = $("#erro-carga");
    caixa.textContent = erro instanceof Error ? erro.message : "Não foi possível carregar a inscrição.";
    caixa.hidden = false;
  }
}

