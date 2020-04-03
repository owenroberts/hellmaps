class Node extends Area {

	constructor(x, y, w, h) {
		super(x, y, w, h, Math.floor(random(255)));
		this.paths = [];
		this.walls = [];
	}

	split(min) {
		if (this.a || this.b) return false;

		const verticalSplit = Math.random() > this.w / (this.w + this.h);
		if (min > (verticalSplit ? this.h : this.w)) return false;

		const max = (verticalSplit ? this.h : this.w) - min;
		if (max < min) return false;

		const split = Math.floor(random(min, max));

		if (verticalSplit) {
			this.a = new Node(this.x, this.y, this.w, split);
			this.b = new Node(this.x, this.y + split, this.w, this.h - split);
		} else {
			this.a = new Node(this.x, this.y, split, this.h);
			this.b = new Node(this.x + split, this.y, this.w - split, this.h);
		}
		return true;
	}

	createRooms() {
		if (this.a || this.b) {
			if (this.a) this.a.createRooms();
			if (this.b) this.b.createRooms();
			if (this.a && this.b) this.createPath(this.a.getRoom(), this.b.getRoom());
		} else {
			// let w = this.w * random(0.25, 0.9);
			// let h = this.h * random(0.25, 0.9);
			// let x = random(0, this.w - w);
			// let y = random(0, this.h - h);
		
			const w = Math.floor(random(3, this.w - 2));
			const h = Math.floor(random(3, this.h - 2));
			const x = Math.floor(random(1, this.w - w - 1));
			const y = Math.floor(random(1, this.h - h - 1));

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
			x: Math.floor(random(a.x + 1, a.x + a.w - 2)), 
			y: Math.floor(random(a.y + 1, a.y + a.h - 2))
		};
		let v2 = {
			x: Math.floor(random(b.x + 1, b.x + b.w - 2)),
			y: Math.floor(random(b.y + 1, b.y + b.h - 2))
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
					this.paths.push(new Path(v1.x, v1.y, 1, Math.abs(h), 'gold')); // 1 short
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

		if (p5) {


			textSize(14);
			fill('blue')
			textAlign(LEFT, TOP);
			text(`${this.x},${this.y}`, this.x * cell.w, this.y * cell.h);
		}

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