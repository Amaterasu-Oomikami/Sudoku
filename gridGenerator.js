class GridGenerator {
    constructor() {
        this.sudoku = new Array(9);
        for (let row = 0; row < 9; row++) {
            this.sudoku[row] = new Array(9);
            for (let col = 0; col < 9; col++) {
                this.sudoku[row][col] = 0;
            }
        }
        this.counter = 0;
        this.number = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    }

    generateNewGrid(attempts) {
        let grid = this.generateNewFullGrid(attempts);
        return grid;
    }

    generateNewFullGrid(attempts) {
        let grid = new Grid();
        this.fillGrid(this.sudoku);
        this.createHoles(this.sudoku, attempts);
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                grid.getCell(row, col).setNumber(this.sudoku[row][col]);
            }
        }
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                grid.getCell(row, col).isFixed = grid.getCell(row, col).number > 0;
            }
        }
        return grid;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    isValid(x, y, val, sudoku) {
        for (let i = 0; i < 9; i++) {
            if (i !== y && sudoku[x][i] === val) {
                return false;
            }
        }
        for (let i = 0; i < 9; i++) {
            if (i !== x && sudoku[i][y] === val) {
                return false;
            }
        }
        let row = Math.floor(x / 3) * 3;
        let col = Math.floor(y / 3) * 3;    
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let r = i + row;
                let c = j + col;           
                if (r !== x && c !== y && sudoku[r][c] === val) {
                   return false;
                }
            }
        }
        return true;
    }

    checkGrid(sudoku) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (!sudoku[row][col]) {
                    return false;
                }
            }
        }
        return true;
    }

    solveGrid(sudoku) {
        let row, col;
        for (let i = 0; i < 81; i++) {
            row = Math.floor(i / 9);
            col = i % 9;
            if (!sudoku[row][col]) {
                for (let val = 1; val <= 9; val++) {
                    if (this.isValid(row, col, val, sudoku)) {
                        sudoku[row][col] = val;
                        if (this.checkGrid(sudoku)) {
                            this.counter++;
                            break;
                        } else {
                            if (this.solveGrid(sudoku)) {
                                return true;
                            }
                        }
                    }
                }
                break;
            }
        }
        sudoku[row][col] = 0;
    }

    fillGrid(sudoku) {
        let row, col;
        for (let i = 0; i < 81; i++) {
            row = Math.floor(i / 9);
            col = i % 9;
            if (!sudoku[row][col]) {
                this.shuffle(this.number);
                for (let j = 0; j < 9; j++) {
                    let val = this.number[j];
                    if (this.isValid(row, col, val, sudoku)) {
                        sudoku[row][col] = val;
                        if (this.checkGrid(sudoku)) {
                            return true;
                        } else {
                            if (this.fillGrid(sudoku)) {
                                return true;
                            }
                        }
                    }
                }
                break;
            }
        }
        sudoku[row][col] = 0;
    }

    createHoles(sudoku, attempts) {
        while (attempts) {
            let row = Math.floor(random(8));
            let col = Math.floor(random(8));
            while (!sudoku[row][col]) {
                row = Math.floor(random(8));
                col = Math.floor(random(8));
            }
            let backup = sudoku[row][col];
            sudoku[row][col] = 0;
            let copy = new Array(9);
            for (let row = 0; row < 9; row++) {
                copy[row] = new Array(9);
                for (let col = 0; col < 9; col++) {
                    copy[row][col] = sudoku[row][col];
                }
            }
            this.counter = 0;
            this.solveGrid(copy);
            if (this.counter > 1) {
                sudoku[row][col] = backup;
                attempts--;
            }
        }
    }
} 