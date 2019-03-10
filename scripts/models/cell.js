function Cell(i, j, w) {
    // === Position / Size Properties ===
    this.topX;
    this.topY;
    this.centerX;
    this.centerY;
    this.width;
    this.radius;
    
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;

    this.revealed = false;
    this.playerOne;
    this.color = color(255, 255, 255);
}

Cell.prototype.update = function(topX, topY, width) {
    this.width = width;
    this.topX = topX;
    this.topY = topY;
    this.centerX = this.topX + (this.width / 2);
    this.centerY = this.topY + (this.width / 2);
    this.radius = (this.width / 2) * .8;
}

Cell.prototype.show = function(xOffset, yOffset) {
    stroke(0);
    noFill();
    // rect(this.x + xOffset, this.y + yOffset, this.w, this.w);
    fill(this.color);
    ellipse(this.centerX, this.centerY, this.radius);
}

Cell.prototype.contains = function(x, y) {
    if (x > this.topX && x < this.topX + this.width && y > this.topY && y < this.topY + this.width) {
        console.log("Mouse clicked in cell");
        return true;
    }
    return false;
}

Cell.prototype.reveal = function(game) {
    if (!this.revealed){
        this.revealed = true;
        this.playerOne = game.playerOne;
        this.color = game.playerColor();
        game.movePlayed = true;
    }
}
