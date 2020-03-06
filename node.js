class Node extends Area {

	constructor(x, y, w, h) {
		super(x, y, w, h, floor(random(255)));
		this.paths = [];
	}

	split() {
		if (this.a || this.b) return false;

		const verticalSplit = random(1) > this.w / (this.w + this.h);
		if (m > (verticalSplit ? this.h : this.w)) return false;

		if (verticalSplit) {
			const h = floor(this.h * random(0.25, 0.75));
			this.a = new Node(this.x, this.y, this.w, h);
			this.b = new Node(this.x, this.y + h, this.w, this.h - h);
		} else {
			const w = floor(this.w * random(0.25, 0.75));
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
			this.room = new Area(x + this.x, y + this.y, w, h, 'plum');			
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

		let v1 = createVector(
			round(random(a.x + 1, a.x + a.w - 2)), 
			round(random(a.y + 1, a.y + a.h - 2))
		);
		let v2 = createVector(
			round(random(b.x + 1, b.x + b.w - 2)),
			round(random(b.y + 1, b.y + b.h - 2))
		);
		
		let w = v2.x - v1.x;
		let h = v2.y - v1.y;

		if (w < 0) {
			if (h < 0) {
				if (random(1) > 0.5) {
					this.paths.push(new Area(v2.x, v1.y, abs(w), 1, 'gold'));
					this.paths.push(new Area(v2.x, v2.y, 1, abs(h), 'gold'));
				} else {
					this.paths.push(new Area(v2.x, v2.y, abs(w), 1, 'gold'));
					this.paths.push(new Area(v1.x, v2.y, 1, abs(h), 'gold'));
				}
			} else if (h > 0) {
				if (random(1) > 0.5) {
					this.paths.push(new Area(v2.x, v1.y, abs(w), 1, 'gold'));
					this.paths.push(new Area(v2.x, v1.y, 1, abs(h), 'gold'));
				} else {
					this.paths.push(new Area(v2.x, v2.y, abs(w), 1, 'gold'));
					this.paths.push(new Area(v1.x, v1.y, 1, abs(h), 'gold'));
				}
			} else {
				this.paths.push(new Area(v2.x, v2.y, abs(w), 1, 'gold'));
			}
		} else if (w > 0) {
			if (h < 0) {
				if (random(1) > 0.5) {
					this.paths.push(new Area(v1.x, v2.y, abs(w), 1, 'gold'));
					this.paths.push(new Area(v1.x, v2.y, 1, abs(h), 'gold'));
				} else {
					this.paths.push(new Area(v1.x, v1.y, abs(w), 1, 'gold'));
					this.paths.push(new Area(v2.x, v2.y, 1, abs(h), 'gold'));
				}
			} else if (h > 0) {
				if (random(1) > 0.5) {
					this.paths.push(new Area(v1.x, v1.y, abs(w), 1, 'gold'));
					this.paths.push(new Area(v2.x, v1.y, 1, abs(h), 'gold'));
				} else {
					this.paths.push(new Area(v1.x, v2.y, abs(w), 1, 'gold'));
					this.paths.push(new Area(v1.x, v1.y, 1, abs(h), 'gold'));
				}
			} else {
				this.paths.push(new Area(v1.x, v1.y, abs(w), 1, 'gold'));
			}
		} else {
			if (h < 0) {
				this.paths.push(new Area(v2.x, v2.y, 1, abs(h), 'gold'));
			} else {
				this.paths.push(new Area(v1.x, v1.y, 1, abs(h), 'gold'));
			}
		}
	}

	display() {
		// super.display();
		if (this.room) this.room.display();
		if (this.a) this.a.display();
		if (this.b) this.b.display();
		for (let i = 0; i < this.paths.length; i++) {	
			this.paths[i].display();
		}
	}
}