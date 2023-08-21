class WeaponTemplate{
    constructor(name, damage, roF, magSize){
        this._name = name;
        this._damage = damage;
        this._roF = roF;
        this._magSize = magSize;
    }
}

class ShipTemplate{
    //the ship stuff here
}

var ships = {
    StarterShip:{
        name: "Starter Ship Class",
        health: 1000,
        armor: 500,
        shield: 250,
        modCount: 5, //Max number of modules
        speed: 10,
        turnSpeed: 5,
        reactorPower: 1000 //Total amount of power ship can support in modules
    }
};

var weapons = {
    LaserBeam:{
        name: "Laser Beam Cannon",
        health: 100,
        damage: 100,
        range: 1000,
        shotDelay: 3000, //time in ms
        magSize: 1,
        reloadTime: 1,
        powerCost: 500
    },
    JNL:{
        name: "JNL",
        health: 100,
        damage: 10,
        range: 100,
        shotDelay: 50, //time in ms
        magSize: 10, //shots before cooldown
        reloadTime: 1000, //cooldown, but referring to it as reload for consistency
        projectileSpeed: 10,
        powerCost: 200
    }
};