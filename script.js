const solveBtn = document.getElementById("solve-btn");
solveBtn.addEventListener('click', solveSudoku);

const sudokuGrid = document.getElementById("sudoku-grid");

// Create Sudoku grid
for (let r = 0; r < 9; r++) {
    const newRow = document.createElement("tr");
    for (let c = 0; c < 9; c++) {
        const newCol = document.createElement("td");
        const input = document.createElement("input");
        input.type = "number";
        input.className = "cell";
        input.id = `cell-${r}-${c}`;
        newCol.appendChild(input);
        newRow.appendChild(newCol);
    }
    sudokuGrid.appendChild(newRow);
}

async function solveSudoku() {
    const board = [];
    
    // Populate board with input values
    for (let r = 0; r < 9; r++) {
        board[r] = [];
        for (let c = 0; c < 9; c++) {
            const input = document.getElementById(`cell-${r}-${c}`);
            const val = input.value.trim();
            board[r][c] = val !== "" ? parseInt(val) : 0;
        }
    }

    // Identify user input cells and mark them
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const cellId = `cell-${r}-${c}`;
            const cell = document.getElementById(cellId);
            if (board[r][c] !== 0) {
                cell.classList.add("user-input");
            }
        }
    }

    // Solver function
    const solver = function(board, r, c) {
        if (r === 9) {
            return true; // Entire board has been solved
        }
        
        if (c === 9) {
            return solver(board, r + 1, 0); // Move to next row
        }
        
        if (board[r][c] === 0) {
            for (let num = 1; num <= 9; num++) {
                if (isOk(board, r, c, num)) {
                    board[r][c] = num;
                    if (solver(board, r, c + 1)) {
                        return true;
                    }
                    board[r][c] = 0; // Backtrack
                }
            }
            return false;
        } else {
            return solver(board, r, c + 1); // Move to next column
        }
    }

    // Helper function to check if placing 'num' in board[row][col] is valid
    function isOk(board, row, col, num) {
        // Check if 'num' is already present in the current row
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) {
                return false;
            }
        }
        
        // Check if 'num' is already present in the current column
        for (let j = 0; j < 9; j++) {
            if (board[j][col] === num) {
                return false;
            }
        }
        
        // Check if 'num' is already present in the 3x3 sub-grid
        let startRow = Math.floor(row / 3) * 3;
        let startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === num) {
                    return false;
                }
            }
        }
        
        // If 'num' is not present in the current row, column, or sub-grid, it's valid
        return true;
    }

    // Solve the Sudoku board
    if (solver(board, 0, 0)) {
        // Fill in solved values and apply animations
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const cellId = `cell-${r}-${c}`;
                const cell = document.getElementById(cellId);

                // Fill in solved values and apply animations
                if (!cell.classList.contains("user-input")) {
                    cell.value = board[r][c];
                    cell.classList.add("solved");
                }
            }
        }
    } else {
        alert("No solution exists");
    }
}



