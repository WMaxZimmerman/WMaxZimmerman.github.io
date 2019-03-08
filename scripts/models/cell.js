function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;

    this.revealed = false;
    this.playerOne;
    this.color = color(255, 255, 255);
}

Cell.prototype.show = function(xOffset, yOffset) {
    stroke(0);
    noFill();
    rect(this.x + xOffset, this.y + yOffset, this.w, this.w);
    fill(this.color);
    ellipse(this.x + this.w * 0.5 + xOffset, this.y + this.w * 0.5 + yOffset, this.w * 0.5);
}

Cell.prototype.contains = function(x, y, xOffset, yOffset) {
    let realX = this.x + xOffset;
    let realY = this.y + yOffset;
    
    return (x > realX && x < realX + this.w && y > realY && y < realY + this.w);
}

Cell.prototype.reveal = function(game) {
    if (!this.revealed){
        this.revealed = true;
        this.playerOne = game.playerOne;
        this.color = game.playerColor();
        game.movePlayed = true;
    }
}
