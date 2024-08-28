class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.statsDisplay = document.getElementsByClassName("stats")[0];
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this,
      this.gameScreen,
      800,
      300,
      92,
      92,
      "./images/player-left.png"
    );
    this.height = 911;
    this.width = 1400;
    this.startposition = { top: 300, left: 800 };
    this.unhealthyItems = [];
    this.healthyItems = [];
    this.humans = [];
    this.maxHumans = 30;
    this.friends = [];
    this.infofriends = [];
    this.maxInfofriends = 1;
    this.decorations = [];
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
    this.gameScreen.style.display = "flex";
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
        console.log(`oh no! consumed a ${unhealthy.type}`);
        const index = this.unhealthyItems.indexOf(unhealthy);
        this.unhealthyItems.splice(index, 1);
        unhealthy.element.remove();

        unhealthy.applyEffect(this.player);
        this.score += 50;
        this.lives--;
        console.log(`lives: ${this.lives}`);
        let lives = document.getElementById("lives");
        lives.innerHTML = `${this.lives}`;
      } else if (unhealthy.left > this.width) {
        const index = this.unhealthyItems.indexOf(unhealthy);
        this.unhealthyItems.splice(index, 1);
        unhealthy.element.remove();
        this.score += 100;
        let score = document.getElementById("score");
        score.innerHTML = `${this.score}`;
      }
    });

    this.healthyItems.map((healthy) => {
      if (this.player.didCollide(healthy)) {
        console.log("healing", this.player);
        this.player.resetEffects();
        const index = this.healthyItems.indexOf(healthy);
        this.healthyItems.splice(index, 1);
        healthy.element.remove();
        this.lives++;
        this.score += 50;

        let lives = document.getElementById("lives");
        lives.innerHTML = `${this.lives}`;
      }
    });

    this.humans.map((human) => {
      human.move();
      const collision = this.player.didCollide(human);
      if (collision.collided) {
        console.log("meeting other festival visitor");
        this.player.left += collision.xCorrection;
        this.player.top += collision.yCorrection;
        this.player.updatePosition;
      }
    });

    // this.decorations.map((decoration) => {
    //   decoration.move();
    // });

    this.friends.map((friend) => {
      if (this.player.didCollide(friend)) {
        console.log("found friend!");
        this.endGame("found");
      }
    });

    if (this.lives === 0) {
      this.endGame("lost");
    }

    // create obstacles & visitors
    if (Math.random() > 0.99 && this.unhealthyItems.length < 3) {
      // console.log("new obstacle");

      const unhealthyTypes = [Beer, Mushroom, Pill];

      const randomUnhealthy =
        unhealthyTypes[Math.floor(Math.random() * unhealthyTypes.length)];

      this.unhealthyItems.push(new randomUnhealthy(this.gameScreen));
    }

    if (Math.random() > 0.999 && this.lives < 3) {
      // console.log("new healthy item");
      let newHealthyItem = new Healthy(this.gameScreen);
      this.healthyItems.push(newHealthyItem);

      if (this.healthyItems.length > 2) {
        setTimeout(() => {
          if (this.healthyItems.length > 2) {
            const removedItem = this.healthyItems.shift();
            removedItem.element.remove();
            console.log("no healing done");
          }
        }, 10000);
      }
    }

    if (
      this.humans.length < 3 ||
      (this.humans.length < this.maxHumans && Math.random() > 0.99)
    ) {
      const humanTypes = ["h1", "h2", "h3", "h4", "h5", "h6", "h7"];
      this.placeHumanRandomly(50, 92);
    }

    // if (this.infofriends.length < 1 && Math.random() > 0.995) {
    //   this.infofriends.push(new Infofriend(this.gameScreen));
    //   console.log("Infofriend is in");
    // }

    if (this.friends.length < 1 && Math.random() > 0.9 && this.score >= 2500) {
      this.friends.push(new Friend(this.gameScreen));
      console.log("Friend is in sight!");

      if (this.friends.length === 1) {
        setTimeout(() => {
          if (this.friends.length === 1) {
            const removedFriend = this.friends.shift();
            removedFriend.element.remove();
            console.log("friend moved again");
          }
        }, 10000);
      }
    }

    // if (this.decorations < 3 && Math.random() > 0.9) {
    //   this.decorations.push(new Decoration(this.gameScreen));
    // }
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
  closedIn() {
    console.log("closed in by the people");
    this.lives -= 2;
    this.player.left = this.startposition.left;
    this.player.top = this.startposition.top;
    this.player.updatePosition();

    let lives = document.getElementById("lives");
    lives.innerHTML = `${this.lives}`;
  }
  endGame(reason) {
    this.player.element.remove();
    this.unhealthyItems.map((unhealthy) => {
      unhealthy.element.remove();
    });
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.statsDisplay.style.display = "none";

    const endGamePic = document.getElementById("end-image");

    if (reason === "lost") {
      endGamePic.src = "./images/game-over.png";
    } else if (reason === "found") {
      endGamePic.src = "./images/youwon.png";
    }

    this.gameEndScreen.style.display = "flex";
  }
}
