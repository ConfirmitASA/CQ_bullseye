import 'nodelist-foreach-polyfill';
export default class Colors {
    /**
     * @description constructor
     * @param saveChanges - function to save all values on the Custom Settings tab
     */
    constructor(saveChanges) {
        this.defaultColors = ["#718792", "#d3e8f2", "#abd3ea", "#d3e8f2", "#abd3ea", "#d3e8f2", "#abd3ea"];
        this.scales = [];
        this.colorsValues = [];
        this.colorsContainer = document.getElementById("colorsContainer");
        this.saveChanges = saveChanges;
    }

    /**
     * @description Function to init values
     * @param colors - colors list
     * @param questionSettings - question settings, where list of prompt answers is stored
     * @param {boolean} centerIsActive - is target center active or not
     */
    init(colors, questionSettings, centerIsActive) {
        this.colorsValues = colors;
        this.scales = questionSettings.scales;
        this.scales.unshift({code: "Center color"});
        this.renderColorInputs(centerIsActive);
    }

    /**
     * @description Function to get colors list
     * @param {boolean} centerIsActive - is target center active or not
     * @return colors list
     */
    getColors(centerIsActive) {
        this.saveColorValues();
        if (centerIsActive) {
            this.colorsValues.shift();
            this.colorsContainer.querySelector('div').style.display = 'none';
        }
        else
            this.colorsContainer.querySelector('div').style.display = 'block';
        return this.colorsValues;
    }

    /**
     * @description Function to render HTML inputs for selecting colors
     * @param {boolean} centerIsActive - is target center active or not
     */
    renderColorInputs(centerIsActive) {
        this.scales.forEach((scaleAnswer, index) => {
            let colorItemContainer = document.createElement('div');
            colorItemContainer.classList.add("color-container");
            colorItemContainer.innerText = `${scaleAnswer["code"]}: `;
            let colorPicker = document.createElement("input");
            colorPicker.setAttribute("type", "color");
            colorPicker.classList.add("form-input");
            colorPicker.value = this.defaultColors[index % 7];
            if (this.colorsValues[index]) {
                colorPicker.value = this.colorsValues[index];
            } else {
                this.colorsValues.push(this.defaultColors[index % 7]);
            }
            colorItemContainer.appendChild(colorPicker);
            this.colorsContainer.appendChild(colorItemContainer);
            colorPicker.addEventListener("input", this.saveChanges);
        });
    }

    /**
     * @description Function to save colors list as a part of question custom settings
     */
    saveColorValues() {
        this.colorsValues = [];
        const colorInputs = this.colorsContainer.querySelectorAll('input[type="color"]');
        colorInputs.forEach(
            (colorInput) => this.colorsValues.push(colorInput.value)
        );

    }
}
