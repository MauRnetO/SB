📊 Fluxos Operacionais – SupportingBases Ultimate



Este documento descreve os principais fluxos internos do sistema SupportingBases Ultimate, detalhando os passos realizados pelo usuário e as ações esperadas do sistema em cada cenário. Serve como guia para devs, testers e designers.



1\. 📅 Fluxo de Criação de Agendamento



🧍‍♀️ Atores:



Usuário logado (com plano ativo)



Sistema (backend + banco Supabase)



✅ Pré-requisitos:



Serviços cadastrados (com duração definida)



Horários disponíveis (sem conflitos)



🔁 Passos:



Usuário acessa /agendamentos/novo



Seleciona um ou mais serviços disponíveis



Sistema calcula tempo total do agendamento com base na soma das durações



Usuário escolhe data e hora inicial



Sistema verifica se há conflito com outros agendamentos



Se livre:



Usuário seleciona cliente (existente ou cria novo)



(Opcional) Define funcionário responsável



(Opcional) Edita duração do agendamento manualmente



Clica em Confirmar Agendamento



Sistema salva no banco appointments com status pendente



Entra no calendário visual (/agendamentos)



🔔 Pós-eventos (automáticos):



Gatilhos de lembretes (email/whatsapp)



Atualização do dashboard



2\. 📦 Fluxo de Venda de Produto



🧍‍♀️ Atores:



Usuário logado



🔁 Passos:



Usuário acessa seção de checkout



Seleciona cliente



Adiciona um ou mais produtos da tabela products



Sistema verifica o estoque disponível



Usuário aplica desconto ou altera preço final (opcional)



Seleciona forma de pagamento



Sistema:



Registra em sales



Atualiza estoque (subtrai quantidade)



Aparece recibo final com botão para imprimir ou enviar



3\. 📨 Fluxo de Envio de Notificação



🧍‍♀️ Atores:



Usuário logado com notificações ativas



🔁 Passos:



Usuário define modelos em /preferencias/notificacoes



Sistema grava templates com tags dinâmicas (ex: {{nome}}, {{horario}})



Quando evento programado ocorre (ex: 1h antes de agendamento):



Sistema busca template



Substitui variáveis reais



Envia via Resend (email) ou WhatsApp (integração)



Histórico é salvo na tabela notifications



4\. 🧾 Fluxo de Conclusão de Agendamento



🔁 Passos:



Usuário acessa /agendamentos



Clica em agendamento com data/hora atual ou passada



Abre modal de conclusão:



Confirma horário real gasto (pode ser diferente do planejado)



Adiciona serviços adicionais, produtos, descontos ou comissões



Define valor final, forma de pagamento



Sistema move registro de appointments para historico



Dashboard e relatórios são atualizados automaticamente



5\. 💳 Fluxo de Upgrade de Assinatura



🔁 Passos:



Usuário acessa /assinatura



Escolhe plano e método de pagamento



Redireciona para gateway de pagamento (ex: Stripe, MercadoPago)



Ao concluir:



Sistema atualiza campo licenca\_ativa = true



Redireciona para /dashboard



6\. 👥 Fluxo de Login por Função (Admin, Funcionário, Cliente Final)



🧍‍♀️ Atores:



Visitante (sem login ainda)



🔁 Passos:



Acessa /login



Escolhe o tipo:



Cliente → faz solicitação de agendamento



Funcionário → vê tarefas, marca ponto



Usuário (dono da conta) → acesso total ao app



Cada função redireciona e tem permissões diferentes via RLS

