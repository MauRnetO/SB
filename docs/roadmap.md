📌 Requisitos Funcionais – SupportingBases Ultimate



Este documento lista todas as funcionalidades que o sistema precisa oferecer para ser considerado completo e operacional. Está dividido por módulo, com explicações claras para desenvolvedores, designers e gerentes de produto.



🧭 1. Autenticação e Acesso



📥 Cadastro e Login







🔐 Permissões e Segurança







📆 2. Agendamentos



📋 CRUD de Agendamentos







🔁 Lembretes e Confirmações







👥 3. Clientes







🧴 4. Serviços







📦 5. Produtos







🔔 6. Notificações







⚙️ 7. Preferências do Usuário







🧾 8. Relatórios







🧑‍💼 9. Funcionários







🏢 10. Painel do Administrador (SaaS Owner)







📅 11. Integrações e Extras







✅ Conclusão



Cada uma dessas funcionalidades será documentada tecnicamente em arquivos separados (docs/funcionalidade-x.md) e seu progresso será rastreado via Kanban e versionamento Git. Este documento serve como o guia-mestre funcional do app SupportingBases Ultimate.











🧭 Roadmap de Execução Completa – SupportingBases Ultimate



Este documento não adota a lógica de MVP. Todas as funcionalidades aqui listadas devem ser desenvolvidas completas e definitivas desde o início. O sistema SupportingBases Ultimate nasce 100% pronto para escalar e oferecer uma experiência premium.



✅ Gestão de Agendamentos



Descrição: Sistema completo para criar, editar, visualizar e concluir agendamentos com múltiplos serviços, cálculo de tempo, bloqueio de horário e histórico.



Tabelas envolvidas: appointments, services, clients, employees



Rotas: /agendamentos, /agendamentos/novo, /historico



Funcionalidades:



Seleção de múltiplos serviços com cálculo automático de tempo



Bloqueio dinâmico de horários ocupados



Marcar como concluído (migrar para histórico)



Conclusão com formulário: valor real, produtos incluídos, comissão, observações



Visualização em tabela e calendário (semana, mês, dia)



Status: pendente, confirmado, cancelado, concluído



✅ Cadastro de Clientes



Descrição: CRUD completo com edição inline, histórico de interações, preferências e foto



Tabelas: clients



Rotas: /clientes



Funcionalidades:



Cadastro manual ou via formulário público



Upload de imagem/avatar



Histórico de agendamentos, produtos comprados, anotações



✅ Gestão de Serviços



Descrição: Cadastro de serviços com tempo, valor, status, categorias e imagem



Tabelas: services



Rotas: /servicos



Funcionalidades:



Upload de imagem representativa



Status ativo/inativo



Subcategorias



✅ Estoque e Vendas de Produtos



Descrição: Controle completo de estoque, códigos, status e catálogo visual



Tabelas: products, sales



Rotas: /produtos



Funcionalidades:



Código interno e externo



Preço de venda e compra



Quantidade mínima em estoque



Upload de imagem e modo galeria



✅ Notificações e Mensagens



Descrição: Sistema robusto para personalização de templates e histórico de envio via WhatsApp e E-mail



Tabelas: notifications, user\_preferences



Rotas: /preferencias/notificacoes, /notificacoes



Funcionalidades:



Templates por tipo de evento e canal



Histórico de envio: status, canal, destinatário



Agendamento automático de lembretes (1 dia, 1 hora antes)



✅ Preferências do Usuário



Descrição: Personalização visual, idioma, marca, tema e avatar



Tabelas: user\_preferences



Rotas: /preferencias



Funcionalidades:



Nome da marca, tema claro/escuro, idioma



Avatar



✅ Equipe e Permissões



Descrição: Cadastro e gestão de funcionários com comissões, tarefas e permissões



Tabelas: employees, tasks



Rotas: /equipe



Funcionalidades:



Comissões por serviço



Tarefas atribuídas e checklists



Permissões por módulo (acesso ou restrito)



✅ Relatórios



Descrição: Geração de relatórios financeiros, de produtividade, clientes, agendamentos e exportações em PDF/Excel



Tabelas: appointments, sales, products, clients, employees



Rotas: /relatorios



Funcionalidades:



Filtros por data, status, funcionário, cliente



Botão para exportar em PDF/Excel



✅ Assinaturas e Licenciamento SaaS



Descrição: Controle total de planos ativos, renovações, status de pagamento e upgrades



Tabelas: assinaturas, users



Rotas: /assinatura



Funcionalidades:



Redirecionamento automático se plano expirado



Detalhes do plano, próxima cobrança, histórico







✅ Conclusão



Este roadmap substitui fases. Cada módulo descrito aqui deve ser implementado por completo e desde o início, seguindo os arquivos de suporte no diretório /docs/. Nenhuma funcionalidade será adiada — o objetivo é criar o melhor app da história desde sua primeira entrega. 🚀

