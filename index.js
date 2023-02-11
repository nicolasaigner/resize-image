const imageFileInput = document.getElementById("image-file");
const colorPickerInput = document.getElementById("color-picker");
const changeColorButton = document.getElementById("change-color-button");
const previewContainer = document.querySelector(".preview-container");
const downloadZipButton = document.getElementById("download-zip-button");

let previews = [];

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
    previews.push(previewImage);

    downloadZipButton.disabled = false;
  };
});

let imagesArray = [];

downloadZipButton.addEventListener("click", () => {
  imagesArray.push(canvas.toDataURL("image/png"));

  if (imagesArray.length === numberOfColors) {
    const zip = new JSZip();

    imagesArray.forEach((image, index) => {
      zip.file(`image-${index}.png`, image.replace("data:image/png;base64,", ""), { base64: true });
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "images.zip");
    });
  }
});