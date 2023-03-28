(function(){

    mapCan.width = 1500;
    mapCan.height = 1500;
    let ctx = mapCan.getContext("2d");
    let artist = new art(ctx);
    
    let sectors = [];

    sectors.push(new sector("TL", 0, 0, [], "#f00"));
    // sectors.push(new sector("TR", 750, 0, [], "#00f"));
    // sectors.push(new sector("LL", 0, 750, [], "#0f0"));
    // sectors.push(new sector("LR", 750, 750, [], "#ff0"));


    //entities = loadTestWorld();
    sectors[0].entities = loadTestWorld();
    //entities.layer2[0].speed = 1;
    //entities.layer2[0].setDirection(90);

    let gm = new game(mapCan);
    gm.sectors = sectors;

    gm.start();
    //gm.stop();
    
})();