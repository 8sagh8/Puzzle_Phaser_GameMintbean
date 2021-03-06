export default class Tile extends Phaser.GameObjects.Container {
  constructor(scene, data, x, y, gameData) {
    const {
      tileSize,
      baseImage,
      loseLevel,
      winLevel,
      getIsGamePlaying,
      hidden,
      xIndex,
      yIndex,
      setTileClickable,
      getLives,
      setLives,
      setSurroundingTilesToClickable,
    } = data;
    let image = new Phaser.GameObjects.Sprite(scene, 0, 0, baseImage);
    let number = new Phaser.GameObjects.Text(
      scene,
      -8,
      -12,
      gameData[xIndex][yIndex].number === 0 || baseImage === 'bomb'
        ? null
        : gameData[xIndex][yIndex].number,
      { color: '#000', fontSize: '25px', fontStyle: 'bold' },
    );
    let topImage = new Phaser.GameObjects.Sprite(
      scene,
      0,
      0,
      baseImage === 'startTile' || baseImage === 'endTile' ? baseImage : hidden,
    );

    super(scene, x, y, [image, number, topImage]);
    this.baseImage = baseImage;
    this.xIndex = xIndex;
    this.yIndex = yIndex;
    this.image = image;
    this.number = number;
    this.number.style.color = '#000';
    this.topImage = topImage;
    this.scene = scene;
    this.tileSize = tileSize;
    this.image.displayWidth = tileSize;
    this.image.displayHeight = tileSize;
    this.topImage.displayWidth = tileSize;
    this.topImage.displayHeight = tileSize;
    this.topImage
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function (event) {
        let currentTile = gameData[xIndex][yIndex];
        if (currentTile.isTileClickable) {
          setSurroundingTilesToClickable(currentTile);
          if (getIsGamePlaying()) {
            setTileClickable(currentTile);
            topImage.setVisible(false);
          }
          if (baseImage === 'bomb') {
            setLives(getLives() - 1);
            if (getLives() === 0) {
              loseLevel(this.scene);
            }
          }
          if (baseImage === 'endTile') {
            winLevel(this.scene);
          }
        }
      });
    scene.add.existing(this);
  }

  setTileClickable = () => {
    if (this.baseImage !== 'startTile' && this.baseImage !== 'endTile') {
      this.topImage.setTexture('hiddenTileClickable');
    }
  };

  getXIndex = () => {
    return this.xIndex;
  };
  getYIndex = () => {
    return this.yIndex;
  };
}
