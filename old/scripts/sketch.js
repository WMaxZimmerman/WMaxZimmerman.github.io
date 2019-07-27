function SteeringText() {
    let vehicles = [];

    this.preload = function(){
	    font = loadFont('fonts/AvenirNextLTPro-Demi.otf');
    }

    this.setup = function(){
	    createCanvas(windowWidth, windowHeight);
	    background(51);

	    let points = font.textToPoints('WMaxZimmerman', 100, 200, 192);

	    for (let i = 0; i < points.length; i++){
            let pt = points[i];
            let vehicle = new Vehicle(pt.x, pt.y);
            vehicles.push(vehicle);
	    }
    }

    this.draw = function() {
	    background(51);

	    for (let j = 0; j < vehicles.length; j++){
            let v = vehicles[j];
            v.behaviors();
            v.update();
            v.show();
	    }
    }

    this.mousePressed = function()
    {
        this.sceneManager.showNextScene();
    }
}
