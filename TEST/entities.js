class StarSystem{
    constructor(id, x, y, connections, bodies){
        this.id = id;
        this.name = id;
        this.x = x;
        this.y = y;
        this.connections = connections;
        this.bodies = bodies;
        this.entities = [];
        this.neighborArrows = [];
        this.pin = -1; //For when player clicks in system view to create a pin
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
        art.drawText(this.x-10, this.y, this.name, art.labelFont, "#f00");
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
    addEntity(entity){
        this.entities.push(entity);
    }
    removeEntity(entity){
        this.entities = removeItem(this.entities, entity);
    }
    addBody(body){
        this.bodies.push(body);
    }
    removeBody(body){
        this.bodies = removeItem(this.bodies, body);
    }
    calcNeighborArrows(center, map){
        let centerDist = center || 600;
        let cons = this.connections;
        let paddedCenterDist = centerDist;
        for(let r = 0; r < cons.length; r++){
            let x = map[cons[r]].x + (centerDist - this.x);
            let y = map[cons[r]].y + (centerDist - this.y);
            let dx = centerDist - x;
            let dy = centerDist - y;
            let dist = Math.sqrt(dx*dx + dy*dy);

            let newX = centerDist - (dx / dist) * paddedCenterDist;
            let newY = centerDist - (dy / dist) * paddedCenterDist;

            let tri = new TriangleButton(cons[r], newX, newY, 20, 30, {}, "To "+map[cons[r]].name);
            tri.calcDirection({x: centerDist, y: centerDist}, false);

            this.neighborArrows.push(tri);
        }
    }
    setName(name){
        this.name = name;
    }
}

class Body{
    constructor(id, x, y, systemID){
        this.id = id;
        this.x = x;
        this.y = y;
        this.systemID = systemID;
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
    constructor(id, x, y, radius, color, systemID){
        super(id, x, y, systemID);
        this.radius = radius;
        this.color = color;
    }
    draw(art){
        art.drawStar(this.x, this.y, this.color, this.radius);
        let labelFont = "bold 25px Consolas";
        art.drawText(this.x-25, this.y-40, gam.map[this.systemID].name, labelFont, "#fff");
    }
}

class Planet extends Body{
    constructor(id, x, y, radius, color, orbiting, orbitAmount, systemID){
        super(id, x, y, systemID);
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
    constructor(id, x, y, systemID){  
        super(id, x, y, systemID);
    }
}

class ResourceNode extends Body{
    constructor(id, x, y, resource, rate, slots, systemID){
        super(id, x, y, systemID);
        this.resource = resource;
        this.rate = rate;
        this.slots = slots;
        this.radius = 15;
    }
    draw(art){
        art.drawDiamond(this.x, this.y, "#a1a", this.radius, this.radius);
    }
}

class ClickButton{
    constructor(id, x, y, rad, func, draw){
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = rad;
        this.action = func;
        this.draw = draw;
    }
}

class TriangleButton{
    constructor(id, x, y, w, h, func, text){
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "#999";
        this.direction = 0;
        this.action = func;
        this.text = text;
    }
    calcDirection(target, facingTowards){
        if(facingTowards){
            let targetAng = Math.atan2((target.x - this.x), (target.y - this.y));
            this.direction = targetAng
        }
        else{
            let targetAng = Math.atan2((target.x - this.x), (target.y - this.y));
            this.direction = targetAng + degreesToRadians(180);
        }
        
    }
    draw(graphics){
        graphics.drawTriangle(this, false, this.w, this.h);
        let font = "bold 20px Consolas";
        graphics.drawText(this.x-10, this.y-10, this.text, font, "#ddd");
    }
}

class Pin{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.name = "Pin";
    }
    draw(art){
        art.drawPointer(this.x, this.y, "#fff");
    }
}

class ContextMenu{
    constructor(x, y, type){
        this.x = x;
        this.y = y;
        this.buttonHeight = 20;
        this.width = 100;
        this.type = type;
        this.options = this.loadOptions();
        this.height = this.options.length * this.buttonHeight;
    }
    loadOptions(){
        let opts = [];
        if(this.type == "galaxy"){
            opts = [new ContextMenuButton("View System", function(gam){gam.viewState = "StarSystem"; gam.viewing = gam.systemHighlight; gam.systemHighlight = -1; renderStarSystem(gam);}, true), 
                new ContextMenuButton("Fly to System", function(gam){gam.map[gam.player.location].removeEntity(gam.player.ship);
                    gam.player.ship.target = -1;
                    gam.player.location = gam.systemHighlight;
                    gam.map[gam.player.location].addEntity(gam.player.ship); 
                    gam.systemHighlight = -1; 
                    gam.player.ship.x = 500; gam.player.ship.y = 500;}, true)];
            this.width = 125;
        }
        if(this.type == "system"){
            opts = [new ContextMenuButton("Fly Here", function(gam){gam.player.ship.setTarget(gam.map[gam.viewing].pin, true); 
                gam.player.ship.calcDirection();}, true), 
                new ContextMenuButton("View", "", false), 
                new ContextMenuButton("Attack", "", false)];
        }
        return opts
    }
    draw(art){
        let font = "bold 15px Consolas";
        art.fillRect(this.x, this.y, this.width, this.height, "#444", "#444");
        for(let r = 0; r < this.options.length; r++){
            
            this.options[r].draw(art, this.x+5, this.y+(15)+(r*20), font);
        }
    }
    handleClick(x, y, gam, data){
        let h = this.y;
        for(let r = 0; r < this.options.length; r++){
            if((y > h && y < h+this.buttonHeight) && this.options[r].enabled){
                this.options[r].action(gam);
                gam.contextMenu = -1;
                if(gam.viewing != -1){
                    gam.map[gam.viewing].pin = -1;
                }
                break;
            }
            else{
                h += 20;
            }
        }
    }
}

class ContextMenuButton{
    constructor(text, actionFunc, enabled){
        this.text = text;
        this.action = actionFunc;
        this.enabled = enabled || false;   
    }
    draw(art, x, y, font){
        let col = "#fff";
        if(!this.enabled) col = "#777";
        art.drawText(x, y, this.text, font, col);
    }
}

class Entity{
    //referring to any game object updated in real time, such as ships, turrets, projectiles
    constructor(id, x, y){
        this.id = id;
        this.x = x;
        this.y = y;
        this.moveSpeed = 0;
        this.entType = "entity";
    }
    step(){
        console.log("Default step not overriden!");
    }
}

class Ship extends Entity{
    constructor(id, x, y, owner, color){
        super(id, x, y);
        this.owner = owner;
        this.color = color;
        this.direction = 0;
        this.target = -1;
        this.status = "no-target";
        this.moveSpeed = 20;
        this.entType = "ship";
        this.xVariance = 0;
        this.yVariance = 0;
    }
    draw(art){
        if(this.target != -1){
            art.dashedLine(this.x, this.y, this.target.x, this.target.y, "#999");
        }
        art.drawTriangle(this, !this.owner.isBot);
    }
    calcDirection(){
        let targetAng = Math.atan2(((this.target.x + this.xVariance) - this.x), ((this.target.y + this.yVariance) - this.y));
        this.direction = targetAng;
    }
    step(gam){
        let dx = (this.target.x + this.xVariance) - this.x ;
        let dy = (this.target.y + this.yVariance) - this.y ; // Make sure it's TARGET MINUS SELF, NOT THE OTHER WAY AROUND (or it'll go backwards)
        let len = Math.sqrt(dx * dx + dy * dy) ; // basically the distance to the target position.
        
        if(len > 0){
            // let targetAng = Math.atan2((this.moveTarget.x - this.x), (this.moveTarget.y - this.y));
            // this.direction = targetAng;
            if(this.target != -1){
                this.calcDirection();
            }   
            const new_len = Math.min(this.moveSpeed, len) ;
            const factor = new_len / len ;
            dx *= factor ;
            dy *= factor ;
            this.x += dx ;
            this.y += dy ;
            this.status = "moving";   
        }
        else{
            // if(this.target == gam.map[gam.viewing].pin){
            //     gam.map[gam.viewing].pin = -1;
            // }
            this.target = -1;
            this.status = "arrived";
        }
    }
    setTarget(target, precise){
        if(!precise){
            this.xVariance = Math.floor(Math.random()*30) - 15;
            this.yVariance = Math.floor(Math.random()*30) - 15;
        }
        this.target = target;
    }
}