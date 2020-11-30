window.onload = function () {
    var config = {
        type: Phaser.AUTO,
        width: 400,
        height: 800,
        backgroundColor: '#000000',
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: [SceneMain]
    };
    game = new Phaser.Game(config);
}