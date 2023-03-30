(function(){

    mapCan.width = 1500;
    mapCan.height = 1500;
    
    let sectors = [];

    sectors.push(new sector("TL", 0, 0, [], "#f00", 750, 750));
    // sectors.push(new sector("TR", 750, 0, [], "#00f", 750, 750));
    // sectors.push(new sector("LL", 0, 750, [], "#0f0", 750, 750));
    // sectors.push(new sector("LR", 750, 750, [], "#ff0", 750, 750));

    sectors[0].entities = loadTestWorld();
    // sectors[3].entities = {layer0: [new inanimate("AntiHell", 950, 950, "#432", "drawPlanet")]};

    let playr = new player("Aphid");
    playr.assignShip(sectors[0].entities.layer2[0]);
    let gm = new game(mapCan);
    gm.sectors = sectors;
    gm.player = playr;

    gm.start();
    //gm.stop();

    mapCan.onclick = function(event){
        event.preventDefault();
        //console.log("YEET");
        processClick(gm, checkClicked(gm));
    }
    
})();