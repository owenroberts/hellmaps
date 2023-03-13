class Node extends Area {
	constructor(x, y, w, h) {
		super(x, y, w, h);
		this.paths = [];
		this.walls = [];
	}

	split(min) {
		if (this.a || this.b) return false;

		// random chance of vertical split weighted based on size 
		const verticalSplit = Math.random() > this.w / (this.w + this.h);
		if (min > (verticalSplit ? this.h : this.w)) return false;

		const max = (verticalSplit ? this.h : this.w) - min;
		if (min > max) return false;

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

	createRooms(minRoomSize, roomBuffer, usePaths=true) {
		if (this.a || this.b) {
			if (this.a) this.a.createRooms(minRoomSize, roomBuffer, usePaths);
			if (this.b) this.b.createRooms(minRoomSize, roomBuffer, usePaths);
			if (this.a && this.b && usePaths) this.createPath(this.a.getRoom(), this.b.getRoom());
		} else {
			const w = Math.floor(random(minRoomSize, this.w - roomBuffer.w * 2));
			const h = Math.floor(random(minRoomSize, this.h - roomBuffer.h * 2));
			const x = Math.floor(random(roomBuffer.w, this.w - w - roomBuffer.w));
			const y = Math.floor(random(roomBuffer.h, this.h - h - roomBuffer.h));
			this.room = new Area(x + this.x, y + this.y, w, h);
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
					this.paths.push(new Area(v2.x, v1.y, Math.abs(w) + 1, 1));
					this.paths.push(new Area(v2.x, v2.y, 1, Math.abs(h) + 1));
				} else {
					this.paths.push(new Area(v2.x, v2.y, Math.abs(w) + 1, 1));
					this.paths.push(new Area(v1.x, v2.y, 1, Math.abs(h) + 1));
				}
			} else if (h > 0) {
				if (random(1) > 0.5) {
					this.paths.push(new Area(v2.x, v1.y, Math.abs(w) + 1, 1));
					this.paths.push(new Area(v2.x, v1.y, 1, Math.abs(h) + 1));
				} else {
					this.paths.push(new Area(v2.x, v2.y, Math.abs(w) + 1, 1));
					this.paths.push(new Area(v1.x, v1.y, 1, Math.abs(h))); // 1 short
				}
			} else {
				this.paths.push(new Area(v2.x, v2.y, Math.abs(w) + 1, 1));
			}
		} else if (w > 0) {
			if (h < 0) {
				if (random(1) > 0.5) {
					this.paths.push(new Area(v1.x, v2.y, Math.abs(w) + 1, 1));
					this.paths.push(new Area(v1.x, v2.y, 1, Math.abs(h) + 1));
				} else {
					this.paths.push(new Area(v1.x, v1.y, Math.abs(w) + 1, 1));
					this.paths.push(new Area(v2.x, v2.y, 1, Math.abs(h) + 1));
				}
			} else if (h > 0) {
				if (random(1) > 0.5) {
					this.paths.push(new Area(v1.x, v1.y, Math.abs(w) + 1, 1));
					this.paths.push(new Area(v2.x, v1.y, 1, Math.abs(h) + 1));
				} else {
					this.paths.push(new Area(v1.x, v2.y, Math.abs(w) + 1, 1));
					this.paths.push(new Area(v1.x, v1.y, 1, Math.abs(h) + 1));
				}
			} else {
				this.paths.push(new Area(v1.x, v1.y, Math.abs(w) + 1, 1));
			}
		} else {
			if (h < 0) {
				this.paths.push(new Area(v2.x, v2.y, 1, Math.abs(h) + 1));
			} else {
				this.paths.push(new Area(v1.x, v1.y, 1, Math.abs(h) + 1));
			}
		}
	}
}