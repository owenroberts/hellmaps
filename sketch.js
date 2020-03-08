let cols = 50; // columns
let rows = 50; // rows
let min = 12; // min room dimension
let cell = {}; // room dimension multiplier

let walls = [];

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
	const nodes = [new Node(0, 0, cols, rows)]; // root node
	walls = [];

	let didSplit = true;
	while (didSplit) {
		didSplit = false;
		nodes.forEach(node => {
			if (!node.a && !node.b) {
				if (node.w > min && node.h > min) {
					if (node.split()) {
						nodes.push(node.a);
						nodes.push(node.b);
						didSplit = true;
					}
				}
			}
		});
	}

	nodes[0].createRooms();
	// console.time();
	// nodes[0].createWalls();
	// console.timeEnd();
	nodes[0].display();

	setup walls
	console.time();
	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++) {
			let inRoom = false;
			for (let i = 0; i < nodes.length; i++) {
				if (nodes[i].room) {
					if (nodes[i].room.isInside(x, y)) inRoom = true;
				}
				if (nodes[i].paths.length) {
					for (let j = 0; j < nodes[i].paths.length; j++) {
						if (nodes[i].paths[j].isInside(x, y)) inRoom = true;
					}
				}
			}
			if (!inRoom) walls.push(new Wall(x, y)); 
		}
	}
	console.timeEnd();

	for (let i = 0; i < walls.length; i++) {
		walls[i].display();
	}
}

function mousePressed() {
	console.clear();
	createMap();
}