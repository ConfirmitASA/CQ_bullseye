/* global register */
register(function (question, customQuestionSettings, questionViewSettings) {
    if (!customQuestionSettings) customQuestionSettings = [];
    const circleSize = parseInt(customQuestionSettings.sizeSetting);
    const colors = customQuestionSettings.bullsEyeColorsSetting;
    const images = customQuestionSettings.iconsImages;
    const isCenterActiveFlag = customQuestionSettings.centerIsActiveSetting;
    const numberOfRequired = customQuestionSettings.requiredSetting;
    const iconsSize = parseInt(customQuestionSettings.iconsSizeSetting);
    const centerTextColor = customQuestionSettings.centerTextColorSetting;
    const itemsLayout = customQuestionSettings.itemsLayoutSetting;
    const itemsColor = customQuestionSettings.itemsColorSetting;
    const centerTextTranslations = customQuestionSettings.centerTextSetting;
    const translations = customQuestionSettings.translations;

    const bullsEye = new customQuestionsLibrary.BullsEye(question, circleSize, iconsSize, colors, images, centerTextColor, numberOfRequired, isCenterActiveFlag, itemsLayout, itemsColor, centerTextTranslations, translations);
    bullsEye.render();
});