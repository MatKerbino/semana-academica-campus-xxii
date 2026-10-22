import { exigirLogin } from "../api";
import { ativarMascaras, prepararEmail } from "../dados-form";
import { catalogoSelecionavel, obterConteudo, texto } from "../conteudo";
import { ico, usarConteudo } from "../visao";
import { carregar } from "./carga";
import { ligarConfirmacao } from "./confirmacao";
import { criarEstado } from "./estado";
import { ligarNavegacao } from "./etapas";
import { ligarPolitica } from "./politica";
import { ligarSalvarDepois } from "./salvar-depois";

/** Ponto de entrada da página de inscrição: monta o estado, liga os comportamentos e carrega o rascunho. */
export async function iniciarInscricao() {
  const sessao = exigirLogin();
  const conteudo = await obterConteudo();
  usarConteudo(conteudo);
  const h1 = document.querySelector("#cabecalho h1");
  if (h1) h1.textContent = texto(conteudo, "Inscrição na {{nome}}");
  const estado = criarEstado(sessao, catalogoSelecionavel(conteudo));

  document.querySelectorAll("[data-ico]").forEach((el) => {
    el.innerHTML = ico((el as HTMLElement).dataset.ico!, el.hasAttribute("data-grande") ? "size-9" : "size-[18px]");
  });
  ativarMascaras(estado.form);
  prepararEmail(estado.form);

  ligarNavegacao(estado);
  ligarConfirmacao(estado);
  ligarSalvarDepois(estado);
  ligarPolitica(conteudo.evento.links.politicaPrivacidade);
  void carregar(estado);
}
