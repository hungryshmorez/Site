document.addEventListener('DOMContentLoaded', () => {
    // === Loader ===
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // === Mobile Menu ===
    const menuBtn = document.getElementById('menu-btn');
    const menuItems = document.querySelector('.menu-items');
    
    menuBtn.addEventListener('click', () => {
        menuItems.classList.toggle('active');
        menuBtn.innerHTML = menuItems.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.menu-items a').forEach(link => {
        link.addEventListener('click', () => {
            menuItems.classList.remove('active');
            menuBtn.innerHTML = '☰';
        });
    });

    // === Audio Player ===
    const audio = document.getElementById('main-audio');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const trackTitle = document.getElementById('track-title');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const currTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    const vinyl = document.getElementById('record-spin');
    const playlistItems = document.querySelectorAll('.playlist-item');

    let isPlaying = false;
    let currentTrackIndex = 0;

    const tracks = Array.from(playlistItems).map(item => ({
        src: item.getAttribute('data-src'),
        title: item.getAttribute('data-title'),
        element: item
    }));

    // Initialize first track
    function loadTrack(index) {
        audio.src = tracks[index].src;
        trackTitle.textContent = tracks[index].title;
        
        // Update playlist visual state
        playlistItems.forEach(item => item.classList.remove('active'));
        tracks[index].element.classList.add('active');
        
        // Reset progress
        progressBar.style.width = '0%';
        currTimeDisplay.textContent = '0:00';
    }

    function playTrack() {
        audio.play().then(() => {
            isPlaying = true;
            playBtn.textContent = '⏸';
            vinyl.classList.add('spinning');
            // Update playlist icon
            tracks.forEach(t => t.element.querySelector('.track-play-icon').textContent = '▶');
            tracks[currentTrackIndex].element.querySelector('.track-play-icon').textContent = '⏸';
        }).catch(e => console.error("Playback error:", e));
    }

    function pauseTrack() {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = '▶';
        vinyl.classList.remove('spinning');
        // Update playlist icon
        tracks[currentTrackIndex].element.querySelector('.track-play-icon').textContent = '▶';
    }

    function togglePlay() {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    }

    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        playTrack();
    }

    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        playTrack();
    }

    // Event Listeners
    playBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);

    audio.addEventListener('timeupdate', (e) => {
        const { duration, currentTime } = e.srcElement;
        if (isNaN(duration)) return;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Format time
        const formatTime = (time) => {
            const min = Math.floor(time / 60);
            const sec = Math.floor(time % 60);
            return `${min}:${sec < 10 ? '0' : ''}${sec}`;
        };

        currTimeDisplay.textContent = formatTime(currentTime);
        durationDisplay.textContent = formatTime(duration);
    });

    audio.addEventListener('ended', nextTrack);

    // Click on progress bar
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });

    // Click on playlist item
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (currentTrackIndex === index && isPlaying) {
                pauseTrack();
            } else if (currentTrackIndex === index && !isPlaying) {
                playTrack();
            } else {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                playTrack();
            }
        });
    });

    // Initialize
    loadTrack(currentTrackIndex);

    // Initial Duration Load fix
    audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration;
        const min = Math.floor(duration / 60);
        const sec = Math.floor(duration % 60);
        durationDisplay.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    });

    // === Lightbox ===
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
});