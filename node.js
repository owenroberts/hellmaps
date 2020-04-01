class Node extends Area {

	constructor(x, y, w, h) {
		super(x, y, w, h, Math.floor(random(255)));
		this.paths = [];
		this.walls = [];
	}

	split(m) {
		if (this.a || this.b) return false;

		const verticalSplit = Math.random() > this.w / (this.w + this.h);
		if (m > (verticalSplit ? this.h : this.w)) return false;

		if (verticalSplit) {
			const h = Math.floor(this.h * random(0.25, 0.75));
			this.a = new Node(this.x, this.y, this.w, h);
			this.b = new Node(this.x, this.y + h, this.w, this.h - h);
		} else {
			const w = Math.floor(this.w * random(0.25, 0.75));
			this.a = new Node(this.x, this.y, w, this.h);
			this.b = new Node(this.x + w, this.y, this.w - w, this.h);
		}
		return true;
	}

	createRooms() {
		if (this.a || this.b) {
			if (this.a) this.a.createRooms();
			if (this.b) this.b.createRooms();
			if (this.a && this.b) this.createPath(this.a.getRoom(), this.b.getRoom());
		} else {
			let w = this.w * random(0.25, 0.9);
			let h = this.h * random(0.25, 0.9);
			let x = random(0, this.w - w);
			let y = random(0, this.h - h);
			this.room = new Room(x + this.x, y + this.y, w, h, 'plum');
		}
	}

	createWalls() {
		/* how to account for nested paths? */
		if (this.paths.length) {
			
			let rooms = [];
			if (this.a) rooms = rooms.concat(this.a.getRooms());
			if (this.b) rooms = rooms.concat(this.b.getRooms());

			for (let x = this.x; x < this.x + this.w; x++) {
				for (let y = this.y; y < this.y + this.h; y++) {
					let inRoom = false;
					for (let i = 0; i < rooms.length; i++) {
						if (rooms[i].isInside(x,y)) inRoom = true;
					}
					for (let i = 0; i < this.paths.length; i++) {
						if (this.paths[i].isInside(x,y)) inRoom = true;
					}
					if (!inRoom) this.walls.push(new Wall(x, y)); 
				}
			}
		} else {
			if (this.a) this.a.createWalls();
			if (this.b) this.b.createWalls();
		}
	}

	getRooms() {
		if (this.room) return [this.room];
		else {
			let a, b;
			if (this.a) a = this.a.getRooms();
			if (this.b) b = this.b.getRooms();
			if (!a && !b) return null;
			else if (!a) return [a];
			else if (!b) return [b];
			else return a.concat(b);
		}
	}

	getRoom() {
		if (this.room) return this.room;
		else {
			let a, b;
			if (this.a) a = this.a.getRoom();
			if (this.b) b = this.b.getRoom();

			if (!a && !b) return null;
			else if (!b) return a;
			else if (!a) return b;
			else return random(1) > 0.5 ? a : b;
		}
	}

	createPath(a, b) {
		// console.log(a, b);

		// remove +1 and -2 from tut, think its causing missing links
		// https://gamedevelopment.tutsplus.com/tutorials/how-to-use-bsp-trees-to-generate-game-maps--gamedev-12268
		let v1 = {
			x: Math.round(random(a.x, a.x + a.w)), 
			y: Math.round(random(a.y, a.y + a.h))
		};
		let v2 = {
			x: Math.round(random(b.x, b.x + b.w)),
			y: Math.round(random(b.y, b.y + b.h))
		};
		
		let w = v2.x - v1.x;
		let h = v2.y - v1.y;

		if (w < 0) {
			if (h < 0) {
				if (random(1) > 0.5) {
					this.paths.push(new Path(v2.x, v1.y, Math.abs(w) + 1, 1, 'gold'));
					this.paths.push(new Path(v2.x, v2.y, 1, Math.abs(h) + 1, 'gold'));
				} else {
					this.paths.push(new Path(v2.x, v2.y, Math.abs(w) + 1, 1, 'gold'));
					this.paths.push(new Path(v1.x, v2.y, 1, Math.abs(h) + 1, 'gold'));
				}
			} else if (h > 0) {
				if (random(1) > 0.5) {
					this.paths.push(new Path(v2.x, v1.y, Math.abs(w) + 1, 1, 'gold'));
					this.paths.push(new Path(v2.x, v1.y, 1, Math.abs(h) + 1, 'gold'));
				} else {
					this.paths.push(new Path(v2.x, v2.y, Math.abs(w) + 1, 1, 'gold'));
					this.paths.push(new Path(v1.x, v1.y, 1, Math.abs(h) + 1, 'gold')); // 1 short
				}
			} else {
				this.paths.push(new Path(v2.x, v2.y, Math.abs(w) + 1, 1, 'gold'));
			}
		} else if (w > 0) {
			if (h < 0) {
				if (random(1) > 0.5) {
					this.paths.push(new Path(v1.x, v2.y, Math.abs(w) + 1, 1, 'gold'));
					this.paths.push(new Path(v1.x, v2.y, 1, Math.abs(h) + 1, 'gold'));
				} else {
					this.paths.push(new Path(v1.x, v1.y, Math.abs(w) + 1, 1, 'gold'));
					this.paths.push(new Path(v2.x, v2.y, 1, Math.abs(h) + 1, 'gold'));
				}
			} else if (h > 0) {
				if (random(1) > 0.5) {
					this.paths.push(new Path(v1.x, v1.y, Math.abs(w) + 1, 1, 'gold'));
					this.paths.push(new Path(v2.x, v1.y, 1, Math.abs(h) + 1, 'gold'));
				} else {
					this.paths.push(new Path(v1.x, v2.y, Math.abs(w) + 1, 1, 'gold'));
					this.paths.push(new Path(v1.x, v1.y, 1, Math.abs(h) + 1, 'gold'));
				}
			} else {
				this.paths.push(new Path(v1.x, v1.y, Math.abs(w) + 1, 1, 'gold'));
			}
		} else {
			if (h < 0) {
				this.paths.push(new Path(v2.x, v2.y, 1, Math.abs(h) + 1, 'gold'));
			} else {
				this.paths.push(new Path(v1.x, v1.y, 1, Math.abs(h) + 1, 'gold'));
			}
		}
	}

	display() {
		// super.display();

		// textSize(20);
		// fill('blue')
		// textAlign(LEFT, TOP);
		// text(`${this.x},${this.y}`, this.x * cell.w, this.y * cell.h);

		if (this.room) this.room.display();
		if (this.a) this.a.display();
		if (this.b) this.b.display();
		for (let i = 0; i < this.paths.length; i++) {	
			this.paths[i].display();
		}
		for (let i = 0; i < this.walls.length; i++) {	
			this.walls[i].display();
		}
	}
}