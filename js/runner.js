(function(){

    mapCan.width = 1500;
    mapCan.height = 1500;
    let ctx = mapCan.getContext("2d");
    let artist = new art(ctx);
    
    let entities = {
        layer0: [], //Planets, background objects
        layer1: [], //Secondary background like space stations
        layer2: []  //Primary layer for ships and projectiles
    };

    entities.layer0.push(new inanimate("Hell", 200, 200, "#792", "drawPlanet"));
    entities.layer2.push(new ship("Flapping Lighthouse", 200, 200, "#f00", "drawTriangle"));
    entities.layer2.push(new ship("Swooping Tower", 300, 300, "#00f", "drawTriangle"));

    entities.layer2[0].direction = 90 * Math.PI/180;
    entities.layer2[1].direction = 180 * Math.PI/180;

    artist.renderEntities(entities);
    
})();