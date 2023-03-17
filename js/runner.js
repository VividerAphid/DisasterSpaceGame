(function(){
    let entities = [];

    entities.push(new ship("Flapping Lighthouse", 200, 200, "#f00"));
    entities.push(new ship("Swooping Tower", 300, 300, "#00f"));

    entities[0].direction = 90 * Math.PI/180;
    entities[1].direction = 180 * Math.PI/180;

    mapCan.width = 1500;
    mapCan.height = 1500;
    let ctx = mapCan.getContext("2d");
    let artist = new art(ctx);
    artist.drawTriangle(entities[0]);
    artist.drawTriangle(entities[1]);
})();