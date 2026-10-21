# Cozinhando na Bahia — rota independente

- URL pública pretendida: `https://www.giuzambot.com/games/cozinhando`.
- Export Godot 4.7.1 do commit do game `c510162`, copiado para `public/games/cozinhando/`. Não inclui `.import` ou fontes do projeto.
- HTML inclui base `/games/cozinhando/` para carregar JS/PCK/WASM com e sem barra final. Idioma `pt-BR`. Interface é o canvas do próprio jogo, sem moldura ou menu do site.
- `vercel.json`: duas entradas explícitas antes do fallback SPA; headers COOP/COEP continuam limitados a `/games/*`. Regras das músicas preservadas. Só este jogo usa revalidação de cache para facilitar atualizações dos arquivos de nomes fixos.
- Nenhuma alteração em componentes React, menu, músicas ou `public/profile-game`.
- Base desta publicação: produção `659d0be`, deployment anterior `dpl_43MEBApmkWDbopYpw9aLdoc77vKT`. A branch `develop` contém efeitos de home adicionais; por isso a publicação usa o worktree `personal-site-giuzambot-cozinhando-release`, branch `codex/cozinhando-web`, sem promover tais efeitos.
- Projeto Vercel: `personal-site-giuzambot-sjxq`. CLI local com autenticação expirada; conector Vercel usado para inspecionar/publicar a revisão Git.
- Para atualizar os arquivos: no projeto do game, executar `tools/build.ps1 -Targets Web` e `tools/stage-website.ps1 -SitePath <pasta-do-site>`. Revisar/validar e publicar a revisão resultante.
- Resultado da publicação e teste remoto será registrado em `docs/evidence/web_release/` no projeto do game. Exportação e build não substituem teste real do canvas no navegador.
