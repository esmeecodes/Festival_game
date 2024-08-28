class Decoration extends Component {
  constructor(gameScreen) {
    super(
      gameScreen,
      1800,
      Math.floor(Math.random() * 1000 + 70),
      180,
      180,
      `./images/rocket.png`
    );
  }

  move() {
    this.left -= 5;
    this.updatePosition();
  }
}
