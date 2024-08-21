class Friend extends Component {
  constructor(gameScreen) {
    super(
      gameScreen,
      Math.floor(Math.random() * 1000 + 70),
      Math.floor(Math.random() * 1000 + 70),
      75,
      138,
      `./images/h6.png`
    );
  }
}
