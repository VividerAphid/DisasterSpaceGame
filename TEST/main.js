function renderMap(gam){
    gam.graphics.fillRect(0, 0, mapCan.width, mapCan.height, "#222", "#222");
    let systems = gam.map;
    let arty = gam.graphics;
    for(let r = 0; r < systems.length; r++){
        if(systems[r].territoryColor != "neut"){
            systems[r].drawRegionType(arty);
        }   
    }
    for(let r = 0; r < systems.length; r++){
        systems[r].drawConnections(arty, systems);
    }
    for(let r = 0; r < systems.length; r++){
        if(gam.systemHighlight == r){
            gam.graphics.drawPlanetHighlight(systems[r].x, systems[r].y, systems[r].radius, "#0ff");
        }
        systems[r].drawStar(arty);
        systems[r].drawDebugs(arty);
    }
    if(gam.contextMenu != -1){
        gam.contextMenu.draw(gam.graphics);
    }
    let playerLoc = [gam.map[gam.player.location].x, gam.map[gam.player.location].y-10,]
    gam.graphics.drawPointer(playerLoc[0], playerLoc[1], gam.player.color);
    
}

function renderStarSystem(gam){
    let centerDist = gam.starSystemRadius;
    gam.graphics.fillRect(0, 0, mapCan.width, mapCan.height, "#222", "#222");
    gam.graphics.drawRing(centerDist, centerDist, "#999", centerDist, 3);

    let buttons = gam.map[gam.viewing].systemButtons;
    for(let r = 0; r < buttons.length; r++){
        buttons[r].draw(gam.graphics);
    }
    let bodies = gam.map[gam.viewing].bodies;
    for(let r = 0; r < bodies.length; r++){
        bodies[r].draw(gam.graphics);
    }
    let ents = gam.map[gam.viewing].entities;
    for(let r = 0; r < ents.length; r++){
        ents[r].draw(gam.graphics);
    }
    if(gam.map[gam.viewing].pin != -1){
        gam.map[gam.viewing].pin.draw(gam.graphics);
    }
    if(gam.contextMenu != -1){
        gam.contextMenu.draw(gam.graphics);
    }
}

function checkClick(gam){
    let map = gam.map;
    let canvRect = mapCan.getBoundingClientRect();
	let x = (event.clientX - canvRect.left);
	let y = (event.clientY - canvRect.top);

    let clickRad = 5;

    if(gam.viewState == "Galaxy"){
        let highlight = -1;
        let menuClick = false;
        if(gam.contextMenu != -1){
            if((x >= gam.contextMenu.x && x <= (gam.contextMenu.x + gam.contextMenu.width) && (y >= gam.contextMenu.y && y <= (gam.contextMenu.y + gam.contextMenu.height)))){
                gam.contextMenu.handleClick(x, y, gam);
                menuClick = true;
            }
            else{
                menuClick = false;
            }
        }
        if(!menuClick){
            for(let r = 0; r < map.length; r++){
                if (x >= (map[r].x - (map[r].radius + clickRad)) && x <= (map[r].x + (map[r].radius + clickRad))){
                    if (y >= (map[r].y - (map[r].radius + clickRad)) && y <= (map[r].y + (map[r].radius + clickRad))){
                        if(gam.systemHighlight != r){
                            highlight = r;
                        }
                    }
                }
            }
            if(highlight != -1){
                gam.systemHighlight = highlight;
                gam.contextMenu = new ContextMenu(x, y, "galaxy");
                gam.contextMenu.loadGalaxyMenuPreset();
            }
            else{
                gam.systemHighlight = -1;
                if(!menuClick){
                    gam.contextMenu = -1;
                }
            }
        }
        renderMap(gam);
    }
    else {
        if(gam.viewState == "StarSystem"){
            let system = gam.map[gam.viewing];
            let buttons = system.systemButtons;
            let bodies = system.bodies;
            let ents = system.entities;
            let clickedBody = "";
            let action = "";
            for(let r = 0; r < buttons.length; r++){
                if(circlePointCheck(buttons[r], {x: x, y: y})){
                        action = buttons[r].action(gam);
                        clickedBody = {type: "button", button: buttons[r], data: action};
                        break;
                }
            }
            for(let r = 0; r < bodies.length; r++){
                if (x >= (bodies[r].x - (bodies[r].radius + clickRad)) && x <= (bodies[r].x + (bodies[r].radius + clickRad))){
                    if (y >= (bodies[r].y - (bodies[r].radius + clickRad)) && y <= (bodies[r].y + clickRad)){
                        clickedBody = {type: "body", body: bodies[r]};
                        break;
                    }
                }
            }
            if(gam.viewing == gam.player.location && system.pin == -1){
                system.pin = new Pin(x, y);
                gam.contextMenu = new ContextMenu(x, y, "system");
                if(clickedBody != ""){
                    
                    if(clickedBody.type == "button"){
                        if(clickedBody.data.type == "neighborArrow"){
                            if(gam.viewing == gam.player.location){
                                gam.contextMenu.loadSystemMenuPreset(
                                    {text: "Fly to system", enabled: true, action: function(gam){gam.map[gam.player.location].removeEntity(gam.player.ship);
                                        gam.player.ship.target = -1;
                                        gam.player.location = clickedBody.data.toID;
                                        gam.map[gam.player.location].addEntity(gam.player.ship); 
                                        gam.player.ship.x = gam.starSystemRadius*2 - clickedBody.data.coords.x; 
                                        gam.player.ship.y = gam.starSystemRadius*2 - clickedBody.data.coords.y;
                                        gam.viewing = clickedBody.data.toID;}}, 
                                    {text: "View system", enabled: true, action: function(gam){gam.viewing = clickedBody.data.toID;}});
                                    
                            }
                            else{
                                gam.viewing = clickedBody.data.toID;
                            }
                        }
                    }
                    else{
                        gam.contextMenu.loadSystemMenuPreset();
                    }
                }
                else{
                    gam.contextMenu.loadSystemMenuPreset("", {text:"Build", action: function(){console.log("Build button clicked!");}, enabled:true});
                }
            }
            else{
                if((x >= gam.contextMenu.x && x <= (gam.contextMenu.x + gam.contextMenu.width) && (y >= gam.contextMenu.y && y <= (gam.contextMenu.y + gam.contextMenu.height)))){
                    gam.contextMenu.handleClick(x, y, gam);
                }
                else{
                    system.pin = -1;//new Pin(x, y);
                    gam.contextMenu = -1; //new ContextMenu(x, y, "system");
                }
            }
            if(action != "exit"){
                renderStarSystem(gam);
            }
        }
    }
}

function generateMapContents(map){
    //new Star(1, 600, 600, 20, "#d00")
    map = generateBasicStarNames(map);
    map = calcRegionTypes(map);
    map = generateTerritoriesBasic(map);
    let centerCoords = [gam.starSystemRadius, gam.starSystemRadius];
    let starColors = ["#e00", "#fff", "#0080ff", "#ff8800", "#ffc800"];
    let starRad = 40;
    let planetRads = [10, 25]; //min max
    let planetColors = ["#a51", "#005e19", "#004fc4", "#b07200", "#b02d13", "#877b78"];
    let moonColors = ["#966", "#ccc", "#595757"];
    let aphiRan = new AphidRandom("seed");
    for(let r = 0; r < map.length; r++){
        map[r].calcNeighborArrows(centerCoords[0], map);
        let xButtonFunc = function(gam){gam.map[gam.viewing].pin = -1; gam.contextMenu = -1; gam.viewState = "Galaxy"; gam.viewing = -1; setCanvasSize(gam.viewState); renderMap(gam); return "exit";};
        let xButtonDraw = function(graphics){graphics.drawStar(25,35,"#900",20); graphics.drawText(10,50,"X","bold 45px Consolas","#fff");};
        let xButton = new ClickButton(0, 25, 35, 20, xButtonFunc, xButtonDraw);
        map[r].systemButtons.push(xButton);
        let planetcount = 9;//Math.floor(Math.random()*10);
        let starcolpick = Math.floor(aphiRan.random()*starColors.length);
        let centerStar = new Star(1, centerCoords[0], centerCoords[1], starRad, starColors[starcolpick], r);
        map[r].bodies.push(centerStar);
        let prevDist = centerCoords[1] - 100;
        for(let t = 0; t < planetcount; t++){
            let rad = Math.floor(aphiRan.random()* (planetRads[1]-planetRads[0])) + planetRads[0];
            let colpick = Math.floor(aphiRan.random()*planetColors.length);
            let amt = (aphiRan.random()*10) + 5;
            let planet = new Planet(t+2, centerCoords[0], prevDist, rad, planetColors[colpick], centerStar, amt, r);
            prevDist = prevDist - ((aphiRan.random()*20) + 50);           
            map[r].bodies.push(planet);
            let ang = aphiRan.random()*360;
            planet.handleRotate(ang, centerStar);
            if(aphiRan.random() > .6){
                let moonCount = Math.floor(aphiRan.random()*3) +1;
                for(let z = 0; z < moonCount; z++){
                    let mooncol = Math.floor(aphiRan.random()*moonColors.length);
                    let moon = new Planet(t+2, planet.x, planet.y - 30, 5, moonColors[mooncol], planet, 3, r);
                    map[r].bodies.push(moon);
                    planet.satellites.push(moon);
                    moon.handleRotate(aphiRan.random()*360, planet);
                }
            }
        }
        let minDist = centerCoords[1] - 100;
        let station = new Station(69, centerCoords[0], aphiRan.rangeInt(minDist-150, minDist), r, {name: "Neutral", color:"#666"})       
        let ang = aphiRan.random()*360;
        station.handleRotate(ang, centerStar);
        if(map[r].regionType == 0){
            map[r].bodies.push(station);
            station.owner = gam.factions[0];
        }
        else if(map[r].regionType == 1){
            if(aphiRan.random() > .4){
                map[r].bodies.push(station);
                if(aphiRan.random() > .25){
                    station.owner = gam.factions[0];
                }
            }
        }
    }
    return map;
}

function gameTick(gam){
    for(let r = 0; r < gam.npcs.length; r++){
        gam.npcs[r].step();
    }
    for(let r = 0; r < gam.map.length; r++){
        let ents = gam.map[r].entities;
        for(let t = 0; t < ents.length; t++){
            ents[t].step(gam);
        }
        // for(let x = 2; x < gam.map[r].bodies.length; x++){
        //     gam.map[r].bodies[x].updateOrbit();
        // }
    }
    
    if(isTicking && gam.viewState == "StarSystem"){    
        renderStarSystem(gam);
    }
}

function initPlayer(){
    let player = new Player(1, "Player", "#a00");
    let aphiRan = new AphidRandom(randomSeed);
    player.location = 4;
    player.x = aphiRan.rangeInt(20, 1000);
    player.y = aphiRan.rangeInt(20, 1000);
    let ship = new Ship(1, player.x, player.y, player, player.color);
    ship.direction = degreesToRadians(aphiRan.rangeInt(0, 360));
    player.ship = ship;
    return player;
}

function generateNPCsBasic(){
    let colorOpts = ["#00e", "#090", "#cc0", "#d00", "#0bb", "#c0c", "#ccc"];
    let aphiRan = new AphidRandom(randomSeed+"s");
    let npcs = [];
    let npcID = 2;
    for(let r = 0; r < gam.map.length; r++){
        if(aphiRan.random() > .3){
            let count = aphiRan.rangeInt(1, 10);
            for(let t = 0; t < count; t++){
                let tempNPC = new NPC(npcID, "NPC"+npcID, colorOpts[aphiRan.rangeInt(0, colorOpts.length+1)]);
                tempNPC.location = r;
                tempNPC.x = aphiRan.rangeInt(20, 1000);
                tempNPC.y = aphiRan.rangeInt(20, 1000);
                let tempShip = new Ship(npcID, tempNPC.x, tempNPC.y, tempNPC, tempNPC.color);
                tempShip.direction = degreesToRadians(aphiRan.rangeInt(0, 360));
                tempNPC.ship = tempShip;
                npcs.push(tempNPC);
                npcID++;
            }
        }
    }
    return npcs;
}

function generateTerritoriesBasic(map){
    let pvpRegion = calcPvPRegion(map);
    let colorOpts = ["#00e", "#090", "#cc0", "#d00", "#0bb", "#c0c"];
    let aphiRan = new AphidRandom(randomSeed+"f");   
    for(let r = 0; r < colorOpts.length; r++){
        let pick = aphiRan.rangeInt(0, pvpRegion.length);
        pvpRegion[pick].territoryColor = colorOpts[r];
        let cons = pvpRegion[pick].connections;
        for(let t = 0; t < cons.length; t++){
            if(map[cons[t]].regionType == 2){
                map[cons[t]].territoryColor = colorOpts[r];
            }
            if(aphiRan.rangeDec(0, 1) > .8){
                let extendCons = map[cons[t]].connections;
                for(let x = 0; x < extendCons.length; x++){
                    map[extendCons[x]].territoryColor = colorOpts[r];
                }
            }
        }
    }
    return map;
}

function generateFactionNPCs(map, npcs, npcID){
    let pvpRegion = calcPvPRegion(map);
    let aphiRan = new AphidRandom(randomSeed+"fn");   
    for(let r = 0; r < pvpRegion.length; r++){
        if(pvpRegion[r].territoryColor != "neut"){
            let count = aphiRan.rangeInt(2, 10);
            for(let t = 0; t < count; t++){
                let tempNPC = new NPC(npcID, "NPC"+npcID, pvpRegion[r].territoryColor);
                tempNPC.location = pvpRegion[r].id;
                tempNPC.x = aphiRan.rangeInt(20, 1000);
                tempNPC.y = aphiRan.rangeInt(20, 1000);
                let tempShip = new Ship(npcID, tempNPC.x, tempNPC.y, tempNPC, tempNPC.color);
                tempShip.direction = degreesToRadians(aphiRan.rangeInt(0, 360));
                tempNPC.ship = tempShip;
                npcs.push(tempNPC);
                npcID++;
            }
        }
    }
    return npcs;
}

function calcPvPRegion(map){
    let pvpRegion = [];
    for(let r = 0; r < map.length; r++){
        if(map[r].regionType == 2){
            pvpRegion.push(map[r]);
        }
    }
    return pvpRegion;
}

function generateNPCs(){
    let colorOpts = ["#00e", "#090", "#cc0", "#d00", "#0bb", "#c0c", "#ccc"];
    let aphiRan = new AphidRandom(randomSeed+"s");
    let npcs = [];
    let npcID = 2;
    for(let r = 0; r < gam.map.length; r++){
        if(gam.map[r].regionType < 2){
            if(aphiRan.random() > .15){
                let count = aphiRan.rangeInt(1, 10);
                for(let t = 0; t < count; t++){
                    let factionChance = aphiRan.rangeDec(0, 1);
                    let tempNPC = new NPC(npcID, "NPC"+npcID, colorOpts[6]);
                    if(factionChance > .8){
                        tempNPC.color = colorOpts[aphiRan.rangeInt(0, colorOpts.length)];
                    }
                    tempNPC.location = r;
                    tempNPC.x = aphiRan.rangeInt(20, 1000);
                    tempNPC.y = aphiRan.rangeInt(20, 1000);
                    let tempShip = new Ship(npcID, tempNPC.x, tempNPC.y, tempNPC, tempNPC.color);
                    tempShip.direction = degreesToRadians(aphiRan.rangeInt(0, 360));
                    tempNPC.ship = tempShip;
                    npcs.push(tempNPC);
                    npcID++;
                }
            }
        }
        
    }
    generateFactionNPCs(gam.map, npcs, npcID);
    return npcs;
}

function addNPCToSystem(){
    for(let r = 0; r < gam.npcs.length; r++){
        gam.map[gam.npcs[r].location].entities.push(gam.npcs[r].ship);
        gam.npcs[r].pickTask();
    }
}

function calcRegionTypes(map){
    let center = getMapCenter(map);
    let ran = new AphidRandom(randomSeed);
    for(let r = 0; r < map.length; r++){
        let dist = findLengthPoints(map[r].x, center.x, map[r].y, center.y);
        if(dist < (.15*center.x)){ //75
            map[r].regionType = 0;
        }
        else if(dist >= (.15*center.x) && dist < (.5*center.x)){ //75 - 250
            map[r].regionType = 1;
        }
        else{
            // let pick = ran.rangeDec(0, 1);
            // if(pick < .075){
            //     map[r].regionType = 1;
            // }
            // else{
            //     map[r].regionType = 2;
            // }
            map[r].regionType = 2;
        }
    }
    return map;
}

function generateBasicStarNames(map){
    let ran = new AphidRandom(randomSeed);
    for(let r = 0; r < map.length; r++){
        let pick = ran.rangeInt(65, 91);
        map[r].setName(String.fromCharCode(pick) + "-"+r);
    }
    return map;
}

function getMapCenter(map){
    let avX = 0;
    let avY = 0;
    for(let r = 0; r < map.length; r++){
        avX += map[r].x;
        avY += map[r].y;
    }
    return {x: (avX/map.length), y: (avY/map.length)};
}

function getGalaxyViewDimensions(map){
    let center = getMapCenter(map);
    let padding = 1.03;
    return {width: (center.x*2)*padding, height: (center.y*2)*padding};
}

function setCanvasSize(state){
    if(state == "Galaxy"){
        mapCan.width = gam.canvasSizes.galaxy.width;
        mapCan.height = gam.canvasSizes.galaxy.height;
    }
    else{
        mapCan.width = gam.canvasSizes.starSystem.width;
        mapCan.height = gam.canvasSizes.starSystem.height;
    }
}