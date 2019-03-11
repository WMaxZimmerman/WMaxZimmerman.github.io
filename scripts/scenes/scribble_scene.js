function ScribbleTest() {
    let self = this;
    self.scribble = new Scribble();
    self.objectMap = new Map();

    self.setup = function(){
	    createCanvas(windowWidth, windowHeight);
        loadFont('fonts/scribble_box_demo.ttf');

        let x = (windowWidth / 2);
        let y = 50;
        let w = windowWidth * .9;
        let h = 90;
        let banner = new ScribbleRect(x, y, w, h, 'W Max Zimmerman');
        self.objectMap.set('banner', banner);        

        x = (windowWidth * .9);
        y = (windowHeight * .9);
        w = 100;
        h = 40;        
        let sceneSwitch = new ScribbleButton(x, y, w, h, 'Switch', self.showNextScene);
        self.objectMap.set('sceneSwitch', sceneSwitch);

        x = (windowWidth * .9) - 140;
        y = (windowHeight * .9);
        w = 100;
        h = 40;        
        let newGame = new ScribbleButton(x, y, w, h, 'Game', self.createGame);
        self.objectMap.set('newGame', newGame);

        x = (windowWidth * .04);
        y = (windowHeight * .1);
        let lineOffset = (windowHeight * .05);
        w = windowWidth - x;
        let paragraph = new ScribbleParagraph(x, y, w, lineOffset, "pages/about.txt")
        self.objectMap.set('paragraph', paragraph);
    }

    self.update = function() {
        document.body.style.cursor = "default";
        
        for (var value of self.objectMap.values()) {
            value.update();
        }
    }

    self.draw = function() {
        // === Call Update Function for predraw udpates ===
        self.update();

        // === Actually Draw UI ===
        self.drawBackground();
        for (var value of self.objectMap.values()) {
            value.draw();
        }
    }
    
    self.mousePressed = function()
    {
        for (var value of self.objectMap.values()) {
            value.mousePressed(self);
        }
    }

    self.drawBackground = function() {
        strokeWeight(1);
	    background(229, 220, 142);

        for(var i = 0; i < 20; i++) {            
            stroke(81, 84, 145); // Blue
            let yOffset = windowHeight * .1;
            let y = yOffset + (i * (yOffset / 2));
            line(0, y, 3000, y);
        }
        
        stroke(160, 36, 59); // Red
        let redOffset = (windowWidth * .04);
        line(redOffset, 0, redOffset, windowHeight);
    }

    self.createGame = function() {
        self.objectMap.delete('paragraph');
        let game = new UltimateTicTacToe();
        game.setup();
        self.objectMap.set('game', game);
    }

    self.showNextScene = function() {
        self.sceneManager.showNextScene();
    }
}
