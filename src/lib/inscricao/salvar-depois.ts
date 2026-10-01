import { mostrarErro } from "../api";
import { url } from "../url";
import { $ } from "./dom";
import type { Estado } from "./estado";
import { dadosDoForm, salvar } from "./etapas";

/** "Salvar e continuar depois": grava o que já foi preenchido e leva para Minha área. */
export function ligarSalvarDepois(e: Estado) {
  document.querySelectorAll("[data-salvar-depois]").forEach((botao) =>
    botao.addEventListener("click", async () => {
      try {
        if (e.etapa === 1) {
          const { dados, aceitePrivacidade } = dadosDoForm(e);
          const parcial = Object.fromEntries(Object.entries(dados).filter(([, v]) => v));
          await salvar(e, { dados: parcial, aceitePrivacidade });
        } else if (e.etapa === 2) await salvar(e, { atividades: e.seletor!.obter() });
        location.href = url("/minha-area");
      } catch (erro) {
        mostrarErro(e.etapa === 1 ? e.form : $("#etapa-2"), erro);
      }
    }),
  );
}
