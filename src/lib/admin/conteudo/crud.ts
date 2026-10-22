/** Peças comuns das telas de lista + formulário (atividades e palestrantes). */
import { esc } from "../../api";
import { CLASSES } from "../componentes";
import { abrirModal } from "../interacao";
import { icone } from "../icones";
import { erroDe } from "./form";

export const botaoLinha = "flex cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] border-borda bg-white px-3.5 py-1.5 text-[13px] font-bold text-verde-escuro hover:bg-palha";
export const botaoLinhaPerigo = botaoLinha.replace("text-verde-escuro", "text-erro").replace("border-borda", "border-erro-borda");

export const botoesForm = (rotuloSalvar: string) =>
  `<div class="flex flex-wrap justify-end gap-3"><button type="button" data-cancelar class="${CLASSES.botaoContorno}">Cancelar</button><button type="submit" class="${CLASSES.botaoPrimario}">${icone("check")}${esc(rotuloSalvar)}</button></div>`;

/** Confirmação de exclusão: erros da API (ex.: 409 com inscrições) aparecem dentro do modal. */
export function confirmarExclusao(o: { titulo: string; texto: string; acao: () => Promise<void> }) {
  const { dialogo, fechar } = abrirModal(`
    <div class="flex items-center gap-3"><span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-erro-fundo text-erro">${icone("triangle-alert", "size-5")}</span><h2 class="${CLASSES.titulo} !text-[20px]">${esc(o.titulo)}</h2></div>
    <p class="mt-4 text-[15px] leading-normal text-chumbo">${esc(o.texto)}</p>
    <div data-erro-modal hidden role="alert" class="mt-4 rounded-campo border border-erro-borda bg-erro-fundo p-4 text-sm font-semibold text-erro"></div>
    <div class="mt-6 flex flex-wrap justify-end gap-3"><button type="button" data-voltar class="${CLASSES.botaoContorno}">Voltar</button><button type="button" data-ok class="${CLASSES.botaoPrimario} !bg-erro !text-white">Excluir</button></div>`);
  dialogo.querySelector("[data-voltar]")!.addEventListener("click", fechar);
  dialogo.querySelector<HTMLButtonElement>("[data-ok]")!.addEventListener("click", async (e) => {
    const botao = e.currentTarget as HTMLButtonElement;
    botao.disabled = true;
    try {
      await o.acao();
      fechar();
    } catch (err) {
      const caixa = dialogo.querySelector<HTMLElement>("[data-erro-modal]")!;
      caixa.textContent = erroDe(err).mensagem;
      caixa.hidden = false;
      botao.disabled = false;
    }
  });
}
