import { Dot } from "./dot.js";
export class Matrix {
  constructor(amount) {
    this.dots = [];
    for (let i = 0; i < amount; i++) {
      this.dots.push(new Dot(Math.floor(Math.random() * innerWidth), Math.floor(Math.random() * innerHeight)));
    }
  }
  showAll() {
    this.dots.forEach(dot => dot.show());
  }
}
