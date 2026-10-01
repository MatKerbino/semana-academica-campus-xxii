/** Formatação de textos e datas do painel. */
import { formatarData, formatarMoeda } from "../api";
import type { FormaPagamento, Perfil } from "./tipos";

export const rotuloPerfil: Record<Perfil, string> = { estudante: "Estudante", professor: "Professor(a)", profissional: "Profissional", outro: "Outro" };
export const formatarTelefone = (v = "") =>
  v.length === 11 ? v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : v.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
export const dataHora = (iso?: string | null, separador = " ") => {
  if (!iso) return "—";
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}${separador}${p(d.getHours())}h${p(d.getMinutes())}`;
};
export const dataCurta = (iso?: string | null) => {
  const d = iso ? new Date(iso) : null;
  return d && !Number.isNaN(d.getTime()) ? formatarData(d.toISOString()) : "—";
};
export const contar = (n: number, singular: string, plural: string) => `${n} ${n === 1 ? singular : plural}`;

export const formaTexto = (f: FormaPagamento) => {
  if (f.modalidade === "monetaria") {
    return { titulo: f.valor == null ? "—" : `${formatarMoeda(f.valor)} por participante`, apoio: f.descricao ?? "", rotulo: "Monetária" };
  }
  // A descrição pode vir em duas linhas (destaque + detalhe), como na forma padrão do evento.
  const [primeira = "", ...resto] = (f.descricao ?? "").split("\n").map((l) => l.trim()).filter(Boolean);
  return { titulo: primeira || "—", apoio: [resto.join(" "), f.orientacoes ?? ""].filter(Boolean).join(" "), rotulo: "Não monetária" };
};
