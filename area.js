class Area {
	
	constructor(x, y, w, h, c) {
		this.x = floor(x);
		this.y = floor(y);
		this.w = floor(w);
		this.h = floor(h);
		this.c = c;
	}

	isInside(x, y) {
		if (this.c == 'gold') console.log(x, y, this);
		if (x >= this.x && x < this.x + this.w && y >= this.y && y < this.y + this.h) return true;
		else return false;
	}

	display() {
		fill(this.c);
		rect(this.x * d.x, this.y * d.y, this.w * d.x, this.h * d.y);
	}
}