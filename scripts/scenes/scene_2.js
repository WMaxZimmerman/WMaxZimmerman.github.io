function Animation2()
{
    this.y = 0;
    
    this.draw = function()
    {
        background("teal");

        line(0, this.y, width, this.y);
        this.y++;

        if ( this.y > height )
            this.y = 0;
    }

    this.mousePressed = function()
    {
        this.sceneManager.showNextScene();
    }
}
