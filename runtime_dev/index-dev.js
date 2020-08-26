/* global register */
import BullsEye from "./BullsEye-dev";
(function () {
    const question = Confirmit.page.questions[0];
    let circleSize = 500;
    let colors = ["#718792", "#d3e8f2", "#abd3ea", "#d3e8f2", "#abd3ea", "#d3e8f2", "#abd3ea"];
    let images = ["/isa/BDJPFRDMEYBPBKLVADAYFQCDAVIOEQJR/CQ_bullseye/gb.png", "/isa/BDJPFRDMEYBPBKLVADAYFQCDAVIOEQJR/CQ_bullseye/the-united-states-flag-image-free-download.jpg"]
    let centerText = "50";
    let isCenterActiveFlag = false;
    let numberOfRequired = 3;
    let itemsLayout = "vertical";
    //let shouldBeAtLeastOneAnswerFlag = false;
    let maxSizeOfIcon = 50;
    let centerTextColor = "#d6b331";
    let itemsColor  = "#2860d6";
    const bullsEye = new BullsEye(question, circleSize, maxSizeOfIcon, colors, images, centerText, centerTextColor, numberOfRequired, isCenterActiveFlag, itemsLayout, itemsColor)
    bullsEye.render();
})();
