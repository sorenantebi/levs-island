const canvas = document.querySelector('canvas')
const c =canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576 


const collisionsMapOutside = []
for (let i = 0; i < collisions.length; i+=50){
    collisionsMapOutside.push(collisions.slice(i, i + 50))
  

}
const collisionsMapInside = []
for (let i =0; i < indoorCollisions.length; i +=50){
    collisionsMapInside.push(indoorCollisions.slice(i,i+50))
}

const oceanMap = []
for (let i = 0; i < land.length; i+=50){
    oceanMap.push(land.slice(i, i+50))
} 

class Boundary {

    constructor({position, width, height}){
        this.position = position
        this.width = width
        this.height = height
    }

    draw(){
        c.fillStyle = "rgba(255, 0,0,0)"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
const waves = new Image()
waves.src = './img/tile.png'

class oceanTile {
    constructor({position, image, frames = {max:1}}){
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        
    }

    draw(){
       
        c.drawImage(this.image,
            this.frames.val * (this.image.width/this.frames.max),
            0,
            this.image.width/ this.frames.max,
            this.image.height,
            this.position.x -1,
            this.position.y -1,
            this.image.width / this.frames.max + 2,
            this.image.height +2)
        
        if (this.frames.max >1) {
            this.frames.elapsed ++
        }
        if (this.frames.elapsed % 10 == 0){
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        } 
    }
} 
const boundaries = []
const indoorBoundaries = []
const oceans = []
const offset = {
    x: -450,
    y: -600
}

oceanMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 0){
            oceans.push(new oceanTile({position:{
                x: j * 48 + offset.x,
                y: i * 48 + offset.y
            }, image: waves, frames: {max:14}}))
        }
    })})

collisionsMapOutside.forEach((row, i) => {
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

        else if (symbol == 4) {
            boundaries.push(new Boundary({position: {
                x: j * 48 +offset.x + 8,
                y: i * 48 + offset.y 
            }, width: 40, height: 2}))}
    })
})

collisionsMapInside.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 856){
        indoorBoundaries.push(new Boundary({position: {
            x: j * 48 +offset.x -255,
            y: i * 48 + offset.y -520
        }, width: 40, height: 40}))}
        if (symbol == 1){
            indoorBoundaries.push(new Boundary({position: {
                x: j * 48 +offset.x -245,
                y: i * 48 + offset.y -520
            }, width: 2, height: 40}))} 
        if (symbol == 2){
            indoorBoundaries.push(new Boundary({position: {
                x: j * 48 +offset.x -232,
                y: i * 48 + offset.y -520
            }, width: 2, height: 40}))}})})

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
        y: canvas.height/2 - 53/4 - 100
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

const playerInside = new Sprite ({
    position: {
        x: canvas.width / 2 - 140 /4,
        y: canvas.height/2 - 53/4 +5    
    },
    image: playerUp,
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
    y:offset.y +2
}, image: foreGround})

const insideImage = new Image()


insideImage.src = './img/inside.png'
const insideBackground = new Sprite ({position:{
    x:offset.x-260,
    y:offset.y-520  
}, image: insideImage}) 



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


const door = new Boundary({position: {
    x: 19 * 48 +offset.x,
    y: 13 * 48 + offset.y 
    
}, width: 40, height: 40})
const doorToOutside = new Boundary({position: {
    x: 25 * 48 +offset.x -260,
    y: 27 * 48 + offset.y -550
    
}, width: 40, height: 40})
const movables = [background, ...boundaries, foreground, poke, ...oceans, insideBackground, ...indoorBoundaries, door, doorToOutside]
function rectangularCollision ({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x  <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )

}
class outsideMap {
    draw(){
        background.draw()
   
        c.imageSmoothingEnabled = false
        oceans.forEach(ocean => {
            ocean.draw()
        }) 
        boundaries.forEach(boundary => {
            boundary.draw()
        })
        door.draw()
        
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
            if (rectangularCollision({
                rectangle1: player,
                rectangle2:{...door, position:{
                    x: door.position.x,
                    y: door.position.y +2
                }}
            })){
                
                characterLocation.location = true
                player.image = player.sprites.down
                return
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
}

const outside = new outsideMap()

const characterLocation = {
    location: false
}

class insideMap {
    draw(){
        insideBackground.draw()
        indoorBoundaries.forEach(boundary => {
            boundary.draw()
        })
        playerInside.draw()
          
        let moving  =  true 
        playerInside.moving = false
        if (keys.ArrowUp.pressed && lastKey=='ArrowUp'){
            playerInside.moving = true
            playerInside.image = playerInside.sprites.up
            for(let i = 0; i< indoorBoundaries.length; i++){
                const boundary = indoorBoundaries[i]
                if (rectangularCollision({
                    rectangle1: playerInside,
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
            playerInside.moving = true
            playerInside.image = playerInside.sprites.down
            for(let i = 0; i< indoorBoundaries.length; i++){
                const boundary = indoorBoundaries[i]
                if (rectangularCollision({
                    rectangle1: playerInside,
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
            if (rectangularCollision({
                rectangle1: player,
                rectangle2:{...doorToOutside, position:{
                    x: doorToOutside.position.x,
                    y: doorToOutside.position.y +2
                }}
            })){
                
                characterLocation.location = false
                playerInside.image = playerInside.sprites.up
                return
            }
            if (moving){movables.forEach((movable)=>{
                movable.position.y -=2
            })}
        } else if (keys.ArrowLeft.pressed && lastKey=='ArrowLeft'){
            playerInside.moving = true
            playerInside.image = playerInside.sprites.left
            for(let i = 0; i< indoorBoundaries.length; i++){
                const boundary = indoorBoundaries[i]
                if (rectangularCollision({
                    rectangle1: playerInside,
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
            playerInside.moving = true
            playerInside.image = playerInside.sprites.right
            for(let i = 0; i< indoorBoundaries.length; i++){
                const boundary = indoorBoundaries[i]
                if (rectangularCollision({
                    rectangle1: playerInside,
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
            playerInside.frames.val = 0
        }


    }
}
const inside = new insideMap()
function animate(){
    window.requestAnimationFrame(animate)


    if (characterLocation.location == false){
        outside.draw()
      
    }else if (characterLocation.location == true){
        inside.draw()
        
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

const myDiv = document.querySelector('#overlapping')
const imageElement = document.querySelector('#image')
let clicked = false
myDiv.addEventListener('click', () => {
    console.log('Div was clicked!');
    if (!clicked) {
        
        audio.Map.play()
        audio.loop = true
        imageElement.src = './img/speakerOn.png'
        clicked = true
    }
    else if (clicked){
        audio.Map.pause()
        imageElement.src = './img/speakerOff.png'
        clicked = false
    }
})

//add audio loop