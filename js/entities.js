class entity{
    constructor(nm){
        this.id = generateUUID();
        this.name = nm;
    }
    printId(){console.log(this.id);}
}

class ship extends entity{

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