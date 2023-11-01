
class insideMap {
    draw() {
        if (transitioning) {
            return
        }
        insideBackground.draw()
        indoorBoundaries.forEach(boundary => {
            boundary.draw()
        })
        insideObjects.forEach(boundary => {
            boundary.draw()
        })
        playerInside.draw()

        insideForeground.draw()
        let moving = true
        playerInside.moving = false

        if (keys.ArrowUp.pressed && lastKey == 'ArrowUp') {
            playerInside.moving = true
            playerInside.image = playerInside.sprites.up
            for (let i = 0; i < indoorBoundaries.length; i++) {
                const boundary = indoorBoundaries[i]
                if (rectangularCollision({
                    rectangle1: playerInside,
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
            for (let i = 0; i < insideObjects.length; i++) {
                const object = insideObjects[i]
                if (rectangularCollision({
                    rectangle1: playerInside,
                    rectangle2: {
                        ...object, position: {
                            x: object.position.x,
                            y: object.position.y + 2
                        }
                    }
                })) {
                    if (object.name == 'bed') {
                        isTextDisplayed = true
                        isBed = true
                        object.display()

                    } else {
                        moving = false
                        isTextDisplayed = true
                        isBed = false
                        object.display()
                        break
                    }

                } else {
                    isTextDisplayed = false
                }
            }

            if (moving && !isBed) {

                isTextDisplayed = false;
            }
            if (moving) {
                movables.forEach((movable) => {
                    movable.position.y += 2
                })
            }

        } else if (keys.ArrowDown.pressed && lastKey == 'ArrowDown') {
            playerInside.moving = true
            playerInside.image = playerInside.sprites.down
            for (let i = 0; i < indoorBoundaries.length; i++) {
                const boundary = indoorBoundaries[i]
                if (rectangularCollision({
                    rectangle1: playerInside,
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
            for (let i = 0; i < insideObjects.length; i++) {
                const object = insideObjects[i]
                if (rectangularCollision({
                    rectangle1: playerInside,
                    rectangle2: {
                        ...object, position: {
                            x: object.position.x,
                            y: object.position.y - 2
                        }
                    }
                })) {
                    if (object.name == 'bed') {
                        isTextDisplayed = true
                        isBed = true
                        object.display()

                    } else {
                        moving = false
                        isTextDisplayed = true
                        isBed = false
                        object.display()
                        break
                    }

                } else {
                    isTextDisplayed = false
                }
            }
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...doorToOutside, position: {
                        x: doorToOutside.position.x,
                        y: doorToOutside.position.y + 2
                    }
                }
            })) {
                transitioning = true

                gsap.to(('#transitionImage'), {
                    opacity: 1, duration: 1, onComplete: function () {
                        fade()
                        openingDoor.frames.val = openingDoor.frames.max - 1
                        characterLocation.location = false
                        playerInside.image = playerInside.sprites.up
                        transitioning = false
                        return
                    }
                })

            }
            if (moving && !isBed) {

                isTextDisplayed = false;
            }
            if (moving) {
                movables.forEach((movable) => {
                    movable.position.y -= 2
                })
            }
        } else if (keys.ArrowLeft.pressed && lastKey == 'ArrowLeft') {
            playerInside.moving = true
            playerInside.image = playerInside.sprites.left
            for (let i = 0; i < indoorBoundaries.length; i++) {
                const boundary = indoorBoundaries[i]
                if (rectangularCollision({
                    rectangle1: playerInside,
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
            for (let i = 0; i < insideObjects.length; i++) {
                const object = insideObjects[i]
                if (rectangularCollision({
                    rectangle1: playerInside,
                    rectangle2: {
                        ...object, position: {
                            x: object.position.x + 2,
                            y: object.position.y
                        }
                    }
                })) {

                    if (object.name == 'bed') {
                        isTextDisplayed = true
                        isBed = true
                        object.display()

                    } else {
                        moving = false
                        isTextDisplayed = true
                        isBed = false
                        object.display()
                        break
                    }

                } else {
                    isTextDisplayed = false
                }
            }
            if (moving && !isBed) {

                isTextDisplayed = false;
            }
            if (moving) {
                movables.forEach((movable) => {
                    movable.position.x += 2
                })
            }
        } else if (keys.ArrowRight.pressed && lastKey == 'ArrowRight') {
            playerInside.moving = true
            playerInside.image = playerInside.sprites.right
            for (let i = 0; i < indoorBoundaries.length; i++) {
                const boundary = indoorBoundaries[i]
                if (rectangularCollision({
                    rectangle1: playerInside,
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
            for (let i = 0; i < insideObjects.length; i++) {
                const object = insideObjects[i]
                if (rectangularCollision({
                    rectangle1: playerInside,
                    rectangle2: {
                        ...object, position: {
                            x: object.position.x - 2,
                            y: object.position.y
                        }
                    }
                })) {

                    if (object.name == 'bed') {
                        isTextDisplayed = true
                        isBed = true
                        object.display()

                    } else {
                        moving = false
                        isTextDisplayed = true
                        isBed = false
                        object.display()
                        break
                    }

                } else {
                    isTextDisplayed = false
                }
            }
            if (moving && !isBed) {

                isTextDisplayed = false;
            }
            if (moving) {
                movables.forEach((movable) => {
                    movable.position.x -= 2
                })
            }
        }

        if (!moving) {
            playerInside.frames.val = 0
        }

        if (!isTextDisplayed) {
            document.querySelector('#textDiv').style.display = 'none';
            document.querySelector('#dialogueBox').innerHTML = "";
            document.querySelector('#largeBackground').style.display = 'none';
            document.querySelector('#pixeledImage').src = '';
            document.querySelector('#notebook').style.display = 'none';
            document.querySelector('#notebookDialogue').innerHTML = "";
            document.querySelector('#book').style.display = 'none';
            document.querySelector('#bookDialogue').innerHTML = '';
        }

    }
}
