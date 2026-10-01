import{c as e,d as t,l as n,o as r}from"./api.Ctn0ZKft.js";import{t as i}from"./url.BZsx2vMl.js";import{A as a,D as o,K as s,L as c,N as l,R as u,_ as d,b as f,f as p,h as m,k as h,m as g,p as _,q as v,s as y,t as b,w as x,x as S,y as C}from"./admin-api.BUCry_s-.js";if(s()){let s=document.getElementById(`conteudo`),w=new URLSearchParams(location.search).get(`login`)??``,T,E=null,D=sessionStorage.getItem(`admin:aviso`);sessionStorage.removeItem(`admin:aviso`);let O=(e,t)=>`<div><dt class="text-[13px] text-texto-suave">${e}</dt><dd class="text-[15px] leading-normal break-words text-chumbo">${r(t)}</dd></div>`,k=e=>{let n=e.pagamento??E;return n?n.modalidade===`monetaria`?`pagamento de ${t(n.valor??0)} por participante`:`${(n.descricao??``).replace(/^./,e=>e.toLowerCase())}`:``};function A(){let c=T,l=c.dados,u=l.nome??c.login,p=[...c.historico??[]].reverse().find(e=>e.evento.startsWith(`pagamento_`)),v=c.devolucao?.situacao===`pendente`?`Devolução de ${t(c.devolucao.valor??0)} pendente: o responsável pelo evento deve devolver o valor e o administrador registra a conclusão.`:c.devolucao?.situacao===`devolvido`?`Devolução de ${t(c.devolucao.valor??0)} registrada em ${o(c.devolucao.atualizadaEm)}.`:`Só existe devolução quando a forma é monetária e a inscrição é cancelada.`,y=[c.numero?`Nº ${c.numero}`:null,c.confirmadaEm?`confirmada em ${n(c.confirmadaEm.slice(0,10))}`:null,c.canceladaEm?`cancelada em ${n(c.canceladaEm.slice(0,10))}`:null,`conta ${c.login}`].filter(Boolean).join(` · `);s.innerHTML=`
        <div class="flex flex-col gap-3">
          <p class="text-[13px] text-texto-suave"><a href="${i(`/admin/inscricoes`)}" class="text-verde-medio hover:underline">Inscrições</a> <span class="mx-1">/</span> ${r(c.numero?`Nº ${c.numero}`:c.login)}</p>
          <h1 class="text-[32px] leading-[1.3] font-bold text-verde-escuro max-lg:text-[26px]">Inscrição de ${r(u)}</h1>
          <div class="flex flex-wrap items-center gap-3">${f(c.status,!0,`Inscrição `)}<span class="text-[13px] text-texto-suave max-lg:hidden">${r(y)}</span></div>
        </div>
        <div class="grid gap-6 lg:grid-cols-[1fr_332px]">
          <div class="flex flex-col gap-6 max-lg:order-2">
            <section class="${b.cartao}" aria-labelledby="t-dados"><h2 id="t-dados" class="${b.titulo} mb-4">Dados do participante</h2>
              <dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">${O(`Nome completo`,u)}${O(`CPF`,e(l.cpf))}${O(`E-mail`,l.email??`—`)}${O(`Telefone`,h(l.telefone))}${O(`Data de nascimento`,n(l.dataNascimento))}${O(`Perfil`,l.perfil?a[l.perfil]:`—`)}</dl></section>
            <section class="${b.cartao}" aria-labelledby="t-ativ"><h2 id="t-ativ" class="${b.titulo} mb-4">Atividades selecionadas (${g(c.atividades).length})</h2>
              <ul class="flex flex-col gap-3">${g(c.atividades).map(m).join(``)||`<li class="text-sm text-texto-suave">Nenhuma atividade selecionada.</li>`}</ul></section>
            <section class="${b.cartao} max-lg:hidden" aria-labelledby="t-hist"><h2 id="t-hist" class="${b.titulo} mb-3">Histórico da inscrição</h2>
              <ul class="flex flex-col gap-2.5">${d(c)}</ul></section>
          </div>
          <div class="flex flex-col gap-4 max-lg:order-1">
            <section class="${b.cartao} flex flex-col gap-3 !p-5" aria-labelledby="t-pag"><h2 id="t-pag" class="${b.titulo}">Pagamento ou compensação</h2>
              <p class="flex items-center gap-2 text-[13px] text-texto-suave">Situação atual: ${S(c,!0)}</p>
              ${k(c)?`<p class="flex items-start gap-2 text-[13px] leading-normal text-chumbo">${x(`sprout`,`mt-0.5 size-4 text-verde-medio`)}<span>Forma vigente: ${r(k(c))}</span></p>`:``}
              ${c.situacaoPagamento===`regularizada`&&p?`<p class="flex items-start gap-2 text-[13px] leading-normal text-chumbo">${x(`circle-check`,`mt-0.5 size-4 text-verde-medio`)}<span>Atualizado em ${o(p.em).replace(` `,` às `)}</span></p>`:``}
              ${c.status===`confirmada`?`<button type="button" data-atualizar class="${b.botaoPrimario}">${x(`pencil`)}Atualizar situação</button>`:``}</section>
            <section class="${b.cartao} flex flex-col gap-3 !p-5" aria-labelledby="t-dev"><h2 id="t-dev" class="${b.titulo}">Devolução do pagamento</h2>
              <div>${C(c,!0)}</div><p class="text-[13px] leading-normal text-texto-suave">${r(v)}</p>
              ${c.devolucao?`<a href="${i(`/admin/devolucoes`)}" class="text-sm font-bold text-verde-medio hover:underline">Ver em Devoluções</a>`:``}</section>
            <section class="${b.cartao} flex flex-col gap-3 !p-5 max-lg:hidden" aria-labelledby="t-pol"><h2 id="t-pol" class="${b.titulo}">Política de Privacidade</h2>
              <p class="flex items-start gap-2 text-[13px] leading-normal text-chumbo">${x(`circle-check`,`mt-0.5 size-4 text-verde-medio`)}<span>${c.aceiteEm?`Aceite registrado em ${o(c.aceiteEm).replace(` `,` às `)} · versão ${r(c.versaoPolitica??`1.0`)}`:`Aceite não registrado.`}</span></p></section>
          </div>
        </div>`,D&&=(_(D),null)}function j(){let e=T,t=e.dados.nome??e.login,{dialogo:n,fechar:i}=p(`
        <h2 class="${b.titulo} mb-3 !text-[20px]">Atualizar pagamento ou compensação</h2>
        <form class="flex flex-col gap-4" novalidate>
          <p class="text-[13px] leading-normal text-texto-suave">Inscrição nº ${r(e.numero??`—`)} · ${r(t)}. Somente esta inscrição será alterada.</p>
          <p class="flex items-center gap-2 text-[13px] text-texto-suave">Situação atual: ${S(e,!0)}</p>
          <fieldset class="flex flex-col gap-2"><legend class="mb-1 text-sm font-semibold text-chumbo">Nova situação</legend>
            <div class="flex gap-6">${[`pendente`,`regularizada`].map(t=>`<label class="flex cursor-pointer items-center gap-2 text-[15px] text-chumbo"><input type="radio" name="situacao" value="${t}" ${t===(e.situacaoPagamento===`regularizada`?`pendente`:`regularizada`)?`checked`:``} class="size-[18px] accent-verde-medio" />${t===`pendente`?`Pendente`:`Regularizada`}</label>`).join(``)}</div></fieldset>
          <label class="flex flex-col gap-1.5"><span class="text-sm font-semibold text-chumbo">Observação (opcional)</span>
            <span class="${b.campo}">${x(`user`,`size-5 text-chumbo`)}<input name="observacao" maxlength="200" class="${b.entrada}" /></span></label>
          <div data-erro-modal hidden role="alert" class="flex items-start gap-3 rounded-campo border border-erro-borda bg-erro-fundo p-4">${x(`circle-x`,`mt-0.5 size-5 text-erro`)}
            <div><p class="text-sm leading-[1.4] font-semibold text-erro">Não foi possível salvar</p><p data-erro-texto class="text-[15px] leading-normal text-chumbo"></p></div></div>
          <div class="flex flex-wrap justify-end gap-3"><button type="button" data-cancelar class="${b.botaoContorno}">Cancelar</button>
            <button type="submit" class="${b.botaoPrimario}">${x(`check`)}<span data-rotulo-salvar>Salvar situação</span></button></div>
        </form>`),a=n.querySelector(`form`);n.querySelector(`[data-cancelar]`).addEventListener(`click`,i),a.addEventListener(`submit`,async t=>{t.preventDefault();let n=Object.fromEntries(new FormData(a)),r=a.querySelector(`button[type=submit]`);r.disabled=!0,a.querySelector(`[data-erro-modal]`).hidden=!0;try{let t=await l(e.login,{situacao:n.situacao,...n.observacao?.trim()&&{observacao:n.observacao.trim()}});i(),T={...T,...t},D=`Situação atualizada para ${n.situacao===`regularizada`?`Regularizada`:`Pendente`} (inscrição nº ${T.numero??`—`}).`,A()}catch(e){let t=v(e),n=a.querySelector(`[data-erro-modal]`);n.querySelector(`[data-erro-texto]`).textContent=t.status===0?`A situação não foi alterada. Verifique a conexão e tente novamente.`:t.message,n.hidden=!1,a.querySelector(`[data-rotulo-salvar]`).textContent=`Tentar novamente`,r.disabled=!1}})}Promise.all([u(w),c().catch(()=>null)]).then(([e,t])=>{T=e,E=t,A(),s.addEventListener(`click`,e=>{e.target.closest(`[data-atualizar]`)&&j()})}).catch(e=>s.innerHTML=y(e))}