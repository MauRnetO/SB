💰 Módulo Financeiro e Controle de Vendas (docs/financeiro.md)



Este documento detalha todos os recursos de controle financeiro presentes ou planejados no sistema SupportingBases Ultimate, incluindo vendas, comissões, impostos e relatórios.



🧾 1. Registro de Vendas



Origem das vendas:



Produtos vendidos diretamente via sistema



Serviços prestados e agendamentos concluídos



Campos registrados:



cliente\_id



produto\_id ou servico\_id



valor\_unitario, quantidade, desconto (se houver)



forma\_pagamento (dinheiro, PIX, débito, crédito, etc.)



data, hora, observacoes



🧮 2. Cálculo de Comissões



Cada funcionário possui um campo commission\_rate



Ao registrar um serviço ou venda:



Se houver funcionário associado, a comissão é registrada



Pode haver campo de ajuste manual ou fixo por tipo de serviço



Relatórios mensais de total por funcionário



📊 3. Relatórios Financeiros



Total bruto por dia / semana / mês



Total líquido (descontadas comissões e custos)



Comissões totais pagas



Comparativo por período



Exportação para PDF e Excel



🧾 4. Controle de Custos



Produtos têm campo valor\_compra



Calculado o lucro bruto por unidade vendida



Possibilidade futura de lançar despesas fixas/variáveis



💳 5. Métodos de Pagamento



Configuráveis por usuário:



Aceita PIX



Aceita dinheiro



Cartão de crédito/débito



Link de pagamento externo



Planejado:



Integração com plataformas de pagamento (ex: MercadoPago, Stripe)



Geração automática de recibos



🧮 6. Impostos (Futuro)



Definir alíquota fixa ou por categoria



Cálculo automático no fechamento



Emissão de relatório fiscal simplificado



🛎️ 7. Notificações e Alertas



Alerta de estoque mínimo (produtos)



Alerta de cliente inadimplente (futuro)



Lembrete de vencimento de contas a pagar (futuro)



📁 8. Estrutura de tabelas envolvidas



sales



products



services



employees



clients



commission\_logs



Este módulo será evoluído gradativamente conforme o nível do plano do usuário e poderá ser integrado ao dashboard com gráficos em tempo real.

