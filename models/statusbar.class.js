class Statusbar extends DrawableObject {
  showEndbossStatusbar = false;
  percentage = 100;
  percentageCoins = 0;
  percentageBottles = 0;
  percentageEndboss = 100;
  imgHealth;
  imgCoins;
  imgBottles;
  imgEndboss;

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

  Images_Endboss = [
    '../assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    '../assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    '../assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    '../assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    '../assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    '../assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
  ];

  constructor() {
    super();
    this.loadImages(this.Images_Coins);
    this.loadImages(this.Images_Health);
    this.loadImages(this.Images_Bottles);
    this.loadImages(this.Images_Endboss);
    this.setPercentage(100);
    this.setPercentageCoins(0);
    this.setPercentageBottles(0);
    this.setPercentageEndboss(100);
    this.x = 40;
    this.y = 0;
    this.width = 200;
    this.height = 60;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.Images_Health[this.resolveImageIndex(percentage)];
    this.imgHealth = this.imageCache[path];
  }

  setPercentageCoins(percentageCoins) {
    this.percentageCoins = percentageCoins;
    let pathCoins = this.Images_Coins[this.resolveImageIndex(percentageCoins)];
    this.imgCoins = this.imageCache[pathCoins];
  }

  setPercentageBottles(percentageBottles) {
    this.percentageBottles = percentageBottles;
    let pathBottles = this.Images_Bottles[this.resolveImageIndex(percentageBottles)];
    this.imgBottles = this.imageCache[pathBottles];
  }

  setPercentageEndboss(percentageEndboss) {
    this.percentageEndboss = percentageEndboss;
    let pathEndboss = this.Images_Endboss[this.resolveImageIndex(percentageEndboss)];
    this.imgEndboss = this.imageCache[pathEndboss];
  }

  resolveImageIndex(percentage) {
    if (percentage >= 100) {
      return 5;
    } else if (percentage >= 80) {
      return 4;
    } else if (percentage >= 60) {
      return 3;
    } else if (percentage >= 40) {
      return 2;
    } else if (percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }

  draw(ctx) {
    if (this.imgHealth) {
      ctx.drawImage(this.imgHealth, this.x, this.y, this.width, this.height);
    }
    if (this.imgCoins) {
      ctx.drawImage(this.imgCoins, this.x, this.y + 50, this.width, this.height);
    }
    if (this.imgBottles) {
      ctx.drawImage(this.imgBottles, this.x, this.y + 100, this.width, this.height);
    }
    if (this.showEndbossStatusbar && this.imgEndboss) {
      ctx.drawImage(this.imgEndboss, this.x + 370, this.y + 10, this.width + 100, this.height + 30);
    }
  }
}
