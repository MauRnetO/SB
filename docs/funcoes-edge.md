⚡ funcoes-edge.md – Funções Edge do Supabase



Este documento define todas as Funções Edge (Edge Functions) utilizadas no projeto SupportingBases Ultimate, incluindo:



Nome da função



Descrição



Payload esperado (schema de entrada)



Resposta (schema de saída)



Autenticação e permissões envolvidas



🚀 Visão Geral



As Funções Edge permitem execução de lógica de negócio sensível fora do client-side, com latência mínima e segurança máxima.



Vantagens:



Resposta rápida



Execução segura



Acesso controlado via JWT + auth.uid()



Ideal para notificações, validações e regras de negócio complexas



📌 Função: criar\_agendamento\_completo



Campo



Valor



Método



POST



Path



/agendamentos/criar



Autenticado



Sim (JWT + Role usuario ou funcionario)



🔷 Entrada (JSON)



{

&nbsp; "cliente\_id": "uuid",

&nbsp; "servicos": \["uuid1", "uuid2"],

&nbsp; "data": "2025-08-01",

&nbsp; "hora": "14:00",

&nbsp; "observacoes": "Opcional",

&nbsp; "criado\_por": "auth.uid()"

}



🔶 Saída (JSON)



{

&nbsp; "status": "ok",

&nbsp; "agendamento\_id": "uuid",

&nbsp; "horarios\_bloqueados": \["14:00", "15:00"]

}



🔐 Regras



Confere se os serviços pertencem ao owner\_user\_id



Calcula tempo total e bloqueia horário



Cria registro na tabela appointments



📌 Função: enviar\_notificacao\_personalizada



Campo



Valor



Método



POST



Path



/notificacoes/enviar



Autenticado



Sim (JWT + Role usuario)



🔷 Entrada (JSON)



{

&nbsp; "destinatario\_id": "uuid",

&nbsp; "canal": "email" | "whatsapp",

&nbsp; "template\_id": "checkin\_confirmado",

&nbsp; "dados\_dinamicos": {

&nbsp;   "nome": "Maurício",

&nbsp;   "horario": "14:00"

&nbsp; }

}



🔶 Saída (JSON)



{

&nbsp; "status": "enviado",

&nbsp; "canal": "email",

&nbsp; "mensagem\_id": "xyz123"

}



🔐 Regras



Valida canal disponível no plano



Substitui variáveis do template



Dispara mensagem via provedor configurado



📌 Função: validar\_codigo\_otp



Campo



Valor



Método



POST



Path



/auth/validar-otp



Autenticado



Não



🔷 Entrada (JSON)



{

&nbsp; "email": "usuario@exemplo.com",

&nbsp; "codigo": "874521"

}



🔶 Saída (JSON)



{

&nbsp; "validado": true,

&nbsp; "session": {

&nbsp;   "access\_token": "...",

&nbsp;   "user": { "id": "uuid", "role": "usuario" }

&nbsp; }

}



🔐 Regras



Valida código com tempo de expiração



Gera sessão Supabase



✅ Boas Práticas



Toda entrada deve ser validada via Zod ou schema equivalente



Toda função deve checar auth.uid() e role antes de acessar dados sensíveis



Toda saída deve ser previsível, padronizada e segura



📦 Checklist de Segurança







🔄 Integrações Finais



Essas funções podem ser consumidas:



Pelo app web (via fetch)



Por apps mobile (Expo)



Por webhooks externos



Exemplo de chamada via fetch:



const res = await fetch('/agendamentos/criar', {

&nbsp; method: 'POST',

&nbsp; headers: { Authorization: `Bearer ${session.access\_token}` },

&nbsp; body: JSON.stringify(payload)

})



Este documento deve ser atualizado sempre que uma nova função Edge for criada ou modificada. Todas as funções devem seguir padrão de entrada/saída e validação.





