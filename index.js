const imageFileInput = document.getElementById("image-file");
const colorPickerInput = document.getElementById("color-picker");
const changeColorButton = document.getElementById("change-color-button");
const previewContainer = document.querySelector(".preview-container");
const downloadZipButton = document.getElementById("download-zip-button");

let previews = [];
let numberOfColors = 0;

changeColorButton.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const image = new Image();
  image.src = URL.createObjectURL(imageFileInput.files[0]);
  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = colorPickerInput.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const previewImage = new Image();
    previewImage.src = canvas.toDataURL();
    previewImage.classList.add("preview-image");
    previewContainer.appendChild(previewImage);


    

    previews.push(resizeImage(previewImage));

    downloadZipButton.disabled = false;

    numberOfColors = numberOfColors + 1;
  };
});

let imagesArray = [];

downloadZipButton.addEventListener("click", () => {
  imagesArray = previews.map((image) => {
    return image.currentSrc;
  });

  console.log('previews Array', previews);

  console.log('imagesArray', imagesArray);

  console.log('numberOfColors', numberOfColors);

  if (imagesArray.length === numberOfColors) {
    const zip = new JSZip();

    imagesArray.forEach((image, index) => {
      zip.file(`image-${index}.png`, image.replace("data:image/png;base64,", ""), { base64: true });
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAsZipFile(content, "images.zip");
    });
  }
});

function saveAsZipFile(zip) {
  const zipFile = new Blob([zip], {type: "application/zip"});
  const filename = "images.zip";
  if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(zipFile, filename);
  } else {
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = URL.createObjectURL(zipFile);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
  }
}

function resizeImage() {
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

  return [dataURL18, dataURL36, dataURL72].join(',');
}