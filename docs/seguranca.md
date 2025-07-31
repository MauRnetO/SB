🔒 Segurança e Proteção de Dados (docs/seguranca.md)



Este documento cobre todas as estratégias, padrões e recursos de segurança aplicados no projeto SupportingBases Ultimate, garantindo a proteção dos dados dos usuários, conformidade com a LGPD e boa experiência para todos os tipos de acesso.



🔐 1. Autenticação e Acesso



📌 Supabase Auth com segurança reforçada:



Login via código OTP por e-mail (sem link mágico).



Criação de conta exige verificação por código.



Supabase Session persistente com controle de expiração.



Hash de senha armazenado com algoritmo padrão da Supabase (bcrypt).



👥 Tipos de Usuário:



Admin da plataforma → Acesso ao painel geral.



Usuário empresarial (assinante) → Acesso ao sistema completo.



Funcionário de usuário → Acesso restrito às funções atribuídas.



Cliente final → Apenas solicita agendamentos e interage com vitrine pública.



🔁 Sessões e Logout automático:



Sessão expira após inatividade prolongada (configurável).



Logout manual e seguro.



🧱 2. Row Level Security (RLS)



✅ Ativado em todas as tabelas sensíveis:



appointments, clients, services, products, notifications, employees, subscriptions, etc.



🔐 Políticas aplicadas:



Usuário só pode acessar registros com user\_id igual ao seu.



Funcionários só visualizam registros autorizados pelo campo employee\_id ou permissions.



📁 Exceções controladas:



Algumas tabelas públicas como public\_services\_catalog seguem RLS apenas para escrita.



🔍 3. Auditoria e Rastreabilidade



Cada ação relevante é registrada com user\_id, timestamp e tipo\_de\_acao.



Histórico de alterações em agendamentos e tarefas.



Logs de envio de notificações e status (sucesso, falha, pendente).



🔔 4. Rate Limit e Anti-spam



Implementação de Rate Limit via Middleware:



POST → limitado por IP e user\_id.



Requisições repetidas bloqueadas em curto prazo.



Proteção contra brute-force em login e envio de código.



Campos com validação anti-injeção (XSS, SQL, etc.)



🛡️ 5. Conformidade com a LGPD



Todos os dados sensíveis são protegidos por RLS e criptografia.



Consentimento de uso de dados aceito no cadastro.



Política de Privacidade visível e editável por admin.



Possibilidade de solicitar exportação ou exclusão da conta.



🧪 6. Boas Práticas de Segurança no Frontend



Inputs validados e sanitizados.



Escapamento de conteúdo dinâmico (anti-XSS).



Uso de tokens apenas via HttpOnly cookies no caso de futuras integrações mobile/web híbridas.



🔗 7. Integrações seguras



API do Resend com chave protegida no .env.local.



Supabase apenas com permissões mínimas no client.



Webhooks autenticados para sincronização futura (ex: Google Agenda).



🧠 8. Recomendações Futuras



Suporte a autenticação 2FA.



Integração com sistemas de detecção de fraude (ex: Cloudflare Turnstile, ReCAPTCHA).



Monitoramento de sessões suspeitas e alertas ao usuário.



Este documento faz parte do núcleo de confiabilidade do projeto SupportingBases Ultimate. Nenhum sistema será considerado pronto para produção sem cumprir as etapas aqui descritas.

