(function(){

    mapCan.width = 1500;
    mapCan.height = 1500;
    
    let sectors = [];

    sectors.push(new Sector("TL", 0, 0, [], "#f00", 750, 750));
    // sectors.push(new sector("TR", 750, 0, [], "#00f", 750, 750));
    // sectors.push(new sector("LL", 0, 750, [], "#0f0", 750, 750));
    // sectors.push(new sector("LR", 750, 750, [], "#ff0", 750, 750));

    sectors[0].entities = loadTestWorld();
    // sectors[3].entities = {layer0: [new Inanimate("AntiHell", 950, 950, "#432", "drawPlanet")]};

    let playr = new Player("Aphid");
    let tstBot = new Bot("DUMMYBOI");

    let iter = sectors[0].entities.layer2.values(); //TEMPORARY

    playr.assignShip(iter.next().value);
    tstBot.assignShip(iter.next().value);
    let gm = new game(mapCan);
    gm.sectors = sectors;
    gm.player = playr;
    gm.bots.push(tstBot);

    playr.ship.target = tstBot.ship;
    tstBot.ship.target = playr.ship;
    //sectors[0].entities.layer2[0].weapons[0].fire();

    gm.start();
    //gm.stop();

    mapCan.onclick = function(event){
        event.preventDefault();
        //console.log("YEET");
        processClick(gm, checkClicked(gm));
    }
    
})();