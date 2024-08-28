class Pill extends Unhealthy {
  constructor(gameScreen) {
    super(gameScreen, "pill", "./images/pill.png");
  }

  move() {
    this.left += 3;
    this.updatePosition();
  }

  applyEffect(player) {
    player.isHigh = true;
    console.log("collision with pill, player is high", player);
  }
}
