class StarSystem{
    constructor(id, x, y, connections, bodies){
        this.id = id;
        this.x = x;
        this.y = y;
        this.connections = connections;
        this.bodies = bodies;
        this.radius = 20;
    }
    drawStar(art){
        art.drawStar(this.x, this.y, "#ddd", this.radius);
    }
    drawLabels(art){
        // let constMult = "";
        // if(this.constShowing){constMult = " (x2)"}
        // art.drawText(this.x-this.labelOffsets.dXOffset, this.y-this.labelOffsets.dYOffset, this.defense, art.labelFont, this.color); //Defense label
        // art.drawText(this.x-this.labelOffsets.pXOffset, this.y+this.labelOffsets.pYOffset, "+"+this.prod + constMult, art.labelFont, this.color); //Prod label       
        // art.drawText(this.x-7, this.y, this.colorChars, art.labelFont, this.colorInverse);
    }
    drawDebugs(art){
        art.drawText(this.x-10, this.y, this.id, art.labelFont, "#f00");
    }
    drawConnections(art, map){
        let reps = this.connections.length;
        for(let r = 0; r < reps; r++){
            let connectee = map[this.connections[r]].id;
            if(connectee > this.id){
                art.ctx.beginPath();
                art.ctx.lineWidth = 3;
                art.ctx.fillStyle = "#999";
                art.ctx.strokeStyle = "#999";
                //G.fillStyle = "#f0f";
                //G.strokeStyle = "#f0f"; //FOR TESTING    
                art.ctx.moveTo(this.x, this.y);
                art.ctx.lineTo(map[connectee].x, map[connectee].y);
                art.ctx.stroke();
            }
        }
    }
}

class Body{
    constructor(id, x, y){
        this.id = id;
        this.x = x;
        this.y = y;
    }
    draw(art){
        console.log("Default Body draw()!");
    }
    handleRotate(degrees, center){
        let newCoord = rotatePoint2(this.x, this.y, degreesToRadians(degrees), center.x, center.y);
        this.x = newCoord[0];
        this.y = newCoord[1];
    }
    action(){
        console.log("Default action(), "+this.id+" was clicked!");
    }
}

class Star extends Body{
    constructor(id, x, y, radius, color){
        super(id, x, y);
        this.radius = radius;
        this.color = color;
    }
    draw(art){
        art.drawStar(this.x, this.y, this.color, this.radius);
    }
}

class Planet extends Body{
    constructor(id, x, y, radius, color, orbiting, orbitAmount){
        super(id, x, y);
        this.radius = radius;
        this.color = color;
        this.orbiting = orbiting;
        this.orbitAmount = orbitAmount;
        this.orbitRadius = findLengthPoints(this.x, this.orbiting.x, this.y, this.orbiting.y);
        this.satellites = [];
    }
    updateOrbit(){
        this.handleRotate(this.orbitAmount, this.orbiting);
        if(this.satellites.length > 0){
            for(let r = 0; r < this.satellites.length; r++){
                let sat = this.satellites[r];
                sat.handleRotate(this.orbitAmount, this.orbiting);
                if(sat.satellites.length > 1){
                    for(let t = 0; t < sat.satellites.length; t++){
                        let minisat = sat.satellites[t];
                        minisat.handleRotate(this.orbitAmount, this.orbiting);
                    }
                }
            }
        }
    }
    draw(art){
        art.drawRing(this.orbiting.x, this.orbiting.y, "#444", this.orbitRadius, 1);
        art.drawStar(this.x, this.y, this.color, this.radius);
    }
}

class Station extends Body{
    constructor(id, x, y){  
        super(id, x, y);
    }
}

class ResourceNode extends Body{
    constructor(id, x, y, resource, rate, slots){
        super(id, x, y);
        this.resource = resource;
        this.rate = rate;
        this.slots = slots;
        this.radius = 15;
    }
    draw(art){
        art.drawDiamond(this.x, this.y, "#a1a", this.radius, this.radius);
    }
}

class ClickButton extends Body{
    constructor(id, x, y, rad, func, draw){
        super(id, x, y);
        this.radius = rad;
        this.action = func;
        this.draw = draw;
    }
}