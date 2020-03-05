class Node extends Area {

	constructor(x, y, w, h) {
		super(x, y, w, h, floor(random(255)));

		this.verticalSplit = random(1) > this.w / (this.w + this.h);
		if (this.verticalSplit) {
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
		if (this.a && !this.a.a && !this.b.a) 
			this.path = new Path(this.a.room, this.b.room, this.verticalSplit);

		if (this.a) {
			if (this.a.room && !this.path) {
				console.log('no paths!')
			}
		}
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