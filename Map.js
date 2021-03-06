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

	build(buffer, maxNodes) {
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
		this.nodes[0].createRooms();
		console.timeEnd('rooms');

		console.time('walls');
		for (let x = 0; x < this.cols; x++) {
			for (let y = 0; y < this.rows; y++) {
				let inRoom = false;
				for (let i = 0; i < this.nodes.length; i++) {
					if (this.nodes[i].room) {
						if (this.nodes[i].room.isInside(x,y)) inRoom = true;
					}
					for (let j = 0; j < this.nodes[i].paths.length; j++) {
						if (this.nodes[i].paths[j].isInside(x, y)) inRoom = true;
					}
				}
				if (!inRoom) this.walls.push(new Wall(x * cellSize.w, y * cellSize.h, 'green')); 
			}
		}
		console.timeEnd('walls');
		/* walls takes 1500ms ... needs work 
			wall time got longer after updates ... */
		console.groupEnd();
	}
}

