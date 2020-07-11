import p5 from "p5";

const colors: Array<string> = [
  "#fc5185",
  "#364f6b",
  "#43dde6",
  "#43dde6",
  "#fff591",
  "#ff8a5c",
  "#f5587b",
  "#e41749",
];

export class Dot {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  maxRadius: number;
  velocity: number;
  private createdAt: number;
  lifetime: number;
  color: string;
  isDead: boolean;

  constructor(x: number, y: number, velocity: number, lifetime: number) {
    this.id = Math.floor(Math.random() * 1000);
    this.x = x;
    this.y = y;
    this.dx = (Math.random() * 2 - 1) * 1;
    this.dy = (Math.random() * 2 - 1) * 1;
    this.radius = Math.random() * 20;
    this.maxRadius = 60;
    this.velocity = velocity;
    this.lifetime = lifetime * 1000;
    this.createdAt = Date.now();
    this.isDead = false;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  get dotID(): number {
    return this.id;
  }

  // isStuck() {
  //   const overX = this.x > window.innerWidth || this.x < 0;
  //   const overY = this.y > window.innerHeight || this.y < 0;

  //   this.isDead = true;
  // }

  distance(p5: p5, targetX: number, targetY: number): number {
    const xs: number = p5.pow(targetX - this.x, 2);
    const ys: number = p5.pow(targetY - this.y, 2);
    const distance: number = p5.sqrt(xs + ys);
    return distance;
  }

  draw(p5: p5): void {
    if (!this.isDead) {
      p5.fill(this.color);
      p5.noStroke();
      p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
  }

  update(p5: p5) {
    if (this.x > p5.windowWidth - this.radius || this.x < 0 + this.radius)
      this.dx = -this.dx;

    if (this.x > p5.windowHeight - this.radius || this.y < 0 + this.radius)
      this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    if (this.createdAt + this.lifetime <= Date.now()) this.isDead = true;

    this.draw(p5);
  }

  increaseRadius(p5: p5): void {
    if (this.radius < 60) this.radius += 1;
    else this.isDead = true;
  }
}
