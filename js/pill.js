class Pill extends Unhealthy {
  constructor(gameScreen) {
    super(gameScreen, "pill", "./images/pill.png");
  }

  move() {
    this.left += 1;
    this.updatePosition();
  }

  applyEffect(player) {
    if (player.didCollide(this)) {
      console.log("collision with pill");
    }
  }
}
