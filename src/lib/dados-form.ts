/** Formulário de dados pessoais (inscrição e edição): máscaras, leitura, preenchimento e validação. */
import { formatarData, soDigitos, type Dados } from "./api";
import { cpfValido } from "./validacao";

const fmtCpf = (d: string) => d.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
const fmtTel = (d: string) => d.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
const paraIso = (br: string) => (/^\d{2}\/\d{2}\/\d{4}$/.test(br) ? br.split("/").reverse().join("-") : br);

export function ativarMascaras(form: HTMLFormElement) {
  const mascara = (nome: string, fn: (d: string) => string) =>
    form.elements.namedItem(nome)?.addEventListener("input", (e) => {
      const el = e.target as HTMLInputElement;
      el.value = fn(soDigitos(el.value));
    });
  mascara("cpf", (d) => d.slice(0, 11).replace(/^(\d{3})(\d{0,3})(\d{0,3})(\d{0,2}).*/, (_, a, b, c, e) => [a, b && `.${b}`, c && `.${c}`, e && `-${e}`].join("")));
  mascara("telefone", (d) => {
    d = d.slice(0, 11);
    const corte = d.length > 10 ? 7 : 6;
    return d.length > 6 ? `(${d.slice(0, 2)}) ${d.slice(2, corte)}-${d.slice(corte)}` : d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : d;
  });
  mascara("dataNascimento", (d) => d.slice(0, 8).replace(/^(\d{2})(\d{0,2})(\d{0,4}).*/, (_, a, b, c) => [a, b && `/${b}`, c && `/${c}`].join("")));
}

export function preencherDados(form: HTMLFormElement, d: Dados) {
  const set = (n: string, v = "") => ((form.elements.namedItem(n) as HTMLInputElement).value = v);
  set("nome", d.nome);
  set("cpf", d.cpf ? fmtCpf(d.cpf) : "");
  set("email", d.email);
  set("telefone", d.telefone ? fmtTel(d.telefone) : "");
  set("dataNascimento", d.dataNascimento ? formatarData(d.dataNascimento) : "");
  if (d.perfil) (form.querySelector(`input[name=perfil][value=${d.perfil}]`) as HTMLInputElement).checked = true;
}

export function lerDados(form: HTMLFormElement) {
  const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
  return {
    nome: d.nome?.trim(),
    cpf: soDigitos(d.cpf ?? ""),
    email: d.email?.trim().toLowerCase(),
    telefone: soDigitos(d.telefone ?? ""),
    dataNascimento: paraIso(d.dataNascimento ?? ""),
    perfil: d.perfil,
  };
}

const dataValida = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(a, m - 1, d));
  return /^\d{4}-\d{2}-\d{2}$/.test(iso) && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d && a >= 1900 && dt.getTime() <= Date.now();
};

/** Mensagens de erro do protótipo, por campo. */
export function validarDados(d: ReturnType<typeof lerDados>): Record<string, string> {
  const c: Record<string, string> = {};
  if (!d.nome || d.nome.length < 3) c.nome = "Informe seu nome completo.";
  if (!cpfValido(d.cpf)) c.cpf = "CPF inválido. Verifique os números.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email ?? "")) c.email = "Informe um e-mail válido, como nome@exemplo.com.";
  if (![10, 11].includes(d.telefone.length)) c.telefone = "Informe o telefone com DDD.";
  if (!dataValida(d.dataNascimento)) c.dataNascimento = "Informe sua data de nascimento.";
  if (!d.perfil) c.perfil = "Selecione um perfil.";
  return c;
}
