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
            let pick = 2;//ran.rangeInt(0, 5);
            switch(pick){
                case 0: //idle
                    let idleTime = ran.rangeInt(10, 100);
                    this.task = {type:"idle", duration: idleTime};
                    break;
                case 1: //move
                    this.task = {type: "move", target: []};
                    break;
                case 2: //visit
                    let opts = gam.map[this.location].bodies;
                    let choice = ran.rangeInt(1, opts.length);
                    let waitTime = ran.rangeInt(10, 100);
                    this.task = {type: "visit", target: opts[choice], duration:waitTime};
                    this.ship.target = this.task.target;
                    break;
                case 3: //leave
                    this.task = {type: "leave", target: ""};
                    break;
            }
        }
    }
    step(){
        if(this.ship.status == "arrived"){
            this.task.duration--;
            if(this.task.duration == 0){
                this.pickTask();
            }
        }
    }
}