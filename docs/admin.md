\# Admin Panel Documentation



\## Overview

The admin panel provides complete control and oversight of all platform users, their plans, support needs, and usage metrics. This document outlines the expected capabilities and structure for the `/admin` section of the application.



---



\## 🔐 Access Control

\- \*\*Route\*\*: `/admin`

\- \*\*Access\*\*: Restricted to platform super-admins (verified via Supabase Auth claims).

\- \*\*Middleware\*\*: `requireAdminAccess()` must be applied to all admin routes.



---



\## 📊 Dashboard Overview

\- \*\*Metrics Cards\*\*:

&nbsp; - Total Active Users

&nbsp; - Subscriptions by Tier (e.g., Free, Pro, Enterprise)

&nbsp; - Number of Agendamentos this Month

&nbsp; - Conversion Rate (trial → paid)

&nbsp; - Daily Signups / Revenue (line graph)



\- \*\*Recent Activity\*\*:

&nbsp; - Recent logins

&nbsp; - Plan upgrades

&nbsp; - Support tickets opened



---



\## 👥 User Management

\- \*\*Table with filters\*\* (by name, email, plan, status):

&nbsp; - ID

&nbsp; - Name

&nbsp; - Email

&nbsp; - Plan (Free / Pro / Enterprise)

&nbsp; - Status (Active / Suspended / Trial Expired)

&nbsp; - Last Login

&nbsp; - Created At

&nbsp; - Button: "View Profile"

&nbsp; - Button: "Reset Password"

&nbsp; - Button: "Suspend / Reactivate"



\- \*\*Clicking a user\*\* opens detailed panel with:

&nbsp; - Profile info

&nbsp; - Assigned employees

&nbsp; - Plan history

&nbsp; - Agendamentos volume

&nbsp; - Client count

&nbsp; - Button: "Switch to this user account" (impersonation for debugging)



---



\## 💼 Plan \& Subscription Control

\- \*\*Change user's plan manually\*\*

\- \*\*Grant free usage time (e.g., 7 days trial extension)\*\*

\- \*\*Force downgrade or cancel\*\*

\- \*\*See billing history and Stripe link\*\*



---



\## 📬 Support Tickets

\- Admin-only inbox for all support messages (from `/suporte` form)

\- Sort by: Unread, High Priority, Plan Type

\- Respond directly or escalate to backend team

\- Export support logs to CSV



---



\## 🧪 Feedback e Sugestões

\- Painel com sugestões enviadas pelos usuários (votação opcional)

\- Campo de busca e filtros por palavra-chave

\- Colunas: Autor, sugestão, data, votações, status (em análise / aprovado / recusado / implementado)



---



\## 📑 Auditoria e Logs

\- Log de ações de administradores:

&nbsp; - Mudança de plano

&nbsp; - Reset de senha

&nbsp; - Acesso como usuário

&nbsp; - Alterações críticas (ex: exclusões)

\- Exportável via botão em CSV / JSON



---



\## 📢 Broadcast de Mensagens

\- Criar alerta global para todos os usuários

\- Modal com:

&nbsp; - Título

&nbsp; - Mensagem

&nbsp; - Tipo (info, warning, update)

&nbsp; - Data de expiração da mensagem

\- Exibição no topo da dashboard de cada usuário



---



\## 🔐 Segurança e Permissões

\- Aplicar RLS e policies em Supabase para proteger dados sensíveis

\- Registrar IPs de login administrativo (opcional)

\- Autenticação reforçada com OTP ou 2FA para superadmins (opcional)



---



\## ✅ Futuro (Extras possíveis)

\- Gestão de planos personalizados

\- Criação de cupons e campanhas promocionais

\- Painel de análises por segmento (ex: cabeleireiros vs. clínicas)

\- Detecção automática de contas inativas para sugestões de ações



---



\## Summary

The `/admin` section is the backbone for business intelligence and user management. It must be robust, secure, and intuitive for administrators to maintain the platform at scale. All admin routes must be isolated and protected, with special care on data integrity and support efficiency.



