class Game{
    constructor(map, graphics){
        this.map = map;
        this.graphics = graphics;
        this.viewState = "Galaxy"; // "Galaxy", "StarSystem", "Menu"
        this.viewing = -1;
        this.player = -1;
        this.systemHighlight = -1;
        this.contextMenu = -1;
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