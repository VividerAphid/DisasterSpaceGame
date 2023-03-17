class entity{
    constructor(nm, x, y, col, artStyle){
        this.id = generateUUID();
        this.name = nm;
        this.direction = 0; //0-360 value for my sanity
        this.speed = 0; //unknown how units will work here yet
        this.x = x;
        this.y = y;
        this.color = col;
        this.draw = artStyle; //Save reference of render function here?
    }
    printId(){console.log(this.id);}
}

class ship extends entity{
    constructor(nm, x, y, col, artStyle){
        super(nm, x, y, col, artStyle);
    }
}

class projectile extends entity{

}

class inanimate extends entity{

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