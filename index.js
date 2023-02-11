const fileInput = document.querySelector("#file-input");
const colorPicker = document.querySelector("#color-picker");
const imageContainer = document.querySelector("#image-container");
const changeColorButton = document.querySelector("#change-color-button");
const downloadLink = document.querySelector("#download-link");

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
});
