/*global */
document.body.style.margin = '0px';

let matrix = new Matrix(10);

function setup() {
  createCanvas(innerWidth, innerHeight);
  //noLoop();

  // matrix.dots.push(new Dot(100, 100, '0'));
  // matrix.dots.push(new Dot(200, 100, '1'));
  // matrix.dots.push(new Dot(300, 200, '2'));
  // matrix.dots.push(new Dot(600, 700, '3'));
  // matrix.dots.push(new Dot(700, 700, '4'));
}

function draw() {
  background(0);
  matrix.showAll();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function Dot(initialX, initialY, debug = undefined) {
  this.debug = debug;
  this.x = initialX;
  this.y = initialY;
  this.color = [255, 255, 255];
  this.nachbarn = [];
  this.xVel = Math.random() > 0.5 ? Math.random() + 1 : Math.random() - 1;
  this.yVel = Math.random() > 0.5 ? Math.random() + 1 : Math.random() - 1;
  this.move = () => {
    this.x += this.xVel;
    this.y += this.yVel;

    matrix.dots.forEach(dot => {
      if (this.nachbarn.length < 3 && this !== dot && !this.nachbarn.includes(dot)) {
        this.nachbarn.push(dot);
      } else if (this !== dot && !this.nachbarn.includes(dot)) {
        this.nachbarn.sort((a, b) => {
          return dist(this.x, this.y, a.x, a.y) - dist(this.x, this.y, b.x, b.y);
        });
        let foo = this.nachbarn[this.nachbarn.length - 1];
        if (dist(foo.x, foo.y, this.x, this.y) > dist(dot.x, dot.y, this.x, this.y)) {
          this.nachbarn.splice(-1, 1, dot);
        }
      }
    });

    if (this.x > innerWidth || this.x < 0 || this.y < 0 || this.y > innerHeight) {
      this.reset();
    }
  };

  this.show = () => {
    strokeWeight(1);
    stroke(...this.color);
    point(this.x, this.y);
    this.nachbarn.forEach(dot => {
      strokeWeight(1);
      line(this.x, this.y, dot.x, dot.y);
    });
  };

  this.reset = () => {
    this.x = Math.floor(Math.random() * innerWidth);
    this.y = Math.floor(Math.random() * innerHeight);
  };
}

function Matrix(amount = 0) {
  this.dots = [];
  for (let i = 0; i < amount; i++) {
    this.dots.push(new Dot(Math.floor(Math.random() * innerWidth), Math.floor(Math.random() * innerHeight)));
  }

  this.showAll = () => {
    this.dots.forEach(dot => {
      dot.move();
      dot.show();
    });
  };

  this.killDot = index => {
    this.dots.splice(index, 1);
  };
}
