class Mushroom extends Unhealthy {
  constructor(gameScreen) {
    super(gameScreen, "mushroom", "./images/mushroom.png");
    this.speed = 2;
    this.direction = 1;
    this.swingAmplitude = 5;
    this.frequency = 0.04;
    this.time = 0;
  }

  move() {
    this.left += this.speed * this.direction;

    this.top += Math.sin(this.time) * this.swingAmplitude;
    this.time += this.frequency;

    this.updatePosition();
  }

  applyEffect(player) {
    console.log("player is tripping", player);
    player.isTripping = true;
    player.trippingPlayer();
  }
}
