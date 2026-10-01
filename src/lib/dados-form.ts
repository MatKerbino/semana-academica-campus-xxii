/** Formulário de dados pessoais (inscrição e edição): máscaras, leitura, preenchimento e validação. */
import { formatarData, sessao, soDigitos, type Dados } from "./api";
import { cpfValido } from "./validacao";

const fmtCpf = (d: string) => d.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
const fmtTel = (d: string) => d.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
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


/* ---- E-mail para contato: "o mesmo da conta" ou "outro" (o login da conta é um e-mail) ---- */
let comOpcoesDeEmail = false;

const elEmail = (form: HTMLFormElement) => ({
  opcoes: form.querySelector<HTMLElement>("[data-email-opcoes]")!,
  campo: form.querySelector<HTMLElement>("[data-email-campo]")!,
  bloco: form.querySelector<HTMLElement>("[data-email-bloco]")!,
  entrada: form.elements.namedItem("email") as HTMLInputElement,
  radio: (v: "conta" | "outro") => form.querySelector<HTMLInputElement>(`input[name=emailOrigem][value=${v}]`)!,
});

function mostrarCampoEmail(form: HTMLFormElement, outro: boolean, focar = false) {
  const el = elEmail(form);
  el.radio(outro ? "outro" : "conta").checked = true;
  el.campo.hidden = !outro;
  if (!outro) {
    el.entrada.value = "";
    el.entrada.removeAttribute("aria-invalid");
    form.querySelector<HTMLElement>("[data-erro=email]")!.textContent = "";
  } else if (focar) el.entrada.focus();
}

/** Com login em formato de e-mail, oferece as duas opções; senão (contas antigas) mantém o campo como sempre foi. */
export function prepararEmail(form: HTMLFormElement) {
  const login = sessao()?.usuario.login.trim().toLowerCase() ?? "";
  comOpcoesDeEmail = EMAIL.test(login);
  if (!comOpcoesDeEmail) return;
  const el = elEmail(form);
  form.dataset.emailConta = login;
  el.opcoes.hidden = false;
  el.bloco.classList.add("md:col-span-2");
  el.campo.classList.add("md:max-w-[calc(50%-0.5rem)]");
  form.querySelector("[data-email-conta]")!.textContent = login;
  mostrarCampoEmail(form, false);
  for (const v of ["conta", "outro"] as const) el.radio(v).addEventListener("change", () => mostrarCampoEmail(form, v === "outro", true));
}

export function preencherDados(form: HTMLFormElement, d: Dados) {
  const set = (n: string, v = "") => ((form.elements.namedItem(n) as HTMLInputElement).value = v);
  set("nome", d.nome);
  set("cpf", d.cpf ? fmtCpf(d.cpf) : "");
  const conta = form.dataset.emailConta;
  if (conta) {
    const outro = !!d.email && d.email.toLowerCase() !== conta;
    mostrarCampoEmail(form, outro);
    set("email", outro ? d.email : "");
  } else set("email", d.email);
  set("telefone", d.telefone ? fmtTel(d.telefone) : "");
  set("dataNascimento", d.dataNascimento ? formatarData(d.dataNascimento) : "");
  if (d.perfil) (form.querySelector(`input[name=perfil][value=${d.perfil}]`) as HTMLInputElement).checked = true;
}

export function lerDados(form: HTMLFormElement) {
  const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
  return {
    nome: d.nome?.trim(),
    cpf: soDigitos(d.cpf ?? ""),
    email: form.dataset.emailConta && d.emailOrigem !== "outro" ? form.dataset.emailConta : d.email?.trim().toLowerCase(),
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
  if (!EMAIL.test(d.email ?? "")) c.email = comOpcoesDeEmail ? "Informe um e-mail válido." : "Informe um e-mail válido, como nome@exemplo.com.";
  if (![10, 11].includes(d.telefone.length)) c.telefone = "Informe o telefone com DDD.";
  if (!dataValida(d.dataNascimento)) c.dataNascimento = "Informe sua data de nascimento.";
  if (!d.perfil) c.perfil = "Selecione um perfil.";
  return c;
}
