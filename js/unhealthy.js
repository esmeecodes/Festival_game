class Unhealthy extends Component {
  constructor(gameScreen, type, imgSrc) {
    super(gameScreen, 0, Math.floor(Math.random() * 300 + 70), 70, 70, imgSrc);
    this.type = type;
  }

  move() {
    this.left += 1;
    this.updatePosition();
  }
}
