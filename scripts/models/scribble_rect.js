function ScribbleRect(x, y, w, h, text){
    // === Position Variables ===
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.text = text;

    this.seed = 1;
    this.scribble = new Scribble();
};

ScribbleRect.prototype.update = function(manager) {
}

ScribbleRect.prototype.draw = function() {
    // === This keeps the drawings consistent ===
    randomSeed(this.seed);
    
    stroke(41, 42, 43); // Black
    strokeWeight(3);

    // draw a rect for the value
    this.scribble.scribbleRect( this.x, this.y, this.width, this.height );
    this.fillRect(this.x, this.y, this.width, this.height);


    if (this.text !== undefined){
        // textFont('fonts/BrookeS8.ttf');
        let length = this.text.length;
        stroke(239, 243, 247); // White
        let textWeight = 60;

        if (windowWidth < 800) {
            textWeight = 50;
        }
        
        textSize(textWeight);
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y - (textWeight / 8), this.w);
    }
}

ScribbleRect.prototype.fillRect = function(x, y, w, h) {
    // calculate the x and y coordinates for the border points of the hachure
    let xleft   = this.x - (this.width / 2);
    let xright  = this.x + (this.width / 2);
    let ytop    = this.y - (this.height / 2);
    let ybottom = this.y + (this.height / 2);
    
    // reduce the sizes to fit in the rect
    if ( ytop > ybottom ) {
        ytop    -= 5;
        ybottom += 5;
    } else {
        ytop    += 5;
        ybottom -= 5;
    }
    
    // the x coordinates of the border points of the hachure
    let xCoords = [ xleft, xright, xright, xleft ];
    
    // the y coordinates of the border points of the hachure
    let yCoords = [ ytop, ytop, ybottom, ybottom ];
    
    // the gap between two hachure lines
    let gap = 3.5;
    
    // the angle of the hachure in degrees
    let angle = 315;
    
    // set the thikness of our hachure lines
    strokeWeight( 3 );
    
    //set the color of the hachure to a nice blue
    stroke( 0, 50, 180 );
    
    // fill the rect with a hachure
    this.scribble.scribbleFilling( xCoords, yCoords , gap, angle );
}

ScribbleRect.prototype.mousePressed = function(manager) {
}
