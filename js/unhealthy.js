class Unhealthy extends Component {
  constructor(gameScreen) {
    super(
      gameScreen,
      0,
      Math.floor(Math.random() * 300 + 70),
      50,
      75,
      "./images/beer.png"
    );
  }

  move() {
    this.left += 1;
    // console.log(`Moving unhealthy to right: ${this.left}`);
    this.updatePosition();
  }
}
