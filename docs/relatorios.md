📊 Documentação de Relatórios



Objetivo



Permitir aos usuários gerar relatórios completos sobre agendamentos, vendas, desempenho da equipe e custos administrativos, com opção de exportação em PDF, Excel e envio via e-mail ou WhatsApp.



📁 Tipos de Relatórios



1\. Relatórios de Agendamentos



Campos:



Cliente



Data/hora



Serviços executados



Funcionário responsável



Tempo estimado x tempo real



Valor cobrado



Forma de pagamento



Descontos aplicados



Observações



Filtros disponíveis:



Período



Status (concluído, pendente, cancelado)



Funcionário



Tipo de serviço



2\. Relatórios de Vendas (Produtos/Serviços)



Campos:



Produto/Serviço vendido



Quantidade



Valor unitário e total



Cliente



Data



Forma de pagamento



Descontos



Comissão



Filtros disponíveis:



Por funcionário



Por cliente



Por tipo



Por período



3\. Relatórios Financeiros



Campos:



Receitas por serviço



Receitas por produto



Total de descontos aplicados



Total de comissões pagas



Despesas fixas (definidas em Preferências)



Lucro líquido (receita - despesas)



Projeções futuras com base nos dados atuais



Visualizações sugeridas:



Gráfico de barras (lucros x despesas)



Gráfico de pizza (composição de receitas)



Evolução mensal



4\. Relatórios de Equipe



Campos:



Nome do funcionário



Nº de atendimentos



Receita gerada



Comissão total



Horas trabalhadas



Tarefas pendentes e concluídas



Avaliações do cliente (se aplicável)



Filtros disponíveis:



Período



Tipo de serviço



Tipo de função



📤 Exportações



PDF: layout formatado e profissional.



Excel (XLSX): dados brutos com filtros aplicados.



WhatsApp: resumo com link para PDF.



E-mail: envio automático com anexo e mensagem personalizada.



⚙️ Regras Técnicas



Os relatórios devem obedecer às permissões de acesso do usuário logado.



Exportações devem ocorrer via API segura.



O layout de PDF deve conter logo, cabeçalho, data/hora de geração e rodapé com contatos configuráveis em Preferências.



Possibilidade de salvar modelos de relatórios favoritos.



📌 Observações



Relatórios devem ser acessados via /relatorios com sub-aba para cada tipo (financeiro, agendamentos, equipe, vendas).



Filtros aplicados devem ser mantidos ao trocar de aba/exportar.



Botão "Gerar Relatório" deve ser visível somente com filtros preenchidos obrigatórios.



Performance deve ser otimizada para não bloquear a UI durante geração/exportação.





