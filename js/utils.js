var adjectives = ["Acidic", "Allergenic", "Alphabetical", "Amazing", "Anaerobic", "Angry", "Annoyed", "Anonymous", "Baked", "Bald", "Barbaric", "Barking", "Beached", "Bent", "Besettled", "Big-Balled", "Bitchy", "Bleached", "Blind", "Bloated", "Blue", "Bossy", "Brave", "Broken", "Burnt", "Carnivorous", "Caustic", "Cheeky", "Coarse", "Comatose", "Crazy", "Cremated", "Crispy", "Crooked", "Crunched", "Crushed", "Crusty", "Curly", "Cute", "Cylindrical", "Dancing", "Dead", "Deadly", "Decaying", "Deformed", "Destructive", "Disappointed", "Distressed", "Divine", "Dorky", "Drowned", "Drowsy", "Dull", "Eager", "Evaporated", "Evil", "Excited", "Explosive", "Exuberant", "Feeble", "Fizzy", "Flammable", "Flappy", "Floating", "Flooded", "Floury", "Flowery", "Fluffy", "Fluorescent", "Flying", "Folded", "Forked", "Fossilised", "Foul", "Fried", "Fuzzy", "Gassy", "Ghastly", "Giant", "Glowing", "Greasy", "Green", "Greivous", "Hairy", "Hampered", "Happy", "Hellish", "Hideous", "Horrendous", "Hot", "Humid", "Humming", "Hungry", "Ignorant", "Impregnated", "Incendiary", "Indecisive", "Infected", "Intoxicated", "Invisible", "Iridescent", "Jittery", "Jovial", "Juicy", "Kind", "Kinky", "Killable", "Ladelled", "Lame", "Lamenting", "Lavish", "Littering", "Loitering", "Loud", "Lounging", "Lovely", "Lumpy", "Luscious", "Magenta", "Messy", "Moist", "Moldy", "Moly", "Monstrous", "Morbid", "Murderous", "Musical", "Nescient", "Neutral", "Nuclear", "Numerous", "Obese", "Oily", "Orange", "Outlandish", "Petrified", "Pink", "Plump", "Porky", "Positive", "Prograde", "Progressive", "Purple", "Quaint", "Quiet", "Queefing", "Raging", "Recalcitrant", "Red", "Regressive", "Retarded", "Retrograde", "Ripe", "Roasted", "Salty", "Satanic", "Scorched", "Scrambled", "Seared", "Searing", "Sexy", "Silent", "Sinister", "Sleepy", "Slimy", "Slippery", "Sly", "Smug", "Soggy", "Sour", "Spacious", "Special", "Spicy", "Spiky", "Spooned", "Steamy", "Stinky", "Stupendous", "Stupid", "Sweet", "Swift", "Tenacious", "Thicc", "Thick", "Tight", "Toxic", "Tubular", "Undulating", "Unprecedented", "Unpredictable", "Venomous", "Vicious", "Violent", "Violet", "Viscious", "Vomiting", "Vulgar", "Warped", "Whimsical", "Whistling", "Windy", "Wobbly", "Yapping", "Yawning", "Yelling", "Yellow", "Yodelling", "Zapping", "Zipping", "Zooming", ""];
var nouns = ["Alien", "Ant", "Apple", "Ardvaark", "Axle", "Bag", "Bagel", "Balloon", "Bee", "Beetle", "Bell", "Belly", "Beluga", "Bird", "Bladder", "Blueberry", "Bologna", "Bolt", "Bottle", "Boulder", "Bowl", "Box", "Brick", "Broom", "Bucket", "Bullet", "Button", "Cactus", "Car", "Carnivore", "Chair", "Cherry", "Chickpea", "Cloud", "Couch", "Crustacean", "Cucumber", "Cup", "Cupcake", "Demon", "Desert", "Desk", "Dinosaur", "Dodecagon", "Donkey", "Door", "Earlobe", "Egg", "Eyeball", "Eyelash", "Eyelid", "Eyesocket", "Feather", "Fiend", "Fish", "Flower", "Foot", "Fork", "Goldfish", "Gums", "Guppy", "Guts", "Hammer", "Hatchet", "Head", "Hellian", "Hen", "Hotdog", "Hypochondriac", "Insect", "Key", "Kidney", "Knife", "Lamb", "LightBulb", "Liver", "Lung", "Megladon", "Mountain", "Mower", "Mug", "Nipple", "Noose", "Nose", "Nugget", "Orange", "Oval", "Paper", "Parchment", "Pear", "Pencil", "Pillow", "Plant", "Platypus", "Polyhedron", "Potato", "Rectangle", "Retina", "Rock", "Rug", "Screw", "Shark", "Shirt", "Shoe", "Shovel", "Skeleton", "Sock", "Socket", "Soda", "Spaceship", "Spade", "Spoon", "Square", "Stone", "Table", "Telephone", "Tick", "Tile", "Toe", "Toenail", "Toilet", "Tomato", "Tongue", "Tooth", "Triangle", "Truck", "UFO", "Umbrella", "Underwear", "Walrus", "Water", "Window", "Whale", "Whisker", "Wrench", "Zebra", "Zipper"];
var premades = ["Godzilla", "Chickenlips", "Hound", "Canal", "Bladder", "Fogbag", "ArsenicSulfide", "VeggieMonster", "BleachSoda", "OohAh", "BrickBurrito", "Yardbird", "Treebranch", "Cowbag", "BloodyEye", "Diablo", "UncircumcisedBook", "GasBag", "FartHammer", "SpellcastingSaltlick", "Whisker", "NosePicker", "PoopSlogga", "PeaKnuckle", "WindyBologna", "BlisteredSealion", "RupturedWenis", "RoastedGuineaPig", "GenbelNublis", "Sh**Drawers", "DrownedFish", "HumiliatedBellpepper", "DeerMouse", "Fleabag", "BoulderHolder", "MeatCarcass", "UrBootieHole", "PwnBag", "BagBag", "BagSack", "Winnifred", "HarvestMoon", "Bonebag", "CreeperPerro", "Prober", "Furbag", "Foghorn", "McProbe", "ThatOneBot", "ScaryTerry", "Maste", "ProbablyBad", "TurtleBob", "CrayCray", "Daishar", "thedudette", "MrsWayTooClose", "BumbleBee", "Zimmittens", "WeLive", "ButterTits", "TylerNubcs", "BunBun", "WagWag", "cOrncOb", "Noobro"];

function removeAtIndex(arr, index){
	var clipped = [];
	let reps = arr.length;
	for (var r = 0; r < reps; r++){
		if(r != index){
			clipped.push(arr[r]);
		}
	}
	return clipped;
}
function removeItem(arr, item){
	var clipped = arr;
	let reps = clipped.length;
	for (var r=0; r< reps; r++){
		if(clipped[r] == item){
			clipped = removeAtIndex(clipped, r);
			r=0;
		}
	}
	return clipped;
}
function removeDupes(arr){
	var filtered = arr.filter(function(item, pos) {
			return arr.indexOf(item) == pos;
		})
	return filtered;
}

function findLengthPoints(x1, x2, y1, y2){
	var x = x1 - x2;
	var y = y1 - y2;
	return Math.sqrt(x*x + y*y);
}

function findAnglePoints(p0,p1,p2){
	var x1 = p1.x - p0.x;
	var y1 = p1.y - p0.y;
	var x2 = p2.x - p0.x;
	var y2 = p2.y - p0.y;
	return Math.acos((x1*x2+y1*y2)/(findLengthPoints(p0.x, p1.x, p0.y, p1.y)*findLengthPoints(p0.x, p2.x, p0.y, p2.y)));
}
function sleep(leng){
	return new Promise(resolve => setTimeout(resolve, leng));
}

function copyArray(arr) {
	let cpy = Array(arr.length);
	for (var i = 0; i < arr.length; i++) {
	  let value = arr[i] ;
	  if (typeof value == "object") {
		if (Array.isArray(value))
		  value = copyArray(value);
		else
		  value = copyObject(value);
	  }
	  cpy[i] = value;
	}
	return cpy;
}
  function copyObject(obj) {
	let cpy = { };
	for (var key of obj) {
	  let value = obj[key];
	  if (typeof value == "object") {
		if (Array.isArray(value))
		  value = copyArray(value);
		else
		  value = copyObject(value);
	  }
	  cpy[i] = value;
	}
	return cpy;
}

function createUuid() {
    const url = URL.createObjectURL(new Blob()).toString();
    const index = url.lastIndexOf('/') ;
    const id = url.substring(index + 1);
    URL.revokeObjectURL(url);
    return id
}

function generateUUID() {
	const chars = [ '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
	let output = Array(5) ;
	let genSub = function(n, is_spec) {
	  let arr = Array(n) ;
	  for (let i = 0; i < n; i++)
		arr[i] = chars[Math.floor(Math.random() * chars.length)] ;
	  if (is_spec)
		arr[0] = '4' ;
	  return arr.join("");
	};
	return [genSub(8), genSub(4), genSub(4, true), genSub(4), genSub(12)].join('-') ;
  }