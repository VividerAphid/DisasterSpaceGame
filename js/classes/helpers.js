class Timing {
  
    static now() { return performance.now() * 1e-3; }
    static since(t) { return this.now() - t; }
    
}

class game{
    constructor(canvas){
        this.player;
        this.bots = [];
        this.sectors;
        this.G = canvas.getContext("2d");
        this.artist = new art(this.G);
        this.targetFPS = 60;
        this.targetTicks = 20;
        this.frameDelay = 1 / this.targetFPS;
        this.tickDelay = 1 / this.targetTicks;
        this.lastFrame = Timing.now() - this.frameDelay;
        this.lastTick = Timing.now() - this.tickDelay;
    }
    render(){
        this.artist.renderEntities(this.sectors);
    }
    update(){
        for(const sect in this.sectors){
            for(const layer in sect){
                //update()
            }
        }
    }
    start(){
        let game = this;
        this.renderTimer = setInterval(function(){
            let t = Timing.now() - game.lastFrame;

            game.update();
            game.render();
        }, Math.round(1000 * this.frameDelay));
    }

    stop(){
        clearInterval(this.renderTimer);
    }
    
    step(){

    }
}