class Path extends Area {
	constructor(x, y, w, h) {
		super(x, y, w, h, 'gold');
	}

	display() {
		fill(this.c);
		rect(this.x * cellSize.w, this.y * cellSize.h, this.w * cellSize.w, this.h * cellSize.h);

		textSize(14);
		fill('black')
		textAlign(LEFT, TOP);
		text(`${this.x},${this.y}`, this.x * cellSize.w, this.y * cellSize.h);
	}
}