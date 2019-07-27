// When defining scenes, you can also 
// put the setup, draw, etc. methods on prototype
function Animation3( )
{
    this.oAnim1 = null;
}

Animation3.prototype.setup = function()
{
    // access a different scene using the SceneManager
    oAnim1 = this.sceneManager.findScene( Animation2 );
}

Animation3.prototype.draw = function()
{
    background("lightblue");
            
    var r = sin( frameCount * 0.01 );
            
    fill("white");
    ellipse( width / 2, height / 2, map(r, 0, 1, 100, 200) );

    if ( oAnim1 != null )
    {
        fill("black");
        textAlign(LEFT);
        text( "Scene1 y: " + oAnim1.oScene.y, 10, height - 20);
    }
}

Animation3.prototype.mousePressed = function()
{
    this.sceneManager.showNextScene();
}
