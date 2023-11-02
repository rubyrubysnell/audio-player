// use DOM (Document Object Model) to get references to the UI, from the HTML
const playButton = document.getElementById("play-pause-button");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const seekBar = document.getElementById("seek-bar");
const volumeBar = document.getElementById("volume-bar")
const oblivion = document.getElementById("oblivion")
const worldPrincess = document.getElementById("world-princess")
const aem = document.getElementById("4aem")

let coverArt = document.getElementById("cover-art")
let containerColor = document.getElementById("master-container")
let audio = new Audio("audio/onlymp3.to - Grimes World Princess Part II-oQRcWRzq6Mw-192k-1698673113.mp3");
// seek state - are we seeking?
let seeking = false

// function for listening for play / pause button click
playButton.onclick = (event) => {
    if (audio.paused) {
        // calling the play method (built in function)
        audio.play();
    } else {
        // calling the pause method (built in function)
        audio.pause();
    }
}

// functions for changing the styling, cover art, the audio source when clicking on the song titles:

oblivion.onclick = (event) => {
    audio.src = "audio/Grimes - Oblivion (128kbps).mp3";
    coverArt.src = "images/visions.png"
    document.body.style.color = "white"
    containerColor.style.backgroundColor = "#7d4e65"
    if (audio.paused) {
        // calling the play method (built in function)
        audio.play();
    }
}

// CODE TO CHANGE THE HOVER DEPENDING ON STYLING THAT DOESN'T WORK

// oblivion.onmouseover = (event) => {
//     if (containerColor.style.backgroundColor == "#f8d0e4") {
//         oblivion.style.color = "#f03c2c"
//     } else if (containerColor.style.backgroundColor == "#7d4e65") {
//         oblivion.style.color = "#548068"
//     } else {
//         oblivion.style.color = "#6e959e"
//     }
// }

// oblivion.onmouseover = (event) => {
//     if (coverArt.src == "images/art-angels.png") {
//         oblivion.style.color = "#f03c2c"
//     } else if (coverArt.src == "images/visions.png") {
//         oblivion.style.color = "#548068"
//     } else {
//         oblivion.style.color = "#6e959e"
//     }
// }

// oblivion.onmouseleave = (event) => {
//     oblivion.style.color = "black"
// }

// END OF BROKEN CODE

worldPrincess.onclick = (event) => {
    audio.src = "audio/onlymp3.to - Grimes World Princess Part II-oQRcWRzq6Mw-192k-1698673113.mp3";
    coverArt.src = "images/art-angels.png"
    document.body.style.color = "black"
    containerColor.style.backgroundColor = "#f8d0e4"
    if (audio.paused) {
        // calling the play method (built in function)
        audio.play();
    }
}

aem.onclick = (event) => {
    audio.src = "audio/Grimes - 4ÆM (Audio) (128kbps).mp3";
    coverArt.src = "images/miss-anthro.jpg"
    document.body.style.color = "black"
    containerColor.style.backgroundColor = "#cacccd"
    if (audio.paused) {
        // calling the play method (built in function)
        audio.play();
    }
}

//audio object listeners

// event listeners are functions that are called when a certain event happens
// elements have specific event handler properties that can be found in the documentation. 
// e.g. "onplay" for the audio element
// when audio plays, change button icon to pause symbol
audio.onplay = (event) => {
    playButton.src = "images/pause.svg";
}

// when audio pauses, change button icon to play symbol
audio.onpause = (event) => {
    playButton.src = "images/play.svg";
}

// when audio metadata loads, update the time display to match
audio.onloadedmetadata = (event) => {
    currentTime.innerHTML = formatTime(0)
    totalTime.innerHTML = formatTime(audio.duration);
    // decimalised numbers don't work well with seekBar, so round down
    seekBar.max = Math.floor(audio.duration);
    seekBar.value = 0;
}

// enable the volumeBar seekBar once the audio is buffered and ready to play
audio.oncanplaythrough = (event) => {
    seekBar.disabled = false;
    volumeBar.disabled = false;
}

// as the time updates, update the time display and the seekBar to match
audio.ontimeupdate = (event) => {
    currentTime.innerHTML = formatTime(audio.currentTime);
    // shorter way of writing (seeking == false)
    if (!seeking) {
        // again, round the decimalised value down
        seekBar.value = Math.floor(audio.currentTime);
    }
}

//seekBar listeners

// oninput is triggered when the seekBar value is changed manually by the user
seekBar.oninput = (event) => {
    // seeking changes from false (default) to true, because the user is now seeking
    seeking = true;
}

// onchange is triggered when the seekBar value is committed, i.e. the user has finished changing it 
seekBar.onchange = (event) => {
    // match the current time display to the newly changed seekBar value
    audio.currentTime = seekBar.value;
    // if the audio is not paused, continue to play it from the new position
    if (!audio.paused) {
        audio.play();
    }
    // change seeking back to false - the user has committed the value so is no longer seeking
    seeking = false
}

//volumeBar listeners

// onchange is triggered when the volumeBar value is committed, i.e. the user has finished changing it 
volumeBar.onchange = (event) => {
    // match the volume value to the newly changed volumeBar value
    audio.volume = volumeBar.value / 100;
}

//HELPER FUNCTIONS

// time is automatically in seconds. this function converts it to a more readable format
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}