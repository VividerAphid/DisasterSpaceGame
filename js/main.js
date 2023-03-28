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

    ents.layer3.push(new projectile("RocketTest", 350, 350, "#909", "drawRocket", ents.layer2[0], ents.layer1[0]));
    ents.layer3[0].setDirection(300);
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

function updateFrame(artist, entities){
    updateEntities(entities);
    artist.renderEntities({}, entities);
    requestAnimationFrame(function(){updateFrame(artist, entities);});
}

function updateEntities(entities){
    for(const layer in entities){
        let lyr = entities[layer];
        lyr.forEach(element => {
            if(element.speed > 0){
                element.x += element.speed * Math.sin(element.direction);
                element.y += element.speed * Math.cos(element.direction);
                element.direction += 0.01;
            }
        });
    }
}

// // The actual code:
// let dx = target.x - my_pos.x ;
// let dy = target.y - my_pos.y ; // Make sure it's TARGET MINUS SELF, NOT THE OTHER WAY AROUND (or it'll go backwards)
// const len = Math.sqrt(dx * dx + dy * dy) ; // basically the distance to the target position.
// const new_len = Math.min(my_speed * seconds_since_last_tick, len) ;
// const factor = new_len / len ;
// dx *= factor ;
// dy *= factor ;
// my_pos.x += dx ;
// my_pos.y += dy ;