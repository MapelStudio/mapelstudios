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
        width: 480,
        height: 640,
        originalWidth: 480,
        originalHeight: 640,
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
