class Game{
    constructor(map, graphics){
        this.map = map;
        this.graphics = graphics;
        this.viewState = "Galaxy"; // "Galaxy", "StarSystem", "Menu"
        this.viewing = -1;
        this.player = -1;
        this.systemHighlight = -1;
        this.contextMenu = -1;
        this.npcs = [];
        this.npcRandom = new AphidRandom(randomSeed+"npc");
    }
}

class Player{
    constructor(id, name, color){
        this.id = id;
        this.name = name;
        this.color = color;
        this.ship = -1; //-1 for unassigned ship to throw error
        this.location = -1; //System id, -1 for unassigned
        this.x = "x"; //"x" for unassigned location to throw error
        this.y = "y"; //"y" for unassigned location to throw error
        this.isBot = false;
    }
}

class NPC extends Player{
    constructor(id, name, color){
        super(id, name, color);
        this.isBot = true;
        this.task = "";
    }
    pickTask(){
        if(this.location != -1){
            let ran = gam.npcRandom;
            let pick = ran.rangeInt(0, 4);
            switch(pick){
                case 0: //idle
                    let idleTime = ran.rangeInt(10, 100);
                    this.task = {type:"idle", duration: idleTime};
                    break;
                case 1: //move
                    let xPick = ran.rangeInt(300, 1200);
                    let yPick = ran.rangeInt(300, 1200);
                    this.task = {type: "move", target: {x:xPick, y: yPick}, duration:1}; //duration 1 to trigger picking new task
                    break;
                case 2: //visit
                    let opts = gam.map[this.location].bodies;
                    let choice = ran.rangeInt(1, opts.length);
                    let waitTime = ran.rangeInt(10, 100);
                    this.task = {type: "visit", target: opts[choice], duration:waitTime};
                    this.ship.setTarget(this.task.target, false);
                    break;
                case 3: //leave
                    this.task = {type: "leave", target: ""};
                    let pick = ran.rangeInt(0, gam.map[this.location].connections.length);
                    this.task.target = gam.map[this.location].connections[pick];
                    this.ship.setTarget({x:0, y:0}, false);
                    break;
            }
        }
    }
    step(){
        if(this.ship.status == "arrived"){
            if(this.task.type == "leave"){
                gam.map[this.location].removeEntity(this.ship);
                gam.map[this.task.target].addEntity(this.ship);
                this.location = this.task.target;
                let xPick = gam.npcRandom.rangeInt(300, 1200);
                let yPick = gam.npcRandom.rangeInt(300, 1200);
                this.task = {type: "move", target: {x: xPick, y: yPick}, duration:1};
                this.ship.setTarget(this.task.target, false);
            }
            else{
                this.task.duration--;
                if(this.task.duration == 0){
                    this.pickTask();
                }
            }
        }
    }
}

class ItemFactory{
    constructor(id, x, y, type){
        this.id = id;
        this.x = x;
        this.y = y;
        this.type = type;
        this.product = getFactoryProducts(type);
        this.producing = false;
        this.productionProgress = 0;
        this.inventory = {};
        this.inventory[type] = 0;
        this.size = 60;
        this.widthMult = 1.25;
    }
    render(){
        console.log("ItemFactory render not set up yet!");
    }
    receiveMaterials(materials){
        //expects an object
        //eg.: {metal: 2, wood: 3, plastic: 2}
        for(const [key, value] of Object.entries(materials)){
            if(this.inventory[key]){
                this.inventory[key] += value;
            }
            else{
                this.inventory[key] = value;
            }
        }
        this.producing = checkCraftable(this.product, this.inventory);
    }
    sendProducts(){
        //handles sending the completed products out
        let outgoing = this.inventory[this.type];
        this.inventory[this.type] = 0;
        return outgoing;
    }
    tick(){
        if(this.producing){
            if(this.productionProgress < this.product.time){
                this.productionProgress++;
            }
            else{
                this.inventory[this.type] += this.product.makes;
                for(const [key, value] of Object.entries(this.product.cost)){
                    this.inventory[key] -= value;
                }
                this.productionProgress = 0;
                this.producing = checkCraftable(this.product, this.inventory);
            }
        }
    }
}