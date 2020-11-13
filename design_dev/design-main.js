import Colors from "./question-scale-colors.js";
import Images from "./question-prompts-images.js";

let language;
let answersCount = 0;
let centerTextSetting = {
    9: ""
};
let translations = {
    "numberOfRequired": {
        default: "Please change your response. The minimum number of answers should be: ",
        9: "Please change your response. The minimum number of answers should be: "
    }
};
let elements = init();

/**
 * @description Funtion to get and init elements on the Custom Settings tab
 */
function init() {
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
    const translationsInputs = Array.prototype.slice.call(document.querySelectorAll(".translation-item input"));

    sizeInput.addEventListener('input', saveChanges);
    iconsSizeInput.addEventListener('input', saveChanges);
    centerTextInput.addEventListener('input', saveChanges);
    requiredInput.addEventListener('input', saveChanges);
    centerIsActive.addEventListener('change', saveChanges);
    centerTextColorInput.addEventListener('input', saveChanges);
    itemsColorInput.addEventListener('input', saveChanges);
    itemsLayoutInput.addEventListener('input', saveChanges);
    translationsInputs.forEach((input) => input.addEventListener('input', saveChanges));
    window.saveChanges = saveChanges;
    customQuestion.onSettingsReceived = setValues;
    customQuestion.onInit = setValues;
    return {
        sizeInput,
        iconsSizeInput,
        centerTextInput,
        requiredInput,
        centerIsActive,
        centerTextColorInput,
        itemsColorInput,
        itemsLayoutInput,
        colors,
        images
    };
}

/**
 * @description Function to set values into HTML elements on the Custom Settings tab
 * @param settings - customQuestionSettings value that was got from the custom-question
 * @param uiSettings - uiSettings value that was got from the custom-question
 * @param questionSettings - questionSettings value that was got from the custom-question
 */
function setValues(settings, uiSettings, questionSettings) {
    language = uiSettings.currentLanguage;
    answersCount = questionSettings ? questionSettings.answers.length : answersCount;
    centerTextSetting = settings ? settings.centerTextSetting : centerTextSetting;
    const {sizeInput, iconsSizeInput, centerTextInput, requiredInput, centerIsActive, centerTextColorInput, itemsColorInput, itemsLayoutInput, colors, images} = elements;
    sizeInput.value = settings ? settings.sizeSetting : "";
    iconsSizeInput.value = settings ? settings.iconsSizeSetting : "";
    centerTextInput.value = centerTextSetting && centerTextSetting[language] ? centerTextSetting[language] : "";
    requiredInput.value = settings ? settings.requiredSetting : "";
    centerIsActive.checked = settings ? settings.centerIsActiveSetting : false;
    centerTextColorInput.value = settings ? settings.centerTextColorSetting : "#f4ffff";
    itemsColorInput.value = settings ? settings.itemsColorSetting : "#02086d";
    itemsLayoutInput.value = settings ? settings.itemsLayoutSetting : "vertical";
    if (questionSettings) {
        colors.init(settings ? settings.bullsEyeColorsSetting : [], questionSettings, centerIsActive.checked);
        images.init(settings ? settings.iconsImages : [], questionSettings);
    }
    translations = settings ? settings.translations : translations;
    const translationItems = Array.prototype.slice.call(document.querySelectorAll(".translation-item"));
    translationItems.forEach((item) => {
        const input = item.querySelector("input");
        const translation = translations[item.getAttribute("translation-type")];
        const translationWithCurrentLanguage = translation[language];
        input.value = translationWithCurrentLanguage ? translationWithCurrentLanguage : "";
    });
}

/**
 * @description Function to get values from the Custom Settings tab element and pass settings into the Bullseye question
 */
function saveChanges() {
    const {sizeInput, iconsSizeInput, centerTextInput, requiredInput, centerIsActive, centerTextColorInput, itemsColorInput, itemsLayoutInput, colors, images} = elements;

    let validated = true;
    validated = numberValidate(sizeInput, validated);
    validated = numberValidate(iconsSizeInput, validated);
    validated = numberValidate(requiredInput, validated, 0, answersCount);
    if (!validated)
        return;
    centerTextSetting[language] = centerTextInput.value;
    const translationItems = Array.prototype.slice.call(document.querySelectorAll(".translation-item"));
    translationItems.forEach((item) => {
        const input = item.querySelector("input");
        const translation = translations[item.getAttribute("translation-type")];
        translation[language] = input.value ? input.value : (language === 9 ? translation["default"] : "");
    });

    let settings = {
        sizeSetting: sizeInput.value,
        iconsSizeSetting: iconsSizeInput.value,
        centerTextSetting: centerTextSetting,
        requiredSetting: requiredInput.value,
        centerIsActiveSetting: centerIsActive.checked,
        centerTextColorSetting: centerTextColorInput.value,
        itemsColorSetting: itemsColorInput.value,
        itemsLayoutSetting: itemsLayoutInput.value,
        bullsEyeColorsSetting: colors.getColors(centerIsActive.checked),
        iconsImages: images.getImages(),
        translations
    };

    //var hasError = inputElement.value === '';
    let hasError = false;
    customQuestion.saveChanges(settings, hasError);
}
/**
 * @description Function to validate inputs with Number values on the Custom Settings tab
 * @param input - HTML input
 * @param {boolean} validated - was form Validated or not
 * @param {float} minValue - input value should me more or equal to minValue
 * @param {float} maxValue - input value should me less or equal to maxValue
 */
function numberValidate(input, validated, minValue, maxValue) {
    if (isNaN(input.value)) {
        input.classList.add("form-input--error");
        errorTooltipShow(input, "Please enter a valid number");
        return false;
    }
    if (minValue && input.value < minValue) {
        input.classList.add("form-input--error");
        errorTooltipShow(input, `Please enter a number greater than ${minValue}`);
        return false;
    }
    if (maxValue && input.value > maxValue) {
        input.classList.add("form-input--error");
        errorTooltipShow(input, `Please enter a number less than ${maxValue}`);
        return false;
    }
    input.classList.remove("form-input--error");
    errorTooltipHide(input);
    return validated;
}
