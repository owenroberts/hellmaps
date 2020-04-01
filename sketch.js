let cols = 20; // columns
let rows = 20; // rows
let min = 5; // min room dimension
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

	map = new Map(cols, rows);
	map.build({w: 1, h: 1});
	map.nodes[0].display();
	// map.walls.forEach(wall => wall.display());
}

function mousePressed() {
	console.clear();
	createMap();
}