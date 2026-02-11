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

// Touch rotation component - X-axis only
AFRAME.registerComponent('touch-rotate', {
  init: function() {
    this.rotating = false;
    this.lastX = 0;
    
    const canvas = document.querySelector('a-scene').canvas;
    
    canvas.addEventListener('touchstart', (e) => {
      // Check if touch is on the model
      const touch = e.touches[0];
      this.rotating = true;
      this.lastX = touch.clientX;
      e.preventDefault();
    }, { passive: false });
    
    canvas.addEventListener('touchmove', (e) => {
      if (this.rotating) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - this.lastX;
        
        // Rotate around Z-axis (appears as X-axis rotation when model is rotated 90°)
        this.el.object3D.rotation.z += deltaX * 0.005;
        
        this.lastX = touch.clientX;
        e.preventDefault();
      }
    }, { passive: false });
    
    canvas.addEventListener('touchend', () => {
      this.rotating = false;
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
        debugLog("✅ 3D Model Target Found - Swipe to rotate!");
    });
    
    targetEntity.addEventListener("targetLost", () => {
        scannerLayer.style.display = 'flex';
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
});
