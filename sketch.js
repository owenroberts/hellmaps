let m; // min room dimension

function setup() {
	const sz = windowWidth < windowHeight ? windowWidth : windowHeight;
	createCanvas(sz, sz);
	noStroke();

	m = width * 0.75; // 0.33;
	createMap();

}

function createMap() {
	const nodes = [new Node(0, 0, width, height)]; // root node

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
}

function mousePressed() {
	console.clear();
	createMap();
}