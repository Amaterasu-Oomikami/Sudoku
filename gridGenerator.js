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

    checkRow(val, row, sudoku) {
        return sudoku[row].includes(val);
    }

    checkCol(val, col, sudoku) {
        let tmp = new Array();
        for (let i = 0; i < 9; i++) {
            tmp.push(sudoku[i][col]);
        }
        return tmp.includes(val);
    }

    buildSquare(i1, j1, i2, j2, square, sudoku) {
        for (let idx = 0; idx < 3; idx++) {
            square[idx] = new Array();
            for (let i = i2; i < j2; i++) {
                for (let j = i1; j < j1; j++) {
                    square[idx].push(sudoku[i][j]);
                }
            }
        }
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
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
                    if (!this.checkRow(val, row, sudoku)) {
                        if (!this.checkCol(val, col, sudoku)) {
                            let square = new Array(3);
                            if (row < 3) {
                                if (col < 3) {
                                    this.buildSquare(0, 3, 0, 3, square, sudoku);
                                } else if (col < 6) {
                                    this.buildSquare(3, 6, 0, 3, square, sudoku);
                                } else {
                                    this.buildSquare(6, 9, 0, 3, square, sudoku);
                                }
                            } else if (row < 6) {
                                if (col < 3) {
                                    this.buildSquare(0, 3, 3, 6, square, sudoku);
                                } else if (col < 6) {
                                    this.buildSquare(3, 6, 3, 6, square, sudoku);
                                } else {
                                    this.buildSquare(6, 9, 3, 6, square, sudoku);
                                }
                            } else {
                                if (col < 3) {
                                    this.buildSquare(0, 3, 6, 9, square, sudoku);
                                } else if (col < 6) {
                                    this.buildSquare(3, 6, 6, 9, square, sudoku);
                                } else {
                                    this.buildSquare(6, 9, 6, 9, square, sudoku);
                                }
                            }
                            if (!square[0].concat(square[1], square[2]).includes(val)) {
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
                    if (!this.checkRow(val, row, sudoku)) {
                        if (!this.checkCol(val, col, sudoku)) {
                            let square = new Array(3);
                            if (row < 3) {
                                if (col < 3) {
                                    this.buildSquare(0, 3, 0, 3, square, sudoku);
                                } else if (col < 6) {
                                    this.buildSquare(3, 6, 0, 3, square, sudoku);
                                } else {
                                    this.buildSquare(6, 9, 0, 3, square, sudoku);
                                }
                            } else if (row < 6) {
                                if (col < 3) {
                                    this.buildSquare(0, 3, 3, 6, square, sudoku);
                                } else if (col < 6) {
                                    this.buildSquare(3, 6, 3, 6, square, sudoku);
                                } else {
                                    this.buildSquare(6, 9, 3, 6, square, sudoku);
                                }
                            } else {
                                if (col < 3) {
                                    this.buildSquare(0, 3, 6, 9, square, sudoku);
                                } else if (col < 6) {
                                    this.buildSquare(3, 6, 6, 9, square, sudoku);
                                } else {
                                    this.buildSquare(6, 9, 6, 9, square, sudoku);
                                }
                            }
                            if (!square[0].concat(square[1], square[2]).includes(val)) {
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
            if (this.counter !== 1) {
                sudoku[row][col] = backup;
                attempts--;
            }
        }
    }
} 