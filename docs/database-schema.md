🧩 Esquema de Banco de Dados – SupportingBases Ultimate



Este documento descreve a estrutura completa do banco de dados Supabase usada pelo sistema SupportingBases Ultimate. Contém os nomes das tabelas, campos, tipos, chaves, relações e anotações funcionais.



🧑‍💼 Tabela: users



Campo



Tipo



Descrição





id



uuid



ID do usuário (vinculado ao auth)





email



text



E-mail do usuário





nome\_completo



text



Nome pessoal





plano



text



Ex: gratuito, pro, premium





ativo



boolean



Status da conta





criado\_em



timestamptz



Data de criação da conta





📅 Tabela: appointments



Campo



Tipo



Descrição





id



uuid



Identificador do agendamento





user\_id



uuid



Dono do agendamento





cliente\_id



uuid



Relacionamento com a tabela clientes





servicos\_ids



text\[]



IDs dos serviços selecionados





data\_hora



timestamptz



Horário inicial do agendamento





duracao\_total



integer



Duração em minutos (soma dos serviços)





status



text



pending, confirmado, concluido, cancelado





criado\_em



timestamptz



Timestamp da criação





👥 Tabela: clients



Campo



Tipo



Descrição





id



uuid



ID do cliente





user\_id



uuid



Dono do cliente (multi-tenancy)





nome



text



Nome completo





email



text



Opcional





telefone



text



Número com DDD





avatar\_url



text



URL da imagem de perfil





criado\_em



timestamptz







🛠️ Tabela: services



Campo



Tipo



Descrição





id



uuid



ID do serviço





user\_id



uuid



Dono do serviço





nome



text



Nome do serviço





descricao



text



Descrição detalhada





valor



numeric



Valor padrão





duracao\_minutos



integer



Duração média estimada





categoria



text



Ex: cabelo, estética, barba...





imagem\_url



text



Opcional





ativo



boolean



Visível para agendamento





criado\_em



timestamptz







📦 Tabela: products



Campo



Tipo



Descrição





id



uuid



ID do produto





user\_id



uuid



Dono do produto





nome



text



Nome comercial





codigo\_estoque



text



SKU interno





codigo\_original



text



Código do fabricante (opcional)





valor\_compra



numeric



Custo unitário





valor\_venda



numeric



Preço ao cliente





quantidade



integer



Estoque disponível





unidade



text



Ex: g, ml, unid





locacao



text



Prateleira, sala ou estante





ativo



boolean



Está ativo para venda?





qtd\_minima\_alerta



integer



Quando notificar estoque baixo





criado\_em



timestamptz







📢 Tabela: notifications



Campo



Tipo



Descrição





id



uuid



ID da notificação





user\_id



uuid



Dono da mensagem





client\_id



uuid



Relacionado à tabela clientes





canal



text



email ou whatsapp





template\_id



text



ID do modelo usado





status



text



sent, error, pending





enviado\_em



timestamptz



Quando foi enviado





💬 Tabela: message\_templates



Campo



Tipo



Descrição





id



uuid



ID do template





user\_id



uuid



Dono do modelo





nome



text



Ex: lembrete 1h antes





conteudo



text



Pode conter variáveis tipo {{nome}}





canal



text



email, whatsapp





ativo



boolean



Está ativo para envio?





criado\_em



timestamptz







📊 Outras tabelas planejadas ou opcionais



sales → histórico de vendas e produtos utilizados



payments → registros financeiros



employees → dados de funcionários (comissões, permissões)



tasks → tarefas atribuídas por funcionário



preferences → tema, nome da marca, idioma, configurações gerais



audit\_log → rastreamento de ações críticas no sistema



✅ Este schema serve como base oficial para devs frontend/backend, garantindo coerência, segurança e expansão do projeto SupportingBases Ultimate.

