import{o as e}from"./api.Ctn0ZKft.js";import{D as t,g as n,h as r,m as i,y as a}from"./conteudo.Hkie4P02.js";import{t as o}from"./url.BZsx2vMl.js";var s=e=>o(`/noticias?n=${encodeURIComponent(e)}`),c=e=>a(e).toLocaleDateString(`pt-BR`,{day:`numeric`,month:`long`,year:`numeric`,timeZone:`UTC`}),l=e=>/^https?:\/\//i.test(e)?e:``,u=e=>[...e.noticias??[]].reverse().sort((e,t)=>t.data.localeCompare(e.data)),d=(t,n)=>l(t.imagem)?`<img src="${e(l(t.imagem))}" alt="${e(t.imagemAlt)}" loading="lazy" class="${n}" />`:``;function f(n,r,i){let a=r=>e(t(n,r,i));return`<article class="flex min-w-0 flex-col overflow-hidden rounded-cartao border border-borda bg-white shadow-[0_1px_3px_rgba(15,41,8,0.08)]">
    ${d(r,`h-40 w-full object-cover`)}
    <div class="flex flex-1 flex-col gap-2 p-5">
      <time datetime="${e(r.data)}" class="text-[13px] font-semibold text-verde-medio">${e(c(r.data))}</time>
      <h2 class="text-lg leading-[1.4] font-semibold text-verde-escuro">${a(r.titulo)}</h2>
      <p class="text-[15px] leading-normal text-chumbo">${a(r.resumo)}</p>
      <a href="${e(s(r.slug))}" class="mt-auto pt-1 text-sm font-semibold text-azul hover:underline">Ler notícia →</a>
    </div></article>`}function p(n,r,i){let a=r=>e(t(n,r,i));return`<article class="mx-auto flex max-w-3xl flex-col gap-3 rounded-cartao border border-borda bg-white p-5 md:p-7">
    <a href="${e(o(`/noticias`))}" class="text-sm font-semibold text-azul hover:underline">← Todas as notícias</a>
    <time datetime="${e(r.data)}" class="text-[13px] font-semibold text-verde-medio">${e(c(r.data))}</time>
    <h2 class="text-2xl leading-[1.3] font-bold text-verde-escuro">${a(r.titulo)}</h2>
    <p class="text-[15px] font-medium leading-normal text-chumbo">${a(r.resumo)}</p>
    ${d(r,`h-auto max-h-[420px] w-full rounded-campo object-cover`)}
    ${r.corpo.map(e=>`<p class="text-[15px] leading-relaxed text-chumbo">${a(e)}</p>`).join(``)}
    ${l(r.link)?`<a href="${e(l(r.link))}" target="_blank" rel="noopener" class="self-start text-sm font-semibold text-azul hover:underline">Saiba mais ↗</a>`:``}
  </article>`}async function m(){let e=await i(),a=await n();r(e,a);let o=document.getElementById(`noticias`),s=new URLSearchParams(location.search).get(`n`),c=u(e),l=s?c.find(e=>e.slug===s):void 0;if(l){document.title=`${t(e,l.titulo,a)} · ${t(e,`{{nome}}`,a)}`,o.innerHTML=p(e,l,a);return}let d=s?`<p class="mb-3 rounded-campo border border-borda bg-white p-3 text-sm text-chumbo" role="status">Notícia não encontrada. Veja as demais abaixo.</p>`:``;o.innerHTML=c.length?`${d}<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${c.map(t=>f(e,t,a)).join(``)}</div>`:`${d}<p class="text-sm text-texto-suave">Nenhuma notícia publicada.</p>`}export{m as n,u as r,f as t};