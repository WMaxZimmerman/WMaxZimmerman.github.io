function ScribbleParagraph(x, y, w, lineOffset, inputFile){
    // === IO ===
    this.font = loadFont('fonts/IndieFlower.ttf');
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
        let lineY = this.y + (this.lineOffset * (i + 1)) + (textWeight / 3);
        let lineX = this.x + (textWeight / 2)
        textSize(textWeight);
        textAlign(LEFT, BOTTOM);
        textFont(this.font);
        text(lines[i], lineX, lineY, this.w);
    }
}

ScribbleParagraph.prototype.splitLines = function(textWeight) {
    console.log("line count: " + this.fileLines.length);
    let charactersPerLine = Math.floor(this.width / (textWeight / 2.3));
    let lines = [];

    for (let x = 0; x < this.fileLines.length; x++) {
        let fileLine = this.fileLines[x];
        let line = "";
        
        for (let i = 0; i < fileLine.length; i++) {
            line = line + fileLine[i];
            
            let charCount = i + 1;
            if ((charCount % charactersPerLine) === 0 || charCount === fileLine.length) {
                lines.push(line);
                line = "";
            }
        }
    }
    
    return lines;
}

ScribbleParagraph.prototype.mousePressed = function(manager) {
}
