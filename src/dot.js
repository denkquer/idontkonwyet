export class Dot {
  constructor(initialX = 0, initialY = 0) {
    this.x = initialX;
    this.y = initialY;
    this.strokeWeight = 5;
    this.color = [255, 255, 255]; //white
  }
  show() {
    stroke(...this.color);
    strokeWeight(this.strokeWeight);
    point(this.x, this.y);
  }
  move() {}
}
