📁 Estrutura de Rotas – SupportingBases Ultimate



Este documento descreve a estrutura de rotas do projeto SupportingBases Ultimate, com todas as páginas e subpáginas, seu propósito, requisitos de acesso, e funcionalidades associadas.



🌐 Visão Geral



Cada rota do projeto é dividida por tipo de acesso:



🔐 Privada: requer login.



🔓 Pública: acessível sem login.



💼 Admin: apenas para administradores da plataforma.



👤 Usuário Final: cliente do usuário (acessa páginas de solicitação de agendamento).



🧑‍💼 Funcionário: perfil com permissões limitadas.



📌 Rotas Públicas



/login



Descrição: Tela de login para usuários, clientes e funcionários.



Acesso: 🔓 Pública



Funcionalidade: Login por código OTP ou senha.



/cadastros



Descrição: Tela de criação de conta.



Acesso: 🔓 Pública



Funcionalidade: Cadastro com validação de e-mail por código, criação de senha e tipo de perfil (usuário, cliente, funcionário).



/verificar



Descrição: Tela para digitar o código de verificação enviado por e-mail.



Acesso: 🔓 Pública



Funcionalidade: Confirmação do cadastro.



🧑‍💻 Rotas Privadas (Usuário logado)



/dashboard



Descrição: Painel principal com indicadores, estatísticas, atalhos e visualização geral.



Acesso: 🔐 Privada (Usuário com plano ativo)



/agendamentos



Descrição: Página de visualização e gerenciamento de agendamentos.



Subrotas:



/agendamentos/novo: criação de novo agendamento



/agendamentos/solicitacoes: solicitações pendentes feitas por clientes finais



Acesso: 🔐 Privada



/clientes



Descrição: CRUD de clientes cadastrados.



Acesso: 🔐 Privada



/servicos



Descrição: Gerenciamento de serviços oferecidos (com categorias e subcategorias).



Acesso: 🔐 Privada



/produtos



Descrição: Gerenciamento de estoque, vendas, valores, códigos e imagens.



Acesso: 🔐 Privada



/historico



Descrição: Exibição de agendamentos concluídos com filtro por período, funcionário, cliente.



Acesso: 🔐 Privada



/preferencias



Descrição: Customização visual, nome da marca, idioma, temas (claro/escuro).



Acesso: 🔐 Privada



/preferencias/notificacoes



Descrição: Edição de modelos de mensagens automáticas.



Acesso: 🔐 Privada



/notificacoes



Descrição: Histórico de mensagens enviadas, pendentes ou com erro.



Acesso: 🔐 Privada



/assinatura



Descrição: Página de escolha e upgrade de plano.



Acesso: 🔐 Privada (exibida automaticamente quando o plano está vencido ou inativo)



👤 Rotas do Cliente Final



/solicitar



Descrição: Página onde um cliente final pode solicitar agendamento com base na agenda disponível.



Acesso: 🔓 Pública



Funcionalidade: Escolha de serviços/produtos, horários disponíveis, envio de dados pessoais.



🧑‍💼 Rotas do Funcionário



/funcionario



Descrição: Painel do funcionário.



Funcionalidades:



Bater ponto



Visualizar tarefas



Marcar como concluído



Chat de dúvidas internas



Acesso: 🔐 Privada com perfil employee



💼 Rotas do Admin da Plataforma



/admin



Descrição: Painel geral de administração do sistema.



Funcionalidades:



Ver usuários cadastrados



Gerenciar planos ativos e vencidos



Acesso ao suporte



Gerenciar feedbacks, senhas, usuários



Acesso: 💼 Admin (perfil especial)



📚 Observações Técnicas



Todas as rotas privadas devem ser protegidas via Supabase Auth + validação de plano ativo.



Todas as chamadas a dados devem conter user\_id com Row Level Security.



Devem ser utilizados layouts distintos para:



Público



Usuário logado



Funcionário



Admin



Documento mantido e atualizado por Lume ✨

