/* PROJET CANVAS

Creer un input de type file en HTML

Lors du changement de cet input, avec FileReader, afficher cette image dans un canvas sur votre HTML

Ensuite, utiliser le canvas avec TensorFlow pour detecter les objets dans l'image :
https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd

Le model coco-ssd va permettre de faire des predictions sur la présence d'objets sur l'image et donner leurs positions

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/drawImage
*/

// Recuperer le fichier de l'input et le fichier
const inputImage = document.getElementById('image');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


// récupérer l'image de l'input de type file en javascript grace a un addEventListener('change')
inputImage.addEventListener('change', () => {
    const file = inputImage.files [0];
    if (!file) {
        return;
    }
    const reader= new FileReader();

    reader.addEventListener('load', () => {
        img.src = reader.result; //stocker le resultat du chargement dans la src de img
        //charger image
        img.addEventListener('load', async () => {
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
            predictions.forEach(prediction => {


             })
        })
        })
    })



    






