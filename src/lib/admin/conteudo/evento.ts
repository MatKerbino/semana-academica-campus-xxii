/** Editor do evento: nome, datas, local, realização e links da política e dos termos. */
import { esc } from "../../api";
import { obterConteudo, periodoTexto, type Conteudo, type Evento } from "../../conteudo";
import { campo, secao, type Erros } from "./form";
import { montarEditor } from "./editor";

type Estado = Evento & { deslocar: boolean };

export async function iniciarEvento(raiz: HTMLElement) {
  const c = await obterConteudo();
  let inicial = c.evento.dataInicio;
  const estado: Estado = { ...structuredClone(c.evento), deslocar: false };
  const temAtividades = c.atividades.length > 0;

  const desenhar = (e: Estado, erros: Erros) => {
    const mudouData = e.dataInicio !== inicial && temAtividades;
    return [
      secao("Identificação", [
        campo(e, "nome", "Nome do evento", erros, { obrigatorio: true, ajuda: "Aparece no cabeçalho, no rodapé, no título das abas, nas páginas e nos e-mails." }),
        campo(e, "organizacao", "Organização / campus", erros, { obrigatorio: true, ajuda: "Ex.: Campus XXII · UEPA. Aparece abaixo do nome no cabeçalho." }),
        campo(e, "lema", "Lema / tema", erros, { linhas: 2 }),
        campo(e, "descricao", "Descrição", erros, { linhas: 4 }),
        campo(e, "publico", "Público", erros, { linhas: 2 }),
        campo(e, "email", "E-mail de contato", erros, { obrigatorio: true, tipo: "email" }),
      ].join("")),
      secao("Data e período", `<div class="grid gap-4 sm:grid-cols-2">${campo(e, "dataInicio", "Primeiro dia", erros, { tipo: "date", obrigatorio: true })}${campo(e, "dataFim", "Último dia", erros, { tipo: "date", obrigatorio: true })}</div>
        <p class="text-[15px] text-chumbo">Como aparecerá no site: <strong id="previa-periodo">${esc(e.dataInicio && e.dataFim && e.dataInicio <= e.dataFim ? periodoTexto(e) : "—")}</strong></p>
        ${mudouData ? `<label class="flex cursor-pointer items-start gap-2.5 rounded-campo border border-info-borda bg-info-fundo p-4 text-[15px] text-chumbo"><input type="checkbox" name="deslocar" ${e.deslocar ? "checked" : ""} class="mt-0.5 size-[18px] cursor-pointer accent-verde-medio" /><span><strong>Deslocar as atividades junto com o evento.</strong> As datas de todas as sessões andam o mesmo número de dias do novo primeiro dia (o período precisa ter a mesma duração). Sem marcar, o salvamento é recusado se alguma atividade ficar fora do período.</span></label>` : ""}`,
      "O cronograma mostra um dia para cada data entre o primeiro e o último dia."),
      secao("Local", [
        campo(e, "local.nome", "Nome do local", erros, { obrigatorio: true }),
        campo(e, "local.curto", "Nome curto", erros, { obrigatorio: true, ajuda: "Usado no rodapé e na página inicial. Ex.: Campus XXII — Ananindeua/PA." }),
        campo(e, "local.endereco", "Endereço", erros),
        campo(e, "local.cidade", "Cidade / CEP", erros),
        campo(e, "local.mapsUrl", "Link do mapa (Google Maps)", erros, { tipo: "url", placeholder: "https://…" }),
        campo(e, "local.mapaEmbed", "Link do mapa incorporado (OpenStreetMap)", erros, { tipo: "url", placeholder: "https://…" }),
      ].join("")),
      secao("Realização", campo(e, "realizacao", "Realizadores (um por linha)", erros, { linhas: 4, lista: "linhas" })),
      secao("Documentos", [
        campo(e, "links.politicaPrivacidade", "Link da Política de Privacidade", erros, { tipo: "url", placeholder: "https://…", ajuda: "Vazio = usa a página interna do site. Preenchido = todos os links da política passam a abrir este endereço." }),
        campo(e, "links.termos", "Link dos Termos e Condições", erros, { tipo: "url", placeholder: "https://…", ajuda: "Vazio = o link não é exibido." }),
      ].join("")),
    ].join("");
  };

  const editor = montarEditor<Estado>({
    raiz, parte: "evento", estado, desenhar,
    mensagem: "Evento salvo. As mudanças já aparecem em todo o site.",
    corpo: ({ deslocar, ...evento }) => ({ ...evento, deslocarAtividades: deslocar }),
    validar: (e) => {
      const erros: Erros = {};
      if (!e.nome.trim()) erros.nome = "Informe o nome do evento.";
      if (!e.organizacao.trim()) erros.organizacao = "Informe a organização.";
      if (!/^\S+@\S+\.\S+$/.test(e.email)) erros.email = "Informe um e-mail válido.";
      if (!e.dataInicio) erros.dataInicio = "Informe o primeiro dia.";
      if (!e.dataFim) erros.dataFim = "Informe o último dia.";
      if (e.dataInicio && e.dataFim && e.dataInicio > e.dataFim) erros.dataFim = "O último dia não pode ser antes do primeiro.";
      if (!e.local.nome.trim()) erros["local.nome"] = "Informe o local.";
      if (!e.local.curto.trim()) erros["local.curto"] = "Informe o nome curto do local.";
      return erros;
    },
    aoMudar: (nome) => {
      if (nome === "dataInicio" || nome === "dataFim") {
        const p = document.getElementById("previa-periodo");
        if (p) p.textContent = estado.dataInicio && estado.dataFim && estado.dataInicio <= estado.dataFim ? periodoTexto(estado) : "—";
        // O aviso de deslocamento depende da data inicial: redesenha só quando ele deve aparecer ou sumir.
        const deveMostrar = estado.dataInicio !== inicial && temAtividades;
        if (deveMostrar !== !!document.querySelector("[name=deslocar]")) editor.redesenhar();
      }
    },
    aoSalvar: (novo: Conteudo) => {
      Object.assign(estado, structuredClone(novo.evento), { deslocar: false });
      inicial = novo.evento.dataInicio;
      editor.redesenhar();
    },
  });
}
