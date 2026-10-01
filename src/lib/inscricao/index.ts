import { exigirLogin } from "../api";
import { ativarMascaras, prepararEmail } from "../dados-form";
import { ico } from "../visao";
import { carregar } from "./carga";
import { ligarConfirmacao } from "./confirmacao";
import { criarEstado } from "./estado";
import { ligarNavegacao } from "./etapas";
import { ligarPolitica } from "./politica";
import { ligarSalvarDepois } from "./salvar-depois";

/** Ponto de entrada da página de inscrição: monta o estado, liga os comportamentos e carrega o rascunho. */
export function iniciarInscricao() {
  const estado = criarEstado(exigirLogin());

  document.querySelectorAll("[data-ico]").forEach((el) => {
    el.innerHTML = ico((el as HTMLElement).dataset.ico!, el.hasAttribute("data-grande") ? "size-9" : "size-[18px]");
  });
  ativarMascaras(estado.form);
  prepararEmail(estado.form);

  ligarNavegacao(estado);
  ligarConfirmacao(estado);
  ligarSalvarDepois(estado);
  ligarPolitica();
  void carregar(estado);
}
