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

// CONCATENATED MODULE: ./design_dev/bullseyeColors.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Colors = /*#__PURE__*/function () {
  function Colors(saveChanges) {
    _classCallCheck(this, Colors);

    this.colorsValues = [];
    this.colorsContainer = document.getElementById("colorsContainer");
    this.colorsNumberContainer = document.getElementById("colorsNumber");
    this.colorsNumberContainer.addEventListener("change", this.updateColorInputs.bind(this));
    this.saveChanges = saveChanges;
  }

  _createClass(Colors, [{
    key: "init",
    value: function init(colors) {
      if (colors.length === 0) return;
      this.colorsValues = colors;
      this.colorsNumberContainer.value = colors.length;
      this.renderColorInputs();
    }
  }, {
    key: "getColors",
    value: function getColors() {
      return this.colorsValues;
    }
  }, {
    key: "updateColorInputs",
    value: function updateColorInputs() {
      this.renderColorInputs();
      this.saveChanges();
    }
  }, {
    key: "renderColorInputs",
    value: function renderColorInputs() {
      var prevNumber = this.colorsContainer.querySelectorAll('input[type="color"]').length;
      var newNumber = this.colorsNumberContainer.value;
      if (newNumber === prevNumber) return;

      if (newNumber > prevNumber) {
        for (var i = prevNumber; i < newNumber; i++) {
          var colorPicker = document.createElement("input");
          colorPicker.setAttribute("type", "color");
          colorPicker.setAttribute("id", "color_".concat(i));
          colorPicker.classList += "form-input";

          if (this.colorsValues[i]) {
            colorPicker.value = this.colorsValues[i];
          } else {
            this.colorsValues.push("#000000");
          }

          this.colorsContainer.appendChild(colorPicker);
          colorPicker.addEventListener("change", this.saveColorValues.bind(this));
        }
      } else {
        for (var _i = newNumber; _i < prevNumber; _i++) {
          this.colorsContainer.removeChild(document.getElementById("color_".concat(_i)));
          this.colorsValues.pop();
        }
      }
    }
  }, {
    key: "saveColorValues",
    value: function saveColorValues() {
      var _this = this;

      this.colorsValues = [];
      var colorInputs = this.colorsContainer.querySelectorAll('input[type="color"]');
      colorInputs.forEach(function (colorInput) {
        return _this.colorsValues.push(colorInput.value);
      });
      this.saveChanges();
    }
  }]);

  return Colors;
}();


// CONCATENATED MODULE: ./design_dev/images.js
function images_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function images_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function images_createClass(Constructor, protoProps, staticProps) { if (protoProps) images_defineProperties(Constructor.prototype, protoProps); if (staticProps) images_defineProperties(Constructor, staticProps); return Constructor; }

var Images = /*#__PURE__*/function () {
  function Images(saveChanges) {
    images_classCallCheck(this, Images);

    this.imagesValues = [];
    this.imagesContainer = document.getElementById("imagesContainer");
    this.imagesNumberContainer = document.getElementById("imagesNumber");
    this.imagesNumberContainer.addEventListener("change", this.updateImagesInputs.bind(this));
    this.saveChanges = saveChanges;
  }

  images_createClass(Images, [{
    key: "init",
    value: function init(images) {
      if (images.length === 0) return;
      this.imagesValues = images;
      this.imagesNumberContainer.value = images.length;
      this.renderImagesInputs();
    }
  }, {
    key: "getImages",
    value: function getImages() {
      return this.imagesValues;
    }
  }, {
    key: "updateImagesInputs",
    value: function updateImagesInputs() {
      this.renderImagesInputs();
      this.saveChanges();
    }
  }, {
    key: "renderImagesInputs",
    value: function renderImagesInputs() {
      var prevNumber = this.imagesContainer.querySelectorAll('input').length;
      var newNumber = this.imagesNumberContainer.value;
      if (newNumber === prevNumber) return;

      if (newNumber > prevNumber) {
        for (var i = prevNumber; i < newNumber; i++) {
          var imageContainer = document.createElement("div");
          imageContainer.setAttribute("id", "imgContainer_".concat(i));
          imageContainer.classList.add("imageContainer");
          this.imagesContainer.appendChild(imageContainer);
          var imageInput = document.createElement("input");
          imageInput.setAttribute("id", "img_".concat(i));
          imageInput.addEventListener("change", this.loadImage.bind(this));
          imageInput.className = "form-control input-sm form-input image-input";
          imageContainer.appendChild(imageInput);
          var imagePreview = document.createElement("img");
          imagePreview.classList.add("imagePreview");
          imageContainer.appendChild(imagePreview);

          if (this.imagesValues[i]) {
            imageInput.value = this.imagesValues[i];
            imagePreview.setAttribute("src", this.imagesValues[i]);
          } else {
            this.imagesValues.push("");
          }
        }
      } else {
        for (var _i = newNumber; _i < prevNumber; _i++) {
          this.imagesContainer.removeChild(document.getElementById("imgContainer_".concat(_i)));
          this.imagesValues.pop();
        }
      }
    }
  }, {
    key: "loadImage",
    value: function loadImage() {
      var previewContainer = document.querySelector("#" + event.target.id + " + img");
      previewContainer.setAttribute("src", event.target.value);
      this.saveImageValues();
    }
  }, {
    key: "saveImageValues",
    value: function saveImageValues() {
      var _this = this;

      this.imagesValues = [];
      var imagesInputs = this.imagesContainer.querySelectorAll('input');
      imagesInputs.forEach(function (imageInput) {
        return _this.imagesValues.push(imageInput.value);
      });
      this.saveChanges();
    }
  }]);

  return Images;
}();


// CONCATENATED MODULE: ./design_dev/design_main.js


var language;
var centerTextSetting = {
  9: ""
};
var translations = {
  "numberOfRequired": {
    texts: {
      9: "Please change your response. The minimum number of answers should be: "
    }
  }
};
var design_main_elements = init();

function init() {
  var sizeInput = document.getElementById('size');
  var iconsSizeInput = document.getElementById('iconsSize');
  var centerTextInput = document.getElementById('centerText');
  var requiredInput = document.getElementById('numberRequiredAnswers');
  var centerIsActive = document.getElementById('centerIsActive');
  var centerTextColorInput = document.getElementById('centerTextColor');
  var itemsColorInput = document.getElementById('itemsColor');
  var itemsLayoutInput = document.getElementById('itemsLayout');
  var colorNumber = document.getElementById("colorsNumber");
  var imagesNumber = document.getElementById('imagesNumber');
  var colors = new Colors(saveChanges);
  var images = new Images(saveChanges);
  sizeInput.addEventListener('input', saveChanges);
  iconsSizeInput.addEventListener('input', saveChanges);
  centerTextInput.addEventListener('input', saveChanges);
  requiredInput.addEventListener('input', saveChanges);
  centerIsActive.addEventListener('input', saveChanges);
  centerTextColorInput.addEventListener('input', saveChanges);
  itemsColorInput.addEventListener('input', saveChanges);
  itemsLayoutInput.addEventListener('input', saveChanges);
  window.saveChanges = saveChanges;
  customQuestion.onSettingsReceived = setValues;
  return {
    sizeInput: sizeInput,
    iconsSizeInput: iconsSizeInput,
    centerTextInput: centerTextInput,
    requiredInput: requiredInput,
    centerIsActive: centerIsActive,
    centerTextColorInput: centerTextColorInput,
    itemsColorInput: itemsColorInput,
    itemsLayoutInput: itemsLayoutInput,
    colorNumber: colorNumber,
    imagesNumber: imagesNumber,
    colors: colors,
    images: images
  };
}

function setValues(settings, uiSettings, questionSettings) {
  //setInputValue (input, settings);
  language = uiSettings.currentLanguage;
  var sizeInput = design_main_elements.sizeInput,
      iconsSizeInput = design_main_elements.iconsSizeInput,
      centerTextInput = design_main_elements.centerTextInput,
      requiredInput = design_main_elements.requiredInput,
      centerIsActive = design_main_elements.centerIsActive,
      centerTextColorInput = design_main_elements.centerTextColorInput,
      itemsColorInput = design_main_elements.itemsColorInput,
      itemsLayoutInput = design_main_elements.itemsLayoutInput,
      colorNumber = design_main_elements.colorNumber,
      imagesNumber = design_main_elements.imagesNumber,
      colors = design_main_elements.colors,
      images = design_main_elements.images;
  sizeInput.value = settings ? settings.sizeSetting : "";
  iconsSizeInput.value = settings ? settings.iconsSizeSetting : "";
  centerTextInput.value = centerTextSetting ? centerTextSetting[language] : "";
  requiredInput.value = settings ? settings.requiredSetting : "";
  centerIsActive.checked = settings ? settings.centerIsActiveSetting : false;
  centerTextColorInput.value = settings ? settings.centerTextColorSetting : "";
  itemsColorInput.value = settings ? settings.itemsColorSetting : "";
  itemsLayoutInput.value = settings ? settings.itemsLayoutSetting : "vertical";
  colors.init(settings ? settings.bullsEyeColorsSetting : 0);
  images.init(settings ? settings.iconsImages : 0);
  var translationItems = Array.prototype.slice.call(document.querySelectorAll(".translation-item input"));
  translationItems.forEach(function (item) {
    item.value = translations[item.getAttribute("translation-type")][language];
  });
}

function saveChanges() {
  var sizeInput = design_main_elements.sizeInput,
      iconsSizeInput = design_main_elements.iconsSizeInput,
      centerTextInput = design_main_elements.centerTextInput,
      requiredInput = design_main_elements.requiredInput,
      centerIsActive = design_main_elements.centerIsActive,
      centerTextColorInput = design_main_elements.centerTextColorInput,
      itemsColorInput = design_main_elements.itemsColorInput,
      itemsLayoutInput = design_main_elements.itemsLayoutInput,
      colorNumber = design_main_elements.colorNumber,
      imagesNumber = design_main_elements.imagesNumber,
      colors = design_main_elements.colors,
      images = design_main_elements.images;
  var validated = true;
  validated = numberValidate(sizeInput, validated);
  validated = numberValidate(iconsSizeInput, validated);
  validated = numberValidate(requiredInput, validated);
  validated = numberValidate(colorNumber, validated);
  validated = numberValidate(imagesNumber, validated);
  if (!validated) return;
  centerTextSetting[language] = centerTextInput.value;
  var settings = {
    sizeSetting: sizeInput.value,
    iconsSizeSetting: iconsSizeInput.value,
    centerTextSetting: centerTextSetting,
    requiredSetting: requiredInput.value,
    centerIsActiveSetting: centerIsActive.checked,
    centerTextColorSetting: centerTextColorInput.value,
    itemsColorSetting: itemsColorInput.value,
    itemsLayoutSetting: itemsLayoutInput.value,
    bullsEyeColorsSetting: colors.getColors(),
    iconsImages: images.getImages()
  };
  var translationItems = Array.prototype.slice.call(document.querySelectorAll(".translation-item input"));
  translationItems.forEach(function (item) {
    translations[item.getAttribute("translation-type")][language] = item.value ? item.value : "";
  }); //var hasError = inputElement.value === '';

  var hasError = false;
  customQuestion.saveChanges(settings, hasError);
}

function numberValidate(input, validated) {
  if (isNaN(input.value)) {
    input.classList.add("form-input--error");
    return false;
  }

  input.classList.remove("form-input--error");
  return validated;
}

/***/ })
/******/ ]);