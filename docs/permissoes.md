modo arquiteto de software crítico nível sênior. 

🔐 permissões.md – Controle de Acesso Completo



Este documento define todas as permissões de acesso às rotas, funcionalidades e dados do sistema \*\*SupportingBases Ultimate\*\*, segmentadas por tipo de usuário, incluindo controle granular por funcionário.



---



\## 🎭 Perfis de Usuário



| Papel           | Descrição                                                  |

|------------------|------------------------------------------------------------|

| `admin`          | Responsável pelo sistema. Acesso total a tudo.             |

| `usuario`        | Dono da conta (empresa). Gerencia tudo da sua empresa.     |

| `funcionario`    | Membro da equipe do usuário. Acessa funções delegadas.     |

| `cliente`        | Usuário externo. Pode solicitar agendamentos e interagir.  |



---



\## 🔒 Níveis de Acesso por Rota



| Rota                          | Admin | Usuário | Funcionário | Cliente Final |

|-------------------------------|:-----:|:-------:|:-----------:|:-------------:|

| `/login` / `/cadastros`       | ✅    | ✅      | ✅           | ✅             |

| `/dashboard`                  | ✅    | ✅      | ✅\*          | ❌             |

| `/agendamentos`               | ✅    | ✅      | ✅           | ❌             |

| `/agendamentos/novo`          | ✅    | ✅      | ✅           | ❌             |

| `/clientes`                   | ✅    | ✅      | ❌           | ❌             |

| `/servicos`                   | ✅    | ✅      | ✅           | ❌             |

| `/produtos`                   | ✅    | ✅      | ✅           | ❌             |

| `/historico`                  | ✅    | ✅      | ✅           | ❌             |

| `/preferencias`               | ✅    | ✅      | ❌           | ❌             |

| `/preferencias/notificacoes`  | ✅    | ✅      | ❌           | ❌             |

| `/notificacoes`               | ✅    | ✅      | ❌           | ❌             |

| `/assinatura`                 | ✅    | ✅      | ❌           | ❌             |

| `/funcionarios`               | ✅    | ✅      | ❌           | ❌             |

| `/clientes/agendamento`       | ❌    | ❌      | ❌           | ✅             |

| `/funcionario/tarefas`        | ❌    | ❌      | ✅           | ❌             |



> \*\*✅\\\*\*\* Funcionários veem dashboard com visão limitada (tarefas e agenda atribuída)



---



\## 🔁 Ações Permitidas por Perfil



\### 🔹 \*\*Admin do Sistema\*\*

\- Acesso total a tudo

\- Gerencia usuários e empresas

\- Exporta base completa

\- Visão global



\### 🔹 \*\*Usuário com Conta Ativa\*\*

\- Controla agenda, clientes, serviços, produtos, equipe

\- Acessa relatórios e personalizações

\- Define permissões da equipe

(“Toda alteração nas permissões de funcionários deve ser registrada com timestamp e user_id do responsável.”)



\### 🔹 \*\*Funcionário\*\*

\- Vê agendamentos atribuídos

\- Executa tarefas

\- Marca como concluído

\- (Permissões ajustáveis pelo proprietário)




\### 🔹 \*\*Cliente Final\*\*

\- Solicita agendamento

\- Visualiza catálogo público

\- Recebe notificações e confirmações

\- Sem acesso ao backend



---



\## 🧩 Permissões Granulares por Funcionário



Cada funcionário deve ter um campo `permissions` na tabela `employees` com permissões detalhadas por recurso:



```

json





{

&nbsp; "agendamentos": {

&nbsp;   "visualizar": true,

&nbsp;   "editar": false

&nbsp; },

&nbsp; "clientes": {

&nbsp;   "visualizar": true,

&nbsp;   "editar": false

&nbsp; },

&nbsp; "produtos": {

&nbsp;   "visualizar": false,

&nbsp;   "editar": false

&nbsp; },

&nbsp; "financeiro": {

&nbsp;   "visualizar": false,

&nbsp;   "editar": false

&nbsp; },

&nbsp; "tarefas": {

&nbsp;   "visualizar": true,

&nbsp;   "editar": true

&nbsp; }

}



```

Isso dá controle total ao proprietário da conta sobre quem pode ver ou editar o quê.

(“Toda alteração nas permissões de funcionários deve ser registrada com timestamp e user_id do responsável.”)



🖥️ Como aplicar no Frontend

Exemplo em React:



```



tsx





if (!permissions?.clientes?.visualizar) {

&nbsp; return <p>Acesso negado à área de clientes.</p>

}



{permissions?.tarefas?.editar \&\& (

&nbsp; <button>Editar tarefa</button>

)}



```



🔐 Restrições Técnicas e RLS

Toda query no Supabase deve ser filtrada por user\_id



Funcionários acessam apenas dados da sua empresa (owner\_user\_id)



Clientes acessam apenas seus próprios registros



Exemplo de RLS refinada:



```



sql





(permissions->'agendamentos'->>'visualizar')::boolean = true



```



✅ Boas Práticas de Permissões



Comece com permissões mínimas (princípio do menor privilégio)
(“A ausência do campo ou de uma chave deve ser interpretada como permissão negada (false), seguindo o princípio do menor privilégio.”)



Tenha uma UI para o dono configurar permissões da equipe



Evite hardcode no frontend



Audite ações críticas com logs (exclusões, alterações financeiras)



🧠 Extras Técnicos

Os campos role, owner\_user\_id e permissions devem estar presentes nas tabelas usuarios e employees





Suporte completo a multiusuários e multi-níveis



🔄 Integração com Supabase user\_metadata e Roles (para escala futura)

O sistema deve escalar com uso do campo user\_metadata do Supabase Auth e/ou das roles nativas do PostgreSQL para:



🔁 Sincronizar permissões sem depender da tabela employees



🧩 Armazenar funções como admin, usuario, funcionario diretamente no auth.users



🧠 Aplicar RLS com base em auth.uid() + user\_metadata.role



🚀 Permitir regras globais como: funcionários só veem dados da sua empresa



📦 Exemplo de user\_metadata no Supabase Auth:

(“Durante fase de transição, recomenda-se manter permissões em employees.permissions, e migrar para user_metadata.permissions somente quando for necessário usá-las em contexts públicos (ex: Edge Functions, JWT client-side, etc). Um processo de sincronização pode ser feito via trigger ou função ao salvar funcionário.”)



```

json





{

&nbsp; "role": "funcionario",

&nbsp; "owner\_user\_id": "uuid-do-dono",

&nbsp; "permissions": {

&nbsp;   "agendamentos": { "visualizar": true, "editar": false }

&nbsp; }

}



```

🔐 Exemplo de Policy usando user\_metadata:



```

sql





auth.role() = 'funcionario'

AND auth.jwt() -> 'user\_metadata' ->> 'owner\_user\_id' = user\_id::text



```



📌 Vantagem: o sistema pode aplicar segurança mesmo sem fazer JOIN com a tabela employees, ideal para dashboards públicos, Edge Functions e APIs externas.

(“Essas permissões são controladas pelo dono da conta através do painel de gerenciamento da equipe, com interface amigável que converte as escolhas diretamente em JSON salvo na tabela employees.permissions.”)

✅ Conclusão

Para escalar com segurança, performance e controle global, é altamente recomendado migrar as permissões de employees.permissions para auth.user\_metadata.permissions, mantendo sempre role e owner\_user\_id acessíveis via JWT.





