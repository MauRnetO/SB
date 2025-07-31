\# Public API – SupportingBases Ultimate



Este documento descreve os endpoints públicos da API disponíveis para consumo externo por integrações, parceiros ou sistemas terceiros. Todo acesso é autenticado por \*\*API Key\*\* e sujeito a limitações de uso.



---



\## ✨ Visão Geral



\- URL base da API: `https://api.supportingbases.com`

\- Formato: JSON

\- Autenticação: `Authorization: Bearer <API\_KEY>` no header

\- Rate Limit: 60 requisições/minuto por chave



---



\## ✨ Autenticação



Toda requisição deve conter no cabeçalho HTTP:

```http

Authorization: Bearer SUA\_CHAVE\_AQUI

```

As chaves devem ser geradas dentro do painel do usuário na aba \*\*Integrações / API Keys\*\*.



---



\## ✉️ Endpoints Disponíveis



\### 1. Listar agendamentos

`GET /v1/agendamentos`



\#### Query Params:

\- `inicio` (opcional): Data inicial (YYYY-MM-DD)

\- `fim` (opcional): Data final (YYYY-MM-DD)



\#### Resposta:

```json

\[

&nbsp; {

&nbsp;   "id": "agt\_abc123",

&nbsp;   "cliente": "Joana Lima",

&nbsp;   "servicos": \["Corte", "Coloração"],

&nbsp;   "inicio": "2025-07-23T10:00:00",

&nbsp;   "fim": "2025-07-23T11:30:00",

&nbsp;   "status": "confirmado"

&nbsp; }

]

```



---



\### 2. Criar agendamento

`POST /v1/agendamentos`



\#### Body JSON:

```json

{

&nbsp; "cliente\_id": "cli\_xyz456",

&nbsp; "servicos": \["srv\_1", "srv\_2"],

&nbsp; "inicio": "2025-07-25T14:00:00"

}

```



\#### Resposta:

```json

{

&nbsp; "sucesso": true,

&nbsp; "id\_agendamento": "agt\_new789"

}

```



---



\### 3. Listar serviços e produtos

`GET /v1/catalogo`



Retorna serviços e produtos ativos do usuário:

```json

{

&nbsp; "servicos": \[

&nbsp;   {"id": "srv\_1", "nome": "Corte", "duracao\_min": 60, "valor": 50},

&nbsp;   {"id": "srv\_2", "nome": "Coloração", "duracao\_min": 90, "valor": 120}

&nbsp; ],

&nbsp; "produtos": \[

&nbsp;   {"id": "prd\_1", "nome": "Shampoo", "valor": 30, "estoque": 12},

&nbsp;   {"id": "prd\_2", "nome": "Escova", "valor": 45, "estoque": 6}

&nbsp; ]

}

```



---



\### 4. Solicitar agendamento (clientes externos)

`POST /v1/solicitacoes`



\#### Body JSON:

```json

{

&nbsp; "nome": "Carlos Silva",

&nbsp; "telefone": "+55 11 99999-9999",

&nbsp; "email": "carlos@email.com",

&nbsp; "servicos": \["srv\_1"],

&nbsp; "data\_preferida": "2025-07-28T16:00:00"

}

```



\#### Resposta:

```json

{

&nbsp; "status": "pendente",

&nbsp; "mensagem": "Solicitação enviada para aprovação."

}

```



---



\## ⚡ Webhooks



É possível configurar webhooks para receber eventos em tempo real:

\- `agendamento.confirmado`

\- `agendamento.cancelado`

\- `agendamento.concluido`



Cadastre sua URL na aba \*\*Integrações > Webhooks\*\* no painel.



---



\## ⚖️ Considerações Legais

\- Todos os dados seguem a LGPD.

\- É proibido compartilhar sua chave de API.

\- Abusos podem gerar suspensão imediata do acesso.



---



\## 🌐 Futuras Extensões

\- Busca por cliente

\- Exportação de relatórios

\- Criação de clientes externos via API



---

