class Laser extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'laser')
    }

    fire(x, y){
        this.body.reset(x, y)

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(- 600)
    }
}

class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'enemy')
    }

    spawn(x ,y){
        this.body.reset(x, y)
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(600)
    }

}

class EnemyGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 60,
            key: 'enemy',
            active: false,
            visible: false,
            classType: Enemy
        });
    }

    spawnEnemy(x, y){
        const enemy = this.getFirstDead(true);

        if (enemy){
            enemy.spawn(x, y);
        }
    }

}

class LaserGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 60,
            key: 'laser',
            active: false,
            visible: false,
            classType: Laser
        });
    }

    fireBullet(x, y){
        const laser = this.getFirstDead(true);

        if (laser){
            laser.fire(x, y);
        }
    }
}

function spawnEnemy(){
    this.EnemyGroup.spawnEnemy(Phaser.Math.Between(0, 400), -10);
}

class SceneMain extends Phaser.Scene {
    constructor() {
        super('main');
        this.spaceship;
        this.LaserGroup;
        this.EnemyGroup;
        this.inputKeys;
    }

    preload() {
        // carregando assets
        this.load.image('spaceship', 'images/spaceship.png');
        this.load.image('laser', 'images/bullet.png');
        this.load.image('enemy', 'images/enemy.png');
        console.log(game);
    }
    create() {
        var timedEvent;
        // adicionando assets na cena
        //this.player = this.physics.add.sprite(100, 100, 'spaceship');
        //game.physics.enable(this.spaceship, Phaser.Physics.ARCADE);
        timedEvent = this.time.addEvent({ delay: 1000, callback: spawnEnemy, callbackScope: this, loop: true });
        this.LaserGroup = new LaserGroup(this);
        this.EnemyGroup = new EnemyGroup(this);

        //adicionando score
        /*this.score = 0;
        let style = { font: '20px Arial', fill: '#fff' };
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);*/

        // adicionando interação pelo teclado
        this.arrow = this.input.keyboard.createCursorKeys();

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.addShip();
        this.addEvents();
    }

    addShip(){
        const centerX = this.cameras.main.width / 2;
        const bottom = this.cameras.main.height;
        //this.spaceship = this.physics.add.sprite(centerX, bottom - 90, 'spaceship');
        //this.physics.enable(this.spaceship, Phaser.Physics.ARCADE)
        this.spaceship = this.physics.add.image(centerX, bottom - 90, 'spaceship');
    }

    addEvents(){
        this.inputKeys = [
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        ];
    }

    fireBullet(){
        this.LaserGroup.fireBullet(this.spaceship.x, this.spaceship.y - 20);
    }

    spawnEnemy(){
        this.EnemyGroup.spawnEnemy(Phaser.Math.Between(0, 400), 0);
    }

    hit() {
        console.log('teste')
    }

    update() {

        this.inputKeys.forEach(key => {
			if(Phaser.Input.Keyboard.JustDown(key)) {
				this.fireBullet();
			}
        });
        
        // movimentações do player via setas teclado
        if (this.arrow.right.isDown) {
            // move para a direita
            this.spaceship.x += 5;
        } else if (this.arrow.left.isDown) {
            // move para a esquerda
            this.spaceship.x -= 5;
        }
        if (this.arrow.down.isDown) {
            // move para baixo
            this.spaceship.y += 5;
        } else if (this.arrow.up.isDown) {
            // move para cima
            this.spaceship.y -= 5;
        }
        // quando o player colide com a moeda, contabiliza o contato
        if (this.physics.overlap(this.spaceship, this.enemy)) {
            this.hit();
        }
    }
}