import { api, esc, formatarData, type Inscricao, type InscricaoAnterior } from "./api";
import { btnPrimario, ico } from "./visao";
import { url } from "./url";

export const TEXTO_DEVOLUCAO_PENDENTE = "Você poderá se inscrever novamente depois que a organização registrar a devolução.";

/** Enquanto a devolução da inscrição cancelada está pendente, a API não aceita uma nova inscrição. */
export const devolucaoPendente = (i: Pick<Inscricao, "devolucao">) => i.devolucao?.situacao === "pendente";

/** Cria um novo rascunho (a API guarda a inscrição cancelada em `anteriores`). */
export const criarNovaInscricao = () => api<{ inscricao: Inscricao }>("/inscricao", { metodo: "POST" }).then((r) => r.inscricao);

/** Botão 'Fazer nova inscrição' de uma inscrição cancelada (desabilitado, com explicação, se há devolução pendente). */
export function blocoNovaInscricao(i: Pick<Inscricao, "devolucao">, classes = "mt-4"): string {
  const bloqueada = devolucaoPendente(i);
  return `<div class="${classes}" data-nova-inscricao-bloco>
    <button type="button" data-nova-inscricao ${bloqueada ? 'disabled aria-describedby="nova-inscricao-explicacao"' : ""} class="${btnPrimario} disabled:cursor-not-allowed disabled:opacity-60">${ico("usuario-mais", "size-4")}Fazer nova inscrição</button>
    ${bloqueada ? `<p id="nova-inscricao-explicacao" class="mt-2 text-[13px] leading-normal text-texto-suave">${TEXTO_DEVOLUCAO_PENDENTE}</p>` : ""}
    <p data-erro-nova role="alert" hidden class="mt-3 rounded-campo border border-erro-borda bg-erro-fundo p-3 text-sm font-semibold text-erro"></p></div>`;
}

/** Liga (por delegação) os botões 'Fazer nova inscrição' dentro de `raiz`; ao criar o rascunho segue para /inscricao. */
export function ligarNovaInscricao(raiz: HTMLElement, aoCriar: () => void | Promise<void> = () => void (location.href = url("/inscricao"))) {
  raiz.addEventListener("click", async (e) => {
    const botao = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-nova-inscricao]");
    if (!botao || botao.disabled) return;
    const erro = botao.closest("[data-nova-inscricao-bloco]")?.querySelector<HTMLElement>("[data-erro-nova]");
    if (erro) erro.hidden = true;
    botao.disabled = true;
    try {
      await criarNovaInscricao();
      await aoCriar();
    } catch (falha) {
      if (erro) {
        erro.textContent = falha instanceof Error ? falha.message : "Não foi possível iniciar uma nova inscrição.";
        erro.hidden = false;
      }
      botao.disabled = false;
    }
  });
}

/** Lista discreta das inscrições canceladas que a conta já teve. */
export function secaoAnteriores(anteriores: InscricaoAnterior[] = []): string {
  if (!anteriores.length) return "";
  const itens = [...anteriores]
    .reverse()
    .map((a) => {
      const dev = a.devolucao ? ` · ${a.devolucao.situacao === "devolvido" ? "devolução concluída" : "devolução pendente"}` : "";
      return `<li class="text-[15px] leading-normal text-chumbo">Inscrição nº ${esc(a.numero ?? "—")} · cancelada em ${esc(a.canceladaEm ? formatarData(a.canceladaEm) : "—")}${dev}</li>`;
    })
    .join("");
  return `<h2 class="text-[18px] leading-[1.4] font-semibold text-verde-escuro">Inscrições anteriores</h2><ul class="mt-4 space-y-2">${itens}</ul>`;
}
