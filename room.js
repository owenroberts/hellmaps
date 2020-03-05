class Room extends Area {
	constructor(_x, _y, _w, _h) {

		let w = _w * random(0.25, 0.9);
		let h = _h * random(0.25, 0.9);
		let x = random(0, _w - w);
		let y = random(0, _h - h);
		super(x + _x, y + _y, w, h, 'plum');
	}

}