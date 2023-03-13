/*
	create and display map
	based on
	https://gamedevelopment.tutsplus.com/tutorials/how-to-use-bsp-trees-to-generate-game-maps--gamedev-12268
*/

let mapSize = { w: 30, h: 30 };
let cellSize = {}; // room dimension multiplier
let map;

function setup() {
	const sz = windowWidth < windowHeight ? windowWidth : windowHeight;
	createCanvas(sz, sz);
	noStroke();
	cellSize.w = width / mapSize.w;
	cellSize.h = height / mapSize.h;
	newMap();

	// createButton('Refresh Map')
	// 	.parent('ui')
	// 	.pressed(newMap);

	// createSlider();
}

function mousePressed() {
	console.clear();
	newMap();
}

function newMap() {
	createMap();
	drawMap();
}

function createMap() {
	background(220);

	map = new BSPMap(mapSize.w, mapSize.h, 1, 6, 1);
	// while (map.nodes.length < 3) {
	map.build({ w: 0, h: 0 }, { w: 0, h: 0 }, 16, false);
	// }
	console.log('map', map);
}

function drawMap() {
	
	// map.nodes[0].display();
	// map.walls.forEach(wall => wall.display());

	map.nodes.forEach(n => {
		fill(random(100, 200));
		rect(n.x * cellSize.w, n.y * cellSize.h, n.w * cellSize.w, n.h * cellSize.h);
	});

	for (let i = 0; i < map.matrix.length; i++) {
		if (map.matrix[i] === 0) continue; // fill('gray');
		if (map.matrix[i] === 1) fill('plum');
		if (map.matrix[i] === 2) fill('gold');
		if (map.matrix[i] === 3) fill('gold');
		const x = i % map.cols;
		const y = Math.floor(i / map.cols);
		rect(x * cellSize.w, y * cellSize.h, cellSize.w, cellSize.h);
	}

	map.rooms.forEach(r => {
		textSize(14);
		fill('black')
		textAlign(LEFT, TOP);
		text(`${r.x},${r.y}`, r.x * cellSize.w, r.y * cellSize.h);
	});

	map.paths.forEach(r => {
		textSize(14);
		fill('black')
		textAlign(LEFT, TOP);
		text(`${r.x},${r.y}`, r.x * cellSize.w, r.y * cellSize.h);
	});

	for (let x = 0; x <= mapSize.w; x++) {
		for (let y = 0; y <= mapSize.h; y++) {
			fill(0, 200, 100, 200);
			ellipse(x * cellSize.w, y * cellSize.h, 3);
		}
	}
}

