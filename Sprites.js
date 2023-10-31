class Sprite {
    constructor({position, image, frames = {max: 1}, sprites}){
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}

        this.image.onload = () =>{
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites 
       
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
        if (!this.moving) {
            this.frames.val = 0
            return}
        if (this.frames.max >1) {
            this.frames.elapsed ++
        }
        if (this.frames.elapsed % 15 == 0){
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
       
        
    }
   
}


class Pokemon extends Sprite{
    constructor({image, position, frames = {max: 1}, sprites}){
        super({position:position, image:image, frames:frames, sprites:sprites})
        
        this.width = this.image.width*0.7
        this.height = this.image.height*0.7
        this.next = 'right'
        this.moving = true
       

    }
    update(){
        if (this.moving){
            if (this.frames.max >1) {
                this.frames.elapsed ++
            }
        
            if (this.next == 'right') {
                this.position.x+=1
                
                if (this.frames.elapsed % 15 == 0){
                    if (this.frames.val < this.frames.max - 1) this.frames.val++
                    else this.frames.val = 0
                }
                if (this.frames.elapsed %75 == 0) {
                    this.image = pokeUp
                    this.next = 'up'
                }
            } else if (this.next == 'up' ){
                this.position.y-=1
                
                if (this.frames.elapsed % 15 == 0){
                    if (this.frames.val < this.frames.max - 1) this.frames.val++
                    else this.frames.val = 0
                }
                if (this.frames.elapsed % 75 == 0) {
                    this.next = 'left'
                    this.image = pokeLeft
                }
            } else if (this.next == 'left'){
                this.position.x-=1
               
                if (this.frames.elapsed % 15 == 0){
                    if (this.frames.val < this.frames.max - 1) this.frames.val++
                    else this.frames.val = 0
                }
                if (this.frames.elapsed % 75 == 0) {
                    this.image=pokeDown
                    this.next = 'down'
                }
            } else if (this.next =='down'){
                this.position.y +=1
                
                if (this.frames.elapsed % 15 == 0){
                    if (this.frames.val < this.frames.max - 1) this.frames.val++
                    else this.frames.val = 0
                }
                if (this.frames.elapsed %75 == 0) {
                    this.image = pokeRight
                    this.next = 'right'
                }
            }
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

    sound(){
        const img = document.querySelector('#textBox')
       
        img.src = './img/speechBubble.png'
        
        img.onload = () =>{ 
            document.querySelector('#textDiv').style.display = 'block';
            document.querySelector('#dialogueBox').innerHTML = 'AZUUUUUUUU';
        }
    }

   
}

class Door extends Sprite{
    constructor({position, image, frames = {max: 1}, boundary}){
        super({position:position,image:image,frames:frames})
       
        this.boundary = boundary
        this.close = false
        this.justOpened = false
       
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

        this.boundary.draw()

        if (this.close){
            if (this.frames.val == this.frames.max-1) {
                return
            }
            if (this.frames.max >1) {
                this.frames.elapsed ++
            }
            
            if (this.frames.elapsed % 30 == 0){
                this.frames.val++
                this.justOpened = true
            }
            
        } else if (this.justOpened == true && this.close == false){
            if (this.frames.val == 0) {
                this.justOpened = false
                return
            }
            if (this.frames.max >1) {
                this.frames.elapsed ++
            }
            
            if (this.frames.elapsed % 30 == 0){
                this.frames.val--
                
            }
            
            
        }else{
            this.frames.val = 0
        }
        
       
        
    }

    
}