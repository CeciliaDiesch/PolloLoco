class Statusbar extends DrawableObject {
  Images_Coins = [
    '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.Images_Coins);
    this.setPercentage(100);
    this.x = 40;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    console.log('Statusbar imageCache:', this.imageCache);
  }

  //setPercentage(50)
  setPercentage(percentage) {
    this.percentage = percentage; // --> 0,1,...,5
    let path = this.Images_Coins[this.resolveImageIndex()];
    console.log('path is', path);
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else if (this.percentage > 0) {
      return 0;
    }
  }
}
