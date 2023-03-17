class art{
    constructor(ctx){
        this.G = ctx;
        this.scale = 3;
    }

    renderEntities(entities){

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

    }

    drawRocket(rocket){

    }

    drawLaser(laser){

    }

    drawShield(shield){

    }

}