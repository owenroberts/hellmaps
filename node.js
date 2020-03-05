class Node extends Area {

	constructor(x, y, w, h) {
		super(x, y, w, h, floor(random(255)));

		this.verticalSplit = random(1) > this.w / (this.w + this.h);
		if (this.verticalSplit) {
			// split vertical
			if (this.h > m) {
				const h = floor(this.h * random(0.25, 0.75));
				this.a = new Node(this.x, this.y, this.w, h);
				this.b = new Node(this.x, this.y + h, this.w, this.h - h);
			}
		} else {
			// split horizontal
			if (this.w > m) {
				const w = floor(this.w * random(0.25, 0.75));
				this.a = new Node(this.x, this.y, w, this.h);
				this.b = new Node(this.x + w, this.y, this.w - w, this.h);
			}
		}

		// node with no children gets a room
		if (!this.a) this.room = new Room(x, y, w, h);

		// connect child nodes that have no children
		this.paths = [];
		if (this.a && !this.a.a && !this.b.a) 
			this.paths.push(new Path(this.a.room, this.b.room, this.verticalSplit));


		// connect random child nodes
		if (this.a && this.b) {
			if (this.a.a && this.b.a && this.a.b && this.b.b) {
				const n1 = random(1) > 0.5 ? this.a.a : this.a.b;
				const n2 = random(1) > 0.5 ? this.b.a : this.b.b;

				console.log('vert', n1.x == n2.x);
				console.log('random');
				console.log(n1);
				console.log(n2);

				const verticalSplit = n1.x == n2.x;
				let a, b;
				if (verticalSplit) [a, b] = n1.y < n2.y ? [n1, n2] : [n2, n1];
				else [a, b] = n1.x < n2.x ? [n1, n2] : [n2, n1];

				this.paths.push(new Path(n1.room, n2.room, verticalSplit));
			}
		}

		// child with room but no children
		if (this.a) {
			if (!this.paths.length && (this.a.room || this.b.room)) {
				const n1 = this.a.room ? this.a : this.b;
				const children = this.a.room ? this.b : this.a;
				const n2 = random(1) > 0.5 ? children.a : children.b;
				
				console.log('vert', n1.x == n2.x);
				console.log(n1);
				console.log(n2);

				const verticalSplit = n1.x == n2.x;
				let a, b;
				if (verticalSplit) [a, b] = n1.y < n2.y ? [n1, n2] : [n2, n1];
				else [a, b] = n1.x < n2.x ? [n1, n2] : [n2, n1];
				this.paths.push(new Path(a.room, b.room, verticalSplit));
			}
		}
	}


	display() {
		if (this.room) {
			fill(this.c);
			rect(this.x, this.y, this.w, this.h);
			this.room.display();
		} else {
			this.a.display();
			this.b.display();
			if (this.paths.length) {
				for (let i = 0; i < this.paths.length; i++) {
					this.paths[i].display();	
				}
			}
		}
	}
}