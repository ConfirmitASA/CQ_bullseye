import Colors from "./bullseyeColors.js";
import Images from "./images.js";

let language;
let centerTextSetting = {
    9: ""
};
let translations = {
    "numberOfRequired": {
        texts: {
            9: "Please change your response. The minimum number of answers should be: "
        }
    }
};
let elements = init();

function init() {
    let sizeInput = document.getElementById('size');
    let iconsSizeInput = document.getElementById('iconsSize');
    let centerTextInput = document.getElementById('centerText');
    let requiredInput = document.getElementById('numberRequiredAnswers');
    let centerIsActive = document.getElementById('centerIsActive');
    let centerTextColorInput = document.getElementById('centerTextColor');
    let itemsColorInput = document.getElementById('itemsColor');
    let itemsLayoutInput = document.getElementById('itemsLayout');
    let colorNumber = document.getElementById("colorsNumber");
    let imagesNumber = document.getElementById('imagesNumber');
    const colors = new Colors(saveChanges);
    const images = new Images(saveChanges);

    sizeInput.addEventListener('input', saveChanges);
    iconsSizeInput.addEventListener('input', saveChanges);
    centerTextInput.addEventListener('input', saveChanges);
    requiredInput.addEventListener('input', saveChanges);
    centerIsActive.addEventListener('input', saveChanges);
    centerTextColorInput.addEventListener('input', saveChanges);
    itemsColorInput.addEventListener('input', saveChanges);
    itemsLayoutInput.addEventListener('input', saveChanges)
    window.saveChanges = saveChanges;
    customQuestion.onSettingsReceived = setValues;
    return {sizeInput, iconsSizeInput, centerTextInput, requiredInput, centerIsActive, centerTextColorInput, itemsColorInput, itemsLayoutInput, colorNumber, imagesNumber, colors, images};
}

function setValues(settings, uiSettings, questionSettings) {
    //setInputValue (input, settings);
    language = uiSettings.currentLanguage;
    const {sizeInput, iconsSizeInput, centerTextInput, requiredInput, centerIsActive, centerTextColorInput, itemsColorInput, itemsLayoutInput, colorNumber, imagesNumber, colors, images} = elements;
    sizeInput.value = settings ? settings.sizeSetting : "";
    iconsSizeInput.value = settings ? settings.iconsSizeSetting: "";
    centerTextInput.value = centerTextSetting ? centerTextSetting[language] : "";
    requiredInput.value = settings ? settings.requiredSetting : "";
    centerIsActive.checked = settings ? settings.centerIsActiveSetting : false;
    centerTextColorInput.value = settings ? settings.centerTextColorSetting : "";
    itemsColorInput.value = settings ? settings.itemsColorSetting : "";
    itemsLayoutInput.value = settings ? settings.itemsLayoutSetting : "vertical";
    colors.init(settings ? settings.bullsEyeColorsSetting : 0);
    images.init(settings ? settings.iconsImages : 0);

    const translationItems = Array.prototype.slice.call(document.querySelectorAll(".translation-item input"));
    translationItems.forEach((item) => {
        item.value = translations[item.getAttribute("translation-type")][language];
    });
}

function saveChanges() {
    const {sizeInput, iconsSizeInput, centerTextInput, requiredInput, centerIsActive, centerTextColorInput, itemsColorInput, itemsLayoutInput, colorNumber, imagesNumber, colors, images} = elements;
    let validated = true;
    validated = numberValidate(sizeInput, validated);
    validated = numberValidate(iconsSizeInput, validated);
    validated = numberValidate(requiredInput, validated);
    validated = numberValidate(colorNumber, validated);
    validated = numberValidate (imagesNumber, validated);
    if (!validated)
        return;
    centerTextSetting[language] = centerTextInput.value;
    let settings = {
        sizeSetting: sizeInput.value,
        iconsSizeSetting: iconsSizeInput.value,
        centerTextSetting: centerTextSetting,
        requiredSetting: requiredInput.value,
        centerIsActiveSetting: centerIsActive.checked,
        centerTextColorSetting: centerTextColorInput.value,
        itemsColorSetting: itemsColorInput.value,
        itemsLayoutSetting: itemsLayoutInput.value,
        bullsEyeColorsSetting: colors.getColors(),
        iconsImages: images.getImages()
    };

    const translationItems = Array.prototype.slice.call(document.querySelectorAll(".translation-item input"));
    translationItems.forEach((item) => {
        translations[item.getAttribute("translation-type")][language] = item.value ? item.value : "";
    });

    //var hasError = inputElement.value === '';
    let hasError = false;
    customQuestion.saveChanges(settings, hasError);
}

function numberValidate(input, validated) {
    if (isNaN(input.value)) {
        input.classList.add("form-input--error");
        return false;
    }
    input.classList.remove("form-input--error");
    return validated;
}
