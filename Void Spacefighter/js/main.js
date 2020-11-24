window.onload = function () {
    var config = {
        type: Phaser.AUTO,
        width: 400,
        height: 700,
        backgroundColor: '#000000',
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
            }
        },
        scene: [SceneMain]
    };
    game = new Phaser.Game(config);
}