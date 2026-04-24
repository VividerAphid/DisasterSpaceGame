class artist{
    constructor(ctx){
        this.ctx = ctx;
        this.scale = 1;
        this.labelFont = "bold 15px Consolas";
    }
    dashedLine(x1, y1, x2, y2, color){
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.setLineDash([10, 10]);
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }
    fillRect(x, y, w, h, fill, stroke){
        this.ctx.fillStyle = fill;
        this.ctx.strokeStyle = stroke;
        this.ctx.fillRect(x, y, w, h);
    }
    drawStar(x, y, color, radius){
        //let radius = 10;
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.arc(x, y, radius, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }
    drawRing(x, y, color, radius, lineWidth){
        //let radius = 10;
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.arc(x, y, radius, 0, 2*Math.PI);
        this.ctx.stroke();
    }
    drawDiamond(x, y, color, xRad, yRad){
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x-xRad, y);
        this.ctx.lineTo(x, y-yRad);
        this.ctx.lineTo(x+xRad, y);
        this.ctx.lineTo(x, y+yRad);
        this.ctx.closePath();
        this.ctx.fill();
    }
    drawText(x, y, text, font, colour){
        this.ctx.fillStyle = colour;
        this.ctx.strokeStyle = colour;
        this.ctx.font = font;
        this.ctx.beginPath();
        this.ctx.fillText(text, x, y);
    }
    drawTriangle(triangle, isHighlighted, bW, h){
        let g = this.ctx;
        let baseWidth = bW || 10;
        let height = h || 14;
        let scaledX = triangle.x * this.scale;
        let scaledY = triangle.y * this.scale;
        g.save();
        g.lineWidth = 1;
        g.strokeStyle = triangle.color;
        g.fillStyle = triangle.color;
        g.translate(scaledX, scaledY);
        g.rotate(-triangle.direction);
        g.translate(-scaledX, -scaledY);
        g.beginPath();

        g.moveTo(scaledX-(baseWidth*this.scale), scaledY-(height*this.scale));
        g.lineTo(scaledX+(baseWidth*this.scale), scaledY-(height*this.scale));
        g.lineTo(scaledX, scaledY+(height*this.scale));

        g.closePath();
        g.fill();

        if(isHighlighted){
            //console.log("drawing player");
            g.strokeStyle = "#fff";
            g.lineWidth = 2;
            g.translate(scaledX, scaledY);
            //g.rotate(-triangle.direction);
            g.translate(-scaledX, -scaledY);
            g.beginPath();

            g.moveTo(scaledX-(baseWidth*this.scale), scaledY-(height*this.scale));
            g.lineTo(scaledX+(baseWidth*this.scale), scaledY-(height*this.scale));
            g.lineTo(scaledX, scaledY+(height*this.scale));

            g.closePath();
            g.stroke();
        }
        g.restore();
    }
    drawStation(x, y, ownerColor){
        let radius = 25;
        let outerRingThickness = 5;
        let innerPieceRadius = 12;
        this.drawRing(x, y, "#666", radius, outerRingThickness);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "#555";
        this.ctx.beginPath();
        this.ctx.moveTo(x, y-(radius + outerRingThickness));
        this.ctx.lineTo(x, y+(radius + outerRingThickness));
        this.ctx.moveTo(x-(radius + outerRingThickness), y);
        this.ctx.lineTo(x+(radius + outerRingThickness), y);
        this.ctx.stroke();
        this.drawStar(x, y, "#666", innerPieceRadius);
        this.drawStar(x, y, ownerColor, innerPieceRadius*.5);

    }
    drawOutpost(x, y, ownerColor){
        let bodyWidth = 20;
        let bodyHeight = 10;
        this.ctx.strokeStyle = "#555";
        this.ctx.fillStyle = "#666";
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y-(bodyHeight+10));
        this.ctx.lineTo(x, y+(bodyHeight+20));
        this.ctx.moveTo(x-(bodyWidth+5), y);
        this.ctx.lineTo(x+(bodyWidth+5), y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, bodyWidth, bodyHeight, 0, 0, 2 * Math.PI);
        this.ctx.fill();
        this.drawStar(x, y, ownerColor, 8);
    }
    drawPlatform(x, y, ownerColor){
        let width = 20;
        let height = 15;
        this.ctx.fillStyle = "#666";
        this.ctx.strokeStyle = "#555";
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y-(height+5));
        this.ctx.lineTo(x, y+(height+5));
        this.ctx.moveTo(x-(height+5), y);
        this.ctx.lineTo(x+(height+5), y);
        this.ctx.stroke();
        this.drawDiamond(x, y, "#666", width, height);
        this.drawStar(x, y, ownerColor, 7);
    }
    drawPlanetHighlight(x, y, rad, col){
        this.ctx.lineWidth = 1;
	    this.ctx.beginPath();
	    this.ctx.fillStyle = col;
	    this.ctx.fillRect(x-rad, y-rad, rad*2, rad*2);
	    this.ctx.beginPath();
	    this.ctx.fillStyle = col;
	    this.ctx.moveTo(x, y-rad*1.4);
	    this.ctx.lineTo(x-rad*1.4, y);
	    this.ctx.lineTo(x, y+rad*1.4);
	    this.ctx.lineTo(x+rad*1.4, y);
	    this.ctx.fill();
    }
    drawTargetPointer(x, y, rad){
        this.ctx.fillStyle = "#f00";
        this.ctx.strokeStyle = "#f00";
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y-(rad+15));
        this.ctx.lineTo(x, y+(rad+15));
        this.ctx.moveTo(x-(rad+15), y);
        this.ctx.lineTo(x+(rad+15), y);
        this.ctx.stroke();

        this.ctx.fillStyle = "#999";
        this.ctx.strokeStyle = "#999";
        this.ctx.lineWidth = 3;
    }
    drawPointer(x, y, color){
        let scale = 1;
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x,y); //50,60
        this.ctx.lineTo(x-12.5, y-25); //37.5, 35
        this.ctx.bezierCurveTo(x-(scale*25), y-(scale*55), x+(scale*25), y-(scale*55), x+(scale*12.5), y-(scale*25)); //25, 5, 75, 5, 62.5, 35
        this.ctx.lineTo(x,y); //50,60
        this.ctx.fill();
    }
}