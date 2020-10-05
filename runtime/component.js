/* global register */
register(function (question, customQuestionSettings, questionViewSettings) {
    if (!customQuestionSettings) customQuestionSettings = [];
    const circleSize = parseInt(customQuestionSettings.sizeSetting);
    const colors = customQuestionSettings.bullsEyeColorsSetting;
    const images = customQuestionSettings.iconsImages;
    const centerText = customQuestionSettings.centerTextSetting;
    const isCenterActiveFlag = customQuestionSettings.centerIsActiveSetting;
    const numberOfRequired = customQuestionSettings.requiredSetting;
    const iconsSize = parseInt(customQuestionSettings.iconsSizeSetting);
    const centerTextColor = customQuestionSettings.centerTextColorSetting;
    const itemsLayout = customQuestionSettings.itemsLayoutSetting;
    const itemsColor = customQuestionSettings.itemsColorSetting;
    const translations = customQuestionSettings.translations;

    const bullsEye = new customQuestionsLibrary.BullsEye(question, circleSize, iconsSize, colors, images, centerText, centerTextColor, numberOfRequired, isCenterActiveFlag, itemsLayout, itemsColor, translations);
    bullsEye.render();
});