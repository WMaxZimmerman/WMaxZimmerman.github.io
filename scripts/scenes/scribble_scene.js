function ScribbleTest() {
    this.scribble = new Scribble(); 

    this.setup = function(){
	    createCanvas(windowWidth, windowHeight);
        this.drawBackground();
        
        // this.scribble.scribbleRect( 200, 300, 200, 400 );
    }

    this.drawBackground = function() {
	    background(229, 220, 142);

        for(var i = 0; i < 20; i++) {            
            stroke(81, 84, 145); // Blue
            let yOffset = 100 + (i * 50);
            line(0, yOffset, 3000, yOffset);
        }
        
        stroke(160, 36, 59); // Red
        line(30, 0, 30, 1500);
    }

    this.draw = function() {
        this.drawBackground();
    }

    this.mousePressed = function()
    {
        this.sceneManager.showNextScene();
    }
}
