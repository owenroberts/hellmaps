let tree;
let m; // min room dimension

function setup() {
	const sz = windowWidth < windowHeight ? windowWidth : windowHeight;
	createCanvas(sz, sz);
	noStroke();

	m = width * 0.75; // 0.33;
	tree = new Node(0, 0, width, height);
}

function draw() {
	background('plum');
	tree.display();
}

function mousePressed() {
	tree = new Node(0, 0, width, height);
}