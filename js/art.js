class art{
    constructor(ctx){
        this.G = ctx;
        this.scale = 3;
    }

    renderEntities(entities){
        console.log(entities);
        this.G.fillStyle = "#222";
        this.G.strokeStyle = "#222";
        this.G.fillRect(0, 0, mapCan.width, mapCan.height);
        
        for(const layer in entities){
            let lyr = entities[layer];
            for(let r = 0; r < lyr.length; r++){
                this[lyr[r].draw](lyr[r]);
            }
        }
    }

    drawTriangle(triangle){
        let g = this.G;
        let baseWidth = 5;
        let height = 7;
        let scaledX = triangle.x * this.scale;
        let scaledY = triangle.y * this.scale;
        g.save();
        g.fillStyle = triangle.color;
        g.strokeStyle = triangle.color;
        g.translate(scaledX, scaledY);
        g.rotate(triangle.direction);
        g.translate(-scaledX, -scaledY);
        g.beginPath();
        g.moveTo(scaledX-(baseWidth*this.scale), scaledY+(height*this.scale));
        g.lineTo(scaledX+(baseWidth*this.scale), scaledY+(height*this.scale));
        g.lineTo(scaledX, scaledY-(height*this.scale));
        g.closePath();
        g.fill();
        g.restore();
    }

    drawPlanet(plan){
        let g = this.G;
        let radius = 10;
        let scaledX = plan.x * this.scale;
        let scaledY = plan.y * this.scale;

        g.fillStyle = plan.color;
        g.strokeStyle = plan.color;
        g.arc(scaledX, scaledY, (radius*2) * this.scale, 0, 2*Math.PI);   
        g.fill();

    }

    drawRocket(rocket){

    }

    drawLaser(laser){

    }

    drawShield(shield){

    }

}