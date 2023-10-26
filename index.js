const canvas = document.querySelector('canvas')
const c =canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576 

const collisionsMap = []
for (let i = 0; i < collisions.length; i+=50){
    collisionsMap.push(collisions.slice(i, i + 50))
  

}

/* const oceanMap = []
for (let i = 0; i < land.length; i+=50){
    oceanMap.push(land.slice(i, i+50))
} */

class Boundary {

    constructor({position, width, height}){
        this.position = position
        this.width = width
        this.height = height
    }

    draw(){
        c.fillStyle = "rgba(255,0,0,0)"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
/* const waves = new Image()
waves.src = './img/tile.png'

class oceanTile {
    constructor({position, image, frames = {max:1}}){
        this.position = position
        this.image = image
        /* this.frames = {...frames, val: 0, elapsed: 0}

        this.image.onload = () =>{
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        } 
        
    }

    draw(){
         c.drawImage(this.image,
            this.frames.val * this.width,
            0,
            this.image.width/ this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height) 
    }
} */
const boundaries = []
//const oceans = []
const offset = {
    x: -450,
    y: -600
}

/* oceanMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 0){
            oceans.push(new oceanTile({position:{
                x: j * 48 + offset.x,
                y: i * 48 + offset.y
            }, image: waves, frames: {max:1}}))
        }
    })}) */

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 856){
        boundaries.push(new Boundary({position: {
            x: j * 48 +offset.x + 5,
            y: i * 48 + offset.y 
        }, width: 40, height: 40}))}
        else if (symbol == 1) {
        boundaries.push(new Boundary({position: {
            x: j * 48 +offset.x +7,
            y: i * 48 + offset.y 
        }, width: 2, height: 40}))}

        else if (symbol == 2) {
            boundaries.push(new Boundary({position: {
                x: j * 48 +offset.x +5,
                y: i * 48 + offset.y 
            }, width: 40, height: 2}))}
        else if (symbol == 3) {
        boundaries.push(new Boundary({position: {
            x: j * 48 +offset.x + 38,
            y: i * 48 + offset.y 
        }, width: 2, height: 40}))}
    })
})

class Pokemon {
    constructor({image, position}){
        this.position = position
        this.image = image
    }
    draw(){
       c.drawImage(this.image, this.position.x , this.position.y)
    }
}
const img = new Image()
img.src = './img/pokemon.png'

const foreGround = new Image()
foreGround.src = './img/foreground.png'

const azu = new Image()
azu.src = './img/asu.png'

const playerDown = new Image()
playerDown.src = './img/lev.png'

const playerRight = new Image()
playerRight.src = './img/right.png'

const playerLeft = new Image()
playerLeft.src = './img/left.png'

const playerUp = new Image()
playerUp.src = './img/up.png'

const player = new Sprite ({
    position: {
        x: canvas.width / 2 - 140 /4,
        y: canvas.height/2 - 68/4 - 100
    },
    image: playerDown,
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
        y: 650
    },
    image: azu
})

const background = new Sprite({position:{
    x:offset.x,
    y:offset.y
}, image: img})

const foreground = new Sprite({position:{
    x:offset.x,
    y:offset.y
}, image: foreGround})




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


const movables = [background, ...boundaries, foreground, poke]
function rectangularCollision ({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x  <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )

}
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })

    
    /* oceans.forEach(ocean => {
        ocean.draw()
    }) */
    poke.draw()
    player.draw()
  
    foreground.draw()
    let moving  =  true 
    player.moving = false
    if (keys.ArrowUp.pressed && lastKey=='ArrowUp'){
        player.moving = true
        player.image = player.sprites.up
        for(let i = 0; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2:{...boundary, position:{
                    x: boundary.position.x,
                    y: boundary.position.y +2
                }}
            })){
                console.log('colliding')
                moving = false
                break
            }
        } 
        if (moving){movables.forEach((movable)=>{
            movable.position.y +=2
        })}
        
    } else if (keys.ArrowDown.pressed && lastKey=='ArrowDown'){
        player.moving = true
        player.image = player.sprites.down
        for(let i = 0; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2:{...boundary, position:{
                    x: boundary.position.x,
                    y: boundary.position.y -2
                }}
            })){
                console.log('colliding')
                moving = false
                break
            }
        }
        if (moving){movables.forEach((movable)=>{
            movable.position.y -=2
        })}
    } else if (keys.ArrowLeft.pressed && lastKey=='ArrowLeft'){
        player.moving = true
        player.image = player.sprites.left
        for(let i = 0; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2:{...boundary, position:{
                    x: boundary.position.x +2,
                    y: boundary.position.y 
                }}
            })){
                console.log('colliding')
                moving = false
                break
            }
        }
        if (moving){movables.forEach((movable)=>{
            movable.position.x +=2
        })}
    } else if (keys.ArrowRight.pressed && lastKey=='ArrowRight'){
        player.moving = true
        player.image = player.sprites.right
        for(let i = 0; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2:{...boundary, position:{
                    x: boundary.position.x -2,
                    y: boundary.position.y 
                }}
            })){
                console.log('colliding')
                moving = false
                break
            }
        }
        if (moving){movables.forEach((movable)=>{
            movable.position.x -=2
        })}
    } 

    if (!moving) {
       player.frames.val = 0
    }

   
}

animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch (e.key){
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            lastKey = 'ArrowUp'
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            lastKey ='ArrowDown'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            lastKey ='ArrowLeft'
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            lastKey = 'ArrowRight'
            break
    }

})

window.addEventListener('keyup', (e) => {
    console.log(e.key)
    switch (e.key){
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


