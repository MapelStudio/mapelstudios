// ===== 8TH WALL TARGET LOADER (SAFE VERSION) =====


// Wait until XR engine is ready
window.addEventListener('xrloaded', () => {
  console.log("XR engine ready");

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
    name: "target-c",
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
    name: "target-d",
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
  },

  {
    name: "target-h",
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
    name: "target-i",
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
    name: "target-j",
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
  alert("TARGET FOUND: " + event.detail.name);

  // Try to force something visible
  setTimeout(() => {
    alert("Trying to show test object...");
  }, 500);
});

window.addEventListener('xrimagelost', (event) => {
  alert("TARGET LOST: " + event.detail.name);
  console.log("TARGET LOST:", event.detail.name);
});
