# 👑 Princess: Magic Kingdom

**Princess: Magic Kingdom** é um jogo de plataforma 2D moderno, polido e encantador, desenvolvido com **HTML5 Canvas, CSS3 e JavaScript Puro (ES6+)**, sem dependências ou frameworks externos.

---

## ✨ Destaques & Melhorias Profissionais

### 1. Física e Jogabilidade Refinada
- **Física Determinística com Fixed Timestep (60 FPS)**: Movimentação suave e idêntica independente do monitor (60Hz, 120Hz, 144Hz ou 240Hz).
- **Coyote Time (130ms)**: Permite saltar brevemente mesmo após sair da beirada de uma plataforma.
- **Jump Buffering (160ms)**: Registra o comando de pulo até 160ms antes de tocar o chão, disparando o salto imediatamente no contato.
- **Pulo de Altura Variável**: Soltar a tecla de pulo reduz a velocidade ascendente suavemente, permitindo saltos curtos e saltos completos.
- **Flutuação Mágica no Ápice (Apex Float)**: Gravidade reduzida no ponto mais alto do salto para controle aéreo refinado.
- **Aceleração e Desaceleração Balanceadas**: Controle horizontal responsivo sem escorregamento excessivo ou paradas bruscas.
- **Colisão AABB Robusta com Inset Vertical**: Elimina qualquer travamento em quinas, frestas ou emendas de plataformas no chão.
- **Plataformas One-Way (Nuvens)**: Atravessáveis por baixo e aterrissáveis suavemente por cima.
- **Plataformas Móveis com Herança de Momento**: Acompanhamento firme do movimento horizontal e vertical, com impulso extra ao saltar de uma plataforma em movimento.

### 2. Design das 5 Fases (100% Concluíveis)
- **Fase 1: Jardim Encantado**: Apresentação suave, flores mágicas, saltos amigáveis e introdução à varinha mágica.
- **Fase 2: Floresta Mágica**: Cogumelos saltadores com animação de compressão e plataformas móveis sobre lagos de névoa.
- **Fase 3: Torre das Bruxas**: Desafios verticais, rotas acrobáticas aéreas e espinhos de ametista com dimensões justas e saltáveis.
- **Fase 4: Reino das Nuvens**: Pontes de nuvens interconectadas, sem abismos impossíveis, molas celestes e saltos fluidos.
- **Fase 5: Castelo da Rainha das Sombras**: Antessala com checkpoint estratégico, varinha mágica, corações extras e arena final com a Rainha das Sombras.

### 3. Combate e Inimigos
- **Mecânica de Stomp (Pulo sobre Inimigos)**: Ricochete satisfatório ao atingir bruxas, dragões e imps por cima.
- **Varinha de Condão**: Disparo de projéteis estelares reluzentes.
- **Chefe Final com 3 Fases**: Ataques telegrafados, salva de orbes sombrios, teletransporte mágico e barra de vida animada.

### 4. Gráficos & Estética de Conto de Fadas
- Paleta harmoniosa em tons pastel: rosa, lilás, dourado e azul-céu.
- Cenários com **Parallax em 5 camadas** com partículas atmosféricas (pétalas de cerejeira no vento e vaga-lumes brilhantes).
- Efeitos visuais de **Squash & Stretch** no salto e aterrissagem da princesa.
- Interface moderna em glassmorphism translúcido com HUD informativo e responsivo.

---

## 🎮 Controles

| Ação | Teclado | Touch Mobile |
| :--- | :--- | :--- |
| **Mover para Esquerda** | `A` ou `Seta Esquerda (←)` | Botão Direcional Esquerdo `◀` |
| **Mover para Direita** | `D` ou `Seta Direita (→)` | Botão Direcional Direito `▶` |
| **Pular** | `W`, `Espaço` ou `Seta Cima (↑)` | Botão `⬆ PULAR` |
| **Correr** | `Shift` (segurar) | Automático em telas de toque |
| **Magia da Varinha** | `X`, `F` ou `Enter` | Botão `🪄` |
| **Pausar Jogo** | `P` ou `Escape` | Botão `⏸️` no topo direito |

---

## 🚀 Como Executar
Basta abrir o arquivo [index.html](file:///c:/Users/Aluno/Desktop/Nathaly/Princess/Princess-Kingdom/index.html) em qualquer navegador moderno (Chrome, Edge, Firefox, Safari). Não requer instalação nem servidor web.