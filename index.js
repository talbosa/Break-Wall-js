const ctx = gameCanvas.getContext("2d");
let x = 280;
let y = 400;
let speedX = 0;
let speedY = -8;
let batX = 280;
let score = 0;
let timeAcceleration = 1;
let scoreAcceleration = 0;
let gameTimer = setInterval(mainLoop, 50);
let level = 1;
let brickNum = 0;
drawBricks();
// import { Obj } from "./Obj";
// let obj = new Obj(100,100,20,20,"#ffffff");
// document.onmousemove
document.onmousemove = function () {
  batX = window.event.clientX;
};

function mainLoop() {
  // obj.draw();
  clearInterval(gameTimer);
  gameTimer = setInterval(mainLoop, 50 - (timeAcceleration+scoreAcceleration));
  //clear prior position
  ctx.clearRect(x - 1, y - 1, 9, 9);
  x += speedX;
  y += speedY;
  checkForHits();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, 7, 7);
  //check for wall hits
  if (x > 620 || x < 0) speedX = -speedX;
  if (y < 28) speedY = 8;
  if (y > 480) {
    // gameOver();
    speedY = -8
  }
  //bat code
  ctx.clearRect(0, 460, 640, 20);
  ctx.fillStyle = "#cccccc";
  ctx.fillRect(batX - 60, 460, 120, 20);
  if (score >= document.cookie) {
    document.cookie = score;
  }
  timeAcceleration += 0.005;
  if (brickNum <= 0) {
    level += 1;
    drawBricks();
    x = 260;
    y = 400;
    speedX = 0;
    speedY = -8;
    scoreAcceleration = 0;
  }
}

function drawBricks() {
  for (let i = 0; i < 4 + level; i++) {
    for (let j = 0; j < 8; j++) {
      brickNum++;
      ctx.fillStyle = "#ff00" + (40 + i * 40).toString(16);
      ctx.fillRect(j * 80, 100 + i * 20, 79, 19);
    }
  }
}

function checkForHits() {
  const col = ctx.getImageData(x, y, 1, 1).data;
  if (y > 460 && Math.abs(batX - x) < 60) {
    speedY -= 8;
    speedX = Math.round(0.15 * (x - batX));
  } else if (col[3] != 0) {
    pingMp3.currentTime = 0;
    pingMp3.play();
    const x0 = 80 * Math.floor(x / 80);
    const y0 = 20 * Math.floor(y / 20);
    ctx.clearRect(x0, y0, 79, 19);
    console.log(1);
    speedY = speedY * -1;
    score++;
    ctx.fillRect(0, 0, 640, 20);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 2, 16);
    ctx.fillText(`Speed: ${Math.round(scoreAcceleration+timeAcceleration)}`, 200, 16);
    ctx.fillText(`Level: ${level}`, 400, 16);
    scoreAcceleration += 1;
    brickNum-=1;
  }
}

function gameOver() {
  clearInterval(gameTimer);
  ctx.font = "80px Arial";
  ctx.fillText("Game Over", 100, 250);
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 100, 300);
  ctx.fillText(`High Score: ${document.cookie}`, 250, 300);
  restartButton();
}

function restartButton() {
  if (
    confirm(
      `
        Game Over!
        Score: ${score}
        High Score: ${document.cookie}
        Restart?
        `
    )
  ) {
    restart();
  }
}

function restart() {
  location.reload();
}

//this is wip cookie store system for multiple cookies use the w3schools one instead
// function storeCookie(name, val){
//     cookies = (cookies+name+"="+val+";");
//     console.log(cookies);
//     document.cookie = cookies;
//     console.log(document.cookie);
//     // cookies.
// }
// function getCookie(){

// }
