window.addEventListener('xrloaded', () => {
  console.log("XR ready – configuring targets");
  XR8.XrController.configure({
    imageTargetData: [
      {
        name: "target-a",
        imagePath: "./data/Ajpg.jpeg",
        type: "PLANAR",
        properties: {
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
        properties: {
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
        properties: {
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
        properties: {
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
        properties: {
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

window.addEventListener('xrimagefound', (e) => {
  console.log("Image found:", e.detail.name);
});

window.addEventListener('xrimagelost', (e) => {
  console.log("Image lost:", e.detail.name);
});
