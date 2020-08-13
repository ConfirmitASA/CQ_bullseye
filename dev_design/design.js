let sizeInput = document.getElementById('size');
let maxIconSizeInput = document.getElementById('maxIconSize');
let centerTextInput = document.getElementById('centerText');
let requiredInput = document.getElementById('numberRequiredAnswers');
let centerIsActive = document.getElementById('centerIsActive');

function setValues(settings) {
    sizeInput.value = settings.sizeSetting;
    maxIconSizeInput.value = settings.maxIconSizeSetting;
    centerTextInput.value = settings.centerTextSetting;
    requiredInput.value = settings.requiredSetting;
    centerIsActive.checked = settings.centerIsActiveSetting;
}

function saveChanges() {
    let settings = { sizeSetting: sizeInput.value,
        maxIconSizeSetting: maxIconSizeInput.value,
        centerTextSetting: centerTextInput.value,
        requiredSetting: requiredInput.value,
        centerIsActiveSetting: centerIsActive.checked};
    //var hasError = inputElement.value === '';
    let hasError = false;
    customQuestion.saveChanges(settings, hasError);
}

customQuestion.onSettingsReceived = setValues;

sizeInput.addEventListener('change', saveChanges);
maxIconSizeInput.addEventListener('change', saveChanges);
centerTextInput.addEventListener('change', saveChanges);
requiredInput.addEventListener('change', saveChanges);
centerIsActive.addEventListener('change', saveChanges);