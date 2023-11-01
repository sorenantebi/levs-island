
const audio = {
  Map: new Howl({
    src: './audio/BlankSpace.mp3',
    html5: true,
    volume: 0.5,
    loop: true
  })
}

const myDiv = document.querySelector('#overlapping')
const myOtherDiv = document.querySelector('#skip')
const imageElement = document.querySelector('#image')
let songIndex = 0
const songs = [
  './audio/YouAreInLove.mp3',
  './audio/LookWhatYouMadeMeDo.mp3',
  './audio/CruelSummer.mp3',
  './audio/ReadyForIt.mp3',
  './audio/BlankSpace.mp3',
  './audio/BadBlood.mp3',
  './audio/Style.mp3',
  './audio/AntiHero.mp3',
  './audio/OutOfTheWoods.mp3',
  './audio/Karma.mp3',
  './audio/IKnewYouWereTrouble.mp3',
  './audio/LoveStory.mp3',

]

let isPlaying = false;
function playRandomSong() {
  if (!isPlaying) {
    isPlaying = true;

    const randomSongIndex = Math.floor(Math.random() * songs.length);
    const randomSongURL = songs[randomSongIndex];

    if (audio.Map) {
      audio.Map.unload();
    }

    audio.Map = new Howl({
      src: randomSongURL,
      html5: true,
      volume: 0.5,
      onend: function () {
        isPlaying = false;
        playRandomSong();
      },
    });

    audio.Map.play();
  }
}

function playNextSong() {

  if (isPlaying && clicked) {

    audio.Map.stop()

    if (songIndex >= songs.length) {
      songIndex = 0
    }
    const songURL = songs[songIndex]
    songIndex += 1
    if (audio.Map) {
      audio.Map.unload();
    }

    audio.Map = new Howl({
      src: songURL,
      html5: true,
      volume: 0.5,
      onend: function () {
        isPlaying = false;
        playRandomSong();
      },
    });
    audio.Map.play()

  }
}
let clicked = false
let wasPaused = false

myDiv.addEventListener('click', () => {
  console.log('Div was clicked!');
  if (!clicked) {
    imageElement.src = './img/speakerOn.png'
    clicked = true
    if (wasPaused) {
      audio.Map.play()
    } else { playRandomSong() }


  }
  else if (clicked) {
    audio.Map.pause()
    imageElement.src = './img/speakerOff.png'
    clicked = false
    wasPaused = true
  }
})

myOtherDiv.addEventListener('click', () => {
  console.log('Div was clicked!');
  playNextSong()
})
