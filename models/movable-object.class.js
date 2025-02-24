class MovableObject extends DrawableObject {
  speed = 0.1;
  speedY = 0;
  accelartion = 2.5;
  energy = 100;
  coins = 0;
  bottle = 0;
  lastHit = 0;
  bottleHitEndboss = 100;
  world;
  coin_sound = createSound('audio/coin.mp3');
  bottle_sound = createSound('audio/collect3.mp3');
  bottle_sound_splash = createSound('audio/bottleSplash.mp3');
  gameOver_sound = createSound('audio/gameOver.mp3');
  jippie_sound = createSound('audio/jippie.mp3');
  ohNo_sound = createSound('audio/ohNo.mp3');
  splashPlayed = false;
  bottleHitCounted = false;
  hasStartedDeadAnimation = false;

  constructor() {
    super();
    this.gameOver_sound.volume = 0.5;
  }

  applyGravity() {
    return setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelartion;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return this.y < 360;
    } else {
      return this.y < 180;
    }
  }

  checkJumpAnimation() {
    if (this.isAboveGround()) {
      this.playAnimation(this.Images_Jumping);
      return true;
    }
    return false;
  }

  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
      this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom
    );
  }

  hit() {
    this.energy -= 5;
    restartSound(this.hitChicken_sound);
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  hitCoin(coin) {
    this.coins += 20;
    if (this.coins > 100) {
      this.coins = 100;
    }
    this.world.removeObject(coin);
    this.coin_sound.volume = 0.3;
    restartSound(this.coin_sound);
  }

  hitBottle(bottle) {
    this.bottle += 20;
    if (this.bottle > 100) {
      this.bottle = 100;
    }
    this.world.removeObject(bottle);
    restartSound(this.bottle_sound);
  }

  playAudioSegment(audio, start, duration) {
    audio.currentTime = start;
    play(audio);
    setTimeout(() => {
      audio.pause();
      audio.currentTime = start;
    }, duration * 1000);
  }

  hitEndboss(bottleThrown) {
    this.bottleHitEndboss -= 20;
    if (this.bottleHitEndboss < 0) {
      this.bottleHitEndboss = 0;
    }
    restartSound(this.ouch_sound);
    this.paused = true;
    setTimeout(() => {
      this.paused = false;
    }, 1000);
    if (bottleThrown && !bottleThrown.splashPlayed) {
      bottleThrown.splash();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  checkHurtAnimation() {
    if (this.isHurt()) {
      this.playAnimation(this.Images_Hurt);
      return true;
    }
    return false;
  }

  isDead() {
    if (this.bottleHitEndboss == 0 || this.energy == 0) {
      return true;
    }
  }

  checkDeadAnimation() {
    if (this.isDead() && !this.hasStartedDeadAnimation) {
      this.hasStartedDeadAnimation = true;
      clearInterval(this.checkBossStart);
      clearInterval(this.EndbossAnimationInterval);
      this.playDeadAnimation();
      setTimeout(() => {
        this.stopGame();
        this.playFinalSoundCharacter();
      }, 1000);
      setTimeout(() => {
        this.setGameOver();
      }, 2000);
      return true;
    }
    return false;
  }

  playDeadAnimation() {
    let deadFrame = 0;
    let deadAnimation = setInterval(() => {
      this.img = this.imageCache[this.Images_Dead[deadFrame]];
      deadFrame++;
      if (deadFrame >= this.Images_Dead.length) {
        clearInterval(deadAnimation);
      }
    }, 300);
  }

  stopGame() {
    intervalIds.forEach(clearInterval);
    if (this.world && this.world.character) {
      let character = this.world.character;

      if (character.walking_sound) {
        character.walking_sound.pause();
        character.walking_sound.currentTime = 0;
        character.isWalkingPlaying = false;
      }
    }
    background_sound.pause();
  }

  playFinalSoundCharacter() {
    if (this.bottleHitEndboss == 0) {
      restartSound(this.jippie_sound);
    }
    if (this.energy == 0) {
      restartSound(this.ohNo_sound);
    }
  }

  setGameOver() {
    if (this.energy == 0) {
      restartSound(this.gameOver_sound);
      this.world.lost = true;
    }
    this.world.gameOver = true;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveLeft() {
    this.x -= this.speed;
    if (this.x + this.width < 0) {
      this.x = this.world.level.level_end_x;
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveUpAndDown() {
    let direction = 1;
    let step = 1;
    let minY = 30;
    let maxY = 50;
    let UpAndDownInterval = setInterval(() => {
      this.y += direction * step;
      if (this.y <= minY) {
        this.y = minY;
        direction = 1;
      } else if (this.y >= maxY) {
        this.y = maxY;
        direction = -1;
      }
    }, 1000 / 60);
    intervalIds.push(UpAndDownInterval);
  }

  throw() {
    this.bottle -= 20;
    if (this.bottle < 100) {
      this.bottle = 0;
    }
    this.speedY = 30;
    this.gravityInterval = this.applyGravity();
    intervalIds.push(this.gravityInterval);
    this.throwHorizontal();
    this.checkBottleGroundLevel();
    this.checkReleaseX();
  }

  throwHorizontal() {
    if (this.otherDirection === true) {
      this.x -= 50;
    }
    this.moveXInterval = setInterval(() => {
      if (this.otherDirection === true) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
    }, 25);
    intervalIds.push(this.moveXInterval);
  }

  checkReleaseX() {
    this.sinkInterval = setInterval(() => {
      if (this.world.keyboard && !this.world.keyboard.X && this.isAboveGround() && !this.splashPlayed) {
        this.accelartion = 10;
      }
    }, 200);
    intervalIds.push(this.sinkInterval);
  }

  stopFlying() {
    clearInterval(this.moveXInterval);
    clearInterval(this.gravityInterval);
    clearInterval(this.checkGroundInterval);
  }
}
