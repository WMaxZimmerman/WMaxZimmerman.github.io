function Section(i, j, w, c) {
    // === References ===
    this.scribble = new Scribble();
    
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

Section.prototype.show = function(xOffset, yOffset, topX, topY, width) {
    let actualX = this.x + xOffset;
    let actualY = this.y + yOffset;
    stroke(0);

    this.drawBoard(topX, topY, width);

    // fill(this.colorOne());
    // rect(actualX, actualY, this.w, this.w);

    // for (let i = 0; i < 3; i++) {
    //     for (let j = 0; j < 3; j++) {
    //         this.cells[i][j].show(xOffset, yOffset);
    //     }
    // }

    // if (this.isWon === true){
    //     fill(this.color());
        
    //     ellipse(actualX + (this.w * 0.5), actualY + (this.w * 0.5), this.w * 0.5);
    // }
}

Section.prototype.drawBoard = function(topX, topY, width) {
    strokeWeight( 2 );

    width = width * .8;
    let wOffset = width * .1;
    topX = topX + wOffset;
    topY = topY + wOffset;
    let offset = width / 3;
    
    // === Horizontal Lines ===
    this.scribble.scribbleLine( topX, topY + offset, topX + width, topY + offset );
    this.scribble.scribbleLine( topX, topY + (offset * 2), topX + width, topY + (offset * 2) );
    
    // === Vertical Lines ===
    this.scribble.scribbleLine( topX + offset, topY, topX + offset, topY + width );
    this.scribble.scribbleLine( topX + (offset * 2), topY, topX + (offset * 2), topY + width );
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
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (this.cells[i][j].contains(x, y, game.halfWidth, game.halfHeight)) {
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
