class Map {
	constructor(cols, rows) {
		this.cols = cols;
		this.rows = rows;
	}

	build(buf) {
		this.walls = [];

		this.nodes = [new Node(buf.w, buf.h, this.cols - buf.w*2, this.rows - buf.h*2)]; 

		console.group('load map');
		console.time('nodes');
		let didSplit = true;
		while (didSplit) {
			didSplit = false;
			this.nodes.forEach(node => {
				if (!node.a && !node.b) {
					if (node.w > min && node.h > min) {
						if (node.split(min)) {
							this.nodes.push(node.a);
							this.nodes.push(node.b);
							didSplit = true;
						}
					}
				}
			});
		}
		console.timeEnd('nodes');

		console.time('rooms');
		this.nodes[0].createRooms(cols, rows);
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
				if (!inRoom) this.walls.push(new Wall(x * cell.w, y * cell.h, 'green')); 
			}
		}
		console.timeEnd('walls');
		/* walls takes 1500ms ... needs work */
		console.groupEnd();
	}
}