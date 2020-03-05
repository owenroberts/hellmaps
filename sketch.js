let tree;
let m; // min room dimension

function setup() {
	const sz = windowWidth < windowHeight ? windowWidth : windowHeight;
	createCanvas(sz, sz);
	noStroke();

	m = width * 0.75; // 0.33;
	newTree();
}

function newTree() {
	background('plum');
	tree = new Node(0, 0, width, height);
	tree.display();
}

function mousePressed() {
	console.clear();
	newTree();
}