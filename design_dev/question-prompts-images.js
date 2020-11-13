import 'nodelist-foreach-polyfill';
export default class Images {
     /**
     * @description constructor
     * @param saveChanges - function to save all values on the Custom Settings tab
     */
    constructor(saveChanges) {
        this.imagesValues = [];
        this.answers = [];
        this.imagesContainer = document.getElementById("imagesContainer");
        this.saveChanges = saveChanges;
    }

    /**
     * @description Function to init values
     * @param images - list of images links from the custom question settings
     * @param questionSettings - question settings, where list of prompt answers is stored
     */
    init(images, questionSettings) {
        this.imagesValues = images;
        this.answers = questionSettings.answers;
        this.renderImagesInputs();
    }

    /**
     * @description Function to get list of images links
     * @return images links
     */
    getImages() {
        return this.imagesValues;
    }

    /**
     * @description Function to render HTML inputs for images links
     */
    renderImagesInputs() {
        this.answers.forEach((answer, index) => {
            let imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");
            imageContainer.innerText = `${answer["code"]}: `;
            this.imagesContainer.appendChild(imageContainer);
            let imageInput = document.createElement("input");
            imageInput.setAttribute("id", `img_${index}`);
            imageInput.addEventListener("change", this.loadImage.bind(this));
            imageInput.className = "form-control input-sm form-input image-input";
            imageContainer.appendChild(imageInput);
            let imagePreview = document.createElement("img");
            imagePreview.classList.add("image-preview");
            imageContainer.appendChild(imagePreview);
            if (this.imagesValues[index]) {
                imageInput.value = this.imagesValues[index];
                imagePreview.setAttribute("src", this.imagesValues[index]);
            } else {
                this.imagesValues.push("");
            }
        });
    }

    /**
     * @description Function to load image to preview
     */
    loadImage() {
        const previewContainer = document.querySelector("#" + event.target.id + " + img");
        previewContainer.setAttribute("src", event.target.value);
        this.saveImageValues();
    }

    /**
     * @description Function to save links as a part of question custom settings
     */
    saveImageValues() {
        this.imagesValues = [];
        const imagesInputs = this.imagesContainer.querySelectorAll('input');
        imagesInputs.forEach(
            (imageInput) => this.imagesValues.push(imageInput.value)
        );
        this.saveChanges();
    }
}
