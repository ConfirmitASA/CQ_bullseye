export default class Colors {
    constructor(saveChanges) {
        this.defaultColors = ["#718792", "#d3e8f2", "#abd3ea", "#d3e8f2", "#abd3ea", "#d3e8f2", "#abd3ea"];
        this.scales = [];
        this.colorsValues = [];
        this.colorsContainer = document.getElementById("colorsContainer");
        this.saveChanges = saveChanges;
    }

    init(colors, questionSettings, centerIsActive) {
        this.colorsValues = colors;
        this.scales = questionSettings.scales;
        this.scales.unshift({code: "Center color"});
        this.renderColorInputs(centerIsActive);
    }

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

    renderColorInputs(centerIsActive) {
        this.scales.forEach((scaleAnswer, index) => {
            let colorItemContainer = document.createElement('div');
            colorItemContainer.classList.add("colorContainer");
            colorItemContainer.innerText = `${scaleAnswer["code"]}: `;
            let colorPicker = document.createElement("input");
            colorPicker.setAttribute("type", "color");
            colorPicker.classList += "form-input";
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

    saveColorValues() {
        this.colorsValues = [];
        const colorInputs = this.colorsContainer.querySelectorAll('input[type="color"]');
        colorInputs.forEach(
            (colorInput) => this.colorsValues.push(colorInput.value)
        );

    }
}
