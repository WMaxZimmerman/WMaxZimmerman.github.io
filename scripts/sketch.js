var font;
var vehicles = [];

function preload(){
    font = loadFont('fonts/AvenirNextLTPro-Demi.otf');
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(51);

    var points = font.textToPoints('WMaxZimmerman', 100, 200, 192);

    for (var i = 0; i < points.length; i++){
        var pt = points[i];
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }
}

function draw() {
    background(51);

    for (var j = 0; j < vehicles.length; j++){
        var v = vehicles[j];
        v.behaviors();
        v.update();
        v.show();
    }
}
