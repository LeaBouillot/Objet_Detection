// Recuperer le fichier de l'input et le fichier
const inputImage = document.getElementById("image");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image(); //create new image HTML element, comme document.createElement("img")

// récupérer l'image de l'input de type file en javascript grace a un addEventListener('change')
inputImage.addEventListener("change", () => {
  const file = inputImage.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    img.src = reader.result; //stocker le resultat du chargement dans la src de img
    //charger image
    img.addEventListener("load", async () => {
      canvas.height = img.height;
      canvas.width = img.width;
      // deput de img au pont 0 0 :c'est une position du canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      //faire la prediction
      //charge le model de cocoSsd, detection d'objet avec await
      const model = await cocoSsd.load();
      //detection d'objet dans le canvas: avec model.detect(canvas)
      const predictions = await model.detect(canvas);
      //console.log(predictions);
      //afficher les predictions sur le canvas
      predictions.forEach((prediction) => {
        ctx.beginPath();
        ctx.rect(...predictions.bbox);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.fillStyle = "green"; //colr text
        ctx.strok();
        ctx.fillText(
          `${predictions.class}`,
          prediction.bbox[0],
          prediction.bbox[1]); //2 positions texte
      })
    })
  })
  reader.readAsDataURL(file);
})
