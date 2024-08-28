class Beer extends Unhealthy {
  constructor(gameScreen) {
    super(gameScreen, "beer", "./images/beer.png");
  }

  move() {
    this.left += 3;
    this.updatePosition();
  }

  applyEffect(player) {
    console.log("collision with beer, player is drunk", player);
    player.isDrunk = true;
  }
}
