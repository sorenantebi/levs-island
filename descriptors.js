class descriptiveObject {
    constructor({ position, width, height, text, source, horizontal = false, speechBubble = false, book = false, name = '' }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.text = text;
        this.source = source
        this.horizontal = horizontal
        this.speechBubble = speechBubble
        this.book = book
        this.name = name
    }


    draw() {
        c.fillStyle = "rgba(255,0,0,0)"
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    display() {
        const img = document.querySelector('#textBox')
        if (this.speechBubble) {
            img.src = './img/speechBubble.png'
        } else {
            img.src = './img/textBox.png'
        }

        img.onload = () => {
            document.querySelector('#textDiv').style.display = 'block';
            document.querySelector('#dialogueBox').innerHTML = this.text;
        }

    }

}

class descriptiveObjectInside extends descriptiveObject {
    
    display() {
        const img = document.querySelector('#pixeledImage')
        img.src = this.source
        const img2 = document.querySelector('#largeBackground')
        if (this.horizontal) {
            img2.style.backgroundImage = 'url(./img/largeframeTurned.png)'
            img2.style.width = '533px'
            img2.style.height = '300px'
        } else {
            img2.style.backgroundImage = 'url(./img/largeFrame.png)'
            img2.style.width = '300px'
            img2.style.height = '400px'
        }
        img.onload = () => { img2.style.display = 'block'; }

    }

}

class notebookObject extends descriptiveObject {
    
    display() {
        document.querySelector('#notebook').style.display = 'block';
        document.querySelector('#notebookDialogue').innerHTML = this.text;
    }
}

class bookObject extends descriptiveObject {

    
    display() {
        document.querySelector('#book').style.display = 'block';
        document.querySelector('#bookDialogue').innerHTML = this.text;
    }
}