export default class Colors {
    constructor(saveChanges) {
        this.colorsValues = [];
        this.colorsContainer = document.getElementById("colorsContainer");
        this.colorsNumberContainer = document.getElementById("colorsNumber");
        this.colorsNumberContainer.addEventListener("change", this.updateColorInputs.bind(this));
        this.saveChanges = saveChanges;
    }

    init(colors) {
        if (colors.length === 0) return;
        this.colorsValues = colors;
        this.colorsNumberContainer.value = colors.length;
        this.renderColorInputs();
    }

    getColors() {
        return this.colorsValues;
    }

    updateColorInputs() {
        this.renderColorInputs();
        this.saveChanges();
    }

    renderColorInputs() {
        const prevNumber = this.colorsContainer.querySelectorAll('input[type="color"]').length;
        const newNumber = this.colorsNumberContainer.value;
        if (newNumber === prevNumber) return;
        if (newNumber > prevNumber) {
            for (let i = prevNumber; i < newNumber; i++) {
                let colorPicker = document.createElement("input");
                colorPicker.setAttribute("type", "color");
                colorPicker.setAttribute("id", `color_${i}`);
                colorPicker.classList += "form-input";
                if (this.colorsValues[i]) {
                    colorPicker.value = this.colorsValues[i];
                } else {
                    this.colorsValues.push("#000000");
                }
                this.colorsContainer.appendChild(colorPicker);
                colorPicker.addEventListener("change", this.saveColorValues.bind(this));
            }
        } else {
            for (let i = newNumber; i < prevNumber; i++) {
                this.colorsContainer.removeChild(document.getElementById(`color_${i}`));
                this.colorsValues.pop();
            }
        }
    }

    saveColorValues() {
        this.colorsValues = [];
        const colorInputs = this.colorsContainer.querySelectorAll('input[type="color"]');
        colorInputs.forEach(
            (colorInput) => this.colorsValues.push(colorInput.value)
        );
        this.saveChanges();
    }
}
