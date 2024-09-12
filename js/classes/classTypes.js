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
        speed: 10, //unit per sec?
        turnSpeed: 5, //Degrees per sec?
        reactorPower: 1000 //Total amount of power ship can support in modules
    },
    Rounded:{
        name: "Rounded Class",
        health: 2000,
        armor: 1000,
        shield: 500,
        modCount: 7,
        speed: 25,
        turnSpeed: 20,
        reactorPower: 2000
    },
    
    Speeder:{
        name: "Speeder Class",
        health: 1000,
        armor: 500,
        shield: 250,
        modCount: 7,
        speed: 40,
        turnSpeed: 35,
        reactorPower: 1500
    },
 
    Armor:{
        name: "Tank Class",
        health: 5000,
        armor: 2500,
        shield: 1500,
        modCount: 7,
        speed: 15,
        turnSpeed: 10,
        reactorPower: 2000
    },
 
    Damage:{
        name: "Killer Class",
        health: 1500,
        armor: 750,
        shield: 350,
        modCount: 10,
        speed: 30,
        turnSpeed: 30,
        reactorPower: 3000
    },
 
    Utility:{
        name: "Utility Class",
        health: 2000,
        armor: 1000,
        shield: 500,
        modCount: 12,
        speed: 20,
        turnSpeed: 15,
        reactorPower: 1500
    }
};
 
var weapons = {
    LaserBeam:{
        name: "Laser Beam Cannon",
        damageType: "Energy",
        health: 100,
        damage: 100,
        range: 1000,
        shotDelay: 1, //time in ms
        magSize: 1,
        reloadTime: 3000,
        powerCost: 500
    },
    JNL:{
        name: "JNL",
        damageType: "Energy",
        health: 100,
        damage: 10,
        range: 100,
        shotDelay: 200, //time in ms
        magSize: 10, //shots before cooldown
        reloadTime: 2000, //cooldown, but referring to it as reload for consistency
        projectileSpeed: 10,
        powerCost: 200
    },
    Plasma:{
        name: "Plasma Cannon",
        damageType: "Energy",
        health: 100,
        damage: 35,
        range: 100,
        shotDelay: 250, //time in ms
        magSize: 20, //shots before cooldown
        reloadTime: 2500, //cooldown, but referring to it as reload for consistency
        projectileSpeed: 20,
        powerCost: 350
    },
    Slug:{
        name: "Slug Cannon",
        damageType: "Physical",
        health: 100,
        damage: 15,
        range: 80,
        shotDelay: 250, //time in ms
        magSize: 10, //shots before cooldown
        reloadTime: 1750, //cooldown, but referring to it as reload for consistency
        projectileSpeed: 10,
        powerCost: 150
    },
    SlugXL:{
        name: "Slug XL Cannon",
        damageType: "Physical",
        health: 100,
        damage: 45,
        range: 80,
        shotDelay: 300, //time in ms
        magSize: 20, //shots before cooldown
        reloadTime: 2250, //cooldown, but referring to it as reload for consistency
        projectileSpeed: 15,
        powerCost: 300
    },
    RailGun:{
        name: "RailGun",
        damageType: "Physical",
        health: 100,
        damage: 125,
        range: 900,
        shotDelay: 1, //time in ms
        magSize: 1, //shots before cooldown
        reloadTime: 2750, //cooldown, but referring to it as reload for consistency
        projectileSpeed: 1000,
        powerCost: 450
    },
    GuidedRocket:{
        name: "Guided Rocket",
        damageType: "Explosive",
        health: 100,
        damage: 150,
        range: 750,
        shotDelay: 1, //time in ms
        magSize: 1, //shots before cooldown
        reloadTime: 10000, //cooldown, but referring to it as reload for consistency
        projectileSpeed: 50,
        powerCost: 550
    },
    Rocket:{
        name: "Rocket",
        damageType: "Explosive",
        health: 100,
        damage: 150,
        range: 650,
        shotDelay: 250, //time in ms
        magSize: 8, //shots before cooldown
        reloadTime: 10000, //cooldown, but referring to it as reload for consistency
        projectileSpeed: 50,
        powerCost: 450
    },
    DepthCharge:{
        name: "Depth Charge",
        damageType: "Explosive",
        health: 100,
        damage: 250,
        range: 60,
        shotDelay: 200, //time in ms
        magSize: 10, //shots before cooldown
        reloadTime: 15000, //cooldown, but referring to it as reload for consistency
        projectileSpeed: 10,
        powerCost: 350
    }
};
 
var modules = {
    MiningModule:{
        health: 100,
        speed: 100, //time in ms
        strength: 1, //Max Level of ore it can mine
        powerCost: 100
    }, 
    StorageModule:{
        health: 150,
        capacity: 100, //Amount of units it can hold
        powerCost: 10
    },
    BuildingModule:{
        health: 150,
        speed: 100, //time in ms
        strength: 1,
        powerCost: 100
    },
    RadarModule:{
        health: 100,
        range: 3000,
        strength: 1, // Level of detection/resistance to jammers
        powerCost: 250
    },
    Shield:{
        health: 100, //Health of actual module
        shieldAmount: 1000,
        rechargeRate: 10, //Points per sec
        chargeStart: 5000, //ms without taking damage that shield will start charging
        powerCost: 450
    },
    Armor:{
        health: 100,
        armorAmount: 250,
        powerCost: 10
    },
    Jammer:{
        health: 100,
        range: 3000,
        strength: 1,
        powerCost: 200
    }
};