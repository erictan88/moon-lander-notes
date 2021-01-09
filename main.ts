scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorLight0, function (sprite, location) {
    game.over(true, effects.confetti)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.score() >= 0) {
        Rocket.ay = -60
        info.changeScoreBy(-6)
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    game.over(false, effects.melt)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Rocket.vx = -25
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Rocket.vx = 25
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    if (info.score() >= 0) {
        Rocket.ay = -30
        info.changeScoreBy(-3)
    }
})
let Rocket: Sprite = null
Rocket = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . e e e . . . . . . 
    . . . . . . e e e e e . . . . . 
    . . . . . e 8 8 8 8 8 e . . . . 
    . . . . . e 8 8 9 9 9 e . . . . 
    . . . . . e 8 9 9 9 9 e . . . . 
    . . . . . e 9 9 9 9 9 e . . . . 
    . . . . . e e e e e e e . . . . 
    . . . . . e e c c c e e . . . . 
    . . . . e e . c c c . e e . . . 
    . . . . e . 5 2 2 2 5 . e . . . 
    . . . . e . 5 4 4 4 5 . e . . . 
    . . . e e . . 5 4 5 . . e e . . 
    e e e . . . . . 5 . . . . e e e 
    `, SpriteKind.Player)
Rocket.setPosition(120, 10)
scene.cameraFollowSprite(Rocket)
let wind_direction = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . 8 8 . . . . 
    . . . . . . . . . . . 8 8 . . . 
    . . . . . . . . . . . . 8 8 . . 
    . . . . . . . . . . . . . 8 8 . 
    . . . . . . . . . . . . . . 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    . . . . . . . . . . . . . . 8 8 
    . . . . . . . . . . . . . 8 8 . 
    . . . . . . . . . . . . 8 8 . . 
    . . . . . . . . . . . 8 8 . . . 
    . . . . . . . . . . 8 8 . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
wind_direction.setPosition(8, 8)
let wind_power = randint(-20, 20)
tiles.setTilemap(tiles.createTilemap(hex`0f000f00040404040404040404040404040404010101010107010101010701010101010101010101010101010101010101010107010101010107010101010101010101010101010101010101010107010101010101010701010101010101070101010101010101010101010101010101010701010101010101010101010101010101010101010107010101010101010101010101010101010101010701010101010101010701010101010101010101010101010101010101010105010101010105050101010101050505050606050505050505050606020303060606060303030303060606`, img`
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, [myTiles.transparency16,sprites.builtin.forestTiles10,sprites.dungeon.floorLight5,sprites.dungeon.floorLight2,sprites.dungeon.hazardHole,sprites.dungeon.hazardLava0,sprites.dungeon.floorLight0,myTiles.tile1], TileScale.Sixteen))
Rocket.setVelocity(0, 50)
wind_direction.say(wind_power)
info.setScore(200)
game.onUpdateInterval(100, function () {
    Rocket.ay = 10
    if (Rocket.isHittingTile(CollisionDirection.Bottom)) {
        Rocket.vx = 0
    } else {
        Rocket.vx = wind_power
    }
    wind_direction.y = -50 + Rocket.y
    wind_direction.x = Rocket.x
})
