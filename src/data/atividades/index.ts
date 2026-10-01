import type { Atividade } from "../tipos";
import { atividadesDia21 } from "./dia-21";
import { atividadesDia22 } from "./dia-22";
import { atividadesDia23 } from "./dia-23";
import { atividadesDia24 } from "./dia-24";

/** Programação completa, na ordem dos dias. */
export const atividades: Atividade[] = [...atividadesDia21, ...atividadesDia22, ...atividadesDia23, ...atividadesDia24];
