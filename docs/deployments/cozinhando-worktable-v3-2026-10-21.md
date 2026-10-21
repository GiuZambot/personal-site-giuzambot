# Banca V3 e emoções — 21/10/2026

## Arte e revisão na fase

Cinco novas artes geradas com o gerador de imagem integrado; originais preservados em `art_source/raw/`, prompts em `art_source/requests/`, hashes e transformação em `art_source/manifest.json`. Normalização determinística, sem desenhar props com código:

| Asset | Fonte de referência | Uso |
| --- | --- | --- |
| `pelourinho_worktable_v3.png` | banca V2 | mesas separadas, vão de piso e tampos mais profundos |
| `stove_stand.png` | fogão portátil anterior | fogão completo apoiado no chão, sob o tacho separado |
| `student_angry.png` | student | irritação por baixa paciência |
| `student_wrong.png` | student | reação surpresa ao produto errado |
| `student_happy.png` | student | satisfação ao concluir o pedido |

Todas foram integradas e vistas em capturas reais do viewport Godot, Compatibility/OpenGL, 1280×720:

- `gameplay.png`: três faixas de paciência e a nova composição completa. Tacho pousa na grelha do fogão; mesa esquerda não continua por baixo. Tampos deixam aproximadamente 65% mais profundidade útil na tela. A faixa vazia acima da bandeja comporta futuros complementos sem desenhar placeholders. A frente de renda continua reconhecível, mas ocupa menos espaço.
- `wrong-transition.png`: meio da transição para surpresa, com produto em retorno. Pose/cabelo permanecem alinhados; diferenças de boca podem se sobrepor brevemente durante 0,20 s. Sem a queda de opacidade de um fade-out/fade-in separado do corpo inteiro.
- `wrong-expression.png`: expressão final de erro, diferente da impaciência e da irritação. Faixa de texto de rejeição fica acima do rosto; olhos e boca legíveis.
- `happy-expression.png`: sorriso no pedido concluído, check no produto e atualização de meta/moedas. Corpo mantém escala/apoio ao longo da troca.
- `states-and-rejection.png`: captura do teste de input com pronto/queimado e reação.

HUD combina creme, teal e detalhes dourados, com relógio central, meta/estrelas e ícone de moeda; todos dinâmicos. Sem título grande. Ícones de interface são geometria nativa; os objetos e retratos continuam arte gerada.

Status: integrado para revisão, sem presumir aceite artístico/cultural da responsável. Ainda existe apenas uma identidade de cliente. Cooler fica parcialmente cortado na borda direita, mas abertura e área de toque estão visíveis. Sombras de contato pertencem à arte; não foram adicionados objetos decorativos para preencher espaço. Complementos e tachos maiores ainda exigem nova revisão de escala ao entrarem no jogo.

## Jogabilidade e verificação

- `test-report.txt`: 37 verificações de domínio, 12 de retratos e 20 de interface/input, todas aprovadas (69 no total).
- Dois cliques imediatos caixa → cliente funcionam antes de terminar a retirada. O trajeto muda de origem sem duplicar a lata. Erro subtrai um ponto, devolve o produto e não permite repetir penalidade durante o retorno, nem alternando seleção entre prato e bebida.
- Chegadas usam o mesmo centro do sprite em repouso. Retorno da lata tem destino próprio na posição de seleção: não reaparece alguns pixels acima quando o envio começou no meio da retirada. Endpoint coberto por teste de input.
- Faixas de paciência testadas inclusive nos limites decimais 6,6 e 3,3 pontos; rosto e cor da barra usam comparação consistente nesses limites.
- Transições testadas quanto a pesos, interrupção, prioridade de sucesso/erro, pausa e remoção de identidades antigas.
- Quatro toques do acarajé, duas posições de fritura, seleção de prato, JSON/modal e toque simultâneo continuam cobertos.
- Captura e testes desta revisão não alteram as evidências de M1/V2. `tools/test.ps1` agora captura V3.
- Som não foi avaliado perceptualmente nesta rodada. Uma execução intermediária teve indisponibilidade de dispositivo WASAPI e fallback Dummy; a execução final registrada passou sem esse aviso. Cues e arquivos de áudio não foram modificados.
- Exportações e eventual publicação ficam registradas em `build-report.txt` e `release.json`. Exportar Android não equivale a validar no aparelho físico.

## Continuidade

`CustomerPortraits` controla apenas apresentação por identidade; regras continuam em `LevelSession`. Layout e HUD ficam em `GameBoard`. `TOPPINGS_RESERVED` documenta a área livre, sem alvo interativo ainda. A retirada da bebida é cosmética e não bloqueia o envio; fritura/entrada de prato continuam com os bloqueios de chegada anteriores.

Próxima revisão da responsável: comparar composição, leitura dos rostos e conforto dos dois toques na demo. Não há necessidade técnica de uma sequência completa de quadros para estas cinco emoções; o custo deve ser considerado apenas para gestos em que as imagens estáticas deixem de comunicar a ação.
