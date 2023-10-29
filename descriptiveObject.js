class descriptiveObject {
    constructor({ position, width, height, text, source }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.text = text;
        this.source = source
    }

    draw() {
        c.fillStyle = "black"
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    display() {
        document.querySelector('#textDiv').style.display = 'block';
        document.querySelector('#dialogueBox').innerHTML = this.text;
    }

}

class descriptiveObjectInside extends descriptiveObject {
    draw() {
        c.fillStyle = "blue"
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    display(){
        const img = document.querySelector('#pixeledImage')
        img.src = this.source 
        document.querySelector('#largeBackground').style.display = 'block';

    }
}
