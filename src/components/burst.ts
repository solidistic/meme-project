import p5 from "p5";
import { Dot } from "./dot";

export class Burst extends Dot {
  private dots: Array<Dot>;
  hideDot: boolean;

  constructor(x: number, y: number, velocity: number, lifetime: number) {
    super(x, y, velocity, lifetime);
    this.hideDot = false;
    this.dots = [];
  }

  draw(p5: p5): void {
    if (!this.isDead) {
      p5.fill(this.color);
      p5.noStroke();
      p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    } else if (!this.hideDot) this.burst(p5);

    if (this.dots.length > 0)
      for (let i = 0; i < this.dots.length; i++) {
        if (this.dots[i].isDead) {
          this.dots.splice(i, 1);
        } else this.dots[i].update(p5);
      }

    if (this.dots.length === 0 && this.hideDot) this.isDead = true;
  }

  burst(p5: p5): void {
    if (this.radius >= this.maxRadius && this.dots.length < 10) {
      this.dots.push(new Dot(this.x, this.y, 35, 5));
    } else if (this.dots.length === 10) this.hideDot = true;
  }
}
