function loadSectors(){
    let sectors;
    
    return sectors;
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
    pShip.weapons.push(new RailGun(pShip, 100, .25, 3, 100, 100, 10));
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

function loadLoadTestScene(){
    let ships = [];
    let cols = ["#909", "#0aa"];
    let teams = [[], []];
    let fleetSize = 25;
    let ents = {
        layer0: new Set(), //Planets, background objects
        layer1: new Set(), //Secondary background like space stations
        layer2: new Set(), //Primary layer for ships
        layer3: new Set()  //Layer for projectiles
    }

    ents.layer0.add(new Inanimate("Hell", 250, 250, "#432", "drawPlanet", ents));

    ents.layer1.add(new Inanimate("Hell Station", 200, 270, "#f00", "drawStation", ents));

    for(let r = 0; r < fleetSize; r++){//T1
        let tmpShip = new Ship("T1Goon"+r, (50 * r) + 50, 100, cols[0], "drawTriangle", ents);
        tmpShip.setDirection(0);
        tmpShip.speed = 10;
        tmpShip.turnVal = 0.25 * Math.PI / 180;
        let wep = Math.random();
        if(wep > 0 && wep < .33){
            tmpShip.weapons.push(new LaserCannon(tmpShip, 100, 3, 3, 100, 100, 5));
        }
        if(wep > .33 && wep < .66){
            tmpShip.weapons.push(new MissleLauncher(tmpShip, 100, 2, 3, 100, 100, 5));
        }
        if(wep > .66){
            tmpShip.weapons.push(new RailGun(tmpShip, 100, .25, 3, 100, 100, 10));
        }
        ships.push(tmpShip);
        teams[0].push(tmpShip);
    }
    for(let r = 0; r < fleetSize; r++){//T2
        let tmpShip = new Ship("T2Goon"+r, (50 * r) + 50, 400, cols[1], "drawTriangle", ents);
        tmpShip.setDirection(180);
        tmpShip.speed = 10;
        tmpShip.turnVal = -0.25 * Math.PI / 180;
        let wep = Math.random();
        if(wep > 0 && wep < .33){
            tmpShip.weapons.push(new LaserCannon(tmpShip, 100, 3, 3, 100, 100, 5));
        }
        if(wep > .33 && wep < .66){
            tmpShip.weapons.push(new MissleLauncher(tmpShip, 100, 2, 3, 100, 100, 5));
        }
        if(wep > .66){
            tmpShip.weapons.push(new RailGun(tmpShip, 100, .25, 3, 100, 100, 10));
        }
        ships.push(tmpShip);
        teams[1].push(tmpShip);
    }

    for(let r = 0; r < teams[1].length; r++){
        let pick = Math.floor(Math.random()* teams[1].length);
        teams[0][r].target = teams[1][pick];
    }
    for(let r = 0; r < teams[0].length; r++){
        let pick = Math.floor(Math.random()* teams[0].length);
        teams[1][r].target = teams[0][pick];
    }

    for(let r = 0; r < ships.length; r++){
        ents.layer2.add(ships[r]);
    }

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