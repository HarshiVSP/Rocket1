var spaceship, spaceshipImg
var background1, background1Img
var gameover, gameoverImg
var restart, restartImg
var laser, laserImg, laserGroup
var PLAY = 1
var END = 0
var gamestate = PLAY
var uparrow1, uparrowImg
var downarrow1, downarrowImg

function preload() {
    spaceshipImg = loadImage("rocket.png")
    background1Img = loadImage("background.png")
    laserImg = loadImage("laser.png")
    restartImg = loadImage("restart.png")
    gameoverImg = loadImage("gameover.png")
    uparrowImg= loadImage("uparrow.png")
    downarrowImg= loadImage("downarrow.png")

}

function setup() {
    createCanvas(windowWidth, windowHeight)
    background1 = createSprite(50, 200, 50, 100)
    background1.addImage("background", background1Img)
    background1.scale = 1.8
    background1.velocityX = -3
    background1.x = -3
    spaceship = createSprite(width / 2, height / 2, 20, 20)
    spaceship.addImage("spaceship", spaceshipImg)
    spaceship.scale = 0.3
    gameover = createSprite(width / 2, height / 2, 20, 25)
    gameover.addImage("gameover", gameoverImg)
    gameover.scale = 0.2
    restart = createSprite(width / 2, height / 2 + 100, 15, 15)
    restart.addImage("restart", restartImg)
    restart.scale = 0.15
    uparrow1= createSprite(width/4-280, height-150,15,15)
    uparrow1.addImage("uparrow1",uparrowImg)
    uparrow1.scale=0.2
    downarrow1= createSprite(width/4-280, height-80,15,15)
    downarrow1.addImage("downarrow",downarrowImg)
    downarrow1.scale=0.2


    laserGroup = new Group()
}
function draw() {
    background("black")
    drawSprites()
    if (gamestate === PLAY) {
        gameover.visible = false
        restart.visible = false
        if (background1.x < 0) {
            background1.x = width / 2
        }
        if (keyDown("UP_ARROW")) {
            spaceship.y = spaceship.y - 5
        }


        if (keyDown("DOWN_ARROW")) {
            spaceship.y = spaceship.y + 5
        }

        spawnlasers()

        if (spaceship.isTouching(laserGroup)) {
            gamestate = END
        }
    }

    if (gamestate === END) {
        background1.visible = false
        spaceship.visible = false
        laserGroup.visible = false
        gameover.visible = true
        restart.visible = true
    }
    if (mousePressedOver(restart)) {
        reset()
    }
}

function spawnlasers() {
    if (frameCount % 90 === 0) {
        laser = createSprite(width / 2 + 900, height / 1.5, 10, 5)
        laser.addImage("laser", laserImg)
        laser.scale = 0.3
        laser.velocityX = (-3 * 6)
        laser.y = Math.round(random(1, 900))
        laserGroup.add(laser)
    }

}

function reset() {
    gamestate = PLAY
    spaceship.visible = true
    spaceship.x= width/2
    spaceship.y= height/2
    background1.visible = true
    laserGroup.visible = true
    gameover.visible = false
    restart.visible = false
}