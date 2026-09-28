export const evento = {
  nome: "1ª Semana Acadêmica do Campus XXII",
  lema: "Educação, Saúde, Tecnologia e Meio Ambiente: soluções inteligentes para um mundo sustentável",
  periodo: "21 a 24 de outubro de 2025",
  descricao:
    "A 1ª Semana Acadêmica do Campus XXII reúne estudantes, docentes, pesquisadores e profissionais em torno de soluções inteligentes para um mundo sustentável, com atividades das áreas de Educação, Saúde, Tecnologia e Meio Ambiente realizadas no campus de Ananindeua.",
  publico: "Aberto à comunidade interna e externa da universidade, sem necessidade de vínculo com a UEPA.",
  custo: "1 kg de alimento não perecível, entregue no credenciamento do evento.",
  email: "semanaacademica.campusxxii@uepa.br",
  local: {
    nome: "UEPA — Campus XXII (Ananindeua)",
    endereco: "Rodovia BR-316, km 8, s/n — Coqueiro",
    cidade: "Ananindeua/PA — CEP 67030-000",
    blocos: "Auditório Central, Blocos A e B e laboratórios de informática",
    referencia: "Auditório Central e Blocos A e B, com acesso pela entrada principal do campus.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=UEPA+Campus+XXII+Ananindeua+PA",
    /* Mapa incorporado do OpenStreetMap (não exige chave de API). Coordenadas aproximadas do trecho
       da BR-316 no Coqueiro: confirmar o ponto exato com a organização antes da publicação. */
    mapaEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=-48.4275%2C-1.3989%2C-48.3975%2C-1.3789&layer=mapnik&marker=-1.3889%2C-48.4125",
  },
  realizacao: ["UEPA — Universidade do Estado do Pará", "CCNT · Campus XXII", "PROPESP · PROGRAD"],
} as const;

export const dias = [
  { id: "21-10", rotulo: "21/10 · Terça", data: "Terça-feira · 21 de outubro" },
  { id: "22-10", rotulo: "22/10 · Quarta", data: "Quarta-feira · 22 de outubro" },
  { id: "23-10", rotulo: "23/10 · Quinta", data: "Quinta-feira · 23 de outubro" },
  { id: "24-10", rotulo: "24/10 · Sexta", data: "Sexta-feira · 24 de outubro" },
] as const;

export type TipoAtividade =
  | "palestra" | "minicurso" | "curso" | "banner" | "artigo" | "mesa-redonda" | "cerimonia" | "organizacao";

export type Atividade = {
  slug: string;
  titulo: string;
  tipo: TipoAtividade;
  dia: (typeof dias)[number]["id"];
  hora: string;
  horario: string;
  local: string;
  vagas?: string;
  cargaHoraria?: string;
  palestrante?: string;
  descricao: string[];
  topicos?: string[];
};

export const atividades: Atividade[] = [
  {
    slug: "credenciamento",
    titulo: "Credenciamento e entrega dos alimentos",
    tipo: "organizacao",
    dia: "21-10",
    hora: "08h00",
    horario: "08h00 às 09h00",
    local: "Hall do Bloco A",
    descricao: [
      "Momento de recepção dos participantes inscritos pelo site. Na chegada, o participante entrega 1 kg de alimento não perecível e retira o crachá de identificação, necessário para o acesso às atividades com número limitado de vagas.",
      "A entrega do alimento é o único custo de participação no evento e a arrecadação é destinada a instituições parceiras da universidade.",
    ],
  },
  {
    slug: "solenidade-de-abertura",
    titulo: "Solenidade de Abertura",
    tipo: "cerimonia",
    dia: "21-10",
    hora: "09h00",
    horario: "09h00 às 10h00",
    local: "Auditório Central",
    descricao: [
      "Abertura oficial da 1ª Semana Acadêmica do Campus XXII, com a apresentação da programação dos quatro dias, das áreas temáticas do evento e das instituições participantes.",
    ],
  },
  {
    slug: "palestra-magna-cidades-inteligentes",
    titulo: "Palestra Magna: Cidades inteligentes e sustentabilidade na Amazônia",
    tipo: "palestra",
    dia: "21-10",
    hora: "10h00",
    horario: "10h00 às 12h00",
    local: "Auditório Central — Bloco A",
    vagas: "200 participantes",
    cargaHoraria: "2 horas",
    palestrante: "ana-beatriz-moraes",
    descricao: [
      "A palestra de abertura discute como tecnologias de cidades inteligentes podem ser adaptadas à realidade amazônica, considerando as limitações de infraestrutura, a diversidade territorial e os desafios socioambientais da região metropolitana de Belém.",
      "São apresentados casos reais de sensoriamento urbano, mobilidade, gestão de resíduos e monitoramento ambiental, com foco em soluções de baixo custo aplicáveis por municípios de pequeno e médio porte. A atividade dialoga diretamente com o tema da Semana Acadêmica e com a agenda da COP30.",
    ],
    topicos: [
      "Conceitos de cidade inteligente e indicadores de sustentabilidade",
      "Sensoriamento urbano e Internet das Coisas em contextos de baixa conectividade",
      "Gestão de resíduos sólidos e economia circular",
      "Estudos de caso na região metropolitana de Belém",
      "Papel da universidade pública na agenda climática",
    ],
  },
  {
    slug: "minicurso-python-dados-ambientais",
    titulo: "Minicurso: Introdução ao Python para análise de dados ambientais",
    tipo: "minicurso",
    dia: "21-10",
    hora: "14h00",
    horario: "14h00 às 17h00",
    local: "Laboratório de Informática 1",
    vagas: "30 participantes",
    cargaHoraria: "3 horas",
    palestrante: "rafael-souza-lima",
    descricao: [
      "Minicurso prático de introdução à linguagem Python aplicada ao tratamento de dados ambientais. Os participantes trabalham com séries históricas de chuva, temperatura e qualidade do ar disponibilizadas por órgãos públicos.",
      "Não é exigido conhecimento prévio de programação. Os computadores do laboratório já possuem o ambiente configurado; o participante pode trazer notebook próprio, se preferir.",
    ],
    topicos: [
      "Tipos de dados, listas e estruturas de repetição",
      "Leitura de arquivos CSV com a biblioteca pandas",
      "Limpeza e agregação de séries temporais",
      "Gráficos simples com matplotlib",
    ],
  },
  {
    slug: "minicurso-primeiros-socorros",
    titulo: "Minicurso: Primeiros socorros na atenção básica",
    tipo: "minicurso",
    dia: "21-10",
    hora: "14h00",
    horario: "14h00 às 17h00",
    local: "Sala 12 — Bloco B",
    vagas: "40 participantes",
    cargaHoraria: "3 horas",
    palestrante: "camila-rocha",
    descricao: [
      "Atividade prática sobre condutas iniciais em situações de urgência no contexto da atenção básica de saúde, com uso de manequins de treinamento e simulação de atendimento.",
      "Recomendado o uso de roupas confortáveis, já que parte da atividade é realizada em colchonetes.",
    ],
    topicos: [
      "Avaliação inicial da vítima e acionamento do serviço de urgência",
      "Reanimação cardiopulmonar em adultos",
      "Obstrução de vias aéreas por corpo estranho",
      "Imobilização e transporte seguro",
    ],
  },
  {
    slug: "exposicao-banners-sessao-1",
    titulo: "Exposição de Banners — Sessão 1",
    tipo: "banner",
    dia: "21-10",
    hora: "16h30",
    horario: "16h30 às 18h00",
    local: "Hall do Bloco B",
    descricao: [
      "Primeira sessão de exposição de pôsteres de pesquisa, ensino e extensão. Os trabalhos ficam expostos no hall e os autores permanecem ao lado do banner para atender aos visitantes e à comissão avaliadora.",
      "O expositor deve chegar 30 minutos antes do início da sessão para a montagem. O modelo de pôster está disponível na página de Artigos e Materiais.",
    ],
    topicos: [
      "Pôster impresso em 90 cm × 120 cm, orientação vertical",
      "Presença obrigatória de pelo menos um autor durante toda a sessão",
      "Avaliação por banca composta por docentes do CCNT",
    ],
  },
  {
    slug: "palestra-saude-digital-sus",
    titulo: "Palestra: Saúde digital e telemedicina no SUS",
    tipo: "palestra",
    dia: "22-10",
    hora: "09h00",
    horario: "09h00 às 10h30",
    local: "Auditório Central",
    vagas: "200 participantes",
    cargaHoraria: "1h30",
    palestrante: "paulo-henrique-farias",
    descricao: [
      "Panorama da implantação de serviços de saúde digital na rede pública, com foco em teleconsulta, telediagnóstico e prontuário eletrônico em municípios da região metropolitana de Belém.",
      "A palestra aborda os ganhos de acesso obtidos com a telemedicina e também seus limites, como conectividade, formação profissional e proteção de dados de pacientes.",
    ],
    topicos: [
      "Marco regulatório da telemedicina no Brasil",
      "Teleconsulta e telediagnóstico na atenção básica",
      "Proteção de dados de saúde e LGPD",
    ],
  },
  {
    slug: "palestra-energias-renovaveis",
    titulo: "Palestra: Energias renováveis no contexto amazônico",
    tipo: "palestra",
    dia: "22-10",
    hora: "10h30",
    horario: "10h30 às 12h00",
    local: "Auditório Central",
    vagas: "200 participantes",
    cargaHoraria: "1h30",
    palestrante: "fernanda-castro",
    descricao: [
      "Discussão sobre matrizes energéticas renováveis aplicáveis à Amazônia, com atenção a comunidades isoladas e sistemas híbridos de geração solar e biomassa.",
    ],
    topicos: [
      "Potencial solar e de biomassa na região Norte",
      "Sistemas isolados e microrredes",
      "Custos, manutenção e sustentabilidade dos projetos",
    ],
  },
  {
    slug: "minicurso-docker-kubernetes",
    titulo: "Minicurso: Docker e Kubernetes na prática",
    tipo: "minicurso",
    dia: "22-10",
    hora: "14h00",
    horario: "14h00 às 17h00",
    local: "Laboratório de Informática 2",
    vagas: "25 participantes",
    cargaHoraria: "3 horas",
    palestrante: "rafael-souza-lima",
    descricao: [
      "Minicurso prático de containers, voltado a estudantes de Engenharia de Software e áreas afins. Os participantes empacotam uma aplicação simples e realizam a implantação em um cluster local.",
      "É desejável conhecimento básico de linha de comando.",
    ],
    topicos: [
      "Imagens, containers e Dockerfile",
      "Composição de serviços com Docker Compose",
      "Conceitos de pod, deployment e service no Kubernetes",
      "Implantação em cluster local",
    ],
  },
  {
    slug: "curso-metodologias-ativas",
    titulo: "Curso: Metodologias ativas de ensino",
    tipo: "curso",
    dia: "22-10",
    hora: "14h00",
    horario: "14h00 às 18h00 (21 e 22/10)",
    local: "Sala 08 — Bloco A",
    vagas: "35 participantes",
    cargaHoraria: "8 horas",
    palestrante: "larissa-pinto",
    descricao: [
      "Curso de extensão sobre metodologias ativas aplicadas à educação básica e ao ensino superior, com elaboração de um plano de aula ao final da carga horária.",
      "A certificação de 8 horas exige presença nos dois encontros e entrega da atividade final.",
    ],
    topicos: [
      "Aprendizagem baseada em problemas e em projetos",
      "Sala de aula invertida",
      "Avaliação formativa",
      "Elaboração de plano de aula",
    ],
  },
  {
    slug: "apresentacao-artigos-sessao-1",
    titulo: "Apresentação de Artigos — Sessão 1",
    tipo: "artigo",
    dia: "22-10",
    hora: "16h30",
    horario: "16h30 às 18h00",
    local: "Sala 15 — Bloco B",
    descricao: [
      "Sessão de comunicação oral dos artigos aprovados nas áreas de Educação e Saúde. Cada trabalho tem 15 minutos de apresentação e 5 minutos de arguição da banca.",
      "O template de artigo e os prazos de submissão estão disponíveis na página de Artigos e Materiais.",
    ],
    topicos: [
      "15 minutos de apresentação e 5 minutos de arguição",
      "Projetor e computador disponibilizados pela organização",
      "Apresentação entregue à comissão até 1 hora antes da sessão",
    ],
  },
  {
    slug: "palestra-ia-educacao",
    titulo: "Palestra: Inteligência artificial aplicada à educação",
    tipo: "palestra",
    dia: "23-10",
    hora: "09h00",
    horario: "09h00 às 10h30",
    local: "Auditório Central",
    vagas: "200 participantes",
    cargaHoraria: "1h30",
    palestrante: "marcos-vinicius-nunes",
    descricao: [
      "A palestra apresenta usos de inteligência artificial no apoio ao ensino e à avaliação, discutindo tanto o ganho pedagógico quanto os riscos de dependência, viés e desigualdade de acesso.",
    ],
    topicos: [
      "Tutores inteligentes e trilhas adaptativas",
      "Avaliação assistida por IA",
      "Ética, viés algorítmico e uso responsável em sala de aula",
    ],
  },
  {
    slug: "palestra-residuos-economia-circular",
    titulo: "Palestra: Gestão de resíduos sólidos e economia circular",
    tipo: "palestra",
    dia: "23-10",
    hora: "10h30",
    horario: "10h30 às 12h00",
    local: "Auditório Central",
    vagas: "200 participantes",
    cargaHoraria: "1h30",
    palestrante: "sonia-barros",
    descricao: [
      "Discussão sobre a Política Nacional de Resíduos Sólidos e experiências de economia circular em municípios paraenses, incluindo cooperativas de catadores e logística reversa.",
    ],
    topicos: [
      "Política Nacional de Resíduos Sólidos",
      "Coleta seletiva e cooperativas de catadores",
      "Indicadores de circularidade",
    ],
  },
  {
    slug: "minicurso-seguranca-informacao",
    titulo: "Minicurso: Segurança da informação para iniciantes",
    tipo: "minicurso",
    dia: "23-10",
    hora: "14h00",
    horario: "14h00 às 17h00",
    local: "Laboratório de Informática 1",
    vagas: "30 participantes",
    cargaHoraria: "3 horas",
    palestrante: "jorge-andrade",
    descricao: [
      "Introdução prática aos fundamentos de segurança da informação, com demonstrações de ataques comuns e das medidas de proteção correspondentes.",
    ],
    topicos: [
      "Autenticação, senhas e segundo fator",
      "Engenharia social e phishing",
      "Criptografia no dia a dia",
      "Boas práticas de proteção de dados pessoais",
    ],
  },
  {
    slug: "curso-libras-atendimento-saude",
    titulo: "Curso: Libras aplicada ao atendimento em saúde",
    tipo: "curso",
    dia: "23-10",
    hora: "14h00",
    horario: "14h00 às 18h00 (23 e 24/10)",
    local: "Sala 08 — Bloco A",
    vagas: "30 participantes",
    cargaHoraria: "8 horas",
    palestrante: "camila-rocha",
    descricao: [
      "Curso de extensão voltado ao atendimento de pessoas surdas em serviços de saúde, com vocabulário específico de acolhimento, triagem e orientação ao paciente.",
      "A certificação de 8 horas exige presença nos dois encontros.",
    ],
    topicos: [
      "Noções da Língua Brasileira de Sinais",
      "Vocabulário de acolhimento e triagem",
      "Comunicação com o paciente surdo e seus acompanhantes",
    ],
  },
  {
    slug: "exposicao-banners-sessao-2",
    titulo: "Exposição de Banners — Sessão 2",
    tipo: "banner",
    dia: "23-10",
    hora: "16h30",
    horario: "16h30 às 18h00",
    local: "Hall do Bloco B",
    descricao: [
      "Segunda sessão de exposição de pôsteres, com os trabalhos das áreas de Tecnologia e Meio Ambiente. A dinâmica e as orientações aos expositores são as mesmas da primeira sessão.",
    ],
    topicos: [
      "Pôster impresso em 90 cm × 120 cm, orientação vertical",
      "Montagem 30 minutos antes do início",
      "Avaliação por banca composta por docentes do CCNT",
    ],
  },
  {
    slug: "palestra-empreendedorismo-inovacao-social",
    titulo: "Palestra: Empreendedorismo e inovação social",
    tipo: "palestra",
    dia: "24-10",
    hora: "09h00",
    horario: "09h00 às 10h30",
    local: "Auditório Central",
    vagas: "200 participantes",
    cargaHoraria: "1h30",
    palestrante: "bruno-tavares",
    descricao: [
      "Apresentação de iniciativas de empreendedorismo com impacto social na região metropolitana de Belém e do papel da universidade na formação de empreendedores.",
    ],
    topicos: [
      "Modelos de negócio de impacto",
      "Incubadoras e programas de extensão",
      "Captação de recursos e editais públicos",
    ],
  },
  {
    slug: "mesa-redonda-cop30",
    titulo: "Mesa-redonda: COP30 e o papel da universidade",
    tipo: "mesa-redonda",
    dia: "24-10",
    hora: "10h30",
    horario: "10h30 às 12h00",
    local: "Auditório Central",
    vagas: "200 participantes",
    cargaHoraria: "1h30",
    palestrante: "ana-beatriz-moraes",
    descricao: [
      "Mesa-redonda com pesquisadores das quatro áreas temáticas do evento sobre a contribuição da universidade pública para a agenda climática e para os compromissos assumidos na COP30.",
      "A mesa reúne docentes das áreas de Educação, Saúde, Tecnologia e Meio Ambiente, com espaço para perguntas do público na segunda metade da atividade.",
    ],
  },
  {
    slug: "minicurso-qgis",
    titulo: "Minicurso: Georreferenciamento com QGIS",
    tipo: "minicurso",
    dia: "24-10",
    hora: "14h00",
    horario: "14h00 às 17h00",
    local: "Laboratório de Informática 2",
    vagas: "25 participantes",
    cargaHoraria: "3 horas",
    palestrante: "iran-sousa",
    descricao: [
      "Minicurso prático de introdução ao QGIS, com produção de mapas temáticos a partir de bases públicas de dados territoriais e ambientais.",
    ],
    topicos: [
      "Interface do QGIS e sistemas de coordenadas",
      "Camadas vetoriais e raster",
      "Mapas temáticos e exportação para publicação",
    ],
  },
  {
    slug: "apresentacao-artigos-sessao-2",
    titulo: "Apresentação de Artigos — Sessão 2",
    tipo: "artigo",
    dia: "24-10",
    hora: "16h00",
    horario: "16h00 às 18h00",
    local: "Sala 15 — Bloco B",
    descricao: [
      "Segunda sessão de comunicação oral, com os artigos aprovados nas áreas de Tecnologia e Meio Ambiente. Formato idêntico ao da primeira sessão.",
    ],
    topicos: [
      "15 minutos de apresentação e 5 minutos de arguição",
      "Certificado de apresentação emitido após a sessão",
    ],
  },
  {
    slug: "premiacao-encerramento",
    titulo: "Premiação e Solenidade de Encerramento",
    tipo: "cerimonia",
    dia: "24-10",
    hora: "18h00",
    horario: "18h00 às 19h30",
    local: "Auditório Central",
    descricao: [
      "Encerramento do evento com a divulgação dos melhores trabalhos das sessões de artigos e de banners e a entrega dos certificados de participação.",
    ],
  },
];

export type AreaTematica = "Educação" | "Saúde" | "Tecnologia" | "Meio Ambiente";

export const palestrantes = [
  {
    slug: "ana-beatriz-moraes",
    nome: "Dra. Ana Beatriz Moraes",
    area: "Meio Ambiente" as AreaTematica,
    titulacao: "Doutora em Desenvolvimento Sustentável do Trópico Úmido (UFPA)",
    instituicao: "Professora do CCNT/UEPA — Campus XXII",
    email: "ana.moraes@uepa.br",
    lattes: "https://lattes.cnpq.br/",
    bio: "Pesquisadora de sustentabilidade urbana na Amazônia, com trabalhos sobre gestão de resíduos sólidos e monitoramento ambiental de baixo custo.",
  },
  {
    slug: "paulo-henrique-farias",
    nome: "Dr. Paulo Henrique Farias",
    area: "Saúde" as AreaTematica,
    titulacao: "Doutor em Saúde Coletiva (UFPA)",
    instituicao: "Médico sanitarista — SESPA/PA",
    email: "paulo.farias@sespa.pa.gov.br",
    lattes: "https://lattes.cnpq.br/",
    bio: "Atua na implantação de serviços de saúde digital na rede pública, com experiência em teleconsulta e telediagnóstico na atenção básica.",
  },
  {
    slug: "fernanda-castro",
    nome: "Me. Fernanda Castro",
    area: "Tecnologia" as AreaTematica,
    titulacao: "Mestra em Engenharia de Energia (UFPA)",
    instituicao: "Pesquisadora em energias renováveis",
    email: "fernanda.castro@ufpa.br",
    lattes: "https://lattes.cnpq.br/",
    bio: "Pesquisa sistemas híbridos de geração solar e biomassa para comunidades isoladas da Amazônia.",
  },
  {
    slug: "marcos-vinicius-nunes",
    nome: "Dr. Marcos Vinícius Nunes",
    area: "Educação" as AreaTematica,
    titulacao: "Doutor em Informática na Educação (UFRGS)",
    instituicao: "Professor do IFPA — Campus Belém",
    email: "marcos.nunes@ifpa.edu.br",
    lattes: "https://lattes.cnpq.br/",
    bio: "Trabalha com tecnologias digitais aplicadas ao ensino e uso responsável de inteligência artificial em sala de aula.",
  },
  {
    slug: "sonia-barros",
    nome: "Dra. Sônia Barros",
    area: "Meio Ambiente" as AreaTematica,
    titulacao: "Doutora em Ciências Ambientais (UEPA)",
    instituicao: "Professora do CCNT/UEPA",
    email: "sonia.barros@uepa.br",
    lattes: "https://lattes.cnpq.br/",
    bio: "Pesquisa gestão de resíduos sólidos, coleta seletiva e economia circular em municípios paraenses.",
  },
  {
    slug: "bruno-tavares",
    nome: "Esp. Bruno Tavares",
    area: "Tecnologia" as AreaTematica,
    titulacao: "Especialista em Arquitetura de Software",
    instituicao: "Cofundador da Startup Pará",
    email: "bruno.tavares@startuppara.com.br",
    lattes: "https://lattes.cnpq.br/",
    bio: "Empreendedor e mentor de negócios de impacto social e ambiental criados por egressos da universidade pública.",
  },
  {
    slug: "iran-sousa",
    nome: "Prof. Dr. Iran Sousa",
    area: "Meio Ambiente" as AreaTematica,
    titulacao: "Doutor em Geografia (UFPA)",
    instituicao: "Professor do CCNT/UEPA",
    email: "iran.sousa@uepa.br",
    lattes: "https://lattes.cnpq.br/",
    bio: "Trabalha com geoprocessamento e análise territorial aplicada a estudos ambientais na região metropolitana de Belém.",
  },
  {
    slug: "larissa-pinto",
    nome: "Prof.ª Me. Larissa Pinto",
    area: "Educação" as AreaTematica,
    titulacao: "Mestra em Educação (UEPA)",
    instituicao: "Professora de metodologias ativas",
    email: "larissa.pinto@uepa.br",
    lattes: "https://lattes.cnpq.br/",
    bio: "Pesquisadora de formação docente, aprendizagem baseada em problemas e avaliação formativa.",
  },
  {
    slug: "camila-rocha",
    nome: "Enf.ª Esp. Camila Rocha",
    area: "Saúde" as AreaTematica,
    titulacao: "Especialista em Urgência e Emergência (UEPA)",
    instituicao: "Enfermeira e instrutora de primeiros socorros",
    email: "camila.rocha@uepa.br",
    lattes: "https://lattes.cnpq.br/",
    bio: "Instrutora de primeiros socorros e de comunicação em Libras no atendimento a pacientes surdos.",
  },
  {
    slug: "jorge-andrade",
    nome: "Esp. Jorge Andrade",
    area: "Tecnologia" as AreaTematica,
    titulacao: "Especialista em Segurança da Informação",
    instituicao: "Analista de segurança e professor convidado do Campus XXII",
    email: "jorge.andrade@uepa.br",
    lattes: "https://lattes.cnpq.br/",
    bio: "Atua em segurança da informação, proteção de dados pessoais e conscientização sobre engenharia social.",
  },
  {
    slug: "rafael-souza-lima",
    nome: "Me. Rafael Souza Lima",
    area: "Tecnologia" as AreaTematica,
    titulacao: "Mestre em Ciência da Computação (UFPA)",
    instituicao: "Professor do Bacharelado em Engenharia de Software — Campus XXII",
    email: "rafael.lima@uepa.br",
    lattes: "https://lattes.cnpq.br/",
    bio: "Trabalha com engenharia de software, infraestrutura de containers e ensino de programação para iniciantes.",
  },
] as const;

export const cotas = ["Patrocínio Master", "Patrocínio Ouro", "Apoio Institucional"] as const;

export const patrocinadores = [
  { nome: "Instituto Amazônia Sustentável", cota: "Patrocínio Master", url: "https://www.google.com/search?q=Instituto+Amaz%C3%B4nia+Sustent%C3%A1vel" },
  { nome: "Grupo Belém Energia", cota: "Patrocínio Master", url: "https://www.google.com/search?q=Grupo+Bel%C3%A9m+Energia" },
  { nome: "TechPará Soluções", cota: "Patrocínio Ouro", url: "https://www.google.com/search?q=TechPar%C3%A1+Solu%C3%A7%C3%B5es" },
  { nome: "Clínica Vida Saudável", cota: "Patrocínio Ouro", url: "https://www.google.com/search?q=Cl%C3%ADnica+Vida+Saud%C3%A1vel+Ananindeua" },
  { nome: "Editora Norte", cota: "Patrocínio Ouro", url: "https://www.google.com/search?q=Editora+Norte" },
  { nome: "PROPESP/UEPA", cota: "Apoio Institucional", url: "https://www.uepa.br" },
  { nome: "PROGRAD/UEPA", cota: "Apoio Institucional", url: "https://www.uepa.br" },
  { nome: "Prefeitura de Ananindeua", cota: "Apoio Institucional", url: "https://www.ananindeua.pa.gov.br" },
  { nome: "CREA-PA", cota: "Apoio Institucional", url: "https://www.creapa.org.br" },
] as const;

export const materiais = [
  {
    nome: "Template de artigo completo",
    formato: "DOCX · até 10 páginas",
    descricao: "Modelo com formatação exigida para submissão de artigos completos nas quatro áreas temáticas.",
    url: "https://docs.google.com/document/d/template-artigo-semana-academica-campus-xxii",
  },
  {
    nome: "Template de pôster",
    formato: "PPTX · 90 cm × 120 cm",
    descricao: "Modelo de pôster para a Exposição de Banners, com a identidade visual do evento já aplicada.",
    url: "https://docs.google.com/presentation/d/template-poster-semana-academica-campus-xxii",
  },
  {
    nome: "Modelo de apresentação oral",
    formato: "PPTX · 16:9",
    descricao: "Modelo de slides para as sessões de apresentação de artigos.",
    url: "https://docs.google.com/presentation/d/template-slides-semana-academica-campus-xxii",
  },
] as const;

export const prazos = [
  { data: "30/09/2025", etapa: "Prazo final de submissão de artigos e resumos" },
  { data: "08/10/2025", etapa: "Divulgação dos trabalhos aprovados" },
  { data: "15/10/2025", etapa: "Envio da versão final e do pôster" },
  { data: "21 a 24/10", etapa: "Apresentação durante o evento" },
] as const;

export const regrasSubmissao = [
  'Os trabalhos devem ser enviados para semanaacademica.campusxxii@uepa.br com o assunto "Submissão — Semana Acadêmica".',
  "São aceitos artigos completos (até 10 páginas) e resumos expandidos (até 4 páginas).",
  "Cada trabalho pode ter no máximo cinco autores, incluindo o orientador.",
  "Os trabalhos aprovados são publicados nos anais eletrônicos do evento.",
] as const;

export const rotulosTipo: Record<TipoAtividade, string> = {
  palestra: "Palestra",
  minicurso: "Minicurso",
  curso: "Curso",
  banner: "Exposição",
  artigo: "Artigos",
  "mesa-redonda": "Mesa-redonda",
  cerimonia: "Cerimônia",
  organizacao: "Organização",
};

export const porTipo = (...tipos: TipoAtividade[]) => atividades.filter((a) => tipos.includes(a.tipo));

export const palestrantePor = (slug?: string) => palestrantes.find((p) => p.slug === slug);

/** Tipos que o participante pode escolher na inscrição (RN-05). Espelha o catálogo da API. */
export const tiposSelecionaveis: TipoAtividade[] = ["palestra", "minicurso", "curso", "banner", "artigo"];

export const catalogoSelecionavel = porTipo(...tiposSelecionaveis).map((a) => ({
  slug: a.slug,
  titulo: a.titulo,
  tipo: a.tipo,
  tipoRotulo: { palestra: "Palestras", minicurso: "Minicursos", curso: "Cursos", banner: "Exposição de Banners", artigo: "Apresentação de artigos" }[a.tipo as string]!,
  dia: dias.find((d) => d.id === a.dia)!.rotulo,
  horario: a.horario,
  local: a.local,
  vagas: a.vagas,
}));

/** Caminho da página única de atividades com a atividade selecionada (RN-06). */
export const linkAtividade = (slug: string, de?: string) =>
  `/atividades?atividade=${slug}${de ? `&de=${de}` : ""}`;
