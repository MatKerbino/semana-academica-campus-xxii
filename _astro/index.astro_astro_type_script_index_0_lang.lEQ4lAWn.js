import{c as e,o as t}from"./api.Ctn0ZKft.js";import{t as n}from"./url.BZsx2vMl.js";import{C as r,I as i,L as a,M as o,P as s,R as c,f as l,g as u,i as d,l as f,m as p,s as m,t as h,u as g,w as _,y as v}from"./admin-api.DckjMAJz.js";if(_()){let _=document.getElementById(`conteudo`);o().then(o=>{let u=(e,t,n,i,a)=>{let o=`<span class="flex items-center gap-3"><span class="flex size-10 shrink-0 items-center justify-center rounded-full ${t}">${r(n,`size-5`)}</span><span class="text-[15px] leading-normal text-texto-suave xl:whitespace-nowrap">${i}</span></span><span class="text-[32px] leading-[1.3] font-bold text-verde-escuro">${a}</span>`,s=`flex flex-1 basis-56 flex-col gap-3 rounded-cartao border border-borda bg-white p-5 shadow-[0_1px_1.5px_rgba(15,41,8,0.08)]`;return e?`<a href="${e}" class="${s} hover:bg-palha">${o}</a>`:`<div class="${s}">${o}</div>`},y=o.recentes.map(r=>`<tr class="border-b border-borda last:border-0 hover:bg-palha">
              <td class="px-3 py-3"><a href="${n(`/admin/inscricao`)}?login=${encodeURIComponent(r.login)}" class="block"><span class="block text-sm leading-[1.4] font-semibold text-chumbo">${t(r.dados.nome??r.login)}</span><span class="block text-[13px] text-texto-suave">CPF ${e(r.dados.cpf)}</span></a></td>
              <td class="px-3 py-3 text-[13px] text-chumbo">${r.dados.perfil?s[r.dados.perfil]:`—`}</td>
              <td class="px-3 py-3 text-[13px] text-chumbo whitespace-nowrap">${l(d(r.atividades).length,`atividade`,`atividades`)}</td>
              <td class="px-3 py-3">${a(r.status)}</td><td class="px-3 py-3">${c(r)}</td><td class="px-3 py-3">${i(r)}</td>
              <td class="px-3 py-3">${m(`${n(`/admin/inscricao`)}?login=${encodeURIComponent(r.login)}`,`Ver inscrição de ${r.dados.nome??r.login}`)}</td></tr>`).join(``);_.innerHTML=`
            ${g(`Visão geral`,`Resumo da 1ª Semana Acadêmica · atualizado em ${p(o.atualizadoEm).replace(` `,` às `)}.`)}
            <div class="flex flex-wrap gap-4">
              ${u(null,`bg-verde-claro text-verde-escuro`,`users`,`Inscrições confirmadas`,o.inscricoesConfirmadas)}
              ${u(`${n(`/admin/inscricoes`)}?pagamento=pendente`,`bg-pendente-fundo text-pendente-texto`,`apple`,`Compensações pendentes`,o.compensacoesPendentes)}
              ${u(null,`bg-entregue-fundo text-entregue-texto`,`package-check`,`Compensações regularizadas`,o.compensacoesRegularizadas)}
              ${u(`${n(`/admin/participantes`)}?inscricao=sem`,`bg-info-fundo text-info-texto`,`circle-check`,`Contas sem inscrição`,o.contasSemInscricao)}
            </div>
            <section class="${h.cartao} flex flex-col gap-3" aria-labelledby="t-forma">
              <div class="flex flex-wrap items-center gap-3"><h2 id="t-forma" class="${h.titulo}">Forma de participação vigente</h2><span class="flex-1"></span>
                <a href="${n(`/admin/forma-de-pagamento`)}" class="${h.botaoContorno}">${r(`settings`)}Alterar forma de pagamento</a></div>
              <div class="flex flex-wrap items-center gap-6">${v(o.pagamento,`w-full sm:w-[420px]`)}
                <p class="min-w-48 flex-1 text-[13px] leading-normal text-texto-suave">É a única forma exibida a todos os participantes na inscrição e em Minha inscrição.</p></div>
            </section>
            <section class="flex flex-col gap-3" aria-labelledby="t-rec">
              <div class="flex items-center gap-3"><h2 id="t-rec" class="${h.titulo}">Inscrições recentes</h2><span class="flex-1"></span>
                <a href="${n(`/admin/inscricoes`)}" class="rounded-full px-2 py-3 text-[15px] leading-[1.3] font-bold text-verde-medio hover:underline">Ver todas as inscrições</a></div>
              <div class="overflow-x-auto rounded-cartao border border-borda bg-white"><table class="w-full min-w-[900px] border-collapse">
                <caption class="sr-only">Inscrições mais recentes</caption>
                <thead class="border-b border-borda bg-palha"><tr>${[`Participante`,`Perfil`,`Atividades`,`Inscrição`,`Pagamento/ compensação`,`Devolução`,`Ações`].map(e=>`<th scope="col" class="${f}">${e}</th>`).join(``)}</tr></thead>
                <tbody>${y||`<tr><td colspan="7" class="px-3 py-6 text-center text-sm text-texto-suave">Nenhuma inscrição registrada.</td></tr>`}</tbody></table></div>
            </section>`}).catch(e=>_.innerHTML=u(e))}