class entity{
    constructor(nm, x, y, col, artStyle){
        this.id = generateUUID();
        this.name = nm;
        this.direction = 0; //radians, set from setDirection() using 0-360
        this.speed = 0; //unknown how units will work here yet
        this.x = x;
        this.y = y;
        this.color = col;
        this.draw = artStyle; //Save reference of render function here?
    }
    printId(){console.log(this.id);}
    setDirection(deg){
        this.direction = deg * Math.PI / 180;
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
    }
    printId(){console.log(this.id);}
}

class bot extends player{

}