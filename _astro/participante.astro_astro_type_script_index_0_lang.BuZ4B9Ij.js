import{c as e,l as t,o as n}from"./api.Ctn0ZKft.js";import{t as r}from"./url.BZsx2vMl.js";import{C as i,I as a,N as o,S as s,b as c,d as l,h as u,k as d,p as f,t as p}from"./admin-api.C3ain_i-.js";if(i()){let i=document.getElementById(`conteudo`),m=new URLSearchParams(location.search).get(`login`)??``,h=(e,t)=>`<div><dt class="text-[13px] text-texto-suave">${e}</dt><dd class="text-[15px] leading-normal text-chumbo">${n(t)}</dd></div>`;d(m).then(u=>{let d=u.inscricao,m=d?.dados??{},g=m.nome??`Não informado`;i.innerHTML=`
          <div class="flex flex-col gap-1.5">
            <p class="text-[13px] text-texto-suave"><a href="${r(`/admin/participantes`)}" class="text-verde-medio hover:underline">Participantes</a> <span class="mx-1">/</span> ${n(u.login)}</p>
            <h1 class="text-[32px] leading-[1.3] font-bold text-verde-escuro max-lg:text-[26px]">${n(g===`Não informado`?u.login:g)}</h1></div>
          <div class="grid gap-6 lg:grid-cols-[1fr_332px]">
            <div class="flex flex-col gap-6">
              <section class="${p.cartao}" aria-labelledby="t-conta"><h2 id="t-conta" class="${p.titulo} mb-4">Conta de acesso</h2>
                <dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">${h(`Login`,u.login)}${h(`Conta criada em`,f(u.criadoEm).replace(` `,` `))}${h(`Tipo de acesso`,`Participante`)}${h(`Último acesso`,f(u.ultimoAcesso))}</dl></section>
              <section class="${p.cartao}" aria-labelledby="t-dados"><h2 id="t-dados" class="${p.titulo} mb-4">Dados informados na inscrição</h2>
                ${d&&m.nome?`<dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">${h(`Nome completo`,m.nome)}${h(`CPF`,e(m.cpf))}${h(`E-mail`,m.email??`—`)}${h(`Telefone`,c(m.telefone))}${h(`Data de nascimento`,t(m.dataNascimento))}${h(`Perfil`,m.perfil?o[m.perfil]:`—`)}</dl>`:`<p class="text-[15px] text-texto-suave">Este participante ainda não informou os dados da inscrição.</p>`}</section>
            </div>
            <div class="flex flex-col gap-4">
              <section class="${p.cartao} flex flex-col gap-3 !p-5" aria-labelledby="t-assoc"><h2 id="t-assoc" class="${p.titulo}">Inscrição associada</h2>
                <div>${a(d?.status??null,!0)}</div>
                ${d?`<p class="text-[13px] leading-normal text-chumbo">${d.numero?`Inscrição nº ${n(d.numero)}`:`Inscrição em preenchimento`}${d.confirmadaEm?` · confirmada em ${t(d.confirmadaEm.slice(0,10))}`:``} · ${l(d.atividades.length,`atividade`,`atividades`)}</p>
                       ${d.status===`rascunho`?``:`<a href="${r(`/admin/inscricao`)}?login=${encodeURIComponent(u.login)}" class="${p.botaoPrimario}">${s(`eye`)}Ver inscrição</a>`}`:`<p class="text-[13px] leading-normal text-chumbo">Conta criada, mas a inscrição ainda não foi iniciada.</p>`}</section>
              <div role="note" class="flex items-start gap-3 rounded-campo border border-info-borda bg-info-fundo p-4">${s(`info`,`mt-0.5 size-5 text-info-texto`)}
                <div><p class="text-sm leading-[1.4] font-semibold text-info-texto">Acesso a dados pessoais</p><p class="text-[15px] leading-normal text-chumbo">Dados exibidos somente para administradores autorizados. As consultas ficam registradas.</p></div></div>
            </div>
          </div>`}).catch(e=>i.innerHTML=u(e))}