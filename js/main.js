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
            if (e.target.tagName === 'BUTTON' || e.target.closest('.anim-btn')) return;
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
        window.addEventListener('touchend', () => { this.isMoving = false; });
    }
});

function debugLog(msg) {
    console.log(msg);
    const debugDiv = document.getElementById('debug');
    if (debugDiv) {
        debugDiv.innerHTML += msg + '<br>';
        debugDiv.scrollTop = debugDiv.scrollHeight;
    }
}

// Variables for Tutorial and Animation tracking
let tutorialStep = 1;
let activeTargetId = null; 

// Global function for animation switching
function playAnim(type) {
    // Dynamically find the model inside the currently scanned target
    if (!activeTargetId) return;
    const targetEl = document.getElementById(activeTargetId);
    const model = targetEl ? targetEl.querySelector('a-gltf-model') : null;

    if (!model) {
        debugLog("❌ No model found to animate");
        return;
    }

    // Since your friend is sending files, we define what animations exist here
    // Note: If you have different animation files for Apple, update these paths
    let fileURL = "";
    if (type === 'idle') fileURL = "./assets/apple.glb"; // Example: default apple
    if (type === 'run')  fileURL = "./assets/animation1.glb";
    if (type === 'walk') fileURL = "./assets/animation2.glb";

    debugLog("🔄 Switching Animation: " + type);
    model.setAttribute('gltf-model', fileURL);

    // Hide drawer after selection
    const drawer = document.getElementById('anim-drawer');
    if (drawer) drawer.style.display = 'none';
}

function toggleAnimMenu() {
    const drawer = document.getElementById('anim-drawer');
    if (!drawer) return;
    drawer.style.display = (drawer.style.display === 'none' || drawer.style.display === '') ? 'flex' : 'none';
}

// Tutorial Navigation
function nextPage(pageNumber) {
    tutorialStep = pageNumber;
    const allPages = document.querySelectorAll('.tutorial-page');
    const allDots = document.querySelectorAll('.dot');
    
    allPages.forEach(p => p.classList.remove('active'));
    allDots.forEach(d => d.classList.remove('active'));

    const targetPage = document.getElementById(`page-${pageNumber}`);
    const targetDot = allDots[pageNumber - 1];

    if (targetPage) targetPage.classList.add('active');
    if (targetDot) targetDot.classList.add('active');
    
    updateButtonText();
}

function handleNext() {
    if (tutorialStep < 3) nextPage(tutorialStep + 1);
    else toggleTutorial(false);
}

function updateButtonText() {
    const btn = document.getElementById('nav-btn-next');
    if (!btn) return;
    btn.innerText = (tutorialStep === 3) ? "Start" : "Next";
    if (tutorialStep === 3) btn.classList.add('start-btn-active');
    else btn.classList.remove('start-btn-active');
}

function toggleTutorial(show) {
    const modal = document.getElementById('tutorial-modal');
    if (!modal) return;
    if (show) {
        modal.style.display = 'flex';
        tutorialStep = 1;
        setTimeout(() => nextPage(1), 50);
    } else {
        modal.style.display = 'none';
    }
}

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const uiLayer = document.getElementById('ui');
    const scannerLayer = document.getElementById('scanner-container');
    const sceneEl = document.getElementById('sceneEl');
    const alphabetTargets = document.querySelectorAll('.alphabet-target');
    const animMenu = document.getElementById('horse-menu');
    const loadingScreen = document.getElementById('loading-screen');

    // --- HIDE LOADERS ---
    sceneEl.addEventListener('loaded', () => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
        }
    });

    // --- START EXPERIENCE ---
    startBtn.addEventListener('click', () => {
        uiLayer.style.display = 'none';
        scannerLayer.style.display = 'flex';
        
        if (sceneEl.hasLoaded) startAR();
        else sceneEl.addEventListener('loaded', startAR);
    });

    function startAR() {
        const arSystem = sceneEl.systems['mindar-image-system'];
        if (arSystem) {
            // KILL DEFAULT BLUE LOADER
            const blueLoader = document.querySelector('.mindar-ui-loading');
            if (blueLoader) blueLoader.style.display = 'none';

            arSystem.start();
            window.dispatchEvent(new Event('resize'));
        }
    }

    // --- ALPHABET TARGET TRACKING ---
    alphabetTargets.forEach(target => {
        target.addEventListener("targetFound", () => {
            activeTargetId = target.id; // Store which letter we are looking at
            scannerLayer.style.display = 'none';
            if (animMenu) animMenu.style.display = 'flex';
            debugLog("🎯 Found: " + activeTargetId);
        });

        target.addEventListener("targetLost", () => {
            activeTargetId = null;
            scannerLayer.style.display = 'flex';
            if (animMenu) animMenu.style.display = 'none';
            document.getElementById('anim-drawer').style.display = 'none';
        });
    });

    // Link tutorial buttons
    const btnRight = document.getElementById('btn-right');
    if (btnRight) btnRight.addEventListener('click', () => toggleTutorial(true));
    
    const navNext = document.getElementById('nav-btn-next');
    if (navNext) navNext.addEventListener('click', handleNext);
});
