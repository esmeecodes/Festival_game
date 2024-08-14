class Human extends Component {
  constructor(game, gameScreen, left, top, width, height) {
    super(gameScreen, left, top, width, height, "./images/pill.png");

    this.game = game;

    console.log("Human aangemaakt", this);
  }

  // Controleren of deze Human overlapt met andere Humans in de game
  isOverlappingAny() {
    return this.game.humans.some(
      (other) =>
        this !== other &&
        this.left < other.left + other.width &&
        this.left + this.width > other.left &&
        this.top < other.top + other.height &&
        this.top + this.height > other.top
    );
  }
  move() {
    this.left += 0.2;
    // console.log(`Moving unhealthy to right: ${this.left}`);
    this.updatePosition();
  }
}
