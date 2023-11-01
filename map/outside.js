
class outsideMap {
    draw() {
        if (transitioning) {
            return
        }
        background.draw()

        c.imageSmoothingEnabled = false

        boundaries.forEach(boundary => {
            boundary.draw()
        })
        objects.forEach(boundary => {
            boundary.draw()
        })
        oceans.forEach(ocean => {
            ocean.draw()
        })
        door.draw()
        openingDoor.draw()
        player.draw()
        foreground.draw()
        poke.draw()
        poke.update()
        let moving = true
        player.moving = false

        if (rectangularCollision({
            rectangle1: poke,
            rectangle2: {
                ...player, position: {
                    x: player.position.x,
                    y: player.position.y + 1
                }
            }
        }) || rectangularCollision({
            rectangle1: poke,
            rectangle2: {
                ...player, position: {
                    x: player.position.x,
                    y: player.position.y - 1
                }
            }
        }) || rectangularCollision({
            rectangle1: poke,
            rectangle2: {
                ...player, position: {
                    x: player.position.x + 1,
                    y: player.position.y
                }
            }
        }) || rectangularCollision({
            rectangle1: poke,
            rectangle2: {
                ...player, position: {
                    x: player.position.x - 1,
                    y: player.position.y
                }
            }
        })) {
            console.log('MESSAGE!');
            poke.moving = false;
        } else {
            //isTextDisplayed=false
            poke.moving = true;
        }
        if (keys.ArrowUp.pressed && lastKey == 'ArrowUp') {
            player.moving = true
            player.image = player.sprites.up
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 2
                        }
                    }
                })) {
                    console.log('colliding')
                    moving = false
                    break
                }
            }

            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...openingDoor.boundary, position: {
                        x: openingDoor.boundary.position.x,
                        y: openingDoor.boundary.position.y + 2
                    }
                }
            })) {

                openingDoor.close = true
            } else {
                openingDoor.close = false
            }
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...door, position: {
                        x: door.position.x,
                        y: door.position.y + 2
                    }
                }
            })) {
                transitioning = true

                gsap.to(('#transitionImage'), {
                    opacity: 1, duration: 1, onComplete: function () {
                        fade()

                        characterLocation.location = true
                        player.image = player.sprites.down
                        transitioning = false
                        return
                    }
                })

            }



            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...poke, position: {
                        x: poke.position.x,
                        y: poke.position.y + 10
                    }
                }
            })) {
                console.log('colliding with poke!')
                isTextDisplayed = true
                poke.sound()
                moving = false
            } else {
                isTextDisplayed = false
            }

            for (let i = 0; i < objects.length; i++) {
                const object = objects[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...object, position: {
                            x: object.position.x,
                            y: object.position.y + 2
                        }
                    }
                })) {

                    moving = false
                    isTextDisplayed = true
                    object.display()
                }
            }

            if (moving) {

                isTextDisplayed = false;
            }
            if (moving) {
                movables.forEach((movable) => {
                    movable.position.y += 2
                })
            }

        } else if (keys.ArrowDown.pressed && lastKey == 'ArrowDown') {
            openingDoor.close = false
            player.moving = true
            player.image = player.sprites.down
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 2
                        }
                    }
                })) {
                    console.log('colliding')
                    moving = false
                    break
                }
            }

            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...poke, position: {
                        x: poke.position.x,
                        y: poke.position.y - 10
                    }
                }
            })) {
                console.log('colliding with poke!')
                isTextDisplayed = true
                poke.sound()
                moving = false
            } else {
                isTextDisplayed = false
            }

            for (let i = 0; i < objects.length; i++) {
                const object = objects[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...object, position: {
                            x: object.position.x,
                            y: object.position.y - 2
                        }
                    }
                })) {

                    moving = false
                    isTextDisplayed = true
                    object.display()
                }
            }
            if (moving) {

                isTextDisplayed = false;
            }
            if (moving) {
                movables.forEach((movable) => {
                    movable.position.y -= 2
                })
            }
        } else if (keys.ArrowLeft.pressed && lastKey == 'ArrowLeft') {
            player.moving = true
            player.image = player.sprites.left
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x + 2,
                            y: boundary.position.y
                        }
                    }
                })) {
                    console.log('colliding')
                    moving = false
                    break
                }
            }

            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...poke, position: {
                        x: poke.position.x + 10,
                        y: poke.position.y
                    }
                }
            })) {
                console.log('colliding with poke!')
                isTextDisplayed = true
                poke.sound()
                moving = false
            } else {
                isTextDisplayed = false
            }
            for (let i = 0; i < objects.length; i++) {
                const object = objects[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...object, position: {
                            x: object.position.x + 2,
                            y: object.position.y
                        }
                    }
                })) {

                    moving = false
                    isTextDisplayed = true
                    object.display()
                }
            }
            if (moving) {

                isTextDisplayed = false;
            }
            if (moving) {
                movables.forEach((movable) => {
                    movable.position.x += 2
                })
            }
        } else if (keys.ArrowRight.pressed && lastKey == 'ArrowRight') {
            player.moving = true
            player.image = player.sprites.right
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x - 2,
                            y: boundary.position.y
                        }
                    }
                })) {
                    console.log('colliding')
                    moving = false
                    break
                }
            }

            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...poke, position: {
                        x: poke.position.x - 10,
                        y: poke.position.y
                    }
                }
            })) {
                console.log('colliding with poke!')
                isTextDisplayed = true
                poke.sound()
                moving = false
            } else {
                isTextDisplayed = false
            }
            for (let i = 0; i < objects.length; i++) {
                const object = objects[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...object, position: {
                            x: object.position.x - 2,
                            y: object.position.y
                        }
                    }
                })) {

                    moving = false
                    isTextDisplayed = true
                    object.display()
                }
            }
            if (moving) {

                isTextDisplayed = false;
            }

            if (moving) {
                movables.forEach((movable) => {
                    movable.position.x -= 2
                })
            }
        }

        if (!moving) {
            player.frames.val = 0

        }

        if (!isTextDisplayed) {
            document.querySelector('#textDiv').style.display = 'none';
            document.querySelector('#dialogueBox').innerHTML = "";
        }
    }
}

