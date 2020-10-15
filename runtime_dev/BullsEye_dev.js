export default class BullsEye {
    constructor(question, size = 600, iconsSize = 30, circleColors, images, centerText, centerTextColor = "#ffffff", numberOfRequired = 0, isCenterActiveFlag = false, itemsLayout = "vertical", itemsColor = "#000088", centerTextSetting, translations) {
        this.question = question;
        this.bullsEyeSize = size ? size : 600;
        this.numberOfRequired = numberOfRequired;
        this.qContainer = document.querySelector("#" + question.id);
        this.lowestRank = isCenterActiveFlag ? 0 : 1;
        this.totalCircles = this.question.scales.length && this.question.scales.length > 1 ? this.question.scales.length + this.lowestRank : 1;
        this.largeSizeRadius = this.bullsEyeSize / 2;
        this.center = this.largeSizeRadius;
        this.gapSize = this.largeSizeRadius / this.totalCircles;
        this.isconsSize = iconsSize ? iconsSize : 30;
        this.iconDiameter = this.isconsSize > this.gapSize ? this.gapSize : this.isconsSize;
        this.colors = circleColors && circleColors.length > 0 ? circleColors : ["#718792", "#d3e8f2", "#abd3ea", "#d3e8f2", "#abd3ea", "#d3e8f2", "#abd3ea"];
        this.images = images && images.length > 0 ? images : [];
        this.centerIsActive = isCenterActiveFlag;
        this.centerTextColor = centerTextColor;
        this.itemsColor = itemsColor;
        this.itemsLayout = itemsLayout;
        this.itemsPosition = this.qContainer.scrollWidth >= this.bullsEyeSize + this.bullsEyeSize + 72 ? "right" : "bottom"
        this.centerTextSetting = centerTextSetting ? centerTextSetting : "";
        this.translations = translations ? translations : {
            "numberOfRequired": {
                default: "Please change your response. The minimum number of answers should be: "
            }
        };
        this.isBackClicked = false;

        this.currentLanguage = Confirmit.page.surveyInfo.language;
        window.addEventListener("resize", this.recalculatePositions.bind(this));
    }

    render() {
        $(
            '<div class="cf-question__text">' + this.question.text + "</div>"
        ).appendTo("#" + this.question.id);
        $(
            '<div class="cf-question__instruction">' +
            this.question.instruction +
            '</div>'
        ).appendTo("#" + this.question.id);
        this.renderContent();
        this.subscribeToQuestion();
    }

    renderContent() {
        $(
            '<div class="target-question-wrapper">' +
            '<div>' +
            '<svg class="target-wrapper"></svg>' +
            '</div>' +
            '<div class="target-relations">' +
            '<div class="target-relations-table"></div>' +
            '</div>' +
            '</div>'
        ).appendTo("#" + this.question.id);
        $("#" + this.question.id + " .target-wrapper").attr({
            "width": this.bullsEyeSize,
            "height": this.bullsEyeSize,
            "viewBox": "0 0 " + this.bullsEyeSize + " " + this.bullsEyeSize
        });
        $("#" + this.question.id + " .target-relations").css({
            width: this.bullsEyeSize + "px",
            minWidth: this.bullsEyeSize + "px"
        });
        if (this.itemsLayout == "vertical") {
            $("#" + this.question.id + " .target-relations-table").addClass("target-relations-table__vertical");
            $("#" + this.question.id + " .target-relations-table").css({
                height: this.bullsEyeSize + "px"
            });
        }
        this.createBullsEye();
        this.createIcons();
        this.makeIconsDraggable();
        this.initValues();
    }

    createBullsEye() {
        let emptyCenter = [];
        if (!this.centerIsActive)
            emptyCenter.push({code: ""});
        emptyCenter.concat(this.question.scales).forEach((scale, index) => {
            const cId = "target_" + scale.code;
            const radius = this.gapSize * (index + 1);
            const dataRank = this.centerIsActive ? index : index - 1;
            this.drawCircle(this.center, this.center, this.colors[(index) % this.colors.length], cId, radius, dataRank);
        });
    }

    createIcons() {
        let groups = {};
        let groupNames = [];
        this.question.answers.forEach((answer, index) => {
            const label = answer.text
            const group = label.split("#")[0].trim();
            const code = answer.code;
            let icon = "";
            if (this.images[index]) {
                icon = `<span title="${group}"  data-code="${code}" class="draggable" data-group="${group}" back><img src="${this.images[index]}"></img></span>`;
            } else {
                icon = `<span title="${group}"  data-code="${code}" class="draggable draggable__text" data-group="${group}" ><b>${group}</b></span>`;
            }
            if (typeof groups[group] === "undefined") {
                groups[group] = [icon];
            } else {
                groups[group] = groups[group].concat([icon]);
            }
            if (groupNames.indexOf(group) == -1) {
                groupNames.push(group);
            }
        });
        groupNames.forEach((groupName) => {
            $(
                `<div class="table-relations-item">` +
                `<div class="draggable-item" data-group-name="${groupName}">${groups[groupName].reverse().join("")}</div>` +
                `<div data-group-cell="${groupName}">` +
                `<span>${groupName}</span>` +
                `</div></div>`
            ).appendTo($("#" + this.question.id + " .target-relations-table"));
        });
    }

    makeIconsDraggable() {
        interact('#' + this.question.id + ' .draggable').draggable({
            inertia: false,
            // keep the element within the area of it's parent
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'body',
                    endOnly: true
                })
            ],
            autoScroll: true,
            onmove: this.dragMoveListener.bind(this),
            onend: this.dragListener.bind(this)
        });

        $(document).on("click", ".draggable, .draggable b", function () {
            const label = $(this).attr("data-group");
            const input = $(this).attr("data-input");

            //MIS CHECK highlighted item
            //this.highlightActiveItem(label, input);
        });
        $('#' + this.question.id + " .draggable").css({
            "width": (this.iconDiameter + 10) + "px",
            "height": (this.iconDiameter + 10) + "px",
            "line-height": (this.iconDiameter) + "px"
        });
        $('#' + this.question.id + " .draggable__text").css({
            "background-color": this.itemsColor
        })
        $('#' + this.question.id + " .draggable-item").css({
            "width": (this.iconDiameter + 10) + "px",
            "height": (this.iconDiameter + 10) + "px"
        });
    }

    dragListener(event) {
        const x = event.pageX;
        const y = event.pageY;
        const code = event.target.getAttribute("data-code");
        let rank = parseInt(this.checkItemInTargets(x, y));
        if (rank >= 0 & rank < this.totalCircles - this.lowestRank) {
            const rId = this.question.scales[rank].code;
            this.question.setValue(code, rId);
            $("#" + this.question.id + " #target_" + rId).animate({
                opacity: 0.33
            }, 300).animate({
                opacity: 1
            }, 300);

        } else {
            //reset
            this.question.setValue(code, "");
            let item = $("#" + this.question.id + ' .draggable[data-code="' + code + '"]');
            const left = item.attr("data-x");
            const top = item.attr("data-y");
            item.attr("data-x", "");
            item.attr("data-y", "");
            item.css({"left": left + "px", "top": top + "px", "transform": "translate(0,0)"});
            item.animate({
                left: 0,
                top: 0
            }, 300);
        }
    }

    initValues() {
        if (Object.keys(this.question.values).length === 0) {
            return;
        }
        let degreeOffset = 0;
        Object.keys(this.question.values).forEach((answerCode) => {
            const value = this.question.values[answerCode];
            const item = $("#" + this.question.id + ' [data-code="' + answerCode + '"]');
            const targetIndex = this.question.scales.findIndex(
                (scale) => scale.code == this.question.values[answerCode]
            );
            if (parseInt(targetIndex) < this.totalCircles) {
                this.putItemOnTarget(item, value, degreeOffset);
                degreeOffset += -30;
                if (degreeOffset < -360) {
                    degreeOffset = 0;
                }
            }
        });
    }

    putItemOnTarget(item, target, degreeOffset) {
        const centerX = $("#" + this.question.id + " .target-wrapper").position().left + ($("#" + this.question.id + " .target-wrapper").width() / 2);
        const centerY = $("#" + this.question.id + " .target-wrapper").position().top + ($("#" + this.question.id + " .target-wrapper").height() / 2);
        const circle = $("#" + this.question.id + ' #target_' + target);
        const r = parseInt(circle.attr("r"));
        //get position where icon should be shown
        const coords = this.getCoords(centerX, centerY, degreeOffset, (r - (this.gapSize / 2)));
        const group = item.attr("data-group");
        // get original position of the icon
        const originX = $("#" + this.question.id + ' [data-group-name="' + group + '"]').position().left;
        const originY = $("#" + this.question.id + ' [data-group-name="' + group + '"]').position().top;
        const iconOffset = this.iconDiameter / 2;
        // x will be negative as icons are place to the right

        let offsetX = (originX - coords.x) * -1;
        offsetX = offsetX - iconOffset;
        // determin if y is - or +
        let offsetY = (coords.y - originY);
        if (coords.y < originY) {
            offsetY = (originY - coords.y) * -1;

        }
        offsetY = offsetY - iconOffset;
        item[0].style.transform =
            'translate(' + offsetX + 'px, ' + offsetY + 'px)';
        item[0].setAttribute('data-x', offsetX);
        item[0].setAttribute('data-y', offsetY);
    }

    dragMoveListener(event) {
        const target = event.target;
        // keep the dragged position in the data-x/data-y attributes
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        // translate the element
        //target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    checkItemInTargets(hitx, hity) {
        let codesToCheck = this.question.scales;
        if (!this.centerIsActive) {
            codesToCheck = [{code: ""}].concat(codesToCheck);
        }
        for (let i = 0; i < this.totalCircles; i++) {
            const target = $("#" + this.question.id + " #target_" + codesToCheck[i].code);
            const x = target.position().left + parseInt(target.attr("r"));
            const y = target.position().top + parseInt(target.attr("r"));
            const hit = this.checkTargetHit(hitx, hity, x, y, parseInt(target.attr("r")));
            if (hit === true) {
                return target.attr("data-rank");
            }
        }
        return -1;
    }

    drawCircle(x, y, color, elemId, radius, rank) {
        const $svg = $("#" + this.question.id + " .target-wrapper");
        $(document.createElementNS('http' + '://www.w3.org/2000/svg', 'circle'))
            .attr('cx', x)
            .attr('id', elemId)
            .attr('cy', y)
            .attr('r', radius)
            .attr('fill', color)
            .attr('class', 'droppable')
            .attr('data-rank', rank)
            .prependTo($svg);

        if (elemId == "target_" + (this.centerIsActive ? this.question.scales[0].code : "")) {
            $(document.createElementNS('http' + '://www.w3.org/2000/svg', 'text'))
                .attr('x', "50%")
                .attr('y', "50%")
                .attr('text-anchor', "middle")
                .attr('dy', '.3em')
                .attr('class', 'metext')
                .attr('height', '30')
                .attr('width', '60')
                .attr('fill', this.centerTextColor)
                .attr('font-size', radius / 2)
                .text(this.getTranslatedCenterText())
                .appendTo($svg);
        }
    }

    getTranslatedCenterText() {
        return this.centerTextSetting[this.currentLanguage] ? this.centerTextSetting[this.currentLanguage] : "";
    }

    highlightActiveItem(label, input) {
        $('td[data-group-cell] span, input').removeClass("highlight-cell");
        $('td[data-group-cell="' + label + '"] span, #' + input).addClass("highlight-cell");
    }

    subscribeToQuestion() {
        Confirmit.page.beforeNavigateEvent.on((navigation) => {
            this.isBackClicked = !navigation.next;
        });

        this.question.validationEvent.on((validationResult) => {
                if (this.isBackClicked) {
                    return;
                }
                this.onQuestionValidationComplete(validationResult);
            }
        );
    }

    onQuestionValidationComplete(validationResult) {
        $("#" + this.question.id).removeClass("cf-question--error");
        $("#" + this.question.id + " .cf-error-block").remove();
        if (this.numberOfRequired && Object.keys(this.question.values).length < this.numberOfRequired) {
            const error = {message: this.getTranslatedNumberOfRequired() + this.numberOfRequired};
            validationResult.errors.push(error);
            this.renderErrors();
            $("#" + this.question.id + " .cf-error-list").append('<li>' + error.message + '</li>');
            $("#" + this.question.id).addClass("cf-question--error");
        } else if(validationResult.answerValidationResults.length > 0) {
            this.renderErrors();
            validationResult.answerValidationResults.forEach ((error) => {
                $("#" + this.question.id + " .cf-error-list").append('<li>' + error.errors[0].message+ '</li>');
                $("#" + this.question.id).addClass("cf-question--error");
            });
        }
    }

    getTranslatedNumberOfRequired() {
        return this.translations["numberOfRequired"][this.currentLanguage] ? this.translations["numberOfRequired"][this.currentLanguage] : this.translations["numberOfRequired"]["default"];
    }

    renderErrors() {
        $(
            '<div class="cf-question__error cf-error-block cf-error-block--bottom">' +
            '<ul class="cf-error-list"></ul>' +
            "</div>"
        ).insertAfter("#" + this.question.id + " .cf-question__instruction");
    }

    recalculatePositions() {
        if (this.qContainer.scrollWidth >= this.bullsEyeSize + this.bullsEyeSize + 72 && this.itemsPosition !== "right") {
            this.itemsPosition = "right";
            document.querySelectorAll("#" + this.question.id + " .draggable").forEach(item => {
                if (item.getAttribute("data-x") && item.getAttribute("data-y")) {
                    const newXPosition = 0 - parseInt(this.bullsEyeSize) - 20 + parseInt(item.getAttribute("data-x"));
                    const newYPosition = parseInt(this.bullsEyeSize) + 20 + parseInt(item.getAttribute("data-y"));
                    item.setAttribute("data-x", newXPosition);
                    item.setAttribute("data-y", newYPosition);
                    item.style.transform =
                        'translate(' + item.getAttribute("data-x") + 'px, ' + item.getAttribute("data-y") + 'px)';
                }
            })
        } else if (this.qContainer.scrollWidth < this.bullsEyeSize + this.bullsEyeSize + 72 && this.itemsPosition !== "bottom") {
            this.itemsPosition = "bottom";
            document.querySelectorAll("#" + this.question.id + " .draggable").forEach(item => {
                if (item.getAttribute("data-x") && item.getAttribute("data-y")) {
                    const newXPosition = parseInt(this.bullsEyeSize) + 20 + parseInt(item.getAttribute("data-x"));
                    const newYPosition = 0 - parseInt(this.bullsEyeSize) - 20 + parseInt(item.getAttribute("data-y"));
                    item.setAttribute("data-x", newXPosition);
                    item.setAttribute("data-y", newYPosition);
                    item.style.transform =
                        'translate(' + item.getAttribute("data-x") + 'px, ' + item.getAttribute("data-y") + 'px)';
                }
            })
        }

        // $("#" + this.question.id + " .target-relations").css({
        //     width: this.qContainer.scrollWidth > (this.bullsEyeSize + 250) ? "calc(100% - " + (this.bullsEyeSize + 50) + "px)" : "100%"
        // });
    }

    radians(deg) {
        return deg % 360 * Math.PI / 180;
    }

    getCoords(cx, cy, deg, radius) {
        const angle = this.radians(deg);
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        return {
            x: x,
            y: y
        };
    }

    getCircumferencePoints(cx, cy, deg, radius) {
        const x = (cx + radius) * Math.sin(deg * (Math.PI / 180));
        const y = (cy + radius) * (-Math.cos(deg * (Math.PI / 180)));
        return {
            x: x,
            y: y
        };
    }

    checkTargetHit(a, b, cx, cy, r) {
        const dist_points = (a - cx) * (a - cx) + (b - cy) * (b - cy);
        r *= r;
        if (dist_points < r) {
            return true;
        }
        return false;
    }
}
