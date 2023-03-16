class art{
    constructor(ctx){
        this.G = ctx;
    }

    renderEntities(entities){

    }

    drawTriangle(triangle){
        let g = this.G;
        g.fillStyle = triangle.color;
        g.strokeStyle = triangle.color;
        g.translate(triangle.x, triangle.y);
        g.rotate(90 * Math.PI / 180);
        g.translate(-triangle.x, -triangle.y);
        g.beginPath();
        g.moveTo(triangle.x-15, triangle.y+15);
        g.lineTo(triangle.x+15, triangle.y+15);
        g.lineTo(triangle.x, triangle.y-21);
        g.fill();
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