function ScribbleTest() {
    this.scribble = new Scribble();
    this.needsDrawn = true;

    this.setup = function(){
	    createCanvas(windowWidth, windowHeight);
        loadFont('fonts/scribble_box_demo.ttf');
    }

    this.draw = function() {
        this.drawBackground();
        this.drawBanner();
    }

    this.drawBackground = function() {
        strokeWeight(1);
	    background(229, 220, 142);

        for(var i = 0; i < 20; i++) {            
            stroke(81, 84, 145); // Blue
            let yOffset = 100 + (i * 50);
            line(0, yOffset, 3000, yOffset);
        }
        
        stroke(160, 36, 59); // Red
        line(30, 0, 30, 1500);
    }

    this.drawBanner = function() {
        // === This keeps the drawings consistent ===
        randomSeed(1);
        
        stroke(41, 42, 43); // Black
        strokeWeight(3);

        let x = (windowWidth / 2);
        let y = 50;
        let w = windowWidth - 200;
        let h = 90;

        // draw a rect for the value
        this.scribble.scribbleRect( x, y, w, h );
        this.fillRect(x, y, w, h);


        // textFont('fonts/BrookeS8.ttf');
        stroke(239, 243, 247); // White
        let textWeight = 75;
        textSize(textWeight);
        text('W Max Zimmerman', x - (textWeight * 4), y + (textWeight / 2));
    }

    this.fillRect = function(x, y, w, h) {
        // calculate the x and y coordinates for the border points of the hachure
        var xleft   = x - (w / 2);
        var xright  = x + (w / 2);
        var ytop    = y - (h / 2);
        var ybottom = y + (h / 2);
        
        // reduce the sizes to fit in the rect
        if ( ytop > ybottom ) {
            ytop    -= 5;
            ybottom += 5;
        } else {
            ytop    += 5;
            ybottom -= 5;
        }
        
        // the x coordinates of the border points of the hachure
        var xCoords = [ xleft, xright, xright, xleft ];
        
        // the y coordinates of the border points of the hachure
        var yCoords = [ ytop, ytop, ybottom, ybottom ];
        
        // the gap between two hachure lines
        var gap = 3.5;
        
        // the angle of the hachure in degrees
        var angle = 315;
        
        // set the thikness of our hachure lines
        strokeWeight( 3 );
        
        //set the color of the hachure to a nice blue
        stroke( 0, 50, 180 );
        
        // fill the rect with a hachure
        this.scribble.scribbleFilling( xCoords, yCoords , gap, angle );
    }

    this.mousePressed = function()
    {
        this.needsDrawn = true;
        this.sceneManager.showNextScene();
    }
}
