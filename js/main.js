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
// ===== LETTER CONFIGURATION WITH CORRECT SCALES =====
const LETTER_CONFIG = {
    'a': {
        targetIndex: 0,
        models: {
            'apple': { file: 'apple.glb', scale: '0.045 0.045 0.045', position: '0 0 0', label: 'Apple', default: true },
            'aeroplane': { file: 'aeroplane.glb', scale: '0.06 0.06 0.06', position: '0 0 0', label: 'Aeroplane' },
            'axe': { file: 'axe.glb', scale: '0.4 0.4 0.4', position: '0 0 0', label: 'Axe' }
        }
    },
    'b': {
        targetIndex: 1,
        models: {
            'bag': { file: 'bag.glb', scale: '1 1 1', position: '0 0 0', label: 'Bag', default: true },
            'ball': { file: 'ball.glb', scale: '0.3 0.3 0.3', position: '0 0 0', label: 'Ball' },
            'banana': { file: 'banana.glb', scale: '0.02 0.02 0.02', position: '0 0 0', label: 'Banana' }
        }
    },
    'e': {
        targetIndex: 4,
        models: {
            'emerald': { file: 'emerald.glb', scale: '0.3 0.3 0.3', position: '0 0 0', label: 'Emerald', default: true },
            'elephant': { file: 'elephant.glb', scale: '0.1 0.1 0.1', position: '0 0 0', label: 'Elephant' },
            'egg': { file: 'egg.glb', scale: '0.3 0.3 0.3', position: '0 0 0', label: 'Egg' }
        }
    },
    'f': {
        targetIndex: 5,
        models: {
            'flower': { file: 'flower.glb', scale: '1 1 1', position: '0 0 0', label: 'Flower', default: true },
            'funnel': { file: 'funnel.glb', scale: '0.09 0.09 0.09', position: '0 0 0', label: 'Funnel' },
            'fan': { file: 'fan.glb', scale: '0.1 0.1 0.1', position: '0 0 0', label: 'Fan' }
        }
    },
    'g': {
        targetIndex: 6,
        models: {
            'gift': { file: 'gift.glb', scale: '4 4 4', position: '0 0 0', label: 'Gift', default: true },
            'goat': { file: 'goat.glb', scale: '0.5 0.5 0.5', position: '0 0 0', label: 'Goat' },
            'grape': { file: 'grape.glb', scale: '0.1 0.1 0.1', position: '0 0 0', label: 'Grape' }
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
// ===== MODEL SWITCHING FUNCTION (FIXED) =====
window.switchModel = function(targetId, modelName) {
    console.log("Switching model for:", targetId, "to:", modelName);
    
    // Get the config for this model
    let modelConfig = null;
    let targetLetter = targetId.split('-')[1];
    
    // Find model configuration
    if (LETTER_CONFIG[targetLetter] && LETTER_CONFIG[targetLetter].models[modelName]) {
        modelConfig = LETTER_CONFIG[targetLetter].models[modelName];
    }
    
    // Find the anchor entity
    const parentEntity = document.getElementById(`${targetId}-anchor`);
    
    if (!parentEntity) {
        console.error("❌ Anchor not found:", targetId);
        return;
    }
    
    // Remove existing model if present
    const oldModel = document.getElementById(`${targetId}-display`);
    if (oldModel) {
        oldModel.remove();
        console.log("Removed old model");
    }
    
    // Create new model element
    const newModel = document.createElement('a-gltf-model');
    newModel.setAttribute('id', `${targetId}-display`);
    newModel.setAttribute('src', `#${modelName}`);
    
    // Position directly on the image target (0,0,0 is on the surface)
    newModel.setAttribute('position', modelConfig && modelConfig.position ? modelConfig.position : '0 0 0');
    
    // Apply scale from config or default
    const scaleValue = modelConfig && modelConfig.scale ? modelConfig.scale : '1 1 1';
    newModel.setAttribute('scale', scaleValue);
    
    // Add rotation
    newModel.setAttribute('rotation', modelConfig && modelConfig.rotation ? modelConfig.rotation : '0 0 0');
    
    // Add components
    newModel.setAttribute('animation-mixer', '');
    newModel.setAttribute('touch-rotate', '');
    newModel.setAttribute('visible', 'true');
    
    // Add event listeners for debugging
    newModel.addEventListener('model-loaded', () => {
        console.log("✅ Model loaded successfully:", modelName, "for", targetId);
    });
    
    newModel.addEventListener('model-error', (error) => {
        console.error("❌ Model failed to load:", modelName, error);
    });
    
    // Add to scene
    parentEntity.appendChild(newModel);
    console.log("Added new model:", modelName, "with scale:", scaleValue);
};

// Also fix the target detection to show proper UI
window.addEventListener('xrimagefound', (event) => {
    console.log("🎯 TARGET DETECTED:", event.detail.name);
    
    const targetName = event.detail.name;
    const letter = targetName.split('-')[1];
    
    if (scannerLayer) {
        scannerLayer.style.display = 'none';
    }
    
    const selector = document.getElementById(`model-selector-${letter}`);
    
    if (selector) {
        selector.style.display = 'flex';
        console.log("📱 UI shown for:", letter);
        
        // Force visibility of the current model
        const currentDisplay = document.getElementById(`${targetName}-display`);
        if (currentDisplay) {
            currentDisplay.setAttribute('visible', 'true');
            console.log("Made model visible");
        }
    } else {
        console.log("No selector found for:", letter);
    }
});
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

    console.log("Start button clicked");

    // Hide landing UI
    if (uiLayer) {
        uiLayer.style.display = 'none';
    }

    // Hide background video completely
   const bgVideo = document.getElementById('bg-video');

if (bgVideo) {
    bgVideo.pause();
    bgVideo.style.display = 'none';
    bgVideo.style.visibility = 'hidden';
    bgVideo.style.zIndex = '-1';
}

    const loader = document.getElementById('loading-screen');

if (loader) {
    loader.style.display = 'none';
}

    // Show scanner
    if (scannerLayer) {
        scannerLayer.style.display = 'flex';
    }

    // Show top buttons
    if (iconLayer) {
        iconLayer.style.display = 'flex';
    }

    // IMPORTANT — mark AR as active
    document.body.classList.add('ar-active');

});
    } // <-- FIXED: Added this closing bracket to close the "if (startBtn)" block

    // ===== UNIVERSAL BUTTON CLICK HANDLER =====
    document.body.addEventListener('click', (e) => {
        alert("Button clicked");
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

    // ===== 8TH WALL TARGET S =====
    // MOVED INSIDE: These must stay inside DOMContentLoaded to use scannerLayer
    window.addEventListener('xrimagefound', (event) => {

    console.log("TARGET DETECTED:", event.detail.name);

    const targetName = event.detail.name;
    const letter = targetName.split('-')[1];

    if (scannerLayer) {
        scannerLayer.style.display = 'none';
    }

    const selector = document.getElementById(`model-selector-${letter}`);

    if (selector) {
        selector.style.display = 'flex';
        console.log("UI shown for:", letter);
    } else {
        console.log("No selector found for:", letter);
    }

});

    window.addEventListener('xrimagelost', (event) => {
        const targetName = event.detail.name;
        const letter = targetName.split('-')[1];

        console.log("Lost:", targetName);
        
        if (scannerLayer) scannerLayer.style.display = 'flex';
        
        const selector = document.getElementById(`model-selector-${letter}`);
        if (selector) selector.style.display = 'none';
    });
});// <-- FIXED: This now properly closes the entire DOMContentLoaded block

// Force the UI to hide if the engine takes too long
setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) loader.style.display = 'none';
    console.log("Forced loader hide");
}, 5000); // 5 seconds safety net
