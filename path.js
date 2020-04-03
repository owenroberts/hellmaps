class Path extends Area {
	constructor(x, y, w, h) {
		super(x, y, w, h, 'gold');
	}

	display() {
		fill(this.c);
		rect(this.x * cell.w, this.y * cell.h, this.w * cell.w, this.h * cell.h);

		textSize(14);
		fill('black')
		textAlign(LEFT, TOP);
		text(`${this.x},${this.y}`, this.x * cell.w, this.y * cell.h);
	}
}