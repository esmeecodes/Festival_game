class Player extends Component {
  constructor(game, gameScreen, top, left, width, height, imgSrc) {
    super(gameScreen, top, left, width, height, imgSrc);
    this.game = game;
    this.directionX = 0;
    this.directionY = 0;
    this.isDrunk = false;
    this.isTripping = false;
    this.isHigh = false;
  }

  move() {
    const negativeEffect =
      this.isDrunk && this.isTripping
        ? -0.25
        : this.isDrunk && this.isHigh
        ? -4
        : this.isDrunk
        ? -0.5
        : this.isTripping
        ? 0.25
        : this.isTripping && this.isHigh
        ? 0.5
        : this.isHigh
        ? 12
        : 1;

    this.left += this.directionX * negativeEffect;
    this.top += this.directionY * negativeEffect;

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

  resetEffects() {
    console.log("resetting effects being called", this);
    this.isDrunk = false;
    this.isHigh = false;
    this.isTripping = false;
    this.trippingPlayer(false);
  }

  trippingPlayer() {
    if (this.isTripping === true) {
      this.element.style.transform = "scale(0.5)";
    } else {
      this.element.style.transform = "scale(1)";
    }
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
