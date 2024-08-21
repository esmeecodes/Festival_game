window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game; // we need to declare this variable here so we can access it later
  const audio = new Audio("src/Kaufmann.mp3");
  // audio.play();

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function () {
    restartGame();
  });

  function restartGame() {
    location.reload();
  }

  const keydownHandler = function (event) {
    event.preventDefault();
    if (event.key === "ArrowLeft") {
      game.player.flipSprite(false);
      game.player.directionX = -2;
    }
    if (event.key === "ArrowRight") {
      game.player.flipSprite(true);
      game.player.directionX = 2;
    }
    if (event.key === "ArrowUp") {
      game.player.directionY = -2;
    }
    if (event.key === "ArrowDown") {
      game.player.directionY = 2;
    }
  };

  const keyUpHandler = function (event) {
    event.preventDefault();
    game.player.directionX = 0;
    game.player.directionY = 0;
  };

  window.addEventListener("keydown", keydownHandler);

  window.addEventListener("keyup", keyUpHandler);

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

  function generateRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  // Changes the color of the background using STYLE
  function changeBackgroundColor() {
    var colorBg = document.getElementById("color-overlay");
    colorBg.style.background = generateRandomColor();
  }

  function changeBackground() {
    changeBackgroundColor();
  }

  // Run this function every 300ms
  setInterval(changeBackground, 100);
};
