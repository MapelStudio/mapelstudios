alert("main.js started");

// ===============================
// 1) XR TARGET CONFIGURATION
// ===============================

window.addEventListener('xrloaded', () => {
  console.log("XR engine ready – configuring image targets");

  XR8.XrController.configure({
    imageTargetData: [

      {
        name: "target-a",
        imagePath: "./data/Ajpg.jpeg",
        type: "PLANAR",
        metadata: {},
        properties: {
          left: 0,
          top: 0,
          width: 2157,
          height: 1039,
          originalWidth: 2157,
          originalHeight: 1039,
          isRotated: false
        }
      },

      {
        name: "target-b",
        imagePath: "./data/Bjpg.jpeg",
        type: "PLANAR",
        metadata: {},
        properties: {
          left: 0,
          top: 0,
          width: 2157,
          height: 999,
          originalWidth: 2157,
          originalHeight: 999,
          isRotated: false
        }
      },

      {
        name: "target-e",
        imagePath: "./data/Ejpg.jpeg",
        type: "PLANAR",
        metadata: {},
        properties: {
          left: 0,
          top: 0,
          width: 2157,
          height: 999,
          originalWidth: 2157,
          originalHeight: 999,
          isRotated: false
        }
      },

      {
        name: "target-f",
        imagePath: "./data/Fjpg.jpeg",
        type: "PLANAR",
        metadata: {},
        properties: {
          left: 0,
          top: 0,
          width: 2157,
          height: 1000,
          originalWidth: 2157,
          originalHeight: 1000,
          isRotated: false
        }
      },

      {
        name: "target-g",
        imagePath: "./data/Gjpg.jpeg",
        type: "PLANAR",
        metadata: {},
        properties: {
          left: 0,
          top: 0,
          width: 2157,
          height: 1000,
          originalWidth: 2157,
          originalHeight: 1000,
          isRotated: false
        }
      }

    ]
  });

  console.log("Image targets configured");
});



// ===============================
// 2) DEBUG EVENTS
// ===============================

window.addEventListener('xrimagefound', (event) => {
  console.log("TARGET FOUND:", event.detail.name);
});

window.addEventListener('xrimagelost', (event) => {
  console.log("TARGET LOST:", event.detail.name);
});

window.addEventListener('xrerror', (event) => {
  console.error("XR ERROR:", event.detail);
});



// ===============================
// 3) TOUCH ROTATION COMPONENT
// ===============================

AFRAME.registerComponent('touch-rotate', {
  init: function () {

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



// ===============================
// 4) MODEL SWITCH FUNCTION
// ===============================

window.switchModel = function(targetId, modelName) {

  console.log("Switching model:", targetId, modelName);

  const anchor = document.getElementById(`${targetId}-anchor`);

  if (!anchor) {
    console.error("Anchor not found:", targetId);
    return;
  }

  const oldModel =
    document.getElementById(`${targetId}-display`);

  if (oldModel) {
    oldModel.remove();
  }

  const newModel =
    document.createElement('a-gltf-model');

  newModel.id =
    `${targetId}-display`;

  // IMPORTANT — correct attribute
  newModel.setAttribute(
    'gltf-model',
    `#${modelName}`
  );

  newModel.setAttribute(
    'position',
    '0 0 0.1'
  );

  newModel.setAttribute(
    'scale',
    '1 1 1'
  );

  newModel.setAttribute(
    'animation-mixer',
    ''
  );

  newModel.setAttribute(
    'touch-rotate',
    ''
  );

  newModel.addEventListener(
    'model-loaded',
    () => {
      alert("MODEL LOADED");
    }
  );

  newModel.addEventListener(
    'model-error',
    (e) => {
      alert("MODEL ERROR");
      console.error(e);
    }
  );

  anchor.appendChild(newModel);

};


// ===============================
// 5) START AR BUTTON
// ===============================

document.addEventListener(
  'DOMContentLoaded',
  () => {

    const startBtn =
      document.getElementById(
        'start-btn'
      );

    const uiLayer =
      document.getElementById(
        'ui'
      );

    const scanner =
      document.getElementById(
        'scanner-container'
      );

    if (startBtn) {

      startBtn.addEventListener(
        'click',
        () => {

          console.log(
            "Starting AR"
          );

          if (uiLayer)
            uiLayer.style.display =
              'none';

          if (scanner)
            scanner.style.display =
              'flex';

          document.body.classList.add(
            'ar-active'
          );

        }
      );

    }

  }
);
