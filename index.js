const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

gsap.fromTo('#MAIN', { opacity: 0 }, {
    delay: 1, opacity: 1, duration: 1, onComplete: starting
})

function fadeOut() {
    gsap.to('#titlePage', {
        opacity: 0, duration: 2, delay: 0.5
    })
}
function starting() {
    gsap.fromTo('#titlePage', { opacity: 0 }, {
        opacity: 1, duration: 2, onComplete: fadeOut
    })
}




const collisionsMapOutside = []
for (let i = 0; i < collisions.length; i += 50) {
    collisionsMapOutside.push(collisions.slice(i, i + 50))
}

const collisionsMapInside = []
for (let i = 0; i < indoorCollisions.length; i += 50) {
    collisionsMapInside.push(indoorCollisions.slice(i, i + 50))
}

const oceanMap = []
for (let i = 0; i < land.length; i += 50) {
    oceanMap.push(land.slice(i, i + 50))
}



const offset = {
    out: {
        x: -450,
        y: -600
    },
    in: { x: 0, y: 0 }
}
offset.in.x = offset.out.x - 250
offset.in.y = offset.out.y - 520
////////////////////////////

const oceans = []
oceanMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 0) {
            oceans.push(new oceanTile({
                position: {
                    x: j * 48 + offset.out.x,
                    y: i * 48 + offset.out.y
                }, image: './img/tile.png', frames: { max: 14 }
            }))
        }
    })
})


/////////////////////////
const boundaries = []
collisionsMapOutside.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 856) {
            boundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.out.x + 5,
                    y: i * 48 + offset.out.y
                }, width: 40, height: 40
            }))
        }
        else if (symbol == 1) {
            boundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.out.x + 7,
                    y: i * 48 + offset.out.y
                }, width: 2, height: 40
            }))
        }
        else if (symbol == 2) {
            boundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.out.x + 5,
                    y: i * 48 + offset.out.y
                }, width: 40, height: 2
            }))
        }
        else if (symbol == 3) {
            boundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.out.x + 38,
                    y: i * 48 + offset.out.y
                }, width: 2, height: 40
            }))
        }
        else if (symbol == 4) {
            boundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.out.x + 8,
                    y: i * 48 + offset.out.y
                }, width: 40, height: 2
            }))
        }
    })
})

////////////////////////
const indoorBoundaries = []
collisionsMapInside.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 856) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x - 6,
                    y: i * 48 + offset.in.y
                }, width: 42, height: 40
            }))
        }
        if (symbol == 1) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x + 5,
                    y: i * 48 + offset.in.y
                }, width: 2, height: 40
            }))
        }
        if (symbol == 2) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x + 20,
                    y: i * 48 + offset.in.y
                }, width: 2, height: 40
            }))
        }
        if (symbol == 3) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x,
                    y: i * 48 + offset.in.y - 20
                }, width: 40, height: 2
            }))
        }
        if (symbol == 4) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x - 3,
                    y: i * 48 + offset.in.y
                }, width: 31, height: 2
            }))
        }
        if (symbol == 5) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x,
                    y: i * 48 + offset.in.y
                }, width: 50, height: 60
            }))
        }
        if (symbol == 6) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x - 22,
                    y: i * 48 + offset.in.y
                }, width: 50, height: 60
            }))
        }
        if (symbol == 7) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x - 20,
                    y: i * 48 + offset.in.y
                }, width: 40, height: 2
            }))
        }
        if (symbol == 8) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x - 5,
                    y: i * 48 + offset.in.y
                }, width: 38, height: 2
            }))
        }
        if (symbol == 9) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x - 15,
                    y: i * 48 + offset.in.y + 5
                }, width: 105, height: 75
            }))
        }
        if (symbol == 10) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x + 20,
                    y: i * 48 + offset.in.y
                }, width: 16, height: 40
            }))
        }
        if (symbol == 11) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x + 18,
                    y: i * 48 + offset.in.y + 2
                }, width: 40, height: 2
            }))
        }

        if (symbol == 12) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x + 18,
                    y: i * 48 + offset.in.y + 38
                }, width: 40, height: 2
            }))
        }
        if (symbol == 13) {
            indoorBoundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.in.x - 5,
                    y: i * 48 + offset.in.y
                }, width: 44, height: 40
            }))
        }
    })
})
//////////////////

class puzzlePiece extends descriptiveObject {
    constructor({ position, width, height, text, name = '', next, start }) {
        super(position = position, width = width, height = height, text = text, name = name)
        this.next = next
        this.start = start
    }
}
///////// poke sprites
const pokeDown = new Image()
pokeDown.src = './img/azuDown.png'
const pokeUp = new Image()
pokeUp.src = './img/azuUp.png'
const pokeLeft = new Image()
pokeLeft.src = './img/azuLeft.png'
const pokeRight = new Image()
pokeRight.src = './img/azuRight.png'

//////// player sprites
const playerDown = new Image()
playerDown.src = './img/lev.png'
const playerRight = new Image()
playerRight.src = './img/right.png'
const playerLeft = new Image()
playerLeft.src = './img/left.png'
const playerUp = new Image()
playerUp.src = './img/up.png'

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 140 / 4,
        y: canvas.height / 2 - 53 / 4 - 100
    },
    image: './img/lev.png',
    frames: {
        max: 4
    },
    sprites: {
        up: playerUp,
        down: playerDown,
        left: playerLeft,
        right: playerRight
    }

})

const playerInside = new Sprite({
    position: {
        x: canvas.width / 2 - 140 / 4,
        y: canvas.height / 2 - 53 / 4 + 5
    },
    image: './img/up.png',
    frames: {
        max: 4
    },
    sprites: {
        up: playerUp,
        down: playerDown,
        left: playerLeft,
        right: playerRight
    }

})

const poke = new Pokemon({
    position: {
        x: 450,
        y: 700
    },
    image: './img/azuDown.png', frames: { max: 2 },
    sprites: {
        up: pokeUp,
        down: pokeDown,
        left: pokeLeft,
        right: pokeRight
    }
})


/////// backgrounds and foregrounds
// outside 
const background = new Sprite({
    position: {
        x: offset.out.x,
        y: offset.out.y
    }, image: './img/pokemon.png'
})

const foreground = new Sprite({
    position: {
        x: offset.out.x,
        y: offset.out.y
    }, image: './img/foreground.png'
})

// inside 

const insideBackground = new Sprite({
    position: {
        x: offset.in.x - 10,
        y: offset.in.y
    }, image: './img/inside.png'
})

const insideForeground = new Sprite({
    position: {
        x: offset.in.x - 10,
        y: offset.in.y
    }, image: './img/foregroundInside.png'
})


////////////
// outside objects
const islandName = new descriptiveObject({
    position: {
        x: 17 * 48 + offset.out.x + 40,
        y: 20 * 48 + offset.out.y
    }, width: 1, height: 40, text: "Lev's Island"
})

const sign = new descriptiveObject({
    position: {
        x: 28 * 48 + offset.out.x + 5,
        y: 17 * 48 + offset.out.y - 45
    }, width: 40, height: 2, text: "The Field of Flowers <br>\u2740 \u273F"
})

const mailbox = new descriptiveObject({
    position: {
        x: 20 * 48 + offset.out.x + 10,
        y: 15 * 48 + offset.out.y
    }, width: 30, height: 2, text: "S + L <br>\u2665"
})

/////////
// inside objects
const fireplace = new descriptiveObject({
    position: {
        x: 32 * 48 + offset.in.x,
        y: 14 * 48 + offset.in.y
    }, width: 80, height: 41, text: "A Cozy Fireplace <br> \u2766 "
})

const tv = new descriptiveObject({
    position: {
        x: 33 * 48 + offset.in.x + 20,
        y: 22 * 48 + offset.in.y + 2
    }, width: 35, height: 1, text: "* click * <br> ... One Piece is playing! ...", speechBubble: true
})

const cooking = new descriptiveObject({
    position: {
        x: 17 * 48 + offset.in.x,
        y: 15 * 48 + offset.in.y
    }, width: 70, height: 5, text: "Im craving maccies...", speechBubble: true
})

const ramen = new descriptiveObject({
    position: {
        x: 25 * 48 + offset.in.x,
        y: 16 * 48 + offset.in.y + 5
    }, width: 25, height: 1, text: "I love ramen!", speechBubble: true
})

const phone = new descriptiveObject({
    position: {
        x: 24 * 48 + offset.in.x - 3,
        y: 16 * 48 + offset.in.y + 5
    }, width: 20, height: 1, text: "Levypvy's LP grind never stops! <br> Currently: 1925 elo", speechBubble: true
})

const bed = new descriptiveObject({
    position: {
        x: 21 * 48 + offset.in.x + 20,
        y: 25 * 48 + offset.in.y + 20
    }, width: 40, height: 60, name: 'bed', speechBubble: true, text: "I'm...so eepy..."
})

const notebook = new notebookObject({
    position: {
        x: 25 * 48 + offset.in.x,
        y: 21 * 48 + offset.in.y + 4
    }, width: 25, height: 37, text: "Things I like about Levia <br> <br> - smart <br> - funny <br> - hot <br> - everything"
})

const book = new bookObject({
    position: {
        x: 15 * 48 + offset.in.x + 5,
        y: 19 * 48 + offset.in.y + 38
    }, width: 30, height: 2, text: "Dear Levia, <br> you're the best. <br> I'll always be missing you <br> ~ soren \u2665"
})


// pictures 
const picture1 = new descriptiveObjectInside({
    position: {
        x: 26 * 48 + offset.in.x - 3,
        y: 21 * 48 + offset.in.y + 2
    }, width: 31, height: 1, source: './img/art3.png'

})

const picture2 = new descriptiveObjectInside({
    position: {
        x: 23 * 48 + offset.in.x - 3,
        y: 21 * 48 + offset.in.y + 2
    }, width: 31, height: 1, source: './img/art2.png'

})

const picture3 = new descriptiveObjectInside({
    position: {
        x: 35 * 48 + offset.in.x - 3,
        y: 22 * 48 + offset.in.y + 2
    }, width: 31, height: 1, source: './img/art.png'

})

const picture4 = new descriptiveObjectInside({
    position: {
        x: 30 * 48 + offset.in.x - 3,
        y: 14 * 48 + offset.in.y + 2
    }, width: 31, height: 1, source: './img/art4.png'

})

const picture5 = new descriptiveObjectInside({
    position: {
        x: 20 * 48 + offset.in.x - 3,
        y: 14 * 48 + offset.in.y + 2
    }, width: 80, height: 40, source: './img/art5.png', horizontal: true

})

const picture6 = new descriptiveObjectInside({
    position: {
        x: 21 * 48 + offset.in.x - 3,
        y: 21 * 48 + offset.in.y + 2
    }, width: 80, height: 1, source: './img/art6.png', horizontal: true

})

const bookshelf1 = new descriptiveObject({
    position: {
        x: 17 * 48 + offset.in.x,
        y: 20 * 48 + offset.in.y
    }, width: 80, height: 2, text: "Textbooks on how to \n cope with being \n extremely attractive"
})

const bookshelf2 = new descriptiveObject({
    position: {
        x: 13 * 48 + offset.in.x - 3,
        y: 20 * 48 + offset.in.y
    }, width: 75, height: 2, text: "Virology textbooks"
})

const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

// doors 
const door = new Boundary({
    position: {
        x: 19 * 48 + offset.out.x,
        y: 13 * 48 + offset.out.y

    }, width: 40, height: 50
})

const doorBoundary = new Boundary({
    position: {
        x: 19 * 48 + offset.out.x,
        y: 14 * 48 + offset.out.y
    }, width: 40, height: 40
})

const openingDoor = new Door({
    position: {
        x: 19 * 48 + offset.out.x,
        y: 14 * 48 + offset.out.y
    }, image: './img/door.png', frames: { max: 4 }, boundary: doorBoundary
})
const doorToOutside = new Boundary({
    position: {
        x: 25 * 48 + offset.in.x - 10,
        y: 27 * 48 + offset.in.y - 40

    }, width: 40, height: 40
})


const objects = [islandName, sign, mailbox]
const insideObjects = [picture1, picture2, picture3, picture4, picture5, picture6, bookshelf1, bookshelf2, fireplace, tv, ramen, phone, notebook, cooking, book, bed]
const movables = [background, ...boundaries, foreground, poke, ...oceans, insideBackground, ...indoorBoundaries, door, doorToOutside, openingDoor, ...objects, doorBoundary, insideForeground, ...insideObjects]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )

}


function fade() {
    gsap.to('#transitionImage', {
        opacity: 0, duration: 2, onComplete: function () {

        }
    })

}

const characterLocation = {
    location: false
}
let transitioning = false
let isTextDisplayed = false;


const outside = new outsideMap()

let isBed = false

const inside = new insideMap()
function animate() {
    window.requestAnimationFrame(animate)


    if (characterLocation.location == false) {

        outside.draw()

    } else if (characterLocation.location == true) {
        inside.draw()

    }



}
animate()



let lastKey = ''
window.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            lastKey = 'ArrowUp'
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            lastKey = 'ArrowDown'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            lastKey = 'ArrowLeft'
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            lastKey = 'ArrowRight'
            break

    }

})

window.addEventListener('keyup', (e) => {
    console.log(e.key)
    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = false

            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = false

            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false

            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false

            break
    }

})
