import{c as e,l as t,o as n}from"./api.Ctn0ZKft.js";import{t as r}from"./url.BZsx2vMl.js";import{A as i,C as a,L as o,P as s,f as c,g as l,i as u,m as d,t as f,w as p,x as m}from"./admin-api.DckjMAJz.js";if(p()){let p=document.getElementById(`conteudo`),h=new URLSearchParams(location.search).get(`login`)??``,g=(e,t)=>`<div><dt class="text-[13px] text-texto-suave">${e}</dt><dd class="text-[15px] leading-normal text-chumbo">${n(t)}</dd></div>`;i(h).then(i=>{let l=i.inscricao,h=l?.dados??{},_=h.nome??`Não informado`;p.innerHTML=`
          <div class="flex flex-col gap-1.5">
            <p class="text-[13px] text-texto-suave"><a href="${r(`/admin/participantes`)}" class="text-verde-medio hover:underline">Participantes</a> <span class="mx-1">/</span> ${n(i.login)}</p>
            <h1 class="text-[32px] leading-[1.3] font-bold text-verde-escuro max-lg:text-[26px]">${n(_===`Não informado`?i.login:_)}</h1></div>
          <div class="grid gap-6 lg:grid-cols-[1fr_332px]">
            <div class="flex flex-col gap-6">
              <section class="${f.cartao}" aria-labelledby="t-conta"><h2 id="t-conta" class="${f.titulo} mb-4">Conta de acesso</h2>
                <dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">${g(`Login`,i.login)}${g(`Conta criada em`,d(i.criadoEm).replace(` `,` `))}${g(`Tipo de acesso`,`Participante`)}${g(`Último acesso`,d(i.ultimoAcesso))}</dl></section>
              <section class="${f.cartao}" aria-labelledby="t-dados"><h2 id="t-dados" class="${f.titulo} mb-4">Dados informados na inscrição</h2>
                ${l&&h.nome?`<dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">${g(`Nome completo`,h.nome)}${g(`CPF`,e(h.cpf))}${g(`E-mail`,h.email??`—`)}${g(`Telefone`,m(h.telefone))}${g(`Data de nascimento`,t(h.dataNascimento))}${g(`Perfil`,h.perfil?s[h.perfil]:`—`)}</dl>`:`<p class="text-[15px] text-texto-suave">Este participante ainda não informou os dados da inscrição.</p>`}</section>
            </div>
            <div class="flex flex-col gap-4">
              <section class="${f.cartao} flex flex-col gap-3 !p-5" aria-labelledby="t-assoc"><h2 id="t-assoc" class="${f.titulo}">Inscrição associada</h2>
                <div>${o(l?.status??null,!0)}</div>
                ${l?`<p class="text-[13px] leading-normal text-chumbo">${l.numero?`Inscrição nº ${n(l.numero)}`:`Inscrição em preenchimento`}${l.confirmadaEm?` · confirmada em ${t(l.confirmadaEm.slice(0,10))}`:``} · ${c(u(l.atividades).length,`atividade`,`atividades`)}</p>
                       ${l.status===`rascunho`?``:`<a href="${r(`/admin/inscricao`)}?login=${encodeURIComponent(i.login)}" class="${f.botaoPrimario}">${a(`eye`)}Ver inscrição</a>`}`:`<p class="text-[13px] leading-normal text-chumbo">Conta criada, mas a inscrição ainda não foi iniciada.</p>`}</section>
              <div role="note" class="flex items-start gap-3 rounded-campo border border-info-borda bg-info-fundo p-4">${a(`info`,`mt-0.5 size-5 text-info-texto`)}
                <div><p class="text-sm leading-[1.4] font-semibold text-info-texto">Acesso a dados pessoais</p><p class="text-[15px] leading-normal text-chumbo">Dados exibidos somente para administradores autorizados.</p></div></div>
            </div>
          </div>`}).catch(e=>p.innerHTML=l(e))}