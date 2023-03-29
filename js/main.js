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
        ents.layer0.push(new inanimate("planet"+r, Math.floor(Math.random()*1500), Math.floor(Math.random()*1500), "#432", "drawPlanet"));
    }

    for(let r = 0; r < ents.layer0.length; r++){
        if(Math.random() > .7){
            ents.layer1.push(new inanimate("station"+r, ents.layer0[r].x - 10, ents.layer0[r].y + 10, teamCols[Math.floor(Math.random()*teamCols.length)], "drawStation"));
        }
    }

    for(let r = 0; r < 1000; r++){
        ents.layer2.push(new ship("Ship"+r, Math.floor(Math.random()*1500), Math.floor(Math.random()*1500), teamCols[Math.floor(Math.random()*teamCols.length)], "drawTriangle"))
        ents.layer2[r].setDirection(Math.floor(Math.random()*360));
        ents.layer2[r].speed = 1;
    }

    return ents;
}

function loadTestWorld(){
    let ents = {
        layer0: [], //Planets, background objects
        layer1: [], //Secondary background like space stations
        layer2: [], //Primary layer for ships
        layer3: []  //Layer for projectiles
    }

    ents.layer0.push(new inanimate("Hell", 250, 250, "#432", "drawPlanet"));

    ents.layer1.push(new inanimate("Hell Station", 200, 270, "#f00", "drawStation"));

    ents.layer2.push(new ship("PlayerShip", 400, 400, "#909", "drawTriangle"));
    ents.layer2.push(new ship("BotShip", 1000, 1000, "#a00", "drawTriangle"));
    ents.layer2.push(new ship("BotShip2", 400, 1000, "#00a", "drawTriangle"));

    ents.layer3.push(new projectile("RocketTest", 350, 350, "#909", "drawRocket", ents.layer2[0], ents.layer1[0]));
    ents.layer2[0].setDirection(200);
    ents.layer2[0].speed = 25;
    //ents.layer2[0].target = {x:1000, y: 1000};
    ents.layer2[0].target = ents.layer2[1];
    ents.layer2[1].setDirection(270);
    ents.layer2[1].speed = 25;
    ents.layer2[1].target = ents.layer2[2];
    ents.layer2[2].setDirection(270);
    ents.layer2[2].speed = 25;
    ents.layer2[2].turnVal = 0.25 * Math.PI / 180;
    //ents.layer3[0].speed = 1;

    //ents.layer2[0].selected = true;

    return ents;
}

function checkClicked(entities){
    for(const layer in entities){
        let lyr = entities[layer];
        for(let r = 0; r < lyr.length; r++){
            
        }
    } 
}