class Mushroom extends Unhealthy {
  constructor(gameScreen) {
    super(gameScreen, "mushroom", "./images/mushroom.png");
  }

  move() {
    this.left += 1.5;
    this.updatePosition();
  }

  applyEffect(player) {
    console.log("collision with mushroom, player is tripping");
    player.isTripping = true;
    player.trippingPlayer();
  }
}
