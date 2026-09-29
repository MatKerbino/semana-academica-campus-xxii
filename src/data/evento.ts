/*
 * Dados do evento. Fonte: página oficial do evento no Even3 (referenciada nos requisitos do projeto):
 * https://www.even3.com.br/e/i-semana-academica-da-uepa-ananindeua-624559
 * Atividades, horários, locais, convidados e trabalhos aprovados foram copiados de lá, sem acréscimos.
 * O que o Even3 não informa (vagas, descrições, Lattes, patrocinadores) fica ausente e não é exibido.
 */
export const even3Url = "https://www.even3.com.br/e/i-semana-academica-da-uepa-ananindeua-624559";

export const evento = {
  nome: "1ª Semana Acadêmica do Campus XXII",
  lema: "Educação, Saúde, Tecnologia e Meio Ambiente: soluções inteligentes para um mundo sustentável",
  periodo: "21 a 24 de outubro de 2025",
  descricao:
    "A I Semana Acadêmica do Campus XXII – Ananindeua/UEPA reúne estudantes, professores, pesquisadores e a comunidade acadêmica em um espaço de aprendizado, troca de experiências e integração, com palestras, mesas-redondas, oficinas e apresentações acadêmicas.",
  publico: "Aberto à comunidade interna e externa da universidade, sem necessidade de vínculo com a UEPA.",
  custo: "1 kg de alimento não perecível, entregue no credenciamento do evento.",
  // não verificado: e-mail de contato mantido do site original; não consta no Even3.
  email: "semanaacademica.campusxxii@uepa.br",
  local: {
    nome: "UEPA — Universidade do Estado do Pará · Campus XXII Ananindeua",
    // não verificado: endereço e CEP mantidos do site original; o Even3 informa apenas "Ananindeua – Pará – Brasil".
    endereco: "Rodovia BR-316, km 8, s/n — Coqueiro",
    cidade: "Ananindeua/PA — CEP 67030-000",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=UEPA+Campus+XXII+Ananindeua+PA",
    // não verificado: coordenadas aproximadas (OpenStreetMap, sem chave de API); confirmar o ponto exato.
    mapaEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=-48.4275%2C-1.3989%2C-48.3975%2C-1.3789&layer=mapnik&marker=-1.3889%2C-48.4125",
  },
  realizacao: [
    "UEPA — Universidade do Estado do Pará",
    "Campus XXII · Ananindeua",
    "Coordenações de Biomedicina, Engenharia de Software, Engenharia Florestal e Licenciatura em Matemática",
  ],
} as const;

export const dias = [
  { id: "21-10", rotulo: "21/10 · Terça", data: "Terça-feira · 21 de outubro" },
  { id: "22-10", rotulo: "22/10 · Quarta", data: "Quarta-feira · 22 de outubro" },
  { id: "23-10", rotulo: "23/10 · Quinta", data: "Quinta-feira · 23 de outubro" },
  { id: "24-10", rotulo: "24/10 · Sexta", data: "Sexta-feira · 24 de outubro" },
] as const;

export type DiaId = (typeof dias)[number]["id"];

/** Tipos selecionáveis (documento, RN-05): minicurso, palestra (inclui mesas-redondas), curso, banner, artigo. Os demais são programação geral. */
export type TipoAtividade =
  | "palestra" | "minicurso" | "curso" | "banner" | "artigo" | "mesa-redonda"
  | "abertura" | "encerramento" | "campanha" | "exibicao" | "mostra" | "outro";

export type Sessao = { dia: DiaId; hora: string; horario: string };

export type Atividade = {
  slug: string;
  titulo: string;
  tipo: TipoAtividade;
  /** Primeira sessão (uma atividade pode ter mais de uma; ver `sessoes`). */
  dia: DiaId;
  hora: string;
  horario: string;
  sessoes: Sessao[];
  local?: string;
  vagas?: string;
  cargaHoraria?: string;
  palestrantes?: string[];
  descricao: string[];
  topicos?: string[];
};

export const atividades: Atividade[] = [
  {
    "slug": "credenciamento",
    "titulo": "Credenciamento",
    "tipo": "abertura",
    "dia": "21-10",
    "hora": "08h30",
    "horario": "08h30 às 09h00",
    "sessoes": [
      {
        "dia": "21-10",
        "hora": "08h30",
        "horario": "08h30 às 09h00"
      }
    ],
    "local": "Sala 2",
    "descricao": [
      "Momento para os participantes se credenciarem.",
      "Responsáveis: Bolsistas do DAE."
    ]
  },
  {
    "slug": "mesa-de-abertura",
    "titulo": "Mesa de abertura",
    "tipo": "abertura",
    "dia": "21-10",
    "hora": "09h00",
    "horario": "09h00 às 10h00",
    "sessoes": [
      {
        "dia": "21-10",
        "hora": "09h00",
        "horario": "09h00 às 10h00"
      }
    ],
    "local": "Sala 5",
    "descricao": [
      "Evento de abertura da Semana Acadêmica. Responsável: Diretoria de Eventos e Cerimonial - DEC."
    ]
  },
  {
    "slug": "conferencia-de-abertura-a-ciencia-e-a-inovacao-como-vetores",
    "titulo": "Conferência de abertura: “A Ciência e a Inovação como Vetores para um Futuro Sustentável em tempos de COP 30”",
    "tipo": "abertura",
    "dia": "21-10",
    "hora": "10h00",
    "horario": "10h00 às 11h00",
    "sessoes": [
      {
        "dia": "21-10",
        "hora": "10h00",
        "horario": "10h00 às 11h00"
      }
    ],
    "local": "Sala 5",
    "descricao": [
      "Palestra liderada pelo Professor Sávio Almeida abordando um dos temas centrais do evento."
    ]
  },
  {
    "slug": "coffe-break-networking",
    "titulo": "Coffe Break + Networking",
    "tipo": "outro",
    "dia": "21-10",
    "hora": "11h30",
    "horario": "11h30 às 12h00",
    "sessoes": [
      {
        "dia": "21-10",
        "hora": "11h30",
        "horario": "11h30 às 12h00"
      }
    ],
    "local": "Sala 5",
    "descricao": []
  },
  {
    "slug": "minicurso-metodologias-ativas-no-ensino-de-matematica",
    "titulo": "Minicurso: Metodologias Ativas no Ensino de Matemática",
    "tipo": "minicurso",
    "dia": "22-10",
    "hora": "08h30",
    "horario": "08h30 às 10h00",
    "sessoes": [
      {
        "dia": "22-10",
        "hora": "08h30",
        "horario": "08h30 às 10h00"
      }
    ],
    "local": "Sala 2",
    "palestrantes": [
      "ligia-francoise-lemos-pantoja"
    ],
    "descricao": []
  },
  {
    "slug": "minicurso-mulheres-saberes-e-sustentabilidade-educacao-com",
    "titulo": "Minicurso: Mulheres, Saberes e Sustentabilidade: Educação com Justiça Social.",
    "tipo": "minicurso",
    "dia": "22-10",
    "hora": "08h30",
    "horario": "08h30 às 10h00",
    "sessoes": [
      {
        "dia": "22-10",
        "hora": "08h30",
        "horario": "08h30 às 10h00"
      }
    ],
    "local": "Sala 5",
    "palestrantes": [
      "izabel-cristina-borges-oliveira"
    ],
    "descricao": []
  },
  {
    "slug": "oficina-desenvolvimento-e-redes-neurais-convolucionais-cnn",
    "titulo": "Oficina: Desenvolvimento e Redes Neurais Convolucionais (CNN)",
    "tipo": "minicurso",
    "dia": "22-10",
    "hora": "08h30",
    "horario": "08h30 às 10h00",
    "sessoes": [
      {
        "dia": "22-10",
        "hora": "08h30",
        "horario": "08h30 às 10h00"
      },
      {
        "dia": "23-10",
        "hora": "10h00",
        "horario": "10h00 às 12h00"
      }
    ],
    "local": "Sala 3",
    "palestrantes": [
      "italo-flexa-di-paolo",
      "ryan-souza-santana"
    ],
    "descricao": [
      "Nessa oficina será abordado a historia, técnica e o desenvolvimento de Redes Neurais Convolucionais utilizando a ferramenta Google Colab e o framework PyTorch."
    ]
  },
  {
    "slug": "oficina-manejo-de-produtos-florestais-nao-madeireiros-pfnms-da",
    "titulo": "Oficina: Manejo de Produtos Florestais não Madeireiros (PFNMs) da Amazônia",
    "tipo": "minicurso",
    "dia": "22-10",
    "hora": "08h30",
    "horario": "08h30 às 10h00",
    "sessoes": [
      {
        "dia": "22-10",
        "hora": "08h30",
        "horario": "08h30 às 10h00"
      }
    ],
    "local": "Laboratório Multidiciplinar",
    "palestrantes": [
      "seidel-ferreira-do-santos"
    ],
    "descricao": []
  },
  {
    "slug": "oficina-cd-o-pinguim-estrategia-gamificada-de-ensino-de-linux",
    "titulo": "Oficina: “Cd o Pinguim?\" Estratégia gamificada de ensino de Linux utilizando uma didática baseada em Caça ao Tesouro",
    "tipo": "minicurso",
    "dia": "22-10",
    "hora": "08h30",
    "horario": "08h30 às 10h00",
    "sessoes": [
      {
        "dia": "22-10",
        "hora": "08h30",
        "horario": "08h30 às 10h00"
      }
    ],
    "local": "Laboratório de Informatica",
    "palestrantes": [
      "jorge-joao-hermes-neto",
      "filipe-augusto-muribeca-cruz",
      "ananda-vitoria-pinheiro-nunes",
      "matheus-willian-freire-de-souza-juca"
    ],
    "descricao": []
  },
  {
    "slug": "apresentacao-de-gts",
    "titulo": "Apresentação de GT´S",
    "tipo": "artigo",
    "dia": "22-10",
    "hora": "10h00",
    "horario": "10h00 às 12h00",
    "sessoes": [
      {
        "dia": "22-10",
        "hora": "10h00",
        "horario": "10h00 às 12h00"
      }
    ],
    "descricao": [
      "Apresentação dos trabalhos submetidos no site.",
      "Salas 1, 2 e 5."
    ]
  },
  {
    "slug": "apresentacao-dos-trabalhos-aprovados-banner",
    "titulo": "Apresentação dos trabalhos Aprovados (Banner)",
    "tipo": "banner",
    "dia": "22-10",
    "hora": "14h00",
    "horario": "14h00 às 16h00",
    "sessoes": [
      {
        "dia": "22-10",
        "hora": "14h00",
        "horario": "14h00 às 16h00"
      }
    ],
    "local": "Corredor",
    "descricao": []
  },
  {
    "slug": "mesa-redonda-1-cop-30-como-catalisadora-de-futuro-educacao",
    "titulo": "Mesa-redonda 1: COP-30 como Catalisadora de Futuro: Educação, Tecnologia e Sustentabilidade no Desenvolvimento de um Ecossistema Melhor",
    "tipo": "mesa-redonda",
    "dia": "22-10",
    "hora": "16h00",
    "horario": "16h00 às 18h00",
    "sessoes": [
      {
        "dia": "22-10",
        "hora": "16h00",
        "horario": "16h00 às 18h00"
      }
    ],
    "local": "Sala 5",
    "palestrantes": [
      "marcelo-de-souza-correia",
      "marco-antonio-silva-lima",
      "armando-jose-de-sa-santos"
    ],
    "descricao": []
  },
  {
    "slug": "campanha-de-vacinacao",
    "titulo": "Campanha de Vacinação",
    "tipo": "campanha",
    "dia": "23-10",
    "hora": "08h00",
    "horario": "08h00 às 12h00",
    "sessoes": [
      {
        "dia": "23-10",
        "hora": "08h00",
        "horario": "08h00 às 12h00"
      }
    ],
    "local": "Sala 1",
    "palestrantes": [
      "proex"
    ],
    "descricao": []
  },
  {
    "slug": "mesa-redonda-2-a-importancia-da-inteligencia-artificial-no",
    "titulo": "Mesa-redonda 2: A importância da Inteligência Artificial no contexto da Amazônia: o Manejo de Doenças Vetoriais",
    "tipo": "mesa-redonda",
    "dia": "23-10",
    "hora": "08h30",
    "horario": "08h30 às 10h00",
    "sessoes": [
      {
        "dia": "23-10",
        "hora": "08h30",
        "horario": "08h30 às 10h00"
      }
    ],
    "local": "Sala 5",
    "palestrantes": [
      "wanderson-alexandre-da-silva-quinto",
      "clea-nazare-carneiro-bichara"
    ],
    "descricao": []
  },
  {
    "slug": "curso-mendeley-como-organizar-e-registrar-bibliografia-segundo",
    "titulo": "Curso Mendeley: como organizar e registrar bibliografia segundo as normas da ABNT",
    "tipo": "curso",
    "dia": "23-10",
    "hora": "10h00",
    "horario": "10h00 às 12h00",
    "sessoes": [
      {
        "dia": "23-10",
        "hora": "10h00",
        "horario": "10h00 às 12h00"
      }
    ],
    "local": "Laboratório de Informatica",
    "palestrantes": [
      "eunice-goncalves-macedo"
    ],
    "descricao": []
  },
  {
    "slug": "minicurso-analise-floristica-e-estrutura-de-especies-florestais",
    "titulo": "Minicurso: Análise Florística e Estrutura de Espécies Florestais",
    "tipo": "minicurso",
    "dia": "23-10",
    "hora": "10h00",
    "horario": "10h00 às 12h00",
    "sessoes": [
      {
        "dia": "23-10",
        "hora": "10h00",
        "horario": "10h00 às 12h00"
      },
      {
        "dia": "24-10",
        "hora": "08h00",
        "horario": "08h00 às 10h00"
      }
    ],
    "local": "Áre Externa - Laboratório de Informatica",
    "palestrantes": [
      "manoel-tavares-de-paula"
    ],
    "descricao": [
      "O minicurso será dividido em duas partes. A primeira acontecerá na área externa do Campus no dia 23, e a segunda, no Laboratório de Informática dia 24."
    ]
  },
  {
    "slug": "oficina-oratoria",
    "titulo": "Oficina: Oratória",
    "tipo": "minicurso",
    "dia": "23-10",
    "hora": "10h00",
    "horario": "10h00 às 12h00",
    "sessoes": [
      {
        "dia": "23-10",
        "hora": "10h00",
        "horario": "10h00 às 12h00"
      }
    ],
    "local": "Sala 2",
    "palestrantes": [
      "cristiane-do-rosario-teixeira-menezes"
    ],
    "descricao": []
  },
  {
    "slug": "planetario-movel",
    "titulo": "PLANETÁRIO MÓVEL",
    "tipo": "exibicao",
    "dia": "23-10",
    "hora": "10h00",
    "horario": "10h00 às 12h00",
    "sessoes": [
      {
        "dia": "23-10",
        "hora": "10h00",
        "horario": "10h00 às 12h00"
      },
      {
        "dia": "23-10",
        "hora": "13h00",
        "horario": "13h00 às 17h00"
      }
    ],
    "local": "Teatro da Usina da Paz Icuí",
    "palestrantes": [
      "jose-roberto-alves-da-silva"
    ],
    "descricao": []
  },
  {
    "slug": "minicurso-uso-de-dados-secundarios-em-saude-no-planejamento-de",
    "titulo": "Minicurso: Uso de dados Secundários em saúde no planejamento de estratégias de educação ambiental",
    "tipo": "minicurso",
    "dia": "23-10",
    "hora": "13h30",
    "horario": "13h30 às 16h30",
    "sessoes": [
      {
        "dia": "23-10",
        "hora": "13h30",
        "horario": "13h30 às 16h30"
      }
    ],
    "local": "Laboratório de Informatica",
    "palestrantes": [
      "yasmin-nascimento-farias"
    ],
    "descricao": []
  },
  {
    "slug": "oficina-lingua-brasileira-de-sinais-libras",
    "titulo": "Oficina: Língua Brasileira de Sinais (LIBRAS)",
    "tipo": "minicurso",
    "dia": "23-10",
    "hora": "13h30",
    "horario": "13h30 às 16h30",
    "sessoes": [
      {
        "dia": "23-10",
        "hora": "13h30",
        "horario": "13h30 às 16h30"
      }
    ],
    "local": "Sala 2",
    "palestrantes": [
      "ivanete-maria-barroso-moreira",
      "stefane-lopes",
      "ana-luiza-alves",
      "paula-kayla-santos"
    ],
    "descricao": []
  },
  {
    "slug": "oficina-momento-do-enxadristico",
    "titulo": "Oficina: Momento do Enxadrístico",
    "tipo": "minicurso",
    "dia": "23-10",
    "hora": "13h30",
    "horario": "13h30 às 16h30",
    "sessoes": [
      {
        "dia": "23-10",
        "hora": "13h30",
        "horario": "13h30 às 16h30"
      }
    ],
    "local": "Sala 5",
    "palestrantes": [
      "marcio-de-souza-pessoa"
    ],
    "descricao": []
  },
  {
    "slug": "mesa-redonda-3-empreendedorismo-em-tecnologias-da-informacao",
    "titulo": "Mesa-redonda 3: Empreendedorismo em Tecnologias da Informação",
    "tipo": "mesa-redonda",
    "dia": "23-10",
    "hora": "16h30",
    "horario": "16h30 às 18h30",
    "sessoes": [
      {
        "dia": "23-10",
        "hora": "16h30",
        "horario": "16h30 às 18h30"
      }
    ],
    "local": "Sala 5",
    "palestrantes": [
      "marcela-cotta-de-castro",
      "danielle-costa",
      "evandro-paes",
      "walter-oliveira-junior"
    ],
    "descricao": []
  },
  {
    "slug": "feira-do-servidor-empreendedor",
    "titulo": "Feira do Servidor Empreendedor",
    "tipo": "mostra",
    "dia": "24-10",
    "hora": "08h00",
    "horario": "08h00 às 11h00",
    "sessoes": [
      {
        "dia": "24-10",
        "hora": "08h00",
        "horario": "08h00 às 11h00"
      },
      {
        "dia": "24-10",
        "hora": "14h00",
        "horario": "14h00 às 16h00"
      }
    ],
    "local": "Área Externa",
    "palestrantes": [
      "codepe"
    ],
    "descricao": []
  },
  {
    "slug": "minicurso-arquitetura-foliar",
    "titulo": "Minicurso: Arquitetura Foliar",
    "tipo": "minicurso",
    "dia": "24-10",
    "hora": "08h00",
    "horario": "08h00 às 10h00",
    "sessoes": [
      {
        "dia": "24-10",
        "hora": "08h00",
        "horario": "08h00 às 10h00"
      }
    ],
    "local": "Laboratório Multidiciplinar",
    "palestrantes": [
      "eunice-goncalves-macedo"
    ],
    "descricao": []
  },
  {
    "slug": "minicurso-realidade-aumentada-com-unity-e-vuforia",
    "titulo": "Minicurso: Realidade Aumentada com Unity e Vuforia",
    "tipo": "minicurso",
    "dia": "24-10",
    "hora": "08h00",
    "horario": "08h00 às 10h00",
    "sessoes": [
      {
        "dia": "24-10",
        "hora": "08h00",
        "horario": "08h00 às 10h00"
      }
    ],
    "local": "Sala 3",
    "palestrantes": [
      "jorge-amaro-de-sarges-cardoso"
    ],
    "descricao": []
  },
  {
    "slug": "oficina-concepcao-e-elaboracao-de-produtos-educacionais-para",
    "titulo": "Oficina: Concepção e elaboração de produtos educacionais para ensino e formação docente",
    "tipo": "minicurso",
    "dia": "24-10",
    "hora": "08h00",
    "horario": "08h00 às 10h00",
    "sessoes": [
      {
        "dia": "24-10",
        "hora": "08h00",
        "horario": "08h00 às 10h00"
      }
    ],
    "local": "Sala 2",
    "palestrantes": [
      "dra-luely-oliveira-da-silva-uepa"
    ],
    "descricao": []
  },
  {
    "slug": "mesa-redonda-4-da-producao-cientifica-a-inovacao-tecnologica",
    "titulo": "Mesa-redonda 4: Da Produção Científica à Inovação Tecnológica: Patentes e Ética como Pilares para o Desenvolvimento da Pesquisa",
    "tipo": "mesa-redonda",
    "dia": "24-10",
    "hora": "10h00",
    "horario": "10h00 às 12h00",
    "sessoes": [
      {
        "dia": "24-10",
        "hora": "10h00",
        "horario": "10h00 às 12h00"
      }
    ],
    "local": "Sala 5",
    "palestrantes": [
      "marcelo-jose-raiol-souza",
      "claudia-viana-urbinati",
      "joao-sergio-de-sousa-oliveira"
    ],
    "descricao": []
  },
  {
    "slug": "mesa-redonda-5-educacao-mulher-e-ciencia-reflexoes-sobre-a",
    "titulo": "Mesa-redonda 5: Educação, Mulher e Ciência: reflexões sobre a presença de mulheres nas ciências",
    "tipo": "mesa-redonda",
    "dia": "24-10",
    "hora": "14h00",
    "horario": "14h00 às 16h00",
    "sessoes": [
      {
        "dia": "24-10",
        "hora": "14h00",
        "horario": "14h00 às 16h00"
      }
    ],
    "local": "Teatro da Usina da Paz Icuí",
    "palestrantes": [
      "lana-claudia-macedo-da-silva",
      "acylena-coelho-costa",
      "bianca-venturieri"
    ],
    "descricao": []
  },
  {
    "slug": "lancamento-de-livro-cabanagem-a-revolucao-popular-da-amazonia",
    "titulo": "Lançamento de Livro: Cabanagem - A Revolução Popular da Amazônia, de Pasquale Di Paolo",
    "tipo": "mostra",
    "dia": "24-10",
    "hora": "16h15",
    "horario": "16h15 às 18h30",
    "sessoes": [
      {
        "dia": "24-10",
        "hora": "16h15",
        "horario": "16h15 às 18h30"
      }
    ],
    "local": "Teatro da Usina da Paz Icuí",
    "palestrantes": [
      "italo-flexa-di-paolo",
      "darcy-flexa-di-paolo"
    ],
    "descricao": []
  },
  {
    "slug": "encerramento-cultural",
    "titulo": "Encerramento Cultural",
    "tipo": "encerramento",
    "dia": "24-10",
    "hora": "16h30",
    "horario": "16h30 às 18h30",
    "sessoes": [
      {
        "dia": "24-10",
        "hora": "16h30",
        "horario": "16h30 às 18h30"
      }
    ],
    "local": "Teatro da Usina da Paz Icuí",
    "descricao": [
      "Encerramento Cultural com Banda ou Apresentação artística do Núcleo de Arte e Cultura (NAC) da UEPA."
    ]
  }
];

export type Palestrante = {
  slug: string;
  nome: string;
  /** Vínculo/cargo informado no Even3. */
  cargo?: string;
  /** Currículo resumido informado no Even3. */
  bio?: string;
  email?: string;
  lattes?: string;
};

export const palestrantes: Palestrante[] = [
  {
    "slug": "acylena-coelho-costa",
    "nome": "Acylena Coelho Costa",
    "cargo": "Professora/UEPA – Pró-Reitora de Graduação/UEPA",
    "bio": "Licenciada em Matemática, com mestrado e doutorado em Educação Matemática. Professora da UEPA no curso de Licenciatura em Matemática e docente do Mestrado Profissional em Ensino de Matemática. Pró-Reitora de Graduação e líder do grupo de pesquisa em Didática da Matemática e Educação Matemática, com foco em ensino de funções, geometria analítica e sequências didáticas.",
    "email": "acylena@uepa.br"
  },
  {
    "slug": "ana-luiza-alves",
    "nome": "Ana Luiza Alves",
    "cargo": "Aluna/UEPA",
    "bio": "Aluna de graduação em fonoaudiologia da UEPA."
  },
  {
    "slug": "ananda-vitoria-pinheiro-nunes",
    "nome": "Ananda Vitória Pinheiro Nunes",
    "cargo": "Aluna/UEPA",
    "bio": "Aluna de graduação em Engenharia de Software da UEPA."
  },
  {
    "slug": "armando-jose-de-sa-santos",
    "nome": "Armando Jose de Sa Santos",
    "cargo": "Professor/UEPA – Chefe do Departamento de Sistemas Computacionais e Infraestrutura/UEPA",
    "bio": "Mestre em Ciência e Engenharia de Materiais (UFSCar), graduado em Informática com ênfase em Análise de Sistemas (UNESA) e pós-graduado em Engenharia de Software, Sistemas de Informação e Gestão Escolar. Professor efetivo da UEPA, chefe do DSCI, coordenador de laboratório de TADS e do curso de Engenharia de Software (Forma Pará). Experiência em Sistemas de Informação, ERP TOTVS, análise de sistemas, BI, TI, sistemas web, banco de dados, além de gestão em saúde, logística, projetos e contratos administrativos."
  },
  {
    "slug": "bianca-venturieri",
    "nome": "Bianca Venturieri",
    "cargo": "Professora/UEPA – Coordenadoria Institucional do PIBID-UEPA",
    "bio": "Professora Adjunta II da Universidade do Estado do Pará (UEPA). Possui graduação em Licenciatura e Bacharelado em Ciências Biológicas pela Universidade Federal de Pernambuco (1999), mestrado em Psicologia (Teoria e Pesquisa do Comportamento) pela UFPA (2002) e doutorado em Educação para a Ciência pela UNESP (2019). É professora permanente do Programa de Pós-Graduação em Educação e Ensino de Ciências na Amazônia (PPGEECA/UEPA), do Programa de Pós-Graduação em Transtorno do Espectro do Autista (UEPA) e do Mestrado Profissional em Processos e Tecnologias Educacionais (UEPA). Atua também na Coordenadoria Institucional do PIBID-UEPA. Tem experiência na área de Educação e Ensino de Ciências, com foco em formação de professores, inclusão e ensino em espaços não formais."
  },
  {
    "slug": "codepe",
    "nome": "CODEPE",
    "cargo": "Coordenadoria de Desenvolvimento de Pessoas"
  },
  {
    "slug": "claudia-viana-urbinati",
    "nome": "Claudia Viana Urbinati",
    "cargo": "Professora/UEPA – Líder de Grupo de Pesquisa/UEPA",
    "bio": "Doutor em Ciência e Tecnologia da Madeira, com mestrado em Botânica e graduação em Engenharia Florestal. Professora Adjunta I da UEPA no curso de Engenharia Florestal, líder do grupo de pesquisa em Anatomia de Madeira de Espécies Amazônicas e coordenadora do setor de Anatomia do Laboratório Multiusuário de Engenharia Florestal. Atua em anatomia, identificação e aproveitamento de produtos florestais, incluindo uso de madeira por comunidades tradicionais e ensino da botânica com ênfase em madeira.",
    "email": "claudiaurbinati@uepa.br"
  },
  {
    "slug": "clea-nazare-carneiro-bichara",
    "nome": "Cléa Nazaré Carneiro Bichara",
    "cargo": "Professora/UEPA – Pesquisadora/UFPA",
    "bio": "Médica formada pela Universidade Federal do Pará (1985), com mestrado e doutorado em Biologia de Agentes Infecciosos e Parasitários pela UFPA. Possui diversas especializações nas áreas de Medicina Tropical, Saúde Pública, Saúde Coletiva e Educação em Saúde. É professora adjunta da Universidade do Estado do Pará e atua também na Faculdade da Amazônia (FAMAZ), além de integrar programas de pós-graduação em Ciências Ambientais e Educação em Saúde na Amazônia (UEPA). Pesquisadora do Núcleo de Medicina Tropical/UFPA, tem experiência em doenças infecciosas, parasitárias e na educação em saúde com metodologias ativas."
  },
  {
    "slug": "cristiane-do-rosario-teixeira-menezes",
    "nome": "Cristiane do Rosário Teixeira Menezes",
    "cargo": "Professora/UEPA – Técnica de Referência/CAEE-PA",
    "bio": "Advogada e Fonoaudióloga, mestre em Neurociências e Biologia Celular, com especializações em Linguagem, Saúde Pública e Direito Médico. Atua na docência do ensino superior e como técnica de referência no Núcleo de Avaliação Educacional Especializada do CAEE/PA, com experiência em gestão educacional, saúde e formação acadêmica."
  },
  {
    "slug": "danielle-costa",
    "nome": "Danielle Costa",
    "cargo": "Professora/UFPA – Fundadora da Manas Digitais e da TacaCode Hub",
    "bio": "Cabocla paraense, mãe da Fernanda, formada em Ciência da Computação (CESUPA), mestra em Engenharia Elétrica e doutora em Genética e Biologia Molecular pela Universidade Federal do Pará (UFPA). Possui mais de 15 anos de experiência na área comercial de Desenvolvimento de Software e atualmente atua como professora e pesquisadora no campus Ananindeua da UFPA, com ênfase em Tecnologias Educacionais, Banco de Dados e Ciência de Dados. É diretora adjunta do Núcleo de Inovação e Tecnologias Aplicadas a Ensino e Extensão (Nitae²/UFPA). Fundadora das Manas Digitais, iniciativa voltada à promoção da inclusão e diversidade na área de TI na região amazônica. A partir do coletivo, cofundou a startup TacaCode Hub, pós-acelerada pelo BNDES Garagem (2023) e premiada entre as 6 melhores startups do Norte do Brasil no programa Mulheres Inovadoras (FINEP/MCTI, 2024)."
  },
  {
    "slug": "darcy-flexa-di-paolo",
    "nome": "Darcy Flexa Di Paolo",
    "cargo": "Professora aposentada/UFPA",
    "bio": "Socióloga, Doutora em Biologia Ambiental, na área de pesquisa socioambiental (Ufpa). Professora aposentada da Ufpa. Atuante na área socioambiental e metodologia de pesquisa qualitativa."
  },
  {
    "slug": "dra-luely-oliveira-da-silva-uepa",
    "nome": "Dra. Luely Oliveira da Silva - UEPA",
    "cargo": "Professora/UEPA – Diretora de Desenvolvimento à Pós-Graduação da UEPA",
    "email": "luely.silva@uepa.br"
  },
  {
    "slug": "eunice-goncalves-macedo",
    "nome": "Eunice Gonçalves Macedo",
    "cargo": "Professora/UEPA – Professora/Secretaria de Educação",
    "bio": "Graduada em Ciências Biológicas e mestre em Agronomia (Biologia Vegetal Tropical). Professora assistente da UEPA e professora do ensino médio na Secretaria Executiva de Educação. Atua em Botânica, com ênfase em Anatomia Vegetal, especialmente anatomia de órgãos vegetativos e madeira.",
    "email": "eunicemacedo@yahoo.com.br"
  },
  {
    "slug": "evandro-paes",
    "nome": "Evandro Paes",
    "cargo": "Presidente da SUCESU-PA / CEO da BelOffice Coworking / Consultor de TI na Jeta Tecnologia",
    "bio": "Presidente da Sociedade de Tecnologia da Informação do Pará (SUCESU-PA), CEO e fundador da BelOffice Coworking e consultor de TI na Jeta Tecnologia. Possui mais de 20 anos de experiência em desenvolvimento de sistemas, levantamento de requisitos e gerenciamento de projetos. É graduado em Tecnologia em Processamento de Dados, com especialização em Desenvolvimento de Aplicativos para Internet e Gerência de Projetos de Software, além de MBA em Gestão de Negócios, Controladoria e Finanças Corporativas. Detém certificações CSM, ITIL, COBIT, PRINCE2 e C1-MPS.BR. Atua ativamente em comunidades de tecnologia, inovação e empreendedorismo na região, contribuindo na organização e participação de eventos, palestras e iniciativas de fomento ao ecossistema tecnológico."
  },
  {
    "slug": "filipe-augusto-muribeca-cruz",
    "nome": "Filipe Augusto Muribeca Cruz",
    "cargo": "Aluno/UEPA",
    "bio": "Aluno de graduação em Engenharia de Software da UEPA."
  },
  {
    "slug": "ivanete-maria-barroso-moreira",
    "nome": "Ivanete Maria Barroso Moreira",
    "cargo": "Professora/UEPA|SEDUC-PA",
    "bio": "Professora da Universidade do Estado do Pará (UEPA) e da Secretaria de Estado de Educação do Pará (SEDUC-PA), com atuação no Centro de Ciências e Planetário do Pará (CCPPA) e no Centro de Ciências Sociais e Educação (CCSE). Graduada em Matemática (UEPA), mestre em Educação (UEPA), doutora em Educação em Ciências e Matemática (REAMEC/UFMT-UFPA) e com proficiência em Libras pelo MEC/INEP/UFSC."
  },
  {
    "slug": "izabel-cristina-borges-oliveira",
    "nome": "Izabel Cristina Borges Oliveira",
    "cargo": "Professora/UEPA – Psicóloga/SESPA",
    "bio": "Graduada em Pedagogia (UFPA) e Psicologia (UNAMA), mestre em Educação (UFPA). Atualmente é psicóloga da Secretaria Estadual de Saúde Pública do Pará e professora assistente V da Universidade do Estado do Pará (UEPA), atuando em disciplinas de estágio supervisionado, psicologia, gênero, sexualidade e educação infantil. Coordena adjuntamente o PARFOR/UEPA, é membro do GEPPEM e vice-líder do GEFES. Tem experiência em docência no ensino fundamental, superior e na educação inclusiva, além de atuação em psicologia clínica, saúde mental social, desenvolvimento, aprendizagem e educação em saúde."
  },
  {
    "slug": "jorge-amaro-de-sarges-cardoso",
    "nome": "Jorge Amaro de Sarges Cardoso",
    "cargo": "Professor/UEPA – Analista de TI/UFPA",
    "bio": "Graduado em Sistemas de Informação, com especialização em Redes de Computadores e doutorado em Engenharia Elétrica pela UFPA. Analista de TI na UFPA e docente na UEPA, atuando em Ciência da Computação e Engenharia da Computação, com foco em redes veiculares, redes heterogêneas, QoS/QoE, simulação computacional e modelagem de sistemas.",
    "email": "jorge.cardoso@uepa.br"
  },
  {
    "slug": "jorge-joao-hermes-neto",
    "nome": "Jorge João Hermes Neto",
    "cargo": "Aluno/UEPA",
    "bio": "Aluno de graduação em Engenharia de Software da UEPA."
  },
  {
    "slug": "jose-roberto-alves-da-silva",
    "nome": "José Roberto Alves da Silva",
    "cargo": "Professor/UEPA – Diretor do Centro de Ciências e Planetário do Pará",
    "bio": "Professor Adjunto III da Universidade do Estado do Pará (UEPA), vinculado ao Departamento de Educação Geral do Centro de Ciências Sociais e Educação. Graduado em Pedagogia com habilitação em Administração Escolar pela Faculdade de Educação do Estado do Pará (1993), mestre em Ciência da Educação – Docência Universitária pelo Instituto Pedagógico Latinoamericano e Caribenho (IPLAC/UEPA, 2000) e doutor em Educação pela Pontifícia Universidade Católica do Rio de Janeiro (PUC-Rio, 2010). Atua na UEPA desde 1993 e atualmente exerce o cargo de Diretor do Centro de Ciências e Planetário do Pará (CCPPA)."
  },
  {
    "slug": "joao-sergio-de-sousa-oliveira",
    "nome": "João Sérgio de Sousa Oliveira",
    "cargo": "Coordenador/UEPA – Fisioterapeuta/SEASTER",
    "bio": "Fisioterapeuta com doutorado em Biologia Parasitária e pós-doutorado em Doenças Tropicais. Atua em gerontologia, saúde coletiva e reabilitação, como fisioterapeuta na Unidade de Acolhimento à Pessoa Idosa Lar da Providência (SEASTER) e coordenador da LAFIGE e do curso de pós-graduação em Saúde Coletiva da UEPA."
  },
  {
    "slug": "lana-claudia-macedo-da-silva",
    "nome": "Lana Claudia Macedo da Silva",
    "cargo": "Professora/UEPA – Coordenadora de Grupo de Pesquisa/UEPA",
    "bio": "Doutora em Ciências Sociais pela UFPA, com graduação em Ciências Sociais e mestrado em Sociologia Geral. Professora Adjunta IV da UEPA, ministra disciplinas de Sociologia, Antropologia e Metodologia Científica, e coordena o grupo de pesquisa GEFES, com foco em Amazônia, gênero, mulheres e violência."
  },
  {
    "slug": "ligia-francoise-lemos-pantoja",
    "nome": "Lígia Françoise Lemos Pantoja",
    "cargo": "Professora/UEPA|SEDUC-PA",
    "bio": "Doutora em Educação em Ciências e Matemática (REAMEC/UFMT), mestre em Educação em Ciências e Matemática (UFPA), especialista em Educação Matemática, licenciada em Matemática (UEPA) e em Pedagogia (UFPA). Atualmente é servidora da Universidade do Estado do Pará (UEPA) e da Secretaria de Estado de Educação (SEDUC-PA). Possui experiência em Matemática e Educação Matemática, com foco em Resolução de Problemas, Didática da Matemática e Conexões no Ensino de Matemática."
  },
  {
    "slug": "manoel-tavares-de-paula",
    "nome": "Manoel Tavares de Paula",
    "cargo": "Professor/UEPA – Revisor/Scientia Amazônia",
    "bio": "Engenheiro Agrônomo com mestrado em Biologia Vegetal Tropical e doutorado em Ciências Agrárias (Agroecossistemas da Amazônia). Professor da UEPA nos cursos de Engenharia Florestal e Pós-Graduação em Ciências Ambientais, atuando em Biologia Vegetal Tropical e Agroecossistemas da Amazônia."
  },
  {
    "slug": "marcela-cotta-de-castro",
    "nome": "Marcela Cotta de Castro",
    "cargo": "Assistente técnica do Parque de Ciência e Tecnologia Guamá"
  },
  {
    "slug": "marcelo-jose-raiol-souza",
    "nome": "Marcelo José Raiol Souza",
    "cargo": "Professor/UEPA",
    "bio": "Graduado em Engenharia Mecânica e Física, com mestrado em Engenharia Mecânica e doutorado em Engenharia de Recursos Naturais. Professor da UEPA, atuando em engenharias térmica e de processo, com foco em aproveitamento energético de biomassa, energias renováveis e modelagem matemática de sistemas naturais.",
    "email": "mraiol@yahoo.com.br"
  },
  {
    "slug": "marcelo-de-souza-correia",
    "nome": "Marcelo de Souza Correia",
    "cargo": "Professor/UEPA – Pesquisador/UNIFAP",
    "bio": "Graduado em Secretariado Executivo Trilingue e mestre em Administração. Pesquisador na Universidade Federal do Amapá e professor assistente I da UEPA, atuando em Administração da Produção, desenvolvimento profissional e gestão secretarial.",
    "email": "marscorreia@yahoo.com.br"
  },
  {
    "slug": "marcio-de-souza-pessoa",
    "nome": "Marcio de Souza Pessoa",
    "cargo": "Procurador Chefe – UEPA",
    "bio": "Procurador-Chefe da Universidade do Estado do Pará/UEPA. Mestre em Direito pelo Centro Universitário do Estado do Pará/CESUPA. Especialista em Direito Público pelo Instituto Processus/DF. Membro do Grupo de Estudos de processo e direitos fundamentais/CESUPA. Coordenador do Grupo de Estudos em Direito Processual da Fibra Centro Universitário e Professor de Direito Processual Civil da Fibra Centro Universitário."
  },
  {
    "slug": "marco-antonio-silva-lima",
    "nome": "Marco Antonio Silva Lima",
    "cargo": "Professor/UEPA – Professor/FEAPA",
    "bio": "Doutor em Desenvolvimento Socioambiental e Mestre em Planejamento do Desenvolvimento, com especialização em Marketing. Professor Assistente da UEPA e Professor Titular da FEAPA, atuando em crescimento econômico, organização industrial, mudança tecnológica e sustentabilidade."
  },
  {
    "slug": "matheus-willian-freire-de-souza-juca",
    "nome": "Matheus Willian Freire de Souza Jucá",
    "cargo": "Aluno/UEPA",
    "bio": "Aluno de graduação em Engenharia de Software da UEPA."
  },
  {
    "slug": "proex",
    "nome": "PROEX",
    "cargo": "Pró-Reitoria de Extensão Universitária",
    "bio": "A Pró-Reitoria de Extensão da Universidade do Estado do Pará – PROEX demonstra sua estruturação, competências e definição de funções no Regimento Geral/UEPA (1994) em seu Título IV, Capítulo III e art. 54, onde afirma o conceito de que: “A Extensão tem por fim promover a articulação entre o ensino e a pesquisa, a universidade e a sociedade”"
  },
  {
    "slug": "paula-kayla-santos",
    "nome": "Paula Kayla Santos",
    "cargo": "Aluna/UEPA",
    "bio": "Aluna de graduação em fonoaudiologia da UEPA."
  },
  {
    "slug": "ryan-souza-santana",
    "nome": "Ryan Souza Santana",
    "cargo": "Aluno/UEPA – Monitor/UEPA",
    "bio": "Aluno de graduação em Engenharia de Software e monitor do laboratório de informática da UEPA, campus Ananindeua.",
    "email": "ryansouzasantana00@gmail.com"
  },
  {
    "slug": "seidel-ferreira-do-santos",
    "nome": "Seidel Ferreira do Santos",
    "cargo": "Professor Adjunto/UEPA – Coordenador do Curso de Engenharia Florestal",
    "bio": "Professor Adjunto da Universidade do Estado do Pará (UEPA), Doutor em Biotecnologia e Biodiversidade (BIONORTE), Mestre em Recursos Genéticos Vegetais (UFSC) e graduado em Agronomia pela FCAP (1999). É Coordenador do Curso de Engenharia Florestal e Professor Permanente do Programa de Pós-Graduação em Tecnologia, Recursos Naturais e Sustentabilidade na Amazônia (PPG-Ternsa/UEPA). Integra o grupo de pesquisa Estudos Interdisciplinares em Botânica, desenvolvendo pesquisas nas áreas de conservação da agrobiodiversidade, desenvolvimento rural e tecnologias sociais para restauração florestal."
  },
  {
    "slug": "stefane-lopes",
    "nome": "Stefane Lopes",
    "cargo": "Aluna/UEPA",
    "bio": "Aluna de graduação em fonoaudiologia da UEPA."
  },
  {
    "slug": "walter-oliveira-junior",
    "nome": "Walter Oliveira Junior",
    "cargo": "CEO da Inteceleri Tecnologia para Educação / Pesquisador e desenvolvedor em tecnologias educacionais",
    "bio": "Walter dos Santos Oliveira Júnior é Doutorando e Mestre em Computação Aplicada, CEO da Inteceleri Tecnologia para Educação, startup Google Partner for Education residente no Parque de Ciência e Tecnologia da UFPA. É autor dos livros e aplicativos Matematicando e GeoMeta: Aprenda Geometria no Metaverso, além de criador do MiritiBoard VR, um óculos de realidade virtual 100% sustentável, desenvolvido a partir de recursos da floresta amazônica. Seu trabalho se destaca pela inovação tecnológica voltada à educação digital e imersiva, promovendo soluções criativas e sustentáveis no ensino de Ciências e Matemática."
  },
  {
    "slug": "wanderson-alexandre-da-silva-quinto",
    "nome": "Wanderson Alexandre da Silva Quinto",
    "cargo": "Professor/UEPA – Diretor de Desenvolvimento Institucional/UEPA – Líder de Grupo de Pesquisa/FESAT",
    "bio": "Doutor em Psicologia e Mestre em Engenharia Elétrica, graduado em Tecnologia e Processamento de Dados. Professor e Diretor de Desenvolvimento Institucional da UEPA, coordenador de cursos de graduação e especialização, e líder do grupo de pesquisa FESAT, atuando em tecnologia, saúde, realidade virtual, sistemas de informação e inteligência artificial.",
    "email": "w.quinto@uol.com.br"
  },
  {
    "slug": "yasmin-nascimento-farias",
    "nome": "Yasmin Nascimento Farias",
    "cargo": "Professora/UEPA – Pesquisadora Colaboradora/FIOCRUZ",
    "bio": "Doutora em Epidemiologia e mestre em Ciências pela FIOCRUZ, graduada em Biomedicina. Professora da UEPA no Centro de Ciências Biológicas e da Saúde, atuando em Saúde Coletiva, epidemiologia, vigilância em saúde e sistemas de informação em saúde, com foco em populações vulneráveis e gestão de linhas de cuidado."
  },
  {
    "slug": "italo-flexa-di-paolo",
    "nome": "Ítalo Flexa Di Paolo",
    "cargo": "Professor/UEPA – Coordenador do Curso de Engenharia de Software",
    "bio": "Doutor e Mestre em Engenharia Elétrica pela Universidade Federal do Pará (UFPA), nas áreas de Computação Aplicada e de Sistemas de Energia Elétrica, respectivamente. Bacharel em Ciência da Computação pelo Centro Universitário do Estado do Pará (CESUPA) e Engenheiro Eletricista pela UFPA. Atualmente docente efetivo, coordenador do curso de engenharia de software e vice-líder do Grupo de Estudos e Pesquisas em Sistemas de Informação e de Conhecimento (GSIC), na Universidade do Estado do Pará (UEPA), atuando também como avaliador ad hoc de cursos de graduação, membro do Banco de Avaliadores do Sistema Nacional de Avaliação da Educação Superior (BASis/Inep/MEC), revisor em periódicos internacionais e avaliador ad hoc de projetos de fomento. Experiências técnica e gerencial em instituições privadas e públicas nas áreas administrativa de Tecnologia de Informação e Comunicação (TIC) com ênfase em gestão, sistemas de informação, tecnologias web, sistemas inteligentes, engenharia de software e computação aplicada.",
    "email": "itflexa@gmail.com"
  }
];

export const palestrantePor = (slug?: string) => palestrantes.find((p) => p.slug === slug);
export const palestrantesDe = (a: Atividade) => (a.palestrantes ?? []).map(palestrantePor).filter((p): p is Palestrante => !!p);
export const atividadesDe = (slug: string) => atividades.filter((a) => a.palestrantes?.includes(slug));

/** Grupos da página de Palestrantes, derivados das atividades que cada pessoa ministra. */
export const gruposPalestrantes = [
  { id: "mesas", rotulo: "Mesas-redondas", tipos: ["mesa-redonda"] },
  { id: "minicursos", rotulo: "Minicursos e oficinas", tipos: ["minicurso"] },
  { id: "cursos", rotulo: "Cursos", tipos: ["curso"] },
  { id: "outros", rotulo: "Outras atividades", tipos: ["abertura", "encerramento", "campanha", "exibicao", "mostra", "outro", "palestra", "banner", "artigo"] },
] as const;

export const palestrantesDoGrupo = (tipos: readonly string[]) =>
  palestrantes.filter((p) => atividadesDe(p.slug).some((a) => tipos.includes(a.tipo)));

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

export const gtsTrabalhos = [
  {
    "gt": "GT 1",
    "nomeGt": "Ciência, Tecnologia e Utilização dos Recursos Naturais da Amazônia",
    "forma": "oral",
    "trabalhos": [
      {
        "titulo": "Aplicação de Algoritmos Genéticos na Locomoção de Robôs Quadrúpedes com o Kit Explorer Deluxe",
        "autores": "Calel Freitas Silva e Gleisson Amaral Mendes"
      },
      {
        "titulo": "Biometria de frutos e sementes de cumarú (Dipteryx odorata Willd.)",
        "autores": "Júlia Calixto Silva Teixeira, Ivoneide Maria Menezes Barra e Seidel Ferreira dos Santos"
      },
      {
        "titulo": "Dispositivo IoT de baixo custo para detecção de gás de cozinha e gases tóxicos, com alerta proativo sonoro e visual",
        "autores": "Felipe Cauã da Costa Martins, Matheus Willian Freire de Souza Jucá, Miguel Picanço Monteiro Escobar, Jorge João Hermes Neto e Gleisson Amaral Mendes"
      },
      {
        "titulo": "Levantamento de plantas visitadas por abelhas em área verde urbana de Ananindeua, Pará",
        "autores": "Jessica Paiva Trindade, Regiane Carvalho Ferreira e Eunice Gonçalves Macedo"
      },
      {
        "titulo": "Redução da cobertura vegetal e serviços ecossistêmicos: uma revisão sobre os impactos da ocupação não planejada na qualidade ambiental urbana, com ênfase no bairro Icuí-Guajará (Ananindeua–PA)",
        "autores": "Hellen Cristina da Silva de Jesus, Heloisa Helena de Assis Junes e Letícia Yasmin de Oliveira Franco"
      },
      {
        "titulo": "Diversidade de espécies da família Melastomataceae em uma área de floresta secundária encontrada na Universidade do Estado do Pará (UEPA) Campus XXII Ananindeua",
        "autores": "Gael Cícero Castro Dutra, Juan Victor Lameira Fonseca, Eunice Gonçalves Macedo, Danielly Marcelino da Silva e Emerson Benedito Ribeiro Andrade"
      },
      {
        "titulo": "Educação, Ciência e Saúde: o impacto do pilates solo na aptidão física de idosos em vivências amazônicas",
        "autores": "Eduarda Lima Alves, Thiago Augusto Gomes da Silva e Anibal Correia Brito Neto"
      },
      {
        "titulo": "Principais características dos sistemas agroflorestais praticados na comunidade de Piriquitaquara na Ilha do Combu no estado do Pará",
        "autores": "Maisa Caxias da Costa, Gabriel Kauê Pereira Vieira, Isabele Vitória Barbosa Paixão, Eduarda Cristina Rodrigues Moreira e Alexandre Jorge Gaia Cardoso"
      }
    ]
  },
  {
    "gt": "GT 2",
    "nomeGt": "Tecnologia Sustentável Aplicada à Saúde",
    "forma": "oral",
    "trabalhos": [
      {
        "titulo": "Perspectivas amazônicas sobre utilização de comunicação aumentativa alternativa pedagógica de baixo custo",
        "autores": "Rebeca Cristina Silva Vasconcelos, Ananda Progenio Amaral Sousa, Caroline Costa de Souza, Jandria Vitoria Sanches da Costa e Camila Claíde Souza do Vale"
      },
      {
        "titulo": "A influência da neuroplasticidade no desenvolvimento das competências socioemocionais em ambientes educativos",
        "autores": "Isabelle da Silva da Cunha, Giordano Bruno dos Santos Tavares e Caroline Yuki Moraes do Amaral"
      }
    ]
  },
  {
    "gt": "GT 3",
    "nomeGt": "Educação, Ciência e Perspectivas de Vivências Amazônicas",
    "forma": "oral",
    "trabalhos": [
      {
        "titulo": "Autorregulação cognitiva em distúrbios de linguagem",
        "autores": "Beatriz Araújo Maciel, Giordano Bruno dos Santos Tavares e Sthefany Alves dos Santos"
      },
      {
        "titulo": "Mulheres e o desafio da liderança",
        "autores": "Elizete Pinheiro Lima e Lana Claudia Macedo da Silva"
      },
      {
        "titulo": "O debate sobre equidade de gênero na ciência a partir do projeto “Meninas na Escola, Mulheres na Ciência”",
        "autores": "Danielly Marcelino da Silva, Maira da Conceição de Paula Guerra e Lana Claudia Macedo da Silva"
      },
      {
        "titulo": "Perspectivas da neurociência cognitiva sobre o desenvolvimento da metacognição em matemática",
        "autores": "Giordano Bruno dos Santos Tavares"
      },
      {
        "titulo": "Tecnologia e desenvolvimento infantil: equilibrando o uso de aparelhos eletrônicos",
        "autores": "Moisés de Melo Pereira, Enzo Beckman Matos Ribeiro e Anibal Correia Brito Neto"
      }
    ]
  },
  {
    "gt": "GT 1",
    "nomeGt": "Ciência, Tecnologia e Utilização dos Recursos Naturais da Amazônia",
    "forma": "pôster",
    "trabalhos": [
      {
        "titulo": "A atuação das mulheres na valorização dos produtos florestais não madeireiros (PFNMs) na Ilha de Cotijuba – Pará",
        "autores": "Maria Emanuely dos Santos Barbosa, Letícia Lopes de Oliveira e Raquel Paola Rodrigues"
      },
      {
        "titulo": "Distribuição geográfica e aspectos ecológicos de Virola surinamensis e Virola sebifera na Amazônia Brasileira",
        "autores": "Cleivyson Sanches, Clayson Alves, Brendy Jamille, Eriane Mota e Lígia Françoise Lemos Pantoja"
      },
      {
        "titulo": "Levantamento entomológico na área verde da Universidade do Estado do Pará – Campus XXII Ananindeua",
        "autores": "Raimunda Souza, Jessica Trindade, Regiane Ferreira, Hagta Lopes e Yasmin Nascimento"
      },
      {
        "titulo": "Relato de experiência: construção de sólidos geométricos",
        "autores": "Elizandro Pinheiro, Lucas Santos e Thyago Fernandes"
      },
      {
        "titulo": "Levantamento florístico no Icuí-Guajará (Ananindeua–PA): um estudo das famílias Poaceae & Cyperaceae frente à urbanização",
        "autores": "Gabriel Kauê Pereira Vieira, Eduarda Cristina Rodrigues Moreira e Eunice Gonçalves Macedo"
      }
    ]
  },
  {
    "gt": "GT 3",
    "nomeGt": "Educação, Ciência e Perspectivas de Vivências Amazônicas",
    "forma": "pôster",
    "trabalhos": [
      {
        "titulo": "Educação em saúde na promoção de cultura de paz e prevenção de violência: uma intervenção do Programa Saúde na Escola (PSE)",
        "autores": "Rayssa da Silva Souza, Yvina Cristiny Matos dos Santos e Lorena Carla Jaques Rodrigues"
      },
      {
        "titulo": "A contribuição de jogos matemáticos para a formação da consciência ambiental",
        "autores": "Debora Thaissa Teixeira Barata e Andreza Magalhães dos Santos"
      },
      {
        "titulo": "Análise de contrato didático na Escola Francisco Paulo Mendes – Ananindeua/PA",
        "autores": "Elon Oliveira Sousa, Gabriely do Amaral Nascimento, Pedro Gabriel Leal, Lohany Borges Silva e Lígia Pantoja"
      },
      {
        "titulo": "Contrato didático na E.E.E.M. Fernando Ferrari",
        "autores": "Eduarda Cristina Rodrigues Moreira, Gabriel Kauê Pereira Vieira, Isabele Vitória Barbosa Paixão, João Victor Nascimento da Costa e Seidel Ferreira dos Santos"
      },
      {
        "titulo": "Contrato didático no ensino de matemática",
        "autores": "Adriele Aquino Silva, Erica Silva Barbosa, Kamilly Waida Silva, Raimundo Flávio Moraes Neto, Sérgio Miranda Cartaxo e Lígia Pantoja"
      },
      {
        "titulo": "Contrato didático: uma experiência com geometria",
        "autores": "Alessandro Alexandre S. S. da Silva, Isabel Santos Lopes Amaral, Weverton Sidonio Peixoto e Lígia F. L. Pantoja"
      },
      {
        "titulo": "Pensamento computacional e matemática: experiências com lógica de programação no ensino básico",
        "autores": "Jorge João Hermes Neto, Matheus Willian Freire de Souza Jucá, Miguel Picanço Monteiro Escobar, Juliana Fabrícia Siqueira Tenreiro e Gleisson Amaral Mendes"
      },
      {
        "titulo": "Relato de experiência: explorando o futuro – robótica e engenharia de software na EEEFM Jarbas Passarinho",
        "autores": "Erllon da Cruz Olivier e Gleisson Amaral Mendes"
      }
    ]
  }
] as const;

export const areasGt = [
  { id: "GT 1", nome: "Ciência, Tecnologia e Utilização dos Recursos Naturais da Amazônia" },
  { id: "GT 2", nome: "Tecnologia Sustentável Aplicada à Saúde" },
  { id: "GT 3", nome: "Educação, Ciência e Perspectivas de Vivências Amazônicas" },
] as const;

export const rotulosTipo: Record<TipoAtividade, string> = {
  palestra: "Palestra",
  minicurso: "Minicurso",
  curso: "Curso",
  banner: "Exposição",
  artigo: "Artigos",
  "mesa-redonda": "Mesa-redonda",
  abertura: "Abertura",
  encerramento: "Encerramento",
  campanha: "Campanha",
  exibicao: "Exibição",
  mostra: "Mostra",
  outro: "Programação geral",
};

export const porTipo = (...tipos: TipoAtividade[]) => atividades.filter((a) => tipos.includes(a.tipo));

/** Sessões de um dia, em ordem de horário (uma atividade com mais de uma sessão aparece em cada dia). */
export const sessoesDoDia = (dia: DiaId) =>
  atividades
    .flatMap((a) => a.sessoes.filter((s) => s.dia === dia).map((sessao) => ({ atividade: a, sessao })))
    .sort((x, y) => x.sessao.hora.localeCompare(y.sessao.hora) || x.atividade.titulo.localeCompare(y.atividade.titulo));

/** Texto de horário com todas as sessões (ex.: "22/10 · 08h30 às 10h00 e 23/10 · 10h00 às 12h00"). */
export const horarioCompleto = (a: Atividade) =>
  a.sessoes.length === 1 ? a.horario : a.sessoes.map((s) => `${s.dia.replace("-", "/")} · ${s.horario}`).join(" e ");

/** Espaços do campus citados na programação. */
export const espacosDoEvento = [...new Set(atividades.map((a) => a.local).filter((l): l is string => !!l))];

/** Tipos que o participante pode escolher na inscrição (RN-05). Espelha o catálogo da API. */
export const tiposSelecionaveis: TipoAtividade[] = ["palestra", "mesa-redonda", "minicurso", "curso", "banner", "artigo"];

export const catalogoSelecionavel = porTipo(...tiposSelecionaveis).map((a) => ({
  slug: a.slug,
  titulo: a.titulo,
  tipo: a.tipo === "mesa-redonda" ? "palestra" : a.tipo,
  dia: a.dia,
  data: a.dia.replace("-", "/"),
  hora: a.hora,
  horario: horarioCompleto(a),
  local: a.local ?? "",
  vagas: a.vagas ? Number.parseInt(a.vagas, 10) || null : null,
}));

/** Caminho da página única de atividades com a atividade selecionada (RN-06). */
export const linkAtividade = (slug: string, de?: string) =>
  `/atividades?atividade=${slug}${de ? `&de=${de}` : ""}`;

/** Tag de tipo (ícone + texto, sem fundo) usada no cronograma, nas atividades e no seletor. */
export const tagsTipo: Record<TipoAtividade, { rotulo: string; icone: "mic" | "apresentacao" | "capelo" | "imagem" | "arquivo"; cor: string } | null> = {
  palestra: { rotulo: "Palestra", icone: "mic", cor: "text-verde-medio" },
  "mesa-redonda": { rotulo: "Palestra", icone: "mic", cor: "text-verde-medio" },
  minicurso: { rotulo: "Minicurso", icone: "apresentacao", cor: "text-info-texto" },
  curso: { rotulo: "Curso", icone: "capelo", cor: "text-curso" },
  banner: { rotulo: "Exposição de Banners", icone: "imagem", cor: "text-divisor" },
  artigo: { rotulo: "Apresentação de artigos", icone: "arquivo", cor: "text-chumbo" },
  abertura: null,
  encerramento: null,
  campanha: null,
  exibicao: null,
  mostra: null,
  outro: null,
};

/** Atividades que aparecem na página de Atividades (as demais são programação geral do cronograma). */
export const atividadesListadas = atividades.filter((a) => tagsTipo[a.tipo] !== null);
