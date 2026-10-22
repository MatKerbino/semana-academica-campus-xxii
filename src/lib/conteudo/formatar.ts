/** Formatação derivada do conteúdo (datas, horários e textos com {{marcadores}}). Funções puras. */
import type { Atividade, Conteudo, Dia, Evento, Sessao } from "./tipos";

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const SEMANA = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const feira = (d: string) => (d === "Domingo" || d === "Sábado" ? d : `${d}-feira`);

/** "2025-10-21" → Date em UTC (sem deslocamento de fuso). */
export const dataUtc = (iso: string) => new Date(`${iso}T00:00:00Z`);
const num = (iso: string) => ({ d: Number(iso.slice(8, 10)), m: Number(iso.slice(5, 7)) - 1, a: Number(iso.slice(0, 4)) });

/** "21 a 24 de outubro de 2025" · "28 de outubro a 2 de novembro de 2025" · "21 de outubro de 2025". */
export function periodoTexto(e: Pick<Evento, "dataInicio" | "dataFim">): string {
  const i = num(e.dataInicio), f = num(e.dataFim);
  if (e.dataInicio === e.dataFim) return `${i.d} de ${MESES[i.m]} de ${i.a}`;
  if (i.a === f.a && i.m === f.m) return `${i.d} a ${f.d} de ${MESES[f.m]} de ${f.a}`;
  if (i.a === f.a) return `${i.d} de ${MESES[i.m]} a ${f.d} de ${MESES[f.m]} de ${f.a}`;
  return `${i.d} de ${MESES[i.m]} de ${i.a} a ${f.d} de ${MESES[f.m]} de ${f.a}`;
}

/** Ano da data de início. */
export const anoDoEvento = (e: Pick<Evento, "dataInicio">) => e.dataInicio.slice(0, 4);

/** "2025-10-21" → "21/10". */
export const dataCurta = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;

/** Dia do evento (id ISO, rótulos curtos e por extenso) a partir de uma data ISO. */
export function dia(iso: string): Dia {
  const { d, m } = num(iso);
  const semana = SEMANA[dataUtc(iso).getUTCDay()];
  return { id: iso, rotulo: `${dataCurta(iso)} · ${semana}`, data: `${feira(semana)} · ${d} de ${MESES[m]}`, curta: dataCurta(iso) };
}

/** Todos os dias do evento, de dataInicio a dataFim (no máximo 31, por segurança). */
export function diasDoEvento(e: Pick<Evento, "dataInicio" | "dataFim">): Dia[] {
  const dias: Dia[] = [];
  const fim = dataUtc(e.dataFim).getTime();
  for (let t = dataUtc(e.dataInicio).getTime(), n = 0; t <= fim && n < 31; t += 86_400_000, n++) dias.push(dia(new Date(t).toISOString().slice(0, 10)));
  return dias;
}

/** "08:30" → "08h30". */
export const horaTexto = (hhmm: string) => hhmm.replace(":", "h");
/** Sessão → "08h30 às 09h00". */
export const horarioTexto = (s: Pick<Sessao, "inicio" | "fim">) => `${horaTexto(s.inicio)} às ${horaTexto(s.fim)}`;

/** Horário com todas as sessões ("22/10 · 08h30 às 10h00 e 23/10 · 10h00 às 12h00"); uma só sessão: só o horário. */
export const horarioCompleto = (a: Pick<Atividade, "sessoes">) =>
  a.sessoes.length === 1 ? horarioTexto(a.sessoes[0]) : a.sessoes.map((s) => `${dataCurta(s.data)} · ${horarioTexto(s)}`).join(" e ");

/** Sessões ordenadas por data e hora. */
export const sessoesOrdenadas = (a: Pick<Atividade, "sessoes">) =>
  [...a.sessoes].sort((x, y) => `${x.data}${x.inicio}`.localeCompare(`${y.data}${y.inicio}`));

export type ExtrasTexto = { forma?: string };

/**
 * Troca {{nome}} {{periodo}} {{local}} {{forma}} {{email}} {{ano}} {{lema}} {{organizacao}} pelos valores do evento.
 * `{{forma}}` só é trocado quando `extras.forma` é informado; senão o marcador permanece (preenchido depois).
 */
export function texto(c: Pick<Conteudo, "evento">, modelo: string, extras: ExtrasTexto = {}): string {
  const e = c.evento;
  const valores: Record<string, string | undefined> = {
    nome: e.nome, periodo: periodoTexto(e), local: e.local.curto, email: e.email, ano: anoDoEvento(e),
    lema: e.lema, organizacao: e.organizacao, forma: extras.forma,
  };
  return modelo.replace(/\{\{(\w+)\}\}/g, (todo, chave: string) => valores[chave] ?? todo);
}

/** Link da política de privacidade: o configurado ou a página interna (caminho relativo ao site, sem base). */
export const linkPolitica = (c: Pick<Conteudo, "evento">) => c.evento.links.politicaPrivacidade || "/politica-de-privacidade";
