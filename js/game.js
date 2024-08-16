class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.statsDisplay = document.getElementsByClassName("stats")[0];
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      500,
      180,
      130,
      120,
      "./images/player-left.png"
    );
    this.height = 1080;
    this.width = 1820;
    this.unhealthyItems = [];
    this.healthyItems = [];
    this.humans = [];
    this.maxHumans = 10;
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
    this.statsDisplay.style.display = "flex";

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
    this.unhealthyItems.map((unhealthy) => {
      unhealthy.move();

      // check for collision
      if (this.player.didCollide(unhealthy)) {
        // remove the obstacle from the array
        console.log("collision with unhealthy item");
        const index = this.unhealthyItems.indexOf(unhealthy);
        this.unhealthyItems.splice(index, 1);
        unhealthy.element.remove();

        this.lives--;
        console.log(`lives: ${this.lives}`);
        let lives = document.getElementById("lives");
        lives.innerHTML = `${this.lives}`;
      } else if (unhealthy.left > this.width) {
        const index = this.unhealthyItems.indexOf(unhealthy);
        this.unhealthyItems.splice(index, 1);
        unhealthy.element.remove();
        this.score++;
        let score = document.getElementById("score");
        score.innerHTML = `${this.score}`;
      }
    });

    this.healthyItems.map((healthy) => {
      healthy.move();

      if (this.player.didCollide(healthy)) {
        console.log("collision with healthy item");
        const index = this.healthyItems.indexOf(healthy);
        this.healthyItems.splice(index, 1);
        healthy.element.remove();
        this.lives++;
        let lives = document.getElementById("lives");
        lives.innerHTML = `${this.lives}`;
      }
    });

    this.humans.map((human) => {
      human.move();
      const collision = this.player.didCollide(human);
      if (collision.collided) {
        console.log("collision with human");
        this.player.left += collision.xCorrection;
        this.player.top += collision.yCorrection;
        this.player.updatePosition;
      }
    });

    if (this.lives === 0) {
      this.endGame();
    }

    // create obstacles & visitors
    if (Math.random() > 0.99 && this.unhealthyItems.length < 1) {
      console.log("new obstacle");
      this.unhealthyItems.push(new Unhealthy(this.gameScreen));
    }

    if (Math.random() > 0.99 && this.lives < 3) {
      console.log("new healthy item");
      this.healthyItems.push(new Healthy(this.gameScreen));
    }

    if (this.humans.length < this.maxHumans && Math.random() > 0.99) {
      this.placeHumanRandomly(50, 92);
    }
  }

  addHuman(human) {
    this.humans.push(human);
  }

  placeHumanRandomly(width, height) {
    let left, top, human;
    do {
      left = Math.floor(Math.random() * (this.width - width - 40));
      top = Math.floor(Math.random() * (this.height - height - 40));
      human = new Human(this, this.gameScreen, left, top, width, height);
    } while (human.isOverlappingAny());

    // If there is no overlap, add the human to the game
    this.addHuman(human);
  }

  endGame() {
    this.player.element.remove();
    this.unhealthyItems.map((unhealthy) => {
      unhealthy.element.remove();
    });
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
