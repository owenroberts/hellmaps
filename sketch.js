let mapSize = 30;
let cellSize = {}; // room dimension multiplier

let map;

function setup() {
	const sz = windowWidth < windowHeight ? windowWidth : windowHeight;
	createCanvas(sz, sz);
	noStroke();

	cellSize.w = width / mapSize;
	cellSize.h = height / mapSize;
	createMap();
}

function createMap() {
	background(220);

	map = new BSPMap(mapSize, mapSize, mapSize / 4, mapSize / 2 - 1);
	while (map.nodes.length < 3) {
		map.build({w: 1, h: 1}, mapSize / 2);
	}
	console.log(map.nodes);
	
	map.nodes[0].display();
	// map.walls.forEach(wall => wall.display());
}

function mousePressed() {
	console.clear();
	createMap();
}