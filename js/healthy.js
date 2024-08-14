class Healthy extends Component {
  constructor(gameScreen) {
    super(
      gameScreen,
      0,
      Math.floor(Math.random() * 300 + 70),
      60,
      60,
      "./images/fruits.png"
    );
  }

  move() {
    this.left += 3;
    // console.log(`Moving healty to right: ${this.left}`);
    this.updatePosition();
  }
}
