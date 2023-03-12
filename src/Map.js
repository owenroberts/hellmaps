/*
	map uses Map, Area, Node classes
	game provides Path, Room, Wall
*/

class BSPMap {
	constructor(cols, rows, minNodeSize, maxNodeSize) {
		this.cols = cols;
		this.rows = rows;
		this.minNodeSize = minNodeSize;
		this.maxNodeSize = maxNodeSize;
		this.nodes = [];
		this.walls = [];
	}

	updateSize(cols, rows, minNodeSize, maxNodeSize) {
		this.cols = cols;
		this.rows = rows;
		this.minNodeSize = minNodeSize;
		this.maxNodeSize = maxNodeSize;
	}

	getMatrixCell(x, y, type) {
		return [
			this.matrix[x - 1 + (y - 1) * this.cols] === type ? 1 : 0, // -1, -1
			this.matrix[x + (y - 1) * this.cols] === type ? 1 : 0, // 0, -1,
			this.matrix[x + 1 + (y - 1) * this.cols] === type ? 1 : 0, // 0, -1,
			this.matrix[x - 1 + y * this.cols] === type ? 1 : 0, // -1, 0,
			// 0, 0
			this.matrix[x + 1 + y * this.cols] === type ? 1 : 0, // 1, 0,
			this.matrix[x - 1 + (y + 1) * this.cols] === type ? 1 : 0, // -1, 1,
			this.matrix[x + (y + 1) * this.cols] === type ? 1 : 0, // 0, 1
			this.matrix[x + 1 + (y + 1) * this.cols] === type ? 1 : 0, // 1, 1
		].join('').toString();
	}

	build(buffer, maxNodes, usePaths=true) {
		this.walls = [];
		this.nodes = [];
		this.nodes.push(new Node(buffer.w, buffer.h, this.cols - buffer.w * 2, this.rows - buffer.h * 2)); 

		console.groupCollapsed('load map');
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
		this.nodes[0].createRooms(usePaths);
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

		// console.log(this.matrix);

		// for (let i = 0; i < this.matrix.length; i++) {
		// 	if (this.matrix[i] === 0) {
		// 		const x = i % this.cols;
		// 		const y = Math.floor(i / this.cols);
				
		// 		this.walls.push(new Wall({
		// 			x: x * cellSize.w, 
		// 			y: y * cellSize.h, 
		// 			// texture: textures.room,
		// 		})); 
		// 	}
		// }

		console.timeEnd('walls');
		/* walls takes 1500ms ... needs work 
			wall time got longer after updates ... */
		console.groupEnd();
	}
}

