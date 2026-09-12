# Melhorias do site pessoal — implementação de 2026-09-09

## Resultado

O desktop mágico continua sendo a identidade do site, mas deixou de ser a única forma de entender e navegar o conteúdo. A home agora apresenta Giu, explica a proposta e oferece uma chamada direta para os games da Almatter. Ícones e itens de pastas são controles semânticos, funcionam com um clique e por teclado, e os destinos internos continuam abrindo como janelas para preservar a brincadeira visual.

## Decisões de produto aplicadas

- O ícone Almatter e a chamada principal apontam para `https://almatter.com.br/pt-BR/games` e abrem o domínio oficial em uma nova aba.
- Bibi e Grimório foram ocultados. Bibi ainda existe no código para possível retomada; Grimório saiu do catálogo visível até haver conteúdo suficiente.
- A home ganhou uma apresentação curta e um CTA para transformar o site em ponto de descoberta, não apenas em cartão de visita.
- A interface falsa de desktop foi mantida como camada criativa. A navegação real usa links e botões HTML, permitindo descoberta por buscadores, teclado e leitores de tela.
- O arraste dos ícones foi removido. As posições agora são estáveis e a metáfora visual de Windows não interfere no clique único nem na navegação convencional.
- As janelas adotaram fundo escuro, texto claro e bordas douradas. Isso corrige o contraste sem descaracterizar o tema.
- As janelas ficaram maiores e responsivas: no desktop chegam a 900 x 640 px; no celular ocupam quase toda a tela.
- A Bio ganhou rolagem interna funcional.
- O disco voador da Bio preserva a proporção natural 1:1; antes era renderizado como 200 x 400 px apesar do arquivo ser quadrado.
- Ícones dentro das pastas usam uma área vertical fixa para imagem e título, evitando deslocamento quando o texto ocupa mais linhas.
- O player do YouTube ocupa 100% da largura e altura disponíveis na janela.
- Em 12/09/2026, a pasta Música foi sincronizada com os 28 vídeos públicos do canal Silensia Academy, na ordem do mais recente para o mais antigo.
- A pasta Games aponta diretamente para as seis páginas atuais do portfólio da Almatter e mantém Island Alone como clássico local.
- Cooking e seu export web foram removidos após o projeto ser oficialmente descontinuado.

## Performance

Principais mudanças:

- imagens principais convertidas para WebP e dimensionadas;
- fundo reduzido de aproximadamente 2,44 MB para 106 kB no bundle;
- animação do morcego passou a alternar opacidade entre dois frames já carregados, evitando novas requisições a cada 200 ms;
- partículas e bibliotecas não utilizadas removidas;
- Ant Design removido dos componentes que só precisavam de elementos simples;
- telas secundárias carregadas sob demanda;
- AdSense sem espaço publicitário removido, eliminando iframes invisíveis e erros de rede;
- Google Fonts bloqueantes substituídas por fontes nativas;
- listeners globais e recursos imperativos passaram a ter limpeza explícita.

### Lighthouse móvel

| Métrica | Antes | Depois |
| --- | ---: | ---: |
| Performance | 40 | 99 |
| Acessibilidade | 100* | 100 |
| Boas práticas | 79 | 100 |
| SEO | 92 | 100 |
| FCP | 4,6 s | 1,2 s |
| LCP | 85,1 s | 2,1 s |
| TBT | 678 ms | 48 ms |
| Transferência inicial | 16,02 MB | 0,39 MB |

`*` O 100 anterior não detectava que os ícones eram `div`s fora da navegação por teclado. Isso foi corrigido manualmente com links e botões semânticos.

Os números são de execuções locais do Lighthouse com emulação móvel e servem como comparação técnica, não como garantia de tempo idêntico para todo visitante.

## SEO e descoberta

A solução para conciliar janelas falsas e SEO é separar comportamento de apresentação:

1. buscadores e tecnologias assistivas recebem links reais (`/bio`, `/music/:id`, `/games/...` e o domínio da Almatter);
2. na home, JavaScript intercepta apenas os links internos e mostra o destino em uma janela temática;
3. cada URL também funciona quando aberta diretamente;
4. `robots.txt`, `sitemap.xml`, canonical, Open Graph, Twitter Card e JSON-LD foram adicionados;
5. a home possui um único `h1`, descrição legível e CTA direto para a Almatter.

Esse modelo preserva a experiência divertida sem esconder os destinos. Um passo futuro possível, se o site ganhar artigos ou páginas de muitos jogos, é gerar HTML estático por rota para metadados e textos ainda mais ricos; isso não é necessário para corrigir os bloqueios atuais.

## Verificações executadas

- `npm run build`: passou; 108 módulos transformados em aproximadamente 1,1 s.
- `npm run lint`: passou sem warnings.
- `git diff --check`: sem erros de whitespace; apenas avisos esperados de conversão LF/CRLF no Windows.
- Chromium desktop e viewport móvel 390 x 844: home sem overflow horizontal.
- Home final: zero erros e zero warnings no console.
- Bio: iframe 895 x 560 no teste desktop, `scrollHeight` 1121 e rolagem confirmada até 500 px.
- Bio mobile: janela 378 x 784 em viewport 390 x 844 e rolagem confirmada.
- Música: pasta abriu com um clique, exibiu 28 links únicos e a publicação mais recente, “Ainda é hoje”, carregou o player correto pelo destino `/music/ZW3dYkdJyY0`.
- Games: pasta legível em fundo escuro; seus dois itens são links reais.
- Almatter: `href` verificado como `https://almatter.com.br/pt-BR/games`.
- Bibi e Grimório: ausentes da home.
- Rota inexistente: tela 404 com recuperação para a home.
- Games: links oficiais individuais verificados para os seis projetos publicados pela Almatter; Island Alone permanece local.

## Pendências conhecidas

- `npm audit --omit=dev` ainda reporta duas vulnerabilidades moderadas no React Router 6. A correção automática exige React Router 7, uma migração com mudanças incompatíveis. Não foi aplicada à força neste marco.
- Não existe suíte automatizada do projeto. A validação atual combina TypeScript, lint, Lighthouse e fluxos reais no Chromium.
- A aceitação visual final e a sensação de diversão ainda dependem de revisão humana em dispositivos reais.

## Evidências locais

- `output/lighthouse/home-mobile.json`
- `output/lighthouse/home-mobile-after.json`
- `output/playwright/home-final.png`
- `output/playwright/home-mobile-after.png`
- `output/playwright/bio-window-after.png`
- `output/playwright/bio-mobile-after.png`
- `output/playwright/games-folder-mobile-after.png`
- `output/playwright/music-channel-synced.png`
- `output/playwright/music-newest-player.png`

`output/` e `.playwright-cli/` estão ignorados pelo Git porque são artefatos reproduzíveis de teste, não código do site.
