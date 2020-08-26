export default class Images {
    constructor(saveChanges) {
        this.imagesValues = [];
        this.imagesContainer = document.getElementById("imagesContainer");
        this.imagesNumberContainer = document.getElementById("imagesNumber");
        this.imagesNumberContainer.addEventListener("change", this.updateImagesInputs.bind(this));
        this.saveChanges = saveChanges;
    }

    init(images) {
        if (images.length === 0) return;
        this.imagesValues = images;
        this.imagesNumberContainer.value = images.length;
        this.renderImagesInputs();
    }
    getImages() {
        return this.imagesValues;
    }

    updateImagesInputs() {
        this.renderImagesInputs();
        this.saveChanges();
    }

    renderImagesInputs() {
        const prevNumber = this.imagesContainer.querySelectorAll('input').length;
        const newNumber = this.imagesNumberContainer.value;
        if (newNumber === prevNumber) return;
        if (newNumber > prevNumber) {
            for (let i = prevNumber; i < newNumber; i++) {
                let imageContainer = document.createElement("div")
                imageContainer.classList.add("imageContainer");
                this.imagesContainer.appendChild(imageContainer);
                let imageInput = document.createElement("input");
                imageInput.setAttribute("id", `img_${i}`);
                imageInput.addEventListener("change", this.loadImage.bind(this));
                imageInput.className = "form-control input-sm form-input image-input";
                imageContainer.appendChild(imageInput);
                let imagePreview = document.createElement("img");
                imagePreview.classList.add("imagePreview");
                imageContainer.appendChild(imagePreview);
                if (this.imagesValues[i]) {
                    imageInput.value = this.imagesValues[i];
                    imagePreview.setAttribute("src", this.imagesValues[i]);
                } else {
                    this.imagesValues.push("");
                }
            }
        } else {
            for (let i = newNumber; i < prevNumber; i++) {
                this.imagesContainer.removeChild(document.getElementById(`img_${i}`))
                this.imagesValues.pop();
            }
        }
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
