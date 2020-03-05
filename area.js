class Area {
	
	constructor(x, y, w, h, c) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.c = c;
	}

	collide(other) {

	}

	display() {
		fill(this.c);
		rect(this.x, this.y, this.w, this.h);
	}
}