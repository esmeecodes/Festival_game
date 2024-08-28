class Friend extends Component {
  constructor(gameScreen) {
    super(
      gameScreen,
      Math.floor(Math.random() * 1500 + 70),
      Math.floor(Math.random() * 800 + 70),
      110,
      110,
      `./images/h6.png`
    );
  }
}
