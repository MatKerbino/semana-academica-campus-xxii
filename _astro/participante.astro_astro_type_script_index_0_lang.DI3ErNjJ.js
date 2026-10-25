import{c as e,l as t,o as n}from"./api.Ctn0ZKft.js";import{t as r}from"./url.BZsx2vMl.js";import{D as i,E as a,J as o,M as s,S as c,W as l,g as u,j as d,k as f,m as p,s as m,t as h}from"./admin-api.NFVGRTgX.js";if(o()){let o=document.getElementById(`conteudo`),g=new URLSearchParams(location.search).get(`login`)??``,_=(e,t)=>`<div><dt class="text-[13px] text-texto-suave">${e}</dt><dd class="text-[15px] leading-normal text-chumbo">${n(t)}</dd></div>`;u().then(()=>l(g)).then(l=>{let u=l.inscricao,m=u?.dados??{},g=m.nome??`Não informado`;o.innerHTML=`
          <div class="flex flex-col gap-1.5">
            <p class="text-[13px] text-texto-suave"><a href="${r(`/admin/participantes`)}" class="text-verde-medio hover:underline">Participantes</a> <span class="mx-1">/</span> ${n(l.login)}</p>
            <h1 class="text-[32px] leading-[1.3] font-bold text-verde-escuro max-lg:text-[26px]">${n(g===`Não informado`?l.login:g)}</h1></div>
          <div class="grid gap-6 lg:grid-cols-[1fr_332px]">
            <div class="flex flex-col gap-6">
              <section class="${h.cartao}" aria-labelledby="t-conta"><h2 id="t-conta" class="${h.titulo} mb-4">Conta de acesso</h2>
                <dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">${_(`Login`,l.login)}${_(`Conta criada em`,f(l.criadoEm).replace(` `,` `))}${_(`Tipo de acesso`,`Participante`)}${_(`Último acesso`,f(l.ultimoAcesso))}</dl></section>
              <section class="${h.cartao}" aria-labelledby="t-dados"><h2 id="t-dados" class="${h.titulo} mb-4">Dados informados na inscrição</h2>
                ${u&&m.nome?`<dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">${_(`Nome completo`,m.nome)}${_(`CPF`,e(m.cpf))}${_(`E-mail`,m.email??`—`)}${_(`Telefone`,d(m.telefone))}${_(`Data de nascimento`,t(m.dataNascimento))}${_(`Perfil`,m.perfil?s[m.perfil]:`—`)}</dl>`:`<p class="text-[15px] text-texto-suave">Este participante ainda não informou os dados da inscrição.</p>`}</section>
            </div>
            <div class="flex flex-col gap-4">
              <section class="${h.cartao} flex flex-col gap-3 !p-5" aria-labelledby="t-assoc"><h2 id="t-assoc" class="${h.titulo}">Inscrição associada</h2>
                <div>${c(u?.status??null,!0)}</div>
                ${u?`<p class="text-[13px] leading-normal text-chumbo">${u.numero?`Inscrição nº ${n(u.numero)}`:`Inscrição em preenchimento`}${u.confirmadaEm?` · confirmada em ${t(u.confirmadaEm.slice(0,10))}`:``} · ${i(p(u.atividades).length,`atividade`,`atividades`)}</p>
                       ${u.status===`rascunho`?``:`<a href="${r(`/admin/inscricao`)}?login=${encodeURIComponent(l.login)}" class="${h.botaoPrimario}">${a(`eye`)}Ver inscrição</a>`}`:`<p class="text-[13px] leading-normal text-chumbo">Conta criada, mas a inscrição ainda não foi iniciada.</p>`}</section>
              <div role="note" class="flex items-start gap-3 rounded-campo border border-info-borda bg-info-fundo p-4">${a(`info`,`mt-0.5 size-5 text-info-texto`)}
                <div><p class="text-sm leading-[1.4] font-semibold text-info-texto">Acesso a dados pessoais</p><p class="text-[15px] leading-normal text-chumbo">Dados exibidos somente para administradores autorizados.</p></div></div>
            </div>
          </div>`}).catch(e=>o.innerHTML=m(e))}