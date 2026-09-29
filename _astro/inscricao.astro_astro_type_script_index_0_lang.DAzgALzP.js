import{c as e,d as t,l as n,o as r}from"./api.Ctn0ZKft.js";import{t as i}from"./url.BZsx2vMl.js";import{C as a,I as o,L as s,P as c,R as l,S as u,T as d,V as f,d as p,g as m,h,i as g,m as _,n as v,o as y,t as b,v as x,w as S,x as C}from"./admin-api.DckjMAJz.js";if(S()){let S=document.getElementById(`conteudo`),w=new URLSearchParams(location.search).get(`login`)??``,T,E=null,D=sessionStorage.getItem(`admin:aviso`);sessionStorage.removeItem(`admin:aviso`);let O=(e,t)=>`<div><dt class="text-[13px] text-texto-suave">${e}</dt><dd class="text-[15px] leading-normal break-words text-chumbo">${r(t)}</dd></div>`,k=e=>{let n=e.pagamento??E;return n?n.modalidade===`monetaria`?`pagamento de ${t(n.valor??0)} por participante`:`${(n.descricao??``).replace(/^./,e=>e.toLowerCase())}`:``};function A(){let d=T,m=d.dados,h=m.nome??d.login,v=[...d.historico??[]].reverse().find(e=>e.evento.startsWith(`pagamento_`)),y=d.devolucao?.situacao===`pendente`?`Devolução de ${t(d.devolucao.valor??0)} pendente: o responsável pelo evento deve devolver o valor e o administrador registra a conclusão.`:d.devolucao?.situacao===`devolvido`?`Devolução de ${t(d.devolucao.valor??0)} registrada em ${_(d.devolucao.atualizadaEm)}.`:`Só existe devolução quando a forma é monetária e a inscrição é cancelada.`,x=[d.numero?`Nº ${d.numero}`:null,d.confirmadaEm?`confirmada em ${n(d.confirmadaEm.slice(0,10))}`:null,d.canceladaEm?`cancelada em ${n(d.canceladaEm.slice(0,10))}`:null,`conta ${d.login}`].filter(Boolean).join(` · `);S.innerHTML=`
        <div class="flex flex-col gap-3">
          <p class="text-[13px] text-texto-suave"><a href="${i(`/admin/inscricoes`)}" class="text-verde-medio hover:underline">Inscrições</a> <span class="mx-1">/</span> ${r(d.numero?`Nº ${d.numero}`:d.login)}</p>
          <h1 class="text-[32px] leading-[1.3] font-bold text-verde-escuro max-lg:text-[26px]">Inscrição de ${r(h)}</h1>
          <div class="flex flex-wrap items-center gap-3">${s(d.status,!0,`Inscrição `)}<span class="text-[13px] text-texto-suave max-lg:hidden">${r(x)}</span></div>
        </div>
        <div class="grid gap-6 lg:grid-cols-[1fr_332px]">
          <div class="flex flex-col gap-6 max-lg:order-2">
            <section class="${b.cartao}" aria-labelledby="t-dados"><h2 id="t-dados" class="${b.titulo} mb-4">Dados do participante</h2>
              <dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">${O(`Nome completo`,h)}${O(`CPF`,e(m.cpf))}${O(`E-mail`,m.email??`—`)}${O(`Telefone`,C(m.telefone))}${O(`Data de nascimento`,n(m.dataNascimento))}${O(`Perfil`,m.perfil?c[m.perfil]:`—`)}</dl></section>
            <section class="${b.cartao}" aria-labelledby="t-ativ"><h2 id="t-ativ" class="${b.titulo} mb-4">Atividades selecionadas (${g(d.atividades).length})</h2>
              <ul class="flex flex-col gap-3">${g(d.atividades).map(p).join(``)||`<li class="text-sm text-texto-suave">Nenhuma atividade selecionada.</li>`}</ul></section>
            <section class="${b.cartao} max-lg:hidden" aria-labelledby="t-hist"><h2 id="t-hist" class="${b.titulo} mb-3">Histórico da inscrição</h2>
              <ul class="flex flex-col gap-2.5">${u(d)}</ul></section>
          </div>
          <div class="flex flex-col gap-4 max-lg:order-1">
            <section class="${b.cartao} flex flex-col gap-3 !p-5" aria-labelledby="t-pag"><h2 id="t-pag" class="${b.titulo}">Pagamento ou compensação</h2>
              <p class="flex items-center gap-2 text-[13px] text-texto-suave">Situação atual: ${l(d,!0)}</p>
              ${k(d)?`<p class="flex items-start gap-2 text-[13px] leading-normal text-chumbo">${a(`sprout`,`mt-0.5 size-4 text-verde-medio`)}<span>Forma vigente: ${r(k(d))}</span></p>`:``}
              ${d.situacaoPagamento===`regularizada`&&v?`<p class="flex items-start gap-2 text-[13px] leading-normal text-chumbo">${a(`circle-check`,`mt-0.5 size-4 text-verde-medio`)}<span>Atualizado em ${_(v.em).replace(` `,` às `)}</span></p>`:``}
              ${d.status===`confirmada`?`<button type="button" data-atualizar class="${b.botaoPrimario}">${a(`pencil`)}Atualizar situação</button>`:``}</section>
            <section class="${b.cartao} flex flex-col gap-3 !p-5" aria-labelledby="t-dev"><h2 id="t-dev" class="${b.titulo}">Devolução do pagamento</h2>
              <div>${o(d,!0)}</div><p class="text-[13px] leading-normal text-texto-suave">${r(y)}</p>
              ${d.devolucao?`<a href="${i(`/admin/devolucoes`)}" class="text-sm font-bold text-verde-medio hover:underline">Ver em Devoluções</a>`:``}</section>
            <section class="${b.cartao} flex flex-col gap-3 !p-5 max-lg:hidden" aria-labelledby="t-pol"><h2 id="t-pol" class="${b.titulo}">Política de Privacidade</h2>
              <p class="flex items-start gap-2 text-[13px] leading-normal text-chumbo">${a(`circle-check`,`mt-0.5 size-4 text-verde-medio`)}<span>${d.aceiteEm?`Aceite registrado em ${_(d.aceiteEm).replace(` `,` às `)} · versão ${r(d.versaoPolitica??`1.0`)}`:`Aceite não registrado.`}</span></p></section>
          </div>
        </div>`,D&&=(f(D),null)}function j(){let e=T,t=e.dados.nome??e.login,{dialogo:n,fechar:i}=v(`
        <h2 class="${b.titulo} mb-3 !text-[20px]">Atualizar pagamento ou compensação</h2>
        <form class="flex flex-col gap-4" novalidate>
          <p class="text-[13px] leading-normal text-texto-suave">Inscrição nº ${r(e.numero??`—`)} · ${r(t)}. Somente esta inscrição será alterada.</p>
          <p class="flex items-center gap-2 text-[13px] text-texto-suave">Situação atual: ${l(e,!0)}</p>
          <fieldset class="flex flex-col gap-2"><legend class="mb-1 text-sm font-semibold text-chumbo">Nova situação</legend>
            <div class="flex gap-6">${[`pendente`,`regularizada`].map(t=>`<label class="flex cursor-pointer items-center gap-2 text-[15px] text-chumbo"><input type="radio" name="situacao" value="${t}" ${t===(e.situacaoPagamento===`regularizada`?`pendente`:`regularizada`)?`checked`:``} class="size-[18px] accent-verde-medio" />${t===`pendente`?`Pendente`:`Regularizada`}</label>`).join(``)}</div></fieldset>
          <label class="flex flex-col gap-1.5"><span class="text-sm font-semibold text-chumbo">Observação (opcional)</span>
            <span class="${b.campo}">${a(`user`,`size-5 text-chumbo`)}<input name="observacao" maxlength="200" class="${b.entrada}" /></span></label>
          <div data-erro-modal hidden role="alert" class="flex items-start gap-3 rounded-campo border border-erro-borda bg-erro-fundo p-4">${a(`circle-x`,`mt-0.5 size-5 text-erro`)}
            <div><p class="text-sm leading-[1.4] font-semibold text-erro">Não foi possível salvar</p><p data-erro-texto class="text-[15px] leading-normal text-chumbo"></p></div></div>
          <div class="flex flex-wrap justify-end gap-3"><button type="button" data-cancelar class="${b.botaoContorno}">Cancelar</button>
            <button type="submit" class="${b.botaoPrimario}">${a(`check`)}<span data-rotulo-salvar>Salvar situação</span></button></div>
        </form>`),o=n.querySelector(`form`);n.querySelector(`[data-cancelar]`).addEventListener(`click`,i),o.addEventListener(`submit`,async t=>{t.preventDefault();let n=Object.fromEntries(new FormData(o)),r=o.querySelector(`button[type=submit]`);r.disabled=!0,o.querySelector(`[data-erro-modal]`).hidden=!0;try{let t=await y(e.login,{situacao:n.situacao,...n.observacao?.trim()&&{observacao:n.observacao.trim()}});i(),T={...T,...t},D=`Situação atualizada para ${n.situacao===`regularizada`?`Regularizada`:`Pendente`} (inscrição nº ${T.numero??`—`}).`,A()}catch(e){let t=h(e),n=o.querySelector(`[data-erro-modal]`);n.querySelector(`[data-erro-texto]`).textContent=t.status===0?`A situação não foi alterada. Verifique a conexão e tente novamente.`:t.message,n.hidden=!1,o.querySelector(`[data-rotulo-salvar]`).textContent=`Tentar novamente`,r.disabled=!1}})}Promise.all([d(w),x().catch(()=>null)]).then(([e,t])=>{T=e,E=t,A(),S.addEventListener(`click`,e=>{e.target.closest(`[data-atualizar]`)&&j()})}).catch(e=>S.innerHTML=m(e))}