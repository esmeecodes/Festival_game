class Pill extends Unhealthy {
  constructor(gameScreen) {
    super(gameScreen, "pill", "./images/pill.png");
  }

  move() {
    this.left += 1;
    this.updatePosition();
  }

  applyEffect(player) {
    player.isHigh = true;
    console.log("collision with pill, player is high");
  }
}
