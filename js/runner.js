(function(){

    mapCan.width = 1500;
    mapCan.height = 1500;
    
    let sectors = [];

    sectors.push(new sector("TL", 0, 0, [], "#f00"));
    // sectors.push(new sector("TR", 750, 0, [], "#00f"));
    // sectors.push(new sector("LL", 0, 750, [], "#0f0"));
    // sectors.push(new sector("LR", 750, 750, [], "#ff0"));

    sectors[0].entities = loadTestWorld();
    // sectors[3].entities = {layer0: [new inanimate("AntiHell", 950, 950, "#432", "drawPlanet")]};

    let gm = new game(mapCan);
    gm.sectors = sectors;

    gm.start();
    //gm.stop();
    
})();