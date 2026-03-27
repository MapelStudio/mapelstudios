// ===== 8TH WALL TARGET LOADER =====
const load8thWallTargets = () => {
  fetch('./data/targets.json')
    .then(response => response.json())
    .then(data => {
      XR8.XrController.configure({ 
        imageTargetData: data.imageTargets || data 
      })
    })
}
window.XR8 ? load8thWallTargets() : window.addEventListener('xrloaded', load8thWallTargets)

// ===== TOUCH ROTATION COMPONENT =====
AFRAME.registerComponent('touch-rotate', {
  init: function() {
    this.lastX = 0;
    this.lastY = 0;
    this.isMoving = false;
    const self = this;
    
    window.addEventListener('touchstart', (e) => {
        if (e.target.tagName === 'BUTTON') return;
        if (e.touches.length > 0) {
            self.isMoving = true;
            self.lastX = e.touches[0].clientX;
            self.lastY = e.touches[0].clientY;
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (!self.isMoving || e.touches.length === 0) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - self.lastX;
        const deltaY = touch.clientY - self.lastY;
        
        // Rotate around Y-axis (horizontal swipe)
        self.el.object3D.rotation.y += deltaX * 0.01;
        
        // Rotate around X-axis (vertical swipe)
        self.el.object3D.rotation.x += deltaY * 0.01;
        
        self.lastX = touch.clientX;
        self.lastY = touch.clientY;
    });

    window.addEventListener('touchend', () => {
        self.isMoving = false;
    });
  }
});

// ===== LETTER CONFIGURATION =====
// Add all 26 letters here - ONE place for everything!
const LETTER_CONFIG = {
    'a': {
        targetIndex: 0,
        models: {
            'apple': { file: 'apple.glb', scale: '4.5 4.5 4.5', label: 'Apple', default: true },
            'aeroplane': { file: 'aeroplane.glb', scale: '0.06 0.06 0.06', label: 'Aeroplane' },
            'axe': { file: 'axe.glb', scale: '0.4 0.4 0.4', label: 'Axe' }
        }
    },
    'b': {
        targetIndex: 1,
        models: {
            'bag': { file: 'bag.glb', scale: '1 1 1', label: 'Bag', default: true },
            'ball': { file: 'ball.glb', scale: '0.3 0.3 0.3', label: 'Ball' },
            'banana': { file: 'banana.glb', scale: '0.02 0.02 0.02', label: 'Banana' }
        }
    },
    'e': {
        targetIndex: 4,  // 5th target in targets.mind (0=A, 1=B, 2=C, 3=D, 4=E)
        models: {
            'emerald': { file: 'emerald.glb', scale: '0.3 0.3 0.3', label: 'Emerald', default: true },
            'elephant': { file: 'elephant.glb', scale: '0.1 0.1 0.1', label: 'Elephant' },
            'egg': { file: 'egg.glb', scale: '0.3 0.3 0.3', label: 'Egg' }
        }
    },
    'f': {
        targetIndex: 5,  // 5th target in targets.mind (0=A, 1=B, 2=C, 3=D, 4=E)
        models: {
            'flower': { file: 'flower.glb', scale: '1 1 1', label: 'Flower', default: true },
            'funnel': { file: 'funnel.glb', scale: '0.09 0.09 0.09', label: 'Funnel' },
            'fan': { file: 'fan.glb', scale: '0.1 0.1 0.1', label: 'Fan' }
        }
    },
    'g': {
        targetIndex: 6,  // 7th target in targets.mind (assuming you compiled A-J together)
        models: {
            'gift': { file: 'gift.glb', scale: '4 4 4', label: 'Gift', default: true },
            'goat': { file: 'goat.glb',  position: '-40 0 0', scale: '0.5 0.5 0.5', label: 'Goat' },
            'grape': { file: 'grape.glb', scale: '0.1 0.1 0.1', label: 'Grape' }
        }
    }
};

// ===== AUTO-GENERATE MODEL SCALES =====
const MODEL_SCALES = {};
Object.keys(LETTER_CONFIG).forEach(letter => {
    Object.keys(LETTER_CONFIG[letter].models).forEach(modelName => {
        MODEL_SCALES[modelName] = LETTER_CONFIG[letter].models[modelName].scale;
    });
});

// ===== TUTORIAL FUNCTIONS =====
let tutorialStep = 1;

function nextPage(pageNumber) {
    tutorialStep = pageNumber;
    document.querySelectorAll('.tutorial-page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) targetPage.classList.add('active');
    updateButtonText();
}

function handleNext() {
    if (tutorialStep < 3) nextPage(tutorialStep + 1);
    else toggleTutorial(false);
}

function updateButtonText() {
    const btn = document.getElementById('nav-btn-next');
    if (!btn) return;
    btn.innerText = tutorialStep === 3 ? "Start" : "Next";
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

// ===== MODEL SWITCHING FUNCTION =====
window.switchModel = function(targetId, modelName) {
    const modelDisplay = document.getElementById(`${targetId}-display`);
    if (!modelDisplay) {
        console.error('Model display not found:', targetId);
        return;
    }
    
    const parentEntity = modelDisplay.parentElement;
    
    // Fade out old model
    modelDisplay.setAttribute('animation', {
        property: 'scale',
        to: '0 0 0',
        dur: 300,
        easing: 'easeInQuad'
    });
    
    setTimeout(() => {
        modelDisplay.remove();
        
        const scale = MODEL_SCALES[modelName] || '2 2 2';
        
        const newModel = document.createElement('a-gltf-model');
        newModel.setAttribute('id', `${targetId}-display`);
        newModel.setAttribute('gltf-model', `#${modelName}`);
        newModel.setAttribute('position', '0 0 -0.5'); // Start below target
        newModel.setAttribute('scale', '0 0 0'); // Start invisible
        newModel.setAttribute('animation-mixer', '');
        newModel.setAttribute('touch-rotate', '');
        
        // Pop-up animation (comes out of target)
        newModel.setAttribute('animation__popup', {
            property: 'position',
            from: '0 0 -0.5',
            to: '0 0 0',
            dur: 800,
            easing: 'easeOutBack'
        });
        
        // Scale-up animation (grows from small to full size)
        newModel.setAttribute('animation__scale', {
            property: 'scale',
            from: '0 0 0',
            to: scale,
            dur: 800,
            easing: 'easeOutBack'
        });
        
        // Full 360° rotation animation (spins once)
        newModel.setAttribute('animation__rotate', {
            property: 'rotation',
            from: '0 0 0',
            to: '0 360 0',
            dur: 800,
            easing: 'easeOutQuad'
        });
        
        parentEntity.appendChild(newModel);
        console.log('✅ Switched to:', modelName);
    }, 300);
};

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const uiLayer = document.getElementById('ui');
    const scannerLayer = document.getElementById('scanner-container');
    const iconLayer = document.getElementById('icon-layer');
    const sceneEl = document.getElementById('sceneEl'); // Note: ensure your <a-scene> has id="sceneEl"
    const loadingScreen = document.getElementById('loading-screen');

    // Hide loading screen
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingScreen) loadingScreen.style.display = 'none';
            if (uiLayer) uiLayer.classList.add('loaded');
        }, 3000);
    });

    // Tutorial buttons
    const btnRight = document.getElementById('btn-right');
    if (btnRight) btnRight.addEventListener('click', () => toggleTutorial(true));

    const closeBtn = document.getElementById('close-tutorial-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => toggleTutorial(false));

    // Start AR button
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            uiLayer.style.display = 'none';
            const bgVideo = document.getElementById('bg-video');
            if (bgVideo) {
                bgVideo.pause();
                bgVideo.style.display = 'none';
            }
            if (scannerLayer) scannerLayer.style.display = 'flex';
            if (iconLayer) iconLayer.style.display = 'flex';
            
            // 8th Wall handles the camera start automatically!
        });
    } // <-- FIXED: Added this closing bracket to close the "if (startBtn)" block

    // ===== UNIVERSAL BUTTON CLICK HANDLER =====
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('model-btn')) {
            const modelName = e.target.getAttribute('data-model');
            const targetId = e.target.getAttribute('data-target');
            
            window.switchModel(targetId, modelName);
            
            // Update active button
            document.querySelectorAll(`[data-target="${targetId}"] .model-btn`).forEach(b => {
                b.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });

    // ===== 8TH WALL TARGET EVENTS =====
    // MOVED INSIDE: These must stay inside DOMContentLoaded to use scannerLayer
    window.addEventListener('xrimagefound', (event) => {
        const targetName = event.detail.name; 
        const letter = targetName.split('-')[1]; 
        
        console.log("Found:", targetName);
        
        if (scannerLayer) scannerLayer.style.display = 'none';
        
        const selector = document.getElementById(`model-selector-${letter}`);
        if (selector) selector.style.display = 'flex';
    });

    window.addEventListener('xrimagelost', (event) => {
        const targetName = event.detail.name;
        const letter = targetName.split('-')[1];

        console.log("Lost:", targetName);
        
        if (scannerLayer) scannerLayer.style.display = 'flex';
        
        const selector = document.getElementById(`model-selector-${letter}`);
        if (selector) selector.style.display = 'none';
    });

}); // <-- FIXED: This now properly closes the entire DOMContentLoaded block
