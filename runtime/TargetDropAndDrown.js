class TargetDropAndDrown {
    constructor(question, size, maxSizeOfIcon, circleColors, centerText, shouldBeAtLeastOneAnswerFlag, isCenterActiveFlag) {
        this.question = question;
        this.bullsEyeSize = size;
        this.centerText = centerText;
        this.shouldBeAtLeaseOneAnswerFlag = shouldBeAtLeastOneAnswerFlag;
        this.qContainer = document.querySelector("#" + question.id);
        this.lowestRank = isCenterActiveFlag ? 0 : 1;
        this.totalCircles = this.question.scales.length && this.question.scales.length > 1 ? this.question.scales.length + this.lowestRank : 1;
        this.diameter = this.bullsEyeSize > this.qContainer.scrollWidth - 40 ? this.qContainer.scrollWidth - 40 : this.bullsEyeSize;
        this.largeSizeRadius = this.diameter / 2;
        this.center = this.largeSizeRadius;
        this.gapSize = this.largeSizeRadius / this.totalCircles;
        this.updatedmaxSizeOfIcon = maxSizeOfIcon && maxSizeOfIcon != 0 ? maxSizeOfIcon : 30;
        this.iconDiameter = this.updatedmaxSizeOfIcon > this.gapSize ? this.gapSize : this.updatedmaxSizeOfIcon;
        this.colors = circleColors && circleColors.length > 0 ? circleColors : ['#cc0000', '#d67107', '#e09219', '#f5cd03', '#14ca86', '#4b9fdc'];
        this.centerIsActive = isCenterActiveFlag;
        this.init();
    }

    init() {
        window.dragMoveListener = this.dragMoveListener;
        this.render();
        this.initValues();
        if (this.shouldBeAtLeaseOneAnswerFlag) {
            this.subscribeToQuestion();
        }
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
    }

    renderContent(){
        $(
            '<div id="target-question-wrapper">' +
            '<svg id="target-wrapper"></svg>' +
            '<div id="target-relations">' +
            '<div id="target-relations-table"></div>' +
            '</div>' +
            '</div>'
        ).appendTo("#" + this.question.id);
        this.createIcons();
        this.makeIconsDraggable();
        this.createBullsEye();
    }

    createBullsEye() {
        let emptyCenter = [];
        if (!this.centerIsActive)
            emptyCenter.push({code:""})
        this.question.scales.concat(emptyCenter).forEach((scale, index) => {
            const cId = "target_" + scale.code;
            const radius = this.gapSize * (index + 1);
            this.drawCircle(this.center, this.center, this.colors[(index) % this.colors.length], cId, radius, index );
        });
        $("#target-wrapper").attr({
            "width": this.diameter,
            "height": this.diameter,
            "viewBox": "0 0 " + this.diameter + " " + this.diameter
        });
    }

    createIcons() {
        let groups = {};
        let groupNames = [];
        this.question.answers.forEach((answer) => {
            const label = answer.text
            const group = label.split("#")[0].trim();
            const code = answer.code;
            //const icon = '<span title="' + group + '" data-code="' + code + '" class="draggable" data-group="' + group + '" ><b>' + group + '</b></span>';
            const icon = `<span title="${group}"  data-code="${code}" class="draggable" data-group="${group}" ><b>${group}</b></span>`
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
            ).appendTo("#target-relations-table");
        });
        $("#target-relations").css({
            width: this.qContainer.scrollWidth > (this.diameter + 250) ? "calc(100% - " + (this.diameter + 50) + "px)" : "100%"
        });
    }

    makeIconsDraggable() {
        interact('.draggable').draggable({
            inertia: false,
            // keep the element within the area of it's parent
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'body',
                    endOnly: true
                })
            ],
            autoScroll: false,
            onmove: this.dragMoveListener.bind(this),
            onend: this.dragListener.bind(this)
        });

        $(document).on("click", ".draggable, .draggable b", function () {
            const label = $(this).attr("data-group");
            const input = $(this).attr("data-input");

            //MIS CHECK highlighted item
            //this.highlightActiveItem(label, input);
        });
        $(".draggable").css({
            "width": (this.iconDiameter + 10) + "px",
            "height": (this.iconDiameter + 10) + "px",
            "line-height": (this.iconDiameter) + "px"
        });

        $(".draggable-item").css({
            "width": (this.iconDiameter + 10) + "px",
            "height": (this.iconDiameter + 10) + "px"
        });
    }

    initValues() {
        if (Object.keys(this.question.values).length === 0) {
            return;
        }
        Object.keys(this.question.values).forEach((answerCode) => {
            const value = this.question.values[answerCode];
            const item = $('[data-code="'+ answerCode +'"]')
            const targetIndex = this.question.scales.findIndex(
                (scale) => scale.code == this.question.values[answerCode]
            );
            if (this.lowestRank <= parseInt(targetIndex) && parseInt(targetIndex) < this.totalCircles) {
                this.putItemOnTarget(item, value)
            }
        });
    }

    dragListener(event) {
        const x = event.pageX;
        const y = event.pageY;
        const code = event.target.getAttribute("data-code");
        let rank = parseInt(this.checkItemInTargets(x, y));
        if (this.lowestRank <= rank & rank < this.totalCircles) {
            const rId = this.question.scales[rank].code;
            this.question.setValue(code, rId);
            $("#target_" + rId).animate({
                opacity: 0.33
            }, 300).animate({
                opacity: 1
            }, 300);

        } else {
            //reset
            this.question.setValue(code, "");
            let item = $('.draggable[data-code="' + code + '"]')
            const left = item.attr("data-x");
            const top = item.attr("data-y");
            item.attr("data-x", "");
            item.attr("data-y", "");
            item.css({ "left": left + "px", "top": top + "px", "transform": "translate(0,0)" });
            item.animate({
                left: 0,
                top: 0
            }, 300);
        }
    }

    putItemOnTarget(item, target) {
        let degreeOffset = 0;
        const centerX = $("#target-wrapper").position().left + ($("#target-wrapper").width() / 2);
        const centerY = $("#target-wrapper").position().top + ($("#target-wrapper").height() / 2);
        const circle = $('#target_' + target);
        const r = parseInt(circle.attr("r"));
        //get position where icon should be shown
        const coords = this.getCoords(centerX, centerY, degreeOffset, (r - (this.gapSize / 2)));
        const group = item.attr("data-group");
        // get original position of the icon
        const originX = $('[data-group-name="' + group + '"]').position().left;
        const originY = $('[data-group-name="' + group + '"]').position().top;
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
        item.css({
            "left": offsetX + "px",
            "top": offsetY + "px"
        });
        degreeOffset += 30;
        if (degreeOffset > 360) {
            degreeOffset = 0;
        }
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
        const hitTarget = null;
        for (let i = 0; i < this.totalCircles; i++) {
            const target =  $("#target_" + this.question.scales[i].code);
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
        const $svg = $("#target-wrapper");
        $(document.createElementNS('http' + '://www.w3.org/2000/svg', 'circle'))
            .attr('cx', x)
            .attr('id', elemId)
            .attr('cy', y)
            .attr('r', radius)
            .attr('fill', color)
            .attr('class', 'droppable')
            .attr('data-rank', rank)
            .prependTo($svg);

        if (elemId == "target_" + this.question.scales[0].code) {
            $(document.createElementNS('http' + '://www.w3.org/2000/svg', 'text'))
                .attr('x', x * 0.91)
                .attr('y', y * 1.04)
                .attr('class', 'metext')
                .attr('height', '30')
                .attr('width', '60')
                .attr('fill', "#fff")
                .text(this.centerText)
                .appendTo($svg);
        }
    }

    highlightActiveItem(label, input) {
        $('td[data-group-cell] span, input').removeClass("highlight-cell");
        $('td[data-group-cell="' + label + '"] span, #' + input).addClass("highlight-cell");
    }

    subscribeToQuestion() {
        //this.question.validationEvent.on(onQuestionValidationComplete);
        this.question.validationEvent.on(
            this.onQuestionValidationComplete.bind(this)
        );
    }

    onQuestionValidationComplete(validationResult) {
        //Question level error
        if(Object.keys(this.question.values).length == 0) {
            const error = {message: 'Please provide at least one answer'};
            validationResult.errors.push(error);
        }
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
