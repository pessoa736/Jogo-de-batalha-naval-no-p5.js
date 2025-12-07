# Jogo de Batalha Naval - P5.js
- click aqui para jogar: [Batalha Naval](https://pessoa736.github.io/Jogo-de-batalha-naval-no-p5.js/)
## Sobre o Projeto
Este é meu projeto para a Avaliação 3 da disciplina de Lógica de Programação (LoP), ministrada pelo professor Marconi Rodrigues. O jogo "Batalha Naval" foi desenvolvido utilizando a plataforma P5.js.

## Descrição do Jogo
Um jogo simplificado de batalha naval onde o jogador precisa encontrar e destruir um submarino escondido em uma das 20 posições disponíveis.

## Funcionalidades Implementadas

### Animação Inicial
- Animação do submarino composta por 5 imagens armazenadas em vetor
- Transição automática para a tela do jogo

### Tela do Jogo
- Mensagem com instruções do jogo
- Contador de disparos restantes (atualizado em tempo real)
- 20 retângulos representando as posições possíveis do submarino
- Sistema de feedback visual (cores diferentes para acertos e erros)

### Mecânica do Jogo
- Submarino ocupa 3 posições consecutivas escolhidas aleatoriamente
- Jogador tem 3 disparos para encontrar o submarino
- Mudança de cor nas posições clicadas ("tiro na água")
- Revelação do submarino ao acertar
- Música de vitória quando o jogador acerta
- Música de derrota quando os disparos acabam
- Possibilidade de jogar novamente

## Tecnologias Utilizadas
- P5.js
- JavaScript

## Estrutura do Código
O projeto utiliza apenas as funções permitidas:
- `preload()` - Carregamento de imagens e sons
- `setup()` - Configuração inicial do jogo
- `draw()` - Loop principal de renderização
- `mouseClicked()` - Detecção de cliques do jogador

### Uso de Vetores
- **Animação**: Vetor `animSubmarino[]` armazena as 5 imagens da animação
- **Cores**: Vetor `coresDasCasas[]` armazena as cores das 20 posições
- **Músicas**: Vetor `musicas[]` armazena as músicas de vitória e derrota
- **Caixas de diálogo**: Vetores para posições e textos das mensagens na tela

## Como Jogar
1. Aguarde a animação inicial ou clique para pular
2. Clique em uma das 20 casas para disparar
3. Tente acertar o submarino em até 3 disparos
4. Ao finalizar, clique para jogar novamente

## Desenvolvedor
**Aluno**: Davi dos Santos Passos  
**Disciplina**: Lógica de Programação (LoP)  
**Professor**: Marconi Rodrigues  
**Período**: Novembro/Dezembro 2025

## Link do Vídeo Explicativo
[ainda para fazer]

---

*Projeto desenvolvido como parte da avaliação da 3ª unidade da disciplina de Lógica de Programação.*
