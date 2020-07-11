import p5 from "p5";
import { Dot } from "./dot";

export class Burst extends Dot {
  private dots: Array<Dot>;
  hideDot: boolean;

  constructor(x: number, y: number, velocity: number, lifetime?: number) {
    super(x, y, velocity, lifetime);
    this.hideDot = false;
    this.dots = [];
  }

  draw(p5: p5): void {
    if (!this.hideDot) {
      p5.fill(this.color);
      p5.noStroke();
      p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }

    this.burst(p5);

    if (this.dots.length > 0)
      for (let i = 0; i < this.dots.length; i++) this.dots[i].update(p5);

    const allChildDotsDead = this.dots.every((dot) => dot.isDead);

    if (allChildDotsDead && this.hideDot) this.isDead = true;
  }

  burst(p5: p5): void {
    const reachedMaxRadius = this.radius >= this.maxRadius;

    if (reachedMaxRadius && this.dots.length < 10) {
      this.dots.push(new Dot(this.x, this.y, 35, 5));
    }

    if (reachedMaxRadius && !this.hideDot) this.hideDot = true;
  }
}
