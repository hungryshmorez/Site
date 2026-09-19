// Client-side video detail component for Trippy.me
document.addEventListener('DOMContentLoaded', function() {
  initVideoDetail();
});

function initVideoDetail() {
  // Find video containers on the page
  const videoContainers = document.querySelectorAll('.video-container');
  
  videoContainers.forEach(container => {
    // Apply psychedelic effects to video title
    const title = container.querySelector('.video-title');
    if (title) {
      title.classList.add('psychedelic-text');
      applyTitleEffects(title);
    }
    
    // Add hover effects to video frame
    const videoFrame = container.querySelector('.video-frame');
    if (videoFrame) {
      applyVideoFrameEffects(videoFrame);
    }
    
    // Add animated effects to tags
    const tags = container.querySelectorAll('.tag');
    tags.forEach(tag => {
      applyTagEffects(tag);
    });
  });
  
  // Apply effects to related video cards
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    applyVideoCardEffects(card);
  });
}

function applyTitleEffects(title) {
  // Enhanced psychedelic text effect
  title.addEventListener('mouseover', function() {
    this.style.animation = 'none';
    this.style.textShadow = '0 0 10px #ff61d8, 0 0 20px #ff61d8, 0 0 30px #ff61d8';
    
    setTimeout(() => {
      this.style.animation = 'psychedelic 15s infinite alternate';
    }, 300);
  });
  
  title.addEventListener('mouseout', function() {
    this.style.animation = 'psychedelic 15s infinite alternate';
  });
}

function applyVideoFrameEffects(videoFrame) {
  // Create a wrapper for the video frame
  const wrapper = document.createElement('div');
  wrapper.className = 'video-frame-wrapper';
  wrapper.style.position = 'relative';
  wrapper.style.borderRadius = '8px';
  wrapper.style.overflow = 'hidden';
  wrapper.style.transition = 'box-shadow 0.3s ease';
  
  // Create the glow effect overlay
  const glowOverlay = document.createElement('div');
  glowOverlay.className = 'video-glow-effect';
  glowOverlay.style.position = 'absolute';
  glowOverlay.style.top = '0';
  glowOverlay.style.left = '0';
  glowOverlay.style.width = '100%';
  glowOverlay.style.height = '100%';
  glowOverlay.style.background = 'linear-gradient(135deg, rgba(255,97,216,0.1) 0%, rgba(145,70,255,0.1) 50%, rgba(125,255,167,0.1) 100%)';
  glowOverlay.style.opacity = '0';
  glowOverlay.style.transition = 'opacity 0.3s ease';
  glowOverlay.style.pointerEvents = 'none';
  glowOverlay.style.zIndex = '1';
  
  // Replace the video frame with our wrapper
  videoFrame.parentNode.insertBefore(wrapper, videoFrame);
  wrapper.appendChild(videoFrame);
  wrapper.appendChild(glowOverlay);
  
  // Add hover effects
  wrapper.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 0 15px rgba(145, 70, 255, 0.5)';
    glowOverlay.style.opacity = '0.3';
  });
  
  wrapper.addEventListener('mouseleave', function() {
    this.style.boxShadow = 'none';
    glowOverlay.style.opacity = '0';
  });
}

function applyTagEffects(tag) {
  // Add hover effect to tags
  tag.style.transition = 'all 0.3s ease';
  
  tag.addEventListener('mouseenter', function() {
    this.style.backgroundColor = '#2a2a4e';
    this.style.transform = 'translateY(-2px)';
    this.style.boxShadow = '0 2px 8px rgba(152, 230, 0, 0.4)';
  });
  
  tag.addEventListener('mouseleave', function() {
    this.style.backgroundColor = '#1a1a2e';
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'none';
  });
}

function applyVideoCardEffects(card) {
  // Add enhanced hover effects to video cards
  card.addEventListener('mouseenter', function() {
    const overlay = this.querySelector('.card-overlay');
    if (overlay) {
      overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2) 70%, transparent)';
      overlay.style.height = '100%';
    }
    
    const title = this.querySelector('.card-title');
    if (title) {
      title.style.textShadow = '0 0 5px #98e600';
    }
    
    this.style.transform = 'translateY(-5px) scale(1.02)';
    this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
  });
  
  card.addEventListener('mouseleave', function() {
    const overlay = this.querySelector('.card-overlay');
    if (overlay) {
      overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)';
      overlay.style.height = 'auto';
    }
    
    const title = this.querySelector('.card-title');
    if (title) {
      title.style.textShadow = 'none';
    }
    
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = 'none';
  });
}