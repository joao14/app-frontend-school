function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~crm-clientes-clientes-module-ngfactory~crm-clientes-edit-edit-module-ngfactory~crm-delivery-~d498558d"], {
  /***/
  "./src/services/apis.service.ts":
  /*!**************************************!*\
    !*** ./src/services/apis.service.ts ***!
    \**************************************/

  /*! exports provided: AuthInfo, ApisService */

  /***/
  function srcServicesApisServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthInfo", function () {
      return AuthInfo;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ApisService", function () {
      return ApisService;
    });
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var AuthInfo =
    /*#__PURE__*/
    function () {
      function AuthInfo($uid) {
        _classCallCheck(this, AuthInfo);

        this.$uid = $uid;
      }

      _createClass(AuthInfo, [{
        key: "isLoggedIn",
        value: function isLoggedIn() {
          return !!this.$uid;
        }
      }]);

      return AuthInfo;
    }();

    var ApisService =
    /*#__PURE__*/
    function () {
      function ApisService(http) {
        _classCallCheck(this, ApisService);

        this.http = http;
        this.authInfo$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](ApisService.UNKNOWN_USER);
        /** Http Options */

        this.httpOptions = {
          headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            "Content-Type": "application/json"
          })
        };
      }
      /** Captura de errores */


      _createClass(ApisService, [{
        key: "handleError",
        value: function handleError(error) {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error("An error occurred:", error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code ".concat(error.status, ", ") + "body was: ".concat(error.error));
          } // return an observable with a user-facing error message


          return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["throwError"])("Something bad happened; please try again later.");
        }
      }, {
        key: "login",
        value: function login(email, password) {
          var credential = {
            user: email,
            pass: password
          };
          console.log(credential);
          return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].login, JSON.stringify(credential), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["retry"])(2), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError)).toPromise();
        }
      }, {
        key: "getclients",
        value: function getclients(token) {
          var _this = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].client, opt).toPromise().then(function (users) {
              resolve(users);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "addclient",
        value: function addclient(client, token) {
          var _this2 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this2.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].addclient, client, opt).toPromise().then(function (users) {
              resolve(users);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "updateclient",
        value: function updateclient(client, token) {
          var _this3 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this3.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].updateclient, client, opt).toPromise().then(function (users) {
              resolve(users);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "getflowers",
        value: function getflowers(token) {
          var _this4 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this4.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].flowers, opt).toPromise().then(function (flowers) {
              resolve(flowers);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "addflowers",
        value: function addflowers(flower, token) {
          var _this5 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this5.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].addflowers, flower, opt).toPromise().then(function (flower) {
              resolve(flower);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "updateflower",
        value: function updateflower(flower, token) {
          var _this6 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this6.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].updateflowers, flower, opt).toPromise().then(function (flower) {
              resolve(flower);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "getfinca",
        value: function getfinca(token) {
          var _this7 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this7.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].finca, opt).toPromise().then(function (finca) {
              resolve(finca);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "addfinca",
        value: function addfinca(finca, token) {
          var _this8 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this8.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].addfinca, finca, opt).toPromise().then(function (finca) {
              resolve(finca);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "updatefinca",
        value: function updatefinca(finca, token) {
          var _this9 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this9.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].updatefinca, finca, opt).toPromise().then(function (finca) {
              resolve(finca);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "getdeliveries",
        value: function getdeliveries(token) {
          var _this10 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this10.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].empresaCargo, opt).toPromise().then(function (delivery) {
              resolve(delivery);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "adddelivery",
        value: function adddelivery(delivery, token) {
          var _this11 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this11.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].addempresaCargo, delivery, opt).toPromise().then(function (delivery) {
              resolve(delivery);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "updatedelivery",
        value: function updatedelivery(delivery, token) {
          var _this12 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this12.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].updateempresaCargo, delivery, opt).toPromise().then(function (delivery) {
              resolve(delivery);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "getmarks",
        value: function getmarks(idCliente, token) {
          var _this13 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this13.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].marcaciones + idCliente, opt).toPromise().then(function (mark) {
              resolve(mark);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "addmark",
        value: function addmark(mark, token) {
          var _this14 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this14.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].addmarcaciones, mark, opt).toPromise().then(function (mark) {
              resolve(mark);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "updatemark",
        value: function updatemark(mark, token) {
          var _this15 = this;

          var opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          return new Promise(function (resolve, reject) {
            _this15.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].updatemarcaciones, mark, opt).toPromise().then(function (mark) {
              resolve(mark);
            }).catch(function (error) {
              reject(error);
            });
          });
        }
      }, {
        key: "httpPost",
        value: function httpPost(url, body) {
          var header = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]().set("Content-Type", "application/x-www-form-urlencoded") //.set("Authorization", `Bearer ${environment.stripe.sk}`),

          };
          var order = this.JSON_to_URLEncoded(body);
          console.log(order);
          return this.http.post(url, order, header);
        }
      }, {
        key: "httpGet",
        value: function httpGet(url) {
          var header = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]().set("Content-Type", "application/x-www-form-urlencoded") //.set("Authorization", `Bearer ${environment.stripe.sk}`),

          };
          return this.http.get(url, header);
        }
      }, {
        key: "JSON_to_URLEncoded",
        value: function JSON_to_URLEncoded(element, key, list) {
          var new_list = list || [];

          if (typeof element == "object") {
            for (var idx in element) {
              this.JSON_to_URLEncoded(element[idx], key ? key + "[" + idx + "]" : idx, new_list);
            }
          } else {
            new_list.push(key + "=" + encodeURIComponent(element));
          }

          return new_list.join("&");
        }
      }]);

      return ApisService;
    }();

    ApisService.UNKNOWN_USER = new AuthInfo(null);
    ApisService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      factory: function ApisService_Factory() {
        return new ApisService(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]));
      },
      token: ApisService,
      providedIn: "root"
    });
    /***/
  }
}]);
//# sourceMappingURL=default~crm-clientes-clientes-module-ngfactory~crm-clientes-edit-edit-module-ngfactory~crm-delivery-~d498558d-es5.js.map