/////// Audios
const foodSound = new Audio("images/EatingApple.wav");
const gameOverSound = new Audio("images/gameover.mp3");
const musicSound = new Audio("images/gameSound.mp3");

/////////variables //// fields ///////arrays
let inputDir = { x: 0, y: 0 };
var speed = 5;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [{ x: 15, y: 13 }];
let food = { x: 12, y: 8 };

/////// functions of game ////////////////////////

// main function
function main(currentTime) {
  window.requestAnimationFrame(main);

  if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = currentTime;
  gameEngine();
}

//////////// Collide game end function
function isCollide(sArr) {
  /// collision with  ownself
  for (let j = 1; j < snakeArr.length; j++) {
    if (sArr[j].x === sArr[0].x && sArr[j].y === sArr[0].y) {
      return true;
    }
  }
  /// collision into wall
  if (sArr[0].x >= 18 || sArr[0].x <= 0 || sArr[0].y >= 18 || sArr[0].y <= 0) {
    return true;
  }
  return false;
}

/////////////// Game Engine //////////////
function gameEngine() {
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game over. Press any key to play again!!!!!!");
    snakeArr = [{ x: 15, y: 13 }];
    musicSound.play();
    score = 0;
  }

  /// if food is eaten, score increment and regenerate food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiScoreVal) {
      hiScoreVal = score;
      localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
      highScoreBox.innerHTML = "Hi Score : " + hiScoreVal;
    }
    scoreBox.innerHTML = "Score : " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });

    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //// movement in snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  /////display snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("IMG");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.setAttribute("src", "images/head3.png");
      snakeElement.setAttribute("height", "25");
      snakeElement.setAttribute("width", "25");
      snakeElement.classList.add("head");
    } else {
      snakeElement.setAttribute("src", "images/body1.png");
      snakeElement.setAttribute("height", "25");
      snakeElement.setAttribute("width", "25");
      snakeElement.classList.add("snake");
    }

    board.appendChild(snakeElement);
  });

  ////// display food
  foodElement = document.createElement("IMG");
  foodElement.setAttribute("src", "images/apple.svg");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//// main logic
musicSound.play();
let hiScore = localStorage.getItem("hiScore");
if (hiScore === null) {
  hiScoreVal = 0;
  localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
} else {
  hiScoreVal = JSON.parse(hiScore);
  highScoreBox.innerHTML = "Hi Score : " + hiScore;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // start game on pressing any button

  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});

/////// Start file functions

document.getElementById("lvl").addEventListener("change", () => {
  var x = document.getElementById("lvl").value;
  speed = x;
});

// function speedFun() {}
