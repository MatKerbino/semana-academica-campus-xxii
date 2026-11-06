/** Submissão de artigo: só para usuários autenticados, enquanto a submissão estiver aberta. */
import { exigirLogin } from "../api";
import { configuracao } from "../artigos/api";
import { avisoInfo, LINK_BOTAO, mostrarErroPagina, motivoFechado } from "../artigos/comum";
import { montarEditor } from "../artigos/editor";
import { url } from "../url";

export async function iniciar() {
  if (!exigirLogin()) return;
  const raiz = document.getElementById("formulario")!;
  try {
    const config = await configuracao();
    const motivo = motivoFechado(config, "submissao");
    if (motivo) raiz.innerHTML = avisoInfo(motivo);
    else
      montarEditor(raiz, {
        config,
        aoSalvar: () => {
          raiz.innerHTML = `<div role="status" tabindex="-1" class="flex flex-col gap-3 outline-none"><p class="text-[18px] font-semibold text-verde-escuro">Artigo enviado com sucesso.</p>
            <p class="text-[15px] text-chumbo">Você pode acompanhá-lo, editá-lo (enquanto a edição estiver aberta) e ver as avaliações em Meus artigos.</p>
            <div class="flex flex-wrap gap-3"><a href="${url("/meus-artigos")}" class="${LINK_BOTAO}">Ver meus artigos</a><a href="${url("/submeter-artigo")}" class="${LINK_BOTAO}">Enviar outro artigo</a></div></div>`;
          raiz.querySelector<HTMLElement>("[role=status]")!.focus();
        },
      });
  } catch (e) {
    mostrarErroPagina(raiz, e);
  }
}
