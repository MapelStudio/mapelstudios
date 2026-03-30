// ===== 8TH WALL TARGET LOADER (SAFE VERSION) =====


// Wait until XR engine is ready
window.addEventListener('xrloaded', () => {
  console.log("XR engine ready");
});


// Error listener
window.addEventListener('xrerror', (event) => {
  console.error("XR error:", event.detail);
});

window.addEventListener('xrimagefound', (event) => {
alert("TARGET DETECTED: " + event.detail.name);
console.log("TARGET DETECTED:", event.detail.name);
});
