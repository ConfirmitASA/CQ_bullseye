import 'nodelist-foreach-polyfill';
export default class Images {
    constructor(saveChanges) {
        this.imagesValues = [];
        this.answers = [];
        this.imagesContainer = document.getElementById("imagesContainer");
        this.saveChanges = saveChanges;
    }

    init(images, questionSettings) {
        this.imagesValues = images;
        this.answers = questionSettings.answers;
        this.renderImagesInputs();
    }

    getImages() {
        return this.imagesValues;
    }


    renderImagesInputs() {
        this.answers.forEach((answer, index) => {
            let imageContainer = document.createElement("div");
            imageContainer.classList.add("imageContainer");
            imageContainer.innerText = `${answer["code"]}: `;
            this.imagesContainer.appendChild(imageContainer);
            let imageInput = document.createElement("input");
            imageInput.setAttribute("id", `img_${index}`);
            imageInput.addEventListener("change", this.loadImage.bind(this));
            imageInput.className = "form-control input-sm form-input image-input";
            imageContainer.appendChild(imageInput);
            let imagePreview = document.createElement("img");
            imagePreview.classList.add("imagePreview");
            imageContainer.appendChild(imagePreview);
            if (this.imagesValues[index]) {
                imageInput.value = this.imagesValues[index];
                imagePreview.setAttribute("src", this.imagesValues[index]);
            } else {
                this.imagesValues.push("");
            }
        });
    }

    loadImage() {
        const previewContainer = document.querySelector("#" + event.target.id + " + img");
        previewContainer.setAttribute("src", event.target.value);
        this.saveImageValues();
    }

    saveImageValues() {
        this.imagesValues = [];
        const imagesInputs = this.imagesContainer.querySelectorAll('input');
        imagesInputs.forEach(
            (imageInput) => this.imagesValues.push(imageInput.value)
        );
        this.saveChanges();
    }
}
