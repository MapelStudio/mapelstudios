AFRAME.registerComponent('touch-rotate', {
  init: function() {
    this.lastX = 0;
    this.isMoving = false;
    const self = this;
    
    window.addEventListener('touchstart', (e) => {
        if (e.target.tagName === 'BUTTON') return;
        if (e.touches.length > 0) {
            self.isMoving = true;
            self.lastX = e.touches[0].clientX;
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (!self.isMoving || e.touches.length === 0) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - self.lastX;
        self.el.object3D.rotation.y += deltaX * 0.01;
        self.lastX = touch.clientX;
    });

    window.addEventListener('touchend', () => {
        self.isMoving = false;
    });
  }
});

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

const MODEL_SCALES = {
    'apple': '3 3 3',
    'aeroplane': '0.5 0.5 0.5',
    'axe': '1 1 1',
    'bag': '2 2 2',
    'ball': '1.5 1.5 1.5',
    'banana': '2 2 2'
};

window.switchModel = function(targetId, modelName) {
    const debugDiv = document.getElementById('click-debug');
    const debugText = document.getElementById('debug-text');
    
    if (debugText) debugText.innerText = 'Switching to: ' + modelName;
    
    const modelDisplay = document.getElementById(`${targetId}-display`);
    if (!modelDisplay) {
        if (debugText) debugText.innerText = 'ERROR: Model not found!';
        return;
    }
    
    const parentEntity = modelDisplay.parentElement;
    const oldPosition = modelDisplay.getAttribute('position');
    const oldRotation = parentEntity.getAttribute('rotation');
    
    modelDisplay.remove();
    
    const scale = MODEL_SCALES[modelName] || '2 2 2';
    
    setTimeout(() => {
        const newModel = document.createElement('a-gltf-model');
        newModel.setAttribute('id', `${targetId}-display`);
        newModel.setAttribute('gltf-model', `#${modelName}`);
        newModel.setAttribute('position', oldPosition || '0 0 0');
        newModel.setAttribute('scale', scale);
        newModel.setAttribute('animation-mixer', '');
        newModel.setAttribute('touch-rotate', '');
        parentEntity.appendChild(newModel);
        
        if (debugText) debugText.innerText = 'SUCCESS: ' + modelName;
    }, 100);
};
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

            if (sceneEl.hasLoaded) startAR();
            else sceneEl.addEventListener('loaded', startAR);
        });
    }

    function startAR() {
        const arSystem = sceneEl.systems['mindar-image-system'];
        if (arSystem) {
            arSystem.start();
            window.dispatchEvent(new Event('resize'));
        }
    }

  // BUTTONS - SIMPLE onclick with visual debug
document.body.addEventListener('click', (e) => {
    const debugDiv = document.getElementById('click-debug');
    const debugText = document.getElementById('debug-text');
    
    // Show what was clicked
    if (debugDiv && debugText) {
        debugDiv.style.display = 'block';
        debugText.innerText = e.target.className + ' - ' + e.target.tagName;
        setTimeout(() => {
            debugDiv.style.display = 'none';
        }, 2000);
    }
    
    if (e.target.classList.contains('model-btn')) {
        const modelName = e.target.getAttribute('data-model');
        const targetId = e.target.getAttribute('data-target');
        
        if (debugText) debugText.innerText = modelName + ' - ' + targetId;
        
        window.switchModel(targetId, modelName);
        
        document.querySelectorAll(`[data-target="${targetId}"] .model-btn`).forEach(b => {
            b.classList.remove('active');
        });
        e.target.classList.add('active');
    }
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
        targetC.addEventListener("targetFound", () => scannerLayer.style.display = 'none');
        targetC.addEventListener("targetLost", () => scannerLayer.style.display = 'flex');
    }
});
