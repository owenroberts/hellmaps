class Area {
	
	constructor(x, y, w, h, c) {
		this.x = Math.round(x);
		this.y = Math.round(y);
		this.w = Math.max(Math.round(w), 1);
		this.h = Math.max(Math.round(h), 1);
		this.c = c;
	}

	isInside(x, y) {
		if (x >= this.x && x < this.x + this.w && y >= this.y && y < this.y + this.h) return true;
		else return false;
	}
}