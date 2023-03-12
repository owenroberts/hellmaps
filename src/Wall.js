class Wall extends Area {
	constructor(x, y) {
		super(x, y, 1, 1, 'green');
	}

	display() {
		fill(this.c);
		ellipse((this.x + this.w/2) * cell.w, (this.y + this.h/2) * cell.h, this.w * cell.w, this.h * cell.h);
	}
}