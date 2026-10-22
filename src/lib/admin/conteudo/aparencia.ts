/** Editor de aparência: banner, paleta de cores e ícones por posição (slot). */
import opcoes from "../../../data/opcoes.json";
import { esc } from "../../api";
import { obterConteudo, previa, type Aparencia, type Conteudo } from "../../conteudo";
import { BASE } from "../http";
import { toast } from "../interacao";
import { enviarBanner, prepararImagem, removerBanner } from "./banner";
import { campo, caixaErro, erroDe, secao, seletorIcone, type Erros } from "./form";
import { aoMudarCor, cartoesPaleta, ligarPaletaPersonalizada, secaoPersonalizada, validarPaleta } from "./paleta";
import { montarEditor } from "./editor";

const ORIGENS: [string, string][] = [["padrao", "Banner padrão do site"], ["enviado", "Imagem enviada"], ["url", "Endereço (URL) de uma imagem"]];

export async function iniciarAparencia(raiz: HTMLElement, bannerPadrao: string) {
  let c = await obterConteudo();
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
      secao("Paleta de cores", cartoesPaleta(a) + secaoPersonalizada(a, erros), "Cada cor ocupa sempre o mesmo lugar no site; você escolhe uma paleta pronta ou define as suas. A prévia vale já nesta tela."),
      secao("Ícones", `<div class="grid gap-3 lg:grid-cols-2">${slots}</div>`, "Cada posição tem um ícone fixo em todo o site; trocar aqui muda em todos os lugares em que ela aparece."),
    ].join("");
  };

  const editor = montarEditor<Aparencia>({
    raiz, parte: "aparencia", estado, desenhar,
    mensagem: "Aparência salva. As mudanças já aparecem em todo o site.",
    corpo: (a) => ({ paleta: a.paleta, coresPersonalizadas: a.coresPersonalizadas, icones: a.icones, banner: { origem: a.banner.origem, url: a.banner.url, alt: a.banner.alt } }),
    validar: (a): Erros => ({
      ...(a.banner.origem === "url" && !/^https?:\/\//.test(a.banner.url) ? { "banner.url": "Informe um endereço http:// ou https://." } : {}),
      ...validarPaleta(a),
    }),
    aoMudar: (nome) => {
      if (nome === "paleta") {
        previa(estado);
        editor.redesenhar();
      }
      if (nome.startsWith("coresPersonalizadas.")) aoMudarCor(raiz, estado, nome);
      if (nome === "banner.origem") editor.redesenhar();
      if (nome === "banner.url") document.getElementById("previa-banner")!.innerHTML = previaBanner(estado);
    },
    aoSalvar: (novo: Conteudo) => { c = novo; estado.banner.versao = novo.aparencia.banner.versao; },
    aoRestaurar: (novo) => { c = novo; Object.assign(estado, structuredClone(novo.aparencia)); },
  });
  ligarPaletaPersonalizada(raiz, estado, editor.redesenhar);

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
  window.addEventListener("pagehide", () => previa(c.aparencia)); // prévia não salva não persiste
}
