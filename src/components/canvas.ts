import p5 from "p5";
import { Line } from "./line";
import { Dot } from "./dot";
import { Burst } from "./burst";

declare global {
  interface Window {
    p5: p5;
  }
}

export const p5canvas = (p5: p5) => {
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight;

  window.p5 = p5;

  const line = new Line(130, 2, 500);
  const dots: Array<Burst> = [];

  p5.setup = () => {
    p5.createCanvas(canvasWidth, canvasHeight);
    p5.frameRate(180);
  };

  p5.draw = () => {
    const { mouseX, mouseY } = p5;
    p5.background("#353535");
    p5.ellipse(mouseX, mouseY, 30, 30);

    const offset = 10;

    for (let i = 0; i < dots.length; i++) {
      const distance = dots[i].distance(p5, mouseX, mouseY);
      const onRange = distance - dots[i].radius < offset;

      if (onRange) dots[i].increaseRadius(p5);

      if (!dots[i].isDead) dots[i].update(p5);
      else dots.splice(i, 1);
    }

    console.log(dots);
  };

  p5.mousePressed = () => {
    const dot = new Burst(p5.mouseX, p5.mouseY, 5, 5);
    dots.push(dot);
  };
};
