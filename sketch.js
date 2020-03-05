let c = 20; // columns
let r = 20; // rows
let m = 10; // min room dimension
let d = {}; // room dimension multiplier

let walls = [];


function setup() {
	const sz = windowWidth < windowHeight ? windowWidth : windowHeight;
	createCanvas(sz, sz);
	noStroke();

	d.x = width/c;
	d.y = height/r;
	createMap();
}

function createMap() {
	const nodes = [new Node(0, 0, 50, 50)]; // root node

	let didSplit = true;
	while (didSplit) {
		didSplit = false;
		nodes.forEach(node => {
			if (!node.a && !node.b) {
				if (node.w > m && node.h > m) {
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
	// console.log(nodes);
	nodes[0].display();

	// setup walls
	for (let x = 0; x < c; x++) {
		for (let y = 0; y < r; y++) {
			let inRoom = false;
			for (let i = 0; i < nodes.length; i++) {
				if (nodes[i].room) {
					if (nodes[i].room.isInside(x, y)) inRoom = true;
				}
				if (nodes[i].paths.length) {
					for (let i = 0; i < nodes[i].paths.length; i++) {
						if (nodes[i].paths[i].isInside(x, y)) inRoom = true;
					}
				}

			}
			if (!inRoom) walls.push(new Wall(x, y)); 
		}
	}

	for (let i = 0; i < walls.length; i++) {
		walls[i].display();
	}
}

function mousePressed() {
	console.clear();
	createMap();
}