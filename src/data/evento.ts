/*
 * Dados do evento. Fonte: página oficial do evento no Even3 (referenciada nos requisitos do projeto):
 * https://www.even3.com.br/e/i-semana-academica-da-uepa-ananindeua-624559
 * Atividades, horários, locais, convidados e trabalhos aprovados foram copiados de lá, sem acréscimos.
 * O que o Even3 não informa (vagas, descrições, Lattes, patrocinadores) fica ausente e não é exibido.
 *
 * Este arquivo só reexporta os módulos de `src/data/`; as páginas continuam importando daqui.
 */
export * from "./evento-info";
export * from "./tipos";
export * from "./atividades";
export * from "./palestrantes";
export * from "./apoio";
export * from "./artigos-materiais";
export * from "./trabalhos-aprovados";
export * from "./consultas";
