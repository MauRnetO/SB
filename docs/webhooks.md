🌐 webhooks.md – Integração por Webhooks (Callbacks)



Este documento define como o sistema SupportingBases Ultimate envia notificações automáticas para sistemas externos por meio de Webhooks. Cada evento disparado pode ser integrado com plataformas de terceiros (como Zapier, Notion, CRMs ou apps próprios).



📌 Visão Geral



Webhooks são chamados HTTP POST enviados pelo sistema ao ocorrerem eventos importantes.



O usuário pode configurar a URL de destino para cada tipo de evento.



O conteúdo enviado segue um schema padronizado por evento.



🔔 Eventos Suportados



Evento



Descrição



agendamento\_criado



Disparado quando um novo agendamento é confirmado



agendamento\_concluido



Disparado quando um agendamento é marcado como concluído



novo\_cliente



Disparado quando um novo cliente é cadastrado



tarefa\_concluida



Disparado quando uma tarefa de funcionário é finalizada



pagamento\_confirmado



Disparado após confirmação de pagamento (integrações futuras)



📦 Payloads Exemplo



agendamento\_criado



{

&nbsp; "event": "agendamento\_criado",

&nbsp; "timestamp": "2025-07-22T14:33:00Z",

&nbsp; "user\_id": "uuid-do-usuario",

&nbsp; "agendamento": {

&nbsp;   "id": "uuid",

&nbsp;   "cliente\_id": "uuid",

&nbsp;   "servicos": \["Corte de cabelo", "Barba"],

&nbsp;   "inicio": "2025-07-23T10:00:00Z",

&nbsp;   "fim": "2025-07-23T10:45:00Z"

&nbsp; }

}



novo\_cliente



{

&nbsp; "event": "novo\_cliente",

&nbsp; "timestamp": "2025-07-22T10:05:00Z",

&nbsp; "user\_id": "uuid-do-usuario",

&nbsp; "cliente": {

&nbsp;   "id": "uuid",

&nbsp;   "nome": "João Silva",

&nbsp;   "telefone": "+55 11 99999-8888",

&nbsp;   "email": "joao@email.com"

&nbsp; }

}



⚙️ Configuração



Cada usuário pode:



Ativar/desativar webhooks por evento



Informar a URL de destino para cada tipo de evento



Consultar logs de entrega



A tabela webhook\_configs contém:



{

&nbsp; id: string;

&nbsp; user\_id: string;

&nbsp; evento: string;

&nbsp; url\_destino: string;

&nbsp; ativo: boolean;

&nbsp; criado\_em: timestamp;

}



📊 Logs de Envio (Tabela webhook\_logs)



Cada tentativa de envio de webhook é registrada:



{

&nbsp; id: string;

&nbsp; user\_id: string;

&nbsp; evento: string;

&nbsp; status\_http: number;

&nbsp; payload: json;

&nbsp; resposta: text;

&nbsp; tentativas: number;

&nbsp; enviado\_em: timestamp;

}



Webhooks são reenviados automaticamente até 3 vezes em caso de erro.



Logs podem ser consultados na UI de "Webhooks" por evento ou período.



🔐 Segurança



Todos os envios incluem cabeçalho X-SB-Signature com hash HMAC-SHA256:



X-SB-Signature: sha256=bd76425aaf19a... (gerado com secret compartilhado)



Validação recomendada no receptor:



const signatureValida = verificarAssinatura(payload, secret);



🧠 Boas Práticas



Os webhooks devem ser assinados e registrados.



O sistema receptor deve validar a assinatura.



Retornar HTTP 200 em caso de sucesso.



Retentar envio com setTimeout crescente (1s, 3s, 10s).



Expire eventos com mais de 5 minutos para evitar problemas de latência.



🚀 Integrações Futuras



Envio automático para Zapier, Make (Integromat), Slack ou Discord



Condições por tipo de serviço (ex: notificar se valor for acima de X)



Controle de tentativas via dashboard



✅ Conclusão



Webhooks permitem que o SupportingBases Ultimate se conecte com outros sistemas em tempo real, promovendo automações e integração fluida com fluxos externos. O envio padronizado e a segurança por assinatura garantem robustez e confiabilidade.

