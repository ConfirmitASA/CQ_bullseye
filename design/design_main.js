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

    this.scales = [];
    this.colorsValues = [];
    this.colorsContainer = document.getElementById("colorsContainer");
    this.saveChanges = saveChanges;
  }

  _createClass(Colors, [{
    key: "init",
    value: function init(colors, questionSettings, centerIsActive) {
      this.colorsValues = colors;
      this.scales = questionSettings.scales;
      this.scales.unshift({
        code: "CenterText"
      });
      this.renderColorInputs(centerIsActive);
    }
  }, {
    key: "getColors",
    value: function getColors(centerIsActive) {
      this.saveColorValues();

      if (centerIsActive) {
        this.colorsValues.shift();
        this.colorsContainer.querySelector('div').style.display = 'none';
      } else this.colorsContainer.querySelector('div').style.display = 'block';

      return this.colorsValues;
    }
  }, {
    key: "renderColorInputs",
    value: function renderColorInputs(centerIsActive) {
      var _this = this;

      this.scales.forEach(function (scaleAnswer, index) {
        var colorItemContainer = document.createElement('div');
        colorItemContainer.classList.add("colorContainer");
        colorItemContainer.innerText = "".concat(scaleAnswer["code"], ": ");
        var colorPicker = document.createElement("input");
        colorPicker.setAttribute("type", "color");
        colorPicker.classList += "form-input";

        if (_this.colorsValues[index]) {
          colorPicker.value = _this.colorsValues[index];
        } else {
          _this.colorsValues.push("#000000");
        }

        colorItemContainer.appendChild(colorPicker);

        _this.colorsContainer.appendChild(colorItemContainer);

        colorPicker.addEventListener("input", _this.saveChanges);
      });
    }
  }, {
    key: "saveColorValues",
    value: function saveColorValues() {
      var _this2 = this;

      this.colorsValues = [];
      var colorInputs = this.colorsContainer.querySelectorAll('input[type="color"]');
      colorInputs.forEach(function (colorInput) {
        return _this2.colorsValues.push(colorInput.value);
      });
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
    this.answers = [];
    this.imagesContainer = document.getElementById("imagesContainer");
    this.saveChanges = saveChanges;
  }

  images_createClass(Images, [{
    key: "init",
    value: function init(images, questionSettings) {
      this.imagesValues = images;
      this.answers = questionSettings.answers;
      this.renderImagesInputs();
    }
  }, {
    key: "getImages",
    value: function getImages() {
      return this.imagesValues;
    }
  }, {
    key: "renderImagesInputs",
    value: function renderImagesInputs() {
      var _this = this;

      this.answers.forEach(function (answer, index) {
        var imageContainer = document.createElement("div");
        imageContainer.classList.add("imageContainer");
        imageContainer.innerText = "".concat(answer["code"], ": ");

        _this.imagesContainer.appendChild(imageContainer);

        var imageInput = document.createElement("input");
        imageInput.setAttribute("id", "img_".concat(index));
        imageInput.addEventListener("change", _this.loadImage.bind(_this));
        imageInput.className = "form-control input-sm form-input image-input";
        imageContainer.appendChild(imageInput);
        var imagePreview = document.createElement("img");
        imagePreview.classList.add("imagePreview");
        imageContainer.appendChild(imagePreview);

        if (_this.imagesValues[index]) {
          imageInput.value = _this.imagesValues[index];
          imagePreview.setAttribute("src", _this.imagesValues[index]);
        } else {
          _this.imagesValues.push("");
        }
      });
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
      var _this2 = this;

      this.imagesValues = [];
      var imagesInputs = this.imagesContainer.querySelectorAll('input');
      imagesInputs.forEach(function (imageInput) {
        return _this2.imagesValues.push(imageInput.value);
      });
      this.saveChanges();
    }
  }]);

  return Images;
}();


// CONCATENATED MODULE: ./design_dev/design_main.js


var language;
var centerTextSetting = {};
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
  var colors = new Colors(saveChanges);
  var images = new Images(saveChanges);
  sizeInput.addEventListener('input', saveChanges);
  iconsSizeInput.addEventListener('input', saveChanges);
  centerTextInput.addEventListener('input', saveChanges);
  requiredInput.addEventListener('input', saveChanges);
  centerIsActive.addEventListener('change', saveChanges);
  centerTextColorInput.addEventListener('input', saveChanges);
  itemsColorInput.addEventListener('input', saveChanges);
  itemsLayoutInput.addEventListener('input', saveChanges);
  window.saveChanges = saveChanges;
  customQuestion.onSettingsReceived = setValues;
  customQuestion.onInit = setValues;
  return {
    sizeInput: sizeInput,
    iconsSizeInput: iconsSizeInput,
    centerTextInput: centerTextInput,
    requiredInput: requiredInput,
    centerIsActive: centerIsActive,
    centerTextColorInput: centerTextColorInput,
    itemsColorInput: itemsColorInput,
    itemsLayoutInput: itemsLayoutInput,
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
      colors = design_main_elements.colors,
      images = design_main_elements.images;
  sizeInput.value = settings ? settings.sizeSetting : "";
  iconsSizeInput.value = settings ? settings.iconsSizeSetting : "";
  centerTextInput.value = settings ? settings.centerTextSetting : "";
  requiredInput.value = settings ? settings.requiredSetting : "";
  centerIsActive.checked = settings ? settings.centerIsActiveSetting : false;
  centerTextColorInput.value = settings ? settings.centerTextColorSetting : "#f4ffff";
  itemsColorInput.value = settings ? settings.itemsColorSetting : "#02086d";
  itemsLayoutInput.value = settings ? settings.itemsLayoutSetting : "vertical";

  if (questionSettings) {
    colors.init(settings ? settings.bullsEyeColorsSetting : [], questionSettings, centerIsActive.checked);
    images.init(settings ? settings.iconsImages : [], questionSettings);
  }
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
      colors = design_main_elements.colors,
      images = design_main_elements.images;
  var validated = true;
  validated = numberValidate(sizeInput, validated);
  validated = numberValidate(iconsSizeInput, validated);
  validated = numberValidate(requiredInput, validated);
  if (!validated) return;
  centerTextSetting[language] = centerTextInput.value;
  var settings = {
    sizeSetting: sizeInput.value,
    iconsSizeSetting: iconsSizeInput.value,
    centerTextSetting: centerTextInput.value,
    //centerTextArraySetting:    centerTextSetting,
    requiredSetting: requiredInput.value,
    centerIsActiveSetting: centerIsActive.checked,
    centerTextColorSetting: centerTextColorInput.value,
    itemsColorSetting: itemsColorInput.value,
    itemsLayoutSetting: itemsLayoutInput.value,
    bullsEyeColorsSetting: colors.getColors(centerIsActive.checked),
    iconsImages: images.getImages()
  }; //var hasError = inputElement.value === '';

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