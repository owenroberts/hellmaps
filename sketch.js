let tree = {};
let m; // min room dimension

function setup() {
	createCanvas(windowWidth, windowWidth);
	noStroke();

	m = width * 0.33;

	tree = new Room(0, 0, width, height);
}

function draw() {
	background('plum');
	tree.display();
}


