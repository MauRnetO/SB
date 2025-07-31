\# 🛠 painel-admin.md – Painel Administrativo Global



Este documento descreve a estrutura, funcionalidades e responsabilidades do \*\*Painel Admin Global\*\* da plataforma SupportingBases Ultimate. Este painel é separado do painel do usuário comum (empresa), e visa permitir gestão central, análise de contas e governança da plataforma.



---



\## 🎯 Objetivo



Permitir que o time da SupportingBases (admin global) tenha:



\- Visão centralizada de todas as empresas

\- Ferramentas para moderação, segurança e suporte

\- Acesso ao status de contas, assinaturas, uso, logs

\- Controle sobre notificações, planos, auditoria e escalabilidade



---



\## 🧑‍💼 Perfis com acesso



| Tipo de Acesso | Descrição |

|----------------|-----------|

| `admin`        | Conta da SupportingBases. Acesso total ao painel global. |



---



\## 📍 Rota e Acesso



\- Rota protegida: `/admin`

\- Verificação de `user.role === 'admin'` (no `user\_metadata` do Supabase)

\- Protegido por RLS e middleware



---



\## 📊 Módulos disponíveis no Painel



| Módulo                    | Finalidade |

|---------------------------|------------|

| \*\*📦 Empresas\*\*           | Visualizar, aprovar, pausar ou excluir contas |

| \*\*👤 Usuários\*\*           | Ver lista de usuários ativos, inativos, bloqueados |

| \*\*💳 Assinaturas\*\*        | Ver status, planos ativos, inadimplentes, upgrades |

| \*\*📈 Atividade\*\*          | Logs de login, uso de recursos, picos de acesso |

| \*\*🛠️ Auditoria\*\*          | Logs de alterações críticas feitas em qualquer conta |

| \*\*📨 Notificações\*\*       | Visualizar e enviar notificações globais |

| \*\*📥 Webhooks\*\*           | Monitorar e registrar falhas/sucessos de callbacks |

| \*\*🧪 Testes\*\*             | Painel de debug e teste de rotas/funções edge |

| \*\*🔄 Reset de contas\*\*    | Reatribuir conta a outro usuário, redefinir dados |

| \*\*📑 Relatórios globais\*\* | Geração de relatórios completos do sistema |

| \*\*⚙️ Configurações\*\*      | Altere parâmetros da plataforma, regras padrão |

| \*\*👁️ Logs de segurança\*\* | Tentativas de acesso inválido, alertas, banimentos |



---



\## 🧱 Estrutura Visual (exemplo)



```tsx

<AdminLayout>

&nbsp; <SidebarAdmin>

&nbsp;   <MenuItem href="/admin/empresas" icon={<BuildingIcon />} label="Empresas" />

&nbsp;   <MenuItem href="/admin/usuarios" icon={<UsersIcon />} label="Usuários" />

&nbsp;   <MenuItem href="/admin/assinaturas" icon={<CreditCardIcon />} label="Assinaturas" />

&nbsp;   <MenuItem href="/admin/logs" icon={<ShieldIcon />} label="Segurança" />

&nbsp;   <MenuItem href="/admin/notificacoes" icon={<MailIcon />} label="Notificações" />

&nbsp;   ...

&nbsp; </SidebarAdmin>



&nbsp; <AdminContent>

&nbsp;   {/\* Cards e filtros dinâmicos \*/}

&nbsp;   {/\* Tabela de empresas com filtros: status, plano, data de criação \*/}

&nbsp; </AdminContent>

</AdminLayout>

✅ Permissões específicas
Todas as permissões do painel admin são de uso exclusivo do perfil admin. Nenhuma permissão pode ser delegada a usuários comuns (usuario, funcionario).

Ações críticas como redefinição de conta, exclusão forçada ou alteração de plano devem ser logadas na tabela auditoria_admin.

🔐 Segurança e Proteções
Todas as rotas sob /admin/** são protegidas via Supabase RLS

Logs em tempo real em logs_admin

Proteção contra acesso indevido:

Autenticação reforçada (2FA opcional)

Alertas de tentativas suspeitas

Campos sensíveis como senhas ou tokens não são exibidos (somente hash ou máscaras)

📈 Dashboards e Insights
Cada módulo do painel exibe KPIs como:

Total de empresas ativas

Novas contas no período

Inadimplência por plano

Total de agendamentos/usuário

Tempo médio de uso diário

Empresas com menor uso nos últimos 30 dias

📦 Exemplo de Payload no Frontend

ts


// GET /admin/empresas
[
  {
    id: "uuid-empresa",
    nome: "Studio da Lu",
    plano: "PRO",
    status: "ativo",
    data_criacao: "2025-06-21",
    assinatura_valida_ate: "2025-08-21",
    uso_agendamentos: 167,
    uso_storage: "7.2 MB",
    ultima_atividade: "2025-07-21T13:00:00Z"
  }
]

🔁 Interação com outros módulos
Relatórios do painel global podem incluir dados de todos os usuários e empresas

Gatilhos no Supabase para logar automaticamente alterações de plano

Integração com webhooks.md para monitoramento em tempo real

Interface do painel admin serve também como backend visual da public-api.md

🧠 Observações
O painel admin é modular e pode crescer para incluir:

Chat de suporte

Ferramentas de migração entre planos

Painel de analytics avançado (gráficos de churn, LTV, CAC etc.)

Pode ser usado para aplicar manutenção controlada (pausar empresas, travar funções temporariamente)

📌 Conclusão
O Painel Admin é a central de controle do ecossistema SupportingBases Ultimate. Ele é responsável por garantir a governança, rastreabilidade, segurança e suporte à operação de todos os clientes, usuários e dados da plataforma de forma organizada e auditável.
