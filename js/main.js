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
    
    window.addEventListener('touchstart', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('.model-btn')) {
            return; 
        }
        if (e.touches.length > 0) {
            this.isMoving = true;
            this.lastX = e.touches[0].clientX;
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (!this.isMoving || e.touches.length === 0) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - this.lastX;
        this.el.object3D.rotation.y += deltaX * 0.01;
        this.lastX = touch.clientX;
    });

    window.addEventListener('touchend', () => {
        this.isMoving = false;
    });
  }
});

function debugLog(msg) {
    console.log(msg);
}

let tutorialStep = 1;

function nextPage(pageNumber) {
    tutorialStep = pageNumber;
    const allPages = document.querySelectorAll('.tutorial-page');
    allPages.forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) targetPage.classList.add('active');
    updateButtonText();
}

function handleNext() {
    if (tutorialStep < 3) {
        nextPage(tutorialStep + 1);
    } else {
        toggleTutorial(false);
    }
}

function updateButtonText() {
    const btn = document.getElementById('nav-btn-next');
    if (!btn) return;
    if (tutorialStep === 3) {
        btn.innerText = "Start";
    } else {
        btn.innerText = "Next";
    }
}

function toggleTutorial(show) {
    const modal = document.getElementById('tutorial-modal');
    const scannerLayer = document.getElementById('scanner-container');
    if (!modal) return;

    if (show) {
        modal.style.display = 'flex';
        if (scannerLayer) scannerLayer.style.display = 'none';
        tutorialStep = 1;
        setTimeout(() => nextPage(1), 50);
    } else {
        modal.style.display = 'none';
        if (scannerLayer) scannerLayer.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const uiLayer = document.getElementById('ui');
    const scannerLayer = document.getElementById('scanner-container');
    const iconLayer = document.getElementById('icon-layer');
    const sceneEl = document.getElementById('sceneEl');
    const loadingScreen = document.getElementById('loading-screen');

    // Hide loading screen
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            if (uiLayer) {
                uiLayer.classList.add('loaded');
            }
        }, 3000);
    });

    // Tutorial buttons
    const btnRight = document.getElementById('btn-right');
    if (btnRight) {
        btnRight.addEventListener('click', () => toggleTutorial(true));
    }

    const closeBtn = document.getElementById('close-tutorial-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => toggleTutorial(false));
    }

    // Start AR button
    if (startBtn) {
        startBtn.addEventListener('click', () => {
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
    }

    function startAR() {
        const arSystem = sceneEl.systems['mindar-image-system'];
        if (arSystem) {
            arSystem.start();
            window.dispatchEvent(new Event('resize'));
        }
    }

// MODEL BUTTON CLICKS - Works for A and B
    document.querySelectorAll('.model-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modelName = btn.getAttribute('data-model');
            const targetId = btn.getAttribute('data-target');
            const modelDisplay = document.getElementById(`${targetId}-display`);
            
            if (modelDisplay) {
                const parentEntity = modelDisplay.parentElement;
                modelDisplay.remove();
                
                // Different scales for different models
                let scale = '3 3 3'; // Default
                
                // Target A scales
                if (modelName === 'apple') scale = '3 3 3';
                if (modelName === 'aeroplane') scale = '0.01 0.01 0.01';
                if (modelName === 'axe') scale = '0.2 0.2 0.2';
                
                // Target B scales
                if (modelName === 'bag') scale = '2 2 2';
                if (modelName === 'ball') scale = '1.5 1.5 1.5';
                if (modelName === 'banana') scale = '2 2 2';
                
                const newModel = document.createElement('a-gltf-model');
                newModel.setAttribute('id', `${targetId}-display`);
                newModel.setAttribute('src', `#${modelName}`);
                newModel.setAttribute('position', '0 0 0');
                newModel.setAttribute('scale', scale);
                newModel.setAttribute('animation-mixer', '');
                newModel.setAttribute('touch-rotate', '');
                parentEntity.appendChild(newModel);
            }

            // Update active button for this target only
            document.querySelectorAll(`[data-target="${targetId}"] .model-btn`).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Target A events
    const targetA = document.getElementById('target-a');
    if (targetA) {
        targetA.addEventListener("targetFound", () => {
            scannerLayer.style.display = 'none';
            const modelSelector = document.getElementById('model-selector-a');
            if (modelSelector) modelSelector.style.display = 'flex';
        });

        targetA.addEventListener("targetLost", () => {
            scannerLayer.style.display = 'flex';
            const modelSelector = document.getElementById('model-selector-a');
            if (modelSelector) modelSelector.style.display = 'none';
        });
    }

  // Target B events
    const targetB = document.getElementById('target-b');
    if (targetB) {
        targetB.addEventListener("targetFound", () => {
            scannerLayer.style.display = 'none';
            const modelSelector = document.getElementById('model-selector-b');
            if (modelSelector) modelSelector.style.display = 'flex';
        });

        targetB.addEventListener("targetLost", () => {
            scannerLayer.style.display = 'flex';
            const modelSelector = document.getElementById('model-selector-b');
            if (modelSelector) modelSelector.style.display = 'none';
        });
    }

    // Other targets
    const otherTargets = document.querySelectorAll('.alphabet-target:not(#target-a)');
    otherTargets.forEach(target => {
        target.addEventListener("targetFound", () => {
            scannerLayer.style.display = 'none';
        });
        target.addEventListener("targetLost", () => {
            scannerLayer.style.display = 'flex';
        });
    });
});
