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
        
        self.el.object3D.rotation.y += deltaX * 0.01;
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
    'c': {
        targetIndex: 2,
        models: {
            'can': { file: 'can.glb', scale: '0.5 0.5 0.5', label: 'Can', default: true },
            'cup': { file: 'cup.glb', scale: '0.4 0.4 0.4', label: 'Cup' },
            'cat': { file: 'cat.glb', scale: '0.5 0.5 0.5', label: 'Cat' }
        }
    },
    'd': {
        targetIndex: 3,
        models: {
            'dino': { file: 'dino.glb', scale: '0.5 0.5 0.5', label: 'Dino', default: true },
            'drum': { file: 'drum.glb', scale: '0.5 0.5 0.5', label: 'Drum' },
            'dolphin': { file: 'dolphin.glb', scale: '0.5 0.5 0.5', label: 'Dolphin' }
        }
    },
    'e': {
        targetIndex: 4,
        models: {
            'emerald': { file: 'emerald.glb', scale: '0.3 0.3 0.3', label: 'Emerald', default: true },
            'elephant': { file: 'elephant.glb', scale: '0.1 0.1 0.1', label: 'Elephant' },
            'egg': { file: 'egg.glb', scale: '0.3 0.3 0.3', label: 'Egg' }
        }
    },
    'f': {
        targetIndex: 5,
        models: {
            'flower': { file: 'flower.glb', scale: '1 1 1', label: 'Flower', default: true },
            'funnel': { file: 'funnel.glb', scale: '0.09 0.09 0.09', label: 'Funnel' },
            'fan': { file: 'fan.glb', scale: '0.1 0.1 0.1', label: 'Fan' }
        }
    },
    'g': {
        targetIndex: 6,
        models: {
            'gift': { file: 'gift.glb', scale: '0.5 0.5 0.5', label: 'Gift', default: true },
            'goat': { file: 'goat.glb', scale: '0.5 0.5 0.5', label: 'Goat' },
            'grape': { file: 'grape.glb', scale: '0.4 0.4 0.4', label: 'Grape' }
        }
    },
    'h': {
        targetIndex: 7,
        models: {
            'hat': { file: 'hat.glb', scale: '0.01 0.01 0.01', label: 'Hat', default: true },
            'horse': { file: 'horse.glb', scale: '0.5 0.5 0.5', label: 'Horse' },
            'hammer': { file: 'hammer.glb', scale: '0.15 0.15 0.15', label: 'Hammer' }
        }
    },
    'i': {
        targetIndex: 8,
        models: {
            'insect': { file: 'insect.glb', scale: '0.05 0.05 0.05', label: 'Insect', default: true },
            'ironbox': { file: 'ironbox.glb', scale: '0.01 0.01 0.01', label: 'Iron Box' },
            'icecube': { file: 'icecube.glb', scale: '0.1 0.1 0.1', label: 'Ice Cube' }
        }
    },
    'j': {
        targetIndex: 9,
        models: {
            'jacket': { file: 'jacket.glb', scale: '0.009 0.009 0.009', label: 'Jacket', default: true },
            'joker': { file: 'joker.glb', scale: '0.1 0.1 0.1', label: 'Joker' },
            'jar': { file: 'jar.glb', scale: '0.15 0.15 0.15', label: 'Jar' }
        }
    },
    'k': {
        targetIndex: 10,
        models: {
            'kite': { file: 'kite.glb', scale: '0.05 0.05 0.05', label: 'Kite', default: true },
            'ketchup': { file: 'ketchup.glb', scale: '0.008 0.008 0.008', label: 'Ketchup' },
            'kangaroo': { file: 'kangaroo.glb', scale: '0.45 0.45 0.45', label: 'Kangaroo' }
        }
    },
    'l': {
        targetIndex: 11,
        models: {
            'lipstick': { file: 'lipstick.glb', scale: '0.2 0.2 0.2', label: 'Lipstick', default: true },
            'lemon': { file: 'lemon.glb', scale: '5 5 5', label: 'Lemon' },
            'leaf': { file: 'leaf.glb', scale: '0.1 0.1 0.1', label: 'Leaf' }
        }
    },
    'm': {
        targetIndex: 12,
        models: {
            'mushroom': { file: 'mushroom.glb', scale: '0.1 0.1 0.1', label: 'Mushroom', default: true },
            'mouse': { file: 'mouse.glb', scale: '0.2 0.2 0.2', label: 'Mouse' },
            'mango': { file: 'mango.glb', scale: '2.3 2.3 2.3', label: 'Mango' }
        }
    },
    'n': {
        targetIndex: 13,
        models: {
            'nest': { file: 'nest.glb', scale: '1 1 1', label: 'Nest', default: true },
            'notebook': { file: 'notebook.glb', scale: '0.15 0.15 0.15', label: 'Notebook' },
            'nose': { file: 'nose.glb', scale: '0.6 0.6 0.6', label: 'Nose' }
        }
    },
    'o': {
        targetIndex: 14,
        models: {
            'oven': { file: 'oven.glb', scale: '0.25 0.25 0.25', label: 'Oven', default: true },
            'owl': { file: 'owl.glb', scale: '1.6 1.6 1.6', label: 'Owl' },
            'onion': { file: 'onion.glb', scale: '4 4 4', label: 'Onion' }
        }
    },
    'p': {
        targetIndex: 15,
        models: {
            'purse': { file: 'purse.glb', scale: '0.01 0.01 0.01', label: 'Purse', default: true },
            'pumpkin': { file: 'pumpkin.glb', scale: '0.3 0.3 0.3', label: 'Pumpkin' },
            'pizza': { file: 'pizza.glb', scale: '0.03 0.03 0.03', label: 'Pizza' }
        }
    },
    'q': {
        targetIndex: 16,
        models: {
            'queen': { file: 'queen.glb', scale: '0.25 0.25 0.25', label: 'Queen', default: true },
            'quokka': { file: 'quokka.glb', scale: '1 1 1', label: 'Quokka' },
            'quadbike': { file: 'quadbike.glb', scale: '0.2 0.2 0.2', label: 'Quad Bike' }
        }
    },
    'r': {
        targetIndex: 17,
        models: {
            'robot': { file: 'robot.glb', scale: '0.35 0.35 0.35', label: 'Robot', default: true },
            'ring': { file: 'ring.glb', scale: '1 1 1', label: 'Ring' },
            'rope': { file: 'rope.glb', scale: '0.3 0.3 0.3', label: 'Rope' }
        }
    },
    's': {
        targetIndex: 18,
        models: {
            'scarf': { file: 'scarf.glb', scale: '0.5 0.5 0.5', label: 'Scarf', default: true },
            'spoon': { file: 'spoon.glb', scale: '0.4 0.4 0.4', label: 'Spoon' },
            'sun': { file: 'sun.glb', scale: '0.05 0.05 0.05', label: 'Sun' }
        }
    },
    't': {
        targetIndex: 19,
        models: {
            'tortoise': { file: 'tortoise.glb', scale: '2 2 2', label: 'Tortoise', default: true },
            'tiger': { file: 'tiger.glb', scale: '0.6 0.6 0.6', label: 'Tiger' },
            'taxi': { file: 'taxi.glb', scale: '0.2 0.2 0.2', label: 'Taxi' }
        }
    },
    'u': {
        targetIndex: 20,
        models: {
            'umbrella': { file: 'umbrella.glb', scale: '0.06 0.06 0.06', label: 'Umbrella', default: true },
            'unicorn': { file: 'unicorn.glb', scale: '0.01 0.01 0.01', label: 'Unicorn' },
            'ufo': { file: 'ufo.glb', scale: '0.18 0.18 0.18', label: 'UFO' }
        }
    },
    'v': {
        targetIndex: 21,
        models: {
            'van': { file: 'van.glb', scale: '0.1 0.01 0.1', label: 'Van', default: true },
            'viking': { file: 'viking.glb', scale: '0.5 0.5 0.5', label: 'Viking' },
            'vulture': { file: 'vulture.glb', scale: '1.2 1.2 1.2', label: 'Vulture' }
        }
    },
    'w': {
        targetIndex: 22,
        models: {
            'watch': { file: 'watch.glb', scale: '0.025 0.025 0.025', label: 'Watch', default: true },
            'whale': { file: 'whale.glb', scale: '0.3 0.3 0.3', label: 'Whale' },
            'walrus': { file: 'walrus.glb', scale: '0.3 0.3 0.3', label: 'Walrus' }
        }
    },
    'x': {
        targetIndex: 23,
        models: {
            'xylophone': { file: 'xylophone.glb', scale: '0.002 0.002 0.002', label: 'Xylophone', default: true },
            'xmas-tree': { file: 'xmas-tree.glb', scale: '0.4 0.4 0.4', label: 'X-mas Tree' },
            'xebec': { file: 'xebec.glb', scale: '0.0005 0.0005 0.0005',  label: 'Xebec' }
        }
    },
    'y': {
        targetIndex: 24,
        models: {
            'yoyo': { file: 'yoyo.glb', scale: '0.15 0.15 0.15', label: 'Yoyo', default: true },
            'yacht': { file: 'yacht.glb', scale: '0.035 0.035 0.035', label: 'Yacht' },
            'yawn': { file: 'yawn.glb', scale: '0.5 0.5 0.5', label: 'Yawn' }
        }
    },
    'z': {
        targetIndex: 25,
        models: {
            'zebra': { file: 'zebra.glb', scale: '0.25 0.25 0.25', label: 'Zebra', default: true },
            'zipper': { file: 'zipper.glb', scale: '0.1 0.1 0.1', label: 'Zipper' },
            'zeppelin': { file: 'zeppelin.glb', scale: '0.1 0.1 0.1', label: 'Zeppelin' }
        }
    }
};

// ===== ANIMATION CONFIGURATION =====
// For models that have animations, define available animation clips
const ANIMATION_CONFIG = {
    'dino': {
        'Attack': 'dino-attack.glb',
        'Run': 'dino-run.glb'
    },
  'elephant': {
        'Walk': 'elephant-walk.glb'
    },
  'goat': {
        'Walk': 'goat-walk.glb',
        'Run': 'goat-run.glb'
    },
  'horse': {
        'Walk': 'horse-walk.glb',
        'Run': 'horse-run.glb'
    },
    'insect': {
        'Fly': 'insect-fly.glb',
        'Take Off': 'insect-takeoff.glb'
    },
    'kangaroo': {
        'Walk': 'kangaroo-walk.glb',
        'Run': 'kangaroo-run.glb'
    },
    'mouse': {
        'Run Cycle': 'mouse-runcycle.glb'
    },
    'queen': {
        'Attack': 'queen-attack.glb',
        'Run': 'queen-run.glb'
    },
    'robot': {
        'Attack': 'robot-attack.glb',
        'Hop': 'robot-hop.glb'
    },
    'vulture': {
        'Attack': 'vulture-attack.glb',
        'Flying': 'vulture-flying.glb'
    },
    'walrus': {
        'Walk': 'walrus-walk.glb',
        'Swim': 'walrus-swim.glb'
    },
    'zebra': {
        'Walk': 'zebra-walk.glb',
        'Run': 'zebra-run.glb'
    }

    // Add more models as needed, e.g.:
    // 'tiger': { walk: 'walk', run: 'run', idle: 'idle' },
    // 'horse': { gallop: 'gallop', idle: 'idle' }
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
// ===== MODEL SWITCHING FUNCTION (with animation support) =====
// ===== MODEL SWITCHING FUNCTION (with animation variants) =====
window.switchModel = function(targetId, modelName, isAnimationVariant = false, variantFile = null) {
    const modelDisplay = document.getElementById(`${targetId}-display`);
    if (!modelDisplay) {
        console.error('Model display not found:', targetId);
        return;
    }
    
    const parentEntity = modelDisplay.parentElement;
    const letter = targetId.split('-')[1];
    const animControlsDiv = document.getElementById(`anim-controls-${letter}`);
    
    // Determine the actual GLB file to load
    let actualModelName = modelName;
    let glbFile = `#${modelName}`;
    
    if (isAnimationVariant && variantFile) {
        // For animation variants, we need to ensure the asset exists in <a-assets>
        // We'll use the variant file name as the asset ID
        const variantId = variantFile.replace('.glb', '');
        glbFile = `#${variantId}`;
        actualModelName = variantId;
    }
    
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
        newModel.setAttribute('gltf-model', glbFile);
        newModel.setAttribute('position', '0 0 -0.5');
        newModel.setAttribute('scale', '0 0 0');
        newModel.setAttribute('touch-rotate', '');
        newModel.setAttribute('animation-mixer', ''); // Still add for any embedded animations
        
        // Pop-up and scale animations
        newModel.setAttribute('animation__popup', {
            property: 'position',
            from: '0 0 -0.5',
            to: '0 0 0',
            dur: 800,
            easing: 'easeOutBack'
        });
        
        newModel.setAttribute('animation__scale', {
            property: 'scale',
            from: '0 0 0',
            to: scale,
            dur: 800,
            easing: 'easeOutBack'
        });
        
        newModel.setAttribute('animation__rotate', {
            property: 'rotation',
            from: '0 0 0',
            to: '0 360 0',
            dur: 800,
            easing: 'easeOutQuad'
        });
        
        parentEntity.appendChild(newModel);
        console.log('✅ Switched to:', actualModelName);
        
        // Handle animation buttons: show if the selected model has animation variants
        if (animControlsDiv) {
            if (ANIMATION_CONFIG[modelName] && !isAnimationVariant) {
                // Clear previous buttons
                animControlsDiv.innerHTML = '';
                // Create buttons for each animation variant
                const animNames = Object.keys(ANIMATION_CONFIG[modelName]);
                animNames.forEach(animKey => {
                    const btn = document.createElement('button');
                    btn.className = 'model-btn anim-btn';
                    btn.textContent = animKey;
                    btn.setAttribute('data-animation', animKey);
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const variantFile = ANIMATION_CONFIG[modelName][animKey];
                        window.switchModel(targetId, modelName, true, variantFile);
                    });
                    animControlsDiv.appendChild(btn);
                });
                animControlsDiv.style.display = 'flex';
            } else if (!ANIMATION_CONFIG[modelName]) {
                animControlsDiv.style.display = 'none';
                animControlsDiv.innerHTML = '';
            }
        }
    }, 300);
};

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded fired");
    
    const startBtn = document.getElementById('start-btn');
    const uiLayer = document.getElementById('ui');
    const scannerLayer = document.getElementById('scanner-container');
    const iconLayer = document.getElementById('icon-layer');
    const sceneEl = document.getElementById('sceneEl');
    const loadingScreen = document.getElementById('loading-screen');

    // Force hide loading screen after 5 seconds regardless (fallback)
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
            console.log("Loading screen hidden by fallback timer");
        }
        if (uiLayer) uiLayer.classList.add('loaded');
    }, 5000);

    // Hide loading screen when window loads
    window.addEventListener('load', () => {
        console.log("Window load event fired");
        setTimeout(() => {
            if (loadingScreen) loadingScreen.style.display = 'none';
            if (uiLayer) uiLayer.classList.add('loaded');
            console.log("Loading screen hidden after load");
        }, 1000);
    });

    // Tutorial buttons
    const btnRight = document.getElementById('btn-right');
    if (btnRight) btnRight.addEventListener('click', () => toggleTutorial(true));

    const closeBtn = document.getElementById('close-tutorial-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => toggleTutorial(false));

    // Start AR button
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log("Start AR button clicked");
            uiLayer.style.display = 'none';
            const bgVideo = document.getElementById('bg-video');
            if (bgVideo) {
                bgVideo.pause();
                bgVideo.style.display = 'none';
            }
            scannerLayer.style.display = 'flex';
            iconLayer.style.display = 'flex';

            // Start MindAR system
            const arSystem = sceneEl ? sceneEl.systems['mindar-image-system'] : null;
            if (arSystem) {
                arSystem.start();
                window.dispatchEvent(new Event('resize'));
                console.log("MindAR system started");
            } else {
                console.error("MindAR system not found");
            }
        });
    } else {
        console.error("Start button not found");
    }

    // ===== UNIVERSAL BUTTON CLICK HANDLER =====
    document.body.addEventListener('click', (e) => {
        if (e.target.classList && e.target.classList.contains('model-btn')) {
            const modelName = e.target.getAttribute('data-model');
            const targetId = e.target.getAttribute('data-target');
            if (modelName && targetId) {
                window.switchModel(targetId, modelName);
                // Update active button
                document.querySelectorAll(`[data-target="${targetId}"] .model-btn`).forEach(b => {
                    b.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        }
    });

    // ===== AUTO-SETUP ALL TARGETS FROM CONFIG =====
    Object.keys(LETTER_CONFIG).forEach(letter => {
        const targetId = `target-${letter}`;
        const targetEl = document.getElementById(targetId);
        
        if (targetEl) {
            targetEl.addEventListener("targetFound", () => {
                console.log(`Target found: ${targetId}`);
                if (scannerLayer) scannerLayer.style.display = 'none';
                const selector = document.getElementById(`model-selector-${letter}`);
                if (selector) selector.style.display = 'flex';
            });

            targetEl.addEventListener("targetLost", () => {
                console.log(`Target lost: ${targetId}`);
                if (scannerLayer) scannerLayer.style.display = 'flex';
                const selector = document.getElementById(`model-selector-${letter}`);
                if (selector) selector.style.display = 'none';
            });
        } else {
            console.warn(`Target element not found: ${targetId}`);
        }
    });
    
    console.log("Initialization complete");
});
