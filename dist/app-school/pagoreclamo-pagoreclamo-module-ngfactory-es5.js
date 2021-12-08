function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pagoreclamo-pagoreclamo-module-ngfactory"], {
  /***/
  "./node_modules/primeng/fesm2015/primeng-inputtextarea.js":
  /*!****************************************************************!*\
    !*** ./node_modules/primeng/fesm2015/primeng-inputtextarea.js ***!
    \****************************************************************/

  /*! exports provided: InputTextarea, InputTextareaModule */

  /***/
  function node_modulesPrimengFesm2015PrimengInputtextareaJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "InputTextarea", function () {
      return InputTextarea;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "InputTextareaModule", function () {
      return InputTextareaModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __param = undefined && undefined.__param || function (paramIndex, decorator) {
      return function (target, key) {
        decorator(target, key, paramIndex);
      };
    };

    var InputTextarea =
    /*#__PURE__*/
    function () {
      function InputTextarea(el, ngModel) {
        _classCallCheck(this, InputTextarea);

        this.el = el;
        this.ngModel = ngModel;
        this.onResize = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
      }

      _createClass(InputTextarea, [{
        key: "ngDoCheck",
        value: function ngDoCheck() {
          this.updateFilledState();

          if (this.autoResize) {
            this.resize();
          }
        } //To trigger change detection to manage ui-state-filled for material labels when there is no value binding

      }, {
        key: "onInput",
        value: function onInput(e) {
          this.updateFilledState();

          if (this.autoResize) {
            this.resize(e);
          }
        }
      }, {
        key: "updateFilledState",
        value: function updateFilledState() {
          this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length || this.ngModel && this.ngModel.model;
        }
      }, {
        key: "onFocus",
        value: function onFocus(e) {
          if (this.autoResize) {
            this.resize(e);
          }
        }
      }, {
        key: "onBlur",
        value: function onBlur(e) {
          if (this.autoResize) {
            this.resize(e);
          }
        }
      }, {
        key: "resize",
        value: function resize(event) {
          this.el.nativeElement.style.height = 'auto';
          this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';

          if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
            this.el.nativeElement.style.overflowY = "scroll";
            this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
          } else {
            this.el.nativeElement.style.overflow = "hidden";
          }

          this.onResize.emit(event || {});
        }
      }]);

      return InputTextarea;
    }();

    InputTextarea.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgModel"],
        decorators: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
        }]
      }];
    };

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], InputTextarea.prototype, "autoResize", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])()], InputTextarea.prototype, "onResize", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('input', ['$event'])], InputTextarea.prototype, "onInput", null);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('focus', ['$event'])], InputTextarea.prototype, "onFocus", null);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('blur', ['$event'])], InputTextarea.prototype, "onBlur", null);

    InputTextarea = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
      selector: '[pInputTextarea]',
      host: {
        '[class.ui-inputtext]': 'true',
        '[class.ui-corner-all]': 'true',
        '[class.ui-inputtextarea-resizable]': 'autoResize',
        '[class.ui-state-default]': 'true',
        '[class.ui-widget]': 'true',
        '[class.ui-state-filled]': 'filled'
      }
    }), __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"])())], InputTextarea);

    var InputTextareaModule = function InputTextareaModule() {
      _classCallCheck(this, InputTextareaModule);
    };

    InputTextareaModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
      exports: [InputTextarea],
      declarations: [InputTextarea]
    })], InputTextareaModule);
    /**
     * Generated bundle index. Do not edit.
     */
    //# sourceMappingURL=primeng-inputtextarea.js.map

    /***/
  },

  /***/
  "./node_modules/primeng/fieldset/primeng-fieldset.ngfactory.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/primeng/fieldset/primeng-fieldset.ngfactory.js ***!
    \*********************************************************************/

  /*! exports provided: FieldsetModuleNgFactory, RenderType_Fieldset, View_Fieldset_0, View_Fieldset_Host_0, FieldsetNgFactory */

  /***/
  function node_modulesPrimengFieldsetPrimengFieldsetNgfactoryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FieldsetModuleNgFactory", function () {
      return FieldsetModuleNgFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RenderType_Fieldset", function () {
      return RenderType_Fieldset;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_Fieldset_0", function () {
      return View_Fieldset_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_Fieldset_Host_0", function () {
      return View_Fieldset_Host_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FieldsetNgFactory", function () {
      return FieldsetNgFactory;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var primeng_fieldset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! primeng/fieldset */
    "./node_modules/primeng/fesm2015/primeng-fieldset.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var primeng_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! primeng/api */
    "./node_modules/primeng/fesm2015/primeng-api.js");
    /**
     * @fileoverview This file was generated by the Angular template compiler. Do not edit.
     *
     * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
     * tslint:disable
     */


    var FieldsetModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](primeng_fieldset__WEBPACK_IMPORTED_MODULE_1__["FieldsetModule"], [], function (_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, []], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_api__WEBPACK_IMPORTED_MODULE_3__["SharedModule"], primeng_api__WEBPACK_IMPORTED_MODULE_3__["SharedModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_fieldset__WEBPACK_IMPORTED_MODULE_1__["FieldsetModule"], primeng_fieldset__WEBPACK_IMPORTED_MODULE_1__["FieldsetModule"], [])]);
    });

    var styles_Fieldset = [];

    var RenderType_Fieldset = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcrt"]({
      encapsulation: 2,
      styles: styles_Fieldset,
      data: {
        "animation": [{
          type: 7,
          name: "fieldsetContent",
          definitions: [{
            type: 0,
            name: "hidden",
            styles: {
              type: 6,
              styles: {
                height: "0"
              },
              offset: null
            },
            options: undefined
          }, {
            type: 0,
            name: "void",
            styles: {
              type: 6,
              styles: {
                height: "{{height}}"
              },
              offset: null
            },
            options: {
              params: {
                height: "0"
              }
            }
          }, {
            type: 0,
            name: "visible",
            styles: {
              type: 6,
              styles: {
                height: "*"
              },
              offset: null
            },
            options: undefined
          }, {
            type: 1,
            expr: "visible => hidden",
            animation: {
              type: 4,
              styles: null,
              timings: "{{transitionParams}}"
            },
            options: null
          }, {
            type: 1,
            expr: "hidden => visible",
            animation: {
              type: 4,
              styles: null,
              timings: "{{transitionParams}}"
            },
            options: null
          }, {
            type: 1,
            expr: "void => hidden",
            animation: {
              type: 4,
              styles: null,
              timings: "{{transitionParams}}"
            },
            options: null
          }, {
            type: 1,
            expr: "void => visible",
            animation: {
              type: 4,
              styles: null,
              timings: "{{transitionParams}}"
            },
            options: null
          }],
          options: {}
        }]
      }
    });

    function View_Fieldset_2(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null);
    }

    function View_Fieldset_1(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 3, null, null, null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](1, 0, null, null, 2, "a", [["tabindex", "0"]], [[1, "aria-controls", 0], [1, "aria-expanded", 0]], [[null, "click"], [null, "keydown.enter"]], function (_v, en, $event) {
        var ad = true;
        var _co = _v.component;

        if ("click" === en) {
          var pd_0 = _co.toggle($event) !== false;
          ad = pd_0 && ad;
        }

        if ("keydown.enter" === en) {
          var pd_1 = _co.toggle($event) !== false;
          ad = pd_1 && ad;
        }

        return ad;
      }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_Fieldset_2)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](3, 540672, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgTemplateOutlet"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]], {
        ngTemplateOutlet: [0, "ngTemplateOutlet"]
      }, null)], function (_ck, _v) {
        var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v.parent, 7);

        _ck(_v, 3, 0, currVal_2);
      }, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.id + "-content";
        var currVal_1 = !_co.collapsed;

        _ck(_v, 1, 0, currVal_0, currVal_1);
      });
    }

    function View_Fieldset_4(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 2, "span", [["class", "ui-fieldset-toggler pi"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵpod"](2, {
        "pi-minus": 0,
        "pi-plus": 1
      })], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = "ui-fieldset-toggler pi";

        var currVal_1 = _ck(_v, 2, 0, !_co.collapsed, _co.collapsed);

        _ck(_v, 1, 0, currVal_0, currVal_1);
      }, null);
    }

    function View_Fieldset_3(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_Fieldset_4)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](2, 0, null, null, 1, "span", [["class", "ui-fieldset-legend-text"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵted"](3, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 0), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](0, null, null, 0))], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.toggleable;

        _ck(_v, 1, 0, currVal_0);
      }, function (_ck, _v) {
        var _co = _v.component;
        var currVal_1 = _co.legend;

        _ck(_v, 3, 0, currVal_1);
      });
    }

    function View_Fieldset_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 16, "fieldset", [], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵpod"](2, {
        "ui-fieldset ui-widget ui-widget-content ui-corner-all": 0,
        "ui-fieldset-toggleable": 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](3, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgStyle"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]], {
        ngStyle: [0, "ngStyle"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](4, 0, null, null, 3, "legend", [["class", "ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_Fieldset_1)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](6, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]], {
        ngIf: [0, "ngIf"],
        ngIfElse: [1, "ngIfElse"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](0, [["legendContent", 2]], null, 0, null, View_Fieldset_3)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](8, 0, null, null, 8, "div", [["class", "ui-fieldset-content-wrapper"], ["role", "region"]], [[1, "id", 0], [24, "@fieldsetContent", 0], [1, "aria-labelledby", 0], [1, "aria-hidden", 0]], [[null, "@fieldsetContent.done"]], function (_v, en, $event) {
        var ad = true;
        var _co = _v.component;

        if ("@fieldsetContent.done" === en) {
          var pd_0 = _co.onToggleDone($event) !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](9, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵpod"](10, {
        "ui-fieldset-content-wrapper-overflown": 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵpod"](11, {
        transitionParams: 0,
        height: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵpod"](12, {
        value: 0,
        params: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵpod"](13, {
        transitionParams: 0,
        height: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵpod"](14, {
        value: 0,
        params: 1
      }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](15, 0, null, null, 1, "div", [["class", "ui-fieldset-content"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 1)], function (_ck, _v) {
        var _co = _v.component;
        var currVal_1 = _co.styleClass;

        var currVal_2 = _ck(_v, 2, 0, true, _co.toggleable);

        _ck(_v, 1, 0, currVal_1, currVal_2);

        var currVal_3 = _co.style;

        _ck(_v, 3, 0, currVal_3);

        var currVal_4 = _co.toggleable;

        var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 7);

        _ck(_v, 6, 0, currVal_4, currVal_5);

        var currVal_10 = "ui-fieldset-content-wrapper";

        var currVal_11 = _ck(_v, 10, 0, _co.collapsed || _co.animating);

        _ck(_v, 9, 0, currVal_10, currVal_11);
      }, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.id;

        _ck(_v, 0, 0, currVal_0);

        var currVal_6 = _co.id + "-content";
        var currVal_7 = _co.collapsed ? _ck(_v, 12, 0, "hidden", _ck(_v, 11, 0, _co.transitionOptions, "0")) : _ck(_v, 14, 0, "visible", _ck(_v, 13, 0, _co.animating ? _co.transitionOptions : "0ms", "*"));
        var currVal_8 = _co.id;
        var currVal_9 = _co.collapsed;

        _ck(_v, 8, 0, currVal_6, currVal_7, currVal_8, currVal_9);
      });
    }

    function View_Fieldset_Host_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "p-fieldset", [], null, null, null, View_Fieldset_0, RenderType_Fieldset)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 49152, null, 0, primeng_fieldset__WEBPACK_IMPORTED_MODULE_1__["Fieldset"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]], null, null)], null, null);
    }

    var FieldsetNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵccf"]("p-fieldset", primeng_fieldset__WEBPACK_IMPORTED_MODULE_1__["Fieldset"], View_Fieldset_Host_0, {
      legend: "legend",
      toggleable: "toggleable",
      collapsed: "collapsed",
      style: "style",
      styleClass: "styleClass",
      transitionOptions: "transitionOptions"
    }, {
      collapsedChange: "collapsedChange",
      onBeforeToggle: "onBeforeToggle",
      onAfterToggle: "onAfterToggle"
    }, ["p-header", "*"]);
    /***/

  },

  /***/
  "./src/app/pages/layout/pagoreclamo/pagoreclamo-routing.module.ts":
  /*!************************************************************************!*\
    !*** ./src/app/pages/layout/pagoreclamo/pagoreclamo-routing.module.ts ***!
    \************************************************************************/

  /*! exports provided: PagoreclamoRoutingModule */

  /***/
  function srcAppPagesLayoutPagoreclamoPagoreclamoRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PagoreclamoRoutingModule", function () {
      return PagoreclamoRoutingModule;
    });
    /* harmony import */


    var _pagoreclamo_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./pagoreclamo.component */
    "./src/app/pages/layout/pagoreclamo/pagoreclamo.component.ts");

    var routes = [{
      path: '',
      component: _pagoreclamo_component__WEBPACK_IMPORTED_MODULE_0__["PagoreclamoComponent"]
    }];

    var PagoreclamoRoutingModule = function PagoreclamoRoutingModule() {
      _classCallCheck(this, PagoreclamoRoutingModule);
    };
    /***/

  },

  /***/
  "./src/app/pages/layout/pagoreclamo/pagoreclamo.component.css.shim.ngstyle.js":
  /*!************************************************************************************!*\
    !*** ./src/app/pages/layout/pagoreclamo/pagoreclamo.component.css.shim.ngstyle.js ***!
    \************************************************************************************/

  /*! exports provided: styles */

  /***/
  function srcAppPagesLayoutPagoreclamoPagoreclamoComponentCssShimNgstyleJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "styles", function () {
      return styles;
    });
    /**
     * @fileoverview This file was generated by the Angular template compiler. Do not edit.
     *
     * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
     * tslint:disable
     */


    var styles = [".uploadfilecontainer[_ngcontent-%COMP%] {\n    background-image: url('upload_excel.png');\n    background-repeat: no-repeat;\n    background-size: 100px;\n    background-position: center;\n    height: 200px;\n    width: 80%;\n    margin: 20px auto;\n    border: 2px dashed #1c8adb;\n    border-radius: 10px;\n}\n\n.uploadfilecontainer[_ngcontent-%COMP%]:hover {\n    cursor: pointer;\n    background-color: #9ecbec !important;\n    opacity: 0.8;\n}\n\n.files-list[_ngcontent-%COMP%] {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: justify;\n            justify-content: space-between;\n    width: 80%;\n    margin: 10px auto;\n    background: #ffffff;\n    border: 1px dashed;\n    border-radius: 12px;\n    padding: 5px;\n    color: #1c8adb;\n}\n\n.custom-dropzone[_ngcontent-%COMP%]   .galery[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\n    width: 100% !important;\n}\n\n.custom-dropzone[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{\n    font-size: 18px;\n    font-weight: bold;\n    color: white;\n}\n\nngx-dropzone-preview[_ngcontent-%COMP%]{\n    width: 100% !important;\n}\n\n.btn_enviar[_ngcontent-%COMP%] {\n    display: inline;\n    color: #ffffff;\n    background: #9c27b0;\n    border: 1px solid #9c27b0;\n    font-size: 18px;\n    font-weight: bold;\n}\n\n.form-control[_ngcontent-%COMP%] {\n    border: 1px solid #c4c4c4 !important;\n}\n\n.is-invalid[_ngcontent-%COMP%] {\n    border: 1px solid #dc3545 !important;\n}\n\n.invalid-feedback[_ngcontent-%COMP%] {\n    color: #dc3545;\n    font-weight: bold;\n}\n\n.ng-valid[required][_ngcontent-%COMP%], .ng-valid.required[_ngcontent-%COMP%] {\n    border-left: 5px solid #42a948; \n}\n\n.ng-invalid[_ngcontent-%COMP%]:not(form) {\n    border-left: 5px solid #a94442; \n}\n\n.lbl[_ngcontent-%COMP%] {\n    font-weight: bold;\n    text-align: center;\n    font-size: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvcGFnZXMvbGF5b3V0L3BhZ29yZWNsYW1vL3BhZ29yZWNsYW1vLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSx5Q0FBbUU7SUFDbkUsNEJBQTRCO0lBQzVCLHNCQUFzQjtJQUN0QiwyQkFBMkI7SUFDM0IsYUFBYTtJQUNiLFVBQVU7SUFDVixpQkFBaUI7SUFDakIsMEJBQTBCO0lBQzFCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixvQ0FBb0M7SUFDcEMsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHlCQUE4QjtZQUE5Qiw4QkFBOEI7SUFDOUIsVUFBVTtJQUNWLGlCQUFpQjtJQUNqQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osY0FBYztBQUNsQjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixjQUFjO0lBQ2QsbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixlQUFlO0lBQ2YsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUNBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUNBO0lBQ0ksY0FBYztJQUNkLGlCQUFpQjtBQUNyQjs7QUFFQTs7SUFFSSw4QkFBOEIsRUFBRSxVQUFVO0FBQzlDOztBQUVBO0lBQ0ksOEJBQThCLEVBQUUsUUFBUTtBQUM1Qzs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsZUFBZTtBQUNuQiIsImZpbGUiOiIuLi8uLi9zcmMvYXBwL3BhZ2VzL2xheW91dC9wYWdvcmVjbGFtby9wYWdvcmVjbGFtby5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnVwbG9hZGZpbGVjb250YWluZXIge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uLy4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvdXBsb2FkX2V4Y2VsLnBuZ1wiKTtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwcHg7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAgIGhlaWdodDogMjAwcHg7XG4gICAgd2lkdGg6IDgwJTtcbiAgICBtYXJnaW46IDIwcHggYXV0bztcbiAgICBib3JkZXI6IDJweCBkYXNoZWQgIzFjOGFkYjtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuXG4udXBsb2FkZmlsZWNvbnRhaW5lcjpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM5ZWNiZWMgIWltcG9ydGFudDtcbiAgICBvcGFjaXR5OiAwLjg7XG59XG5cbi5maWxlcy1saXN0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICB3aWR0aDogODAlO1xuICAgIG1hcmdpbjogMTBweCBhdXRvO1xuICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gICAgYm9yZGVyOiAxcHggZGFzaGVkO1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgcGFkZGluZzogNXB4O1xuICAgIGNvbG9yOiAjMWM4YWRiO1xufVxuXG4uY3VzdG9tLWRyb3B6b25lIC5nYWxlcnkgaW1ne1xuICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG59XG5cbi5jdXN0b20tZHJvcHpvbmUgLnRleHR7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiB3aGl0ZTtcbn1cblxubmd4LWRyb3B6b25lLXByZXZpZXd7XG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLmJ0bl9lbnZpYXIge1xuICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICBiYWNrZ3JvdW5kOiAjOWMyN2IwO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICM5YzI3YjA7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uZm9ybS1jb250cm9sIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYzRjNGM0ICFpbXBvcnRhbnQ7XG59XG4uaXMtaW52YWxpZCB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RjMzU0NSAhaW1wb3J0YW50O1xufVxuLmludmFsaWQtZmVlZGJhY2sge1xuICAgIGNvbG9yOiAjZGMzNTQ1O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ubmctdmFsaWRbcmVxdWlyZWRdLFxuLm5nLXZhbGlkLnJlcXVpcmVkIHtcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkICM0MmE5NDg7IC8qIGdyZWVuICovXG59XG5cbi5uZy1pbnZhbGlkOm5vdChmb3JtKSB7XG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCAjYTk0NDQyOyAvKiByZWQgKi9cbn1cblxuLmxibCB7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbn1cblxuIl19 */"];
    /***/
  },

  /***/
  "./src/app/pages/layout/pagoreclamo/pagoreclamo.component.ngfactory.js":
  /*!*****************************************************************************!*\
    !*** ./src/app/pages/layout/pagoreclamo/pagoreclamo.component.ngfactory.js ***!
    \*****************************************************************************/

  /*! exports provided: RenderType_PagoreclamoComponent, View_PagoreclamoComponent_0, View_PagoreclamoComponent_Host_0, PagoreclamoComponentNgFactory */

  /***/
  function srcAppPagesLayoutPagoreclamoPagoreclamoComponentNgfactoryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RenderType_PagoreclamoComponent", function () {
      return RenderType_PagoreclamoComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_PagoreclamoComponent_0", function () {
      return View_PagoreclamoComponent_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_PagoreclamoComponent_Host_0", function () {
      return View_PagoreclamoComponent_Host_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PagoreclamoComponentNgFactory", function () {
      return PagoreclamoComponentNgFactory;
    });
    /* harmony import */


    var _pagoreclamo_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./pagoreclamo.component.css.shim.ngstyle */
    "./src/app/pages/layout/pagoreclamo/pagoreclamo.component.css.shim.ngstyle.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ngx-translate/core */
    "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! primeng/inputtext */
    "./node_modules/primeng/fesm2015/primeng-inputtext.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _node_modules_ngx_dropzone_ngx_dropzone_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../../../../node_modules/ngx-dropzone/ngx-dropzone.ngfactory */
    "./node_modules/ngx-dropzone/ngx-dropzone.ngfactory.js");
    /* harmony import */


    var ngx_dropzone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ngx-dropzone */
    "./node_modules/ngx-dropzone/fesm2015/ngx-dropzone.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _node_modules_primeng_toast_primeng_toast_ngfactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../../../../../node_modules/primeng/toast/primeng-toast.ngfactory */
    "./node_modules/primeng/toast/primeng-toast.ngfactory.js");
    /* harmony import */


    var primeng_toast__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! primeng/toast */
    "./node_modules/primeng/fesm2015/primeng-toast.js");
    /* harmony import */


    var primeng_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! primeng/api */
    "./node_modules/primeng/fesm2015/primeng-api.js");
    /* harmony import */


    var _node_modules_ngx_spinner_ngx_spinner_ngfactory__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ../../../../../node_modules/ngx-spinner/ngx-spinner.ngfactory */
    "./node_modules/ngx-spinner/ngx-spinner.ngfactory.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _node_modules_primeng_fieldset_primeng_fieldset_ngfactory__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ../../../../../node_modules/primeng/fieldset/primeng-fieldset.ngfactory */
    "./node_modules/primeng/fieldset/primeng-fieldset.ngfactory.js");
    /* harmony import */


    var primeng_fieldset__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! primeng/fieldset */
    "./node_modules/primeng/fesm2015/primeng-fieldset.js");
    /* harmony import */


    var _node_modules_primeng_dropdown_primeng_dropdown_ngfactory__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! ../../../../../node_modules/primeng/dropdown/primeng-dropdown.ngfactory */
    "./node_modules/primeng/dropdown/primeng-dropdown.ngfactory.js");
    /* harmony import */


    var primeng_dropdown__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! primeng/dropdown */
    "./node_modules/primeng/fesm2015/primeng-dropdown.js");
    /* harmony import */


    var _node_modules_primeng_calendar_primeng_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! ../../../../../node_modules/primeng/calendar/primeng-calendar.ngfactory */
    "./node_modules/primeng/calendar/primeng-calendar.ngfactory.js");
    /* harmony import */


    var primeng_calendar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! primeng/calendar */
    "./node_modules/primeng/fesm2015/primeng-calendar.js");
    /* harmony import */


    var primeng_keyfilter__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
    /*! primeng/keyfilter */
    "./node_modules/primeng/fesm2015/primeng-keyfilter.js");
    /* harmony import */


    var primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
    /*! primeng/inputtextarea */
    "./node_modules/primeng/fesm2015/primeng-inputtextarea.js");
    /* harmony import */


    var primeng_button__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
    /*! primeng/button */
    "./node_modules/primeng/fesm2015/primeng-button.js");
    /* harmony import */


    var _node_modules_primeng_accordion_primeng_accordion_ngfactory__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
    /*! ../../../../../node_modules/primeng/accordion/primeng-accordion.ngfactory */
    "./node_modules/primeng/accordion/primeng-accordion.ngfactory.js");
    /* harmony import */


    var primeng_accordion__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
    /*! primeng/accordion */
    "./node_modules/primeng/fesm2015/primeng-accordion.js");
    /* harmony import */


    var _node_modules_primeng_confirmdialog_primeng_confirmdialog_ngfactory__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
    /*! ../../../../../node_modules/primeng/confirmdialog/primeng-confirmdialog.ngfactory */
    "./node_modules/primeng/confirmdialog/primeng-confirmdialog.ngfactory.js");
    /* harmony import */


    var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
    /*! primeng/confirmdialog */
    "./node_modules/primeng/fesm2015/primeng-confirmdialog.js");
    /* harmony import */


    var _node_modules_primeng_api_primeng_api_ngfactory__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
    /*! ../../../../../node_modules/primeng/api/primeng-api.ngfactory */
    "./node_modules/primeng/api/primeng-api.ngfactory.js");
    /* harmony import */


    var _pagoreclamo_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
    /*! ./pagoreclamo.component */
    "./src/app/pages/layout/pagoreclamo/pagoreclamo.component.ts");
    /* harmony import */


    var _services_apis_service__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(
    /*! ../../../../services/apis.service */
    "./src/services/apis.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _services_util_service__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(
    /*! ../../../../services/util.service */
    "./src/services/util.service.ts");
    /**
     * @fileoverview This file was generated by the Angular template compiler. Do not edit.
     *
     * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
     * tslint:disable
     */


    var styles_PagoreclamoComponent = [_pagoreclamo_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];

    var RenderType_PagoreclamoComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({
      encapsulation: 0,
      styles: styles_PagoreclamoComponent,
      data: {}
    });

    function View_PagoreclamoComponent_2(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](1, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])], null, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 1, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).transform("Cliente es requerido"));

        _ck(_v, 1, 0, currVal_0);
      });
    }

    function View_PagoreclamoComponent_1(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null)], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.f.cliente.errors.required;

        _ck(_v, 2, 0, currVal_0);
      }, null);
    }

    function View_PagoreclamoComponent_4(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](1, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])], null, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 1, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).transform("Tipo de documento es requerido"));

        _ck(_v, 1, 0, currVal_0);
      });
    }

    function View_PagoreclamoComponent_3(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null)], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.f.tipodocumento.errors.required;

        _ck(_v, 2, 0, currVal_0);
      }, null);
    }

    function View_PagoreclamoComponent_6(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](1, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])], null, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 1, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).transform("N\xFAmero de factura es requerido"));

        _ck(_v, 1, 0, currVal_0);
      });
    }

    function View_PagoreclamoComponent_5(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_6)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null)], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.f.numfactura.errors.required;

        _ck(_v, 2, 0, currVal_0);
      }, null);
    }

    function View_PagoreclamoComponent_8(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](1, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])], null, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 1, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).transform("N\xB0 Documento es requerido"));

        _ck(_v, 1, 0, currVal_0);
      });
    }

    function View_PagoreclamoComponent_7(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_8)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null)], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.f.numdocumento.errors.required;

        _ck(_v, 2, 0, currVal_0);
      }, null);
    }

    function View_PagoreclamoComponent_10(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](1, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])], null, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 1, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).transform("Fecha es requerido"));

        _ck(_v, 1, 0, currVal_0);
      });
    }

    function View_PagoreclamoComponent_9(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_10)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null)], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.f.fecha.errors.required;

        _ck(_v, 2, 0, currVal_0);
      }, null);
    }

    function View_PagoreclamoComponent_12(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](1, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])], null, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 1, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).transform("Valor es requerido"));

        _ck(_v, 1, 0, currVal_0);
      });
    }

    function View_PagoreclamoComponent_11(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_12)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null)], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.f.valor.errors.required;

        _ck(_v, 2, 0, currVal_0);
      }, null);
    }

    function View_PagoreclamoComponent_14(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](1, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])], null, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 1, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).transform("Descripci\xF3n es requerido"));

        _ck(_v, 1, 0, currVal_0);
      });
    }

    function View_PagoreclamoComponent_13(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_14)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null)], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.f.descripcion.errors.required;

        _ck(_v, 2, 0, currVal_0);
      }, null);
    }

    function View_PagoreclamoComponent_15(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 5, "div", [["class", "ui-g-12 ui-md-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 1, "input", [["class", "form-control"], ["pInputText", ""], ["readonly", ""], ["type", "text"]], [[8, "value", 0], [2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null]], [[null, "input"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 5).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 278528, null, 0, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__["InputText"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null)], function (_ck, _v) {
        _ck(_v, 5, 0);
      }, function (_ck, _v) {
        var _co = _v.component;

        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 2, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).transform("Nombre del documento"));

        _ck(_v, 2, 0, currVal_0);

        var currVal_1 = _co.files[0].name;
        var currVal_2 = true;
        var currVal_3 = true;
        var currVal_4 = true;
        var currVal_5 = true;

        var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 5).filled;

        _ck(_v, 4, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6);
      });
    }

    function View_PagoreclamoComponent_16(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 4, "ngx-dropzone-preview", [], [[8, "style", 2], [8, "tabIndex", 0]], [[null, "removed"], [null, "keyup"]], function (_v, en, $event) {
        var ad = true;
        var _co = _v.component;

        if ("keyup" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).keyEvent($event) !== false;
          ad = pd_0 && ad;
        }

        if ("removed" === en) {
          var pd_1 = _co.onRemove(_v.context.$implicit) !== false;
          ad = pd_1 && ad;
        }

        return ad;
      }, _node_modules_ngx_dropzone_ngx_dropzone_ngfactory__WEBPACK_IMPORTED_MODULE_6__["View_NgxDropzonePreviewComponent_0"], _node_modules_ngx_dropzone_ngx_dropzone_ngfactory__WEBPACK_IMPORTED_MODULE_6__["RenderType_NgxDropzonePreviewComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, [[6, 4]], 0, ngx_dropzone__WEBPACK_IMPORTED_MODULE_7__["NgxDropzonePreviewComponent"], [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["DomSanitizer"]], {
        file: [0, "file"],
        removable: [1, "removable"]
      }, {
        removed: "removed"
      }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, 0, 2, "ngx-dropzone-label", [["class", "text"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 16384, null, 0, ngx_dropzone__WEBPACK_IMPORTED_MODULE_7__["ɵb"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](4, null, ["", " (", ") "]))], function (_ck, _v) {
        var currVal_2 = _v.context.$implicit;
        var currVal_3 = true;

        _ck(_v, 1, 0, currVal_2, currVal_3);
      }, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).hostStyle;

        var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).tabIndex;

        _ck(_v, 0, 0, currVal_0, currVal_1);

        var currVal_4 = _v.context.$implicit.name;
        var currVal_5 = _v.context.$implicit.type;

        _ck(_v, 4, 0, currVal_4, currVal_5);
      });
    }

    function View_PagoreclamoComponent_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["CurrencyPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["LOCALE_ID"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CURRENCY_CODE"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 244, "div", [["class", "ui-g"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 243, "div", [["class", "ui-g-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 231, "div", [["class", "card card-w-title"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 2, "h1", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](5, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 2, "p-toast", [], null, null, null, _node_modules_primeng_toast_primeng_toast_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_Toast_0"], _node_modules_primeng_toast_primeng_toast_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_Toast"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](8, 1294336, null, 1, primeng_toast__WEBPACK_IMPORTED_MODULE_10__["Toast"], [primeng_api__WEBPACK_IMPORTED_MODULE_11__["MessageService"]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, {
        templates: 1
      }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 3, "ngx-spinner", [["bdColor", "rgba(0, 0, 0, 0.8)"], ["color", "#fff"], ["size", "medium"], ["type", "square-jelly-box"]], null, null, null, _node_modules_ngx_spinner_ngx_spinner_ngfactory__WEBPACK_IMPORTED_MODULE_12__["View_NgxSpinnerComponent_0"], _node_modules_ngx_spinner_ngx_spinner_ngfactory__WEBPACK_IMPORTED_MODULE_12__["RenderType_NgxSpinnerComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 770048, null, 0, ngx_spinner__WEBPACK_IMPORTED_MODULE_13__["NgxSpinnerComponent"], [ngx_spinner__WEBPACK_IMPORTED_MODULE_13__["NgxSpinnerService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], {
        bdColor: [0, "bdColor"],
        size: [1, "size"],
        color: [2, "color"],
        type: [3, "type"],
        fullScreen: [4, "fullScreen"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, 0, 1, "p", [["style", "color: white"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Loading... "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, null, null, 220, "p-fieldset", [], null, null, null, _node_modules_primeng_fieldset_primeng_fieldset_ngfactory__WEBPACK_IMPORTED_MODULE_14__["View_Fieldset_0"], _node_modules_primeng_fieldset_primeng_fieldset_ngfactory__WEBPACK_IMPORTED_MODULE_14__["RenderType_Fieldset"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](15, 49152, null, 0, primeng_fieldset__WEBPACK_IMPORTED_MODULE_15__["Fieldset"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], {
        legend: [0, "legend"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, 1, 217, "div", [["class", "ui-g form-group ui-fluid"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 134, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](19, 0, null, null, 133, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) {
        var ad = true;
        var _co = _v.component;

        if ("submit" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).onSubmit($event) !== false;
          ad = pd_0 && ad;
        }

        if ("reset" === en) {
          var pd_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).onReset() !== false;
          ad = pd_1 && ad;
        }

        if ("ngSubmit" === en) {
          var pd_2 = _co.save() !== false;
          ad = pd_2 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](20, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_y"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](21, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroupDirective"], [[8, null], [8, null]], {
        form: [0, "form"]
      }, {
        ngSubmit: "ngSubmit"
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroupDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](23, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](24, 0, null, null, 14, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](25, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](26, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](28, 0, null, null, 8, "p-dropdown", [["class", "form-control"], ["formControlName", "cliente"], ["optionLabel", "cliente.nombres"], ["placeholder", "Seleccione"]], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "onChange"]], function (_v, en, $event) {
        var ad = true;
        var _co = _v.component;

        if ("onChange" === en) {
          var pd_0 = _co.onOptionsSelected() !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, _node_modules_primeng_dropdown_primeng_dropdown_ngfactory__WEBPACK_IMPORTED_MODULE_16__["View_Dropdown_0"], _node_modules_primeng_dropdown_primeng_dropdown_ngfactory__WEBPACK_IMPORTED_MODULE_16__["RenderType_Dropdown"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](29, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](30, {
        "is-invalid": 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](31, 13877248, null, 1, primeng_dropdown__WEBPACK_IMPORTED_MODULE_17__["Dropdown"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], {
        filter: [0, "filter"],
        placeholder: [1, "placeholder"],
        optionLabel: [2, "optionLabel"],
        options: [3, "options"]
      }, {
        onChange: "onChange"
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 2, {
        templates: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"], function (p0_0) {
        return [p0_0];
      }, [primeng_dropdown__WEBPACK_IMPORTED_MODULE_17__["Dropdown"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](34, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_p"]]], {
        name: [0, "name"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](36, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](38, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](39, 0, null, null, 14, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](40, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](41, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](43, 0, null, null, 8, "p-dropdown", [["class", "form-control"], ["formControlName", "tipodocumento"], ["optionLabel", "name"], ["placeholder", "Seleccione"]], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, _node_modules_primeng_dropdown_primeng_dropdown_ngfactory__WEBPACK_IMPORTED_MODULE_16__["View_Dropdown_0"], _node_modules_primeng_dropdown_primeng_dropdown_ngfactory__WEBPACK_IMPORTED_MODULE_16__["RenderType_Dropdown"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](44, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](45, {
        "is-invalid": 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](46, 13877248, null, 1, primeng_dropdown__WEBPACK_IMPORTED_MODULE_17__["Dropdown"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], {
        filter: [0, "filter"],
        placeholder: [1, "placeholder"],
        optionLabel: [2, "optionLabel"],
        options: [3, "options"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 3, {
        templates: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"], function (p0_0) {
        return [p0_0];
      }, [primeng_dropdown__WEBPACK_IMPORTED_MODULE_17__["Dropdown"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](49, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_p"]]], {
        name: [0, "name"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](51, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](53, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](54, 0, null, null, 14, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](55, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](56, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](58, 0, null, null, 8, "p-dropdown", [["class", "form-control"], ["formControlName", "numfactura"], ["optionLabel", "secuencial"], ["placeholder", "Seleccione"]], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "onChange"]], function (_v, en, $event) {
        var ad = true;
        var _co = _v.component;

        if ("onChange" === en) {
          var pd_0 = _co.onOptionsSelectedFactura() !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, _node_modules_primeng_dropdown_primeng_dropdown_ngfactory__WEBPACK_IMPORTED_MODULE_16__["View_Dropdown_0"], _node_modules_primeng_dropdown_primeng_dropdown_ngfactory__WEBPACK_IMPORTED_MODULE_16__["RenderType_Dropdown"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](59, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](60, {
        "is-invalid": 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](61, 13877248, null, 1, primeng_dropdown__WEBPACK_IMPORTED_MODULE_17__["Dropdown"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], {
        filter: [0, "filter"],
        placeholder: [1, "placeholder"],
        optionLabel: [2, "optionLabel"],
        options: [3, "options"]
      }, {
        onChange: "onChange"
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 4, {
        templates: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"], function (p0_0) {
        return [p0_0];
      }, [primeng_dropdown__WEBPACK_IMPORTED_MODULE_17__["Dropdown"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](64, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_p"]]], {
        name: [0, "name"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](66, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_5)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](68, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](69, 0, null, null, 14, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](70, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](71, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](73, 0, null, null, 8, "input", [["class", "form-control"], ["formControlName", "numdocumento"], ["pInputText", ""], ["type", "text"]], [[2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 76).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        if ("input" === en) {
          var pd_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 77)._handleInput($event.target.value) !== false;
          ad = pd_1 && ad;
        }

        if ("blur" === en) {
          var pd_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 77).onTouched() !== false;
          ad = pd_2 && ad;
        }

        if ("compositionstart" === en) {
          var pd_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 77)._compositionStart() !== false;
          ad = pd_3 && ad;
        }

        if ("compositionend" === en) {
          var pd_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 77)._compositionEnd($event.target.value) !== false;
          ad = pd_4 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](74, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](75, {
        "is-invalid": 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](76, 278528, null, 0, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__["InputText"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](77, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"], function (p0_0) {
        return [p0_0];
      }, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](79, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_p"]]], {
        name: [0, "name"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](81, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_7)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](83, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](84, 0, null, null, 14, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](85, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](86, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](88, 0, null, null, 8, "p-calendar", [["class", "form-control"], ["formControlName", "fecha"]], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, _node_modules_primeng_calendar_primeng_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_18__["View_Calendar_0"], _node_modules_primeng_calendar_primeng_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_18__["RenderType_Calendar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](89, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](90, {
        "is-invalid": 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](91, 1294336, null, 1, primeng_calendar__WEBPACK_IMPORTED_MODULE_19__["Calendar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], {
        readonlyInput: [0, "readonlyInput"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 5, {
        templates: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"], function (p0_0) {
        return [p0_0];
      }, [primeng_calendar__WEBPACK_IMPORTED_MODULE_19__["Calendar"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](94, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_p"]]], {
        name: [0, "name"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](96, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_9)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](98, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](99, 0, null, null, 16, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](100, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](101, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](103, 0, null, null, 10, "input", [["class", "form-control"], ["formControlName", "valor"], ["pInputText", ""], ["pKeyFilter", "money"], ["placeholder", "0.0"], ["type", "text"]], [[2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "keypress"], [null, "paste"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 106).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        if ("input" === en) {
          var pd_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 107)._handleInput($event.target.value) !== false;
          ad = pd_1 && ad;
        }

        if ("blur" === en) {
          var pd_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 107).onTouched() !== false;
          ad = pd_2 && ad;
        }

        if ("compositionstart" === en) {
          var pd_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 107)._compositionStart() !== false;
          ad = pd_3 && ad;
        }

        if ("compositionend" === en) {
          var pd_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 107)._compositionEnd($event.target.value) !== false;
          ad = pd_4 && ad;
        }

        if ("input" === en) {
          var pd_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108).onInput($event) !== false;
          ad = pd_5 && ad;
        }

        if ("keypress" === en) {
          var pd_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108).onKeyPress($event) !== false;
          ad = pd_6 && ad;
        }

        if ("paste" === en) {
          var pd_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108).onPaste($event) !== false;
          ad = pd_7 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](104, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](105, {
        "is-invalid": 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](106, 278528, null, 0, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__["InputText"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](107, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](108, 16384, null, 0, primeng_keyfilter__WEBPACK_IMPORTED_MODULE_20__["KeyFilter"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], {
        pattern: [0, "pattern"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALIDATORS"], function (p0_0) {
        return [p0_0];
      }, [primeng_keyfilter__WEBPACK_IMPORTED_MODULE_20__["KeyFilter"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"], function (p0_0) {
        return [p0_0];
      }, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](111, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"]], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALIDATORS"]], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_p"]]], {
        name: [0, "name"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](113, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_11)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](115, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](116, 0, null, null, 14, "div", [["class", "ui-g-12 ui-md-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](117, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](118, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](120, 0, null, null, 8, "textarea", [["class", "form-control"], ["formControlName", "descripcion"], ["pInputTextarea", ""]], [[2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-inputtextarea-resizable", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "focus"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 123).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        if ("focus" === en) {
          var pd_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 123).onFocus($event) !== false;
          ad = pd_1 && ad;
        }

        if ("blur" === en) {
          var pd_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 123).onBlur($event) !== false;
          ad = pd_2 && ad;
        }

        if ("input" === en) {
          var pd_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 124)._handleInput($event.target.value) !== false;
          ad = pd_3 && ad;
        }

        if ("blur" === en) {
          var pd_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 124).onTouched() !== false;
          ad = pd_4 && ad;
        }

        if ("compositionstart" === en) {
          var pd_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 124)._compositionStart() !== false;
          ad = pd_5 && ad;
        }

        if ("compositionend" === en) {
          var pd_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 124)._compositionEnd($event.target.value) !== false;
          ad = pd_6 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](121, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](122, {
        "is-invalid": 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](123, 278528, null, 0, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_21__["InputTextarea"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](124, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"], function (p0_0) {
        return [p0_0];
      }, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](126, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_p"]]], {
        name: [0, "name"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](128, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_13)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](130, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PagoreclamoComponent_15)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](132, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](133, 0, null, null, 12, "div", [["class", "ui-g-12 ui-md-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](134, 0, null, null, 11, "div", [["class", "custom-dropzone"], ["ngx-dropzone", ""]], [[2, "ngx-dz-disabled", null], [2, "expandable", null], [2, "unclickable", null], [2, "ngx-dz-hovered", null]], [[null, "change"], [null, "click"], [null, "dragover"], [null, "dragleave"], [null, "drop"]], function (_v, en, $event) {
        var ad = true;
        var _co = _v.component;

        if ("click" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 136)._onClick() !== false;
          ad = pd_0 && ad;
        }

        if ("dragover" === en) {
          var pd_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 136)._onDragOver($event) !== false;
          ad = pd_1 && ad;
        }

        if ("dragleave" === en) {
          var pd_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 136)._onDragLeave() !== false;
          ad = pd_2 && ad;
        }

        if ("drop" === en) {
          var pd_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 136)._onDrop($event) !== false;
          ad = pd_3 && ad;
        }

        if ("change" === en) {
          var pd_4 = _co.onSelect($event) !== false;
          ad = pd_4 && ad;
        }

        return ad;
      }, _node_modules_ngx_dropzone_ngx_dropzone_ngfactory__WEBPACK_IMPORTED_MODULE_6__["View_NgxDropzoneComponent_0"], _node_modules_ngx_dropzone_ngx_dropzone_ngfactory__WEBPACK_IMPORTED_MODULE_6__["RenderType_NgxDropzoneComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](512, null, ngx_dropzone__WEBPACK_IMPORTED_MODULE_7__["ɵa"], ngx_dropzone__WEBPACK_IMPORTED_MODULE_7__["ɵa"], []), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](136, 49152, null, 1, ngx_dropzone__WEBPACK_IMPORTED_MODULE_7__["NgxDropzoneComponent"], [[4, ngx_dropzone__WEBPACK_IMPORTED_MODULE_7__["ɵa"]]], {
        accept: [0, "accept"],
        expandable: [1, "expandable"]
      }, {
        change: "change"
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, {
        _previewChildren: 1
      }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](138, 0, null, 0, 5, "ngx-dropzone-label", [], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](139, 16384, null, 0, ngx_dropzone__WEBPACK_IMPORTED_MODULE_7__["ɵb"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](140, 0, null, null, 3, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](141, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](142, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 1, 1, null, View_PagoreclamoComponent_16)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](145, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], {
        ngForOf: [0, "ngForOf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](146, 0, null, null, 6, "div", [["class", "ui-grid ui-grid-responsive ui-fluid"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](147, 0, null, null, 5, "div", [["class", "ui-grid-row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](148, 0, null, null, 0, "div", [["class", "ui-grid-col-8"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](149, 0, null, null, 3, "div", [["class", "ui-grid-col-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](150, 0, null, null, 2, "button", [["class", "ui-button-help btn_enviar"], ["icon", "pi pi-arrow-right"], ["pButton", ""]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](151, 4341760, null, 0, primeng_button__WEBPACK_IMPORTED_MODULE_22__["ButtonDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], {
        label: [0, "label"],
        icon: [1, "icon"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](153, 0, null, null, 81, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](154, 0, null, null, 80, "p-accordion", [], null, null, null, _node_modules_primeng_accordion_primeng_accordion_ngfactory__WEBPACK_IMPORTED_MODULE_23__["View_Accordion_0"], _node_modules_primeng_accordion_primeng_accordion_ngfactory__WEBPACK_IMPORTED_MODULE_23__["RenderType_Accordion"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](155, 1228800, null, 1, primeng_accordion__WEBPACK_IMPORTED_MODULE_24__["Accordion"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], {
        multiple: [0, "multiple"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 7, {
        tabList: 1
      }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](157, 0, null, 0, 47, "p-accordionTab", [], null, null, null, _node_modules_primeng_accordion_primeng_accordion_ngfactory__WEBPACK_IMPORTED_MODULE_23__["View_AccordionTab_0"], _node_modules_primeng_accordion_primeng_accordion_ngfactory__WEBPACK_IMPORTED_MODULE_23__["RenderType_AccordionTab"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](158, 1228800, [[7, 4]], 2, primeng_accordion__WEBPACK_IMPORTED_MODULE_24__["AccordionTab"], [primeng_accordion__WEBPACK_IMPORTED_MODULE_24__["Accordion"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], {
        header: [0, "header"],
        selected: [1, "selected"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 8, {
        headerFacet: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 9, {
        templates: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](162, 0, null, 1, 42, "div", [["class", "ui-g form-group ui-fluid"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](163, 0, null, null, 5, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](164, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](165, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](167, 0, null, null, 1, "input", [["pInputText", ""], ["readonly", ""], ["type", "text"]], [[8, "value", 0], [2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null]], [[null, "input"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 168).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](168, 278528, null, 0, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__["InputText"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](169, 0, null, null, 5, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](170, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](171, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](173, 0, null, null, 1, "input", [["pInputText", ""], ["readonly", ""], ["type", "text"]], [[8, "value", 0], [2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null]], [[null, "input"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 174).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](174, 278528, null, 0, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__["InputText"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](175, 0, null, null, 5, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](176, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](177, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](179, 0, null, null, 1, "input", [["pInputText", ""], ["readonly", ""], ["type", "text"]], [[8, "value", 0], [2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null]], [[null, "input"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 180).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](180, 278528, null, 0, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__["InputText"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](181, 0, null, null, 5, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](182, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](183, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](185, 0, null, null, 1, "input", [["pInputText", ""], ["readonly", ""], ["type", "text"]], [[8, "value", 0], [2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null]], [[null, "input"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 186).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](186, 278528, null, 0, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__["InputText"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](187, 0, null, null, 5, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](188, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](189, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](191, 0, null, null, 1, "input", [["pInputText", ""], ["readonly", ""], ["type", "text"]], [[8, "value", 0], [2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null]], [[null, "input"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 192).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](192, 278528, null, 0, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__["InputText"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](193, 0, null, null, 5, "div", [["class", "ui-g-12 ui-md-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](194, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](195, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](197, 0, null, null, 1, "input", [["pInputText", ""], ["readonly", ""], ["type", "text"]], [[8, "value", 0], [2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null]], [[null, "input"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 198).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](198, 278528, null, 0, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__["InputText"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](199, 0, null, null, 5, "div", [["class", "ui-g-12 ui-md-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](200, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](201, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](203, 0, null, null, 1, "input", [["pInputText", ""], ["readonly", ""], ["type", "text"]], [[8, "value", 0], [2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null]], [[null, "input"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 204).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](204, 278528, null, 0, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__["InputText"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](205, 0, null, 0, 29, "p-accordionTab", [], null, null, null, _node_modules_primeng_accordion_primeng_accordion_ngfactory__WEBPACK_IMPORTED_MODULE_23__["View_AccordionTab_0"], _node_modules_primeng_accordion_primeng_accordion_ngfactory__WEBPACK_IMPORTED_MODULE_23__["RenderType_AccordionTab"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](206, 1228800, [[7, 4]], 2, primeng_accordion__WEBPACK_IMPORTED_MODULE_24__["AccordionTab"], [primeng_accordion__WEBPACK_IMPORTED_MODULE_24__["Accordion"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], {
        header: [0, "header"],
        selected: [1, "selected"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 10, {
        headerFacet: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 11, {
        templates: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](210, 0, null, 1, 24, "div", [["class", "ui-g form-group ui-fluid"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](211, 0, null, null, 3, "div", [["class", "ui-g-12 ui-md-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](212, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](213, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](215, 0, null, null, 3, "div", [["class", "ui-g-12 ui-md-8"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](216, 0, null, null, 2, "input", [["pInputText", ""], ["readonly", ""], ["type", "text"]], [[8, "value", 0], [2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null]], [[null, "input"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 217).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](217, 278528, null, 0, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__["InputText"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵppd"](218, 2), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](219, 0, null, null, 3, "div", [["class", "ui-g-12 ui-md-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](220, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](221, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](223, 0, null, null, 3, "div", [["class", "ui-g-12 ui-md-8"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](224, 0, null, null, 2, "input", [["pInputText", ""], ["readonly", ""], ["type", "text"]], [[8, "value", 0], [2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null]], [[null, "input"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 225).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](225, 278528, null, 0, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__["InputText"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵppd"](226, 2), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](227, 0, null, null, 3, "div", [["class", "ui-g-12 ui-md-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](228, 0, null, null, 2, "label", [["class", "lbl"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](229, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](231, 0, null, null, 3, "div", [["class", "ui-g-12 ui-md-8"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](232, 0, null, null, 2, "input", [["pInputText", ""], ["readonly", ""], ["type", "text"]], [[8, "value", 0], [2, "ui-inputtext", null], [2, "ui-corner-all", null], [2, "ui-state-default", null], [2, "ui-widget", null], [2, "ui-state-filled", null]], [[null, "input"]], function (_v, en, $event) {
        var ad = true;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 233).onInput($event) !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](233, 278528, null, 0, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__["InputText"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵppd"](234, 2), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](235, 0, null, null, 10, "p-confirmDialog", [["header", "Confirmation"], ["icon", "pi pi-exclamation-triangle"]], null, null, null, _node_modules_primeng_confirmdialog_primeng_confirmdialog_ngfactory__WEBPACK_IMPORTED_MODULE_25__["View_ConfirmDialog_0"], _node_modules_primeng_confirmdialog_primeng_confirmdialog_ngfactory__WEBPACK_IMPORTED_MODULE_25__["RenderType_ConfirmDialog"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](236, 180224, [["cd", 4]], 1, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_26__["ConfirmDialog"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], primeng_api__WEBPACK_IMPORTED_MODULE_11__["ConfirmationService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], {
        header: [0, "header"],
        icon: [1, "icon"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 12, {
        footer: 0
      }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](238, 0, null, 0, 7, "p-footer", [], null, null, null, _node_modules_primeng_api_primeng_api_ngfactory__WEBPACK_IMPORTED_MODULE_27__["View_Footer_0"], _node_modules_primeng_api_primeng_api_ngfactory__WEBPACK_IMPORTED_MODULE_27__["RenderType_Footer"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](239, 49152, [[12, 4]], 0, primeng_api__WEBPACK_IMPORTED_MODULE_11__["Footer"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](240, 0, null, 0, 2, "button", [["class", "ui-button-danger"], ["icon", "pi pi-times"], ["pButton", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) {
        var ad = true;

        if ("click" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 236).reject() !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](241, 4341760, null, 0, primeng_button__WEBPACK_IMPORTED_MODULE_22__["ButtonDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], {
        label: [0, "label"],
        icon: [1, "icon"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](243, 0, null, 0, 2, "button", [["class", "ui-button-success"], ["icon", "pi pi-check"], ["pButton", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) {
        var ad = true;

        if ("click" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 236).accept() !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](244, 4341760, null, 0, primeng_button__WEBPACK_IMPORTED_MODULE_22__["ButtonDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], {
        label: [0, "label"],
        icon: [1, "icon"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslatePipe"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])], function (_ck, _v) {
        var _co = _v.component;

        _ck(_v, 8, 0);

        var currVal_1 = "rgba(0, 0, 0, 0.8)";
        var currVal_2 = "medium";
        var currVal_3 = "#fff";
        var currVal_4 = "square-jelly-box";
        var currVal_5 = true;

        _ck(_v, 11, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5);

        var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 15, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 16).transform("Detalles del reclamo"));

        _ck(_v, 15, 0, currVal_6);

        var currVal_14 = _co.formGroup;

        _ck(_v, 21, 0, currVal_14);

        var currVal_25 = "form-control";

        var currVal_26 = _ck(_v, 30, 0, _co.submit && _co.f.cliente.errors);

        _ck(_v, 29, 0, currVal_25, currVal_26);

        var currVal_27 = true;
        var currVal_28 = "Seleccione";
        var currVal_29 = "cliente.nombres";
        var currVal_30 = _co.clientes;

        _ck(_v, 31, 0, currVal_27, currVal_28, currVal_29, currVal_30);

        var currVal_31 = "cliente";

        _ck(_v, 34, 0, currVal_31);

        var currVal_32 = _co.submit && _co.f.cliente.errors;

        _ck(_v, 38, 0, currVal_32);

        var currVal_43 = "form-control";

        var currVal_44 = _ck(_v, 45, 0, _co.submit && _co.f.tipodocumento.errors);

        _ck(_v, 44, 0, currVal_43, currVal_44);

        var currVal_45 = true;
        var currVal_46 = "Seleccione";
        var currVal_47 = "name";
        var currVal_48 = _co.tipodocumentos;

        _ck(_v, 46, 0, currVal_45, currVal_46, currVal_47, currVal_48);

        var currVal_49 = "tipodocumento";

        _ck(_v, 49, 0, currVal_49);

        var currVal_50 = _co.submit && _co.f.tipodocumento.errors;

        _ck(_v, 53, 0, currVal_50);

        var currVal_61 = "form-control";

        var currVal_62 = _ck(_v, 60, 0, _co.submit && _co.f.numfactura.errors);

        _ck(_v, 59, 0, currVal_61, currVal_62);

        var currVal_63 = true;
        var currVal_64 = "Seleccione";
        var currVal_65 = "secuencial";
        var currVal_66 = _co.facturas;

        _ck(_v, 61, 0, currVal_63, currVal_64, currVal_65, currVal_66);

        var currVal_67 = "numfactura";

        _ck(_v, 64, 0, currVal_67);

        var currVal_68 = _co.submit && _co.f.numfactura.errors;

        _ck(_v, 68, 0, currVal_68);

        var currVal_82 = "form-control";

        var currVal_83 = _ck(_v, 75, 0, _co.submit && _co.f.numdocumento.errors);

        _ck(_v, 74, 0, currVal_82, currVal_83);

        _ck(_v, 76, 0);

        var currVal_84 = "numdocumento";

        _ck(_v, 79, 0, currVal_84);

        var currVal_85 = _co.submit && _co.f.numdocumento.errors;

        _ck(_v, 83, 0, currVal_85);

        var currVal_96 = "form-control";

        var currVal_97 = _ck(_v, 90, 0, _co.submit && _co.f.fecha.errors);

        _ck(_v, 89, 0, currVal_96, currVal_97);

        var currVal_98 = true;

        _ck(_v, 91, 0, currVal_98);

        var currVal_99 = "fecha";

        _ck(_v, 94, 0, currVal_99);

        var currVal_100 = _co.submit && _co.f.fecha.errors;

        _ck(_v, 98, 0, currVal_100);

        var currVal_114 = "form-control";

        var currVal_115 = _ck(_v, 105, 0, _co.submit && _co.f.valor.errors);

        _ck(_v, 104, 0, currVal_114, currVal_115);

        _ck(_v, 106, 0);

        var currVal_116 = "money";

        _ck(_v, 108, 0, currVal_116);

        var currVal_117 = "valor";

        _ck(_v, 111, 0, currVal_117);

        var currVal_118 = _co.submit && _co.f.valor.errors;

        _ck(_v, 115, 0, currVal_118);

        var currVal_133 = "form-control";

        var currVal_134 = _ck(_v, 122, 0, _co.submit && _co.f.descripcion.errors);

        _ck(_v, 121, 0, currVal_133, currVal_134);

        _ck(_v, 123, 0);

        var currVal_135 = "descripcion";

        _ck(_v, 126, 0, currVal_135);

        var currVal_136 = _co.submit && _co.f.descripcion.errors;

        _ck(_v, 130, 0, currVal_136);

        var currVal_137 = _co.files.length > 0;

        _ck(_v, 132, 0, currVal_137);

        var currVal_142 = ".pdf, .png, .jpeg, .jpg";
        var currVal_143 = true;

        _ck(_v, 136, 0, currVal_142, currVal_143);

        var currVal_145 = _co.files;

        _ck(_v, 145, 0, currVal_145);

        var currVal_146 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 151, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 152).transform("Enviar"));

        var currVal_147 = "pi pi-arrow-right";

        _ck(_v, 151, 0, currVal_146, currVal_147);

        var currVal_148 = true;

        _ck(_v, 155, 0, currVal_148);

        var currVal_149 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 158, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 161).transform("Datos del cliente"));

        var currVal_150 = true;

        _ck(_v, 158, 0, currVal_149, currVal_150);

        _ck(_v, 168, 0);

        _ck(_v, 174, 0);

        _ck(_v, 180, 0);

        _ck(_v, 186, 0);

        _ck(_v, 192, 0);

        _ck(_v, 198, 0);

        _ck(_v, 204, 0);

        var currVal_200 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 206, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 209).transform("Balance general"));

        var currVal_201 = true;

        _ck(_v, 206, 0, currVal_200, currVal_201);

        _ck(_v, 217, 0);

        _ck(_v, 225, 0);

        _ck(_v, 233, 0);

        var currVal_223 = "Confirmation";
        var currVal_224 = "pi pi-exclamation-triangle";

        _ck(_v, 236, 0, currVal_223, currVal_224);

        var currVal_225 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 241, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 242).transform("No"));

        var currVal_226 = "pi pi-times";

        _ck(_v, 241, 0, currVal_225, currVal_226);

        var currVal_227 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 244, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 245).transform("Yes"));

        var currVal_228 = "pi pi-check";

        _ck(_v, 244, 0, currVal_227, currVal_228);
      }, function (_ck, _v) {
        var _co = _v.component;

        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 5, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).transform("Pagos y reclamos"));

        _ck(_v, 5, 0, currVal_0);

        var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 23).ngClassUntouched;

        var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 23).ngClassTouched;

        var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 23).ngClassPristine;

        var currVal_10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 23).ngClassDirty;

        var currVal_11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 23).ngClassValid;

        var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 23).ngClassInvalid;

        var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 23).ngClassPending;

        _ck(_v, 19, 0, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13);

        var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 26, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).transform("Cliente"));

        _ck(_v, 26, 0, currVal_15);

        var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 31).filled;

        var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 31).focused;

        var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 36).ngClassUntouched;

        var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 36).ngClassTouched;

        var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 36).ngClassPristine;

        var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 36).ngClassDirty;

        var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 36).ngClassValid;

        var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 36).ngClassInvalid;

        var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 36).ngClassPending;

        _ck(_v, 28, 0, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24);

        var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 41, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 42).transform("Tipo de documento"));

        _ck(_v, 41, 0, currVal_33);

        var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).filled;

        var currVal_35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).focused;

        var currVal_36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassUntouched;

        var currVal_37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassTouched;

        var currVal_38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassPristine;

        var currVal_39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassDirty;

        var currVal_40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassValid;

        var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassInvalid;

        var currVal_42 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassPending;

        _ck(_v, 43, 0, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42);

        var currVal_51 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 56, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 57).transform("N\xB0. Factura"));

        _ck(_v, 56, 0, currVal_51);

        var currVal_52 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 61).filled;

        var currVal_53 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 61).focused;

        var currVal_54 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassUntouched;

        var currVal_55 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassTouched;

        var currVal_56 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassPristine;

        var currVal_57 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassDirty;

        var currVal_58 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassValid;

        var currVal_59 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassInvalid;

        var currVal_60 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassPending;

        _ck(_v, 58, 0, currVal_52, currVal_53, currVal_54, currVal_55, currVal_56, currVal_57, currVal_58, currVal_59, currVal_60);

        var currVal_69 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 71, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).transform("N\xB0. Documento"));

        _ck(_v, 71, 0, currVal_69);

        var currVal_70 = true;
        var currVal_71 = true;
        var currVal_72 = true;
        var currVal_73 = true;

        var currVal_74 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 76).filled;

        var currVal_75 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81).ngClassUntouched;

        var currVal_76 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81).ngClassTouched;

        var currVal_77 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81).ngClassPristine;

        var currVal_78 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81).ngClassDirty;

        var currVal_79 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81).ngClassValid;

        var currVal_80 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81).ngClassInvalid;

        var currVal_81 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81).ngClassPending;

        _ck(_v, 73, 1, [currVal_70, currVal_71, currVal_72, currVal_73, currVal_74, currVal_75, currVal_76, currVal_77, currVal_78, currVal_79, currVal_80, currVal_81]);

        var currVal_86 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 86, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 87).transform("Fecha"));

        _ck(_v, 86, 0, currVal_86);

        var currVal_87 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 91).filled;

        var currVal_88 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 91).focus;

        var currVal_89 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 96).ngClassUntouched;

        var currVal_90 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 96).ngClassTouched;

        var currVal_91 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 96).ngClassPristine;

        var currVal_92 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 96).ngClassDirty;

        var currVal_93 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 96).ngClassValid;

        var currVal_94 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 96).ngClassInvalid;

        var currVal_95 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 96).ngClassPending;

        _ck(_v, 88, 0, currVal_87, currVal_88, currVal_89, currVal_90, currVal_91, currVal_92, currVal_93, currVal_94, currVal_95);

        var currVal_101 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 101, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 102).transform("Valor"));

        _ck(_v, 101, 0, currVal_101);

        var currVal_102 = true;
        var currVal_103 = true;
        var currVal_104 = true;
        var currVal_105 = true;

        var currVal_106 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 106).filled;

        var currVal_107 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113).ngClassUntouched;

        var currVal_108 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113).ngClassTouched;

        var currVal_109 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113).ngClassPristine;

        var currVal_110 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113).ngClassDirty;

        var currVal_111 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113).ngClassValid;

        var currVal_112 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113).ngClassInvalid;

        var currVal_113 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113).ngClassPending;

        _ck(_v, 103, 1, [currVal_102, currVal_103, currVal_104, currVal_105, currVal_106, currVal_107, currVal_108, currVal_109, currVal_110, currVal_111, currVal_112, currVal_113]);

        var currVal_119 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 118, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 119).transform("Descripci\xF3n"));

        _ck(_v, 118, 0, currVal_119);

        var currVal_120 = true;
        var currVal_121 = true;

        var currVal_122 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 123).autoResize;

        var currVal_123 = true;
        var currVal_124 = true;

        var currVal_125 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 123).filled;

        var currVal_126 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 128).ngClassUntouched;

        var currVal_127 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 128).ngClassTouched;

        var currVal_128 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 128).ngClassPristine;

        var currVal_129 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 128).ngClassDirty;

        var currVal_130 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 128).ngClassValid;

        var currVal_131 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 128).ngClassInvalid;

        var currVal_132 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 128).ngClassPending;

        _ck(_v, 120, 1, [currVal_120, currVal_121, currVal_122, currVal_123, currVal_124, currVal_125, currVal_126, currVal_127, currVal_128, currVal_129, currVal_130, currVal_131, currVal_132]);

        var currVal_138 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 136).disabled;

        var currVal_139 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 136).expandable;

        var currVal_140 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 136).disableClick;

        var currVal_141 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 136)._isHovered;

        _ck(_v, 134, 0, currVal_138, currVal_139, currVal_140, currVal_141);

        var currVal_144 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 142, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 143).transform("Mi zona de entrega personalizada de documentos"));

        _ck(_v, 142, 0, currVal_144);

        var currVal_151 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 165, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 166).transform("Identificaci\xF3n"));

        _ck(_v, 165, 0, currVal_151);

        var currVal_152 = _co.selectclient == null ? null : _co.selectclient.entiDni;
        var currVal_153 = true;
        var currVal_154 = true;
        var currVal_155 = true;
        var currVal_156 = true;

        var currVal_157 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 168).filled;

        _ck(_v, 167, 0, currVal_152, currVal_153, currVal_154, currVal_155, currVal_156, currVal_157);

        var currVal_158 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 171, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 172).transform("Nombres"));

        _ck(_v, 171, 0, currVal_158);

        var currVal_159 = _co.selectclient == null ? null : _co.selectclient.nombres;
        var currVal_160 = true;
        var currVal_161 = true;
        var currVal_162 = true;
        var currVal_163 = true;

        var currVal_164 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 174).filled;

        _ck(_v, 173, 0, currVal_159, currVal_160, currVal_161, currVal_162, currVal_163, currVal_164);

        var currVal_165 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 177, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 178).transform("Raz\xF3n Social"));

        _ck(_v, 177, 0, currVal_165);

        var currVal_166 = _co.selectclient == null ? null : _co.selectclient.razosoci;
        var currVal_167 = true;
        var currVal_168 = true;
        var currVal_169 = true;
        var currVal_170 = true;

        var currVal_171 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 180).filled;

        _ck(_v, 179, 0, currVal_166, currVal_167, currVal_168, currVal_169, currVal_170, currVal_171);

        var currVal_172 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 183, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 184).transform("Email"));

        _ck(_v, 183, 0, currVal_172);

        var currVal_173 = _co.selectclient == null ? null : _co.selectclient.email;
        var currVal_174 = true;
        var currVal_175 = true;
        var currVal_176 = true;
        var currVal_177 = true;

        var currVal_178 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 186).filled;

        _ck(_v, 185, 0, currVal_173, currVal_174, currVal_175, currVal_176, currVal_177, currVal_178);

        var currVal_179 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 189, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 190).transform("Tel\xE9fono"));

        _ck(_v, 189, 0, currVal_179);

        var currVal_180 = _co.selectclient == null ? null : _co.selectclient.phone;
        var currVal_181 = true;
        var currVal_182 = true;
        var currVal_183 = true;
        var currVal_184 = true;

        var currVal_185 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 192).filled;

        _ck(_v, 191, 0, currVal_180, currVal_181, currVal_182, currVal_183, currVal_184, currVal_185);

        var currVal_186 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 195, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 196).transform("Ciudad"));

        _ck(_v, 195, 0, currVal_186);

        var currVal_187 = _co.selectclient == null ? null : _co.selectclient.ciudad;
        var currVal_188 = true;
        var currVal_189 = true;
        var currVal_190 = true;
        var currVal_191 = true;

        var currVal_192 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 198).filled;

        _ck(_v, 197, 0, currVal_187, currVal_188, currVal_189, currVal_190, currVal_191, currVal_192);

        var currVal_193 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 201, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 202).transform("Direcci\xF3n"));

        _ck(_v, 201, 0, currVal_193);

        var currVal_194 = _co.selectclient == null ? null : _co.selectclient.direccion;
        var currVal_195 = true;
        var currVal_196 = true;
        var currVal_197 = true;
        var currVal_198 = true;

        var currVal_199 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 204).filled;

        _ck(_v, 203, 0, currVal_194, currVal_195, currVal_196, currVal_197, currVal_198, currVal_199);

        var currVal_202 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 213, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 214).transform("D\xE9bitos"));

        _ck(_v, 213, 0, currVal_202);

        var currVal_203 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 216, 0, _ck(_v, 218, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 0), _co.selectclient == null ? null : _co.selectclient.debito, "USD"));

        var currVal_204 = true;
        var currVal_205 = true;
        var currVal_206 = true;
        var currVal_207 = true;

        var currVal_208 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 217).filled;

        _ck(_v, 216, 0, currVal_203, currVal_204, currVal_205, currVal_206, currVal_207, currVal_208);

        var currVal_209 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 221, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 222).transform("Cr\xE9ditos"));

        _ck(_v, 221, 0, currVal_209);

        var currVal_210 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 224, 0, _ck(_v, 226, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 0), _co.selectclient == null ? null : _co.selectclient.credito, "USD"));

        var currVal_211 = true;
        var currVal_212 = true;
        var currVal_213 = true;
        var currVal_214 = true;

        var currVal_215 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 225).filled;

        _ck(_v, 224, 0, currVal_210, currVal_211, currVal_212, currVal_213, currVal_214, currVal_215);

        var currVal_216 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 229, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 230).transform("Balance"));

        _ck(_v, 229, 0, currVal_216);

        var currVal_217 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 232, 0, _ck(_v, 234, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 0), _co.selectclient == null ? null : _co.selectclient.balance, "USD"));

        var currVal_218 = true;
        var currVal_219 = true;
        var currVal_220 = true;
        var currVal_221 = true;

        var currVal_222 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 233).filled;

        _ck(_v, 232, 0, currVal_217, currVal_218, currVal_219, currVal_220, currVal_221, currVal_222);
      });
    }

    function View_PagoreclamoComponent_Host_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 4, "app-pagoreclamo", [], null, null, null, View_PagoreclamoComponent_0, RenderType_PagoreclamoComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](4608, null, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateStore"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateLoader"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateCompiler"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateParser"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["MissingTranslationHandler"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["USE_DEFAULT_LANG"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["USE_STORE"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["USE_EXTEND"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_LANGUAGE"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](512, null, primeng_api__WEBPACK_IMPORTED_MODULE_11__["MessageService"], primeng_api__WEBPACK_IMPORTED_MODULE_11__["MessageService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](512, null, primeng_api__WEBPACK_IMPORTED_MODULE_11__["ConfirmationService"], primeng_api__WEBPACK_IMPORTED_MODULE_11__["ConfirmationService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 114688, null, 0, _pagoreclamo_component__WEBPACK_IMPORTED_MODULE_28__["PagoreclamoComponent"], [_services_apis_service__WEBPACK_IMPORTED_MODULE_29__["ApisService"], _angular_router__WEBPACK_IMPORTED_MODULE_30__["Router"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"], ngx_spinner__WEBPACK_IMPORTED_MODULE_13__["NgxSpinnerService"], primeng_api__WEBPACK_IMPORTED_MODULE_11__["MessageService"], _services_util_service__WEBPACK_IMPORTED_MODULE_31__["UtilService"], primeng_api__WEBPACK_IMPORTED_MODULE_11__["ConfirmationService"]], null, null)], function (_ck, _v) {
        _ck(_v, 4, 0);
      }, null);
    }

    var PagoreclamoComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-pagoreclamo", _pagoreclamo_component__WEBPACK_IMPORTED_MODULE_28__["PagoreclamoComponent"], View_PagoreclamoComponent_Host_0, {}, {}, []);
    /***/

  },

  /***/
  "./src/app/pages/layout/pagoreclamo/pagoreclamo.component.ts":
  /*!*******************************************************************!*\
    !*** ./src/app/pages/layout/pagoreclamo/pagoreclamo.component.ts ***!
    \*******************************************************************/

  /*! exports provided: PagoreclamoComponent */

  /***/
  function srcAppPagesLayoutPagoreclamoPagoreclamoComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PagoreclamoComponent", function () {
      return PagoreclamoComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! moment */
    "./node_modules/moment/moment.js");
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_2___default =
    /*#__PURE__*/
    __webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);

    var PagoreclamoComponent =
    /*#__PURE__*/
    function () {
      function PagoreclamoComponent(api, router, formBuilder, spinner, messageService, utilservice, confirmationService) {
        _classCallCheck(this, PagoreclamoComponent);

        this.api = api;
        this.router = router;
        this.formBuilder = formBuilder;
        this.spinner = spinner;
        this.messageService = messageService;
        this.utilservice = utilservice;
        this.confirmationService = confirmationService;
        this.clientes = [];
        this.facturas = [];
        this.tipodocumentos = [];
        this.files = [];
        this.submit = false;
        this.formGroup = this.formBuilder.group({
          cliente: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
          tipodocumento: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
          numfactura: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
          valor: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
          fecha: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
          numdocumento: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
          descripcion: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
      }

      _createClass(PagoreclamoComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.selectclient = null;
          this.tipodocumentos = [{
            name: 'Claim',
            code: 'CL'
          }, {
            name: 'Payment',
            code: 'PA'
          }, {
            name: 'Debit',
            code: 'DB'
          }];
          this.getClient();
        }
      }, {
        key: "onOptionsSelectedFactura",
        value: function onOptionsSelectedFactura() {
          this.selectfactura = this.formGroup.get('numfactura').value;
        }
      }, {
        key: "onOptionsSelected",
        value: function onOptionsSelected() {
          this.facturas = [];
          this.selectclient = this.formGroup.get('cliente').value.cliente;
          this.facturas = this.formGroup.get('cliente').value.invoices;
        }
      }, {
        key: "getClient",
        value: function getClient() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var _this = this;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    this.utilservice.isLoading.next(true);
                    _context.next = 3;
                    return this.api.getclients(localStorage.getItem("token")).then(function (cliente) {
                      _this.clientes = [];

                      if (cliente.headerApp.code === 200) {
                        cliente.data.clientes.forEach(function (cliente) {
                          if (cliente.cliente.estado == 'A') {
                            var clientTemp = {
                              cliente: cliente.cliente,
                              invoices: cliente.invoices
                            };

                            _this.clientes.push(clientTemp);
                          }
                        });
                      }
                    }).catch(function (err) {
                      if (err.error.code == 401) {
                        localStorage.clear();

                        _this.router.navigate(['/login']);
                      }
                    });

                  case 3:
                    this.utilservice.isLoading.next(false);

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "onSelect",
        value: function onSelect(event) {
          var _this$files,
              _this2 = this;

          (_this$files = this.files).push.apply(_this$files, _toConsumableArray(event.addedFiles));

          if (this.files.length > 1) {
            this.messageService.add({
              severity: 'error',
              summary: 'Rosa Mística',
              detail: 'Solo puede subir un archivo.'
            });
            this.files = [];
            return;
          }

          var reader = new FileReader();
          reader.readAsDataURL(this.files[0]);

          reader.onload = function () {
            _this2.documentBase64 = reader.result.toString();
          };
        }
      }, {
        key: "onRemove",
        value: function onRemove(event) {
          this.files.splice(this.files.indexOf(event), 1);
        }
      }, {
        key: "save",
        value: function save() {
          var _this3 = this;

          this.submit = true;

          if (this.formGroup.invalid) {
            this.messageService.add({
              severity: 'error',
              summary: 'Rosa Mística',
              detail: 'Los campos son obligatorios'
            });
            return;
          }

          var payment = {
            tranId: "",
            entiId: this.selectclient.entiId,
            fecha: this.getFormatDate(new Date(this.formGroup.get('fecha').value)),
            numedocu: this.formGroup.get('numdocumento').value,
            secuinvo: this.formGroup.get('numfactura').value.secuencial,
            tipotran: this.formGroup.get('tipodocumento').value.code,
            monto: this.formGroup.get('valor').value,
            documento: this.files[0].name + ';' + this.documentBase64,
            descripcion: this.formGroup.get('descripcion').value
          };
          this.confirmationService.confirm({
            message: "Are you sure to send the process?",
            accept: function accept() {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this3, void 0, void 0,
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2() {
                var _this4 = this;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        this.spinner.show();
                        this.utilservice.isLoading.next(true);
                        _context2.next = 4;
                        return this.api.registerPaymentClaim(payment, localStorage.getItem("token")).then(function (data) {
                          _this4.spinner.hide();

                          if (data.headerApp.code === 200) {
                            _this4.submit = false;
                            _this4.files = [];
                            _this4.selectclient = null;
                            _this4.selectfactura = null;

                            _this4.getClient();

                            _this4.formGroup.reset();

                            _this4.messageService.add({
                              severity: 'success',
                              summary: 'Rosa Mística',
                              detail: 'Proceso generado exisotsamente'
                            });
                          }
                        }).catch(function (err) {
                          if (err.error.code == 401) {
                            localStorage.clear();

                            _this4.router.navigate(['/login']);
                          }
                        });

                      case 4:
                        this.utilservice.isLoading.next(false);

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));
            }
          });
        }
      }, {
        key: "getFormatDate",
        value: function getFormatDate(date) {
          return moment__WEBPACK_IMPORTED_MODULE_2__(date).format('yyyy-MM-DD HH:mm:ss.SSS');
        }
      }, {
        key: "f",
        get: function get() {
          return this.formGroup.controls;
        }
      }]);

      return PagoreclamoComponent;
    }();
    /***/

  },

  /***/
  "./src/app/pages/layout/pagoreclamo/pagoreclamo.module.ngfactory.js":
  /*!**************************************************************************!*\
    !*** ./src/app/pages/layout/pagoreclamo/pagoreclamo.module.ngfactory.js ***!
    \**************************************************************************/

  /*! exports provided: PagoreclamoModuleNgFactory */

  /***/
  function srcAppPagesLayoutPagoreclamoPagoreclamoModuleNgfactoryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PagoreclamoModuleNgFactory", function () {
      return PagoreclamoModuleNgFactory;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _pagoreclamo_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./pagoreclamo.module */
    "./src/app/pages/layout/pagoreclamo/pagoreclamo.module.ts");
    /* harmony import */


    var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../../../../node_modules/@angular/router/router.ngfactory */
    "./node_modules/@angular/router/router.ngfactory.js");
    /* harmony import */


    var _pagoreclamo_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./pagoreclamo.component.ngfactory */
    "./src/app/pages/layout/pagoreclamo/pagoreclamo.component.ngfactory.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _pagoreclamo_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./pagoreclamo-routing.module */
    "./src/app/pages/layout/pagoreclamo/pagoreclamo-routing.module.ts");
    /* harmony import */


    var primeng_inputtext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! primeng/inputtext */
    "./node_modules/primeng/fesm2015/primeng-inputtext.js");
    /* harmony import */


    var primeng_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! primeng/api */
    "./node_modules/primeng/fesm2015/primeng-api.js");
    /* harmony import */


    var primeng_panel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! primeng/panel */
    "./node_modules/primeng/fesm2015/primeng-panel.js");
    /* harmony import */


    var primeng_accordion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! primeng/accordion */
    "./node_modules/primeng/fesm2015/primeng-accordion.js");
    /* harmony import */


    var primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! primeng/inputtextarea */
    "./node_modules/primeng/fesm2015/primeng-inputtextarea.js");
    /* harmony import */


    var primeng_radiobutton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! primeng/radiobutton */
    "./node_modules/primeng/fesm2015/primeng-radiobutton.js");
    /* harmony import */


    var primeng_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! primeng/button */
    "./node_modules/primeng/fesm2015/primeng-button.js");
    /* harmony import */


    var primeng_autocomplete__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! primeng/autocomplete */
    "./node_modules/primeng/fesm2015/primeng-autocomplete.js");
    /* harmony import */


    var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! @angular/cdk/bidi */
    "./node_modules/@angular/cdk/fesm2015/bidi.js");
    /* harmony import */


    var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! @angular/cdk/platform */
    "./node_modules/@angular/cdk/fesm2015/platform.js");
    /* harmony import */


    var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! @angular/cdk/scrolling */
    "./node_modules/@angular/cdk/fesm2015/scrolling.js");
    /* harmony import */


    var primeng_tooltip__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! primeng/tooltip */
    "./node_modules/primeng/fesm2015/primeng-tooltip.js");
    /* harmony import */


    var primeng_dropdown__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
    /*! primeng/dropdown */
    "./node_modules/primeng/fesm2015/primeng-dropdown.js");
    /* harmony import */


    var primeng_paginator__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
    /*! primeng/paginator */
    "./node_modules/primeng/fesm2015/primeng-paginator.js");
    /* harmony import */


    var primeng_table__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
    /*! primeng/table */
    "./node_modules/primeng/fesm2015/primeng-table.js");
    /* harmony import */


    var primeng_toolbar__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
    /*! primeng/toolbar */
    "./node_modules/primeng/fesm2015/primeng-toolbar.js");
    /* harmony import */


    var primeng_card__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
    /*! primeng/card */
    "./node_modules/primeng/fesm2015/primeng-card.js");
    /* harmony import */


    var primeng_splitbutton__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
    /*! primeng/splitbutton */
    "./node_modules/primeng/fesm2015/primeng-splitbutton.js");
    /* harmony import */


    var primeng_selectbutton__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
    /*! primeng/selectbutton */
    "./node_modules/primeng/fesm2015/primeng-selectbutton.js");
    /* harmony import */


    var primeng_toast__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
    /*! primeng/toast */
    "./node_modules/primeng/fesm2015/primeng-toast.js");
    /* harmony import */


    var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
    /*! primeng/confirmdialog */
    "./node_modules/primeng/fesm2015/primeng-confirmdialog.js");
    /* harmony import */


    var primeng_keyfilter__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(
    /*! primeng/keyfilter */
    "./node_modules/primeng/fesm2015/primeng-keyfilter.js");
    /* harmony import */


    var primeng_calendar__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(
    /*! primeng/calendar */
    "./node_modules/primeng/fesm2015/primeng-calendar.js");
    /* harmony import */


    var ngx_dropzone__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(
    /*! ngx-dropzone */
    "./node_modules/ngx-dropzone/fesm2015/ngx-dropzone.js");
    /* harmony import */


    var primeng_fieldset__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(
    /*! primeng/fieldset */
    "./node_modules/primeng/fesm2015/primeng-fieldset.js");
    /* harmony import */


    var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(
    /*! @ngx-translate/core */
    "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _pagoreclamo_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(
    /*! ./pagoreclamo.component */
    "./src/app/pages/layout/pagoreclamo/pagoreclamo.component.ts");
    /**
     * @fileoverview This file was generated by the Angular template compiler. Do not edit.
     *
     * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
     * tslint:disable
     */


    var PagoreclamoModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_pagoreclamo_module__WEBPACK_IMPORTED_MODULE_1__["PagoreclamoModule"], [], function (_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_router_router_lNgFactory"], _pagoreclamo_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__["PagoreclamoComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_n"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_n"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _pagoreclamo_routing_module__WEBPACK_IMPORTED_MODULE_7__["PagoreclamoRoutingModule"], _pagoreclamo_routing_module__WEBPACK_IMPORTED_MODULE_7__["PagoreclamoRoutingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_inputtext__WEBPACK_IMPORTED_MODULE_8__["InputTextModule"], primeng_inputtext__WEBPACK_IMPORTED_MODULE_8__["InputTextModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_api__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], primeng_api__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_panel__WEBPACK_IMPORTED_MODULE_10__["PanelModule"], primeng_panel__WEBPACK_IMPORTED_MODULE_10__["PanelModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_accordion__WEBPACK_IMPORTED_MODULE_11__["AccordionModule"], primeng_accordion__WEBPACK_IMPORTED_MODULE_11__["AccordionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_12__["InputTextareaModule"], primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_12__["InputTextareaModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_radiobutton__WEBPACK_IMPORTED_MODULE_13__["RadioButtonModule"], primeng_radiobutton__WEBPACK_IMPORTED_MODULE_13__["RadioButtonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_button__WEBPACK_IMPORTED_MODULE_14__["ButtonModule"], primeng_button__WEBPACK_IMPORTED_MODULE_14__["ButtonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_d"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_d"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_autocomplete__WEBPACK_IMPORTED_MODULE_15__["AutoCompleteModule"], primeng_autocomplete__WEBPACK_IMPORTED_MODULE_15__["AutoCompleteModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_16__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_16__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_17__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_17__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_18__["CdkScrollableModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_18__["CdkScrollableModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_18__["ScrollingModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_18__["ScrollingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_tooltip__WEBPACK_IMPORTED_MODULE_19__["TooltipModule"], primeng_tooltip__WEBPACK_IMPORTED_MODULE_19__["TooltipModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_dropdown__WEBPACK_IMPORTED_MODULE_20__["DropdownModule"], primeng_dropdown__WEBPACK_IMPORTED_MODULE_20__["DropdownModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_paginator__WEBPACK_IMPORTED_MODULE_21__["PaginatorModule"], primeng_paginator__WEBPACK_IMPORTED_MODULE_21__["PaginatorModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_table__WEBPACK_IMPORTED_MODULE_22__["TableModule"], primeng_table__WEBPACK_IMPORTED_MODULE_22__["TableModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_toolbar__WEBPACK_IMPORTED_MODULE_23__["ToolbarModule"], primeng_toolbar__WEBPACK_IMPORTED_MODULE_23__["ToolbarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_card__WEBPACK_IMPORTED_MODULE_24__["CardModule"], primeng_card__WEBPACK_IMPORTED_MODULE_24__["CardModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_splitbutton__WEBPACK_IMPORTED_MODULE_25__["SplitButtonModule"], primeng_splitbutton__WEBPACK_IMPORTED_MODULE_25__["SplitButtonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_selectbutton__WEBPACK_IMPORTED_MODULE_26__["SelectButtonModule"], primeng_selectbutton__WEBPACK_IMPORTED_MODULE_26__["SelectButtonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_toast__WEBPACK_IMPORTED_MODULE_27__["ToastModule"], primeng_toast__WEBPACK_IMPORTED_MODULE_27__["ToastModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_28__["ConfirmDialogModule"], primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_28__["ConfirmDialogModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_keyfilter__WEBPACK_IMPORTED_MODULE_29__["KeyFilterModule"], primeng_keyfilter__WEBPACK_IMPORTED_MODULE_29__["KeyFilterModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_calendar__WEBPACK_IMPORTED_MODULE_30__["CalendarModule"], primeng_calendar__WEBPACK_IMPORTED_MODULE_30__["CalendarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, ngx_dropzone__WEBPACK_IMPORTED_MODULE_31__["NgxDropzoneModule"], ngx_dropzone__WEBPACK_IMPORTED_MODULE_31__["NgxDropzoneModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_fieldset__WEBPACK_IMPORTED_MODULE_32__["FieldsetModule"], primeng_fieldset__WEBPACK_IMPORTED_MODULE_32__["FieldsetModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_33__["TranslateModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_33__["TranslateModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, ngx_spinner__WEBPACK_IMPORTED_MODULE_34__["NgxSpinnerModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_34__["NgxSpinnerModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _pagoreclamo_module__WEBPACK_IMPORTED_MODULE_1__["PagoreclamoModule"], _pagoreclamo_module__WEBPACK_IMPORTED_MODULE_1__["PagoreclamoModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_6__["ROUTES"], function () {
        return [[{
          path: "",
          component: _pagoreclamo_component__WEBPACK_IMPORTED_MODULE_35__["PagoreclamoComponent"]
        }]];
      }, [])]);
    });
    /***/

  },

  /***/
  "./src/app/pages/layout/pagoreclamo/pagoreclamo.module.ts":
  /*!****************************************************************!*\
    !*** ./src/app/pages/layout/pagoreclamo/pagoreclamo.module.ts ***!
    \****************************************************************/

  /*! exports provided: PagoreclamoModule */

  /***/
  function srcAppPagesLayoutPagoreclamoPagoreclamoModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PagoreclamoModule", function () {
      return PagoreclamoModule;
    });

    var PagoreclamoModule = function PagoreclamoModule() {
      _classCallCheck(this, PagoreclamoModule);
    };
    /***/

  }
}]);
//# sourceMappingURL=pagoreclamo-pagoreclamo-module-ngfactory-es5.js.map