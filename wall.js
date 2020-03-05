class Wall extends Area {
	constructor(x, y) {
		super(x, y, 1, 1, 'green');
	}

	display() {
		fill(this.c);
		ellipse((this.x + this.w/2) * d.x, (this.y + this.h/2) * d.y, this.w * d.x, this.h * d.y);
	}
}