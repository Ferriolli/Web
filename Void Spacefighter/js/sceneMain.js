//Classe do laser e suas propriedades
class Laser extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'laser')
    }

    fire(x, y){
        this.body.reset(x, y)
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-600)
    }
}
//Classe do inimigo e suas propriedades
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

//Criacao do grupo que contem todos os inimigos spawnados
class EnemyGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 0,
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
//Criacao do grupo que contem todos os lasers disparados pelo jogador
class LaserGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 0,
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

//Funcao que spawna o inimigo
function spawnEnemy(){
    this.EnemyGroup.create(Phaser.Math.Between(15, 385), -10, 'enemy');
    this.EnemyGroup.setVelocityY(300);
}
//Classe principal
class SceneMain extends Phaser.Scene {
    constructor() {
        super('main');
        this.spaceship;
        this.LaserGroup;
        this.EnemyGroup;
        this.inputKeys;
        this.bigship;
    }

    preload() {
        //Carregando imagens e sons
        this.load.image('spaceship', 'images/spaceship.png');
        this.load.image('laser', 'images/bullet.png');
        this.load.image('enemy', 'images/enemy.png');
        this.load.audio('laserSound', ['audio/laser.mp3','audio/laser.ogg']);
        this.load.image('bigship', 'images/bigship.png')
    }
    create() {
        //Evento de tempo que spawna os inimigos conforme o delay
        this.time.addEvent({ delay: 500, callback: spawnEnemy, callbackScope: this, loop: true });

        //Instancias dos grupos
        this.LaserGroup = new LaserGroup(this);
        this.EnemyGroup = new EnemyGroup(this);

        //
        this.laserSound = this.sound.add('laserSound');

        //definição de variavel e texto da pontuação
        this.scr = 0;
        let style = { font: '20px Arial', fill: '#6090db' };
        this.scrTxt = this.add.text(10, 15, 'pontos: ' + this.scr, style);

        //Definição de controles
        this.arrow = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Chamando funções que adicionam componentes basicos ao jogo
        this.addShip();
        this.addEvents();
    }
    //Spawna a nave no jogo
    addShip(){
        const centerX = this.cameras.main.width / 2;
        const bottom = this.cameras.main.height;
        this.spaceship = this.physics.add.image(centerX, bottom - 360, 'spaceship');
        this.bigship = this.physics.add.image(centerX, bottom - 150, 'bigship');
    }

    //Adiciona controles ao jogo
    addEvents(){
        this.inputKeys = [
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        ];
    }

    //Funcao chamada para criar o laser na cena
    fireBullet(){
        this.LaserGroup.create(this.spaceship.x, this.spaceship.y - 30, 'laser')
        this.LaserGroup.setVelocityY(-600);
    }

    //Funcao chamada ao colidir o laser com o inimigo
    hit() {
        this.scr += 10;
        this.scrTxt.setText('pontos: ' + this.scr);
    }

    update() {
        //Verifica se a tecla espaço foi pressionada
        this.inputKeys.forEach(key => {
			if(Phaser.Input.Keyboard.JustDown(key)) {
                this.fireBullet();
                this.laserSound.play();
			}
        }); 

        //Definição de controles e movimentação do player
        if (this.arrow.right.isDown && this.spaceship.x < 385) {
            this.spaceship.x += 5;

        } else if (this.arrow.left.isDown && this.spaceship.x > 15) {
            this.spaceship.x -= 5;
        }

        //checa colisão entre o laser e o inimigo
        this.physics.world.collide(this.LaserGroup, this.EnemyGroup, function (laser, enemy) {
            //desabilita a fisica e a visibilidade do laser e do inimigo
            laser.disableBody(true);
            laser.setVisible(false);
            laser.setActive(false);
            enemy.disableBody(true);
            enemy.setVisible(false);
            enemy.setActive(false);
            //chama a função hit, que acresenta pontos e atualiza o texto
            this.hit();
        }, null, this)
        //checa colisao entre a nave do player e naves inimigas
        this.physics.world.collide(this.spaceship, this.EnemyGroup, function (spaceship, enemy) {
            //Desabilita a visibilidade e a fisica da nave que colidiu com o player
            enemy.disableBody(true);
            enemy.setVisible(false);
            enemy.setActive(false);
            //move a nave para baixo e para sua movimentação
            this.spaceship.setPosition(this.spaceship.x, this.spaceship.y + 7);
            this.spaceship.setVelocityY(0);
        }, null, this)

        //Checa colisao do player com a nave gigante
        if (this.physics.overlap(this.spaceship, this.bigship)) {
            this.scene.restart()
        }
    }
}