/** Banner: reduz a imagem escolhida no navegador (≤ 300 KB) e envia/remove pela API. */
import { enviarBanner, removerBanner } from "../conteudo-api";

const LIMITE = 300 * 1024;

/** Redimensiona e comprime até caber no limite; devolve tipo e base64. */
export async function prepararImagem(arquivo: File): Promise<{ tipo: string; base64: string; bytes: number }> {
  const bmp = await createImageBitmap(arquivo);
  for (const largura of [1600, 1200, 900, 640]) {
    const escala = Math.min(1, largura / bmp.width);
    const tela = document.createElement("canvas");
    tela.width = Math.round(bmp.width * escala);
    tela.height = Math.round(bmp.height * escala);
    tela.getContext("2d")!.drawImage(bmp, 0, 0, tela.width, tela.height);
    for (const q of [0.88, 0.75, 0.6, 0.45]) {
      const blob = await new Promise<Blob | null>((r) => tela.toBlob(r, "image/webp", q));
      const b = blob && blob.type === "image/webp" ? blob : await new Promise<Blob | null>((r) => tela.toBlob(r, "image/jpeg", q));
      if (b && b.size <= LIMITE) {
        const base64 = await new Promise<string>((res) => {
          const fr = new FileReader();
          fr.onload = () => res(String(fr.result).split(",")[1]);
          fr.readAsDataURL(b);
        });
        return { tipo: b.type, base64, bytes: b.size };
      }
    }
  }
  throw new Error("Não foi possível reduzir a imagem para menos de 300 KB. Escolha uma imagem menor.");
}

export { enviarBanner, removerBanner };
