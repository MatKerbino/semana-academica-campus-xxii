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
