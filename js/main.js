function loadSectors(){
    let sectors;
    
    return sectors;
}

function generateRngTestWorld(){
    let ents = {
        layer0: [], //Planets, background objects
        layer1: [], //Secondary background like space stations
        layer2: [], //Primary layer for ships
        layer3: []  //Layer for projectiles
    }

    let teamCols = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"];

    for(let r = 0; r < 10; r++){
        ents.layer0.push(new Inanimate("planet"+r, Math.floor(Math.random()*1500), Math.floor(Math.random()*1500), "#432", "drawPlanet"));
    }

    for(let r = 0; r < ents.layer0.length; r++){
        if(Math.random() > .7){
            ents.layer1.push(new Inanimate("station"+r, ents.layer0[r].x - 10, ents.layer0[r].y + 10, teamCols[Math.floor(Math.random()*teamCols.length)], "drawStation"));
        }
    }

    for(let r = 0; r < 1000; r++){
        ents.layer2.push(new Ship("Ship"+r, Math.floor(Math.random()*1500), Math.floor(Math.random()*1500), teamCols[Math.floor(Math.random()*teamCols.length)], "drawTriangle"))
        ents.layer2[r].setDirection(Math.floor(Math.random()*360));
        ents.layer2[r].speed = 1;
    }

    return ents;
}

function loadTestWorld(){
    let ents = {
        layer0: new Set(), //Planets, background objects
        layer1: new Set(), //Secondary background like space stations
        layer2: new Set(), //Primary layer for ships
        layer3: new Set()  //Layer for projectiles
    }

    ents.layer0.add(new Inanimate("Hell", 250, 250, "#432", "drawPlanet", ents));

    ents.layer1.add(new Inanimate("Hell Station", 200, 270, "#f00", "drawStation", ents));

    let pShip = new Ship("PlayerShip", 400, 400, "#909", "drawTriangle", ents);
    let bShip = new Ship("BotShip2", 200, 200, "#0aa", "drawTriangle", ents);
    let bShip2 = new Ship("BotShip3", 300, 300, "#0aa", "drawTriangle", ents);
    pShip.weapons.push(new LaserCannon(pShip, 100, 3, 3, 100, 100, 5));
    bShip.weapons.push(new MissleLauncher(bShip, 100, 1, 3, 100, 100, 5));
    bShip2.weapons.push(new LaserCannon(bShip2, 100, 3, 3, 100, 100, 5));
    bShip.setDirection(270);
    bShip.speed = 35;
    bShip.turnVal = 0.25 * Math.PI / 180;
    bShip2.setDirection(270);
    bShip2.speed = 35;
    bShip2.turnVal = -0.25 * Math.PI / 180;
    ents.layer2.add(pShip);
    ents.layer2.add(bShip);
    ents.layer2.add(bShip2);
    //ents.layer3[0].speed = 1;

    //ents.layer2[0].selected = true;

    return ents;
}

function checkClicked(gam){
    //console.log("checkClicked fired");
    let canvRect = mapCan.getBoundingClientRect();
	let mx = (event.clientX - canvRect.left);
	let my = (event.clientY - canvRect.top);

    let sectors = gam.sectors;
    let result = {target: "blank", isPlayer: false, coords: {x: mx, y:my}};
    for(sec in sectors){
        if(mx >= sectors[sec].x && sectors[sec].x + sectors[sec].width >= mx){
            if(my >= sectors[sec].y && sectors[sec].y + sectors[sec].height >= my){
                let ents = sectors[sec].entities;
                for(layer in ents){
                    let lyr = ents[layer];
                    for(en in lyr){
                        if(mx >= lyr[en].x - 10 && lyr[en].x + 10 >= mx){
                            if(mx >= lyr[en].y - 10 && lyr[en].y + 10 >= mx){
                                result.target = lyr[en];
                            }
                        }
                    }
                }
            }
        }
    }
    if(result.target == gam.player.ship){
        gam.player.ship.selected = !gam.player.ship.selected;
        result.isPlayer = !result.isPlayer;
    }
    else{
        result.isPlayer = false
    }
    return result;
}
function processClick(gam, result){
    //console.log(result);
    if(!result.isPlayer){
        if(gam.player.ship.selected){
            console.log("ship selected!");
            if(result.target != "blank"){
                console.log("moving to object!");
                gam.player.ship.moveTarget = result.target;
                gam.player.ship.speed = 35;
            }
            else{
                console.log("moving to coord!");
                gam.player.ship.moveTarget = {id: "space", x: result.coords.x, y: result.coords.y};
                gam.player.ship.speed = 35;
            }
        }
    }
}