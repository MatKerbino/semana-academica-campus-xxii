/** "Restaurar padrão": volta uma parte do conteúdo (ou todas) aos valores de fábrica, com confirmação. */
import { previa, type Conteudo } from "../../conteudo";
import { restaurarParte, type ParteRestauravel } from "../conteudo-api";
import { icone } from "../icones";
import { toast } from "../interacao";
import { confirmarAcao } from "./crud";

const NAO_DESFAZ = "Esta ação não pode ser desfeita.";
const SE_RECUSAR = "Se isso deixar atividades fora do período ou sem os responsáveis, a restauração é recusada e nada muda.";

const AVISOS: Record<ParteRestauravel, { titulo: string; texto: string; pronto: string }> = {
  evento: { titulo: "Restaurar o evento?", texto: `Nome, organização, lema, descrição, datas, local, realização, e-mail e links voltam aos valores de fábrica. ${SE_RECUSAR}`, pronto: "Evento restaurado ao padrão." },
  aparencia: { titulo: "Restaurar a aparência?", texto: "Banner, paleta (inclusive a personalizada) e ícones voltam ao padrão. A imagem de banner enviada será apagada.", pronto: "Aparência restaurada ao padrão." },
  atividades: { titulo: "Restaurar as atividades?", texto: "Todas as atividades voltam à programação de fábrica: as que você criou ou alterou se perdem. É recusado se houver inscrições confirmadas em atividades que deixariam de existir.", pronto: "Atividades restauradas ao padrão." },
  palestrantes: { titulo: "Restaurar os palestrantes?", texto: `Todos os palestrantes voltam à lista de fábrica: os que você criou ou alterou se perdem. ${SE_RECUSAR}`, pronto: "Palestrantes restaurados ao padrão." },
  noticias: { titulo: "Restaurar as notícias?", texto: "Todas as notícias publicadas são apagadas: o padrão é nenhuma notícia.", pronto: "Notícias restauradas ao padrão." },
  quadros: { titulo: "Restaurar os quadros?", texto: "Os quadros da página inicial e os grupos de apoio voltam aos valores de fábrica.", pronto: "Quadros restaurados ao padrão." },
  informacoes: { titulo: "Restaurar as informações?", texto: "A página de informações do evento volta ao conteúdo de fábrica.", pronto: "Informações restauradas ao padrão." },
  tudo: { titulo: "Restaurar todo o conteúdo do site?", texto: `Evento, aparência (inclusive o banner enviado), atividades, palestrantes, notícias, quadros e informações voltam aos valores de fábrica. ${SE_RECUSAR}`, pronto: "Todo o conteúdo do site foi restaurado ao padrão." },
};

/** Botão que abre a confirmação (a ação é ligada por `ligarRestauracao`, por delegação). */
export const botaoRestaurar = (parte: ParteRestauravel, rotulo = "Restaurar padrão") =>
  `<button type="button" data-restaurar="${parte}" class="flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-erro-borda bg-white px-[22px] py-3 text-[15px] leading-[1.3] font-bold text-erro hover:bg-erro-fundo">${icone("undo-2", "size-[18px]")}${rotulo}</button>`;

/** Liga todo `[data-restaurar]` dentro de `raiz`; `aoConcluir` recebe o conteúdo restaurado para redesenhar a tela. */
export function ligarRestauracao(raiz: HTMLElement, aoConcluir: (c: Conteudo) => void) {
  raiz.addEventListener("click", (e) => {
    const botao = (e.target as HTMLElement).closest<HTMLElement>("[data-restaurar]");
    if (!botao) return;
    const parte = botao.dataset.restaurar as ParteRestauravel;
    const { titulo, texto, pronto } = AVISOS[parte];
    confirmarAcao({
      titulo, texto: `${texto} ${NAO_DESFAZ}`, rotuloOk: "Restaurar padrão",
      acao: async () => {
        const c = await restaurarParte(parte);
        previa(c.aparencia);
        aoConcluir(c);
        toast(pronto);
      },
    });
  });
}
