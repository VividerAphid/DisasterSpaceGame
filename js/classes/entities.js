class Entity{
    constructor(nm, x, y, col, artStyle, sect){
        this.id = generateUUID();
        this.name = nm;
        this.direction = 0; //radians, set from setDirection() using 0-360
        this.turnVal = 0;
        this.speed = 0; //unknown how units will work here yet
        this.x = x;
        this.y = y;
        this.color = col;
        this.draw = artStyle; //Save reference of render function here?
        this.target; //attack target
        this.moveTarget; //move target
        this.selected = false;
        this.sector = sect; //Reference to sector entity is in
    }
    printId(){console.log(this.id);}
    setDirection(deg){
        this.direction = deg * Math.PI / 180;
    }
    update(time){
        // if(this.speed > 0){
        //     if(!!this.moveTarget){
        //         this.moveToTarget(time);
        //     }
        //     else{
        //         this.move(time);
        //     }
        // }
    }
    moveToTarget(time){
        // let dx = this.moveTarget.x - this.x ;
        // let dy = this.moveTarget.y - this.y ; // Make sure it's TARGET MINUS SELF, NOT THE OTHER WAY AROUND (or it'll go backwards)
        // const len = Math.sqrt(dx * dx + dy * dy) ; // basically the distance to the target position.
        // if(len > 0){
        //     let targetAng = Math.atan2((this.moveTarget.x - this.x), (this.moveTarget.y - this.y));
        //     this.direction = targetAng;
        //     const new_len = Math.min(this.speed * time, len) ;
        //     const factor = new_len / len ;
        //     dx *= factor ;
        //     dy *= factor ;
        //     this.x += dx ;
        //     this.y += dy ;   
        // }
        // else{
        //     if(this.moveTarget.id == "space"){
        //         this.speed = 0;
        //         this.moveTarget = undefined;
        //     }
        // }
    }
    move(time){
        // this.x += (this.speed * time) * Math.sin(this.direction);
        // this.y += (this.speed * time) * Math.cos(this.direction);
        // this.direction += this.turnVal;
    }
}

class Ship extends Entity{
    constructor(nm, x, y, col, artStyle, sect){
        super(nm, x, y, col, artStyle, sect);
        this.weapons = [];
    }
    update(time){
        if(this.speed > 0){
            if(!!this.moveTarget){
                this.moveToTarget(time);
            }
            else{
                this.move(time);
            }
        }
        if(!!this.target){
            for(let r = 0; r < this.weapons.length; r++){
                this.weapons[r].update(time);
            }
        }
    }
    moveToTarget(time){
        let dx = this.moveTarget.x - this.x ;
        let dy = this.moveTarget.y - this.y ; // Make sure it's TARGET MINUS SELF, NOT THE OTHER WAY AROUND (or it'll go backwards)
        const len = Math.sqrt(dx * dx + dy * dy) ; // basically the distance to the target position.
        if(len > 50){ //50 is arbitrary for now, value allows ship to maintain distance
            let targetAng = Math.atan2((this.moveTarget.x - this.x), (this.moveTarget.y - this.y));
            this.direction = targetAng;
            const new_len = Math.min(this.speed * time, len) ;
            const factor = new_len / len ;
            dx *= factor ;
            dy *= factor ;
            this.x += dx ;
            this.y += dy ;   
        }
        else{
            if(this.moveTarget.id == "space"){
                this.speed = 0;
                this.target = undefined;
            }
        }
    }
}

class Projectile extends Entity{
    constructor(nm, x, y, col, artStyle, owner, target, dmg, lfSpan){
        super(nm, x, y, col, artStyle);
        this.owner = owner;
        this.target = target;
        this.damage = dmg;
        this.lifeSpan = lfSpan;
    }

    update(time){
        this.lifeSpan--;
        if(this.lifeSpan <= 0){
            this.owner.sector.layer3.delete(this);
        }
    }
}

class LaserBeam extends Projectile{

}

class Rocket extends Projectile{
    constructor(nm, x, y, col, artStyle, owner, target, dmg, lfSpan, spd){
        super(nm, x, y, col, artStyle, owner, target, dmg, lfSpan);
        this.speed = spd;
        this.moveTarget = target;
    }
    update(time){
        this.moveToTarget(time);
        this.lifeSpan--;
        if(this.lifeSpan <= 0 || (this.x == this.owner.target.x && this.y == this.owner.target.y)){
            this.owner.sector.layer3.delete(this);
        }
    }
}

class Slug extends Projectile{
    constructor(nm, x, y, col, artStyle, owner, target, direc, dmg, lfSpan, spd){
        super(nm, x, y, col, artStyle, owner, target, dmg, lfSpan);
        this.direction = direc;
        this.speed = spd;
    }
    update(time){
        this.move(time);
        this.lifeSpan--;
        //TODO MAKE COLLISION RADIUS BIGGER OR WE WILL NEVER HIT STUFF
        if(this.lifeSpan <= 0 || (this.x == this.owner.target.x && this.y == this.owner.target.y)){
            this.owner.sector.layer3.delete(this);
        }
    }
}

class Inanimate extends Entity{

}

class Planet extends Inanimate{

}

class Sector{
    constructor(nm, x, y, entities, bC, wid, hei){
        this.name = nm;
        this.x = x;
        this.y = y;
        this.entities = entities; //List of all the entities in the sector
        this.borderColor = bC;
        this.width = wid;
        this.height = hei;
    }
}

class ShipWeapon{
    constructor(ship, dmg, fRate, rRate, rng, mHealth, magSize){
        this.owner = ship;
        this.damage = dmg;
        this.fireRate = fRate;
        this.reloadRate = rRate;
        this.reloading = false;
        this.range = rng;
        this.maxHealth = mHealth
        this.health = mHealth;
        this.magSize = magSize;
        this.lastShot = Timing.now(); //timestamp of last shot
        this.startedReload; //timestamp of reload start
    }
}
class LaserCannon extends ShipWeapon{
    fire(){
        this.owner.sector.layer3.add(new LaserBeam(this.owner.name + " laser", this.owner.x, this.owner.y, this.owner.color, "drawLaser", this.owner, this.owner.target, 100, 70));
        this.lastShot = Timing.now();
    }
    update(){
        if(!!this.owner.target){
            if(Timing.since(this.lastShot) >= this.fireRate){
                this.fire();
            }
        }
    }
}

class MissleLauncher extends ShipWeapon{
    fire(){
        this.owner.sector.layer3.add(new Rocket(this.owner.name + " missile", this.owner.x, this.owner.y, this.owner.color, "drawRocket", this.owner, this.owner.target, 100, 1000, 50));
        this.lastShot = Timing.now();
    }
    update(){
        if(!!this.owner.target){
            if(Timing.since(this.lastShot) >= this.fireRate){            
                this.fire();
                this.lastShot = Timing.now();
            }
        }
    }
}

class RailGun extends ShipWeapon{
    constructor(ship, dmg, fRate, rRate, rng, mHealth, magSize){
        super(ship, dmg, fRate, rRate, rng, mHealth, magSize);
        this.shotsLeft = magSize;
    }
    fire(){
        //let targetAng = Math.atan2((this.moveTarget.x - this.x), (this.moveTarget.y - this.y));
        let direc = Math.atan2((this.owner.target.x - this.owner.x), (this.owner.target.y - this.owner.y));
        this.owner.sector.layer3.add(new Slug(this.owner.name + " slug", this.owner.x, this.owner.y, this.owner.color, "drawSlug", this.owner, this.owner.target, direc, 100, 500, 50));
    }
    update(){
        if(!!this.owner.target){
            if(this.reloading){
                this.reload();
            }
            else{
                if(this.shotsLeft > 0){
                    if(Timing.since(this.lastShot) >= this.fireRate){            
                        this.fire();
                        this.lastShot = Timing.now();
                        this.shotsLeft--;
                    }
                }
                else{
                    this.startedReload = Timing.now();
                    this.reloading = true;
                    this.reload();
                }                
            }
        }
    }
    reload(){
        if(Timing.since(this.startedReload) >= this.reloadRate){
            this.shotsLeft = this.magSize;
            this.reloading = false;
        }
    }
}

class Player{
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

class Bot extends Player{

}