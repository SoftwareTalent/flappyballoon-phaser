import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  init() {
    this.score = 0;
    this.lives = 3;
    this.delayAfterHit = true;
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0).setScale(2);
    this.add.image(10, 10, "bird").setOrigin(0).setScale(0.7).setDepth(1);
    
    this.txtLives =   this.add.text(60, 14, `${this.lives}`, {
      font: "20px Sans-serif",
      fill: "#ffffff",
    })
    .setDepth(2)
    .setOrigin(1, 0);

    this.wing_sound = this.sound.add("wing_sound");

    this.point_sound = this.sound.add("point_sound");

    this.hit_sound = this.sound.add("hit_sound");

    this.bird = this.physics.add.sprite(50, 100, "bird").setScale(1);
    this.bird.setCircle(15)
    this.bird.body.offset.x = 15
    this.bird.body.offset.y = 2
    this.bird.setGravityY(1000);

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.cursorKeys.space.on("down", () => {
      this.fly();
    });

    this.time.addEvent({
      delay: 1500,
      callback: this.addTubes,
      callbackScope: this,
      loop: true,
    });

    this.tubes = this.physics.add.group();

    this.livesPhysics = this.physics.add.group();

    this.gates = this.physics.add.group();

    this.physics.add.overlap(this.bird, this.gates, this.increaseScore);
    
    var self = this;
    this.physics.add.overlap(this.bird, this.livesPhysics, function(a, b){
      b.setActive(false).setVisible(false);
      b.destroy();
      self.hitLives();
    })
    this.labelScore = this.add.text(this.game.renderer.width / 2, 50, "0", {
      font: "25px Sans-serif",
      fill: "#ffffff",
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#000",
        blur: 3,
        stroke: false,
        fill: true,
      },
    });

    this.labelScore.setDepth(2);

    this.physics.add.overlap(this.bird, this.tubes, this.hitTube, null, this);
    
    
    // Fly if the user clicks on the screen.
    this.input.on("pointerdown", this.fly, this);

    this.anims.create({
      key: "fly",
      frameRate: 3,
      repeat: 0,
      frames: this.anims.generateFrameNumbers("bird", {
        frames: [0, 1, 2],
      }),
    });

    this.anims.create({
      key: "flyenemy",
      frameRate: 9,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("flyingbird", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      }),
    });
  }

  update() {
    if (this.bird.y < 0 || this.bird.y > 512) {
      this.gameOver();
      this.sound.add("die_sound").play();
    }

    if (this.bird.angle < 30) {
      this.bird.angle += 1;
    }
  }

  hitLives(){
    this.lives++;
    this.txtLives.setText(`${this.lives}`);
    this.point_sound.play();
  }

  hitTube() {
    if (this.bird.alive === false || this.delayAfterHit === false) {
      return;
    }
    this.hit_sound.play();

    if( this.lives <= 0){
      this.bird.alive = false;
      this.gameOver();
    }else{
      this.lives--;
      this.delayAfterHit = false;
      setTimeout(() => {
        this.delayAfterHit = true;
      }, 500);
      this.txtLives.setText(`${this.lives}`);
    }
    
  }

  fly() {
    this.wing_sound.play();

    this.bird.setVelocityY(-300);

    this.tweens.add({
      targets: this.bird,
      angle: -30,
      ease: "Linear",
      duration: 100,
      repeat: 0,
      yoyo: false,
    });

    this.bird.play("fly");
  }

  addTopTube(x, y) {
    const topPipe = this.physics.add
      .sprite(x, y, "top_tube")
      .setScale(2)
      .setOrigin(0, 1);

    this.tubes.add(topPipe);

    topPipe.setVelocityX(-200);
  }

  addLiveItem(x, y){
    const randValue = Math.random() ;
    if( randValue > 0.1) return; // percentage of generate live item
    console.log('added live item')
    const liveItem = this.physics.add
      .sprite(x, y, "liveitem")
      .setScale(0.1)
      

    this.livesPhysics.add(liveItem);

    liveItem.setVelocityX(-200);
  }

  addFlyingBird(x, y){
    const randValue = Math.random() ;
    if( randValue > 0.2) return; // percentage of generate flying bird
    console.log('added flying bird')
    const flyingbird = this.physics.add
      .sprite(x, y, "flyingbird")
      .setScale(0.5).setCircle(40)

    flyingbird.body.offset.y = 30
    flyingbird.body.offset.x = 30
    flyingbird.play("flyenemy");

    this.tubes.add(flyingbird);

    flyingbird.setVelocityX(-300);
  }

  addBottomTube(x, y) {
    const bottomPipe = this.physics.add
      .sprite(x, y, "bottom_tube")
      .setScale(2)
      .setOrigin(0, 0);

    this.tubes.add(bottomPipe);

    bottomPipe.setVelocityX(-200);
  }

  addTubes() {
    const hole = Math.floor(Math.random() * 5) + 1;

    this.addTopTube(288, hole * 50 + 20);

    this.addBottomTube(288, hole * 50 + 20 + 120);

    this.addLiveItem(Math.random() * 100 + 300, hole * 50 + 20 + 100*Math.random() - 100*Math.random())
    this.addFlyingBird(Math.random() * 100 + 300, hole * 50 + 20 + 200*Math.random() - 200*Math.random())

    this.time.addEvent({
      delay: 1500,
      callback: this.incrementScore,
      callbackScope: this,
      repeat: 0,
    });
  }

  incrementScore() {
    this.score += 1;
    this.labelScore.setText(this.score);

    this.point_sound.play();
  }

  gameOver() {
    this.scene.pause();
    this.scene.launch("GameOverScene", {
      prev: this.scene,
      currentScore: this.score,
    });
  }
}
