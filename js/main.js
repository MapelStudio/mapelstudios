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

// ADD THIS RIGHT AFTER KALMAN FILTER - SIMPLER GESTURE HANDLER
AFRAME.registerComponent('drag-rotate-component', {
  schema: {},
  
  init: function () {
    this.isDragging = false;
    this.previousMouseX = 0;
    
    this.el.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMouseX = e.clientX;
    });
    
    this.el.addEventListener('touchstart', (e) => {
      this.isDragging = true;
      this.previousMouseX = e.touches[0].clientX;
    });
    
    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = e.clientX - this.previousMouseX;
        this.el.object3D.rotation.z += deltaX * 0.01;
        this.previousMouseX = e.clientX;
      }
    });
    
    window.addEventListener('touchmove', (e) => {
      if (this.isDragging) {
        const deltaX = e.touches[0].clientX - this.previousMouseX;
        this.el.object3D.rotation.z += deltaX * 0.01;
        this.previousMouseX = e.touches[0].clientX;
      }
    });
    
    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
    
    window.addEventListener('touchend', () => {
      this.isDragging = false;
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
  // Add this at the END of your DOMContentLoaded function, before the closing });

// Touch rotation for target 1 model
let isRotating = false;
let lastTouchX = 0;

targetEntity.addEventListener("targetFound", () => {
    scannerLayer.style.display = 'none';
    debugLog("3D Model Target Found");
    
    // Enable touch rotation
    const model = document.querySelector('#target a-gltf-model');
    
    model.addEventListener('touchstart', (e) => {
        isRotating = true;
        lastTouchX = e.touches[0].clientX;
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (isRotating && model) {
            const deltaX = e.touches[0].clientX - lastTouchX;
            model.object3D.rotation.z += deltaX * 0.01;
            lastTouchX = e.touches[0].clientX;
        }
    });
    
    document.addEventListener('touchend', () => {
        isRotating = false;
    });
});

});

