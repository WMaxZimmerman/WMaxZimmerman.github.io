function Section(i, j, w, c) {
    // === References ===
    this.scribble = new Scribble();

    // === Position / Size Properties ===
    this.topX;
    this.topY;
    this.width;
    this.offset;
    
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;

    this.cells = make2DArray(3, 3);

    this.isWon = false;
    this.playerOne;
    this.sectionNumber = c;
    this.isPlayable = true

    for (let p = 0; p < 3; p++) {
        for (let q = 0; q < 3; q++) {
            let cX = (i * 3) + p;
            let cY = (j * 3) + q;
            this.cells[p][q] = new Cell(cX, cY, w/3);
        }
    }
}

Section.prototype.update = function(topX, topY, width) {
    this.width = width * .8;
    let wOffset = width * .1;
    this.topX = topX + wOffset;
    this.topY = topY + wOffset;
    this.offset = this.width / 3;

    let cellWidth = this.width / 3;
    for (let i = 0; i < 3; i++) {
        let cellTopX = this.topX + (cellWidth * i);
        
        for (let j = 0; j < 3; j++) {
            let cellTopY = this.topY + (cellWidth * j);
            this.cells[i][j].update(cellTopX, cellTopY, cellWidth);
        }
    }
}

Section.prototype.show = function(xOffset, yOffset) {
    let actualX = this.x + xOffset;
    let actualY = this.y + yOffset;
    stroke(0);

    this.drawBoard();

    // fill(this.colorOne());
    // rect(actualX, actualY, this.w, this.w);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            this.cells[i][j].show(xOffset, yOffset);
        }
    }

    if (this.isWon === true){
        let centerX = this.topX + (this.width / 2);
        let centerY = this.topY + (this.width / 2);
        let radius = (this.width / 2) * .8;
        fill(this.color());
        
        ellipse(centerX, centerY, radius);
    }
}

Section.prototype.drawBoard = function() {
    strokeWeight( 2 );
    
    // === Horizontal Lines ===
    this.scribble.scribbleLine( this.topX, this.topY + this.offset, this.topX + this.width, this.topY + this.offset );
    this.scribble.scribbleLine( this.topX, this.topY + (this.offset * 2), this.topX + this.width, this.topY + (this.offset * 2) );
    
    // === Vertical Lines ===
    this.scribble.scribbleLine( this.topX + this.offset, this.topY, this.topX + this.offset, this.topY + this.width );
    this.scribble.scribbleLine( this.topX + (this.offset * 2), this.topY, this.topX + (this.offset * 2), this.topY + this.width );
}

Section.prototype.color = function() {
    if (this.isWon){
        return this.playerOne === true ? color(255, 100, 100) : color(100, 100, 255);
    } else {
        return (this.sectionNumber % 2 === 0) ? color(127) : color(255);
    }
}

Section.prototype.colorOne = function() {
    return (this.sectionNumber % 2 === 0) ? color(127) : color(255);
}

Section.prototype.checkCells = function(x, y, game){
    if (!this.isPlayable || this.isWon) return;
    console.log("Checking cells of section");
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            console.log("Checking if cursor is in section cell");
            if (this.cells[i][j].contains(x, y)) {
                console.log("Mouse clicked in cell section");
                this.cells[i][j].reveal(game);

                if (game.movePlayed){
                    //set global position letiables
                    game.lastX = i;
                    game.lastY = j;

                    //Check for Win
                    this.checkForWin(i, j, game);
                }
            }
        }
    }
}

Section.prototype.checkForWin = function(x, y, game){
    let isPlayerOne = this.cells[x][y].playerOne;
    let isWon = false;
    if (this.cells[0][0].playerOne === isPlayerOne && this.cells[1][0].playerOne === isPlayerOne && this.cells[2][0].playerOne === isPlayerOne){
        isWon = true;
    } else if (this.cells[0][1].playerOne === isPlayerOne && this.cells[1][1].playerOne === isPlayerOne && this.cells[2][1].playerOne === isPlayerOne){
        isWon = true;
    } else if (this.cells[0][2].playerOne === isPlayerOne && this.cells[1][2].playerOne === isPlayerOne && this.cells[2][2].playerOne === isPlayerOne){
        isWon = true;
    } else if (this.cells[0][0].playerOne === isPlayerOne && this.cells[0][1].playerOne === isPlayerOne && this.cells[0][2].playerOne === isPlayerOne){
        isWon = true;
    } else if (this.cells[1][0].playerOne === isPlayerOne && this.cells[1][1].playerOne === isPlayerOne && this.cells[1][2].playerOne === isPlayerOne){
        isWon = true;
    } else if (this.cells[2][0].playerOne === isPlayerOne && this.cells[2][1].playerOne === isPlayerOne && this.cells[2][2].playerOne === isPlayerOne){
        isWon = true;
    } else if (this.cells[0][0].playerOne === isPlayerOne && this.cells[1][1].playerOne === isPlayerOne && this.cells[2][2].playerOne === isPlayerOne){
        isWon = true;
    } else if (this.cells[2][0].playerOne === isPlayerOne && this.cells[1][1].playerOne === isPlayerOne && this.cells[0][2].playerOne === isPlayerOne){
        isWon = true;
    }

    if (isWon === true) {
        this.markWin(isPlayerOne, game);
    }
}

Section.prototype.markWin = function(isPlayerOne, game){
    console.log("player won");
    
    this.isWon = true;
    this.playerOne = isPlayerOne;
    this.isPlayable = false;
    game.sectionWon.x = this.i;
    game.sectionWon.y = this.j;
    game.sectionWon.isPlayerOne = isPlayerOne;
    game.sectionWon.triggered = true;
}
