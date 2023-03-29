class entity{
    constructor(nm, x, y, col, artStyle){
        this.id = generateUUID();
        this.name = nm;
        this.direction = 0; //radians, set from setDirection() using 0-360
        this.turnVal = 0;
        this.speed = 0; //unknown how units will work here yet
        this.x = x;
        this.y = y;
        this.color = col;
        this.draw = artStyle; //Save reference of render function here?
        this.target;
        this.selected = false;
    }
    printId(){console.log(this.id);}
    setDirection(deg){
        this.direction = deg * Math.PI / 180;
    }
    update(time){
        if(this.speed > 0){
            if(!!this.target){
                this.moveToTarget(time);
            }
            else{
                this.move(time);
            }
        }
    }
    moveToTarget(time){
        let dx = this.target.x - this.x ;
        let dy = this.target.y - this.y ; // Make sure it's TARGET MINUS SELF, NOT THE OTHER WAY AROUND (or it'll go backwards)
        const len = Math.sqrt(dx * dx + dy * dy) ; // basically the distance to the target position.
        if(len > 0){
            let targetAng = Math.atan2((this.target.x - this.x), (this.target.y - this.y));
            this.direction = targetAng;
            const new_len = Math.min(this.speed * time, len) ;
            const factor = new_len / len ;
            dx *= factor ;
            dy *= factor ;
            this.x += dx ;
            this.y += dy ;   
        }
    }
    move(time){
        this.x += (this.speed * time) * Math.sin(this.direction);
        this.y += (this.speed * time) * Math.cos(this.direction);
        this.direction += this.turnVal;
    }
}

class ship extends entity{
    constructor(nm, x, y, col, artStyle){
        super(nm, x, y, col, artStyle);
    }
}

class projectile extends entity{
    constructor(nm, x, y, col, artStyle, owner, target){
        super(nm, x, y, col, artStyle);
        this.owner = owner;
        this.target = target;
    }
}

class inanimate extends entity{

}

class sector{
    constructor(nm, x, y, entities, bC){
        this.name = nm;
        this.x = x;
        this.y = y;
        this.entities = entities; //List of all the entities in the sector
        this.borderColor = bC;
    }
}

class player{
    constructor(nm){
        this.id = generateUUID();
        this.name = nm;
        this.ship;
    }
    assignShip(ship){
        this.ship = ship;
    }
    printId(){console.log(this.id);}
}

class bot extends player{

}