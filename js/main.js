// ========== TOUCH ROTATION COMPONENT ==========
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
      self.el.object3D.rotation.y += deltaX * 0.01;
      self.el.object3D.rotation.x += deltaY * 0.01;
      self.lastX = touch.clientX;
      self.lastY = touch.clientY;
    });
    window.addEventListener('touchend', () => { self.isMoving = false; });
  }
});

// ========== MODEL CONFIGURATION ==========
const MODEL_CONFIG = {
  'apple':   { scale: '0.045 0.045 0.045', default: true },
  'aeroplane':{ scale: '0.06 0.06 0.06' },
  'axe':     { scale: '0.4 0.4 0.4' },
  'bag':     { scale: '1 1 1', default: true },
  'ball':    { scale: '0.3 0.3 0.3' },
  'banana':  { scale: '0.02 0.02 0.02' },
  'emerald': { scale: '0.3 0.3 0.3', default: true },
  'elephant':{ scale: '0.1 0.1 0.1' },
  'egg':     { scale: '0.3 0.3 0.3' },
  'flower':  { scale: '1 1 1', default: true },
  'funnel':  { scale: '0.09 0.09 0.09' },
  'fan':     { scale: '0.1 0.1 0.1' },
  'gift':    { scale: '4 4 4', default: true },
  'goat':    { scale: '0.5 0.5 0.5' },
  'grape':   { scale: '0.1 0.1 0.1' }
};

// ========== SWITCH MODEL FUNCTION ==========
window.switchModel = function(targetId, modelName) {
  const anchor = document.getElementById(`${targetId}-anchor`);
  if (!anchor) {
    console.error(`Anchor not found: ${targetId}`);
    return;
  }
  
  // Remove existing model
  const oldModel = document.getElementById(`${targetId}-display`);
  if (oldModel) oldModel.remove();
  
  // Create new model
  const newModel = document.createElement('a-gltf-model');
  newModel.id = `${targetId}-display`;
  newModel.setAttribute('src', `#${modelName}`);
  newModel.setAttribute('position', '0 0 0');
  newModel.setAttribute('scale', MODEL_CONFIG[modelName]?.scale || '1 1 1');
  newModel.setAttribute('animation-mixer', '');
  newModel.setAttribute('touch-rotate', '');
  
  // Event listeners for debugging
  newModel.addEventListener('model-loaded', () => {
    console.log(`✅ Model loaded: ${modelName} on ${targetId}`);
  });
  newModel.addEventListener('model-error', (e) => {
    console.error(`❌ Model error: ${modelName}`, e);
  });
  
  anchor.appendChild(newModel);
  console.log(`🔄 Switched to ${modelName} on ${targetId}`);
};

// ========== UI HANDLERS ==========
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const uiLayer = document.getElementById('ui');
  const scannerLayer = document.getElementById('scanner-container');
  const iconLayer = document.getElementById('icon-layer');
  const loadingScreen = document.getElementById('loading-screen');
  const bgVideo = document.getElementById('bg-video');
  
  // Hide loading screen after a delay (or when scene loads)
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loadingScreen) loadingScreen.style.display = 'none';
      if (uiLayer) uiLayer.classList.add('loaded');
    }, 2000);
  });
  
  // Tutorial button (right icon)
  const btnRight = document.getElementById('btn-right');
  if (btnRight) btnRight.addEventListener('click', () => toggleTutorial(true));
  
  const closeTutorial = document.getElementById('close-tutorial-btn');
  if (closeTutorial) closeTutorial.addEventListener('click', () => toggleTutorial(false));
  
  // Start AR
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      console.log("Starting AR experience");
      if (uiLayer) uiLayer.style.display = 'none';
      if (bgVideo) {
        bgVideo.pause();
        bgVideo.style.display = 'none';
      }
      if (loadingScreen) loadingScreen.style.display = 'none';
      if (scannerLayer) scannerLayer.style.display = 'flex';
      if (iconLayer) iconLayer.style.display = 'flex';
      document.body.classList.add('ar-active');
    });
  }
  
  // Model selector buttons
  document.body.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('model-btn')) {
      const modelName = e.target.getAttribute('data-model');
      const targetId = e.target.getAttribute('data-target');
      if (modelName && targetId) {
        window.switchModel(targetId, modelName);
        // Update active button style
        document.querySelectorAll(`[data-target="${targetId}"] .model-btn`).forEach(btn => {
          btn.classList.remove('active');
        });
        e.target.classList.add('active');
      }
    }
  });
  
  // 8th Wall target detection
  window.addEventListener('xrimagefound', (event) => {
    const targetName = event.detail.name;
    const letter = targetName.split('-')[1];
    console.log(`🔍 Target found: ${targetName} → showing selector for letter ${letter}`);
    
    if (scannerLayer) scannerLayer.style.display = 'none';
    const selector = document.getElementById(`model-selector-${letter}`);
    if (selector) selector.style.display = 'flex';
  });
  
  window.addEventListener('xrimagelost', (event) => {
    const targetName = event.detail.name;
    const letter = targetName.split('-')[1];
    if (scannerLayer) scannerLayer.style.display = 'flex';
    const selector = document.getElementById(`model-selector-${letter}`);
    if (selector) selector.style.display = 'none';
  });

  // Force canvas to top after everything loads
setTimeout(() => {
  const canvas = document.querySelector('.a-canvas');
  if (canvas) {
    canvas.style.zIndex = '10';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.display = 'block';
    console.log("✅ Canvas forced to top layer");
  } else {
    console.warn("⚠️ Canvas not found");
  }
}, 1000);
});

// ========== TUTORIAL FUNCTIONS ==========
let tutorialStep = 1;
function nextPage(pageNumber) {
  tutorialStep = pageNumber;
  document.querySelectorAll('.tutorial-page').forEach(page => page.classList.remove('active'));
  const targetPage = document.getElementById(`page-${pageNumber}`);
  if (targetPage) targetPage.classList.add('active');
  const btn = document.getElementById('nav-btn-next');
  if (btn) btn.innerText = tutorialStep === 3 ? "Start" : "Next";
}
function handleNext() {
  if (tutorialStep < 3) nextPage(tutorialStep + 1);
  else toggleTutorial(false);
}
function toggleTutorial(show) {
  const modal = document.getElementById('tutorial-modal');
  const scanner = document.getElementById('scanner-container');
  if (!modal) return;
  if (show) {
    modal.style.display = 'flex';
    if (scanner) scanner.style.display = 'none';
    tutorialStep = 1;
    setTimeout(() => nextPage(1), 50);
  } else {
    modal.style.display = 'none';
    if (scanner) scanner.style.display = 'flex';
  }
}
