class Door {
    constructor({position, image, frames = {max: 1}, boundary}){
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.boundary = boundary
        this.image.onload = () =>{
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
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
            this.justOpened = true

            if (this.frames.val == this.frames.max-1) {
                return
            }
            if (this.frames.max >1) {
                this.frames.elapsed ++
            }
            
            if (this.frames.elapsed % 30 == 0){
                this.frames.val++
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
            
            
        } else {
            this.frames.val = 0
        }
        
       
        
    }

    
}