class SceneHandler{
    constructor(){
        this._objects = [];
        this._lights = [];
        this._projectiles = [];
    }
    getObjects(){
        return this._objects;
    }
    getLights(){
        return this._lights;
    }
    getProjectiles(){
        return this._projectiles;
    }

    loadStarSystemScene(THREE){
        this.loadStarSystem(THREE);
        this.loadShips(THREE, 20, 500, 10);
    }

    //TODO Add some input to regenerate same system
    loadStarSystem(THREE){
        let starCount = 1;
        let starChance = Math.random();
        let starDims = {radius: 20, wSegs: 32, hSegs: 16}
        let starColors = [0xffaa00, 0xff2b2b, 0x7aadff, 0xffffff, 0xff7b00];
        if(starChance > .75 && starChance < .95){starCount++;}
        if(starChance >= .95){starCount += 2;}
        for(let r = 0; r < starCount; r++){
            let geom = new THREE.SphereGeometry(starDims.radius, starDims.wSegs, starDims.hSegs);
            let colorPick = starColors[Math.floor(Math.random()*starColors.length)];
            let mat = new THREE.MeshStandardMaterial({color: colorPick});
            let sphe = new THREE.Mesh(geom, mat);
            if(r==1){sphe.position.x += (starDims.radius*4);}
            if(r==2){sphe.position.x += (starDims.radius*2);
                     sphe.position.z += (starDims.radius*4);}
            let starLight = new THREE.PointLight(0xffffff, 0.75);
            mat.emissive.set(colorPick);
            starLight.position.x = sphe.position.x;
            starLight.position.z = sphe.position.z;
            this._objects.push(sphe);
            this._lights.push(starLight);
        }
    }

    loadShips(THREE, count, horizontalRange, verticalRange){
        const ships = [];
        const shipGeom = new THREE.CapsuleGeometry(1, 2, 1, 6);
        const greenMat = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        const redMat = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
        greenMat.flatShading = true;
        redMat.flatShading = true;
    
        for(let r = 0; r < count; r++){
            let shippy;
            if(r % 2 == 0){
                shippy = new THREE.Mesh(shipGeom, greenMat);
                shippy.position.x = Math.floor(Math.random()*(horizontalRange*.25)) - horizontalRange/2;
                shippy.position.y = Math.floor(Math.random()*verticalRange) - verticalRange/2;
                shippy.position.z = Math.floor(Math.random()*(horizontalRange*.25)) - horizontalRange/2;
            }
            else{
                shippy = new THREE.Mesh(shipGeom, redMat);
                shippy.position.x = Math.floor(Math.random()*(horizontalRange*.25)) + horizontalRange/4;
                shippy.position.y = Math.floor(Math.random()*verticalRange) - verticalRange/2;
                shippy.position.z = Math.floor(Math.random()*(horizontalRange*.25)) + horizontalRange/4;
            }
            shippy.rotation.x = 1.57;
            ships.push(shippy);
            this._objects.push(shippy);
        }
    
        return ships;
    }
}