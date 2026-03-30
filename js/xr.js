// ===== 8TH WALL TARGET LOADER (SAFE VERSION) =====


// Wait until XR engine is ready
window.addEventListener('xrloaded', () => {
  console.log("XR engine ready");

  XR8.XrController.configure({
  imageTargetData: [
  {
    name: "A",
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
    name: "B",
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
    name: "C",
    imagePath: "./data/Cjpg.jpeg",
    type: "PLANAR",
    metadata: {},
    properties: {
      left: 0,
      top: 0,
      width: 2157,
      height: 1020,
      originalWidth: 2157,
      originalHeight: 1020,
      isRotated: false
    }
  },

  {
    name: "D",
    imagePath: "./data/Djpg.jpeg",
    type: "PLANAR",
    metadata: {},
    properties: {
      left: 0,
      top: 0,
      width: 2208,
      height: 1000,
      originalWidth: 2208,
      originalHeight: 1000,
      isRotated: false
    }
  },

  {
    name: "E",
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
    name: "F",
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
    name: "G",
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
  },

  {
    name: "H",
    imagePath: "./data/Hjpg.jpeg",
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
    name: "I",
    imagePath: "./data/Ijpg.jpeg",
    type: "PLANAR",
    metadata: {},
    properties: {
      left: 0,
      top: 0,
      width: 2158,
      height: 999,
      originalWidth: 2158,
      originalHeight: 999,
      isRotated: false
    }
  },

  {
    name: "J",
    imagePath: "./data/Jjpg.jpeg",
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
});


// Error listener
window.addEventListener('xrerror', (event) => {
  console.error("XR error:", event.detail);
});

window.addEventListener('xrimagefound', (event) => {
alert("TARGET DETECTED: " + event.detail.name);
console.log("TARGET DETECTED:", event.detail.name);
});

window.addEventListener('xrimagelost', (event) => {
  alert("TARGET LOST: " + event.detail.name);
  console.log("TARGET LOST:", event.detail.name);
});
