import { random } from '../../cool/cool.js';
import { BSPMap } from './Map.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cellSize = { w: 16, h: 16 };
let mapSize = { w: 32, h: 32 };
let mapBuffer = { w: 0, h: 0 };
let roomBuffer = { w: 0, h: 0 };
let maxNodes = 16;
let usePaths = true;

let width = cellSize.w * mapSize.w;
let height = cellSize.h * mapSize.h;

canvas.width = width;
canvas.height = height;

function newMap() {
	width = cellSize.w * mapSize.w;
	height = cellSize.h * mapSize.h;
	canvas.width = width;
	canvas.height = height;

	const map = new BSPMap(mapSize.w, mapSize.h, 3, 6, 2);
	map.build(mapBuffer, roomBuffer, maxNodes, cellSize, usePaths);
	console.log({map});

	ctx.fillStyle = `lightblue`;
	ctx.fillRect(0, 0, width, height);

	for (let i = 0; i < map.nodes.length; i++) {
		const c = Math.round(random(100, 200));
		ctx.fillStyle = `rgb(${random(50, 150)}, ${random(100, 200)}, ${random(100, 200)})`;

		const n = map.nodes[i];
		ctx.fillRect(n.x * cellSize.w, n.y * cellSize.h, n.w * cellSize.w, n.h * cellSize.h);
	}

	for (let i = 0; i < map.matrix.length; i++) {
		if (map.matrix[i] === 0) continue; // fill('gray');
		if (map.matrix[i] === 1) ctx.fillStyle = 'plum';
		if (map.matrix[i] === 2) ctx.fillStyle = 'gold';
		if (map.matrix[i] === 3) ctx.fillStyle = 'gold';
		const x = i % map.cols;
		const y = Math.floor(i / map.cols);
		ctx.fillRect(x * cellSize.w, y * cellSize.h, cellSize.w, cellSize.h);
	}

	for (let i = 0; i < map.rooms.length; i++) {
		const r = map.rooms[i];
		ctx.font = "12px Arial";
		ctx.fillStyle = "black";
		ctx.fillText(`${r.x},${r.y}`, r.x * cellSize.w + 1, r.y * cellSize.h + 12);
	}

	for (let i = 0; i < map.paths.length; i++) {
		const r = map.paths[i];
		ctx.fillText(`${r.x},${r.y}`, r.x * cellSize.w + 1, r.y * cellSize.h + 12);
	}

	for (let x = 0; x <= mapSize.w; x++) {
		for (let y = 0; y <= mapSize.h; y++) {
			ctx.fillStyle = "rgba(0, 200, 200, 200)"; //(0, 200, 100, 200);
			ctx.beginPath();
			ctx.arc(x * cellSize.w, y * cellSize.h, 1, 0, Math.PI * 2);
			ctx.fill();
		}
	}
}

newMap();

/* ui */
document.getElementById('new-map').addEventListener('click', newMap);

document.getElementById('cell-width').addEventListener('input', ev => {
	cellSize.w = +ev.target.value;
	newMap();
});

document.getElementById('cell-height').addEventListener('input', ev => {
	cellSize.h = +ev.target.value;
	newMap();
});

document.getElementById('map-cols').addEventListener('input', ev => {
	mapSize.w = +ev.target.value;
	newMap();
});

document.getElementById('map-rows').addEventListener('input', ev => {
	mapSize.h = +ev.target.value;
	newMap();
});

document.getElementById('map-buffer-cols').addEventListener('input', ev => {
	mapBuffer.w = +ev.target.value;
	newMap();
});

document.getElementById('room-buffer-rows').addEventListener('input', ev => {
	roomBuffer.h = +ev.target.value;
	newMap();
});

document.getElementById('room-buffer-cols').addEventListener('input', ev => {
	roomBuffer.w = +ev.target.value;
	newMap();
});

document.getElementById('map-buffer-rows').addEventListener('input', ev => {
	mapBuffer.h = +ev.target.value;
	newMap();
});

document.getElementById('max-nodes').addEventListener('input', ev => {
	maxNodes = +ev.target.value;
	newMap();
});

document.getElementById('use-paths').addEventListener('input', ev => {
	usePaths = ev.target.checked;
	newMap();
});