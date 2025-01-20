function generateSudokuSolution() {
    const board = Array(9)
        .fill(null)
        .map(() => Array(9).fill(0));

    let attemptCount = 0;
    const MAX_ATTEMPTS = 10000;

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

    function solve(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            attemptCount++;
                            if (attemptCount > MAX_ATTEMPTS) throw new Error("Número máximo de tentativas excedido.");
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

function removeNumbers(board, difficulty) {
    let cellsToRemove;
    switch (difficulty) {
        case "easy":
            cellsToRemove = 20;
            break;
        case "medium":
            cellsToRemove = 40;
            break;
        case "hard":
            cellsToRemove = 60;
            break;
        default:
            cellsToRemove = 20;
    }

    while (cellsToRemove > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (board[row][col] !== 0) {
            const temp = board[row][col];
            board[row][col] = 0;
            cellsToRemove--;
        }
    }

    return board;
}

function validateBoard(board, solution) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] !== 0 && board[row][col] !== solution[row][col]) {
                console.error(`Erro na célula (${row}, ${col}): esperado ${solution[row][col]}, mas encontrado ${board[row][col]}`);
                return false;
            }
        }
    }
    return true;
}

export { generateSudokuSolution, removeNumbers, validateBoard };
