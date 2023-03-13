/*
	map uses Map, Area, Node classes
	game provides Path, Room, Wall
*/

class BSPMap {
	constructor(cols, rows, minNodeSize, maxNodeSize, minRoomSize) {
		this.cols = cols;
		this.rows = rows;
		this.minNodeSize = minNodeSize;
		this.maxNodeSize = maxNodeSize;
		this.minRoomSize = minRoomSize ?? 3;
		this.nodes = [];
		this.walls = [];
		this.rooms = [];
		this.paths = [];
	}

	updateSize(cols, rows, minNodeSize, maxNodeSize) {
		this.cols = cols;
		this.rows = rows;
		this.minNodeSize = minNodeSize;
		this.maxNodeSize = maxNodeSize;
	}

	getMatrixCellNum(x, y, includeEdges=false) {
		if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) {
			return -1;
		} else {
			return this.matrix[x + y * this.cols];
		}
	}

	getWangBlobNum(binaryString) {
		let array = binaryString.split('').map(n => Boolean(+n));
		let [t, tr, r, br, b, bl, l, tl] = array;
		if (!(t && l)) tl = 0;
		if (!(t && r)) tr = 0;
		if (!(b && l)) bl = 0;
		if (!(b && r)) br = 0;

		let tot = 0;
		if (t) 	tot += (1 << 0);
		if (tr)	tot += (1 << 1);
		if (r)	tot += (1 << 2);
		if (br)	tot += (1 << 3);
		if (b) 	tot += (1 << 4);
		if (bl)	tot += (1 << 5);
		if (l)	tot += (1 << 6);
		if (tl)	tot += (1 << 7);

		return tot;
	}

	getMatrixCell(x, y, types) {
		// north, north-east, east, south-east, south, south-west, west, nort-west
		// types 0 wall, 1 room, 2 path, 3 room + path, -1 edge
		return [
			types.includes(this.getMatrixCellNum(x    , y - 1)) ? 1 : 0,
			types.includes(this.getMatrixCellNum(x + 1, y - 1)) ? 1 : 0,
			types.includes(this.getMatrixCellNum(x + 1, y    )) ? 1 : 0,
			types.includes(this.getMatrixCellNum(x + 1, y + 1)) ? 1 : 0,
			types.includes(this.getMatrixCellNum(x    , y + 1)) ? 1 : 0,
			types.includes(this.getMatrixCellNum(x - 1, y + 1)) ? 1 : 0,
			types.includes(this.getMatrixCellNum(x - 1, y    )) ? 1 : 0,
			types.includes(this.getMatrixCellNum(x - 1, y - 1)) ? 1 : 0,
		].join('').toString();
	}

	build(buffer, roomBuffer, maxNodes, usePaths=true) {
		this.walls = [];
		this.nodes = [];
		const start = new Node(buffer.w, buffer.h, this.cols - buffer.w * 2, this.rows - buffer.h * 2);
		this.nodes.push(start); 
		// console.groupCollapsed('load map');
		console.group('load map');
		console.time('nodes');

		let didSplit = true;
		while (didSplit && this.nodes.length < maxNodes) {
			didSplit = false;
			for (let i = 0, len = this.nodes.length; i < len; i++) {
				const node = this.nodes[i];
				if (!node.a && !node.b && this.nodes.length < maxNodes - 1) {
					// can i have randomness here ??? 
					if (node.w > this.maxNodeSize || node.h > this.maxNodeSize /* || random(1) > 0.5*/ ) {
						if (node.split(this.minNodeSize)) {
							this.nodes.push(node.a);
							this.nodes.push(node.b);
							didSplit = true;
						}
					}
				}
			}
		}
		console.timeEnd('nodes');

		console.time('rooms');
		start.createRooms(this.minRoomSize, roomBuffer, usePaths);
		this.rooms = start.getRooms();

		function getPaths(node, array) {
			if (node.paths) node.paths.forEach(p => array.push(p));
			if (node.a) getPaths(node.a, array);
			if (node.b) getPaths(node.b, array);
		}
		getPaths(start, this.paths);

		console.timeEnd('rooms');

		console.time('walls');
		this.matrix = [];

		for (let x = 0; x < this.cols; x++) {
			for (let y = 0; y < this.rows; y++) {
				let inRoom = false;
				let inPath = false;
				for (let i = 0; i < this.nodes.length; i++) {
					if (this.nodes[i].room) {
						if (this.nodes[i].room.isInside(x,y)) inRoom = true;
					}
					for (let j = 0; j < this.nodes[i].paths.length; j++) {
						if (this.nodes[i].paths[j].isInside(x, y)) inPath = true;
					}
				}
				// console.log(x, y, x + y * this.rows, y + x * this.cols);
				this.matrix[x + y * this.cols] = 0;
				if (inRoom) this.matrix[x + y * this.cols] = 1;
				if (inPath) this.matrix[x + y * this.cols] = 2;
				if (inRoom && inPath) this.matrix[x + y * this.cols] = 3;
			}
		}

		// matrix 0 = wall, 1 room, 2 path, 3 room + path

		console.timeEnd('walls');
		for (let i = 0; i < this.matrix.length; i++) {
			if (this.matrix[i] === 0) {
				const x = i % this.cols;
				const y = Math.floor(i / this.cols);
				this.walls.push(new Area(x * cellSize.w, y * cellSize.h, 1, 1)); 
			}
		}

		console.groupEnd();
	}
}

