/** Selos (pílulas de estado) de inscrição, pagamento e devolução. */
import { esc } from "../api";
import { icone } from "./icones";
import type { InscricaoAdmin } from "./tipos";

type Tom = "ok" | "pendente" | "neutro" | "info";
const tons: Record<Tom, string> = {
  ok: "border-entregue-borda bg-entregue-fundo text-entregue-texto",
  pendente: "border-pendente-borda bg-pendente-fundo text-pendente-texto",
  neutro: "border-[#ccc] bg-[#ececec] text-[#555]",
  info: "border-info-borda bg-info-fundo text-info-texto",
};

export function selo(texto: string, tom: Tom, ic?: string) {
  return `<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs leading-[1.3] font-bold tracking-[0.4px] uppercase ${tons[tom]}">${ic ? icone(ic, "size-3.5") : ""}${esc(texto)}</span>`;
}

const STATUS = {
  confirmada: ["Confirmada", "ok", "circle-check"],
  cancelada: ["Cancelada", "neutro", "circle-x"],
  rascunho: ["Em preenchimento", "info", "clock"],
  sem: ["Sem inscrição", "neutro", "minus"],
} as const;
export function seloInscricao(status: keyof typeof STATUS | null, comIcone = false, prefixo = "") {
  const [t, tom, ic] = STATUS[status ?? "sem"];
  return selo(prefixo + t, tom, comIcone ? ic : undefined);
}

/** Situação do pagamento ou compensação de uma inscrição (não se aplica a canceladas sem devolução). */
export function situacaoPagamento(i: InscricaoAdmin): "pendente" | "regularizada" | "nao_aplica" {
  if (i.status === "rascunho") return "nao_aplica";
  if (i.status === "cancelada" && !i.devolucao) return "nao_aplica";
  return i.situacaoPagamento ?? "nao_aplica";
}
export function seloPagamento(i: InscricaoAdmin, comIcone = false, prefixo = "") {
  const s = situacaoPagamento(i);
  if (s === "pendente") return selo(prefixo + "Pendente", "pendente", comIcone ? "clock" : undefined);
  if (s === "regularizada") return selo(prefixo + "Regularizada", "ok", comIcone ? "circle-check" : undefined);
  return selo(prefixo + "Não se aplica", "neutro", comIcone ? "minus" : undefined);
}
export const situacaoDevolucao = (i: InscricaoAdmin) => i.devolucao?.situacao ?? "nao_aplica";
export function seloDevolucao(i: InscricaoAdmin, comIcone = false) {
  const s = situacaoDevolucao(i);
  if (s === "pendente") return selo("Pendente", "pendente", comIcone ? "undo-2" : undefined);
  if (s === "devolvido") return selo("Devolvido", "ok", comIcone ? "circle-check" : undefined);
  return selo("Não se aplica", "neutro", comIcone ? "minus" : undefined);
}
