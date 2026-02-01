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

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const uiLayer = document.getElementById('ui');
    const scannerLayer = document.getElementById('scanner-container');
    const iconLayer = document.getElementById('icon-layer');
    const sceneEl = document.getElementById('sceneEl');
    const targetEntity = document.getElementById('target');
    const target2Entity = document.getElementById('target2');
    const arVideo2 = document.getElementById('ar-video-2');

    // 1. Check if button exists to prevent errors
    if (!startBtn) {
        console.error("Could not find start-btn! Check your HTML id.");
        return;
    }

    startBtn.addEventListener('click', () => {
        console.log("Button clicked! Starting AR..."); // Check your console for this!

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
        console.log("3D Model Target Found");
    });

    targetEntity.addEventListener("targetLost", () => {
        scannerLayer.style.display = 'flex';
    });
    // Listener for the second target
target2Entity.addEventListener("targetFound", () => {
    scannerLayer.style.display = 'none';
    
    // Set the source and play
    arVideo2.setAttribute('src', 'assets/video1.mp4'); 
    arVideo2.load(); // Important to refresh the video data
    arVideo2.play();
});

target2Entity.addEventListener("targetLost", () => {
    scannerLayer.style.display = 'flex';
    arVideo2.pause();
    arVideo2.currentTime = 0; // Reset for next time
});
});
