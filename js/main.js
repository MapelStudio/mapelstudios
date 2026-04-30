// ===== 8TH WALL IMAGE TARGETS CONFIGURATION =====
// Define all 26 letter targets for 8th Wall
const IMAGE_TARGETS = [
  { name: "letter-a", imagePath: "./targets/A.jpg" },
  { name: "letter-b", imagePath: "./targets/B.jpg" },
  { name: "letter-c", imagePath: "./targets/C.jpg" },
  { name: "letter-d", imagePath: "./targets/D.jpg" },
  { name: "letter-e", imagePath: "./targets/E.jpg" },
  { name: "letter-f", imagePath: "./targets/F.jpg" },
  { name: "letter-g", imagePath: "./targets/G.jpg" },
  { name: "letter-h", imagePath: "./targets/H.jpg" },
  { name: "letter-i", imagePath: "./targets/I.jpg" },
  { name: "letter-j", imagePath: "./targets/J.jpg" },
  { name: "letter-k", imagePath: "./targets/K.jpg" },
  { name: "letter-l", imagePath: "./targets/L.jpg" },
  { name: "letter-m", imagePath: "./targets/M.jpg" },
  { name: "letter-n", imagePath: "./targets/N.jpg" },
  { name: "letter-o", imagePath: "./targets/O.jpg" },
  { name: "letter-p", imagePath: "./targets/P.jpg" },
  { name: "letter-q", imagePath: "./targets/Q.jpg" },
  { name: "letter-r", imagePath: "./targets/R.jpg" },
  { name: "letter-s", imagePath: "./targets/S.jpg" },
  { name: "letter-t", imagePath: "./targets/T.jpg" },
  { name: "letter-u", imagePath: "./targets/U.jpg" },
  { name: "letter-v", imagePath: "./targets/V.jpg" },
  { name: "letter-w", imagePath: "./targets/W.jpg" },
  { name: "letter-x", imagePath: "./targets/X.jpg" },
  { name: "letter-y", imagePath: "./targets/Y.jpg" },
  { name: "letter-z", imagePath: "./targets/Z.jpg" }
];

// ===== 8TH WALL INITIALIZATION =====
const onxrloaded = () => {
  // Configure 8th Wall with all image targets
  XR8.XrController.configure({
    imageTargetData: IMAGE_TARGETS
  });
  
  console.log("✅ 8th Wall configured with", IMAGE_TARGETS.length, "letter targets");
};

// Wait for 8th Wall to load
window.XR8
  ? onxrloaded()
  : window.addEventListener("xrloaded", onxrloaded);

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
            'kite': { file: 'kite.glb', scale: '0.5 0.5 0.5', label: 'Kite', default: true },
            'ketchup': { file: 'ketchup.glb', scale: '0.4 0.4 0.4', label: 'Ketchup' },
            'kangaroo': { file: 'kangaroo.glb', scale: '0.6 0.6 0.6', label: 'Kangaroo' }
        }
    },
    'l': {
        targetIndex: 11,
        models: {
            'lipstick': { file: 'lipstick.glb', scale: '0.4 0.4 0.4', label: 'Lipstick', default: true },
            'lemon': { file: 'lemon.glb', scale: '0.5 0.5 0.5', label: 'Lemon' },
            'leaf': { file: 'leaf.glb', scale: '0.6 0.6 0.6', label: 'Leaf' }
        }
    },
    'm': {
        targetIndex: 12,
        models: {
            'mushroom': { file: 'mushroom.glb', scale: '0.5 0.5 0.5', label: 'Mushroom', default: true },
            'mouse': { file: 'mouse.glb', scale: '0.4 0.4 0.4', label: 'Mouse' },
            'mango': { file: 'mango.glb', scale: '0.6 0.6 0.6', label: 'Mango' }
        }
    },
    'n': {
        targetIndex: 13,
        models: {
            'nest': { file: 'nest.glb', scale: '0.5 0.5 0.5', label: 'Nest', default: true },
            'notebook': { file: 'notebook.glb', scale: '0.4 0.4 0.4', label: 'Notebook' },
            'nose': { file: 'nose.glb', scale: '0.3 0.3 0.3', label: 'Nose' }
        }
    },
    'o': {
        targetIndex: 14,
        models: {
            'oven': { file: 'oven.glb', scale: '0.5 0.5 0.5', label: 'Oven', default: true },
            'owl': { file: 'owl.glb', scale: '0.4 0.4 0.4', label: 'Owl' },
            'onion': { file: 'onion.glb', scale: '0.4 0.4 0.4', label: 'Onion' }
        }
    },
    'p': {
        targetIndex: 15,
        models: {
            'purse': { file: 'purse.glb', scale: '0.5 0.5 0.5', label: 'Purse', default: true },
            'pumpkin': { file: 'pumpkin.glb', scale: '0.6 0.6 0.6', label: 'Pumpkin' },
            'pizza': { file: 'pizza.glb', scale: '0.5 0.5 0.5', label: 'Pizza' }
        }
    },
    'q': {
        targetIndex: 16,
        models: {
            'queen': { file: 'queen.glb', scale: '0.5 0.5 0.5', label: 'Queen', default: true },
            'quokka': { file: 'quokka.glb', scale: '0.4 0.4 0.4', label: 'Quokka' },
            'quadbike': { file: 'quadbike.glb', scale: '0.3 0.3 0.3', label: 'Quad Bike' }
        }
    },
    'r': {
        targetIndex: 17,
        models: {
            'robot': { file: 'robot.glb', scale: '0.5 0.5 0.5', label: 'Robot', default: true },
            'ring': { file: 'ring.glb', scale: '0.4 0.4 0.4', label: 'Ring' },
            'rope': { file: 'rope.glb', scale: '0.6 0.6 0.6', label: 'Rope' }
        }
    },
    's': {
        targetIndex: 18,
        models: {
            'scarf': { file: 'scarf.glb', scale: '0.5 0.5 0.5', label: 'Scarf', default: true },
            'spoon': { file: 'spoon.glb', scale: '0.4 0.4 0.4', label: 'Spoon' },
            'sun': { file: 'sun.glb', scale: '0.5 0.5 0.5', label: 'Sun' }
        }
    },
    't': {
        targetIndex: 19,
        models: {
            'tortoise': { file: 'tortoise.glb', scale: '0.5 0.5 0.5', label: 'Tortoise', default: true },
            'tiger': { file: 'tiger.glb', scale: '0.6 0.6 0.6', label: 'Tiger' },
            'taxi': { file: 'taxi.glb', scale: '0.4 0.4 0.4', label: 'Taxi' }
        }
    },
    'u': {
        targetIndex: 20,
        models: {
            'umbrella': { file: 'umbrella.glb', scale: '0.5 0.5 0.5', label: 'Umbrella', default: true },
            'unicorn': { file: 'unicorn.glb', scale: '0.5 0.5 0.5', label: 'Unicorn' },
            'ufo': { file: 'ufo.glb', scale: '0.4 0.4 0.4', label: 'UFO' }
        }
    },
    'v': {
        targetIndex: 21,
        models: {
            'van': { file: 'van.glb', scale: '0.5 0.5 0.5', label: 'Van', default: true },
            'viking': { file: 'viking.glb', scale: '0.5 0.5 0.5', label: 'Viking' },
            'vulture': { file: 'vulture.glb', scale: '0.5 0.5 0.5', label: 'Vulture' }
        }
    },
    'w': {
        targetIndex: 22,
        models: {
            'watch': { file: 'watch.glb', scale: '0.5 0.5 0.5', label: 'Watch', default: true },
            'whale': { file: 'whale.glb', scale: '0.6 0.6 0.6', label: 'Whale' },
            'walrus': { file: 'walrus.glb', scale: '0.5 0.5 0.5', label: 'Walrus' }
        }
    },
    'x': {
        targetIndex: 23,
        models: {
            'xylophone': { file: 'xylophone.glb', scale: '0.5 0.5 0.5', label: 'Xylophone', default: true },
            'xmas-tree': { file: 'xmas-tree.glb', scale: '0.6 0.6 0.6', label: 'X-mas Tree' },
            'xebec': { file: 'xebec.glb', scale: '0.4 0.4 0.4', label: 'Xebec' }
        }
    },
    'y': {
        targetIndex: 24,
        models: {
            'yoyo': { file: 'yoyo.glb', scale: '0.5 0.5 0.5', label: 'Yoyo', default: true },
            'yacht': { file: 'yacht.glb', scale: '0.5 0.5 0.5', label: 'Yacht' },
            'yawn': { file: 'yawn.glb', scale: '0.5 0.5 0.5', label: 'Yawn' }
        }
    },
    'z': {
        targetIndex: 25,
        models: {
            'zebra': { file: 'zebra.glb', scale: '0.5 0.5 0.5', label: 'Zebra', default: true },
            'zipper': { file: 'zipper.glb', scale: '0.4 0.4 0.4', label: 'Zipper' },
            'zeppelin': { file: 'zeppelin.glb', scale: '0.5 0.5 0.5', label: 'Zeppelin' }
        }
    }
};

// ===== ANIMATION CONFIGURATION =====
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
};

// ===== AUTO-GENERATE MODEL SCALES =====
const MODEL_SCALES = {};
Object.keys(LETTER_CONFIG).forEach(letter => {
    Object.keys(LETTER_CONFIG[letter].models).forEach(modelName => {
        MODEL_SCALES[modelName] = LETTER_CONFIG[letter].models[modelName].scale;
    });
});

// ===== TRACKING STATE =====
const trackedTargets = {};

// ===== MODEL SWITCHING FUNCTION =====
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
        newModel.setAttribute('animation-mixer', '');
        
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
        
        // Handle animation buttons
        if (animControlsDiv) {
            if (ANIMATION_CONFIG[modelName] && !isAnimationVariant) {
                animControlsDiv.innerHTML = '';
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

// ===== 8TH WALL TARGET DETECTION SETUP =====
function setupTargetDetection() {
    // Add camera pipeline module for target detection
    XR8.addCameraPipelineModule({
        name: "target-detection-listener",
        onUpdate: ({processCpuResult}) => {
            const targets = processCpuResult?.reality?.imageTargets;
            
            if (!targets) return;
            
            targets.forEach((target) => {
                const letterMap = {
                    'letter-a': 'a', 'letter-b': 'b', 'letter-c': 'c', 'letter-d': 'd',
                    'letter-e': 'e', 'letter-f': 'f', 'letter-g': 'g', 'letter-h': 'h',
                    'letter-i': 'i', 'letter-j': 'j', 'letter-k': 'k', 'letter-l': 'l',
                    'letter-m': 'm', 'letter-n': 'n', 'letter-o': 'o', 'letter-p': 'p',
                    'letter-q': 'q', 'letter-r': 'r', 'letter-s': 's', 'letter-t': 't',
                    'letter-u': 'u', 'letter-v': 'v', 'letter-w': 'w', 'letter-x': 'x',
                    'letter-y': 'y', 'letter-z': 'z'
                };
                
                const letter = letterMap[target.name];
                if (!letter) return;
                
                const targetId = `target-${letter}`;
                const targetEntity = document.getElementById(targetId);
                const modelSelector = document.getElementById(`model-selector-${letter}`);
                const scannerLayer = document.getElementById('scanner-container');
                
                if (target.isTracked) {
                    if (!trackedTargets[targetId]) {
                        console.log(`✅ Target detected: ${target.name}`);
                        trackedTargets[targetId] = true;
                        
                        // Hide scanner and show model selector
                        if (scannerLayer) scannerLayer.style.display = 'none';
                        if (modelSelector) modelSelector.style.display = 'flex';
                        
                        // Initialize default model if target is empty
                        if (targetEntity && !document.getElementById(`${targetId}-display`)) {
                            initializeDefaultModel(targetId, letter);
                        }
                    }
                } else {
                    if (trackedTargets[targetId]) {
                        console.log(`❌ Target lost: ${target.name}`);
                        trackedTargets[targetId] = false;
                        
                        // Show scanner and hide model selector
                        if (scannerLayer) scannerLayer.style.display = 'flex';
                        if (modelSelector) modelSelector.style.display = 'none';
                    }
                }
            });
        }
    });
}

// ===== INITIALIZE DEFAULT MODEL =====
function initializeDefaultModel(targetId, letter) {
    const targetEntity = document.getElementById(targetId);
    if (!targetEntity) return;
    
    const letterConfig = LETTER_CONFIG[letter];
    if (!letterConfig) return;
    
    // Find default model
    let defaultModelName = null;
    for (const [modelName, modelConfig] of Object.entries(letterConfig.models)) {
        if (modelConfig.default) {
            defaultModelName = modelName;
            break;
        }
    }
    
    if (!defaultModelName) defaultModelName = Object.keys(letterConfig.models)[0];
    
    const modelConfig = letterConfig.models[defaultModelName];
    const scale = modelConfig.scale;
    
    // Create model display container
    const modelDisplay = document.createElement('a-entity');
    modelDisplay.setAttribute('id', `${targetId}-display`);
    modelDisplay.setAttribute('position', '0 0 0');
    
    // Create and add the default model
    const model = document.createElement('a-gltf-model');
    model.setAttribute('gltf-model', `#${defaultModelName}`);
    model.setAttribute('position', '0 0 -0.5');
    model.setAttribute('scale', scale);
    model.setAttribute('touch-rotate', '');
    model.setAttribute('animation-mixer', '');
    
    modelDisplay.appendChild(model);
    targetEntity.appendChild(modelDisplay);
    
    console.log(`📦 Loaded default model: ${defaultModelName} for ${targetId}`);
}

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 DOMContentLoaded fired");
    
    const startBtn = document.getElementById('start-btn');
    const uiLayer = document.getElementById('ui');
    const scannerLayer = document.getElementById('scanner-container');
    const iconLayer = document.getElementById('icon-layer');
    const sceneEl = document.getElementById('sceneEl');
    
    // Start AR button
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log("▶️ Start AR button clicked");
            document.getElementById("sceneEl").style.opacity = "1";
            document.getElementById("sceneEl").style.pointerEvents = "auto";
            uiLayer.style.display = 'none';
            scannerLayer.style.display = 'flex';
            iconLayer.style.display = 'flex';
            
            // START 8TH WALL ENGINE
            XR8.run({
                canvas: document.getElementById("camerafeed")
            });
            
            // Setup target detection
            setupTargetDetection();
            
            console.log("🎥 8th Wall AR engine started");
        });
    } else {
        console.error("❌ Start button not found");
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
    
    console.log("✅ Initialization complete");
});
