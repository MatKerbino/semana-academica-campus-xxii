import{c as e,l as t,o as n}from"./api.Ctn0ZKft.js";import{t as r}from"./url.BZsx2vMl.js";import{A as i,D as a,H as o,K as s,T as c,b as l,k as u,m as d,s as f,t as p,w as m}from"./admin-api.BUCry_s-.js";if(s()){let s=document.getElementById(`conteudo`),h=new URLSearchParams(location.search).get(`login`)??``,g=(e,t)=>`<div><dt class="text-[13px] text-texto-suave">${e}</dt><dd class="text-[15px] leading-normal text-chumbo">${n(t)}</dd></div>`;o(h).then(o=>{let f=o.inscricao,h=f?.dados??{},_=h.nome??`Não informado`;s.innerHTML=`
          <div class="flex flex-col gap-1.5">
            <p class="text-[13px] text-texto-suave"><a href="${r(`/admin/participantes`)}" class="text-verde-medio hover:underline">Participantes</a> <span class="mx-1">/</span> ${n(o.login)}</p>
            <h1 class="text-[32px] leading-[1.3] font-bold text-verde-escuro max-lg:text-[26px]">${n(_===`Não informado`?o.login:_)}</h1></div>
          <div class="grid gap-6 lg:grid-cols-[1fr_332px]">
            <div class="flex flex-col gap-6">
              <section class="${p.cartao}" aria-labelledby="t-conta"><h2 id="t-conta" class="${p.titulo} mb-4">Conta de acesso</h2>
                <dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">${g(`Login`,o.login)}${g(`Conta criada em`,a(o.criadoEm).replace(` `,` `))}${g(`Tipo de acesso`,`Participante`)}${g(`Último acesso`,a(o.ultimoAcesso))}</dl></section>
              <section class="${p.cartao}" aria-labelledby="t-dados"><h2 id="t-dados" class="${p.titulo} mb-4">Dados informados na inscrição</h2>
                ${f&&h.nome?`<dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">${g(`Nome completo`,h.nome)}${g(`CPF`,e(h.cpf))}${g(`E-mail`,h.email??`—`)}${g(`Telefone`,u(h.telefone))}${g(`Data de nascimento`,t(h.dataNascimento))}${g(`Perfil`,h.perfil?i[h.perfil]:`—`)}</dl>`:`<p class="text-[15px] text-texto-suave">Este participante ainda não informou os dados da inscrição.</p>`}</section>
            </div>
            <div class="flex flex-col gap-4">
              <section class="${p.cartao} flex flex-col gap-3 !p-5" aria-labelledby="t-assoc"><h2 id="t-assoc" class="${p.titulo}">Inscrição associada</h2>
                <div>${l(f?.status??null,!0)}</div>
                ${f?`<p class="text-[13px] leading-normal text-chumbo">${f.numero?`Inscrição nº ${n(f.numero)}`:`Inscrição em preenchimento`}${f.confirmadaEm?` · confirmada em ${t(f.confirmadaEm.slice(0,10))}`:``} · ${c(d(f.atividades).length,`atividade`,`atividades`)}</p>
                       ${f.status===`rascunho`?``:`<a href="${r(`/admin/inscricao`)}?login=${encodeURIComponent(o.login)}" class="${p.botaoPrimario}">${m(`eye`)}Ver inscrição</a>`}`:`<p class="text-[13px] leading-normal text-chumbo">Conta criada, mas a inscrição ainda não foi iniciada.</p>`}</section>
              <div role="note" class="flex items-start gap-3 rounded-campo border border-info-borda bg-info-fundo p-4">${m(`info`,`mt-0.5 size-5 text-info-texto`)}
                <div><p class="text-sm leading-[1.4] font-semibold text-info-texto">Acesso a dados pessoais</p><p class="text-[15px] leading-normal text-chumbo">Dados exibidos somente para administradores autorizados.</p></div></div>
            </div>
          </div>`}).catch(e=>s.innerHTML=f(e))}