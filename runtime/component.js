/* global register */

register(function (question, customQuestionSettings, questionViewSettings) {
debugger;
    var circleSize = parseInt(customQuestionSettings.sizeSetting);
    var colors = ["#718792", "#d3e8f2", "#abd3ea", "#d3e8f2", "#abd3ea", "#d3e8f2", "#abd3ea"]; //["#504cb6", "#49c0be", "#98d0b5", "#f5c588", "#a7310b"];
    var centerText = customQuestionSettings.centerTextSetting;
    let isCenterActiveFlag = customQuestionSettings.centerIsActiveSetting;
    let shouldBeAtLeastOneAnswerFlag = customQuestionSettings.requiredSetting;
    let maxSizeOfIcon = parseInt(customQuestionSettings.maxIconSizeSetting);
    new TargetDropAndDrown(question, circleSize, maxSizeOfIcon, colors, centerText, shouldBeAtLeastOneAnswerFlag, isCenterActiveFlag)
    // TODO: put your code here
});