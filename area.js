class Area {
	
	constructor(x, y, w, h, c) {
		this.x = floor(x);
		this.y = floor(y);
		this.w = floor(w);
		this.h = floor(h);
		this.c = c;
	}

	collide(other) {

	}

	display() {
		fill(this.c);
		rect(this.x, this.y, this.w, this.h);
	}
}