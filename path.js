class Path {
	constructor(a, b, verticalSplit) {
		this.paths = [];
		let x, y, w, h;
		if (verticalSplit) {
			w = 20;
			x = a.x + random(a.w - w*2);
			y = a.y + a.h;
			h = b.y - (a.y + a.h);

			if (a.x + a.w < b.x + w || b.x + b.w < b.x + w ) {
				// rooms don't overlap at all ....
				let _h = 20;
				let _w = x < b.x ? b.x - x : x - (b.x + b.w) + w;
				let _x = x < b.x ? x : b.x + b.w;
				let _y = y + h;
				this.paths.push(new Area(_x, _y, _w, _h, 'gold'));

			} else {
				while (x < b.x) {  x++; }
				while (x > b.x + b.w - w) {  x--; }
			}
			
		} else {
			h = 20;
			x = a.x + a.w;
			y = a.y + random(a.h - h*2);
			w = b.x - (a.x + a.w);
			

			if (a.y + a.h < b.y + h || a.y + b.h < a.y + h) {
				// rooms don't overlap at all ....
				let _w = 20;
				let _h = y < b.y ? b.y - y: y - (b.y + b.h) + h;
				let _y = y < b.y ? y : b.y + b.h;
				let _x = x + w;
				this.paths.push(new Area(_x, _y, _w, _h, 'gold'));

			} else {
				while (y < b.y) { y++; }
				while (y > b.y + b.h - h) {  y--; }
			}
		}

		this.paths.push(new Area(x, y, w, h, 'gold'));
	}

	display() {
		for (let i = 0; i < this.paths.length; i++) {
			this.paths[i].display();
		}
	}
}