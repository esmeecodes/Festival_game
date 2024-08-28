class Human extends Component {
  constructor(game, gameScreen, left, top, width, height) {
    const humanImages = ["h1", "h2", "h3", "h4", "h5"];

    const randomLook =
      humanImages[Math.floor(Math.random() * humanImages.length)];

    super(gameScreen, left, top, width, height, `./images/${randomLook}.png`);

    this.game = game;

    // console.log("Human aangemaakt", this);
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
    this.left += 2;

    this.updatePosition();
    console.log(`Moving human to right: ${this.left}`);
  }
}
