/**
 * Cliente e utilitários do painel administrativo (contrato em semana-academica-api/docs/API.md).
 * Reexporta os módulos de `src/lib/admin/`; as páginas continuam importando daqui.
 */
export { ApiError, caminho, esc, formatarCPF, formatarData, formatarMoeda, sair } from "./api";
export * from "./admin/http";
export * from "./admin/tipos";
export * from "./admin/painel";
export * from "./admin/recursos";
export * from "./admin/formatacao";
export * from "./admin/icones";
export * from "./admin/selos";
export * from "./admin/cartoes";
export * from "./admin/interacao";
export * from "./admin/componentes";
