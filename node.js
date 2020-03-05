class Node extends Area {

	constructor(x, y, w, h) {
		super(x, y, w, h, floor(random(255)));

		this.vert = random(1) > this.w / (this.w + this.h);
		if (this.vert) {
			// split vertical
			if (this.h > m) {
				const h = floor(this.h * random(0.25, 0.75));
				this.a = new Node(this.x, this.y, this.w, h);
				this.b = new Node(this.x, this.y + h, this.w, this.h - h);
			}
		} else {
			// split horizontal
			if (this.w > m) {
				const w = floor(this.w * random(0.25, 0.75));
				this.a = new Node(this.x, this.y, w, this.h);
				this.b = new Node(this.x + w, this.y, this.w - w, this.h);
			}
		}

		if (!this.a) this.addRoom();
		if (this.a && !this.a.a && !this.b.a) this.addPath();
	}

	addPath() {
		let x, y, w, h;
		if (this.vert) {
			w = 20;
			x = this.a.room.x + random(this.a.room.w - w);
			y = this.a.room.y + this.a.room.h;
			h = this.b.room.y - (this.a.room.y + this.a.room.h);

			if (this.a.room.x + this.a.room.w < this.b.room.x + w ||
				this.b.room.x + this.b.room.w < this.a.room.x + w
				) {
				// rooms don't overlap at all ....
				console.log('no overlap');

				let _h = 20;
				let _w = abs(x - (this.b.room.x + this.b.room.w));
				let _x = 

			} else {
				while (x < this.b.room.x + w) { x++; }
				while (x > this.b.room.x + this.b.room.w - w) { x--; }
			}
			
		} else {
			h = 20;
			x = this.a.room.x + this.a.room.w;
			y = this.a.room.y + random(this.a.room.h - h);
			w = this.b.room.x - (this.a.room.x + this.a.room.w);
			

			if (this.a.room.y + this.a.room.h < this.b.room.y + h ||
				this.b.room.y + this.b.room.y < this.a.room.y + h
				) {
				// rooms don't overlap at all ....
				console.log('no overlap');
			} else {
				while (y < this.b.room.y + h) { y++; }
				while (y > this.b.room.y + this.b.room.h - h) { y--; }
			}

		}

		this.path = new Path(x, y, w, h);
	}

	addRoom() {
		let w = this.w * random(0.25, 0.9);
		let h = this.h * random(0.25, 0.9);
		let x = random(0, this.w - w);
		let y = random(0, this.h - h);
		this.room = new Room(this.x + x, this.y + y, w, h);
	}

	display() {
		if (this.room) {
			fill(this.c);
			rect(this.x, this.y, this.w, this.h);
			this.room.display();
		} else {
			this.a.display();
			this.b.display();
			if (this.path) this.path.display();
		}
	}
}