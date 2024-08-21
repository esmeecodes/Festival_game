class Beer extends Unhealthy {
  constructor(gameScreen) {
    super(gameScreen, "beer", "./images/beer.png");
  }

  move() {
    this.left += 1;
    this.updatePosition();
  }

  applyEffect(player) {
    console.log("collision with beer, player is drunk");
    player.isDrunk = true;
  }
}
