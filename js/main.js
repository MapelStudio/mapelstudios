// ADD THIS ENTIRE SECTION AT THE TOP OF YOUR FILE
AFRAME.registerComponent('kalman-smooth', {
  init: function() {
    this.kalmanPos = {
      x: { x: 0, p: 1, k: 0 },
      y: { x: 0, p: 1, k: 0 },
      z: { x: 0, p: 1, k: 0 }
    };
    this.Q = 0.01; // Process noise (lower = smoother)
    this.R = 0.01;  // Measurement noise (lower = more responsive)
  },
  
  tick: function() {
    const pos = this.el.object3D.position;
    
    ['x', 'y', 'z'].forEach(axis => {
      const k = this.kalmanPos[axis];
      
      // Prediction
      k.p = k.p + this.Q;
      
      // Update
      k.k = k.p / (k.p + this.R);
      k.x = k.x + k.k * (pos[axis] - k.x);
      k.p = (1 - k.k) * k.p;
      
      pos[axis] = k.x;
    });
  }
});

// Debug function for on-screen display
function debugLog(msg) {
    console.log(msg);
    const debugDiv = document.getElementById('debug');
    if (debugDiv) {
        debugDiv.innerHTML += msg + '<br>';
        debugDiv.scrollTop = debugDiv.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const uiLayer = document.getElementById('ui');
    const scannerLayer = document.getElementById('scanner-container');
    const iconLayer = document.getElementById('icon-layer');
    const sceneEl = document.getElementById('sceneEl');
    const targetEntity = document.getElementById('target');
    const target2Entity = document.getElementById('target2'); // ✅ ONLY DECLARE ONCE
    const arVideo2 = document.getElementById('ar-video-2');
    
    debugLog("target2Entity:", target2Entity); // Debug check
    
    // 1. Check if button exists to prevent errors
    if (!startBtn) {
        console.error("Could not find start-btn! Check your HTML id.");
        return;
    }
    
    startBtn.addEventListener('click', () => {
        debugLog("Button clicked! Starting AR...");
        // 2. Hide Landing UI
        uiLayer.style.display = 'none';
        
        const bgVideo = document.getElementById('bg-video');
        if (bgVideo) {
            bgVideo.pause();
            bgVideo.style.display = 'none';
        }
        // 3. Show AR UI
        scannerLayer.style.display = 'flex';
        iconLayer.style.display = 'flex';
        // 4. Start AR Engine
        if (sceneEl.hasLoaded) {
            startAR();
        } else {
            sceneEl.addEventListener('loaded', startAR);
        }
    });
    
    function startAR() {
        const arSystem = sceneEl.systems['mindar-image-system'];
        if (arSystem) {
            arSystem.start(); 
            
            // Fixes the 75% crop issue
            window.dispatchEvent(new Event('resize'));
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 500);
        }
    }
    
    // 5. 3D Model Event Listeners
    targetEntity.addEventListener("targetFound", () => {
        scannerLayer.style.display = 'none';
        debugLog("3D Model Target Found");
    });
    
    targetEntity.addEventListener("targetLost", () => {
        scannerLayer.style.display = 'flex';
    });
    
    // Listener for the second target
    target2Entity.addEventListener("targetFound", () => {
        debugLog("🎯 TARGET 2 FOUND!");
        scannerLayer.style.display = 'none';
        
        arVideo2.setAttribute('src', 'assets/video1.mp4'); 
        debugLog("📹 Video source set");
        arVideo2.load();
        arVideo2.play().then(() => {
            debugLog("✅ Video playing");
        }).catch(err => {
            console.error("❌ Video error:", err);
        });
    });
    
    target2Entity.addEventListener("targetLost", () => {
        scannerLayer.style.display = 'flex';
        arVideo2.pause();
        arVideo2.currentTime = 0;
    });
 // --- Tutorial System Logic ---

function changeSlide(slideIndex) {
    // Hide all slides
    document.querySelectorAll('.tutorial-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Update dots to show which page we are on
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === (slideIndex - 1));
    });

    // Show the requested slide
    const targetSlide = document.getElementById(`slide-${slideIndex}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
    }
}

// Function to smoothly hide the tutorial
function closeTutorial() {
    const modal = document.getElementById('tutorial-modal');
    if (modal) {
        modal.style.transition = 'opacity 0.4s ease';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    }
}

// Wait for the HTML to load, then attach the click events
window.addEventListener('DOMContentLoaded', () => {
    const xButton = document.getElementById('close-x');
    const startButton = document.getElementById('final-start');

    if (xButton) xButton.addEventListener('click', closeTutorial);
    if (startButton) startButton.addEventListener('click', closeTutorial);
});

});

