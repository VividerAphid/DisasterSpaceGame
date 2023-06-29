class art{
    constructor(ctx){
        this.G = ctx;
        this.scale = 1;
    }

    renderEntities(sectors){
        //console.log(entities);
        this.G.fillStyle = "#222";
        this.G.strokeStyle = "#222";
        this.G.fillRect(0, 0, mapCan.width, mapCan.height);

        for(let r = 0; r < sectors.length; r++){
            //this.drawSector(sectors[r]);
            let entities = sectors[r].entities;
            for(const layer in entities){
                let lyr = entities[layer];
                //console.log(lyr);
                if((this.scale >= 3 && layer == "layer3") || layer != "layer3"){
                    let iter = lyr.values();
                    for(let r = 0; r < lyr.size; r++){
                        let ent = iter.next().value;
                        this[ent.draw](ent);
                    }
                }
            }
        }
    }

    drawTriangle(triangle){
        let g = this.G;
        let baseWidth = 5;
        let height = 7;
        let scaledX = triangle.x * this.scale;
        let scaledY = triangle.y * this.scale;
        g.save();
        // if(triangle.selected){
        //     g.fillStyle = "#fff";
        //     g.lineWidth = this.scale * 3;
        // }
        // else{
            g.fillStyle = triangle.color;
        //}
        g.strokeStyle = triangle.color;
        g.translate(scaledX, scaledY);
        g.rotate(-triangle.direction);
        g.translate(-scaledX, -scaledY);
        g.beginPath();

        g.moveTo(scaledX-(baseWidth*this.scale), scaledY-(height*this.scale));
        g.lineTo(scaledX+(baseWidth*this.scale), scaledY-(height*this.scale));
        g.lineTo(scaledX, scaledY+(height*this.scale));

        g.closePath();
        g.fill();
        g.restore();
    }

    drawPlanet(plan){
        let g = this.G;
        let radius = 50;
        let scaledX = plan.x * this.scale;
        let scaledY = plan.y * this.scale;

        g.fillStyle = plan.color;
        if(plan.selected){
            g.strokeStyle = "#fff";
            g.lineWidth = this.scale * 3;
        }
        else{
            g.strokeStyle = plan.color;
        }
        g.beginPath();
        g.arc(scaledX, scaledY, (radius*2) * this.scale, 0, 2*Math.PI);   
        g.fill();
        g.stroke();

    }

    drawRocket(rocket){
        let g = this.G;

        let scaledX = rocket.x * this.scale;
        let scaledY = rocket.y * this.scale;
        let scaledRadX = 1 * this.scale;
        let scaledRadY = 2 * this.scale;
        let tailSpan = 1;
        let tailLength = 2;
        
        g.save();
        if(rocket.selected){
            g.strokeStyle = "#fff";
            g.lineWidth = this.scale * 3;
        }
        else{
            g.strokeStyle = rocket.color;
        }
        g.fillStyle = rocket.color;
        g.beginPath();
        g.ellipse(scaledX, scaledY, scaledRadX, scaledRadY, rocket.direction, 0, 2 * Math.PI);
        g.translate(scaledX, scaledY);
        g.rotate(-rocket.direction);
        g.translate(-scaledX, -scaledY);
        g.moveTo(scaledX, scaledY+(scaledRadY*.8));
        g.lineTo(scaledX-(tailSpan*this.scale), scaledY+scaledRadY+(tailLength * this.scale));
        g.lineTo(scaledX+(tailSpan*this.scale), scaledY+scaledRadY+(tailLength * this.scale));
        g.closePath();
        g.fill();
        g.restore();
    }

    drawStation(station){
        let g = this.G;

        let scaledX = station.x * this.scale;
        let scaledY = station.y * this.scale;
        let scaledRadX = 15 * this.scale;
        let scaledRadY = 9 * this.scale;

        if(station.selected){
            g.strokeStyle = "#fff";
            g.lineWidth = this.scale * 3;
        }
        else{
            g.strokeStyle = station.color;
        }
        g.fillStyle = "#777";
        g.lineWidth = 1 * this.scale;
        g.beginPath();
        g.ellipse(scaledX, scaledY, scaledRadX, scaledRadY, Math.PI/4, 0, 2 * Math.PI);
        g.fill();
        g.stroke();
    }

    drawLaser(laser){
        let g = this.G;
        g.fillStyle = laser.color;
        g.strokeStyle = laser.color;
        g.lineWidth = 1 * this.scale;

        g.beginPath();
        //console.log("drawing from " + laser.x + "," + laser.y);
        g.moveTo(laser.owner.x * this.scale, laser.owner.y* this.scale);
        //console.log("to " + laser.target.x + "," + laser.target.y);
        g.lineTo(laser.target.x* this.scale, laser.target.y* this.scale);
        g.stroke();
    }

    drawSlug(slug){
        let g = this.G;

        let scaledX = slug.x * this.scale;
        let scaledY = slug.y * this.scale;
        let scaledRadX = 3 * this.scale;
        let scaledRadY = .75 * this.scale;

        // if(slug.selected){
        //     g.strokeStyle = "#fff";
        //     g.lineWidth = this.scale * 3;
        // }
        // else{
        //     g.strokeStyle = slug.color;
        // }
        g.fillStyle = slug.color;
        g.strokeStyle = slug.color;
        g.beginPath();
        g.ellipse(scaledX, scaledY, scaledRadX, scaledRadY, Math.PI/4, 0, 2 * Math.PI);
        g.fill();
        g.stroke();
    }

    drawShield(shield){

    }

    drawSector(sector){
        //console.log(sector);
        let g = this.G;
        
        g.strokeStyle = sector.borderColor;
        g.beginPath();
        g.rect(sector.x, sector.y, 750, 750);
        g.stroke();
    }
}