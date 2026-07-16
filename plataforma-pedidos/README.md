# Plataforma de Pedidos Tia Maria — Protótipo

Protótipo navegável (frontend puro, sem backend) da plataforma de pedidos descrita na
especificação. Todos os dados (produtos, pedidos, clientes) são de exemplo, definidos em
`assets/data.js`. Nada aqui persiste em banco de dados — é um clique-e-veja para validar o
fluxo antes de investir em servidor/banco.

## Como abrir
Sirva a pasta raiz do site (`Novo Site 2026/`) com qualquer servidor estático — por exemplo
`npx serve .` — e acesse `/plataforma-pedidos/index.html`. Não abra os arquivos direto com
`file://`, pois os caminhos são absolutos a partir da raiz do site (`/assets/...`).

## Páginas
- `index.html` — catálogo com selo **Pronta Entrega** / **Sob Encomenda** (+ prazo).
- `checkout.html` — checkout inteligente em 3 passos: resumo → CEP/distância → dados do cliente.
- `confirmado.html` — confirmação do pedido, com link para reenviar resumo via WhatsApp.
- `admin/login.html` — login simulado (qualquer e-mail/senha entra).
- `admin/pedidos.html` — painel Kanban (Novo → Em Produção → Pronto → Entregue/Retirado).
- `admin/produtos.html` — inventário flexível (Pronta Entrega vs Sob Encomenda + lead time).
- `admin/clientes.html` — CRM com histórico de pedidos por cliente.

## O que já reflete a regra de negócio
- Sem checkout transacional: mensagem fixa "Pagamento realizado no pedido confirmado".
- Validação geográfica: pede CEP, estima distância até Jandira/SP e **bloqueia entrega** acima
  de 30km com aviso amigável — mas sempre libera retirada na loja.
- Retirada com agendamento (data + horário) e entrega com frete estimado pela distância.
- Prazo de produção (lead time) do item mais demorado do carrinho é exibido no agendamento.

## O que é simulado e precisa virar real na próxima fase
1. **Distância por CEP** (`assets/data.js` → `CEP_DISTANCIA_MOCK`): hoje é uma tabela fixa.
   Em produção, integrar ViaCEP (endereço) + uma API de geolocalização/distância (ex: Google
   Distance Matrix, ou OpenRouteService que tem tier gratuito) a partir da lat/long da loja.
2. **Notificação de pedido e mudança de status** (E-mail/WhatsApp): hoje o "envio" só salva no
   navegador e oferece um link `wa.me` manual. Em produção isso precisa de:
   - Backend com banco de dados (pedidos, produtos, clientes) — hoje tudo é `assets/data.js`.
   - E-mail transacional (ex: Resend, SendGrid, ou SMTP do domínio já usado).
   - WhatsApp: ver recomendação abaixo.
3. **Autenticação real do admin** — hoje o login não verifica nada.
4. **Persistência do Kanban/inventário/CRM** — hoje as mudanças (avançar status, editar produto)
   somem ao recarregar a página.

## WhatsApp — recomendação de caminho
Comece pela rota **não oficial via QR Code** (ex: Z-API, ~R$55–100/mês, mensagens ilimitadas,
sem aprovação da Meta) para validar o fluxo com custo baixo. Migre para a **API oficial via um
BSP** (ex: 360dialog) quando o volume justificar — isso exige verificação da empresa no Meta
Business (CNPJ, contrato social, comprovante de endereço; ~2 a 6 dias úteis) e cobrança por
mensagem (mensagens iniciadas pelo cliente dentro de 24h são gratuitas, o que favorece bastante
esse fluxo de pedidos).

## Próximos passos sugeridos para virar produto real
1. Definir e construir o backend (banco de dados + API) — Next.js/Node + Postgres é uma opção
   comum, mas WordPress/WooCommerce customizado também atende se a Tia Maria preferir editar
   produtos num CMS conhecido.
2. Trocar a tabela de CEP mock por uma API de geolocalização real.
3. Conectar um provedor de WhatsApp (Z-API para começar) e um serviço de e-mail transacional.
4. Adicionar autenticação real ao painel admin.
5. Revisar LGPD: política de privacidade, consentimento no formulário de pedido, e retenção de
   dados de clientes no CRM.
