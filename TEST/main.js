function renderMap(gam){
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

function checkSystemClick(gam){
    let systems = gam.map;
    for(let r = 0; r < systems.length; r++){
        
    }
}