import{c as e,d as t,l as n,o as r}from"./api.Ctn0ZKft.js";import{t as i}from"./url.BZsx2vMl.js";import{B as a,C as o,E as s,F as c,J as l,M as u,S as d,X as f,f as p,g as m,h,j as g,k as _,m as v,p as y,s as b,t as x,v as S,x as C,z as w}from"./admin-api.5ads6g6F.js";if(l()){let l=document.getElementById(`conteudo`),T=new URLSearchParams(location.search).get(`login`)??``,E,D=null,O=sessionStorage.getItem(`admin:aviso`);sessionStorage.removeItem(`admin:aviso`);let k=(e,t)=>`<div><dt class="text-[13px] text-texto-suave">${e}</dt><dd class="text-[15px] leading-normal break-words text-chumbo">${r(t)}</dd></div>`,A=e=>{let n=e.pagamento??D;return n?n.modalidade===`monetaria`?`pagamento de ${t(n.valor??0)} por participante`:`${(n.descricao??``).replace(/^./,e=>e.toLowerCase())}`:``};function j(){let a=E,c=a.dados,f=c.nome??a.login,p=[...a.historico??[]].reverse().find(e=>e.evento.startsWith(`pagamento_`)),m=a.devolucao?.situacao===`pendente`?`Devolução de ${t(a.devolucao.valor??0)} pendente: o responsável pelo evento deve devolver o valor e o administrador registra a conclusão.`:a.devolucao?.situacao===`devolvido`?`Devolução de ${t(a.devolucao.valor??0)} registrada em ${_(a.devolucao.atualizadaEm)}.`:`Só existe devolução quando a forma é monetária e a inscrição é cancelada.`,b=[a.numero?`Nº ${a.numero}`:null,a.confirmadaEm?`confirmada em ${n(a.confirmadaEm.slice(0,10))}`:null,a.canceladaEm?`cancelada em ${n(a.canceladaEm.slice(0,10))}`:null,`conta ${a.login}`].filter(Boolean).join(` · `);l.innerHTML=`
        <div class="flex flex-col gap-3">
          <p class="text-[13px] text-texto-suave"><a href="${i(`/admin/inscricoes`)}" class="text-verde-medio hover:underline">Inscrições</a> <span class="mx-1">/</span> ${r(a.numero?`Nº ${a.numero}`:a.login)}</p>
          <h1 class="text-[32px] leading-[1.3] font-bold text-verde-escuro max-lg:text-[26px]">Inscrição de ${r(f)}</h1>
          <div class="flex flex-wrap items-center gap-3">${d(a.status,!0,`Inscrição `)}<span class="text-[13px] text-texto-suave max-lg:hidden">${r(b)}</span></div>
        </div>
        <div class="grid gap-6 lg:grid-cols-[1fr_332px]">
          <div class="flex flex-col gap-6 max-lg:order-2">
            <section class="${x.cartao}" aria-labelledby="t-dados"><h2 id="t-dados" class="${x.titulo} mb-4">Dados do participante</h2>
              <dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">${k(`Nome completo`,f)}${k(`CPF`,e(c.cpf))}${k(`E-mail`,c.email??`—`)}${k(`Telefone`,g(c.telefone))}${k(`Data de nascimento`,n(c.dataNascimento))}${k(`Perfil`,c.perfil?u[c.perfil]:`—`)}</dl></section>
            <section class="${x.cartao}" aria-labelledby="t-ativ"><h2 id="t-ativ" class="${x.titulo} mb-4">Atividades selecionadas (${v(a.atividades).length})</h2>
              <ul class="flex flex-col gap-3">${v(a.atividades).map(h).join(``)||`<li class="text-sm text-texto-suave">Nenhuma atividade selecionada.</li>`}</ul></section>
            <section class="${x.cartao} max-lg:hidden" aria-labelledby="t-hist"><h2 id="t-hist" class="${x.titulo} mb-3">Histórico da inscrição</h2>
              <ul class="flex flex-col gap-2.5">${S(a)}</ul></section>
          </div>
          <div class="flex flex-col gap-4 max-lg:order-1">
            <section class="${x.cartao} flex flex-col gap-3 !p-5" aria-labelledby="t-pag"><h2 id="t-pag" class="${x.titulo}">Pagamento ou compensação</h2>
              <p class="flex items-center gap-2 text-[13px] text-texto-suave">Situação atual: ${o(a,!0)}</p>
              ${A(a)?`<p class="flex items-start gap-2 text-[13px] leading-normal text-chumbo">${s(`sprout`,`mt-0.5 size-4 text-verde-medio`)}<span>Forma vigente: ${r(A(a))}</span></p>`:``}
              ${a.situacaoPagamento===`regularizada`&&p?`<p class="flex items-start gap-2 text-[13px] leading-normal text-chumbo">${s(`circle-check`,`mt-0.5 size-4 text-verde-medio`)}<span>Atualizado em ${_(p.em).replace(` `,` às `)}</span></p>`:``}
              ${a.status===`confirmada`?`<button type="button" data-atualizar class="${x.botaoPrimario}">${s(`pencil`)}Atualizar situação</button>`:``}</section>
            <section class="${x.cartao} flex flex-col gap-3 !p-5" aria-labelledby="t-dev"><h2 id="t-dev" class="${x.titulo}">Devolução do pagamento</h2>
              <div>${C(a,!0)}</div><p class="text-[13px] leading-normal text-texto-suave">${r(m)}</p>
              ${a.devolucao?`<a href="${i(`/admin/devolucoes`)}" class="text-sm font-bold text-verde-medio hover:underline">Ver em Devoluções</a>`:``}</section>
            <section class="${x.cartao} flex flex-col gap-3 !p-5 max-lg:hidden" aria-labelledby="t-pol"><h2 id="t-pol" class="${x.titulo}">Política de Privacidade</h2>
              <p class="flex items-start gap-2 text-[13px] leading-normal text-chumbo">${s(`circle-check`,`mt-0.5 size-4 text-verde-medio`)}<span>${a.aceiteEm?`Aceite registrado em ${_(a.aceiteEm).replace(` `,` às `)} · versão ${r(a.versaoPolitica??`1.0`)}`:`Aceite não registrado.`}</span></p></section>
          </div>
        </div>`,O&&=(y(O),null)}function M(){let e=E,t=e.dados.nome??e.login,{dialogo:n,fechar:i}=p(`
        <h2 class="${x.titulo} mb-3 !text-[20px]">Atualizar pagamento ou compensação</h2>
        <form class="flex flex-col gap-4" novalidate>
          <p class="text-[13px] leading-normal text-texto-suave">Inscrição nº ${r(e.numero??`—`)} · ${r(t)}. Somente esta inscrição será alterada.</p>
          <p class="flex items-center gap-2 text-[13px] text-texto-suave">Situação atual: ${o(e,!0)}</p>
          <fieldset class="flex flex-col gap-2"><legend class="mb-1 text-sm font-semibold text-chumbo">Nova situação</legend>
            <div class="flex gap-6">${[`pendente`,`regularizada`].map(t=>`<label class="flex cursor-pointer items-center gap-2 text-[15px] text-chumbo"><input type="radio" name="situacao" value="${t}" ${t===(e.situacaoPagamento===`regularizada`?`pendente`:`regularizada`)?`checked`:``} class="size-[18px] accent-verde-medio" />${t===`pendente`?`Pendente`:`Regularizada`}</label>`).join(``)}</div></fieldset>
          <label class="flex flex-col gap-1.5"><span class="text-sm font-semibold text-chumbo">Observação (opcional)</span>
            <span class="${x.campo}">${s(`user`,`size-5 text-chumbo`)}<input name="observacao" maxlength="200" class="${x.entrada}" /></span></label>
          <div data-erro-modal hidden role="alert" class="flex items-start gap-3 rounded-campo border border-erro-borda bg-erro-fundo p-4">${s(`circle-x`,`mt-0.5 size-5 text-erro`)}
            <div><p class="text-sm leading-[1.4] font-semibold text-erro">Não foi possível salvar</p><p data-erro-texto class="text-[15px] leading-normal text-chumbo"></p></div></div>
          <div class="flex flex-wrap justify-end gap-3"><button type="button" data-cancelar class="${x.botaoContorno}">Cancelar</button>
            <button type="submit" class="${x.botaoPrimario}">${s(`check`)}<span data-rotulo-salvar>Salvar situação</span></button></div>
        </form>`),a=n.querySelector(`form`);n.querySelector(`[data-cancelar]`).addEventListener(`click`,i),a.addEventListener(`submit`,async t=>{t.preventDefault();let n=Object.fromEntries(new FormData(a)),r=a.querySelector(`button[type=submit]`);r.disabled=!0,a.querySelector(`[data-erro-modal]`).hidden=!0;try{let t=await c(e.login,{situacao:n.situacao,...n.observacao?.trim()&&{observacao:n.observacao.trim()}});i(),E={...E,...t},O=`Situação atualizada para ${n.situacao===`regularizada`?`Regularizada`:`Pendente`} (inscrição nº ${E.numero??`—`}).`,j()}catch(e){let t=f(e),n=a.querySelector(`[data-erro-modal]`);n.querySelector(`[data-erro-texto]`).textContent=t.status===0?`A situação não foi alterada. Verifique a conexão e tente novamente.`:t.message,n.hidden=!1,a.querySelector(`[data-rotulo-salvar]`).textContent=`Tentar novamente`,r.disabled=!1}})}m().then(()=>Promise.all([a(T),w().catch(()=>null)])).then(([e,t])=>{E=e,D=t,j(),l.addEventListener(`click`,e=>{e.target.closest(`[data-atualizar]`)&&M()})}).catch(e=>l.innerHTML=b(e))}