class EntityHandler{
    constructor(THREE){
        this.THREEREF = THREE;
        this._factions = [];
        this._players = [];
        this._entities = [];
    }

    update(){
        for(let r = 0; r < this._entities.length; r++){
            this._entities[r].update();
        }
    }

    loadTestScene(){
        this._factions.push(new Faction("Red Rekkers", 0xff0000));
        this._factions.push(new Faction("Green Getters", 0x00ff00));

        let shipCount = 20;
        let horizontalRange = 500;
        let verticalRange = 10;
        for(let r = 0; r < shipCount; r++){
            let pos = new this.THREEREF.Vector3;
            let fac;
            let facNum;
            let speed;
            if(r % 2 == 0){
                fac = this._factions[0];
                facNum = 0;
                pos.x = Math.floor(Math.random()*(horizontalRange*.25)) - horizontalRange/2;
                pos.y = Math.floor(Math.random()*verticalRange) - verticalRange/2;
                pos.z = Math.floor(Math.random()*(horizontalRange*.25)) - horizontalRange/2;
                speed = 0.05;
            }
            else{
                fac = this._factions[1];
                facNum = 1;
                pos.x = Math.floor(Math.random()*(horizontalRange*.25)) + horizontalRange/4;
                pos.y = Math.floor(Math.random()*verticalRange) - verticalRange/2;
                pos.z = Math.floor(Math.random()*(horizontalRange*.25)) + horizontalRange/4;
                speed = -0.05;
            }
            let shippy = new Ship(pos, 1000, 0, fac, {}, {});
            shippy._speed = speed;
            this._factions[facNum]._members.push(shippy);
            shippy._modules.push(new Weapon(shippy, {name: "Test Laser", damage: 100, range: 100, shotDelay: 3000, magSize: 1, reloadTime: 1, powerCost: 500}));
            this._entities.push(shippy);
        }
        for(let r = 0; r < shipCount; r++){
            if(r % 2 == 0){
                let pick = Math.floor(Math.random()*(shipCount/2));
                this._entities[r]._target = this._factions[1]._members[pick];
            }
            else{
                let pick = Math.floor(Math.random()*(shipCount/2));
                this._entities[r]._target = this._factions[0]._members[pick];
            }
        }

    }
}