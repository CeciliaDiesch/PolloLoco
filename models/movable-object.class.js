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
  coin_sound = new Audio('audio/coin.mp3');
  bottle_sound = new Audio('audio/collect.mp3');
  bottle_sound_splash = new Audio('audio/bottleSplash.mp3');
  gameOver_sound = new Audio('audio/gameOver.mp3');
  jippie_sound = new Audio('audio/jippie.mp3');
  ohNo_sound = new Audio('audio/ohNo.mp3');
  splashPlayed = false;
  bottleHitCounted = false;
  hasStartedDeadAnimation = false;

  constructor() {
    super();
  }

  applyGravity() {
    return setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        //speed Y wird ja positiv wenn man hoch springen will, was ja passiert, wenn man UP drückt
        this.y -= this.speedY;
        this.speedY -= this.accelartion;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return this.y < 360;
    } else {
      return this.y < 180; //gibt an, sobald pepe wieder bis auf ground level runtergefallen ist
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
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top && // Die untere Seite des ersten Objekts (Character) ist unterhalb der oberen Seite des zweiten Objekts (obj)
      // unter Berücksichtigung der Offsets. Unterhalb weil kleinere y werte oben sind und nach unten größer werden.
      this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom
    );
  }

  hit() {
    this.energy -= 5;
    this.hitChicken_sound.play();
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); //ms die seit dem 1.1.1970 vergangen sind
    }
  }

  hitCoin(coin) {
    this.coins += 20;
    if (this.coins > 100) {
      this.coins = 100;
    }
    this.world.removeObject(coin); //rufen eine Methode removeObject() auf der World-Instanz auf, um die Münze zu entfernen.
    this.coin_sound.volume = 0.3;
    this.coin_sound.play();
  }

  hitBottle(bottle) {
    this.bottle += 20;
    if (this.bottle > 100) {
      this.bottle = 100;
    }
    this.world.removeObject(bottle);
    this.playAudioSegment(this.bottle_sound, 0, 1);
  }

  hitEndboss(bottleThrown) {
    this.bottleHitEndboss -= 20;
    if (this.bottleHitEndboss < 0) {
      this.bottleHitEndboss = 0;
    }

    this.ouch_sound.play();
    console.log('endboss getroffen', this.bottleHitEndboss);
    this.paused = true;
    // Nach 1 Sekunde soll die Animation beendet werden und der Boss wieder weiterlaufen.
    setTimeout(() => {
      this.paused = false;
    }, 1000);
    if (bottleThrown && !bottleThrown.splashPlayed) {
      bottleThrown.splash();
    }
  }

  playAudioSegment(audio, start, duration) {
    audio.currentTime = start;
    audio.play();
    setTimeout(() => {
      audio.pause();
      audio.currentTime = start; // Optional: Setze den Startpunkt zurück
    }, duration * 1000); // Dauer in Sekunden
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms von aktueller Zeit zu der letzten gespeicherten Zeit beim Hit oder falls noch kein Hit war, dann 0
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 0.5; // wird als true zurück gegeben wenn differenz kleiner als 0.5 sekunden
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
      let deadFrame = 0;
      let deadAnimation = setInterval(() => {
        this.img = this.imageCache[this.Images_Dead[deadFrame]];
        deadFrame++;
        if (deadFrame >= this.Images_Dead.length) {
          clearInterval(deadAnimation);
        }
      }, 500);
      setTimeout(() => {
        this.stopGame();
      }, 2000);
      setTimeout(() => {
        if (this.bottleHitEndboss == 0) {
          this.jippie_sound.play();
        }
        if (this.energy == 0) {
          this.ohNo_sound.play();
          this.gameOver_sound.play();
        }
      }, 3000);
      return true;
    }
    return false;
  }

  stopGame() {
    intervalIds.forEach(clearInterval);
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; //% steht für Modulu, ist also der Restvom Images_walking Array, also 6, also let i=0 % 6 (zb i=5%6 ist 0 Rest 5, i=6%6 ist 1 Rest 0, i=7%6 ist 1 Rest 1) also ist i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2...
    let path = images[i];
    this.img = this.imageCache[path]; //Wir greifen auf einen Eintrag von unserem Array zu
    this.currentImage++;
  }

  moveLeft() {
    this.x -= this.speed;
    if (this.x + this.width < 0) {
      // Setze die x-Position auf level_end_x
      this.x = this.world.level.level_end_x;
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveUpAndDown() {
    let direction = 1; // 1 = nach unten, -1 = nach oben
    let step = 1; // Schrittgröße
    let minY = 30; // Minimaler y-Wert
    let maxY = 50; // Maximaler y-Wert
    setInterval(() => {
      this.y += direction * step;
      if (this.y <= minY) {
        this.y = minY;
        direction = 1; // Richtung ändern zu nach unten
      } else if (this.y >= maxY) {
        this.y = maxY;
        direction = -1; // Richtung ändern zu nach oben
      }
    }, 1000 / 60); // 60 Mal pro Sekunde für flüssige Bewegung
  }

  throw() {
    this.bottle -= 20;
    if (this.bottle < 100) {
      this.bottle = 0;
    }
    this.speedY = 30;
    this.gravityInterval = this.applyGravity(); //Starte die Gravitation und speichere die Interval-ID
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
    this.checkBottleGroundLevel();
    this.checkReleaseX();
  }

  checkReleaseX() {
    this.sinkInterval = setInterval(() => {
      if (this.world.keyboard && !this.world.keyboard.X && this.isAboveGround()) {
        console.log('x wurde losgelassen und Flasche fliegt runter');
        this.accelartion = 10;
      }
    }, 200);
  }

  stopFlying() {
    // Stoppe die horizontale Bewegung, Gravitation, Bodenkollisionsüberwachung
    clearInterval(this.moveXInterval);
    clearInterval(this.gravityInterval);
    clearInterval(this.checkGroundInterval);
    /*this.world.removeObject(this);*/ // Verwende direkt 'world.removeObject(this)'
    console.log('Flasche wurde aus der Welt entfernt.');
  }
}
