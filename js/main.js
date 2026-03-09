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
        if (e.target.tagName === 'BUTTON' || e.target.closest('.anim-btn')) {
            return; 
        }
        if (e.touches.length > 0) {
            this.isMoving = true;
            this.lastX = e.touches[0].clientX;
            debugLog("Touch Started");
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
        debugLog("Touch Ended");
    });
  }
});

// Model switching system
AFRAME.registerComponent('switchable-model', {
    init: function() {
        this.el.addEventListener('click', (e) => {
            const clickedModel = e.target;
            const currentPosition = clickedModel.getAttribute('data-position');
            
            // Only switch if it's not already in middle
            if (currentPosition !== 'middle') {
                switchToMiddle(clickedModel);
            }
        });
    }
});

function switchToMiddle(clickedModel) {
}

// Debug function
function debugLog(msg) {
    console.log(msg);
    const debugDiv = document.getElementById('debug');
    if (debugDiv) {
        debugDiv.innerHTML += msg + '<br>';
        debugDiv.scrollTop = debugDiv.scrollHeight;
    }
}

// Global function for animation switching
function playAnim(type) {
    const horse = document.getElementById('horse-mesh');
    if (!horse) return;

    let fileURL = "";
    if (type === 'idle') fileURL = "./assets/horse_anime.glb";
    if (type === 'run')  fileURL = "./assets/animation1.glb";
    if (type === 'walk') fileURL = "./assets/animation2.glb";

    debugLog("🔄 Loading File: " + fileURL);

    horse.setAttribute('gltf-model', fileURL);

    horse.addEventListener('model-loaded', () => {
        debugLog("✅ SUCCESS: " + type + " loaded");
        horse.setAttribute('animation-mixer', {clip: '*', loop: 'repeat'});
    }, { once: true });
}

// Model switching function
function switchModel(targetId, modelName) {
    const modelDisplay = document.querySelector(`#${targetId}-display`);
    if (!modelDisplay) return;
    
    debugLog(`🔄 Switching to model: ${modelName}`);
    
    // Change the model source
    modelDisplay.setAttribute('gltf-model', `#${modelName}`);
    
    // Update active button
    const buttons = document.querySelectorAll(`[data-target="${targetId}"] .model-btn`);
    buttons.forEach(btn => {
        if (btn.getAttribute('data-model') === modelName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // TODO: Show/hide animation controls based on model
    // We'll add this later when you tell me which models have animations
}

// 1. New variable to track the current page globally
let tutorialStep = 1;

// 2. Updated nextPage to sync with our global step
function nextPage(pageNumber) {
    tutorialStep = pageNumber; // Keep track of which page we are on
    debugLog("📄 Going to page " + pageNumber);
    
    const allPages = document.querySelectorAll('.tutorial-page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    
    const allDots = document.querySelectorAll('.dot');
    allDots.forEach(dot => {
        dot.classList.remove('active');
    });

    const targetPage = document.getElementById(`page-${pageNumber}`);
    const targetDot = allDots[pageNumber - 1];

    if (targetPage) {
        targetPage.classList.add('active');
        debugLog("✅ Page " + pageNumber + " is now active");
    }
    
    if (targetDot) {
        targetDot.classList.add('active');
    }

    // Update the button text (Next vs Start) every time the page changes
    updateButtonText();
}

// 3. New function to handle the click on the external button
function handleNext() {
    if (tutorialStep < 3) {
        nextPage(tutorialStep + 1);
    } else {
        toggleTutorial(false); // Close if we are on the last page
    }
}

// 4. New function to swap button text
function updateButtonText() {
    const btn = document.getElementById('nav-btn-next');
    if (!btn) return;

    if (tutorialStep === 3) {
        btn.innerText = "Start";
        btn.classList.add('start-btn-active');
    } else {
        btn.innerText = "Next";
        btn.classList.remove('start-btn-active');
    }
}

// 5. Your existing toggleTutorial (remains mostly the same, but resets step)
function toggleTutorial(show) {
    const modal = document.getElementById('tutorial-modal');
    if (!modal) {
        debugLog("❌ Tutorial modal not found!");
        return;
    }

    if (show) {
        modal.style.display = 'flex';
        debugLog("🔓 Opening tutorial...");
        
        // Reset step to 1 whenever opening
        tutorialStep = 1; 

        setTimeout(() => {
            nextPage(1);
        }, 50);
    } else {
        modal.style.display = 'none';
        debugLog("🔒 Closing tutorial");
    }
}

function toggleAnimMenu() {
    const drawer = document.getElementById('anim-drawer');
    if (!drawer) return;

    if (drawer.style.display === 'none' || drawer.style.display === '') {
        drawer.style.display = 'flex'; // This must be 'flex' for horizontal layout
    } else {
        drawer.style.display = 'none';
    }
}

// Ensure the drawer closes when a selection is made
function playAnim(type) {
    const horse = document.getElementById('horse-mesh');
    if (!horse) return;

    let fileURL = "";
    if (type === 'idle') fileURL = "./assets/horse_anime.glb";
    if (type === 'run')  fileURL = "./assets/animation1.glb";
    if (type === 'walk') fileURL = "./assets/animation2.glb";

    horse.setAttribute('gltf-model', fileURL);
    
    // Hide the drawer after clicking an option
    document.getElementById('anim-drawer').style.display = 'none';
    
    debugLog("✅ Playing: " + type);
}

// SINGLE DOMContentLoaded - Everything goes here
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
    // Hide loading screen when everything is ready
const loadingScreen = document.getElementById('loading-screen');

window.addEventListener('load', () => {
    setTimeout(() => {
        if (loadingScreen) {
            // Hide loading screen
            loadingScreen.style.display = 'none';
            
            // Show landing page
            const uiLayer = document.getElementById('ui');
            if (uiLayer) {
                uiLayer.classList.add('loaded');
            }
        }
    }, 3000);
});
    
    // Tutorial button listeners
    const btnRight = document.getElementById('btn-right');
    if (btnRight) {
        btnRight.addEventListener('click', () => {
            debugLog("🎯 Tutorial button clicked");
            toggleTutorial(true);
        });
    }
    
    const closeBtn = document.getElementById('close-tutorial-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => toggleTutorial(false));
    }
    
    const finalStart = document.getElementById('close-tutorial-final');
    if (finalStart) {
        finalStart.addEventListener('click', () => toggleTutorial(false));
    }
    
    // Experience AR button
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
    // This loop handles A, B, and C automatically
// Target A - show model selector
const targetA = document.getElementById('target-a');
if (targetA) {
    targetA.addEventListener("targetFound", () => {
        debugLog("🎯 Found: Letter A");
        scannerLayer.style.display = 'none';
        document.getElementById('model-selector-a').style.display = 'flex';
    });

    targetA.addEventListener("targetLost", () => {
        debugLog("❌ Lost: Letter A");
        scannerLayer.style.display = 'flex';
        document.getElementById('model-selector-a').style.display = 'none';
    });
}

// Handle model button clicks
document.querySelectorAll('.model-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modelName = btn.getAttribute('data-model');
        const targetId = btn.getAttribute('data-target');
        switchModel(targetId, modelName);
    });
});

// Other targets (B, C) - keep old behavior for now
const otherTargets = document.querySelectorAll('.alphabet-target:not(#target-a)');
otherTargets.forEach(target => {
    target.addEventListener("targetFound", () => {
        debugLog("🎯 Found: " + target.id);
        scannerLayer.style.display = 'none';
    });

    target.addEventListener("targetLost", () => {
        debugLog("❌ Lost: " + target.id);
        scannerLayer.style.display = 'flex';
    });
});
});
