/** Atalho tipado para document.querySelector (o elemento precisa existir na página). */
export const $ = <T extends HTMLElement>(seletor: string) => document.querySelector<T>(seletor)!;
