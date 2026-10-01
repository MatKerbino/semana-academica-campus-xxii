/** Realização e apoio: somente entidades que aparecem nos dados do Even3. O Even3 não lista patrocinadores. */
export const gruposApoio = [
  {
    id: "realizacao",
    rotulo: "Realização",
    itens: [
      { nome: "UEPA — Universidade do Estado do Pará", url: "https://www.uepa.br" },
      { nome: "Campus XXII — Ananindeua" },
    ],
  },
  {
    id: "coordenacoes",
    rotulo: "Coordenações parceiras",
    itens: [
      { nome: "Coordenação do curso de Biomedicina" },
      { nome: "Coordenação do curso de Engenharia de Software" },
      { nome: "Coordenação do curso de Engenharia Florestal" },
      { nome: "Coordenação do curso de Licenciatura em Matemática" },
    ],
  },
  {
    id: "apoio",
    rotulo: "Apoio na programação",
    itens: [
      { nome: "PROEX", detalhe: "Campanha de Vacinação" },
      { nome: "CODEPE", detalhe: "Feira do Servidor Empreendedor" },
    ],
  },
] as const;
