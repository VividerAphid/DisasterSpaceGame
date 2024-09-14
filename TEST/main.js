function renderMap(gam){
    gam.graphics.fillRect(0, 0, mapCan.width, mapCan.height, "#222", "#222");
    let systems = gam.map;
    let arty = gam.graphics;
    for(let r = 0; r < systems.length; r++){
        systems[r].drawConnections(arty, systems);
    }
    for(let r = 0; r < systems.length; r++){
        systems[r].drawStar(arty);
        systems[r].drawDebugs(arty);
    }
}

function renderStarSystem(gam){
    gam.graphics.fillRect(0, 0, mapCan.width, mapCan.height, "#222", "#222");
    gam.graphics.drawRing(600, 600, "#999", 300, 3);
    let bodies = gam.map[gam.viewing].bodies;
    console.log(bodies);
    for(let r = 0; r < bodies.length; r++){
        console.log(r);
        bodies[r].draw(gam.graphics);
    }
}

function checkSystemClick(gam){
    let map = gam.map;
    let canvRect = mapCan.getBoundingClientRect();
	let x = (event.clientX - canvRect.left);
	let y = (event.clientY - canvRect.top);

    let clickRad = 15;

    for(let r = 0; r < map.length; r++){
        if (x >= (map[r].x - clickRad) && x <= (map[r].x + clickRad)){
			if (y >= (map[r].y - clickRad) && y <= (map[r].y + clickRad)){
                console.log(r);
                gam.viewState = "StarSystem";
                gam.viewing = r;
                renderStarSystem(gam);
            }
        }
    }
}

function loadSystemView(){

}