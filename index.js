const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const changeColorButton = document.getElementById("change-color-button");
changeColorButton.addEventListener("click", () => {
  // Load the image into the canvas
  ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);
  
  // Get the image data from the canvas
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;

  // Loop through each pixel and change its color
  for (let i = 0; i < data.length; i += 4) {
    data[i] = newRed;
    data[i + 1] = newGreen;
    data[i + 2] = newBlue;
  }

  // Update the canvas with the modified image data
  ctx.putImageData(imageData, 0, 0);
});

const downloadZipButton = document.getElementById("download-zip-button");
downloadZipButton.addEventListener("click", () => {
  // Create a new canvas for each size
  const canvas72 = document.createElement("canvas");
  canvas72.width = 72;
  canvas72.height = 72;
  const ctx72 = canvas72.getContext("2d");

  const canvas36 = document.createElement("canvas");
  canvas36.width = 36;
  canvas36.height = 36;
  const ctx36 = canvas36.getContext("2d");

  const canvas18 = document.createElement("canvas");
  canvas18.width = 18;
  canvas18.height = 18;
  const ctx18 = canvas18.getContext("2d");

  // Draw the modified image on each canvas
  ctx72.drawImage(canvas, 0, 0, canvas72.width, canvas72.height);
  ctx36.drawImage(canvas, 0, 0, canvas36.width, canvas36.height);
  ctx18.drawImage(canvas, 0, 0, canvas18.width, canvas18.height);

  // Convert the canvas to a data URL
  const dataURL72 = canvas72.toDataURL();
  const dataURL36 = canvas36.toDataURL();
  const dataURL18 = canvas18.toDataURL();

  // ...
});
