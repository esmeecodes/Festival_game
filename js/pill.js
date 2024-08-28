class Pill extends Unhealthy {
  constructor(gameScreen) {
    super(gameScreen, "pill", "./images/pill.png");
    this.speed = 2;
    this.direction = 1;
    this.swingAmplitude = 10;
    this.frequency = 0.05;
    this.time = 0;
  }

  move() {
    this.left += this.speed * this.direction;

    this.top += Math.sin(this.time) * this.swingAmplitude;
    this.time += this.frequency;

    this.updatePosition();
  }

  applyEffect(player) {
    player.isHigh = true;
    console.log("collision with pill, player is high", player);
  }
}
