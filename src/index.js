/*global */
document.body.style.margin = '0px';
let matrix;

function setup() {
  createCanvas(innerWidth, innerHeight);
  let params = new URLSearchParams(document.location.search);
  matrix = new Matrix(50);
  if (typeof parseInt(params.get('knots')) === 'number')
    if (Math.abs(params.get('knots')) < 300 && Math.abs(params.get('knots')) > 0) {
      console.log(Math.abs(params.get('knots')));
      matrix = new Matrix(Math.abs(params.get('knots')));
    }
}

function draw() {
  background(0);
  matrix.showAll();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function Dot(initialX, initialY, i = NaN, debug = undefined) {
  this.index = i;
  this.debug = debug;
  this.x = initialX;
  this.y = initialY;
  this.i = 0;
  this.state = Math.random() > 0.5 ? true : false;
  this.toleranz = 1;
  this.color = [255, 255, 255];
  this.nachbarn = [];
  this.stringCount = 3;
  this.xVel = Math.random() > 0.5 ? Math.random() + 1 : Math.random() - 1;
  this.yVel = Math.random() > 0.5 ? Math.random() + 1 : Math.random() - 1;
  this.move = () => {
    this.x += this.xVel;
    this.y += this.yVel;

    matrix.dots.forEach(dot => {
      if (this.nachbarn.length < this.stringCount && this !== dot && !this.nachbarn.includes(dot)) {
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
  this.autoReset = () => {
    if (this.x > innerWidth || this.x < 0 || this.y < 0 || this.y > innerHeight) {
      this.reset();
    }
  };

  this.reset = () => {
    this.x = Math.floor(Math.random() * innerWidth);
    this.y = Math.floor(Math.random() * innerHeight);
    this.i = 0;
  };
}

function Matrix(amount = 0) {
  this.dots = [];
  for (let i = 0; i < amount; i++) {
    this.dots.push(new Dot(Math.floor(Math.random() * innerWidth), Math.floor(Math.random() * innerHeight), i, null));
  }

  this.showAll = () => {
    this.dots.forEach(dot => {
      dot.move();
      dot.show();
    });
    setTimeout(
      () =>
        this.dots.forEach(dot => {
          dot.autoReset();
        }),
      0
    );
  };

  this.killDot = index => {
    this.dots.splice(index, 1);
  };
}
