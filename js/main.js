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

// Model scales configuration
const MODEL_SCALES = {
    // Target A
    'apple': '3 3 3',
    'aeroplane': '0.01 0.01 0.01',
    'axe': '0.2 0.2 0.2',
    // Target B
    'bag': '0.8 0.8 0.8',
    'ball': '1.5 1.5 1.5',
    'banana': '2 2 2'
};

function switchModel(targetId, modelName) {
    const modelDisplay = document.getElementById(`${targetId}-display`);
    if (!modelDisplay) return;
    
    const parentEntity = modelDisplay.parentElement;
    modelDisplay.remove();
    
    const scale = MODEL_SCALES[modelName] || '2 2 2';
    
    const newModel = document.createElement('a-gltf-model');
    newModel.setAttribute('id', `${targetId}-display`);
    newModel.setAttribute('src', `#${modelName}`);
    newModel.setAttribute('position', '0 0 0');
    newModel.setAttribute('scale', scale);
    newModel.setAttribute('animation-mixer', '');
    newModel.setAttribute('touch-rotate', '');
    parentEntity.appendChild(newModel);
    
    console.log(`✅ Switched ${targetId} to ${modelName}`);
}

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const uiLayer = document.getElementById('ui');
    const scannerLayer = document.getElementById('scanner-container');
    const iconLayer = document.getElementById('icon-layer');
    const sceneEl = document.getElementById('sceneEl');
    const loadingScreen = document.getElementById('loading-screen');

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingScreen) loadingScreen.style.display = 'none';
            if (uiLayer) uiLayer.classList.add('loaded');
        }, 3000);
    });

    const btnRight = document.getElementById('btn-right');
    if (btnRight) btnRight.addEventListener('click', () => toggleTutorial(true));

    const closeBtn = document.getElementById('close-tutorial-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => toggleTutorial(false));

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

// Wait for everything to load, then attach button listeners
    window.addEventListener('load', () => {
        setTimeout(() => {
            const allButtons = document.querySelectorAll('.model-btn');
            console.log('Found buttons:', allButtons.length);
            
            allButtons.forEach(btn => {
                btn.onclick = function() {
                    const modelName = this.getAttribute('data-model');
                    const targetId = this.getAttribute('data-target');
                    
                    console.log('Button clicked:', modelName, targetId);
                    
                    switchModel(targetId, modelName);
                    
                    document.querySelectorAll(`[data-target="${targetId}"] .model-btn`).forEach(b => {
                        b.classList.remove('active');
                    });
                    this.classList.add('active');
                };
            });
        }, 1000);
    });

    // Target A
    const targetA = document.getElementById('target-a');
    if (targetA) {
        targetA.addEventListener("targetFound", () => {
            scannerLayer.style.display = 'none';
            const selector = document.getElementById('model-selector-a');
            if (selector) selector.style.display = 'flex';
        });
        targetA.addEventListener("targetLost", () => {
            scannerLayer.style.display = 'flex';
            const selector = document.getElementById('model-selector-a');
            if (selector) selector.style.display = 'none';
        });
    }

    // Target B
    const targetB = document.getElementById('target-b');
    if (targetB) {
        targetB.addEventListener("targetFound", () => {
            scannerLayer.style.display = 'none';
            const selector = document.getElementById('model-selector-b');
            if (selector) selector.style.display = 'flex';
        });
        targetB.addEventListener("targetLost", () => {
            scannerLayer.style.display = 'flex';
            const selector = document.getElementById('model-selector-b');
            if (selector) selector.style.display = 'none';
        });
    }

    // Target C
    const targetC = document.getElementById('target-c');
    if (targetC) {
        targetC.addEventListener("targetFound", () => {
            scannerLayer.style.display = 'none';
        });
        targetC.addEventListener("targetLost", () => {
            scannerLayer.style.display = 'flex';
        });
    }
});
