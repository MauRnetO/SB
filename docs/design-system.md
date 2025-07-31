📐 Design System – SupportingBases Ultimate



Este documento define o sistema de design oficial da aplicação SupportingBases Ultimate. Serve como guia visual, funcional e técnico para garantir consistência, escalabilidade e clareza em todos os componentes da interface.



🎨 Cores Oficiais



Função



Cor Light



Cor Dark



Classe Tailwind



Primária



\#3B82F6



\#60A5FA



bg-primary



Secundária



\#6366F1



\#818CF8



bg-secondary



Sucesso



\#10B981



\#34D399



bg-success



Erro



\#EF4444



\#F87171



bg-error



Fundo Principal



\#F9FAFB



\#0F172A



bg-background



Texto Principal



\#111827



\#F3F4F6



text-base-foreground



✅ As cores devem ser aplicadas via tokens utilitários no Tailwind (bg-primary, text-base, etc), e não diretamente como hex.



🔤 Tipografia



Fonte padrão: Inter



Alternativa: Nunito Sans (para títulos informais)



Tipo



Tamanho



Peso



Classe Tailwind





Título XL



32px



700



text-3xl font-bold





Título Médio



24px



600



text-xl font-semibold





Texto padrão



16px



400



text-base





Legenda



12px



400



text-sm text-muted





🧱 Componentes Reutilizáveis



✅ Botões



Primário: bg-primary text-white hover:bg-primary/90



Secundário: border border-primary text-primary hover:bg-primary/10



Perigo: bg-error text-white hover:bg-error/90



Canto: rounded-2xl



Altura mínima: h-10



✅ Inputs



Estilo padrão: border rounded-lg px-4 py-2 text-base



Com ícone: relative pl-10



Com erro: border-error + mensagem text-error text-sm



✅ Cards



Cor de fundo: bg-white dark:bg-slate-800



Borda: rounded-2xl shadow-md



Padding interno: p-4 ou p-6



Com título: incluir text-xl font-semibold mb-2



✅ Modal



Fundo escurecido: bg-black/40



Card central: rounded-2xl p-6 max-w-lg mx-auto



🌓 Modo Escuro



Ativado com classe dark no <html>



Todo componente deve suportar classes dark:



Botão de toggle deve existir em /preferencias



🖼️ Ícones



Biblioteca: Lucide



Importação padrão: import { IconName } from "lucide-react"



🧑‍🎨 Avatares e Imagens



Avatar padrão: círculo, borda ring-2 ring-primary



Imagens de produto/serviço: rounded-lg object-cover



Tamanho recomendado: 300x300px



🔧 Espaçamentos e Grid



Padding horizontal padrão: px-4 (mobile), px-6 (desktop)



Espaçamento entre seções: my-6



Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 para cards



📱 Comportamento Responsivo



Mobile First com breakpoints Tailwind:



sm: 640px



md: 768px



lg: 1024px



xl: 1280px



A sidebar recolhe automaticamente no md para um menu hambúrguer.



🔁 Animações



Biblioteca: Framer Motion



Transições recomendadas:



Modais: fade in + scale



Cards: hover:scale-105



📚 Componentes customizados



Usar shadcn/ui como base, sobrescrevendo tokens com Tailwind



Evitar bibliotecas com estilos injetados não controláveis



✅ Este Design System deve ser seguido por toda equipe para garantir consistência visual e escalabilidade do projeto SupportingBases Ultimate.

