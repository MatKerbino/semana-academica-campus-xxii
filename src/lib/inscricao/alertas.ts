import { ico } from "../visao";

/** Caixa de erro (role=alert) usada no topo da revisão. */
export const caixaErro = (titulo: string, texto: string) =>
  `<div role="alert" class="flex items-start gap-3 rounded-campo border border-erro-borda bg-erro-fundo p-4"><span class="mt-0.5 text-erro">${ico("circulo-x", "size-5")}</span><div><p class="text-sm leading-[1.4] font-semibold text-erro">${titulo}</p><p class="text-[15px] leading-normal text-chumbo">${texto}</p></div></div>`;

/** Caixa informativa usada no topo da revisão. */
export const caixaInfo = (titulo: string, texto: string) =>
  `<div class="flex items-start gap-3 rounded-campo border border-info-borda bg-info-fundo p-4"><span class="mt-0.5 text-info-texto">${ico("info", "size-5")}</span><div><p class="text-sm leading-[1.4] font-semibold text-info-texto">${titulo}</p><p class="text-[15px] leading-normal text-chumbo">${texto}</p></div></div>`;
