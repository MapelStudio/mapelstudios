// ===== SIMPLIFIED 8TH WALL CONFIGURATION =====

// Wait for the page to fully load
window.addEventListener('load', () => {
    console.log("Page loaded, initializing XR...");
    
    // Check if XR8 is available
    if (typeof XR8 === 'undefined') {
        console.error("XR8 not loaded!");
        return;
    }
    
    // Configure image targets
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

// Event listeners
window.addEventListener('xrloaded', () => {
    console.log("✅ XR engine loaded");
});

window.addEventListener('xrerror', (event) => {
    console.error("❌ XR error:", event.detail);
});

window.addEventListener('xrimagefound', (event) => {
    console.log("🎯 Image found:", event.detail.name);
    
    // Show debug message
    const debugDiv = document.getElementById('error-log');
    if (debugDiv) {
        debugDiv.innerHTML += `Target found: ${event.detail.name}<br>`;
    }
});

window.addEventListener('xrimagelost', (event) => {
    console.log("👋 Image lost:", event.detail.name);
});
