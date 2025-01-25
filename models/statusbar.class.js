class Statusbar extends DrawableObject {
  Images_Health = [
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ];

  Images_Coins = [
    '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
  ];

  Images_Bottles = [
    '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];

  percentage = 100;
  percentageCoins = 0;
  percentageBottles = 0;

  imgHealth;
  imgCoins;
  imgBottles;

  constructor() {
    super();
    this.loadImages(this.Images_Coins);
    this.loadImages(this.Images_Health);
    this.loadImages(this.Images_Bottles);
    this.setPercentage(100);
    this.setPercentageCoins(0);
    this.setPercentageBottles(0);
    this.x = 40;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    console.log('Statusbar imageCache:', this.imageCache);
  }

  //setPercentage(50)
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.Images_Health[this.resolveImageIndex()];
    console.log('path is', path);
    this.imgHealth = this.imageCache[path];
  }

  //setPercentageCoins(50)
  setPercentageCoins(percentageCoins) {
    this.percentageCoins = percentageCoins;
    let pathCoins = this.Images_Coins[this.resolveImageIndexCoins()];
    console.log('pathCoins is', pathCoins);
    this.imgCoins = this.imageCache[pathCoins];
  }

  //setPercentageCoins(50)
  setPercentageBottles(percentageBottles) {
    this.percentageBottles = percentageBottles;
    let pathBottles = this.Images_Bottles[this.resolveImageIndexBottles()];
    console.log('pathBottles is', pathBottles);
    this.imgBottles = this.imageCache[pathBottles];
  }

  resolveImageIndexBottles() {
    if (this.percentageBottles >= 100) {
      return 5;
    } else if (this.percentageBottles >= 80) {
      return 4;
    } else if (this.percentageBottles >= 60) {
      return 3;
    } else if (this.percentageBottles >= 40) {
      return 2;
    } else if (this.percentageBottles >= 20) {
      return 1;
    } else if (this.percentageBottles == 0) {
      return 0;
    }
  }

  resolveImageIndexCoins() {
    if (this.percentageCoins >= 100) {
      return 5;
    } else if (this.percentageCoins >= 80) {
      return 4;
    } else if (this.percentageCoins >= 60) {
      return 3;
    } else if (this.percentageCoins >= 40) {
      return 2;
    } else if (this.percentageCoins >= 20) {
      return 1;
    } else if (this.percentageCoins == 0) {
      return 0;
    }
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
    } else if (this.percentage == 0) {
      return 0;
    }
  }

  draw(ctx) {
    if (this.imgHealth) {
      ctx.drawImage(this.imgHealth, this.x, this.y, this.width, this.height);
    }
    if (this.imgCoins) {
      // Positioniere die Münzen-Statusleiste unterhalb der Gesundheitsleiste
      ctx.drawImage(this.imgCoins, this.x, this.y + 50, this.width, this.height);
    }
    if (this.imgBottles) {
      // Positioniere die Münzen-Statusleiste unterhalb der Gesundheitsleiste
      ctx.drawImage(this.imgBottles, this.x, this.y + 100, this.width, this.height);
    }
  }
}
