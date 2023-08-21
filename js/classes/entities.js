class Entity{
    constructor(pos, hea, dir, team){
        this._position = pos; //Vector3f
        this._health = hea;
        this._speed = 0;
        this._direction = dir;
        this._team = team;
        this._obj; //Reference to the model being rendered
    }
    update(){
        this._position.x += this._speed;
        this._position.z += this._speed;
        this._obj.position.x += this._speed;
        this._obj.position.z += this._speed;
    }
}

class Ship extends Entity{
    constructor(pos, hea, dir, team, own, shipTypeData){
        super(pos, hea, dir, team);
        this._owner = own;
        this._modules = [];
        this._target;
        //unpack shipTypeData
    }
    update(){
        this._position.x += this._speed;
        this._position.z += this._speed;
        this._obj.position.x += this._speed;
        this._obj.position.z += this._speed;
        for(let r = 0; r < this._modules.length; r++){
            this._modules[r].update();
        }
    }

    //ship types will be defined elsewhere, pre-defined stats like speed, armor, module count, etc
}

class Station extends Entity{ //Space station type objects, including things like mining platforms, defense stations, etc
    constructor(pos, hea, dir, team){
        super(pos, hea, dir, team);
        this._modules = [];
    }
    //station types defined elsewhere, same as Ship
}

class SpaceBody extends Entity{ //Asteroids, planets
    constructor(pos, hea, dir, team){
        super(pos, hea, dir, team);
    }
    //SpaceBody types defined elsewhere, potentially slightly randomised stats
}

class Projectile extends Entity{ //Projectiles from weapons
    constructor(pos, hea, dir, team, projectileData){
        super(pos, hea, dir, team);
        this._damage = projectileData.damage;
        this._speed = projectileData.speed;
        this._lifeSpan = projectileData.lifeSpan;
        this._timeAlive = 0;
    }
}

class SeekingProjectile extends Projectile{ //For seeking missiles/rockets etc.
    constructor(pos, hea, dir, team, projectileData, target){
        super(pos, hea, dir, team, projectileData);
        this._target = target;
    }
    //target
}

class Module{ //Ship equipment slots like weapons, storage, shield
    constructor(owner){
        this._owner = owner;
    }
    update(){
        //Do the stuff with the things
    }
}

class Weapon extends Module{ //Weapon modules
    constructor(owner, weaponData){
        super(owner);
        this._damage = weaponData.damage;
        this._name = weaponData.name;
        this._range = weaponData.range;
        this._shotDelay = weaponData.shotDelay;
        this._magSize = weaponData.magSize;
        this._reloadTime = weaponData.reloadTime;
        this._powerCost = weaponData.powerCost;
        this._lastShot;
    }
    update(){
        if(!!this._owner._target){
            let distance = findLengthPoints(this._owner._position.x, this._owner._target._position.x, this._owner._position.z, this._owner._target._position.z);
            if(distance <= this._range){
                this.fire();
            }
        }
    }
    fire(){
        console.log("FIRE");
    }
}

class Player{
    
}

class Bot extends Player{

}

class Faction{
    constructor(name, col){
        this._id = generateUUID();
        this._name = name;
        this._color = col;
        this._members = [];
    }
}