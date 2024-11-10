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
    gam.graphics.drawRing(600, 600, "#999", 600, 3);
    let bodies = gam.map[gam.viewing].bodies;
    //console.log(bodies);
    for(let r = 0; r < bodies.length; r++){
        //console.log(r);
        bodies[r].draw(gam.graphics);
    }
}

function checkClick(gam){
    let map = gam.map;
    let canvRect = mapCan.getBoundingClientRect();
	let x = (event.clientX - canvRect.left);
	let y = (event.clientY - canvRect.top);

    let clickRad = 5;

    if(gam.viewState == "Galaxy"){
        for(let r = 0; r < map.length; r++){
            if (x >= (map[r].x - (map[r].radius + clickRad)) && x <= (map[r].x + (map[r].radius + clickRad))){
                if (y >= (map[r].y - (map[r].radius + clickRad)) && y <= (map[r].y + (map[r].radius + clickRad))){
                    //console.log(r);
                    gam.viewState = "StarSystem";
                    gam.viewing = r;
                    renderStarSystem(gam);
                }
            }
        }
    }
    else {
        if(gam.viewState == "StarSystem"){
            let bodies = gam.map[gam.viewing].bodies;
            for(let r = 0; r < bodies.length; r++){
                if (x >= (bodies[r].x - (bodies[r].radius + clickRad)) && x <= (bodies[r].x + (bodies[r].radius + clickRad))){
                    if (y >= (bodies[r].y - (bodies[r].radius + clickRad)) && y <= (bodies[r].y + clickRad)){
                        bodies[r].action(gam);
                    }
                }
            }
        }
    }
}

function loadSystemView(){

}

function generateMapContents(map){
    //new Star(1, 600, 600, 20, "#d00")
    let centerCoords = [600, 600];
    let starColors = ["#e00", "#fff", "#0080ff", "#ff8800", "#ffc800"];
    let starRad = 40;
    let planetRads = [10, 25]; //min max
    let planetColors = ["#a51", "#005e19", "#004fc4", "#b07200", "#b02d13", "#877b78"];
    let moonColors = ["#966", "#ccc", "#595757"];
    let aphiRan = new AphidRandom("seed");
    for(let r = 0; r < map.length; r++){
        let xButtonFunc = function(gam){gam.viewState = "Galaxy"; gam.viewing = -1; renderMap(gam);};
        let xButtonDraw = function(graphics){graphics.drawStar(25,35,"#900",20); graphics.drawText(10,50,"X","bold 45px Consolas","#fff");};
        let xButton = new ClickButton(0, 25, 35, 20, xButtonFunc, xButtonDraw);
        map[r].bodies.push(xButton);
        let planetcount = 9;//Math.floor(Math.random()*10);
        let starcolpick = Math.floor(aphiRan.random()*starColors.length);
        let centerStar = new Star(1, centerCoords[0], centerCoords[1], starRad, starColors[starcolpick]);
        map[r].bodies.push(centerStar);
        let prevDist = centerCoords[1] - 100;
        for(let t = 0; t < planetcount; t++){
            let rad = Math.floor(aphiRan.random()* (planetRads[1]-planetRads[0])) + planetRads[0];
            let colpick = Math.floor(aphiRan.random()*planetColors.length);
            let amt = (aphiRan.random()*10) + 5;
            let planet = new Planet(t+2, centerCoords[0], prevDist, rad, planetColors[colpick], centerStar, amt);
            prevDist = prevDist - ((aphiRan.random()*20) + 50);           
            map[r].bodies.push(planet);
            let ang = aphiRan.random()*360;
            planet.handleRotate(ang, centerStar);
            if(aphiRan.random() > .6){
                let moonCount = Math.floor(aphiRan.random()*3) +1;
                for(let z = 0; z < moonCount; z++){
                    let mooncol = Math.floor(aphiRan.random()*moonColors.length);
                    let moon = new Planet(t+2, planet.x, planet.y - 30, 5, moonColors[mooncol], planet, 3);
                    map[r].bodies.push(moon);
                    planet.satellites.push(moon);
                    moon.handleRotate(aphiRan.random()*360, planet);
                }
            }
        }
        map[r].bodies.push(new ResourceNode(42, aphiRan.rangeInt(20, centerCoords[0]*2),aphiRan.rangeInt(20, centerCoords[0]*2), "Rare Cheese", 20, 20));
    }
    //For demoing colors
    // for(let r = 0; r < starColors.length; r++){
    //     map[0].bodies.push(new Star(r+2, 400+(r*80), 800, 20, starColors[r]));
    // }
    return map;
}

function gameTick(gam){
    if(isTicking){
        let map = gam.map[gam.viewing].bodies;
        for(let r = 0; r < map.length; r++){
            if(map[r].id > 1){
                map[r].updateOrbit();
            }
        }
        renderStarSystem(gam);
    }
}