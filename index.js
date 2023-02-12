const imageFileInput = document.getElementById("image-file");
const colorPickerInput = document.getElementById("color-picker");
const changeColorButton = document.getElementById("change-color-button");
const previewContainer = document.querySelector(".preview-container");
const downloadZipButton = document.getElementById("download-zip-button");

let previews = [];
let sizes = [18, 36, 72];

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
    // previewImage.src = canvas.toDataURL();

    // sizes.push(image.width);

    sizes.forEach((size, i) => {
      let imageResize = resizeImage(canvas, size);

      console.log(`Image ${i}`, size, imageResize);

      previewImage.src = imageResize.toDataURL();
      previews.push(previewImage);
      previewImage.classList.add("preview-image");
    previewContainer.appendChild(previewImage);
    });

    downloadZipButton.disabled = false;
  };
});

let imagesArray = [];

downloadZipButton.addEventListener("click", () => {
  imagesArray = previews.map((image) => {
    return image.currentSrc;
  });

  console.log('previews Array', previews);

  console.log('imagesArray', imagesArray);

  if (imagesArray.length > 0) {
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

function resizeImage(canvas, size) {
  // Create a new canvas for each size
  const ctx72 = canvas.getContext("2d");

  // Draw the modified image on each canvas
  ctx72.drawImage(canvas, 0, 0, size.width, size.height);

  return ctx72;
}