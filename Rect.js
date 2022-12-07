class Rect {
  xPos;
  yPos;
  width;
  height;
  color;
  velocityX;
  velocityY;
  constructor(xPos, yPos, width, height, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  move(xPos, yPos) {
    this.clear();
    this.xPos = xPos;
    this.yPos = yPos;
    this.draw();
  }
  moveRelative(relativeX, relativeY) {
    this.clear();
    this.xPos += relativeX;
    this.yPos += relativeY;
    this.draw();
  }
  clear() {
    ctx.clearRect(
      this.xPos - 1,
      this.yPos - 1,
      this.width + 2,
      this.height + 2
    );
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
  }
  intersects(rect) {}
}
