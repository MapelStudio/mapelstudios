// Kalman filter component
AFRAME.registerComponent('kalman-smooth', {
  init: function() {
    this.kalmanPos = {
      x: { x: 0, p: 1, k: 0 },
      y: { x: 0, p: 1, k: 0 },
      z: { x: 0, p: 1, k: 0 }
    };
    this.Q = 0.01;
    this.R = 0.01;
  },
  
  tick: function() {
    const pos = this.el.object3D.position;
    
    ['x', 'y', 'z'].forEach(axis => {
      const k = this.kalmanPos[axis];
      k.p = k.p + this.Q;
      k.k = k.p / (k.p + this.R);
      k.x = k.x + k.k * (pos[axis] - k.x);
      k.p = (1 - k.k) * k.p;
      pos[axis] = k.x;
    });
  }
});

AFRAME.registerComponent('touch-rotate', {
  init: function() {
    this.lastX = 0;
    this.isMoving = false;
    
    // Bind listeners to the window to ensure we catch the touch anywhere
    window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            this.isMoving = true;
            this.lastX = e.touches[0].clientX;
            debugLog("Touch Started"); // This will show in your green debug box
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (!this.isMoving || e.touches.length === 0) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - this.lastX;
        
        // Since the model is rotated 90 on X, we rotate around its LOCAL Y 
        // to make it spin like a bottle.
        this.el.object3D.rotation.y += deltaX * 0.01;
        
        this.lastX = touch.clientX;
    });

    window.addEventListener('touchend', () => {
        this.isMoving = false;
        debugLog("Touch Ended");
    });
  }
});
// Debug function
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
    const target2Entity = document.getElementById('target2');
    const arVideo2 = document.getElementById('ar-video-2');
    
    debugLog("Initialized");
    
    if (!startBtn) {
        console.error("Could not find start-btn!");
        return;
    }
    
    startBtn.addEventListener('click', () => {
        debugLog("Button clicked! Starting AR...");
        
        uiLayer.style.display = 'none';
        
        const bgVideo = document.getElementById('bg-video');
        if (bgVideo) {
            bgVideo.pause();
            bgVideo.style.display = 'none';
        }
        
        scannerLayer.style.display = 'flex';
        iconLayer.style.display = 'flex';
        
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
            
            window.dispatchEvent(new Event('resize'));
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 500);
        }
    }
    
    // Target 1 - 3D Model
    targetEntity.addEventListener("targetFound", () => {
    scannerLayer.style.display = 'none';
    document.getElementById('horse-menu').style.display = 'flex'; // Show Menu
    debugLog("✅ Horse Found - Select Animation");
});

targetEntity.addEventListener("targetLost", () => {
    scannerLayer.style.display = 'flex';
    document.getElementById('horse-menu').style.display = 'none'; // Hide Menu
});
    
    // Target 2 - Video
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
  const btnRight = document.getElementById('btn-right');
const tutorialModal = document.getElementById('tutorial-modal');

if (btnRight) {
    btnRight.addEventListener('click', () => {
        debugLog("Opening Tutorial...");
        tutorialModal.style.display = 'flex';
        // If you have the changeSlide function, reset to slide 1
        if (typeof changeSlide === "function") changeSlide(1);
    });
}
  function playAnim(type) {
    const horse = document.querySelector('#horse-mesh');
    if (!horse) return;

    // Switch the model file based on which button was clicked
    if (type === 'idle') horse.setAttribute('gltf-model', '#horse-idle');
    if (type === 'walk') horse.setAttribute('gltf-model', '#horse-walk');
    if (type === 'run') horse.setAttribute('gltf-model', '#horse-run');
    if (type === 'eat') horse.setAttribute('gltf-model', '#horse-eat');

    debugLog("Switched to: " + type);
}
});
