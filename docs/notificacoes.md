🔔 notificacoes.md – Sistema de Notificações Inteligente



Este documento define toda a estrutura do sistema de notificações do SupportingBases Ultimate, desde modelos e canais até histórico e falhas. O objetivo é garantir que o sistema seja escalável, auditável e personalizável por usuário.



📬 Canais Suportados



Email (via Resend SDK)



WhatsApp (via integração com API externa)



Notificação in-app (avisos visíveis no painel do sistema)



SMS (opcional, com fallback em caso de erro em outro canal)



🧠 Tipos de Notificação



Tipo



Descrição



Frequência



agendamento\_confirmado



Cliente recebeu confirmação do agendamento



Instantânea



agendamento\_cancelado



Cliente e equipe notificados de cancelamento



Instantânea



lembrete\_agendamento



Enviado antes de um agendamento



Personalizável (ex: 1h antes)



novo\_cliente



Admin é notificado quando um cliente se cadastra



Imediata



tarefa\_atribuida



Funcionário recebe tarefa



Instantânea



baixa\_estoque



Admin recebe alerta de estoque mínimo



Instantânea



🛠️ Estrutura da Tabela notificacoes



Campo



Tipo



Descrição



id



UUID



Identificador da notificação



user\_id



UUID



Destinatário (usuário ou funcionário)



canal



Texto



email, whatsapp, in\_app, sms



tipo



Texto



Tipo da notificação (ver tabela acima)



mensagem



Texto



Conteúdo da notificação



status



Texto



enviado, pendente, erro



erro\_mensagem



Texto



(opcional) mensagem de erro, se houver



created\_at



Timestamp



Data de criação da notificação



enviado\_em



Timestamp



Data de envio



🧩 Preferências por Usuário



Cada conta pode configurar os modelos e canais de notificação via rota:



/preferencias/notificacoes



Exemplo de JSON armazenado:



{

&nbsp; "lembrete\_agendamento": {

&nbsp;   "canal": "email",

&nbsp;   "tempo\_antes\_minutos": 60,

&nbsp;   "mensagem": "Olá {{nome}}, seu agendamento é daqui a 1 hora."

&nbsp; },

&nbsp; "baixa\_estoque": {

&nbsp;   "canal": "in\_app",

&nbsp;   "mensagem": "O produto {{produto}} atingiu o estoque mínimo."

&nbsp; }

}



🔁 Logs e Auditoria



Todas as tentativas de envio são registradas na tabela notificacoes com status atualizado:



pendente



enviado



erro



Erros devem conter erro\_mensagem para debug.



🔐 RLS e Segurança



Apenas o dono do dado (user\_id) pode visualizar sua notificação



Admins veem todas as notificações da sua conta (multitenancy)



user\_id = auth.uid()

OR owner\_user\_id = auth.uid()



📦 Exemplo de Uso via Supabase Edge Function



await supabase.from('notificacoes').insert({

&nbsp; user\_id: 'uuid-cliente',

&nbsp; canal: 'email',

&nbsp; tipo: 'lembrete\_agendamento',

&nbsp; mensagem: `Seu agendamento é daqui a 1 hora`,

&nbsp; status: 'pendente'

})



Uma Edge Function escuta novas entradas e envia com Resend/WhatsApp/etc.



✅ Conclusão



O sistema de notificações do SupportingBases é:



📡 Multicanal



🧠 Personalizável por tipo



🔒 Seguro com RLS



🧾 Auditável



⚙️ Automatizado via Edge Functions



Cada empresa pode criar sua própria experiência de comunicação com os clientes e equipe de forma profissional, robusta e segura.

