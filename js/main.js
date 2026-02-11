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

// X-axis only rotation component
AFRAME.registerComponent('gesture-handler', {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.3 },
    maxScale: { default: 8 },
  },

  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);

    this.isVisible = false;
    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;

    this.el.sceneEl.addEventListener('onefingermove', this.handleRotation);
    this.el.sceneEl.addEventListener('twofingermove', this.handleScale);
  },

  handleRotation: function (event) {
    if (this.isVisible) {
      // Only rotate around Y-axis (horizontal swipe = rotation around Y-axis in world space)
      // Since model is rotated 90 degrees, we adjust accordingly
      this.el.object3D.rotation.z += event.detail.positionChange.x * this.data.rotationFactor;
    }
  },

  handleScale: function (event) {
    if (this.isVisible) {
      this.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

      this.scaleFactor = Math.min(
        Math.max(this.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
      this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
      this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
    }
  },

  update: function () {
    if (this.data.enabled) {
      this.isVisible = true;
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener('onefingermove', this.handleRotation);
    this.el.sceneEl.removeEventListener('twofingermove', this.handleScale);
  },
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

});

