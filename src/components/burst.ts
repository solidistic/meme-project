import p5 from "p5";
import { Dot } from "./dot";

export class Burst extends Dot {
  private createdAt: number;
  private dots: Array<Dot>;
  hideDot: boolean;

  constructor(x: number, y: number, velocity: number, lifetime: number) {
    super(x, y, velocity, lifetime);
    this.createdAt = new Date().getSeconds();
    this.hideDot = false;
    this.dots = [];
  }

  draw(p5: p5): void {
    p5.fill(this.color);
    p5.noStroke();
    p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);

    if (this.dots.length > 0)
      for (let i = 0; i < this.dots.length; i++) this.dots[i].update(p5);

    this.burst(p5);
  }

  burst(p5: p5): void {
    // console.log(this.createdAt, this. lifetime);
    if (this.radius >= this.maxRadius && this.dots.length < 10) {
      this.dots.push(new Dot(this.x, this.y, 35, 5));
      this.hideDot = true;
    }
    // if (this.createdAt + this.lifetime === p5.second()) return true;
    // return false;
  }
}
