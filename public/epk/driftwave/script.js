// --- Video Data ---
const videoLinks = [
    { title: "TRANSMISSION_08", id: "TPn_ZcazaEE" },
    { title: "TRANSMISSION_09", id: "NL1nSv63wOQ" },
    { title: "TRANSMISSION_10", id: "i-ehCBD_z1Y" },
    { title: "TRANSMISSION_01", id: "fzbivtXejNI" },
    { title: "TRANSMISSION_02", id: "SpRiEmMulhg" },
    { title: "TRANSMISSION_03", id: "94qI6WJeQSU" },
    { title: "TRANSMISSION_04", id: "GSrpDlrcHOg" },
    { title: "TRANSMISSION_05", id: "ykDQJXe5q8o" },
    { title: "TRANSMISSION_06", id: "nxga-0hJYgA" },
    { title: "TRANSMISSION_07", id: "a7iHkZFwbrU" },
    { title: "TRANSMISSION_11", id: "mBi4wykQZPc" }
];

// --- Populate Video Grid ---
const videoGrid = document.getElementById('video-grid');
if (videoGrid) {
    videoLinks.forEach((video) => {
        const container = document.createElement('div');
        container.className = 'video-container';
        
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${video.id}`;
        iframe.title = "YouTube video player";
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('allowfullscreen', '');
        
        container.appendChild(iframe);
        videoGrid.appendChild(container);
    });
}

// --- Glitch Text Effect for Title ---
const glitchElements = document.querySelectorAll('.glitch');
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';

function glitchText(element) {
    if (!element) return;
    const originalText = element.getAttribute('data-text');
    if (!originalText) return;

    let iterations = 0;
    
    // Clear any existing interval to prevent stacking logic issues
    if (element.dataset.glitchInterval) {
        clearInterval(parseInt(element.dataset.glitchInterval));
    }
    
    const interval = setInterval(() => {
        element.innerText = originalText
            .split('')
            .map((letter, index) => {
                if(index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        if(iterations >= originalText.length) {
            clearInterval(interval);
        }
        
        iterations += 1 / 3;
    }, 30);

    element.dataset.glitchInterval = interval;
}

// Initial glitch on load
setTimeout(() => {
    glitchElements.forEach(el => glitchText(el));
}, 500);

// Random glitch interval
setInterval(() => {
    if (glitchElements.length > 0) {
        const randomEl = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        glitchText(randomEl);
    }
}, 5000 + Math.random() * 5000);

// --- Scroll Observer for Fade In ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.content-block').forEach(block => {
    observer.observe(block);
});