// Wait for the 8th Wall engine to be ready
window.addEventListener('xrloaded', () => {
  console.log("XR engine ready – configuring image targets");
  
  // Configure all image targets
  XR8.XrController.configure({
    imageTargetData: [
      {
        name: "target-a",
        imagePath: "./data/Ajpg.jpeg",
        type: "PLANAR",
        metadata: {},
        properties: { left: 0, top: 0, width: 2157, height: 1039, originalWidth: 2157, originalHeight: 1039, isRotated: false }
      },
      {
        name: "target-b",
        imagePath: "./data/Bjpg.jpeg",
        type: "PLANAR",
        metadata: {},
        properties: { left: 0, top: 0, width: 2157, height: 999, originalWidth: 2157, originalHeight: 999, isRotated: false }
      },
      {
        name: "target-e",
        imagePath: "./data/Ejpg.jpeg",
        type: "PLANAR",
        metadata: {},
        properties: { left: 0, top: 0, width: 2157, height: 999, originalWidth: 2157, originalHeight: 999, isRotated: false }
      },
      {
        name: "target-f",
        imagePath: "./data/Fjpg.jpeg",
        type: "PLANAR",
        metadata: {},
        properties: { left: 0, top: 0, width: 2157, height: 1000, originalWidth: 2157, originalHeight: 1000, isRotated: false }
      },
      {
        name: "target-g",
        imagePath: "./data/Gjpg.jpeg",
        type: "PLANAR",
        metadata: {},
        properties: { left: 0, top: 0, width: 2157, height: 1000, originalWidth: 2157, originalHeight: 1000, isRotated: false }
      }
    ]
  });
});

// Debug events
window.addEventListener('xrimagefound', (event) => {
  console.log("✅ IMAGE FOUND:", event.detail.name);
});

window.addEventListener('xrimagelost', (event) => {
  console.log("❌ IMAGE LOST:", event.detail.name);
});

window.addEventListener('xrerror', (event) => {
  console.error("XR error:", event.detail);
});
