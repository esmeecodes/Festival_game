class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      500,
      200,
      100,
      150,
      "./images/car.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // about 60frames per second screen refresh
  }

  start() {
    // set the height + width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // change the visibility of the start screen
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    // console.log("in the game loop");
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    // console.log(`updating game`);
    this.player.move();

    // move obstacles
    this.obstacles.map((obstacle) => {
      obstacle.move();

      // check for collision
      if (this.player.didCollide(obstacle)) {
        // remove the obstacle from the array
        const index = this.obstacles.indexOf(obstacle);
        this.obstacles.splice(index, 1);
        obstacle.element.remove();

        this.lives--;
        console.log(`lives: ${this.lives}`);
      } else if (obstacle.top > this.height) {
        const index = this.obstacles.indexOf(obstacle);
        this.obstacles.splice(index, 1);
        obstacle.element.remove();
        this.score++;
      }
    });

    if (this.lives === 0) {
      this.endGame();
    }

    // create obstacles
    if (Math.random() > 0.99 && this.obstacles.length < 1) {
      console.log("new obstacle");
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.map((obstacle) => {
      obstacle.element.remove();
    });
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
