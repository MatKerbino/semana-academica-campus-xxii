import{c as e,o as t}from"./api.Ctn0ZKft.js";import{t as n}from"./url.BZsx2vMl.js";import{A as r,D as i,K as a,T as o,W as s,a as c,b as l,g as u,m as d,o as f,r as p,s as m,t as h,w as g,x as _,y as v}from"./admin-api.BUCry_s-.js";if(a()){let a=document.getElementById(`conteudo`);s().then(s=>{let m=(e,t,n,r,i)=>{let a=`<span class="flex items-center gap-3"><span class="flex size-10 shrink-0 items-center justify-center rounded-full ${t}">${g(n,`size-5`)}</span><span class="text-[15px] leading-normal text-texto-suave xl:whitespace-nowrap">${r}</span></span><span class="text-[32px] leading-[1.3] font-bold text-verde-escuro">${i}</span>`,o=`flex flex-1 basis-56 flex-col gap-3 rounded-cartao border border-borda bg-white p-5 shadow-[0_1px_1.5px_rgba(15,41,8,0.08)]`;return e?`<a href="${e}" class="${o} hover:bg-palha">${a}</a>`:`<div class="${o}">${a}</div>`},y=s.recentes.map(i=>`<tr class="border-b border-borda last:border-0 hover:bg-palha">
              <td class="px-3 py-3"><a href="${n(`/admin/inscricao`)}?login=${encodeURIComponent(i.login)}" class="block"><span class="block text-sm leading-[1.4] font-semibold text-chumbo">${t(i.dados.nome??i.login)}</span><span class="block text-[13px] text-texto-suave">CPF ${e(i.dados.cpf)}</span></a></td>
              <td class="px-3 py-3 text-[13px] text-chumbo">${i.dados.perfil?r[i.dados.perfil]:`—`}</td>
              <td class="px-3 py-3 text-[13px] text-chumbo whitespace-nowrap">${o(d(i.atividades).length,`atividade`,`atividades`)}</td>
              <td class="px-3 py-3">${l(i.status)}</td><td class="px-3 py-3">${_(i)}</td><td class="px-3 py-3">${v(i)}</td>
              <td class="px-3 py-3">${p(`${n(`/admin/inscricao`)}?login=${encodeURIComponent(i.login)}`,`Ver inscrição de ${i.dados.nome??i.login}`)}</td></tr>`).join(``);a.innerHTML=`
            ${f(`Visão geral`,`Resumo da 1ª Semana Acadêmica · atualizado em ${i(s.atualizadoEm).replace(` `,` às `)}.`)}
            <div class="flex flex-wrap gap-4">
              ${m(null,`bg-verde-claro text-verde-escuro`,`users`,`Inscrições confirmadas`,s.inscricoesConfirmadas)}
              ${m(`${n(`/admin/inscricoes`)}?pagamento=pendente`,`bg-pendente-fundo text-pendente-texto`,`apple`,`Compensações pendentes`,s.compensacoesPendentes)}
              ${m(null,`bg-entregue-fundo text-entregue-texto`,`package-check`,`Compensações regularizadas`,s.compensacoesRegularizadas)}
              ${m(`${n(`/admin/participantes`)}?inscricao=sem`,`bg-info-fundo text-info-texto`,`circle-check`,`Contas sem inscrição`,s.contasSemInscricao)}
            </div>
            <section class="${h.cartao} flex flex-col gap-3" aria-labelledby="t-forma">
              <div class="flex flex-wrap items-center gap-3"><h2 id="t-forma" class="${h.titulo}">Forma de participação vigente</h2><span class="flex-1"></span>
                <a href="${n(`/admin/forma-de-pagamento`)}" class="${h.botaoContorno}">${g(`settings`)}Alterar forma de pagamento</a></div>
              <div class="flex flex-wrap items-center gap-6">${u(s.pagamento,`w-full sm:w-[420px]`)}
                <p class="min-w-48 flex-1 text-[13px] leading-normal text-texto-suave">É a única forma exibida a todos os participantes na inscrição e em Minha inscrição.</p></div>
            </section>
            <section class="flex flex-col gap-3" aria-labelledby="t-rec">
              <div class="flex items-center gap-3"><h2 id="t-rec" class="${h.titulo}">Inscrições recentes</h2><span class="flex-1"></span>
                <a href="${n(`/admin/inscricoes`)}" class="rounded-full px-2 py-3 text-[15px] leading-[1.3] font-bold text-verde-medio hover:underline">Ver todas as inscrições</a></div>
              <div class="overflow-x-auto rounded-cartao border border-borda bg-white"><table class="w-full min-w-[900px] border-collapse">
                <caption class="sr-only">Inscrições mais recentes</caption>
                <thead class="border-b border-borda bg-palha"><tr>${[`Participante`,`Perfil`,`Atividades`,`Inscrição`,`Pagamento/ compensação`,`Devolução`,`Ações`].map(e=>`<th scope="col" class="${c}">${e}</th>`).join(``)}</tr></thead>
                <tbody>${y||`<tr><td colspan="7" class="px-3 py-6 text-center text-sm text-texto-suave">Nenhuma inscrição registrada.</td></tr>`}</tbody></table></div>
            </section>`}).catch(e=>a.innerHTML=m(e))}