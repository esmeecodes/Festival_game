class Mushroom extends Unhealthy {
  constructor(gameScreen) {
    super(gameScreen, "mushroom", "./images/mushroom.png");
  }

  move() {
    this.left += 1;
    this.updatePosition();
  }

  applyEffect(player) {
    if (player.didCollide(this)) {
      console.log("collision with mushroom");
    }
  }
}
