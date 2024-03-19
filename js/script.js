window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game; // we need to declare this variable here so we can access it later

  startButton.addEventListener("click", function () {
    startGame();
  });

  const keydownHandler = function (event) {
    event.preventDefault();
    if (event.key === "ArrowLeft") {
      game.player.directionX = -1;
    }
    if (event.key === "ArrowRight") {
      game.player.directionX = 1;
    }
    if (event.key === "ArrowUp") {
      game.player.directionY = -1;
    }
    if (event.key === "ArrowDown") {
      game.player.directionY = 1;
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
};
