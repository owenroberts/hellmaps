let cols = 30; // columns
let rows = 30; // rows
let cell = {}; // room dimension multiplier

let map;

function setup() {
	const sz = windowWidth < windowHeight ? windowWidth : windowHeight;
	createCanvas(sz, sz);
	noStroke();

	cell.w = width / cols;
	cell.h = height / rows;
	createMap();
}

function createMap() {
	background(220);

	map = new Map(cols, rows, 8, 14);
	while (map.nodes.length < 3) {
		map.build({w: 1, h: 1}, 15);
	}
	console.log(map.nodes);
	
	map.nodes[0].display();
	// map.walls.forEach(wall => wall.display());
}

function mousePressed() {
	console.clear();
	createMap();
}