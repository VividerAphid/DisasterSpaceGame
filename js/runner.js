(function(){
    let entities = [];

    for(let r = 0; r < 15; r++){
        entities.push(new entity("TesteBOi"+r));
        //entities[r].printId();
    }
    console.log(entities);

    mapCan.width = 1500;
    mapCan.height = 1500;
    let ctx = mapCan.getContext("2d");
    let artist = new art(ctx);
    artist.drawTriangle({x: 200, y: 200, color: "#f00"});
})();