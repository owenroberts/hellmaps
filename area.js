class Area {
	
	constructor(x, y, w, h, c) {
		this.x = round(x);
		this.y = round(y);
		this.w = max(round(w), 1);
		this.h = max(round(h), 1);
		this.c = c;
	}

	isInside(x, y) {
		if (x >= this.x && x < this.x + this.w && y >= this.y && y < this.y + this.h) return true;
		else return false;
	}

	display() {
		fill(this.c);
		rect(this.x * d.x, this.y * d.y, this.w * d.x, this.h * d.y);
	}
}