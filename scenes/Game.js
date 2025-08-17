// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("hello-world");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("Fondo", "./public/assets/Fondo-3.png");
  }

  create() {
    // create game objects
    this.add.image(400, 300, "Fondo");

    //CIRCULO!-------------------------------------------------------------
    let graphic = this.make.graphics({x: 0, y: 0, add: false});
    graphic.fillStyle(0x00FFFF, 1);
    graphic.fillCircle(10,10,10);
    graphic.generateTexture("pelota", 20,20);
    graphic.destroy();

    this.circle = this.physics.add.image(400,300,"pelota").setDepth(100).setCollideWorldBounds(true)
    this.circle.setBounce(1).setVelocity(0,200)

    //RECTANGULO!-------------------------------------------------------------
    let graphic2 = this.make.graphics({x: 0, y: 0, add: false});
    graphic2.fillStyle(0xFF00FF, 1);
    graphic2.fillRect(0,0,200,30);
    graphic2.generateTexture("rect", 200,20);
    graphic2.destroy();

    this.rectangle = this.physics.add.image(400,550,"rect").setDepth(100).setCollideWorldBounds(true)
    this.rectangle.setImmovable(true)

    
    //RECTANGULO   2-------------------------------------------------------------
    let graphic3 = this.make.graphics({x: 0, y: 0, add: false});
    graphic3.fillStyle(0xFFA500, 1);
    graphic3.fillRect(0,0,200,30);
    graphic3.generateTexture("rect2", 100,20);
    graphic3.destroy();
    
    this.rectangle2 = this.physics.add.image(70,100,"rect2").setDepth(100)
    this.rectangle2.setImmovable(true)
    
    //colliders!-.---------------------------------------------------------
    this.physics.add.collider(this.rectangle, this.circle, () => {
      let hitPos = this.circle.x;
      let paddleCenter = this.rectangle.x;
      let paddleWidth = 200;
      let maxBounceAngle = Phaser.Math.DegToRad(60);

      let relativeIntersect = (paddleCenter - hitPos);
      let normalizedIntersect = relativeIntersect / (paddleWidth/2);
      let bounceAngle = normalizedIntersect * maxBounceAngle;

      // velocidad de la bola
      let speed = this.circle.body.speed;

      // actualizar velocidades X e Y
      this.circle.setVelocityX(speed * -Math.sin(bounceAngle));
      this.circle.setVelocityY(speed * -Math.cos(bounceAngle));
    })
    this.physics.add.collider(this.rectangle2, this.circle, () => {
      this.rectangle2.destroy()
    })

    //MOVIMIENTO-------------------------------------------------------------
    this.wasd = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT
    })
  }

  update() {
    this.rectangle.setVelocity(0);

    let velocity = 150;
    // update game objects
    if(this.wasd.left.isDown){
      this.rectangle.setVelocity(-velocity,0);
    }
    if(this.wasd.right.isDown){
      this.rectangle.setVelocity(velocity,0);
    }
  }
}