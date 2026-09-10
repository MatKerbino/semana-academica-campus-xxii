/** Prefixa um caminho interno com o base do site (o GitHub Pages publica em subdiretório).
 *  URLs externas, mailto e âncoras passam sem alteração. */
export const url = (caminho: string) =>
  /^(https?:|mailto:|#)/.test(caminho)
    ? caminho
    : `${import.meta.env.BASE_URL}/${caminho}`.replace(/\/{2,}/g, "/");
