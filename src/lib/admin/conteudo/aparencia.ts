/** Editor de aparência: banner, paleta de cores e ícones por posição (slot). */
import opcoes from "../../../data/opcoes.json";
import { esc } from "../../api";
import { aplicarPaleta, obterConteudo, type Aparencia, type Conteudo } from "../../conteudo";
import { toast } from "../interacao";
import { enviarBanner, prepararImagem, removerBanner } from "./banner";
import { campo, caixaErro, erroDe, secao, seletorIcone, type Erros } from "./form";
import { montarEditor } from "./editor";

const BASE = ((import.meta.env.PUBLIC_API_URL as string | undefined) ?? "").replace(/\/+$/, "");
const ORIGENS: [string, string][] = [["padrao", "Banner padrão do site"], ["enviado", "Imagem enviada"], ["url", "Endereço (URL) de uma imagem"]];

export async function iniciarAparencia(raiz: HTMLElement, bannerPadrao: string) {
  let c = await obterConteudo();
  let original = c.aparencia.paleta;
  const estado: Aparencia = structuredClone(c.aparencia);
  let avisoBanner = "";

  const previaBanner = (a: Aparencia) => {
    const b = a.banner;
    const src = b.origem === "enviado" ? `${BASE}/banner?v=${encodeURIComponent(b.versao ?? "")}` : b.origem === "url" ? b.url : bannerPadrao;
    return src ? `<img src="${esc(src)}" alt="Prévia do banner" class="h-auto max-h-[220px] w-full max-w-[520px] rounded-cartao border border-borda object-cover" />` : "";
  };

  const desenhar = (a: Aparencia, erros: Erros) => {
    const temEnviada = c.aparencia.banner.origem === "enviado" || a.banner.origem === "enviado";
    const radios = ORIGENS.map(([v, t]) => `<label class="flex cursor-pointer items-center gap-2 text-[15px] text-chumbo"><input type="radio" name="banner.origem" value="${v}" ${a.banner.origem === v ? "checked" : ""} ${v === "enviado" && !temEnviada ? "disabled" : ""} class="size-[18px] cursor-pointer accent-verde-medio" />${t}</label>`).join("");
    const paletas = opcoes.paletas.map((p) => `<label class="cursor-pointer"><input type="radio" class="peer sr-only" name="paleta" value="${p.id}" ${a.paleta === p.id ? "checked" : ""} />
      <span class="flex h-full flex-col gap-2 rounded-cartao border-[1.5px] border-borda bg-white p-3 peer-checked:border-2 peer-checked:border-verde-medio peer-checked:bg-entregue-fundo peer-focus-visible:outline-2 peer-focus-visible:outline-azul">
        <span class="flex gap-1">${["verde-escuro", "verde-medio", "verde-cta", "verde-claro", "creme", "palha"].map((t) => `<span class="size-7 rounded-full border border-black/10" style="background:${(p.cores as Record<string, string>)[t]}"></span>`).join("")}</span>
        <span class="text-sm font-semibold text-chumbo">${esc(p.rotulo)}</span></span></label>`).join("");
    const slots = opcoes.slotsIcones.map((s) => seletorIcone(`icones.${s.id}`, a.icones[s.id as keyof Aparencia["icones"]], s.rotulo)).join("");
    return [
      secao("Banner da página inicial", `<div class="flex flex-col gap-4">
          <fieldset class="flex flex-col gap-2"><legend class="mb-1 text-sm font-semibold text-chumbo">Origem da imagem</legend><div class="flex flex-wrap gap-x-6 gap-y-2">${radios}</div></fieldset>
          <div id="previa-banner">${previaBanner(a)}</div>
          ${a.banner.origem === "url" ? campo(a, "banner.url", "Endereço da imagem", erros, { tipo: "url", placeholder: "https://…" }) : ""}
          ${campo(a, "banner.alt", "Texto alternativo (acessibilidade)", erros, { ajuda: "Pode usar {{nome}}." })}
          <div class="flex flex-wrap items-center gap-3"><label class="flex cursor-pointer items-center gap-2 rounded-full border-2 border-verde-escuro bg-white px-[22px] py-2.5 text-[15px] font-bold text-verde-escuro hover:bg-palha">Enviar nova imagem
            <input type="file" id="arquivo-banner" accept="image/png,image/jpeg,image/webp" class="sr-only" /></label>
            ${c.aparencia.banner.origem === "enviado" ? `<button type="button" id="remover-banner" class="cursor-pointer rounded-full border-2 border-erro-borda bg-white px-[22px] py-2.5 text-[15px] font-bold text-erro">Remover imagem enviada</button>` : ""}</div>
          <div id="aviso-banner">${avisoBanner}</div>
          <p class="text-[13px] text-texto-suave">A imagem é reduzida automaticamente (até 300 KB) e passa a valer assim que você escolhe o arquivo. Depois, clique em “Salvar alterações” para gravar a origem e o texto alternativo.</p></div>`),
      secao("Paleta de cores", `<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">${paletas}</div>`, "Cada cor ocupa sempre o mesmo lugar no site; você só escolhe a paleta. A prévia vale já nesta tela."),
      secao("Ícones", `<div class="grid gap-3 lg:grid-cols-2">${slots}</div>`, "Cada posição tem um ícone fixo em todo o site; trocar aqui muda em todos os lugares em que ela aparece."),
    ].join("");
  };

  const editor = montarEditor<Aparencia>({
    raiz, parte: "aparencia", estado, desenhar,
    mensagem: "Aparência salva. As mudanças já aparecem em todo o site.",
    corpo: (a) => ({ paleta: a.paleta, icones: a.icones, banner: { origem: a.banner.origem, url: a.banner.url, alt: a.banner.alt } }),
    validar: (a): Erros => (a.banner.origem === "url" && !/^https?:\/\//.test(a.banner.url) ? { "banner.url": "Informe um endereço http:// ou https://." } : {}),
    aoMudar: (nome) => {
      if (nome === "paleta") aplicarPaleta(estado.paleta);
      if (nome === "banner.origem") editor.redesenhar();
      if (nome === "banner.url") document.getElementById("previa-banner")!.innerHTML = previaBanner(estado);
    },
    aoSalvar: (novo: Conteudo) => { c = novo; original = novo.aparencia.paleta; estado.banner.versao = novo.aparencia.banner.versao; },
  });

  const aviso = (msg: string, erro = false) => {
    avisoBanner = erro ? caixaErro(msg) : "";
    const el = document.getElementById("aviso-banner");
    if (el) el.innerHTML = avisoBanner;
  };
  const recarregar = (novo: Conteudo) => { c = novo; Object.assign(estado.banner, novo.aparencia.banner); editor.redesenhar(); };

  raiz.addEventListener("change", async (e) => {
    const input = e.target as HTMLInputElement;
    if (input.id !== "arquivo-banner" || !input.files?.[0]) return;
    try {
      aviso("");
      const img = await prepararImagem(input.files[0]);
      recarregar(await enviarBanner(img.tipo, img.base64));
      toast("Imagem enviada. O banner da página inicial já usa a nova imagem.");
    } catch (err) {
      aviso(err instanceof Error && !(err as { status?: number }).status ? err.message : erroDe(err).mensagem, true);
    }
  });
  raiz.addEventListener("click", async (e) => {
    if ((e.target as HTMLElement).id !== "remover-banner") return;
    try {
      recarregar(await removerBanner());
      toast("Imagem removida. O banner padrão voltou.");
    } catch (err) {
      aviso(erroDe(err).mensagem, true);
    }
  });
  window.addEventListener("pagehide", () => aplicarPaleta(original)); // prévia não salva não persiste
}
