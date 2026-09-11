document.addEventListener('DOMContentLoaded', () => {
    // --- Audio Player Logic ---
    const musicContainer = document.querySelector('.player-container');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const audio = new Audio();
    const progress = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    const title = document.getElementById('track-title');
    const cover = document.getElementById('current-album-art');
    const currTime = document.getElementById('current-time');
    const durTime = document.getElementById('duration');
    const playlistUl = document.getElementById('playlist-ul');

    // Song List
    const songs = [
        {
            title: "Cowboys Don't Cry",
            src: "Cowboys don’t cry 2.mp3",
            duration: "3:42" // Approximate
        },
        {
            title: "Whiskey Revival",
            src: "Whiskey revival 2.mp3",
            duration: "3:42"
        },
        {
            title: "Amphetamines and Barroom Dreams",
            src: "Amphetamines and barroom dreams 2.mp3",
            duration: "3:28"
        },
        {
            title: "One for the Team",
            src: "One for the Team 2.mp3",
            duration: "3:55"
        },
        {
            title: "Bottled Up Regrets",
            src: "Bottled up regrets 2.mp3",
            duration: "4:01"
        }
    ];

    let songIndex = 0;

    // Load song details into DOM
    function loadSong(song) {
        title.innerText = song.title;
        audio.src = song.src;
        
        // Update playlist visual state
        const items = playlistUl.querySelectorAll('li');
        items.forEach((item, index) => {
            if(index === songIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Initialize Playlist UI
    function initPlaylist() {
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${song.title}</span>
                <span><i class="fas fa-play" style="font-size: 0.7em; margin-right: 5px; opacity: 0.5;"></i></span>
            `;
            li.addEventListener('click', () => {
                songIndex = index;
                loadSong(songs[songIndex]);
                playSong();
            });
            playlistUl.appendChild(li);
        });
        
        // Load initial song
        loadSong(songs[songIndex]);
    }

    function playSong() {
        musicContainer.classList.add('play');
        playBtn.querySelector('i').classList.remove('fa-play');
        playBtn.querySelector('i').classList.add('fa-pause');
        audio.play();
    }

    function pauseSong() {
        musicContainer.classList.remove('play');
        playBtn.querySelector('i').classList.add('fa-play');
        playBtn.querySelector('i').classList.remove('fa-pause');
        audio.pause();
    }

    function prevSong() {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }
        loadSong(songs[songIndex]);
        playSong();
    }

    function nextSong() {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }
        loadSong(songs[songIndex]);
        playSong();
    }

    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Update timestamps
        let cs = parseInt(currentTime % 60);
        let cm = parseInt((currentTime / 60) % 60);
        if (cs < 10) cs = "0" + cs;
        currTime.innerText = `${cm}:${cs}`;

        if(duration) {
            let ds = parseInt(duration % 60);
            let dm = parseInt((duration / 60) % 60);
            if (ds < 10) ds = "0" + ds;
            durTime.innerText = `${dm}:${ds}`;
        }
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    // Event Listeners
    playBtn.addEventListener('click', () => {
        const isPlaying = musicContainer.classList.contains('play');
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    progressContainer.addEventListener('click', setProgress);

    // Initialize
    initPlaylist();

    // --- Animation on Scroll ---
    const fadeElems = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElems.forEach(elem => {
        // Add basic CSS class for animation start state via JS to ensure graceful degradation if JS fails
        elem.style.opacity = "0";
        elem.style.transform = "translateY(20px)";
        elem.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        appearOnScroll.observe(elem);
    });

    // Helper for Intersection Observer animation
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .appear {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});