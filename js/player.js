class Player extends Component {
  constructor(game, gameScreen, top, left, width, height, imgSrc) {
    super(gameScreen, top, left, width, height, imgSrc);
    this.game = game;
    this.directionX = 0;
    this.directionY = 0;
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    // Ensure the player stays within the game screen
    // handles left hand side
    if (this.left < 10) {
      this.left = 10;
    }

    // handles top side
    if (this.top < 10) {
      this.top = 10;
    }

    // handles top
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.game.closedIn();
    }

    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }

    this.updatePosition();
  }

  flipSprite(flipped) {
    if (flipped) {
      this.element.src = "./images/player-right.png";
    } else {
      this.element.src = "./images/player-left.png";
    }
  }

  updatePosition() {
    this.element.style.left = this.left + "px";
    this.element.style.top = this.top + "px";
  }

  didCollide(something) {
    const playerIcon = this.element.getBoundingClientRect();
    const obstacle = something.element.getBoundingClientRect();

    let xCorrection = 0,
      yCorrection = 0;

    if (
      playerIcon.left < obstacle.right &&
      playerIcon.right > obstacle.left &&
      playerIcon.top < obstacle.bottom &&
      playerIcon.bottom > obstacle.top
    ) {
      const overlapX = Math.min(
        playerIcon.right - obstacle.left,
        obstacle.right - playerIcon.left
      );
      const overlapY = Math.min(
        playerIcon.bottom - obstacle.top,
        obstacle.bottom - playerIcon.top
      );

      if (overlapX < overlapY) {
        xCorrection = playerIcon.left < obstacle.left ? -overlapX : overlapX;
      } else {
        yCorrection = playerIcon.top < obstacle.top ? -overlapY : overlapY;
      }
      return { collided: true, xCorrection, yCorrection };
    } else {
      return false;
    }
  }
}
