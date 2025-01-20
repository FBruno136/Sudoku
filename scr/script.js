import { generateSudokuSolution, removeNumbers, validateBoard } from "./logic.js";
import { verificarSolucao } from "./solucion.js";

// 1. Variáveis Globais
let board = [];
let solution = [];
let jogoIniciado = false;
let solucaoCorreta = [];

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
    const difficulty = document.getElementById("difficulty").value || "medium";

    // Gera solução e quebra-cabeça baseado na dificuldade
    solution = generateSudokuSolution();
    console.log("Solução gerada:", solution);
    solucaoCorreta = solution;
    const tabuleiroIncompleto = removeNumbers(JSON.parse(JSON.stringify(solucaoCorreta)), difficulty);
    board = removeNumbers(JSON.parse(JSON.stringify(solution)), difficulty);


    renderBoard(tabuleiroIncompleto);
    addEventListeners();
    console.log("Jogo iniciado com a dificuldade: ", difficulty);
}

document.getElementById("verifyButton").addEventListener("click", () => {
    verificarTabuleiro();
});

function verificarTabuleiro() {
    const tabuleiroUsuario = lerTabuleiroUsuario(); // Obtém o tabuleiro preenchido pelo usuário
    const resultado = verificarSolucao(tabuleiroUsuario, solucaoCorreta);

    aplicarCoresResultado(resultado);
    console.log("Tabuleiro verificado com sucesso!");
}

function lerTabuleiroUsuario() {
    const tabuleiro = [];
    const inputs = document.querySelectorAll("#sudoku-board input");

    inputs.forEach((input, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;

        if (!tabuleiro[row]) tabuleiro[row] = [];
        tabuleiro[row][col] = input.value ? parseInt(input.value, 10) : 0;
    });

    return tabuleiro;
}

function aplicarCoresResultado(resultado) {
    const inputs = document.querySelectorAll("#sudoku-board input");

    inputs.forEach((input, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;

        if (resultado[row][col]) {
            input.style.backgroundColor = "lightgreen"; // Cor correta
        } else {
            input.style.backgroundColor = "lightcoral"; // Cor incorreta
        }
    });
}

// 3. Renderizar Tabuleiro na Tela
function renderBoard(tabuleiro) {
    const container = document.getElementById("sudoku-board");
    container.innerHTML = "";

    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(9, 1fr)";
    container.style.gridGap = "2px";

    tabuleiro.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement("input");
            cellElement.type = "text";
            cellElement.maxLength = 1;
            cellElement.dataset.row = rowIndex;
            cellElement.dataset.col = colIndex;
            cellElement.value = cell || "";
            cellElement.disabled = cell !== 0;

            cellElement.style.width = "40px";
            cellElement.style.height = "40px";
            cellElement.style.textAlign = "center";
            cellElement.style.fontSize = "18px";
            cellElement.style.border = "1px solid #ccc";

            container.appendChild(cellElement);
        });
    });
}


// 4. Adicionar Eventos
function addEventListeners() {
    const boardContainer = document.getElementById("sudoku-board");
    const validateButton = document.getElementById("verifyButton");

    // Evento para capturar entrada do usuário
    boardContainer.addEventListener("input", (e) => {
        const target = e.target;
        const row = parseInt(target.dataset.row, 10);
        const col = parseInt(target.dataset.col, 10);

        if (isValidInput(target.value)) {
            board[row][col] = parseInt(target.value, 10);
        } else {
            target.value = ""; // Limpa entrada inválida
        }
    });

    // Evento para validação do tabuleiro
    validateButton.addEventListener("click", () => {
        if (validateBoard(board, solution)) {
            alert("Parabéns! Você completou o Sudoku corretamente!");
        } else {
            alert("Ops! Há erros no seu Sudoku. Continue tentando.");
        }
    });
}

// 5. Validador de Entrada
function isValidInput(value) {
    const num = parseInt(value, 10);
    return num >= 1 && num <= 9;
}
