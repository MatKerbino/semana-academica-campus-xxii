import { esc } from "../api";
import { aplicarConteudo, atividadesDe, extrasTexto, icone, linkAtividade, obterConteudo, type Palestrante } from "../conteudo";
import { url } from "../url";
import { montarAbas } from "./abas";

const GRUPOS = [
  { id: "mesas", rotulo: "Mesas-redondas", tipos: ["mesa-redonda"] },
  { id: "minicursos", rotulo: "Minicursos e oficinas", tipos: ["minicurso"] },
  { id: "cursos", rotulo: "Cursos", tipos: ["curso"] },
  { id: "outros", rotulo: "Outras atividades", tipos: ["abertura", "encerramento", "campanha", "exibicao", "mostra", "outro", "palestra", "banner", "artigo"] },
];

const iniciais = (nome: string) => {
  const partes = nome.split(" - ")[0].split(" ").filter((n) => n && !n.endsWith("."));
  return (partes[0]?.[0] ?? "") + (partes.length > 1 ? partes[partes.length - 1][0] : "");
};
const semPrefixo = (t: string) => t.replace(/^(Minicurso|Oficina|Curso|Mesa-redonda \d+):\s*/, "");

export async function iniciar() {
  const c = await obterConteudo();
  aplicarConteudo(c, await extrasTexto());
  const suas = (p: Palestrante) => atividadesDe(c, p.slug);

  const cartao = (p: Palestrante) => {
    const ativ = suas(p);
    return `<article class="flex flex-col gap-1.5 rounded-cartao border border-verde-medio bg-palha p-4">
      <span class="flex size-11 items-center justify-center rounded-full bg-verde-medio text-sm font-bold text-white" aria-hidden="true">${esc(iniciais(p.nome))}</span>
      <h2 class="text-base leading-tight font-bold text-verde-escuro">${esc(p.nome)}</h2>
      ${p.cargo ? `<p class="text-tabela text-chumbo">${esc(p.cargo)}</p>` : ""}
      ${p.bio ? `<details class="text-tabela text-chumbo/80"><summary class="cursor-pointer font-semibold text-verde-medio">Currículo resumido</summary><p class="mt-1">${esc(p.bio)}</p></details>` : ""}
      ${ativ.length ? `<p class="text-tabela text-chumbo/80">${ativ.map((a) => `<a href="${esc(url(linkAtividade(a.slug)))}" class="text-azul hover:underline">${esc(semPrefixo(a.titulo))}</a>`).join('<span class="text-chumbo/40">, </span>')}</p>` : ""}
      ${p.email || p.lattes ? `<div class="mt-auto pt-1 text-tabela font-semibold">
        ${p.email ? `<a href="mailto:${esc(p.email)}" class="flex items-center gap-1.5 break-all text-azul hover:underline">${icone("mail", "size-3.5")}${esc(p.email)}</a>` : ""}
        ${p.lattes ? `<a href="${esc(p.lattes)}" target="_blank" rel="noopener" class="mt-0.5 flex items-center gap-1.5 text-azul hover:underline">${icone("globe", "size-3.5")}Currículo Lattes</a>` : ""}
      </div>` : ""}
    </article>`;
  };

  const grupos = GRUPOS.map((g) => ({
    ...g,
    pessoas: c.palestrantes.filter((p) => suas(p).some((x) => g.tipos.includes(x.tipo))),
  }));
  grupos.push({ id: "sem", rotulo: "Convidados sem atividade", tipos: [], pessoas: c.palestrantes.filter((p) => !suas(p).length) });
  const abas = grupos.filter((g) => g.pessoas.length).map((g) => ({
    id: g.id, rotulo: g.rotulo, classe: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", html: g.pessoas.map(cartao).join(""),
  }));
  const raiz = document.getElementById("abas")!;
  if (abas.length) montarAbas(raiz, "Atividades ministradas", abas);
  else raiz.innerHTML = '<p class="text-sm text-texto-suave">Nenhum palestrante cadastrado.</p>';
}
