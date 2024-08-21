class Healthy extends Component {
  constructor(gameScreen) {
    const healthyItems = [
      "tent-pixel",
      "glitzerstation",
      "glasswater",
      "fruits",
    ];

    const randomHealthyItem =
      healthyItems[Math.floor(Math.random() * healthyItems.length)];

    super(
      gameScreen,
      Math.floor(Math.random() * 1000 + 70),
      Math.floor(Math.random() * 1000 + 70),
      80,
      80,
      `./images/${randomHealthyItem}.png`
    );
  }
}
