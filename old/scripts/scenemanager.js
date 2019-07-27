var mgr;
var font;

function preload(){
    font = loadFont('fonts/AvenirNextLTPro-Demi.otf');
}

function setup()
{
    createCanvas(600, 500);

    mgr = new SceneManager();

    // Preload scenes. Preloading is normally optional
    // ... but needed if showNextScene() is used.
    mgr.addScene ( ScribbleTest );
    mgr.addScene ( SteeringText );
    // mgr.addScene ( Animation1 );
    // mgr.addScene ( Animation2 );
    // mgr.addScene ( Animation3 );

    mgr.showNextScene();
}

function draw()
{
    mgr.draw();
}

function mousePressed()
{
    mgr.handleEvent("mousePressed");
}

function keyPressed()
{
    // You can optionaly handle the key press at global level...
    switch(key)
    {
        case '1':
            mgr.showScene( Animation1 );
            break;
        case '2':
            mgr.showScene( Animation2 );
            break;
        case '3':
            mgr.showScene( Animation3 );
            break;
    }
    
    // ... then dispatch via the SceneManager.
    mgr.handleEvent("keyPressed");
}
