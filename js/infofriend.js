class Infofriend extends Component {
  constructor(gameScreen) {
    const infoLocation = [
      //   { name: "turmbuhne", top: 650, left: 50 },
      { name: "palapa", top: 490, left: 690 },
      //   { name: "sonnendeck", top: 315, left: 680 },
    ];
    super(
      gameScreen,
      infoLocation[Math.floor(Math.random() * infoLocation.length)].left,
      infoLocation[Math.floor(Math.random() * infoLocation.length)].top,
      90,
      90,
      `./images/infofriend.png`
    );
  }
}
