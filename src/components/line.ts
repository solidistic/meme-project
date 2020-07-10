export class Line {
  b: number;
  m: number;
  width: number;

  constructor(b: number, m: number, width: number) {
    this.b = b;
    this.m = m;
    this.width = width;
  }

  draw(p5: any, x: number, y: number) {
    const { mouseX, mouseY } = p5;
    p5.stroke("#fafafa");
    p5.line(mouseX, mouseY, 300, 300);
  }
}
