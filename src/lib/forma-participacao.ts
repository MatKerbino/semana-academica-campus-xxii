/**
 * Forma de participação vigente (definida pelo administrador, US-25) para as páginas públicas.
 * Os textos estáticos do HTML são o padrão (1 kg de alimento) e só são trocados quando GET /pagamento responde.
 * Marque o elemento com data-forma-part="hero|card|passo|rodape|frase".
 */
import { api, formatarMoeda, type Pagamento } from "./api";

const CHAVE = "semana:forma-participacao";
const VALIDADE_MS = 2 * 60 * 1000;

export type Forma = { modalidade: Pagamento["modalidade"]; destaque: string; detalhe: string | null };

export const FORMA_PADRAO: Forma = {
  modalidade: "nao_monetaria",
  destaque: "1 kg de alimento não perecível",
  detalhe: "Entregue no credenciamento do evento.",
};

/** Converte a resposta da API: não monetária = 1ª linha da descrição (destaque) + 2ª linha ou orientações; monetária = valor + orientações. */
export function interpretar(p: Pagamento): Forma {
  if (p.modalidade === "monetaria") {
    const destaque = `${formatarMoeda(p.valor ?? 0)} por participante`;
    return { modalidade: "monetaria", destaque, detalhe: p.descricao?.trim() || p.orientacoes?.trim() || null };
  }
  const [primeira, segunda] = (p.descricao ?? "").split("\n").map((l) => l.trim());
  return {
    modalidade: "nao_monetaria",
    destaque: primeira || FORMA_PADRAO.destaque,
    detalhe: segunda || p.orientacoes?.trim() || null,
  };
}

let pendente: Promise<Forma> | null = null;

export function obterForma(): Promise<Forma> {
  try {
    const guardado = JSON.parse(sessionStorage.getItem(CHAVE) ?? "null") as { em: number; forma: Forma } | null;
    if (guardado && Date.now() - guardado.em < VALIDADE_MS) return Promise.resolve(guardado.forma);
  } catch {
    /* sem sessionStorage: segue sem cache */
  }
  pendente ??= api<Pagamento>("/pagamento", { auth: false })
    .then((p) => {
      const forma = interpretar(p);
      try {
        sessionStorage.setItem(CHAVE, JSON.stringify({ em: Date.now(), forma }));
      } catch {}
      return forma;
    })
    .catch(() => FORMA_PADRAO);
  return pendente;
}

const minuscula = (f: Forma) => (f.modalidade === "nao_monetaria" ? f.destaque.charAt(0).toLowerCase() + f.destaque.slice(1) : f.destaque);
const frase = (t: string) => (/[.!?]$/.test(t) ? t : `${t}.`);

const textos: Record<string, (f: Forma) => string> = {
  hero: (f) => `Forma de participação: ${f.destaque}`,
  rodape: (f) => `Forma de participação: ${f.destaque}`,
  frase: (f) => minuscula(f),
  card: (f) =>
    `Definida pela organização para todos os participantes. Nesta edição: ${minuscula(f)}.${f.detalhe ? ` ${frase(f.detalhe)}` : ""}`,
  passo: (f) =>
    `Revise e confirme a inscrição. A forma de participação é definida pela organização; nesta edição, ${minuscula(f)}. A situação aparece em "Minha inscrição".`,
};

/** Preenche todos os elementos [data-forma-part] da página. Não faz chamada se não houver nenhum. */
export async function preencherForma() {
  const alvos = document.querySelectorAll<HTMLElement>("[data-forma-part]");
  if (!alvos.length) return;
  const forma = await obterForma();
  alvos.forEach((el) => {
    const montar = textos[el.dataset.formaPart ?? ""];
    if (montar) el.textContent = montar(forma);
  });
}
