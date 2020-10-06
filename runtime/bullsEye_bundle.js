/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./runtime_dev/BullsEye_dev.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BullsEye = /*#__PURE__*/function () {
  function BullsEye(question) {
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 600;
    var iconsSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
    var circleColors = arguments.length > 3 ? arguments[3] : undefined;
    var images = arguments.length > 4 ? arguments[4] : undefined;
    var centerText = arguments.length > 5 ? arguments[5] : undefined;
    var centerTextColor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "#ffffff";
    var numberOfRequired = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var isCenterActiveFlag = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
    var itemsLayout = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : "vertical";
    var itemsColor = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : "#000088";

    _classCallCheck(this, BullsEye);

    this.question = question;
    this.bullsEyeSize = size ? size : 600;
    this.centerText = centerText;
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
    this.itemsPosition = this.qContainer.scrollWidth >= this.bullsEyeSize + this.bullsEyeSize + 72 ? "right" : "bottom";
    this.question.validationEvent.on(this.onQuestionValidationComplete.bind(this));
    window.addEventListener("resize", this.recalculatePositions.bind(this));
  }

  _createClass(BullsEye, [{
    key: "render",
    value: function render() {
      $('<div class="cf-question__text">' + this.question.text + "</div>").appendTo("#" + this.question.id);
      $('<div class="cf-question__instruction">' + this.question.instruction + '</div>').appendTo("#" + this.question.id);
      this.renderContent();
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      $('<div class="target-question-wrapper">' + '<div>' + '<svg class="target-wrapper"></svg>' + '</div>' + '<div class="target-relations">' + '<div class="target-relations-table"></div>' + '</div>' + '</div>').appendTo("#" + this.question.id);
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
  }, {
    key: "createBullsEye",
    value: function createBullsEye() {
      var _this = this;

      var emptyCenter = [];
      if (!this.centerIsActive) emptyCenter.push({
        code: ""
      });
      emptyCenter.concat(this.question.scales).forEach(function (scale, index) {
        var cId = "target_" + scale.code;
        var radius = _this.gapSize * (index + 1);
        var dataRank = _this.centerIsActive ? index : index - 1;

        _this.drawCircle(_this.center, _this.center, _this.colors[index % _this.colors.length], cId, radius, dataRank);
      });
    }
  }, {
    key: "createIcons",
    value: function createIcons() {
      var _this2 = this;

      var groups = {};
      var groupNames = [];
      this.question.answers.forEach(function (answer, index) {
        var label = answer.text;
        var group = label.split("#")[0].trim();
        var code = answer.code;
        var icon = "";

        if (_this2.images[index]) {
          icon = "<span title=\"".concat(group, "\"  data-code=\"").concat(code, "\" class=\"draggable\" data-group=\"").concat(group, "\" back><img src=\"").concat(_this2.images[index], "\"></img></span>");
        } else {
          icon = "<span title=\"".concat(group, "\"  data-code=\"").concat(code, "\" class=\"draggable draggable__text\" data-group=\"").concat(group, "\" ><b>").concat(group, "</b></span>");
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
      groupNames.forEach(function (groupName) {
        $("<div class=\"table-relations-item\">" + "<div class=\"draggable-item\" data-group-name=\"".concat(groupName, "\">").concat(groups[groupName].reverse().join(""), "</div>") + "<div data-group-cell=\"".concat(groupName, "\">") + "<span>".concat(groupName, "</span>") + "</div></div>").appendTo($("#" + _this2.question.id + " .target-relations-table"));
      });
    }
  }, {
    key: "makeIconsDraggable",
    value: function makeIconsDraggable() {
      interact('#' + this.question.id + ' .draggable').draggable({
        inertia: false,
        // keep the element within the area of it's parent
        modifiers: [interact.modifiers.restrictRect({
          restriction: 'body',
          endOnly: true
        })],
        autoScroll: false,
        onmove: this.dragMoveListener.bind(this),
        onend: this.dragListener.bind(this)
      });
      $(document).on("click", ".draggable, .draggable b", function () {
        var label = $(this).attr("data-group");
        var input = $(this).attr("data-input"); //MIS CHECK highlighted item
        //this.highlightActiveItem(label, input);
      });
      $('#' + this.question.id + " .draggable").css({
        "width": this.iconDiameter + 10 + "px",
        "height": this.iconDiameter + 10 + "px",
        "line-height": this.iconDiameter + "px",
        "background-color": this.itemsColor
      });
      $('#' + this.question.id + " .draggable-item").css({
        "width": this.iconDiameter + 10 + "px",
        "height": this.iconDiameter + 10 + "px"
      });
    }
  }, {
    key: "dragListener",
    value: function dragListener(event) {
      var x = event.pageX;
      var y = event.pageY;
      var code = event.target.getAttribute("data-code");
      var rank = parseInt(this.checkItemInTargets(x, y));

      if (rank >= 0 & rank < this.totalCircles - this.lowestRank) {
        var rId = this.question.scales[rank].code;
        this.question.setValue(code, rId);
        $("#" + this.question.id + " #target_" + rId).animate({
          opacity: 0.33
        }, 300).animate({
          opacity: 1
        }, 300);
      } else {
        //reset
        this.question.setValue(code, "");
        var item = $("#" + this.question.id + ' .draggable[data-code="' + code + '"]');
        var left = item.attr("data-x");
        var top = item.attr("data-y");
        item.attr("data-x", "");
        item.attr("data-y", "");
        item.css({
          "left": left + "px",
          "top": top + "px",
          "transform": "translate(0,0)"
        });
        item.animate({
          left: 0,
          top: 0
        }, 300);
      }
    }
  }, {
    key: "initValues",
    value: function initValues() {
      var _this3 = this;

      if (Object.keys(this.question.values).length === 0) {
        return;
      }

      var degreeOffset = 0;
      Object.keys(this.question.values).forEach(function (answerCode) {
        var value = _this3.question.values[answerCode];
        var item = $("#" + _this3.question.id + ' [data-code="' + answerCode + '"]');

        var targetIndex = _this3.question.scales.findIndex(function (scale) {
          return scale.code == _this3.question.values[answerCode];
        });

        if (_this3.lowestRank <= parseInt(targetIndex) && parseInt(targetIndex) < _this3.totalCircles) {
          _this3.putItemOnTarget(item, value, degreeOffset);

          degreeOffset += -30;

          if (degreeOffset < -360) {
            degreeOffset = 0;
          }
        }
      });
    }
  }, {
    key: "putItemOnTarget",
    value: function putItemOnTarget(item, target, degreeOffset) {
      var centerX = $("#" + this.question.id + " .target-wrapper").position().left + $("#" + this.question.id + " .target-wrapper").width() / 2;
      var centerY = $("#" + this.question.id + " .target-wrapper").position().top + $("#" + this.question.id + " .target-wrapper").height() / 2;
      var circle = $("#" + this.question.id + ' #target_' + target);
      var r = parseInt(circle.attr("r")); //get position where icon should be shown

      var coords = this.getCoords(centerX, centerY, degreeOffset, r - this.gapSize / 2);
      var group = item.attr("data-group"); // get original position of the icon

      var originX = $("#" + this.question.id + ' [data-group-name="' + group + '"]').position().left;
      var originY = $("#" + this.question.id + ' [data-group-name="' + group + '"]').position().top;
      var iconOffset = this.iconDiameter / 2; // x will be negative as icons are place to the right

      var offsetX = (originX - coords.x) * -1;
      offsetX = offsetX - iconOffset; // determin if y is - or +

      var offsetY = coords.y - originY;

      if (coords.y < originY) {
        offsetY = (originY - coords.y) * -1;
      }

      offsetY = offsetY - iconOffset;
      item[0].style.transform = 'translate(' + offsetX + 'px, ' + offsetY + 'px)';
      item[0].setAttribute('data-x', offsetX);
      item[0].setAttribute('data-y', offsetY);
    }
  }, {
    key: "dragMoveListener",
    value: function dragMoveListener(event) {
      var target = event.target; // keep the dragged position in the data-x/data-y attributes

      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy; // translate the element
      //target.style.webkitTransform =

      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'; // update the posiion attributes

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  }, {
    key: "checkItemInTargets",
    value: function checkItemInTargets(hitx, hity) {
      var codesToCheck = this.question.scales;

      if (!this.centerIsActive) {
        codesToCheck = [{
          code: ""
        }].concat(codesToCheck);
      }

      for (var i = 0; i < this.totalCircles; i++) {
        var target = $("#" + this.question.id + " #target_" + codesToCheck[i].code);
        var x = target.position().left + parseInt(target.attr("r"));
        var y = target.position().top + parseInt(target.attr("r"));
        var hit = this.checkTargetHit(hitx, hity, x, y, parseInt(target.attr("r")));

        if (hit === true) {
          return target.attr("data-rank");
        }
      }

      return -1;
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(x, y, color, elemId, radius, rank) {
      var $svg = $("#" + this.question.id + " .target-wrapper");
      $(document.createElementNS('http' + '://www.w3.org/2000/svg', 'circle')).attr('cx', x).attr('id', elemId).attr('cy', y).attr('r', radius).attr('fill', color).attr('class', 'droppable').attr('data-rank', rank).prependTo($svg);

      if (elemId == "target_" + (this.centerIsActive ? this.question.scales[0].code : "")) {
        $(document.createElementNS('http' + '://www.w3.org/2000/svg', 'text')).attr('x', "50%").attr('y', "50%").attr('text-anchor', "middle").attr('dy', '.3em').attr('class', 'metext').attr('height', '30').attr('width', '60').attr('fill', this.centerTextColor).attr('font-size', radius / 2).text(this.centerText).appendTo($svg);
      }
    }
  }, {
    key: "highlightActiveItem",
    value: function highlightActiveItem(label, input) {
      $('td[data-group-cell] span, input').removeClass("highlight-cell");
      $('td[data-group-cell="' + label + '"] span, #' + input).addClass("highlight-cell");
    }
  }, {
    key: "onQuestionValidationComplete",
    value: function onQuestionValidationComplete(validationResult) {
      $("#" + this.question.id).removeClass("cf-question--error");
      $("#" + this.question.id + " .cf-error-block").remove();

      if (this.numberOfRequired && Object.keys(this.question.values).length < this.numberOfRequired) {
        var error = {
          message: 'Please provide at least ' + this.numberOfRequired + ' answer(s)'
        };
        validationResult.errors.push(error);
        this.renderErrors();
        $("#" + this.question.id + " .cf-error-list").append(error.message);
        $("#" + this.question.id).addClass("cf-question--error");
      }
    }
  }, {
    key: "renderErrors",
    value: function renderErrors() {
      $('<div class="cf-question__error cf-error-block cf-error-block--bottom">' + '<ul class="cf-error-list"></ul>' + "</div>").insertAfter("#" + this.question.id + " .cf-question__instruction");
    }
  }, {
    key: "recalculatePositions",
    value: function recalculatePositions() {
      var _this4 = this;

      if (this.qContainer.scrollWidth >= this.bullsEyeSize + this.bullsEyeSize + 72 && this.itemsPosition !== "right") {
        this.itemsPosition = "right";
        document.querySelectorAll("#" + this.question.id + " .draggable").forEach(function (item) {
          if (item.getAttribute("data-x") && item.getAttribute("data-y")) {
            var newXPosition = 0 - parseInt(_this4.bullsEyeSize) - 20 + parseInt(item.getAttribute("data-x"));
            var newYPosition = parseInt(_this4.bullsEyeSize) + 20 + parseInt(item.getAttribute("data-y"));
            item.setAttribute("data-x", newXPosition);
            item.setAttribute("data-y", newYPosition);
            item.style.transform = 'translate(' + item.getAttribute("data-x") + 'px, ' + item.getAttribute("data-y") + 'px)';
          }
        });
      } else if (this.qContainer.scrollWidth < this.bullsEyeSize + this.bullsEyeSize + 72 && this.itemsPosition !== "bottom") {
        this.itemsPosition = "bottom";
        document.querySelectorAll("#" + this.question.id + " .draggable").forEach(function (item) {
          if (item.getAttribute("data-x") && item.getAttribute("data-y")) {
            var newXPosition = parseInt(_this4.bullsEyeSize) + 20 + parseInt(item.getAttribute("data-x"));
            var newYPosition = 0 - parseInt(_this4.bullsEyeSize) - 20 + parseInt(item.getAttribute("data-y"));
            item.setAttribute("data-x", newXPosition);
            item.setAttribute("data-y", newYPosition);
            item.style.transform = 'translate(' + item.getAttribute("data-x") + 'px, ' + item.getAttribute("data-y") + 'px)';
          }
        });
      } // $("#" + this.question.id + " .target-relations").css({
      //     width: this.qContainer.scrollWidth > (this.bullsEyeSize + 250) ? "calc(100% - " + (this.bullsEyeSize + 50) + "px)" : "100%"
      // });

    }
  }, {
    key: "radians",
    value: function radians(deg) {
      return deg % 360 * Math.PI / 180;
    }
  }, {
    key: "getCoords",
    value: function getCoords(cx, cy, deg, radius) {
      var angle = this.radians(deg);
      var x = cx + radius * Math.cos(angle);
      var y = cy + radius * Math.sin(angle);
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "getCircumferencePoints",
    value: function getCircumferencePoints(cx, cy, deg, radius) {
      var x = (cx + radius) * Math.sin(deg * (Math.PI / 180));
      var y = (cy + radius) * -Math.cos(deg * (Math.PI / 180));
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "checkTargetHit",
    value: function checkTargetHit(a, b, cx, cy, r) {
      var dist_points = (a - cx) * (a - cx) + (b - cy) * (b - cy);
      r *= r;

      if (dist_points < r) {
        return true;
      }

      return false;
    }
  }]);

  return BullsEye;
}();


// CONCATENATED MODULE: ./runtime_dev/entry.js


if (window && !window.customQuestionsLibrary) {
  window.customQuestionsLibrary = {};
}

window.customQuestionsLibrary.BullsEye = BullsEye;

/***/ })
/******/ ]);