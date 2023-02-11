const fileInput = document.querySelector("#file-input");
const colorPicker = document.querySelector("#color-picker");
const imageContainer = document.querySelector("#image-container");
const changeColorButton = document.querySelector("#change-color-button");
const downloadLink = document.querySelector("#download-link");
const temporaryImageContainer = document.querySelector("#temporary-image-container");

let image = new Image();
image.crossOrigin = "anonymous";

fileInput.addEventListener("change", function(event) {
  let file = event.target.files[0];
  let reader = new FileReader();

  reader.onload = function(event) {
    image.src = event.target.result;
    imageContainer.innerHTML = "";
    imageContainer.appendChild(image);
  };

  reader.readAsDataURL(file);
});

changeColorButton.addEventListener("click", function() {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.fillStyle = colorPicker.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "destination-atop";
  ctx.drawImage(image, 0, 0);

  imageContainer.innerHTML = "";
  imageContainer.appendChild(canvas);
  downloadLink.href = canvas.toDataURL();

  temporaryImageContainer.innerHTML = "";

  let sizes = [72, 36, 18];
  let images = [];

  sizes.forEach(function(size) {
    let tempCanvas = document.createElement("canvas");
    let tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = size;
    tempCanvas.height = size;
    tempCtx.drawImage(canvas, 0, 0, size, size);
    images.push({
      data: tempCanvas.toDataURL(),
      name: `${size}x${size}.png`
    });
  });

  let zip = new JSZip();
  images.forEach(function(image) {
    zip.file(image.name, image.data.substring(image.data.indexOf(",") + 1), { base64: true });
  });

  zip.generateAsync({ type: "blob" }).then(function(content) {
    downloadLink.href = URL.createObjectURL(content);
    downloadLink.download = "images.zip";
  });
});
