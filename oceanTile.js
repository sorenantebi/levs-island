class oceanTile {
    constructor({ position, image, frames = { max: 1 } }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };

    }

    draw() {

        c.drawImage(this.image,
            this.frames.val * (this.image.width / this.frames.max),
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x - 1,
            this.position.y - 1,
            this.image.width / this.frames.max + 2,
            this.image.height + 2);

        if (this.frames.max > 1) {
            this.frames.elapsed++;
        }
        if (this.frames.elapsed % 10 == 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
        }
    }
}
