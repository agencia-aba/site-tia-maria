# Notas de crawling / pontos para revisão humana

Capturado em 2026-07-15 a partir de https://tiamaria.com.br/ (Joomla + SP Page Builder).

## Metodologia

- Páginas de texto/preço foram baixadas com `curl` (HTML bruto) e também processadas via WebFetch para checagem cruzada.
- Confirmado que as tabelas de sabores de bolo (`/bolos/massa-branca`, `/bolos/massa-chocolate-decoracao-tradicional`, páginas de "Decoração Personalizada") usam paginação **client-side via JavaScript** (SP Page Builder table addon, `data-pagination-item="20"`). Todas as linhas de produto já estão presentes no HTML bruto de uma única requisição — a navegação por páginas (1,2,3,4,5…) visível no site apenas oculta/mostra linhas no navegador, sem carregar HTML adicional. Isso foi verificado contando os códigos de produto (`MBx-x`, `MCx-x`) diretamente no HTML baixado e batendo com o total esperado (80 linhas para Massa Branca = 16 sabores × 5 tamanhos; 77 linhas para Massa Chocolate). Portanto não houve necessidade de requisições por página separadas.
- Texto de "Quem Somos" foi extraído diretamente do HTML bruto (não via resumo de IA) porque a ferramenta de fetch com resumo automático recusou reproduzir o texto verbatim por precaução de direitos autorais — mesmo sendo conteúdo do próprio site do cliente que está sendo migrado para o novo site. Extração manual via regex confirmou o texto completo, incluindo Missão/Visão/Valores (que ficam em blocos `<div class="sppb-addon-content">`, não em tags `<p>`).

## Ambiguidades / inconsistências encontradas no site original

1. **MB7 e MB8 (Massa Branca, Decoração Tradicional)** têm exatamente o mesmo nome "Mousse maracujá" e os mesmos preços em todos os tamanhos. Pode ser um sabor duplicado por engano no site original, ou dois sabores realmente distintos com nome idêntico (ex: com/sem pedaços). Mantido como está no `catalog.json`, com observação no campo `obs` do MB8. **Recomenda-se confirmar com o cliente** se um dos dois deve ser removido ou renomeado.
2. **Códigos MB12 e MC15 não existem** nas respectivas tabelas (a numeração pula direto de MB11→MB13 e MC14→MC16). Provavelmente sabores descontinuados. Não é erro de captura — confirmado inspecionando o HTML bruto.
3. **MC17 "Bolo Kit Kat"** só tem 2 variações de tamanho/preço no site (A = 10 pessoas R$182 e B = 15/20 pessoas R$363), diferente de todos os outros sabores que têm 5 variações (A-E). Não há preço para 15/20 retangular, 25 pessoas ou 30/40 pessoas neste sabor — parece ser proposital (sabor especial/premium com opções limitadas), não uma falha de captura.
4. **Decoração Personalizada / Massa de Chocolate — "PER MC 1" (Brigadeiro)**: no HTML bruto do site, tanto a faixa de 10-15 pessoas quanto a de 20-25 pessoas aparecem rotuladas com o mesmo sufixo "B" (`PER MC 1 B` duas vezes), sem nunca aparecer "PER MC 1 A". Provável erro de digitação do site original. No `catalog.json` mantive os dois preços (R$202 e R$299) associando-os às chaves `A` e `B` por consistência com os demais sabores da mesma tabela — os preços em si foram confirmados corretamente pela extração (R$126 base / R$202 / R$299).
5. **Painéis "BOLOS DECORAÇÃO ESPECIAL" / "ACRÉSCIMO DE R$25,00" / "BOLOS TRADICIONAIS COM TOPO"**: não são páginas de produto separadas com preços por item — são galerias/painéis informativos embutidos nas páginas de listagem de sabor (ex: `/bolos/massa-branca`), funcionando como add-ons genéricos ("Topo de bolo R$20,00" e "acréscimo de R$25,00" para decoração especial) aplicáveis a qualquer bolo do catálogo. Estruturei como `bolos.extras` no `catalog.json`. **Recomenda-se confirmar com o cliente** exatamente a que esses acréscimos se aplicam (todo bolo? só alguns sabores?) já que o site não deixa isso 100% explícito.
6. **Kit "Comemore em Casa"** (`/kits-festa/em-casa/comemore-em-casa`) é o único kit que não mostra preço parcelado (3x) nem quantidade de descartáveis — só preço à vista para 2 variantes (5 e 10 pessoas) com composição resumida (bolo, doces, mini cupcakes, salgados). Diferente do padrão dos demais kits "X Pessoas", que têm sempre preço parcelado + descartáveis detalhados. Não é erro de captura, é como a página realmente está estruturada.
7. **Kit "Festa na Caixa"** (`/kits-festa/em-casa/festa-na-caixa`) também não mostra parcelamento, apenas preço à vista de R$203,00.
8. Alguns kits usam grafias variadas para o mesmo item ("Bolinhos de queijo" vs "Bolinhas de Queijo", "Sprite" vs "Sprits", "1 Vela palito" vs "1 Vela palito ou interrogação") — mantidas como capturadas no site, sem normalizar, para não perder nuance. Vale revisar/normalizar ao montar o site novo.
9. Imagens de miniatura da galeria "Quem Somos" usam sufixo `-tb` (thumbnail, ex: `tiamaria02-tb.jpg`); a versão em tamanho grande usada no lightbox (sem sufixo) é a que foi baixada para `assets/images/historia/` e `assets/images/dias-atuais/`. As versões `-tb` **não foram baixadas** (redundantes, mesma imagem em resolução menor) — se o site novo precisar de thumbnails separados, eles podem ser gerados a partir das versões grandes já baixadas.

## Páginas visitadas (todas acessíveis, nenhuma falhou)

- `/` (home)
- `/quem-somos`
- `/bolos`
- `/bolos/escolha-massa-decoracao-tradicional`
- `/bolos/massa-branca`
- `/bolos/massa-chocolate-decoracao-tradicional`
- `/bolos/decoracao-personalizada-escolha-da-massa`
- `/bolos/decoracao-personalizada-massa-branca`
- `/bolos/decoracao-personalizada-massa-de-chocolate`
- `/salgados`
- `/doces`
- `/kits-festa`
- `/kits-festa/em-casa`
- `/kits-festa/em-casa/comemore-em-casa`
- `/kits-festa/em-casa/festa-na-caixa`
- `/kits-festa/em-casa/p-10-pessoas`
- `/kits-festa/em-casa/p-15-pessoas`
- `/kits-festa/em-casa/p-20-pessoas`
- `/kits-festa/em-casa/p-30-pessoas`
- `/kits-festa/em-casa/p-40-pessoas`
- `/kits-festa/em-casa/p-50-pessoas`
- `/kits-festa/na-escola`
- `/kits-festa/na-escola/p-15-criancas`
- `/kits-festa/na-escola/p-20-criancas`
- `/kits-festa/na-escola/p-30-criancas`
- `/kits-festa/na-escola/p-40-criancas`
- `/kits-festa/no-escritorio`
- `/kits-festa/no-escritorio/p-10-pessoas`
- `/kits-festa/no-escritorio/p-15-pessoas`
- `/kits-festa/no-escritorio/p-20-pessoas`
- `/kits-festa/no-escritorio/p-30-pessoas`
- `/kits-festa/no-escritorio/p-40-pessoas`
- `/kits-festa/no-escritorio/p-50-pessoas`

Nenhuma página retornou erro. Nenhum outro link de kit família/tier foi encontrado além dos listados acima nas respectivas páginas de índice.

## Imagens

Ver lista de download e eventuais falhas em `assets_download_failures.txt` na raiz do projeto (arquivo de log temporário do processo de download — vazio/inexistente = todas as imagens da lista baixaram com sucesso). Contagem final de imagens baixadas está no relatório final da tarefa.

Raw HTML files baixados para verificação foram usados apenas como material de apoio temporário para esta coleta e já foram apagados da raiz do projeto ao final da tarefa (não fazem parte do catálogo final).

## Atenção: pastas inesperadas na raiz do projeto

Durante esta tarefa foram encontradas as pastas `.claude/launch.json`, `kits-festa/` (vazia) e `plataforma-pedidos/` (contendo `index.html`, `checkout.html`, `confirmado.html`, uma área `admin/` com `clientes.html`/`login.html`/`pedidos.html`/`produtos.html`, `assets/app.css`, `assets/cart.js`, `assets/data.js` e um `README.md`) já presentes na pasta do projeto — **não foram criadas por esta tarefa de coleta de dados**. O prompt original desta tarefa dizia que a pasta estava vazia no início. Isso sugere que outra sessão/processo pode estar trabalhando em paralelo nesta mesma pasta construindo código de site (o que esta tarefa foi explicitamente instruída a NÃO fazer). Nenhum arquivo dessas pastas foi tocado, movido ou apagado por esta coleta — apenas `assets/`, `data/` e arquivos temporários próprios (`*.html` de apoio, já removidos) foram manipulados. **Recomenda-se verificar com o usuário se há outra sessão em andamento nesta mesma pasta antes de prosseguir**, para evitar conflitos.
