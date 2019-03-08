function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function UltimateTicTacToe() {
    // === Constants ===
    this.playerOneColor = color(255, 100, 100);
    this.playerTwoColor = color(100, 100, 255);
    this.cols = 3;
    this.rows = 3;
    this.w = 150;

    /// === Properties ===
    this.halfWidth = (windowWidth / 2) - this.w;
    this.halfHeight = (windowHeight / 2) - this.w;
    this.sections;
    this.lastX;
    this.lastY;
    this.sectionWon;
    this.movePlayed = false;
    this.playerOne = true;

    this.playerColor = function(){
        return this.playerOne === true ? this.playerOneColor : this.playerTwoColor;
    };

    this.setup = function(){
        this.sectionWon = {
            triggered: false, x: 0, y: 0, isPlayerOne: true
        };
        
        this.sections = make2DArray(this.cols, this.rows);
        let tempCount = 1;
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.sections[i][j] = new Section(i, j, this.w, tempCount);
                tempCount++;
            }
        }
    }

    this.gameOver = function(){
        //Takes A Screen Shot
        save('pics-cause-it-happened.png');

        //Restart Game
        this.setup();
    }

    this.mousePressed = function(){
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.sections[i][j].checkCells(mouseX, mouseY, this);
            }
        }

        let sentToWonSection = false;
        if (this.movePlayed){
            this.playerOne = !this.playerOne;

            for (let x = 0; x < this.cols; x++) {
                for (let y = 0; y < this.rows; y++) {
                    if (x === this.lastX && y === this.lastY){
                        this.sections[x][y].isPlayable = true;
                        if (this.sections[x][y].isWon){
                            sentToWonSection = true;
                        }
                    } else {
                        this.sections[x][y].isPlayable = false;
                    }
                }
            }

            if (sentToWonSection){
                for (let x = 0; x < this.cols; x++) {
                    for (let y = 0; y < this.rows; y++) {
                        this.sections[x][y].isPlayable = !this.sections[x][y].isWon;
                    }
                }
            }

            this.movePlayed = false;
        }
    }

    this.checkForWin = function(){
        let isPlayerOne = this.sectionWon.isPlayerOne;
        if (this.sections[0][0].playerOne === isPlayerOne && this.sections[1][0].playerOne === isPlayerOne && this.sections[2][0].playerOne === isPlayerOne){
            this.gameOver();
        } else if (this.sections[0][1].playerOne === isPlayerOne && this.sections[1][1].playerOne === isPlayerOne && this.sections[2][1].playerOne === isPlayerOne){
            this.gameOver();
        } else if (this.sections[0][2].playerOne === isPlayerOne && this.sections[1][2].playerOne === isPlayerOne && this.sections[2][2].playerOne === isPlayerOne){
            this.gameOver();
        } else if (this.sections[0][0].playerOne === isPlayerOne && this.sections[0][1].playerOne === isPlayerOne && this.sections[0][2].playerOne === isPlayerOne){
            this.gameOver();
        } else if (this.sections[1][0].playerOne === isPlayerOne && this.sections[1][1].playerOne === isPlayerOne && this.sections[1][2].playerOne === isPlayerOne){
            this.gameOver();
        } else if (this.sections[2][0].playerOne === isPlayerOne && this.sections[2][1].playerOne === isPlayerOne && this.sections[2][2].playerOne === isPlayerOne){
            this.gameOver();
        } else if (this.sections[0][0].playerOne === isPlayerOne && this.sections[1][1].playerOne === isPlayerOne && this.sections[2][2].playerOne === isPlayerOne){
            this.gameOver();
        } else if (this.sections[2][0].playerOne === isPlayerOne && this.sections[1][1].playerOne === isPlayerOne && this.sections[0][2].playerOne === isPlayerOne){
            this.gameOver();
        }
    }

    this.draw = function(){
        this.halfWidth = (windowWidth / 2) - this.w;
        this.halfHeight = (windowHeight / 2) - this.w;
        
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.sections[i][j].show(this.halfWidth, this.halfHeight);
            }
        }

        if (this.sectionWon.triggered){
            this.checkForWin();
        }
    }
}
