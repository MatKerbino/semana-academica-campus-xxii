import{c as e,o as t}from"./api.Ctn0ZKft.js";import{t as n}from"./url.BZsx2vMl.js";import{C as r,D as i,E as a,J as o,K as s,M as c,S as l,_ as u,a as d,g as f,k as p,m,o as h,r as g,s as _,t as v,x as y,y as b}from"./admin-api.NFVGRTgX.js";if(o()){let o=document.getElementById(`conteudo`);f().then(()=>s()).then(s=>{let f=(e,t,n,r,i)=>{let o=`<span class="flex items-center gap-3"><span class="flex size-10 shrink-0 items-center justify-center rounded-full ${t}">${a(n,`size-5`)}</span><span class="text-[15px] leading-normal text-texto-suave xl:whitespace-nowrap">${r}</span></span><span class="text-[32px] leading-[1.3] font-bold text-verde-escuro">${i}</span>`,s=`flex flex-1 basis-56 flex-col gap-3 rounded-cartao border border-borda bg-white p-5 shadow-[0_1px_1.5px_rgba(15,41,8,0.08)]`;return e?`<a href="${e}" class="${s} hover:bg-palha">${o}</a>`:`<div class="${s}">${o}</div>`},_=s.recentes.map(a=>`<tr class="border-b border-borda last:border-0 hover:bg-palha">
              <td data-rotulo="" class="px-3 py-3"><a href="${n(`/admin/inscricao`)}?login=${encodeURIComponent(a.login)}" class="block"><span class="block text-sm leading-[1.4] font-semibold text-chumbo">${t(a.dados.nome??a.login)}</span><span class="block text-[13px] text-texto-suave">CPF ${e(a.dados.cpf)}</span></a></td>
              <td data-rotulo="Perfil" class="px-3 py-3 text-[13px] text-chumbo">${a.dados.perfil?c[a.dados.perfil]:`—`}</td>
              <td data-rotulo="Atividades" class="px-3 py-3 text-[13px] text-chumbo whitespace-nowrap">${i(m(a.atividades).length,`atividade`,`atividades`)}</td>
              <td data-rotulo="Inscrição" class="px-3 py-3">${l(a.status)}</td><td data-rotulo="Pagamento" class="px-3 py-3">${r(a)}</td><td data-rotulo="Devolução" class="px-3 py-3">${y(a)}</td>
              <td data-rotulo="" class="px-3 py-3">${g(`${n(`/admin/inscricao`)}?login=${encodeURIComponent(a.login)}`,`Ver inscrição de ${a.dados.nome??a.login}`)}</td></tr>`).join(``);o.innerHTML=`
            ${h(`Visão geral`,`Resumo da ${t(b())} · atualizado em ${p(s.atualizadoEm).replace(` `,` às `)}.`)}
            <div class="flex flex-wrap gap-4">
              ${f(null,`bg-verde-claro text-verde-escuro`,`users`,`Inscrições confirmadas`,s.inscricoesConfirmadas)}
              ${f(`${n(`/admin/inscricoes`)}?pagamento=pendente`,`bg-pendente-fundo text-pendente-texto`,`apple`,`Compensações pendentes`,s.compensacoesPendentes)}
              ${f(null,`bg-entregue-fundo text-entregue-texto`,`package-check`,`Compensações regularizadas`,s.compensacoesRegularizadas)}
              ${f(`${n(`/admin/participantes`)}?inscricao=sem`,`bg-info-fundo text-info-texto`,`circle-check`,`Contas sem inscrição`,s.contasSemInscricao)}
            </div>
            <section class="${v.cartao} flex flex-col gap-3" aria-labelledby="t-forma">
              <div class="flex flex-wrap items-center gap-3"><h2 id="t-forma" class="${v.titulo}">Forma de participação vigente</h2><span class="flex-1"></span>
                <a href="${n(`/admin/forma-de-pagamento`)}" class="${v.botaoContorno}">${a(`settings`)}Alterar forma de pagamento</a></div>
              <div class="flex flex-wrap items-center gap-6">${u(s.pagamento,`w-full sm:w-[420px]`)}
                <p class="min-w-48 flex-1 text-[13px] leading-normal text-texto-suave">É a única forma exibida a todos os participantes na inscrição e em Minha inscrição.</p></div>
            </section>
            <section class="flex flex-col gap-3" aria-labelledby="t-rec">
              <div class="flex items-center gap-3"><h2 id="t-rec" class="${v.titulo}">Inscrições recentes</h2><span class="flex-1"></span>
                <a href="${n(`/admin/inscricoes`)}" class="rounded-full px-2 py-3 text-[15px] leading-[1.3] font-bold text-verde-medio hover:underline">Ver todas as inscrições</a></div>
              <div class="overflow-x-auto rounded-cartao border border-borda bg-white"><table class="tabela-cartoes w-full border-collapse xl:min-w-[900px]">
                <caption class="sr-only">Inscrições mais recentes</caption>
                <thead class="border-b border-borda bg-palha"><tr>${[`Participante`,`Perfil`,`Atividades`,`Inscrição`,`Pagamento/ compensação`,`Devolução`,`Ações`].map(e=>`<th scope="col" class="${d}">${e}</th>`).join(``)}</tr></thead>
                <tbody>${_||`<tr><td colspan="7" class="px-3 py-6 text-center text-sm text-texto-suave">Nenhuma inscrição registrada.</td></tr>`}</tbody></table></div>
            </section>`}).catch(e=>o.innerHTML=_(e))}