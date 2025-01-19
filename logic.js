// Gera uma solução completa para um tabuleiro de Sudoku
function generateSudokuSolution() {
    const board = Array(9)
        .fill(null)
        .map(() => Array(9).fill(0));

    // Verifica se um número pode ser colocado em uma célula específica
    function isValid(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) return false;
            if (
                board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][
                    Math.floor(col / 3) * 3 + (i % 3)
                ] === num
            )
                return false;
        }
        return true;
    }

    // Resolve o tabuleiro de Sudoku
    function solve(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve(board)) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solve(board);
    return board;
}

// Remove números do tabuleiro com base na dificuldade
function removeNumbers(board, difficulty) {
    let cellsToRemove;
    switch (difficulty) {
        case "easy":
            cellsToRemove = 20; // Poucas células vazias
            break;
        case "medium":
            cellsToRemove = 40; // Moderado número de células vazias
            break;
        case "hard":
            cellsToRemove = 60; // Muitas células vazias
            break;
        default:
            cellsToRemove = 20;
    }

    while (cellsToRemove > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            cellsToRemove--;
        }
    }
    return board;
}

// Valida o tabuleiro para verificar se a solução está correta
function validateBoard(board, solution) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] !== 0 && board[row][col] !== solution[row][col]) {
                return false; // Número incorreto
            }
        }
    }
    return true; // Todos os números estão corretos
}

// Exporta as funções principais
export { generateSudokuSolution, removeNumbers, validateBoard };
