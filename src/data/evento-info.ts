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
