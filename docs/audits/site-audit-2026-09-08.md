# Auditoria do site pessoal — baseline de 2026-09-08

## Resumo executivo

O site tem uma identidade visual memorável e uma ideia diferenciada: transformar o portfólio em um desktop mágico explorável. O problema não é a ideia. O problema é que a metáfora de desktop hoje também é a única arquitetura de navegação, então a experiência criativa bloqueia a função básica do site.

No estado atual, o site publicado é lento em rede móvel, inutilizável em partes importantes no celular, quase inacessível por teclado, pouco legível por buscadores e possui fluxos comprovadamente quebrados para músicas e para o jogo Cooking. A interface também contém controles que parecem funcionar — pesquisa, iniciar, volume, bateria, notificações e o botão da capivara — mas não entregam uma função clara. Isso reduz confiança e faz o site parecer um protótipo, mesmo quando a arte causa uma ótima primeira impressão.

A recomendação estratégica é preservar o “desktop encantado” como diferencial e camada de exploração, mas deixar de usá-lo como única porta de entrada. O próximo desenho deve oferecer uma entrada clara e rápida para quem quer entender quem é Giu, ver trabalhos, jogar algo ou entrar em contato — e então recompensar quem desejar explorar o mundo interativo.

## Escopo e método

Esta auditoria foi somente diagnóstica. Nenhuma correção funcional ou atualização de dependência foi aplicada.

Foram verificados:

- branch local `bruxinha`, commit `98d0681`, inicialmente sem alterações locais;
- código React/TypeScript, CSS, configuração Vite/Vercel, rotas e assets;
- build de produção e comando de lint;
- navegação real com Chromium em desktop e iPhone 15 emulado;
- site publicado em `https://www.giuzambot.com/`;
- rede, console, foco por teclado e comportamento responsivo;
- auditoria Lighthouse mobile com rede simulada e CPU 4x mais lenta;
- dependências desatualizadas e `npm audit --omit=dev`.

Evidências brutas ficaram em `output/`:

- `output/lighthouse/home-mobile.json`;
- `output/playwright/home-desktop.png`;
- `output/playwright/home-iphone15.png`;
- `output/playwright/bio-modal-desktop.png`;
- `output/playwright/bio-modal-iphone15.png`.

## Baseline mensurável

| Área | Resultado observado |
| --- | --- |
| Build | Passou: `tsc && vite build`, em 6,37 s localmente |
| Lint | Falhou: o script existe, mas o executável `eslint` não está instalado |
| Testes automatizados | Não há suíte de testes nem script `test` |
| Assets em `src/assets` | 36,1 MB |
| Assets públicos de jogos | 122,87 MB |
| Git pack local | 120,55 MiB |
| JS base de produção | 299,78 kB (100,14 kB gzip) |
| Chunk da Home | 171,15 kB (49,77 kB gzip) |
| Home publicada, sessão limpa | aproximadamente 16,56 MB transferidos; evento `load` em 5,95 s no teste desktop |
| Lighthouse mobile | Performance 40; Acessibilidade 100; Boas práticas 79; SEO 92 |
| Lighthouse mobile — tempos | FCP 4,6 s; TBT 680 ms; Speed Index 12,7 s; LCP 85,1 s |
| Lighthouse mobile — payload | 16.407 KiB; economia estimada de 14.829 KiB em entrega de imagens |
| Terceiros | aproximadamente 580 ms de bloqueio de main thread no cenário Lighthouse |

O LCP de 85,1 s é um resultado extremo de uma execução com rede móvel simulada. Ele demonstra instabilidade severa sob condições limitadas, mas não deve ser tratado como o tempo universal de todos os visitantes. Já o payload de cerca de 16 MB apareceu tanto localmente quanto no site publicado e é um problema reprodutível.

O Lighthouse marcou acessibilidade 100 porque os ícones principais são `div`s genéricas, não porque a navegação seja realmente acessível. A inspeção manual encontrou sete ícones de navegação fora da ordem de foco; entre os controles do próprio site, apenas o campo de pesquisa e o botão “Olá!” são focáveis.

## Achados priorizados

### P0 — fluxos quebrados e bloqueios de acesso

#### 1. Músicas abrem uma página vazia

- Os ícones apontam para `music/<youtube-id>`.
- O roteador só declara `/music`, sem `:id` (`src/Router.tsx:23`).
- O componente espera `useParams().id` e, em `/music`, gera um embed com `undefined`.
- `https://www.giuzambot.com/music/2n-rhIH5pEo` foi testada e renderizou uma página completamente vazia.
- Dois itens ainda usam `HIDDEN_VIDEO_ID_1` e `HIDDEN_VIDEO_ID_2`, portanto continuariam inválidos mesmo após corrigir a rota.

Impacto: uma área inteira do portfólio não funciona e devolve uma tela sem explicação ou recuperação.

#### 2. Cooking não roda pelo fluxo publicado

- A home abre `/games/cooking` dentro de um iframe/modal.
- Essa rota cria um segundo iframe para `./cooking_iframe/index.html` (`src/widgets/GodotGame/GodotGame.tsx:6`).
- No site publicado, o Godot informa ausência de `Cross Origin Isolation` e `SharedArrayBuffer`.
- Os headers de isolamento são aplicados apenas a `/games/(.*)` (`vercel.json:27`), enquanto o documento superior continua sendo `/`.
- O atributo `allow="cross-origin-isolated; allow-same-origin; allow-scripts"` usa tokens que o navegador não reconhece como Permissions Policy; isso gerou dois warnings.

Impacto: o principal exemplo jogável apresentado na pasta Games exibe uma mensagem de erro técnico.

#### 3. Mobile transborda e os modais são impraticáveis

- Em viewport de 390 px, o documento medido chegou a aproximadamente 708 px de largura.
- A barra de tarefas exige mais largura do que a tela por causa da pesquisa de 250 px mais os ícones do sistema.
- O modal possui `min-width: 400px` e largura padrão de 600 px.
- A captura de iPhone mostra o modal de biografia cortado horizontalmente, com conteúdo e controles fora da área útil.
- Não existem media queries no código da aplicação.

Impacto: parte considerável do tráfego potencial de redes sociais chega a uma experiência quebrada.

#### 4. A navegação exige duplo clique e não aceita teclado

- Cada destino é uma `div` com `onDoubleClick` (`src/components/DesktopIcons/DesktopIcons.tsx:74-90`).
- Um toque/clique simples não produz resposta; isso foi confirmado no iPhone emulado.
- Os ícones não têm `button`, `a`, `tabIndex`, `role` nem tratamento de Enter/Espaço.
- Arrastar começa em `mousedown` e chama `preventDefault`, reforçando uma interação pensada somente para mouse.

Impacto: usuários mobile podem concluir que nada funciona; teclado e tecnologias assistivas não conseguem acessar as seções.

### P1 — performance, estabilidade e confiança

#### 5. Ícones de 56 px baixam imagens de 1024 × 1024

Os principais ícones visuais têm de 1,4 a 1,6 MB cada, embora sejam exibidos a 56 × 56 px. O Lighthouse mediu aproximadamente 99% de desperdício individual em vários deles. A bruxa baixa 2,0 MB para ser exibida com 150 px de largura; o fundo baixa 2,44 MB.

O problema deve ser resolvido por variante no tamanho de uso, não apenas por conversão cega de PNG para WebP/AVIF. Devem existir fontes maiores apenas quando uma tela realmente precisar delas.

#### 6. O morcego causa churn de rede e renderização

`src/components/Bat/Bat.tsx:15-19` troca o `src` entre dois PNGs a cada 200 ms, mesmo quando o morcego está invisível. No site publicado, o navegador abortou repetidamente requisições do segundo frame antes de conseguir terminá-las. Em rede lenta isso cria desperdício, posterga a estabilização visual e pode contribuir para o LCP extremo.

#### 7. Todos os ícones de pastas entram no grafo inicial

`Icons.tsx` importa imagens das pastas Games, Music e Grimório no mesmo módulo dos ícones da home. Mesmo conteúdo ainda fechado participa do bundle/grafo inicial. Os jogos grandes não são baixados antes de abrir, mas as artes das pastas são.

Também há CSS de uma versão anterior da home referenciando imagens grandes que ainda são copiadas para `dist`, apesar de não haver elementos correspondentes na tela atual.

#### 8. Scripts de anúncios e analytics competem com o conteúdo principal

AdSense e Google Analytics carregam diretamente no `<head>` (`index.html:9-16`). No cenário Lighthouse, Google Tag Manager e anúncios somaram cerca de 580 ms de bloqueio de main thread. Não foi encontrado um bloco de anúncio visível que justifique o custo do AdSense na home.

Além da performance, cookies/requests de terceiros aparecem antes de qualquer escolha do visitante. A política existente fala principalmente de jogos e afirma ausência de coleta de informações pessoais, enquanto a home carrega analytics e publicidade. Isso exige revisão de privacidade e consentimento; esta auditoria não faz uma conclusão jurídica.

#### 9. Dependências e bundle não refletem o uso real

- `antd` é carregado para `Layout`, `Row` e `Spin`, elevando o JS base para uma necessidade simples de layout/loading.
- `react-unity-webgl` é importado de forma eager pelo roteador, embora Island seja uma rota secundária.
- `@google/generative-ai` está somente em código comentado.
- `quantaui` e `react-tsparticles` não aparecem em imports ativos.
- `tsparticles` e `@tsparticles/react` merecem consolidação conforme a API realmente usada.

Não se recomenda remover pacotes em massa sem construir e testar cada rota; esta lista é um mapa para limpeza controlada.

#### 10. Animações contínuas não respeitam redução de movimento

A home mantém partículas, bruxa, morcego, respiração, boca e olhos em animação; a Bio executa dois loops de `requestAnimationFrame`. Não há `prefers-reduced-motion`, pausa quando a aba fica oculta nem estratégia de orçamento de animação.

### P1 — arquitetura e bugs latentes

#### 11. Sistema de janelas é imperativo e vaza recursos

`openModal` cria DOM com `innerHTML`, roots React e listeners manualmente (`src/components/Modal/Modal.tsx`). Ao fechar:

- o root React criado para uma pasta não é desmontado;
- o listener anônimo de `window.resize` permanece registrado;
- não existe ciclo React central para janelas, foco, maximização e limpeza;
- IDs como `back-btn` se repetem entre modais;
- `title={icon.name}` é inserido como texto HTML literal, não como JSX;
- histórico de iframes externos pode gerar restrições de mesma origem.

Impacto: bugs intermitentes e uso crescente de memória conforme o visitante abre e fecha janelas.

#### 12. Minimização usa um estado diferente do estado de reabertura

Minimizar aplica `visibility: hidden` (`Modal.tsx:108-113`), mas `openModal` verifica `display` (`Modal.tsx:16-24`). Um novo duplo clique no ícone não restaura a janela; somente o item da barra de tarefas consegue fazê-lo.

#### 13. Bibi aparenta ser uma assistente, mas apenas repete a fala

- A integração de IA está comentada.
- O botão não oferece estado visual claro de escuta, erro ou permissão.
- Em navegadores sem Speech Recognition, há apenas um erro no console.
- A voz é selecionada por posição (`voices[1]`), que varia por dispositivo.
- O efeito não remove `onvoiceschanged` nem encerra Recognition/SpeechSynthesis.
- O array de respostas nunca recebe conteúdo no fluxo ativo.

Impacto: uma personagem com alto potencial de diferenciação hoje comunica promessa maior do que a função entregue.

#### 14. Controles decorativos parecem controles reais

Pesquisa, menu iniciar, chevron, bateria, volume, notificações e botões Perfil/Menu do modal não possuem comportamento útil. Elementos clicáveis sem resposta são mais prejudiciais que decoração assumidamente decorativa, pois ensinam o visitante a desconfiar da interface.

#### 15. Ausência de recuperação de erro e 404

Não há rota curinga, error boundary, loading específico para jogos nem mensagens de recuperação. Qualquer rota não reconhecida fica vazia, como demonstrado pelo fluxo de música.

### P1 — qualidade e segurança de dependências

#### 16. O lint oficial não executa

`package.json:10` declara ESLint, mas ESLint e seus plugins/configurações não constam nas devDependencies. Isso impede usar o comando como gate de qualidade.

#### 17. Não há testes automatizados

Não existem testes de rota, navegação, modal, teclado, mobile nem smoke dos jogos. O bug de música seria detectado por um teste simples que abrisse cada destino declarado em `Icons.tsx`.

#### 18. Auditoria de dependências encontra vulnerabilidades conhecidas

`npm audit --omit=dev` encontrou quatro entradas na árvore: três classificadas como altas e uma moderada. O grupo principal passa por `react-router-dom` 6.25.1 e dependências transitivas. Existe correção disponível, mas a versão-alvo precisa ser escolhida com cuidado e validada porque uma atualização major de Router pode exigir migração.

### P2 — descoberta, SEO e conversão

#### 19. A home não explica rapidamente quem é Giu nem o que o visitante pode fazer

A tela mostra ícones e personagens, mas não contém título principal, proposta de valor, prova de trabalho ou CTA evidente. Para entender a pessoa por trás do site, é necessário saber que “Biografia” exige duplo clique e então ler o conteúdo dentro de um iframe/modal.

Uma experiência divertida ainda precisa responder em poucos segundos:

- quem é Giu;
- o que ela cria;
- o que há para explorar;
- por que isso importa;
- qual é o próximo gesto útil.

#### 20. A arquitetura é opaca para buscadores e compartilhamento social

- Os destinos da home não são links reais.
- Não há `<h1>` ou conteúdo descritivo na home.
- Todas as rotas compartilham o mesmo title e description do `index.html`.
- Não há canonical, Open Graph, Twitter Card ou dados estruturados.
- Não existe `sitemap.xml`.
- Não existe `robots.txt`; por causa do rewrite SPA, `/robots.txt` devolve o próprio HTML. O Lighthouse registrou 29 erros de sintaxe.
- Conteúdo valioso fica atrás de JavaScript, modais e iframes.

Impacto: o site depende de quem já recebeu o link e tem curiosidade para explorar; ele quase não constrói superfícies de descoberta orgânica.

#### 21. Analytics mede page view, mas não responde perguntas de produto

Não há eventos úteis para saber:

- qual ícone é aberto;
- quantas pessoas chegam a um projeto;
- quantas iniciam um jogo;
- quantas clicam em contato;
- em qual etapa abandonam;
- quantas falhas de jogo/iframe ocorrem.

Sem um funil mínimo, mudanças de aquisição serão guiadas por sensação, não por evidência.

#### 22. O conteúdo de portfólio é raso e desatualizado em pontos visíveis

Os jogos aparecem como “Cooking(in develop)” e “Island Alone (old site home)”. A biografia é extensa, genérica em resultados e não mostra projetos, números, decisões ou evidências de impacto. O site aponta para Almatter, GitHub e LinkedIn, mas não explica por que cada destino é relevante para públicos diferentes.

## Direção recomendada para a conversa de produto

Não recomendo descartar o conceito atual e trocar por um portfólio corporativo genérico. Isso removeria justamente a personalidade que pode fazer o site ser lembrado. Também não recomendo apenas “otimizar imagens e corrigir bugs”: isso deixaria rápido um cartão de visita ainda sem objetivo.

A direção com melhor potencial é um **portfólio jogável com entrada clara**:

1. uma camada inicial leve responde quem é Giu, mostra 2–4 trabalhos fortes e oferece ações claras;
2. o desktop mágico continua disponível como forma de explorar, com clique simples, teclado e adaptação mobile;
3. cada projeto possui uma página/link rastreável com contexto, resultado, tecnologia, mídia e CTA;
4. Bibi vira guia de exploração com escolhas curtas e úteis, não um botão de fala sem destino;
5. pequenos elementos de jogo — descobertas, reações, conquistas ou segredos — recompensam curiosidade sem bloquear informação;
6. jogos são carregados sob demanda em uma superfície tecnicamente compatível, com progresso, requisitos e fallback.

## Ordem de implementação sugerida

### Marco A — voltar a ser confiável

- corrigir rotas de música e remover itens inválidos;
- fazer Cooking funcionar fora do aninhamento incompatível ou alterar a estratégia de isolamento;
- adicionar 404/error boundary e fallbacks;
- tornar ícones acionáveis por clique/toque e teclado;
- ajustar home, barra e modais para mobile;
- remover ou desabilitar visualmente controles sem função;
- restaurar lint e adicionar smoke tests dos destinos.

Critério de saída: todos os destinos funcionam em desktop e mobile; teclado alcança a navegação; build, lint e smoke passam; Cooking tem prova técnica de inicialização.

### Marco B — atingir um baseline rápido

- gerar variantes de imagens dimensionadas para uso e formatos modernos;
- definir estratégia responsiva/preload para o fundo;
- corrigir a animação do morcego;
- lazy-load de rotas e catálogos de pasta;
- remover dependências e CSS mortos de forma incremental;
- reduzir e consolidar fontes;
- decidir se AdSense tem valor real e adiar analytics/terceiros até depois do conteúdo crítico;
- respeitar redução de movimento e visibilidade da aba.

Critério de saída proposto: payload inicial abaixo de 2 MB no mobile, sem downloads abortados, Lighthouse mobile estável acima de 80 e sem regressão visual aprovada manualmente.

### Marco C — transformar visita em relação

Este marco depende da conversa de produto. Antes de desenhá-lo, precisamos escolher a prioridade principal entre contratação profissional, clientes para produtos/serviços, audiência para games/música/livros ou uma combinação explicitamente hierarquizada.

Depois dessa decisão:

- criar proposta de valor e caminhos por intenção;
- selecionar projetos e provas;
- definir CTA principal e secundário;
- estruturar páginas indexáveis, metadados, sitemap e compartilhamento social;
- instrumentar eventos do funil;
- revisar privacidade/consentimento conforme as ferramentas mantidas;
- desenhar as mecânicas divertidas que reforçam a identidade em vez de esconder conteúdo.

## Questões para a próxima conversa

1. Qual resultado seria o mais valioso nos próximos seis meses: oportunidades profissionais, clientes Almatter, jogadores, audiência autoral/musical ou outro?
2. Quais três trabalhos melhor provam a capacidade que você quer vender hoje?
3. O visitante deve conhecer primeiro “Giu profissional”, “Giu criadora de mundos” ou “Almatter”?
4. Bibi deve ser guia do portfólio, personagem narrativa, assistente útil ou apenas mascote?
5. A experiência desktop é a home principal ou um modo “explorar/jogar” depois de uma entrada mais direta?
6. AdSense gera receita material suficiente para justificar custo, cookies e ruído?
7. Quais conteúdos podem ser públicos e permanentes o bastante para SEO?

## Contratos a preservar na futura implementação

- manter a personalidade fantástica e o potencial lúdico do site;
- não carregar builds de jogos antes de intenção explícita;
- não tratar Lighthouse como aprovação visual ou de diversão;
- validar desktop, touch, teclado e redução de movimento separadamente;
- preservar URLs públicas úteis ou fornecer redirects;
- medir antes/depois com o mesmo perfil de teste;
- executar migrações de dependência em incrementos pequenos;
- não expor chaves de APIs no cliente;
- revisar a política de privacidade sempre que analytics, anúncios ou IA mudarem.

