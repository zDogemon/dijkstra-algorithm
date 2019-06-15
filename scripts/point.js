class Point {

  constructor(x, y, id) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.points = []
    this.distance = []
  }

  distance_to(p) {
    let x = p.x - this.x;
		let y = p.y - this.y;
		x *= x;
    y *= y;
    return Math.sqrt(x + y);
  }
}