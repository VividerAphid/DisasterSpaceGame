(function(){

    mapCan.width = 1500;
    mapCan.height = 1500;
    let ctx = mapCan.getContext("2d");
    let artist = new art(ctx);
    
    let sectors = [];
    let entities = {
        layer0: [], //Planets, background objects
        layer1: [], //Secondary background like space stations
        layer2: [], //Primary layer for ships
        layer3: []  //Layer for projectiles
    };

    // sectors.push(new sector("TL", 0, 0, [], "#f00"));
    // sectors.push(new sector("TR", 750, 0, [], "#00f"));
    // sectors.push(new sector("LL", 0, 750, [], "#0f0"));
    // sectors.push(new sector("LR", 750, 750, [], "#ff0"));


    entities = loadTestWorld();

    artist.renderEntities(sectors, entities);
    
})();