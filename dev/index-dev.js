/* global register */
import BullsEye from "./BullsEye-dev";
(function () {
    const question = Confirmit.page.questions[0];
    var circleSize = 200;
    var colors = ["#718792", "#d3e8f2", "#abd3ea", "#d3e8f2", "#abd3ea", "#d3e8f2", "#abd3ea"]; //["#504cb6", "#49c0be", "#98d0b5", "#f5c588", "#a7310b"];
    var centerText = "50";
    let isCenterActiveFlag = true;
    let numberOfRequired = 3;
    //let shouldBeAtLeastOneAnswerFlag = false;
    let maxSizeOfIcon = 0;
    const bullsEye = new BullsEye(question, circleSize, maxSizeOfIcon, colors, centerText, numberOfRequired, isCenterActiveFlag)
    bullsEye.render();
})();
