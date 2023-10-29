class descriptiveObject {
    constructor({ position, width, height, text }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.text = text;
    }

    draw() {
        c.fillStyle = "rgba(255, 0,0,0)"
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    display() {
        document.querySelector('#textDiv').style.display = 'block';
        document.querySelector('#dialogueBox').innerHTML = this.text;
    }

}
