function ScribbleParagraph(x, y, w, lineOffset, inputFile){
    // === IO ===
    this.font = loadFont('fonts/Gaegu-Regular.ttf');
    this.fileLines = loadStrings(inputFile);
    
    // === Position Variables ===
    this.x = x;
    this.y = y;
    this.width = w;
    this.lineOffset = lineOffset;

    // === Other Properties ===
    this.text = text;
    this.seed = 1;
    this.scribble = new Scribble();
};

ScribbleParagraph.prototype.update = function(manager) {
}

ScribbleParagraph.prototype.draw = function() {
    let length = this.text.length;
    stroke(41, 42, 43); // Black
    let textWeight = 32;

    let lines = this.splitLines(textWeight);
    for (let i = 0; i < lines.length; i++) {
        let lineY = this.y + (this.lineOffset * (i + 1)) + (textWeight / 8);
        let lineX = this.x + (textWeight / 2)
        textSize(textWeight);
        textAlign(LEFT, BOTTOM);
        textFont(this.font);
        text(lines[i], lineX, lineY, this.w);
    }
}

ScribbleParagraph.prototype.splitLines = function(textWeight) {
    let charactersPerLine = Math.floor(this.width / (textWeight / 2));
    
    console.log("width: " + this.width);
    console.log("chars per line: " + charactersPerLine);
    
    let lines = [];

    for (let x = 0; x < this.fileLines.length; x++) {
        let fileLine = this.fileLines[x];
        let line = "";
        let word = "";
        let charsSinceLine = 0;
        
        for (let i = 0; i < fileLine.length; i++) {
            let character = fileLine[i];
            if (character != " ") {
                word += character;
            } else {
                if (charsSinceLine + word.length > charactersPerLine) {
                    charsSinceLine = 0;
                    lines.push(line);
                    line = word + character;
                    charsSinceLine += word.length + 1;
                    word = "";
                } else if (charsSinceLine + word.length <= charactersPerLine) {
                    charsSinceLine += word.length + 1;
                    line += word + character;
                    word = "";
                }
            }
            
            if (i + 1 === fileLine.length) {
                line += word;
                lines.push(line);
            }
        }
    }
    
    return lines;
}

ScribbleParagraph.prototype.mousePressed = function(manager) {
}
