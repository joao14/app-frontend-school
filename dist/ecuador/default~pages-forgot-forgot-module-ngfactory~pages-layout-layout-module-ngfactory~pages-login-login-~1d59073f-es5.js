function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-forgot-forgot-module-ngfactory~pages-layout-layout-module-ngfactory~pages-login-login-~1d59073f"], {
  /***/
  "./node_modules/primeng/fesm2015/primeng-dom.js":
  /*!******************************************************!*\
    !*** ./node_modules/primeng/fesm2015/primeng-dom.js ***!
    \******************************************************/

  /*! exports provided: DomHandler */

  /***/
  function node_modulesPrimengFesm2015PrimengDomJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DomHandler", function () {
      return DomHandler;
    });
    /**
     * @dynamic is for runtime initializing DomHandler.browser
     *
     * If delete below comment, we can see this error message:
     *  Metadata collected contains an error that will be reported at runtime:
     *  Only initialized variables and constants can be referenced
     *  because the value of this variable is needed by the template compiler.
     */
    // @dynamic


    var DomHandler =
    /*#__PURE__*/
    function () {
      function DomHandler() {
        _classCallCheck(this, DomHandler);
      }

      _createClass(DomHandler, null, [{
        key: "addClass",
        value: function addClass(element, className) {
          if (element.classList) element.classList.add(className);else element.className += ' ' + className;
        }
      }, {
        key: "addMultipleClasses",
        value: function addMultipleClasses(element, className) {
          if (element.classList) {
            var styles = className.split(' ');

            for (var i = 0; i < styles.length; i++) {
              element.classList.add(styles[i]);
            }
          } else {
            var _styles = className.split(' ');

            for (var _i = 0; _i < _styles.length; _i++) {
              element.className += ' ' + _styles[_i];
            }
          }
        }
      }, {
        key: "removeClass",
        value: function removeClass(element, className) {
          if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      }, {
        key: "hasClass",
        value: function hasClass(element, className) {
          if (element.classList) return element.classList.contains(className);else return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
      }, {
        key: "siblings",
        value: function siblings(element) {
          return Array.prototype.filter.call(element.parentNode.children, function (child) {
            return child !== element;
          });
        }
      }, {
        key: "find",
        value: function find(element, selector) {
          return Array.from(element.querySelectorAll(selector));
        }
      }, {
        key: "findSingle",
        value: function findSingle(element, selector) {
          if (element) {
            return element.querySelector(selector);
          }

          return null;
        }
      }, {
        key: "index",
        value: function index(element) {
          var children = element.parentNode.childNodes;
          var num = 0;

          for (var i = 0; i < children.length; i++) {
            if (children[i] == element) return num;
            if (children[i].nodeType == 1) num++;
          }

          return -1;
        }
      }, {
        key: "indexWithinGroup",
        value: function indexWithinGroup(element, attributeName) {
          var children = element.parentNode ? element.parentNode.childNodes : [];
          var num = 0;

          for (var i = 0; i < children.length; i++) {
            if (children[i] == element) return num;
            if (children[i].attributes && children[i].attributes[attributeName] && children[i].nodeType == 1) num++;
          }

          return -1;
        }
      }, {
        key: "relativePosition",
        value: function relativePosition(element, target) {
          var elementDimensions = element.offsetParent ? {
            width: element.offsetWidth,
            height: element.offsetHeight
          } : this.getHiddenElementDimensions(element);
          var targetHeight = target.offsetHeight;
          var targetOffset = target.getBoundingClientRect();
          var viewport = this.getViewport();
          var top, left;

          if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
            top = -1 * elementDimensions.height;

            if (targetOffset.top + top < 0) {
              top = -1 * targetOffset.top;
            }
          } else {
            top = targetHeight;
          }

          if (elementDimensions.width > viewport.width) {
            // element wider then viewport and cannot fit on screen (align at left side of viewport)
            left = targetOffset.left * -1;
          } else if (targetOffset.left + elementDimensions.width > viewport.width) {
            // element wider then viewport but can be fit on screen (align at right side of viewport)
            left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
          } else {
            // element fits on screen (align with target)
            left = 0;
          }

          element.style.top = top + 'px';
          element.style.left = left + 'px';
        }
      }, {
        key: "absolutePosition",
        value: function absolutePosition(element, target) {
          var elementDimensions = element.offsetParent ? {
            width: element.offsetWidth,
            height: element.offsetHeight
          } : this.getHiddenElementDimensions(element);
          var elementOuterHeight = elementDimensions.height;
          var elementOuterWidth = elementDimensions.width;
          var targetOuterHeight = target.offsetHeight;
          var targetOuterWidth = target.offsetWidth;
          var targetOffset = target.getBoundingClientRect();
          var windowScrollTop = this.getWindowScrollTop();
          var windowScrollLeft = this.getWindowScrollLeft();
          var viewport = this.getViewport();
          var top, left;

          if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;

            if (top < 0) {
              top = windowScrollTop;
            }
          } else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
          }

          if (targetOffset.left + elementOuterWidth > viewport.width) left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);else left = targetOffset.left + windowScrollLeft;
          element.style.top = top + 'px';
          element.style.left = left + 'px';
        }
      }, {
        key: "getHiddenElementOuterHeight",
        value: function getHiddenElementOuterHeight(element) {
          element.style.visibility = 'hidden';
          element.style.display = 'block';
          var elementHeight = element.offsetHeight;
          element.style.display = 'none';
          element.style.visibility = 'visible';
          return elementHeight;
        }
      }, {
        key: "getHiddenElementOuterWidth",
        value: function getHiddenElementOuterWidth(element) {
          element.style.visibility = 'hidden';
          element.style.display = 'block';
          var elementWidth = element.offsetWidth;
          element.style.display = 'none';
          element.style.visibility = 'visible';
          return elementWidth;
        }
      }, {
        key: "getHiddenElementDimensions",
        value: function getHiddenElementDimensions(element) {
          var dimensions = {};
          element.style.visibility = 'hidden';
          element.style.display = 'block';
          dimensions.width = element.offsetWidth;
          dimensions.height = element.offsetHeight;
          element.style.display = 'none';
          element.style.visibility = 'visible';
          return dimensions;
        }
      }, {
        key: "scrollInView",
        value: function scrollInView(container, item) {
          var borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth');
          var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
          var paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop');
          var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
          var containerRect = container.getBoundingClientRect();
          var itemRect = item.getBoundingClientRect();
          var offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
          var scroll = container.scrollTop;
          var elementHeight = container.clientHeight;
          var itemHeight = this.getOuterHeight(item);

          if (offset < 0) {
            container.scrollTop = scroll + offset;
          } else if (offset + itemHeight > elementHeight) {
            container.scrollTop = scroll + offset - elementHeight + itemHeight;
          }
        }
      }, {
        key: "fadeIn",
        value: function fadeIn(element, duration) {
          element.style.opacity = 0;
          var last = +new Date();
          var opacity = 0;

          var tick = function tick() {
            opacity = +element.style.opacity.replace(",", ".") + (new Date().getTime() - last) / duration;
            element.style.opacity = opacity;
            last = +new Date();

            if (+opacity < 1) {
              window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
            }
          };

          tick();
        }
      }, {
        key: "fadeOut",
        value: function fadeOut(element, ms) {
          var opacity = 1,
              interval = 50,
              duration = ms,
              gap = interval / duration;
          var fading = setInterval(function () {
            opacity = opacity - gap;

            if (opacity <= 0) {
              opacity = 0;
              clearInterval(fading);
            }

            element.style.opacity = opacity;
          }, interval);
        }
      }, {
        key: "getWindowScrollTop",
        value: function getWindowScrollTop() {
          var doc = document.documentElement;
          return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        }
      }, {
        key: "getWindowScrollLeft",
        value: function getWindowScrollLeft() {
          var doc = document.documentElement;
          return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        }
      }, {
        key: "matches",
        value: function matches(element, selector) {
          var p = Element.prototype;

          var f = p['matches'] || p.webkitMatchesSelector || p['mozMatchesSelector'] || p['msMatchesSelector'] || function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
          };

          return f.call(element, selector);
        }
      }, {
        key: "getOuterWidth",
        value: function getOuterWidth(el, margin) {
          var width = el.offsetWidth;

          if (margin) {
            var style = getComputedStyle(el);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
          }

          return width;
        }
      }, {
        key: "getHorizontalPadding",
        value: function getHorizontalPadding(el) {
          var style = getComputedStyle(el);
          return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        }
      }, {
        key: "getHorizontalMargin",
        value: function getHorizontalMargin(el) {
          var style = getComputedStyle(el);
          return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }
      }, {
        key: "innerWidth",
        value: function innerWidth(el) {
          var width = el.offsetWidth;
          var style = getComputedStyle(el);
          width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
          return width;
        }
      }, {
        key: "width",
        value: function width(el) {
          var width = el.offsetWidth;
          var style = getComputedStyle(el);
          width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
          return width;
        }
      }, {
        key: "getInnerHeight",
        value: function getInnerHeight(el) {
          var height = el.offsetHeight;
          var style = getComputedStyle(el);
          height += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
          return height;
        }
      }, {
        key: "getOuterHeight",
        value: function getOuterHeight(el, margin) {
          var height = el.offsetHeight;

          if (margin) {
            var style = getComputedStyle(el);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
          }

          return height;
        }
      }, {
        key: "getHeight",
        value: function getHeight(el) {
          var height = el.offsetHeight;
          var style = getComputedStyle(el);
          height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
          return height;
        }
      }, {
        key: "getWidth",
        value: function getWidth(el) {
          var width = el.offsetWidth;
          var style = getComputedStyle(el);
          width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
          return width;
        }
      }, {
        key: "getViewport",
        value: function getViewport() {
          var win = window,
              d = document,
              e = d.documentElement,
              g = d.getElementsByTagName('body')[0],
              w = win.innerWidth || e.clientWidth || g.clientWidth,
              h = win.innerHeight || e.clientHeight || g.clientHeight;
          return {
            width: w,
            height: h
          };
        }
      }, {
        key: "getOffset",
        value: function getOffset(el) {
          var rect = el.getBoundingClientRect();
          return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
          };
        }
      }, {
        key: "replaceElementWith",
        value: function replaceElementWith(element, replacementElement) {
          var parentNode = element.parentNode;
          if (!parentNode) throw "Can't replace element";
          return parentNode.replaceChild(replacementElement, element);
        }
      }, {
        key: "getUserAgent",
        value: function getUserAgent() {
          return navigator.userAgent;
        }
      }, {
        key: "isIE",
        value: function isIE() {
          var ua = window.navigator.userAgent;
          var msie = ua.indexOf('MSIE ');

          if (msie > 0) {
            // IE 10 or older => return version number
            return true;
          }

          var trident = ua.indexOf('Trident/');

          if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return true;
          }

          var edge = ua.indexOf('Edge/');

          if (edge > 0) {
            // Edge (IE 12+) => return version number
            return true;
          } // other browser


          return false;
        }
      }, {
        key: "isIOS",
        value: function isIOS() {
          return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
        }
      }, {
        key: "isAndroid",
        value: function isAndroid() {
          return /(android)/i.test(navigator.userAgent);
        }
      }, {
        key: "appendChild",
        value: function appendChild(element, target) {
          if (this.isElement(target)) target.appendChild(element);else if (target.el && target.el.nativeElement) target.el.nativeElement.appendChild(element);else throw 'Cannot append ' + target + ' to ' + element;
        }
      }, {
        key: "removeChild",
        value: function removeChild(element, target) {
          if (this.isElement(target)) target.removeChild(element);else if (target.el && target.el.nativeElement) target.el.nativeElement.removeChild(element);else throw 'Cannot remove ' + element + ' from ' + target;
        }
      }, {
        key: "isElement",
        value: function isElement(obj) {
          return typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
        }
      }, {
        key: "calculateScrollbarWidth",
        value: function calculateScrollbarWidth(el) {
          if (el) {
            var style = getComputedStyle(el);
            return el.offsetWidth - el.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
          } else {
            if (this.calculatedScrollbarWidth !== null) return this.calculatedScrollbarWidth;
            var scrollDiv = document.createElement("div");
            scrollDiv.className = "ui-scrollbar-measure";
            document.body.appendChild(scrollDiv);
            var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
            this.calculatedScrollbarWidth = scrollbarWidth;
            return scrollbarWidth;
          }
        }
      }, {
        key: "calculateScrollbarHeight",
        value: function calculateScrollbarHeight() {
          if (this.calculatedScrollbarHeight !== null) return this.calculatedScrollbarHeight;
          var scrollDiv = document.createElement("div");
          scrollDiv.className = "ui-scrollbar-measure";
          document.body.appendChild(scrollDiv);
          var scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
          document.body.removeChild(scrollDiv);
          this.calculatedScrollbarWidth = scrollbarHeight;
          return scrollbarHeight;
        }
      }, {
        key: "invokeElementMethod",
        value: function invokeElementMethod(element, methodName, args) {
          element[methodName].apply(element, args);
        }
      }, {
        key: "clearSelection",
        value: function clearSelection() {
          if (window.getSelection) {
            if (window.getSelection().empty) {
              window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
              window.getSelection().removeAllRanges();
            }
          } else if (document['selection'] && document['selection'].empty) {
            try {
              document['selection'].empty();
            } catch (error) {//ignore IE bug
            }
          }
        }
      }, {
        key: "getBrowser",
        value: function getBrowser() {
          if (!this.browser) {
            var matched = this.resolveUserAgent();
            this.browser = {};

            if (matched.browser) {
              this.browser[matched.browser] = true;
              this.browser['version'] = matched.version;
            }

            if (this.browser['chrome']) {
              this.browser['webkit'] = true;
            } else if (this.browser['webkit']) {
              this.browser['safari'] = true;
            }
          }

          return this.browser;
        }
      }, {
        key: "resolveUserAgent",
        value: function resolveUserAgent() {
          var ua = navigator.userAgent.toLowerCase();
          var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
          return {
            browser: match[1] || "",
            version: match[2] || "0"
          };
        }
      }, {
        key: "isInteger",
        value: function isInteger(value) {
          if (Number.isInteger) {
            return Number.isInteger(value);
          } else {
            return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
          }
        }
      }, {
        key: "isHidden",
        value: function isHidden(element) {
          return element.offsetParent === null;
        }
      }, {
        key: "getFocusableElements",
        value: function getFocusableElements(element) {
          var focusableElements = DomHandler.find(element, "button:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), \n                [href][clientHeight][clientWidth]:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), \n                input:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), select:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), \n                textarea:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), [tabIndex]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), \n                [contenteditable]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])");
          var visibleFocusableElements = [];

          var _iterator = _createForOfIteratorHelper(focusableElements),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var focusableElement = _step.value;
              if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden") visibleFocusableElements.push(focusableElement);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          return visibleFocusableElements;
        }
      }]);

      return DomHandler;
    }();

    DomHandler.zindex = 1000;
    DomHandler.calculatedScrollbarWidth = null;
    DomHandler.calculatedScrollbarHeight = null;
    /**
     * Generated bundle index. Do not edit.
     */
    //# sourceMappingURL=primeng-dom.js.map

    /***/
  },

  /***/
  "./node_modules/primeng/fesm2015/primeng-message.js":
  /*!**********************************************************!*\
    !*** ./node_modules/primeng/fesm2015/primeng-message.js ***!
    \**********************************************************/

  /*! exports provided: MessageModule, UIMessage */

  /***/
  function node_modulesPrimengFesm2015PrimengMessageJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MessageModule", function () {
      return MessageModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UIMessage", function () {
      return UIMessage;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
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

    var UIMessage =
    /*#__PURE__*/
    function () {
      function UIMessage() {
        _classCallCheck(this, UIMessage);

        this.escape = true;
      }

      _createClass(UIMessage, [{
        key: "icon",
        get: function get() {
          var icon = null;

          if (this.severity) {
            switch (this.severity) {
              case 'success':
                icon = 'pi pi-check';
                break;

              case 'info':
                icon = 'pi pi-info-circle';
                break;

              case 'error':
                icon = 'pi pi-times';
                break;

              case 'warn':
                icon = 'pi pi-exclamation-triangle';
                break;

              default:
                icon = 'pi pi-info-circle';
                break;
            }
          }

          return icon;
        }
      }]);

      return UIMessage;
    }();

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], UIMessage.prototype, "severity", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], UIMessage.prototype, "text", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], UIMessage.prototype, "escape", void 0);

    UIMessage = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'p-message',
      template: "\n        <div aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all\" *ngIf=\"severity\"\n        [ngClass]=\"{'ui-message-info': (severity === 'info'),\n                'ui-message-warn': (severity === 'warn'),\n                'ui-message-error': (severity === 'error'),\n                'ui-message-success': (severity === 'success')}\">\n            <span class=\"ui-message-icon\" [ngClass]=\"icon\"></span>\n            <div *ngIf=\"!escape; else escapeOut\">\n                <span *ngIf=\"!escape\" class=\"ui-message-text\" [innerHTML]=\"text\"></span>\n            </div>\n            <ng-template #escapeOut>\n                <span *ngIf=\"escape\" class=\"ui-message-text\">{{text}}</span>\n            </ng-template>\n        </div>\n    ",
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].Default
    })], UIMessage);

    var MessageModule = function MessageModule() {
      _classCallCheck(this, MessageModule);
    };

    MessageModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
      exports: [UIMessage],
      declarations: [UIMessage]
    })], MessageModule);
    /**
     * Generated bundle index. Do not edit.
     */
    //# sourceMappingURL=primeng-message.js.map

    /***/
  },

  /***/
  "./node_modules/primeng/fesm2015/primeng-messages.js":
  /*!***********************************************************!*\
    !*** ./node_modules/primeng/fesm2015/primeng-messages.js ***!
    \***********************************************************/

  /*! exports provided: Messages, MessagesModule */

  /***/
  function node_modulesPrimengFesm2015PrimengMessagesJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Messages", function () {
      return Messages;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MessagesModule", function () {
      return MessagesModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/animations */
    "./node_modules/@angular/animations/fesm2015/animations.js");
    /* harmony import */


    var primeng_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! primeng/api */
    "./node_modules/primeng/fesm2015/primeng-api.js");

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

    var Messages =
    /*#__PURE__*/
    function () {
      function Messages(messageService, el) {
        _classCallCheck(this, Messages);

        this.messageService = messageService;
        this.el = el;
        this.closable = true;
        this.enableService = true;
        this.escape = true;
        this.showTransitionOptions = '300ms ease-out';
        this.hideTransitionOptions = '250ms ease-in';
        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
      }

      _createClass(Messages, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this = this;

          if (this.messageService && this.enableService) {
            this.messageSubscription = this.messageService.messageObserver.subscribe(function (messages) {
              if (messages) {
                if (messages instanceof Array) {
                  var filteredMessages = messages.filter(function (m) {
                    return _this.key === m.key;
                  });
                  _this.value = _this.value ? [].concat(_toConsumableArray(_this.value), _toConsumableArray(filteredMessages)) : _toConsumableArray(filteredMessages);
                } else if (_this.key === messages.key) {
                  _this.value = _this.value ? [].concat(_toConsumableArray(_this.value), [messages]) : [messages];
                }
              }
            });
            this.clearSubscription = this.messageService.clearObserver.subscribe(function (key) {
              if (key) {
                if (_this.key === key) {
                  _this.value = null;
                }
              } else {
                _this.value = null;
              }
            });
          }
        }
      }, {
        key: "hasMessages",
        value: function hasMessages() {
          var parentEl = this.el.nativeElement.parentElement;

          if (parentEl && parentEl.offsetParent) {
            return this.value && this.value.length > 0;
          }

          return false;
        }
      }, {
        key: "getSeverityClass",
        value: function getSeverityClass() {
          var msg = this.value[0];

          if (msg) {
            var severities = ['info', 'warn', 'error', 'success'];
            var severity = severities.find(function (item) {
              return item === msg.severity;
            });
            return severity && "ui-messages-".concat(severity);
          }

          return null;
        }
      }, {
        key: "clear",
        value: function clear(event) {
          this.value = [];
          this.valueChange.emit(this.value);
          event.preventDefault();
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
          }

          if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
          }
        }
      }, {
        key: "icon",
        get: function get() {
          var icon = null;

          if (this.hasMessages()) {
            var msg = this.value[0];

            switch (msg.severity) {
              case 'success':
                icon = 'pi-check';
                break;

              case 'info':
                icon = 'pi-info-circle';
                break;

              case 'error':
                icon = 'pi-times';
                break;

              case 'warn':
                icon = 'pi-exclamation-triangle';
                break;

              default:
                icon = 'pi-info-circle';
                break;
            }
          }

          return icon;
        }
      }]);

      return Messages;
    }();

    Messages.ctorParameters = function () {
      return [{
        type: primeng_api__WEBPACK_IMPORTED_MODULE_3__["MessageService"],
        decorators: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
        }]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
      }];
    };

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Messages.prototype, "value", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Messages.prototype, "closable", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Messages.prototype, "style", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Messages.prototype, "styleClass", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Messages.prototype, "enableService", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Messages.prototype, "key", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Messages.prototype, "escape", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Messages.prototype, "showTransitionOptions", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Messages.prototype, "hideTransitionOptions", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])()], Messages.prototype, "valueChange", void 0);

    Messages = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'p-messages',
      template: "\n        <div *ngIf=\"hasMessages()\" class=\"ui-messages ui-widget ui-corner-all\"\n                    [ngClass]=\"getSeverityClass()\" role=\"alert\" [ngStyle]=\"style\" [class]=\"styleClass\"\n                    [@messageAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\">\n            <a tabindex=\"0\" class=\"ui-messages-close\" (click)=\"clear($event)\" (keydown.enter)=\"clear($event)\" *ngIf=\"closable\">\n                <i class=\"pi pi-times\"></i>\n            </a>\n            <span class=\"ui-messages-icon pi\" [ngClass]=\"icon\"></span>\n            <ul>\n                <li *ngFor=\"let msg of value\">\n                    <div *ngIf=\"!escape; else escapeOut\">\n                        <span *ngIf=\"msg.summary\" class=\"ui-messages-summary\" [innerHTML]=\"msg.summary\"></span>\n                        <span *ngIf=\"msg.detail\" class=\"ui-messages-detail\" [innerHTML]=\"msg.detail\"></span>\n                    </div>\n                    <ng-template #escapeOut>\n                        <span *ngIf=\"msg.summary\" class=\"ui-messages-summary\">{{msg.summary}}</span>\n                        <span *ngIf=\"msg.detail\" class=\"ui-messages-detail\">{{msg.detail}}</span>\n                    </ng-template>\n                </li>\n            </ul>\n        </div>\n    ",
      animations: [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('messageAnimation', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('visible', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
        transform: 'translateY(0)',
        opacity: 1
      })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
        transform: 'translateY(-25%)',
        opacity: 0
      }), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('{{showTransitionParams}}')]), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('{{hideTransitionParams}}', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
        opacity: 0,
        transform: 'translateY(-25%)'
      }))])])],
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].Default
    }), __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"])())], Messages);

    var MessagesModule = function MessagesModule() {
      _classCallCheck(this, MessagesModule);
    };

    MessagesModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
      exports: [Messages],
      declarations: [Messages]
    })], MessagesModule);
    /**
     * Generated bundle index. Do not edit.
     */
    //# sourceMappingURL=primeng-messages.js.map

    /***/
  },

  /***/
  "./node_modules/primeng/fesm2015/primeng-toast.js":
  /*!********************************************************!*\
    !*** ./node_modules/primeng/fesm2015/primeng-toast.js ***!
    \********************************************************/

  /*! exports provided: Toast, ToastItem, ToastModule */

  /***/
  function node_modulesPrimengFesm2015PrimengToastJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Toast", function () {
      return Toast;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ToastItem", function () {
      return ToastItem;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ToastModule", function () {
      return ToastModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var primeng_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! primeng/dom */
    "./node_modules/primeng/fesm2015/primeng-dom.js");
    /* harmony import */


    var primeng_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! primeng/api */
    "./node_modules/primeng/fesm2015/primeng-api.js");
    /* harmony import */


    var _angular_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/animations */
    "./node_modules/@angular/animations/fesm2015/animations.js");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var ToastItem =
    /*#__PURE__*/
    function () {
      function ToastItem() {
        _classCallCheck(this, ToastItem);

        this.onClose = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
      }

      _createClass(ToastItem, [{
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
          this.initTimeout();
        }
      }, {
        key: "initTimeout",
        value: function initTimeout() {
          var _this2 = this;

          if (!this.message.sticky) {
            this.timeout = setTimeout(function () {
              _this2.onClose.emit({
                index: _this2.index,
                message: _this2.message
              });
            }, this.message.life || 3000);
          }
        }
      }, {
        key: "clearTimeout",
        value: function (_clearTimeout) {
          function clearTimeout() {
            return _clearTimeout.apply(this, arguments);
          }

          clearTimeout.toString = function () {
            return _clearTimeout.toString();
          };

          return clearTimeout;
        }(function () {
          if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
          }
        })
      }, {
        key: "onMouseEnter",
        value: function onMouseEnter() {
          this.clearTimeout();
        }
      }, {
        key: "onMouseLeave",
        value: function onMouseLeave() {
          this.initTimeout();
        }
      }, {
        key: "onCloseIconClick",
        value: function onCloseIconClick(event) {
          this.clearTimeout();
          this.onClose.emit({
            index: this.index,
            message: this.message
          });
          event.preventDefault();
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.clearTimeout();
        }
      }]);

      return ToastItem;
    }();

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], ToastItem.prototype, "message", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], ToastItem.prototype, "index", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], ToastItem.prototype, "template", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], ToastItem.prototype, "showTransformOptions", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], ToastItem.prototype, "hideTransformOptions", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], ToastItem.prototype, "showTransitionOptions", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], ToastItem.prototype, "hideTransitionOptions", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])()], ToastItem.prototype, "onClose", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('container')], ToastItem.prototype, "containerViewChild", void 0);

    ToastItem = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'p-toastItem',
      template: "\n        <div #container [attr.id]=\"message.id\" class=\"ui-toast-message ui-shadow\" [@messageState]=\"{value: 'visible', params: {showTransformParams: showTransformOptions, hideTransformParams: hideTransformOptions, showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\"\n            [ngClass]=\"{'ui-toast-message-info': message.severity == 'info','ui-toast-message-warn': message.severity == 'warn',\n                'ui-toast-message-error': message.severity == 'error','ui-toast-message-success': message.severity == 'success'}\"\n                (mouseenter)=\"onMouseEnter()\" (mouseleave)=\"onMouseLeave()\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">\n            <div class=\"ui-toast-message-content\">\n                <a tabindex=\"0\" class=\"ui-toast-close-icon pi pi-times\" (click)=\"onCloseIconClick($event)\" (keydown.enter)=\"onCloseIconClick($event)\" *ngIf=\"message.closable !== false\"></a>\n                <ng-container *ngIf=\"!template\">\n                    <span class=\"ui-toast-icon pi\"\n                        [ngClass]=\"{'pi-info-circle': message.severity == 'info', 'pi-exclamation-triangle': message.severity == 'warn',\n                            'pi-times-circle': message.severity == 'error', 'pi-check' :message.severity == 'success'}\"></span>\n                    <div class=\"ui-toast-message-text-content\">\n                        <div class=\"ui-toast-summary\">{{message.summary}}</div>\n                        <div class=\"ui-toast-detail\">{{message.detail}}</div>\n                    </div>\n                </ng-container>\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: message}\"></ng-container>\n            </div>\n        </div>\n    ",
      animations: [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["trigger"])('messageState', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["state"])('visible', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({
        transform: 'translateY(0)',
        opacity: 1
      })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["transition"])('void => *', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({
        transform: '{{showTransformParams}}',
        opacity: 0
      }), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["animate"])('{{showTransitionParams}}')]), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["transition"])('* => void', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["animate"])('{{hideTransitionParams}}', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({
        height: 0,
        opacity: 0,
        transform: '{{hideTransformParams}}'
      }))])])]
    })], ToastItem);

    var Toast =
    /*#__PURE__*/
    function () {
      function Toast(messageService) {
        _classCallCheck(this, Toast);

        this.messageService = messageService;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.position = 'top-right';
        this.preventOpenDuplicates = false;
        this.preventDuplicates = false;
        this.showTransformOptions = 'translateY(100%)';
        this.hideTransformOptions = 'translateY(-100%)';
        this.showTransitionOptions = '300ms ease-out';
        this.hideTransitionOptions = '250ms ease-in';
        this.onClose = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
      }

      _createClass(Toast, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this3 = this;

          this.messageSubscription = this.messageService.messageObserver.subscribe(function (messages) {
            if (messages) {
              if (messages instanceof Array) {
                var filteredMessages = messages.filter(function (m) {
                  return _this3.canAdd(m);
                });

                _this3.add(filteredMessages);
              } else if (_this3.canAdd(messages)) {
                _this3.add([messages]);
              }

              if (_this3.modal && _this3.messages && _this3.messages.length) {
                _this3.enableModality();
              }
            }
          });
          this.clearSubscription = this.messageService.clearObserver.subscribe(function (key) {
            if (key) {
              if (_this3.key === key) {
                _this3.messages = null;
              }
            } else {
              _this3.messages = null;
            }

            if (_this3.modal) {
              _this3.disableModality();
            }
          });
        }
      }, {
        key: "add",
        value: function add(messages) {
          this.messages = this.messages ? [].concat(_toConsumableArray(this.messages), _toConsumableArray(messages)) : _toConsumableArray(messages);

          if (this.preventDuplicates) {
            this.messagesArchieve = this.messagesArchieve ? [].concat(_toConsumableArray(this.messagesArchieve), _toConsumableArray(messages)) : _toConsumableArray(messages);
          }
        }
      }, {
        key: "canAdd",
        value: function canAdd(message) {
          var allow = this.key === message.key;

          if (allow && this.preventOpenDuplicates) {
            allow = !this.containsMessage(this.messages, message);
          }

          if (allow && this.preventDuplicates) {
            allow = !this.containsMessage(this.messagesArchieve, message);
          }

          return allow;
        }
      }, {
        key: "containsMessage",
        value: function containsMessage(collection, message) {
          if (!collection) {
            return false;
          }

          return collection.find(function (m) {
            return m.summary === message.summary && m.detail && message.detail && m.severity === message.severity;
          }) != null;
        }
      }, {
        key: "ngAfterContentInit",
        value: function ngAfterContentInit() {
          var _this4 = this;

          this.templates.forEach(function (item) {
            switch (item.getType()) {
              case 'message':
                _this4.template = item.template;
                break;

              default:
                _this4.template = item.template;
                break;
            }
          });
        }
      }, {
        key: "onMessageClose",
        value: function onMessageClose(event) {
          this.messages.splice(event.index, 1);

          if (this.messages.length === 0) {
            this.disableModality();
          }

          this.onClose.emit({
            message: event.message
          });
        }
      }, {
        key: "enableModality",
        value: function enableModality() {
          if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1);
            var maskStyleClass = 'ui-widget-overlay ui-dialog-mask';
            primeng_dom__WEBPACK_IMPORTED_MODULE_2__["DomHandler"].addMultipleClasses(this.mask, maskStyleClass);
            document.body.appendChild(this.mask);
          }
        }
      }, {
        key: "disableModality",
        value: function disableModality() {
          if (this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
          }
        }
      }, {
        key: "onAnimationStart",
        value: function onAnimationStart(event) {
          if (event.fromState === 'void' && this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + ++primeng_dom__WEBPACK_IMPORTED_MODULE_2__["DomHandler"].zindex);
          }
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
          }

          if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
          }

          this.disableModality();
        }
      }]);

      return Toast;
    }();

    Toast.ctorParameters = function () {
      return [{
        type: primeng_api__WEBPACK_IMPORTED_MODULE_3__["MessageService"]
      }];
    };

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Toast.prototype, "key", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Toast.prototype, "autoZIndex", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Toast.prototype, "baseZIndex", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Toast.prototype, "style", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Toast.prototype, "styleClass", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Toast.prototype, "position", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Toast.prototype, "modal", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Toast.prototype, "preventOpenDuplicates", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Toast.prototype, "preventDuplicates", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Toast.prototype, "showTransformOptions", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Toast.prototype, "hideTransformOptions", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Toast.prototype, "showTransitionOptions", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], Toast.prototype, "hideTransitionOptions", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])()], Toast.prototype, "onClose", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('container')], Toast.prototype, "containerViewChild", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"])(primeng_api__WEBPACK_IMPORTED_MODULE_3__["PrimeTemplate"])], Toast.prototype, "templates", void 0);

    Toast = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'p-toast',
      template: "\n        <div #container [ngClass]=\"{'ui-toast ui-widget': true, \n                'ui-toast-top-right': position === 'top-right',\n                'ui-toast-top-left': position === 'top-left',\n                'ui-toast-bottom-right': position === 'bottom-right',\n                'ui-toast-bottom-left': position === 'bottom-left',\n                'ui-toast-top-center': position === 'top-center',\n                'ui-toast-bottom-center': position === 'bottom-center',\n                'ui-toast-center': position === 'center'}\" \n                [ngStyle]=\"style\" [class]=\"styleClass\">\n            <p-toastItem *ngFor=\"let msg of messages; let i=index\" [message]=\"msg\" [index]=\"i\" (onClose)=\"onMessageClose($event)\"\n                    [template]=\"template\" @toastAnimation (@toastAnimation.start)=\"onAnimationStart($event)\" \n                    [showTransformOptions]=\"showTransformOptions\" [hideTransformOptions]=\"hideTransformOptions\" \n                    [showTransitionOptions]=\"showTransitionOptions\" [hideTransitionOptions]=\"hideTransitionOptions\"></p-toastItem>\n        </div>\n    ",
      animations: [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["trigger"])('toastAnimation', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["transition"])(':enter, :leave', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["query"])('@*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["animateChild"])())])])],
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].Default
    })], Toast);

    var ToastModule = function ToastModule() {
      _classCallCheck(this, ToastModule);
    };

    ToastModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
      exports: [Toast, primeng_api__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]],
      declarations: [Toast, ToastItem]
    })], ToastModule);
    /**
     * Generated bundle index. Do not edit.
     */
    //# sourceMappingURL=primeng-toast.js.map

    /***/
  }
}]);
//# sourceMappingURL=default~pages-forgot-forgot-module-ngfactory~pages-layout-layout-module-ngfactory~pages-login-login-~1d59073f-es5.js.map