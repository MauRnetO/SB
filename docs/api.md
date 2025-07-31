🌐 API – SupportingBases Ultimate

Documentação oficial da API REST pública e privada do aplicativo SupportingBases Ultimate.



✅ Visão Geral

A API é organizada em dois blocos:



Endpoints públicos: disponíveis para clientes finais e páginas externas (ex: solicitação de agendamento).



Endpoints autenticados: requerem token de autenticação (usuário, funcionário ou admin).



⚠️ Todas as requisições devem ser feitas via HTTPS.



🔐 Autenticação

Método: Bearer Token



Header:



http

Copiar

Editar

Authorization: Bearer <token>

Os tokens são obtidos via login (OTP + senha) através do Supabase Auth.



🌍 Endpoints Públicos

1\. GET /api/public/servicos/:usuarioId

Descrição: Lista os serviços oferecidos por um usuário.



bash

Copiar

Editar

curl https://supportingbases.app/api/public/servicos/usuario123

Resposta:



json

Copiar

Editar

\[

&nbsp; {

&nbsp;   "id": "srv01",

&nbsp;   "nome": "Corte de Cabelo",

&nbsp;   "descricao": "Corte tradicional masculino",

&nbsp;   "categoria": "Cabelo",

&nbsp;   "duracao\_minutos": 45,

&nbsp;   "valor": 60.0,

&nbsp;   "imagem\_url": "https://..."

&nbsp; }

]

2\. POST /api/public/solicitar-agendamento

Descrição: Permite que um cliente final envie uma solicitação de agendamento.



Payload:



json

Copiar

Editar

{

&nbsp; "nome": "João da Silva",

&nbsp; "email": "joao@email.com",

&nbsp; "telefone": "11999999999",

&nbsp; "servicos": \["srv01", "srv02"],

&nbsp; "data": "2025-08-10",

&nbsp; "horario": "15:00"

}

Resposta:



json

Copiar

Editar

{ "status": "solicitado", "agendamento\_id": "ag123" }

🔒 Endpoints Autenticados

1\. GET /api/agendamentos

Descrição: Lista todos os agendamentos do usuário autenticado.



Headers:



http

Copiar

Editar

Authorization: Bearer <token>

Resposta:



json

Copiar

Editar

\[

&nbsp; {

&nbsp;   "id": "ag123",

&nbsp;   "cliente": "João da Silva",

&nbsp;   "servicos": \["srv01", "srv02"],

&nbsp;   "data": "2025-08-10",

&nbsp;   "horario": "15:00",

&nbsp;   "duracao\_total": 90,

&nbsp;   "status": "confirmado"

&nbsp; }

]

2\. POST /api/agendamentos/concluir

Descrição: Marca um agendamento como concluído.



Payload:



json

Copiar

Editar

{

&nbsp; "agendamento\_id": "ag123",

&nbsp; "duracao\_real": 85,

&nbsp; "valor\_total": 130.0,

&nbsp; "produtos\_adicionados": \["prod01"],

&nbsp; "funcionario\_responsavel": "func456",

&nbsp; "pagamento": {

&nbsp;   "forma": "Pix",

&nbsp;   "desconto": 10

&nbsp; }

}

Resposta:



json

Copiar

Editar

{ "status": "concluido" }

3\. POST /api/notificacoes/enviar

Descrição: Envia notificação por e-mail ou WhatsApp via Resend.



Payload:



json

Copiar

Editar

{

&nbsp; "canal": "email",

&nbsp; "destinatario": "joao@email.com",

&nbsp; "modelo\_id": "lembrar-1h",

&nbsp; "agendamento\_id": "ag123"

}

Resposta:



json

Copiar

Editar

{ "status": "enviado", "log\_id": "ntf\_001" }

4\. GET /api/relatorios/exportar?tipo=pdf

Descrição: Exporta relatório de agendamentos e vendas.



Resposta:

Retorna arquivo .pdf ou .xlsx para download.



📡 Futuro Suporte

Webhooks para notificações em tempo real



Swagger com live docs interativas



Limites por plano de assinatura



🧠 Observações

Toda a lógica de permissão está protegida via RLS no Supabase.



As chamadas privadas exigem login prévio.



A taxa de requisição será limitada por plano no futuro (rate limit via Edge Functions).

