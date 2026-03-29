// ===== 8TH WALL TARGET LOADER (SAFE VERSION) =====

const load8thWallTargets = () => {
  console.log("Loading targets.json...");

  fetch('./data/targets.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load targets.json");
      }
      return response.json();
    })
    .then(data => {
      console.log("Targets loaded:", data);

      // Configure image targets
      XR8.XrController.configure({
        imageTargetData: data.imageTargets || data
      });

      console.log("XR configured successfully");
    })
    .catch(error => {
      console.error("Error loading targets:", error);
    });
};


// Wait until XR engine is ready
window.addEventListener('xrloaded', () => {
  console.log("XR engine ready");
  load8thWallTargets();
});


// Error listener
window.addEventListener('xrerror', (event) => {
  console.error("XR error:", event.detail);
});
