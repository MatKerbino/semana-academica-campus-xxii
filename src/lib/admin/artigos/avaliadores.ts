/** Avaliadores: habilita ou remove o perfil de avaliador de usuários já cadastrados. */
import { esc } from "../../api";
import { definirAvaliador, usuarios } from "../../artigos/api";
import { CLASSES, cabecalhoPagina, erroCarregar, normalizar } from "../componentes";
import { barraBusca } from "../conteudo/crud";
import { erroDe } from "../conteudo/form";
import { toast } from "../interacao";

type Usuario = Awaited<ReturnType<typeof usuarios>>[number];

export async function iniciarAvaliadores(raiz: HTMLElement) {
  let lista: Usuario[];
  try {
    lista = await usuarios();
  } catch (e) {
    raiz.innerHTML = erroCarregar(e);
    return;
  }
  let busca = "";

  const linha = (u: Usuario) =>
    `<label class="${CLASSES.cartao} flex cursor-pointer items-center justify-between gap-3 !p-4"><span class="min-w-0"><span class="block truncate text-base font-semibold text-verde-escuro">${esc(u.nome ?? u.login)}</span>
      ${u.nome ? `<span class="block truncate text-[13px] text-texto-suave">${esc(u.login)}</span>` : ""}</span>
      <span class="flex shrink-0 items-center gap-2 text-sm font-semibold text-chumbo">Avaliador<input type="checkbox" data-login="${esc(u.login)}" ${u.avaliador ? "checked" : ""} class="size-5 accent-verde-medio" /></span></label>`;
  const desenharLista = () => {
    const itens = lista.filter((u) => !busca || normalizar(`${u.login} ${u.nome ?? ""}`).includes(normalizar(busca)));
    raiz.querySelector("#lista")!.innerHTML = itens.length ? itens.map(linha).join("") : `<p class="text-sm text-texto-suave">Nenhum usuário encontrado.</p>`;
  };

  raiz.innerHTML = `${cabecalhoPagina("Avaliadores", "Usuários cadastrados que podem receber artigos para avaliar. A conta continua a mesma: só o perfil muda.")}
    ${barraBusca("", "Buscar por e-mail ou nome", "sm:w-80")}<div id="lista" class="grid gap-3 lg:grid-cols-2"></div>`;
  desenharLista();

  raiz.addEventListener("input", (e) => {
    if ((e.target as HTMLElement).id !== "busca") return;
    busca = (e.target as HTMLInputElement).value;
    desenharLista();
  });
  raiz.addEventListener("change", async (e) => {
    const el = e.target as HTMLInputElement;
    const login = el.dataset.login;
    if (!login) return;
    el.disabled = true;
    try {
      await definirAvaliador(login, el.checked);
      lista.find((u) => u.login === login)!.avaliador = el.checked;
      toast(el.checked ? `${login} agora é avaliador.` : `${login} deixou de ser avaliador.`);
    } catch (err) {
      el.checked = !el.checked;
      el.closest("label")!.insertAdjacentHTML("afterend", `<p role="alert" class="text-[13px] text-erro">${esc(erroDe(err).mensagem)}</p>`);
    }
    el.disabled = false;
  });
}
