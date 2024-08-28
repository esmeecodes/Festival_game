class Friend extends Component {
  constructor(gameScreen) {
    super(
      gameScreen,
      Math.floor(Math.random() * 1300 + 70),
      Math.floor(Math.random() * 700 + 70),
      110,
      110,
      `./images/h6.png`
    );
  }
}
