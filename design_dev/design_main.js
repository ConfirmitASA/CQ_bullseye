import Colors from "./bullseyeColors.js";
import Images from "./images.js";


let sizeInput = document.getElementById('size');
let iconsSizeInput = document.getElementById('iconsSize');
let centerTextInput = document.getElementById('centerText');
let requiredInput = document.getElementById('numberRequiredAnswers');
let centerIsActive = document.getElementById('centerIsActive');
let centerTextColorInput = document.getElementById('centerTextColor');
let itemsColorInput = document.getElementById('itemsColor');
let itemsLayoutInput = document.getElementById('itemsLayout');
const colors = new Colors(saveChanges);
const images = new Images(saveChanges);

sizeInput.addEventListener('change', saveChanges);
iconsSizeInput.addEventListener('change', saveChanges);
centerTextInput.addEventListener('change', saveChanges);
requiredInput.addEventListener('change', saveChanges);
centerIsActive.addEventListener('change', saveChanges);
centerTextColorInput.addEventListener('change', saveChanges);
itemsColorInput.addEventListener('change', saveChanges);
itemsLayoutInput.addEventListener('change', saveChanges)
window.saveChanges = saveChanges;
customQuestion.onSettingsReceived = setValues;

function setValues(settings) {
    //setInputValue (input, settings);
    sizeInput.value = settings.sizeSetting;
    iconsSizeInput.value = settings.iconsSizeSetting;
    centerTextInput.value = settings.centerTextSetting;
    requiredInput.value = settings.requiredSetting;
    centerIsActive.checked = settings.centerIsActiveSetting;
    centerTextColorInput.value = settings.centerTextColorSetting;
    itemsColorInput.value = settings.itemsColorSetting;
    itemsLayoutInput.value = settings.itemsLayoutSetting;
    colors.init(settings.bullsEyeColorsSetting);
    images.init(settings.iconsImages)
}

function saveChanges() {
    let settings = {
        sizeSetting: sizeInput.value,
        iconsSizeSetting: iconsSizeInput.value,
        centerTextSetting: centerTextInput.value,
        requiredSetting: requiredInput.value,
        centerIsActiveSetting: centerIsActive.checked,
        centerTextColorSetting: centerTextColorInput.value,
        itemsColorSetting: itemsColorInput.value,
        itemsLayoutSetting: itemsLayoutInput.value,
        bullsEyeColorsSetting: colors.getColors(),
        iconsImages: images.getImages()
    };
    //var hasError = inputElement.value === '';
    let hasError = false;
    customQuestion.saveChanges(settings, hasError);
}


