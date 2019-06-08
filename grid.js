class Grid {
    constructor(grid) {
        this.data = new Array();
        let idx = 0;
        for (let row = 0; row < 9; row++) {
            this.data[row] = new Array();
            for (let col = 0; col < 9; col++) {
                this.data[row][col] = grid ? new Cell(grid[idx], row, col, grid[idx] > 0) : new Cell(0, row, col, false);
                idx++;
            }
        }
    }

    getCell(row, col) {
        return this.data[row][col];
    }

    draw(size, selectedCell, showPossiblities) {
        strokeWeight(5);
        fill(255, 255, 255, 255);
        rect(0, 0, size * 9, size * 9);
        strokeWeight(1);
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                fill(255, 255, 255, 128);
                if (row % 3 === 0 && col % 3 === 0) {
                    strokeWeight(5);
                    rect(col * size, row * size, size * 3, size * 3);
                    strokeWeight(1);
                }
                if (this.getCell(row, col) === selectedCell) {
                    fill(135, 206, 235, 255);
                } else if (this.getCell(row, col).error) {
                    fill(200, 50, 50, 255);
                } else if (this.getCell(row, col).highlight) {
                    fill(250, 250, 0, 255);
                } else if (this.getCell(row, col).lightError) {
                    fill(200, 50, 50, 50);
                } else {
                    fill(255, 255, 255, 128);
                }
                rect(col * size, row * size, size - 1.5, size - 1.5);
                if (this.getCell(row, col).error || this.getCell(row, col) === selectedCell) {
                    fill(255, 255, 255, 255);
                } else {
                    fill(0, 0, 0, 255);
                }
                if (this.getCell(row, col).visible) {
                    if (this.getCell(row, col).isFixed) {
                        textSize(24);
                    } else {
                        textSize(18);
                    }
                    textAlign(CENTER, CENTER);
                    text(this.getCell(row, col).number, col * size + size / 2, row * size + size / 2);
                } else if (showPossiblities) {
                    textSize(10);
                    textAlign(CENTER, CENTER);
                    text(this.getCell(row, col).possibilities.join(','), col * size + 20, row * size + size - 15);
                }
                this.getCell(row, col).error = false;
                this.getCell(row, col).lightError = false;
            }
        }
    }

    computeCellPossiblities(constraintChecker, cell) {
        cell.possibilities = [];
        let col = constraintChecker.cols[cell.col];
        let row = constraintChecker.rows[cell.row];
        let sqr = constraintChecker.squares[Math.floor(cell.row / 3) + Math.floor(cell.col / 3) + 2 * Math.floor(cell.col / 3)];
        for (let n = 1; n <= 9; n++) {
            if (n != cell.number) {
                let isPossible = true;
                for (let idx = 0; idx < 9; idx++) {
                    if (col[idx].number === n || row[idx].number === n || sqr[idx].number === n) {
                        isPossible = false;
                    }
                }
                if (isPossible) {
                    cell.possibilities.push(n);
                }
            }
        }
    }
    
    computePossibilities(constraintChecker) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (!this.getCell(row, col).visible) {
                    this.computeCellPossiblities(constraintChecker, this.getCell(row, col));
                }
            }
        }
    }
}