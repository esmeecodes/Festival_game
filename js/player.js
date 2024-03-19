class Player {
  constructor(gameScreen, top, left, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";

    // Set up the default element's property values
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    // Ensure the player's car stays within the game screen
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
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }

    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = this.left + "px";
    this.element.style.top = this.top + "px";
  }

  didCollide(obstacle) {
    const playerCar = this.element.getBoundingClientRect();
    const obstacleCar = obstacle.element.getBoundingClientRect();

    if (
      playerCar.left < obstacleCar.right &&
      playerCar.right > obstacleCar.left &&
      playerCar.top < obstacleCar.bottom &&
      playerCar.bottom > obstacleCar.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
