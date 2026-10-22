/** Paletas de cores: resolução (preset ou personalizada), mistura e checagem de contraste. Funções puras. */
import opcoes from "../../data/opcoes.json";
import type { Aparencia } from "./tipos";

export type Cores = Record<string, string>;

const HEX = /^#[0-9a-f]{6}$/i;
const canais = (hex: string) => [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
const hex2 = (n: number) => Math.round(n).toString(16).padStart(2, "0");

/** Mistura `a` (peso `pa`, 0–1) com `b` (peso 1 − pa); devolve `#rrggbb`. */
export function misturar(a: string, b: string, pa: number): string {
  const [ca, cb] = [canais(a), canais(b)];
  return `#${ca.map((v, i) => hex2(v * pa + cb[i] * (1 - pa))).join("")}`;
}

const luminancia = (hex: string) => {
  const [r, g, b] = canais(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Razão de contraste WCAG entre duas cores `#rrggbb` (1 a 21). */
export function contraste(a: string, b: string): number {
  const [la, lb] = [luminancia(a), luminancia(b)];
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** Cores personalizadas + derivados (`entregue-*`) como variáveis completas da paleta. */
function personalizada(c: Cores): Cores {
  return {
    ...c,
    "entregue-fundo": c["verde-claro"],
    "entregue-texto": c["verde-escuro"],
    "entregue-borda": misturar(c["verde-claro"], c["verde-medio"], 0.55),
  };
}

/** Todas as cores (`--color-*`) da aparência: paleta pronta ou personalizada; cai na primeira paleta se o id for desconhecido. */
export function coresDaAparencia(a: Pick<Aparencia, "paleta" | "coresPersonalizadas">): Cores {
  if (a.paleta === "personalizada" && Object.values(a.coresPersonalizadas ?? {}).every((v) => HEX.test(v))) {
    return personalizada(a.coresPersonalizadas);
  }
  return { ...(opcoes.paletas.find((p) => p.id === a.paleta) ?? opcoes.paletas[0]).cores };
}

/** Mensagens de legibilidade (mesmas regras da API); vazio = paleta legível. */
export function avisosDeContraste(c: Cores): string[] {
  const regras: [string, string, number, string][] = [
    ["#ffffff", c["verde-escuro"], 4.5, "Texto branco sobre a cor escura (cabeçalho e rodapé)"],
    [c["verde-noite"], c["verde-cta"], 4.5, "Texto do botão de destaque"],
    ["#ffffff", c["verde-medio"], 3, "Cor média sobre fundo branco"],
  ];
  return regras.filter(([a, b, min]) => contraste(a, b) < min).map(([, , min, rotulo]) => `${rotulo}: contraste abaixo de ${min}.`);
}
