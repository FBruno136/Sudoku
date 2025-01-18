// Jogo de Sudoku - script.js

// 1. Variáveis Globais
const board = []; // Tabuleiro do Sudoku (9x9)
const difficulty = "medium"; // Configuração inicial de dificuldade (fácil, médio, difícil)
let jogoIniciado = false;

// Inicialização do jogo ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startGameButton");
    const gameContainer = document.getElementById("gameContainer");

    // Adiciona o evento de clique no botão de início
    startButton.addEventListener("click", () => {
        if (!jogoIniciado) {
            jogoIniciado = true;

            // Torna visível o contêiner do jogo e oculta o botão de início
            gameContainer.style.display = "flex";
            startButton.style.display = "none";

            initGame();
        }
    });
});

// 2. Função Principal para Iniciar o Jogo
function initGame() {
    generateBoard();
    renderBoard();
    addEventListeners();
}

// 3. Gerador de Tabuleiros
function generateBoard() {
    // Cria uma matriz vazia
    for (let i = 0; i < 9; i++) {
        board[i] = new Array(9).fill(0); // Preenche com zeros
    }

    console.log("Tabuleiro gerado:", board);
}

// 4. Renderizar Tabuleiro na Tela
function renderBoard() {
    const container = document.getElementById("sudoku-board");
    container.innerHTML = ""; 

    // Configura estilo do tabuleiro
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(9, 1fr)";
    container.style.gridGap = "2px";

    // Criar células do tabuleiro
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement("input");
            cellElement.type = "text";
            cellElement.maxLength = 1;
            cellElement.dataset.row = rowIndex;
            cellElement.dataset.col = colIndex;
            cellElement.value = cell || ""; // Mostra o número ou deixa vazio
            cellElement.style.width = "40px";
            cellElement.style.height = "40px";
            cellElement.style.textAlign = "center";
            container.appendChild(cellElement);
        });
    });
}

// 5. Adicionar Eventos
function addEventListeners() {
    const boardContainer = document.getElementById("sudoku-board");

    // Evento para capturar entrada do usuário
    boardContainer.addEventListener("input", (e) => {
        const target = e.target;
        const row = target.dataset.row;
        const col = target.dataset.col;

        if (isValidInput(target.value)) {
            board[row][col] = parseInt(target.value, 10);
            console.log(`Atualizado: [${row}, ${col}] = ${target.value}`);
        } else {
            target.value = ""; // Limpa entrada inválida
        }
    });
}

// 6. Validador de Entrada
function isValidInput(value) {
    const num = parseInt(value, 10);
    return num >= 1 && num <= 9;
}
