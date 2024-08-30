// Select DOM elements
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const playlist = document.getElementById('playlist');
const addBtn = document.getElementById('add-btn');
const songUrlInput = document.getElementById('song-url');
const songTitleInput = document.getElementById('song-title');

// Playlist array
let songs = [];
let currentIndex = 0;

// Add song to playlist
addBtn.addEventListener('click', () => {
    const songUrl = songUrlInput.value;
    const songTitle = songTitleInput.value;

    if (songUrl && songTitle) {
        songs.push({ url: songUrl, title: songTitle });
        renderPlaylist();
        songUrlInput.value = '';
        songTitleInput.value = '';
    } else {
        alert('Please enter both the song URL and title.');
    }
});

// Play song
playBtn.addEventListener('click', () => {
    audioPlayer.play();
});

// Pause song
pauseBtn.addEventListener('click', () => {
    audioPlayer.pause();
});

// Play next song
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
});

// Play previous song
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
});

// Play song from playlist
playlist.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === "LI") {
        const index = Array.from(e.target.parentNode.children).indexOf(e.target);
        currentIndex = index;
        playSong(currentIndex);
    }
});

// Function to play song by index
function playSong(index) {
    audioPlayer.src = songs[index].url;
    audioPlayer.play();
    highlightPlayingSong();
}

// Render playlist
function renderPlaylist() {
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
        const songItem = document.createElement('li');
        songItem.textContent = song.title;
        playlist.appendChild(songItem);
    });
}

// Highlight currently playing song
function highlightPlayingSong() {
    const playlistItems = playlist.children;
    for (let i = 0; i < playlistItems.length; i++) {
        playlistItems[i].style.backgroundColor = i === currentIndex ? '#d1e7ff' : '#fff';
    }
}
