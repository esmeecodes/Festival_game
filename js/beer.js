class Beer extends Unhealthy {
  constructor(gameScreen) {
    super(gameScreen, "beer", "./images/beer.png");
  }

  move() {
    this.left += 1;
    this.updatePosition();
  }

  applyEffect(player) {
    if (player.didCollide(this)) {
      console.log("collision with beer");
    }
  }
}
