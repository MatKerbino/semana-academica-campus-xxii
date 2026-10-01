import { formatarDataHora } from "../api";
import { gradeDados, ico, linhaAtividade } from "../visao";
import { caixaErro, caixaInfo } from "./alertas";
import { $ } from "./dom";
import type { Estado } from "./estado";

const marcaSemVagas = `<span class="inline-flex items-center gap-1.5 rounded-full border border-borda bg-[#eeeeee] px-2.5 py-1 text-[11px] font-bold tracking-[0.4px] text-chumbo uppercase">${ico("proibido", "size-3.5")}Ficou sem vagas — remova para confirmar</span>`;

/** Formata "dd/mm/aaaa, hh:mm" como "dd/mm/aaaa às hhhmm". */
export const dataComAs = (iso?: string | null) => formatarDataHora(iso).replace(", ", " às ").replace(":", "h");

/** Etapa 3: monta o resumo (dados, atividades, aceite) e o estado do botão de confirmação. */
export function desenharRevisao(e: Estado) {
  const slugs = e.insc.atividades.filter((s) => e.porSlug.has(s));
  $("#revisao-dados").innerHTML = gradeDados(e.insc.dados);
  $("[data-total]").textContent = String(slugs.length);
  $("#revisao-atividades").innerHTML = slugs
    .map((s) => linhaAtividade(e.porSlug.get(s)!, e.indisponiveis.includes(s) ? marcaSemVagas : ""))
    .join("");
  const quando = e.insc.aceiteEm ? ` em ${dataComAs(e.insc.aceiteEm)}` : "";
  $("#revisao-aceite").innerHTML = `<span class="text-verde-medio">${ico("circulo-ok", "size-[18px]")}</span>Aceite registrado nesta inscrição${quando} · Política versão ${e.insc.versaoPolitica ?? "1.0"}`;

  $("#alerta-revisao").innerHTML = e.indisponiveis.length
    ? caixaErro(
        "Não foi possível confirmar a inscrição",
        `A atividade “${e.porSlug.get(e.indisponiveis[0])!.titulo}” ficou sem vagas enquanto você revisava. Remova-a ou escolha outra atividade para continuar.`,
      )
    : caixaInfo("Revise antes de confirmar", "Sua inscrição só será registrada depois que você clicar em “Confirmar inscrição”. Use “Editar” ou “Voltar” para corrigir qualquer informação.");

  $<HTMLButtonElement>("#confirmar").innerHTML = e.indisponiveis.length
    ? `${ico("lapis", "size-[18px]")}Revisar atividades`
    : `${ico("ok", "size-[18px]")}Confirmar inscrição`;
}
