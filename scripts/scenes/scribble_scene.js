function ScribbleTest() {
    this.scribble = new Scribble();

    this.setup = function(){
	    createCanvas(windowWidth, windowHeight);
        loadFont('fonts/scribble_box_demo.ttf');

        let x = (windowWidth / 2);
        let y = 50;
        let w = windowWidth * .9;
        let h = 90;
        this.banner = new ScribbleRect(x, y, w, h, 'W Max Zimmerman');

        x = (windowWidth * .9);
        y = (windowHeight * .9);
        w = 100;
        h = 40;        
        this.sceneSwitch = new ScribbleRect(x, y, w, h, 'Switch');
    }

    this.draw = function() {
        this.drawBackground();
        this.banner.draw();
        this.sceneSwitch.draw();
    }

    this.drawBackground = function() {
        strokeWeight(1);
	    background(229, 220, 142);

        for(var i = 0; i < 20; i++) {            
            stroke(81, 84, 145); // Blue
            let yOffset = windowHeight * .1;
            let y = yOffset + (i * (yOffset / 2));
            line(0, y, 3000, y);
        }
        
        stroke(160, 36, 59); // Red
        let redOffset = (windowWidth * .04)
        line(redOffset, 0, redOffset, windowHeight);
    }
    
    this.mousePressed = function()
    {
        this.sceneSwitch.mouseClick(this)
    }

    this.showNextScene = function() {
        this.sceneManager.showNextScene();
    }
}
