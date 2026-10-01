import { even3Url } from "./evento-info";

/** Templates e edital ficam no Even3; não há endereços diretos de arquivos. */
export const materiais = [
  {
    nome: "Edital e templates no Even3",
    descricao: "O edital do evento, as erratas e os templates de submissão estão na página oficial do evento no Even3.",
    url: even3Url,
  },
] as const;

export const prazos = [
  { data: "23/09/2025 a 08/10/2025", etapa: "Submissão de trabalhos", fim: "2025-10-08" },
  { data: "09/10/2025 a 11/10/2025", etapa: "Período de avaliação", fim: "2025-10-11" },
] as const;

export const areasGt = [
  { id: "GT 1", nome: "Ciência, Tecnologia e Utilização dos Recursos Naturais da Amazônia" },
  { id: "GT 2", nome: "Tecnologia Sustentável Aplicada à Saúde" },
  { id: "GT 3", nome: "Educação, Ciência e Perspectivas de Vivências Amazônicas" },
] as const;
