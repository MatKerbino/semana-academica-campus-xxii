import{c as e,d as t,l as n,o as r}from"./api.Ctn0ZKft.js";import{t as i}from"./url.BZsx2vMl.js";import{B as a,C as o,F as s,I as c,L as l,N as u,S as d,_ as f,a as p,b as m,h,m as g,n as _,p as v,t as y,u as b,w as x,x as S}from"./admin-api.C3ain_i-.js";if(o()){let o=document.getElementById(`conteudo`),C=new URLSearchParams(location.search).get(`login`)??``,w,T=null,E=sessionStorage.getItem(`admin:aviso`);sessionStorage.removeItem(`admin:aviso`);let D=(e,t)=>`<div><dt class="text-[13px] text-texto-suave">${e}</dt><dd class="text-[15px] leading-normal break-words text-chumbo">${r(t)}</dd></div>`,O=e=>{let n=e.pagamento??T;return n?n.modalidade===`monetaria`?`pagamento de ${t(n.valor??0)} por participante`:`${(n.descricao??``).replace(/^./,e=>e.toLowerCase())}`:``};function k(){let f=w,p=f.dados,h=p.nome??f.login,g=[...f.historico??[]].reverse().find(e=>e.evento.startsWith(`pagamento_`)),_=f.devolucao?.situacao===`pendente`?`Devolução de ${t(f.devolucao.valor??0)} pendente: o responsável pelo evento deve devolver o valor e o administrador registra a conclusão.`:f.devolucao?.situacao===`devolvido`?`Devolução de ${t(f.devolucao.valor??0)} registrada em ${v(f.devolucao.atualizadaEm)}.`:`Só existe devolução quando a forma é monetária e a inscrição é cancelada.`,x=[f.numero?`Nº ${f.numero}`:null,f.confirmadaEm?`confirmada em ${n(f.confirmadaEm.slice(0,10))}`:null,f.canceladaEm?`cancelada em ${n(f.canceladaEm.slice(0,10))}`:null,`conta ${f.login}`].filter(Boolean).join(` · `);o.innerHTML=`
        <div class="flex flex-col gap-3">
          <p class="text-[13px] text-texto-suave"><a href="${i(`/admin/inscricoes`)}" class="text-verde-medio hover:underline">Inscrições</a> <span class="mx-1">/</span> ${r(f.numero?`Nº ${f.numero}`:f.login)}</p>
          <h1 class="text-[32px] leading-[1.3] font-bold text-verde-escuro max-lg:text-[26px]">Inscrição de ${r(h)}</h1>
          <div class="flex flex-wrap items-center gap-3">${c(f.status,!0,`Inscrição `)}<span class="text-[13px] text-texto-suave max-lg:hidden">${r(x)}</span></div>
        </div>
        <div class="grid gap-6 lg:grid-cols-[1fr_332px]">
          <div class="flex flex-col gap-6 max-lg:order-2">
            <section class="${y.cartao}" aria-labelledby="t-dados"><h2 id="t-dados" class="${y.titulo} mb-4">Dados do participante</h2>
              <dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">${D(`Nome completo`,h)}${D(`CPF`,e(p.cpf))}${D(`E-mail`,p.email??`—`)}${D(`Telefone`,m(p.telefone))}${D(`Data de nascimento`,n(p.dataNascimento))}${D(`Perfil`,p.perfil?u[p.perfil]:`—`)}</dl></section>
            <section class="${y.cartao}" aria-labelledby="t-ativ"><h2 id="t-ativ" class="${y.titulo} mb-4">Atividades selecionadas (${f.atividades.length})</h2>
              <ul class="flex flex-col gap-3">${f.atividades.map(b).join(``)||`<li class="text-sm text-texto-suave">Nenhuma atividade selecionada.</li>`}</ul></section>
            <section class="${y.cartao} max-lg:hidden" aria-labelledby="t-hist"><h2 id="t-hist" class="${y.titulo} mb-3">Histórico da inscrição</h2>
              <ul class="flex flex-col gap-2.5">${S(f)}</ul></section>
          </div>
          <div class="flex flex-col gap-4 max-lg:order-1">
            <section class="${y.cartao} flex flex-col gap-3 !p-5" aria-labelledby="t-pag"><h2 id="t-pag" class="${y.titulo}">Pagamento ou compensação</h2>
              <p class="flex items-center gap-2 text-[13px] text-texto-suave">Situação atual: ${l(f,!0)}</p>
              ${O(f)?`<p class="flex items-start gap-2 text-[13px] leading-normal text-chumbo">${d(`sprout`,`mt-0.5 size-4 text-verde-medio`)}<span>Forma vigente: ${r(O(f))}</span></p>`:``}
              ${f.situacaoPagamento===`regularizada`&&g?`<p class="flex items-start gap-2 text-[13px] leading-normal text-chumbo">${d(`circle-check`,`mt-0.5 size-4 text-verde-medio`)}<span>Atualizado em ${v(g.em).replace(` `,` às `)}</span></p>`:``}
              ${f.status===`confirmada`?`<button type="button" data-atualizar class="${y.botaoPrimario}">${d(`pencil`)}Atualizar situação</button>`:``}</section>
            <section class="${y.cartao} flex flex-col gap-3 !p-5" aria-labelledby="t-dev"><h2 id="t-dev" class="${y.titulo}">Devolução do pagamento</h2>
              <div>${s(f,!0)}</div><p class="text-[13px] leading-normal text-texto-suave">${r(_)}</p>
              ${f.devolucao?`<a href="${i(`/admin/devolucoes`)}" class="text-sm font-bold text-verde-medio hover:underline">Ver em Devoluções</a>`:``}</section>
            <section class="${y.cartao} flex flex-col gap-3 !p-5 max-lg:hidden" aria-labelledby="t-pol"><h2 id="t-pol" class="${y.titulo}">Política de Privacidade</h2>
              <p class="flex items-start gap-2 text-[13px] leading-normal text-chumbo">${d(`circle-check`,`mt-0.5 size-4 text-verde-medio`)}<span>${f.aceiteEm?`Aceite registrado em ${v(f.aceiteEm).replace(` `,` às `)} · versão ${r(f.versaoPolitica??`1.0`)}`:`Aceite não registrado.`}</span></p></section>
          </div>
        </div>`,E&&=(a(E),null)}function A(){let e=w,t=e.dados.nome??e.login,{dialogo:n,fechar:i}=_(`
        <h2 class="${y.titulo} mb-3 !text-[20px]">Atualizar pagamento ou compensação</h2>
        <form class="flex flex-col gap-4" novalidate>
          <p class="text-[13px] leading-normal text-texto-suave">Inscrição nº ${r(e.numero??`—`)} · ${r(t)}. Somente esta inscrição será alterada.</p>
          <p class="flex items-center gap-2 text-[13px] text-texto-suave">Situação atual: ${l(e,!0)}</p>
          <fieldset class="flex flex-col gap-2"><legend class="mb-1 text-sm font-semibold text-chumbo">Nova situação</legend>
            <div class="flex gap-6">${[`pendente`,`regularizada`].map(t=>`<label class="flex cursor-pointer items-center gap-2 text-[15px] text-chumbo"><input type="radio" name="situacao" value="${t}" ${t===(e.situacaoPagamento===`regularizada`?`pendente`:`regularizada`)?`checked`:``} class="size-[18px] accent-verde-medio" />${t===`pendente`?`Pendente`:`Regularizada`}</label>`).join(``)}</div></fieldset>
          <label class="flex flex-col gap-1.5"><span class="text-sm font-semibold text-chumbo">Observação (opcional)</span>
            <span class="${y.campo}">${d(`user`,`size-5 text-chumbo`)}<input name="observacao" maxlength="200" class="${y.entrada}" /></span></label>
          <div data-erro-modal hidden role="alert" class="flex items-start gap-3 rounded-campo border border-erro-borda bg-erro-fundo p-4">${d(`circle-x`,`mt-0.5 size-5 text-erro`)}
            <div><p class="text-sm leading-[1.4] font-semibold text-erro">Não foi possível salvar</p><p data-erro-texto class="text-[15px] leading-normal text-chumbo"></p></div></div>
          <div class="flex flex-wrap justify-end gap-3"><button type="button" data-cancelar class="${y.botaoContorno}">Cancelar</button>
            <button type="submit" class="${y.botaoPrimario}">${d(`check`)}<span data-rotulo-salvar>Salvar situação</span></button></div>
        </form>`),a=n.querySelector(`form`);n.querySelector(`[data-cancelar]`).addEventListener(`click`,i),a.addEventListener(`submit`,async t=>{t.preventDefault();let n=Object.fromEntries(new FormData(a)),r=a.querySelector(`button[type=submit]`);r.disabled=!0,a.querySelector(`[data-erro-modal]`).hidden=!0;try{let t=await p(e.login,{situacao:n.situacao,...n.observacao?.trim()&&{observacao:n.observacao.trim()}});i(),w={...w,...t},E=`Situação atualizada para ${n.situacao===`regularizada`?`Regularizada`:`Pendente`} (inscrição nº ${w.numero??`—`}).`,k()}catch(e){let t=g(e),n=a.querySelector(`[data-erro-modal]`);n.querySelector(`[data-erro-texto]`).textContent=t.status===0?`A situação não foi alterada. Verifique a conexão e tente novamente.`:t.message,n.hidden=!1,a.querySelector(`[data-rotulo-salvar]`).textContent=`Tentar novamente`,r.disabled=!1}})}Promise.all([x(C),f().catch(()=>null)]).then(([e,t])=>{w=e,T=t,k(),o.addEventListener(`click`,e=>{e.target.closest(`[data-atualizar]`)&&A()})}).catch(e=>o.innerHTML=h(e))}