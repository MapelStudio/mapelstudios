// ==========================================
// 1. 8TH WALL OPEN SOURCE ENGINE INIT
// ==========================================
// This is mandatory for the 2026 self-hosted version to talk to A-Frame
window.addEventListener('xrloaded', () => {
  XR8.addCameraPipelineModules([
    XR8.GlTextureRenderer.pipelineModule(),
    XR8.Threejs.pipelineModule(),
    XR8.XrController.pipelineModule(),
  ]);
  console.log("🚀 8th Wall Engine Modules Loaded");
});

const load8thWallTargets = () => {
  fetch('./data/targets.json')
    .then(response => response.json())
    .then(data => {
      XR8.XrController.configure({ 
        imageTargetData: data.imageTargets || data 
      });
      console.log("🎯 Image Targets Synchronized");
    })
    .catch(err => console.error("Target Config Error:", err));
}
window.XR8 ? load8thWallTargets() : window.addEventListener('xrloaded', load8thWallTargets);

// ==========================================
// 2. A-FRAME COMPONENTS
// ==========================================
AFRAME.registerComponent('touch-rotate', {
  init: function() {
    this.lastX = 0;
    this.lastY = 0;
    this.isMoving = false;
    
    window.addEventListener('touchstart', (e) => {
      if (e.target.tagName === 'BUTTON') return;
      if (e.touches.length > 0) {
        this.isMoving = true;
        this.lastX = e.touches[0].clientX;
        this.lastY = e.touches[0].clientY;
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (!this.isMoving || e.touches.length === 0) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - this.lastX;
      const deltaY = touch.clientY - this.lastY;
      
      this.el.object3D.rotation.y += deltaX * 0.01;
      this.el.object3D.rotation.x += deltaY * 0.01;
      
      this.lastX = touch.clientX;
      this.lastY = touch.clientY;
    });

    window.addEventListener('touchend', () => { this.isMoving = false; });
  }
});

// ==========================================
// 3. CONFIGURATION & SCALING
// ==========================================
const LETTER_CONFIG = {
    'a': {
        models: {
            'apple': { file: 'apple.glb', scale: '4.5 4.5 4.5', label: 'Apple' },
            'aeroplane': { file: 'aeroplane.glb', scale: '0.06 0.06 0.06', label: 'Aeroplane' },
            'axe': { file: 'axe.glb', scale: '0.4 0.4 0.4', label: 'Axe' }
        }
    },
    'b': {
        models: {
            'bag': { file: 'bag.glb', scale: '1 1 1', label: 'Bag' },
            'ball': { file: 'ball.glb', scale: '0.3 0.3 0.3', label: 'Ball' },
            'banana': { file: 'banana.glb', scale: '0.02 0.02 0.02', label: 'Banana' }
        }
    },
    'e': {
        models: {
            'emerald': { file: 'emerald.glb', scale: '0.3 0.3 0.3', label: 'Emerald' },
            'elephant': { file: 'elephant.glb', scale: '0.1 0.1 0.1', label: 'Elephant' },
            'egg': { file: 'egg.glb', scale: '0.3 0.3 0.3', label: 'Egg' }
        }
    },
    'f': {
        models: {
            'flower': { file: 'flower.glb', scale: '1 1 1', label: 'Flower' },
            'funnel': { file: 'funnel.glb', scale: '0.09 0.09 0.09', label: 'Funnel' },
            'fan': { file: 'fan.glb', scale: '0.1 0.1 0.1', label: 'Fan' }
        }
    },
    'g': {
        models: {
            'gift': { file: 'gift.glb', scale: '4 4 4', label: 'Gift' },
            'goat': { file: 'goat.glb', scale: '0.5 0.5 0.5', label: 'Goat' },
            'grape': { file: 'grape.glb', scale: '0.1 0.1 0.1', label: 'Grape' }
        }
    }
};

const MODEL_SCALES = {};
Object.keys(LETTER_CONFIG).forEach(letter => {
    Object.keys(LETTER_CONFIG[letter].models).forEach(modelName => {
        MODEL_SCALES[modelName] = LETTER_CONFIG[letter].models[modelName].scale;
    });
});

// ==========================================
// 4. TUTORIAL SYSTEM
// ==========================================
let tutorialStep = 1;

window.nextPage = function(pageNumber) {
    tutorialStep = pageNumber;
    document.querySelectorAll('.tutorial-page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) targetPage.classList.add('active');
    updateButtonText();
}

window.handleNext = function() {
    if (tutorialStep < 3) nextPage(tutorialStep + 1);
    else toggleTutorial(false);
}

function updateButtonText() {
    const btn = document.getElementById('nav-btn-next');
    if (btn) btn.innerText = tutorialStep === 3 ? "Start" : "Next";
}

function toggleTutorial(show) {
    const modal = document.getElementById('tutorial-modal');
    const scannerLayer = document.getElementById('scanner-container');
    if (!modal) return;
    if (show) {
        modal.style.display = 'flex';
        if (scannerLayer) scannerLayer.style.display = 'none';
        nextPage(1);
    } else {
        modal.style.display = 'none';
        if (scannerLayer) scannerLayer.style.display = 'flex';
    }
}

// ==========================================
// 5. MODEL SWITCHING LOGIC
// ==========================================
window.switchModel = function(targetId, modelName) {
    const modelDisplay = document.getElementById(`${targetId}-display`);
    if (!modelDisplay) return;
    
    const parentEntity = modelDisplay.parentElement;
    modelDisplay.setAttribute('animation', { property: 'scale', to: '0 0 0', dur: 300 });
    
    setTimeout(() => {
        modelDisplay.remove();
        const scale = MODEL_SCALES[modelName] || '1 1 1';
        const newModel = document.createElement('a-gltf-model');
        newModel.setAttribute('id', `${targetId}-display`);
        newModel.setAttribute('gltf-model', `#${modelName}`);
        newModel.setAttribute('scale', '0 0 0');
        newModel.setAttribute('animation-mixer', '');
        newModel.setAttribute('touch-rotate', '');
        
        newModel.setAttribute('animation__scale', {
            property: 'scale', to: scale, dur: 800, easing: 'easeOutBack'
        });
        
        parentEntity.appendChild(newModel);
    }, 300);
};

// ==========================================
// 6. MAIN INITIALIZATION & EVENTS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const uiLayer = document.getElementById('ui');
    const scannerLayer = document.getElementById('scanner-container');
    const loadingScreen = document.getElementById('loading-screen');

    // Initial Loading Screen Fade
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingScreen) loadingScreen.style.display = 'none';
            if (uiLayer) uiLayer.classList.add('loaded');
        }, 2500);
    });

    // Start Button Logic
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const bgVideo = document.getElementById('bg-video');
            if (bgVideo) {
                bgVideo.pause();
                bgVideo.remove(); // Remove to prevent camera conflict
            }
            if (uiLayer) uiLayer.style.display = 'none';
            if (scannerLayer) scannerLayer.style.display = 'flex';
            if (window.XR8) XR8.resume(); // Ensure engine wakes up
        });
    }

    // Tutorial Listeners
    document.getElementById('btn-right')?.addEventListener('click', () => toggleTutorial(true));
    document.getElementById('close-tutorial-btn')?.addEventListener('click', () => toggleTutorial(false));

    // Global Model Button Listener
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('model-btn')) {
            const modelName = e.target.getAttribute('data-model');
            const targetId = e.target.getAttribute('data-target');
            window.switchModel(targetId, modelName);
            
            document.querySelectorAll(`[data-target="${targetId}"]`).forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    // 8th Wall Target Detection
    window.addEventListener('xrimagefound', (event) => {
        const letter = event.detail.name.split('-')[1]; // Assumes 'target-a'
        if (scannerLayer) scannerLayer.style.display = 'none';
        const selector = document.getElementById(`model-selector-${letter}`);
        if (selector) selector.style.display = 'flex';
    });

    window.addEventListener('xrimagelost', (event) => {
        const letter = event.detail.name.split('-')[1];
        if (scannerLayer) scannerLayer.style.display = 'flex';
        const selector = document.getElementById(`model-selector-${letter}`);
        if (selector) selector.style.display = 'none';
    });
});
