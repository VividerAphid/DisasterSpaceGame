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

    let clickRad = 15;

    if(gam.viewState == "Galaxy"){
        for(let r = 0; r < map.length; r++){
            if (x >= (map[r].x - clickRad) && x <= (map[r].x + clickRad)){
                if (y >= (map[r].y - clickRad) && y <= (map[r].y + clickRad)){
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
        //console.log("star system click");
        isTicking = !isTicking;
        //console.log(isTicking);
        if(isTicking){
            tickFunc = setInterval(gameTick, 100, gam);
        }
        else{
            clearInterval(tickFunc);
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
    for(let r = 0; r < 1; r++){
        let xButtonFunc = function(gam){gam};
        let xButton = new ClickButton(0, 10, 10, )
        let planetcount = 9;//Math.floor(Math.random()*10);
        let starcolpick = Math.floor(Math.random()*starColors.length);
        let centerStar = new Star(1, centerCoords[0], centerCoords[1], starRad, starColors[starcolpick]);
        map[r].bodies.push(centerStar);
        let prevDist = centerCoords[1] - 100;
        for(let t = 0; t < planetcount; t++){
            let rad = Math.floor(Math.random()* (planetRads[1]-planetRads[0])) + planetRads[0];
            let colpick = Math.floor(Math.random()*planetColors.length);
            let amt = (Math.random()*10) + 5;
            let planet = new Planet(t+2, centerCoords[0], prevDist, rad, planetColors[colpick], centerStar, amt);
            prevDist = prevDist - ((Math.random()*20) + 50);           
            map[r].bodies.push(planet);
            let ang = Math.random()*360;
            planet.handleRotate(ang, centerStar);
            if(Math.random() > .6){
                let moonCount = Math.floor(Math.random()*3) +1;
                for(let z = 0; z < moonCount; z++){
                    let mooncol = Math.floor(Math.random()*moonColors.length);
                    let moon = new Planet(t+2, planet.x, planet.y - 30, 5, moonColors[mooncol], planet, 3);
                    map[r].bodies.push(moon);
                    planet.satellites.push(moon);
                    moon.handleRotate(Math.random()*360, planet);
                }
            }
        }
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