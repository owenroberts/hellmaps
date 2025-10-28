/**
 * class representing box area
 */
export class Area {

	/**
	 * create an area
	 * @param  {number} x x position
	 * @param  {number} y y position
	 * @param  {number} w width
	 * @param  {number} h height
	 */
	constructor(x, y, w, h) {
		this.x = Math.round(x);
		this.y = Math.round(y);
		this.w = Math.max(Math.round(w), 1);
		this.h = Math.max(Math.round(h), 1);
	}

	/**
	 * is point inside area?
	 * @param  {number}  x x position
	 * @param  {number}  y y position
	 * @return {Boolean}   is inside area?
	 */
	isInside(x, y) {
		if (x >= this.x && x < this.x + this.w && y >= this.y && y < this.y + this.h) return true;
		else return false;
	}
}