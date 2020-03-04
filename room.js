class Room {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.c = color(random(255));

		if (random(1) > this.w / (this.w + this.h)) {
			// split vertical
			if (this.h > m) {
				const h = floor(this.h * random(0.25, 0.75));
				const a = new Room(this.x, this.y, this.w, h);
				const b = new Room(this.x, this.y + h, this.w, this.h - h);
				this.children = [a, b];
			}
		} else {
			// split horizontal
			if (this.w > m) {
				const w = floor(this.w * random(0.25, 0.75));
				const a = new Room(this.x, this.y, w, this.h);
				const b = new Room(this.x + w, this.y, this.w - w, this.h);
				this.children = [a, b];
			}
		}

		if (!this.children) {
			let _w = this.w * random(0.25, 0.9);
			let _h = this.h * random(0.25, 0.9);
			let _x = random(0, this.w - _w);
			let _y = random(0, this.h - _h);
			this.in = { x: this.x + _x,  y: this.y + _y, w: _w, h: _h };
		} else {
			if (!this.children[0].children) {
				
				this.path = {

				}
			}
		}
	}

	display() {
		if (this.in) {
			fill(this.c);
			rect(this.x, this.y, this.w, this.h);
		
			fill('plum');
			rect(this.in.x, this.in.y, this.in.w, this.in.h);
		} else {
			this.children[0].display();
			this.children[1].display();
		}
		
	}
}