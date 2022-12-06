export default class Object{
    xPos;
    yPos;
    width;
    height;
    color;
    constructor(xPos, yPos, width, height, color){
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(){
        ctx.clearX(this.xPos - 1, this.yPos - 1, this.width+2, this.height+2);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}