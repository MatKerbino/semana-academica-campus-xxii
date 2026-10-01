import { blocoNovaInscricao, ligarNovaInscricao } from "../nova-inscricao";
import { url } from "../url";
import { btnContorno } from "../visao";
import { $ } from "./dom";
import type { Estado } from "./estado";

let ligado = false;

/** Inscrição atual cancelada: em vez de redirecionar, oferece fazer uma nova (o fluxo normal recarrega em rascunho). */
export function mostrarNovaInscricao(e: Estado, recarregar: () => Promise<void>) {
  const painel = $("#nova-inscricao");
  painel.innerHTML = `<h2 class="text-[18px] leading-[1.4] font-semibold text-verde-escuro">Sua inscrição anterior foi cancelada. Deseja fazer uma nova inscrição?</h2>
    <p class="mt-2 text-[15px] leading-normal text-chumbo">Seus dados salvos na conta preenchem a nova inscrição, e a inscrição cancelada continua no seu histórico.</p>
    <div class="mt-5 flex flex-wrap items-start gap-3">${blocoNovaInscricao(e.insc, "")}<a href="${url("/minha-inscricao")}" class="${btnContorno}">Voltar para Minha inscrição</a></div>`;
  if (!ligado) {
    ligado = true;
    ligarNovaInscricao(painel, async () => {
      painel.hidden = true;
      await recarregar();
    });
  }
  painel.hidden = false;
}
