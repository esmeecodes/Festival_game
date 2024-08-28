class Mushroom extends Unhealthy {
  constructor(gameScreen) {
    super(gameScreen, "mushroom", "./images/mushroom.png");
  }

  move() {
    this.left += 3;
    this.updatePosition();
  }

  applyEffect(player) {
    console.log("player is tripping", player);
    player.isTripping = true;
    player.trippingPlayer();
  }
}
