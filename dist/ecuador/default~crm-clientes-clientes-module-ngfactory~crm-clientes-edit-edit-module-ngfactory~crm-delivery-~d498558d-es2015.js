(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~crm-clientes-clientes-module-ngfactory~crm-clientes-edit-edit-module-ngfactory~crm-delivery-~d498558d"],{

/***/ "./src/services/apis.service.ts":
/*!**************************************!*\
  !*** ./src/services/apis.service.ts ***!
  \**************************************/
/*! exports provided: AuthInfo, ApisService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInfo", function() { return AuthInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApisService", function() { return ApisService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");






class AuthInfo {
    constructor($uid) {
        this.$uid = $uid;
    }
    isLoggedIn() {
        return !!this.$uid;
    }
}
class ApisService {
    constructor(http) {
        this.http = http;
        this.authInfo$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](ApisService.UNKNOWN_USER);
        /** Http Options */
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                "Content-Type": "application/json",
            }),
        };
    }
    /** Captura de errores */
    handleError(error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error("An error occurred:", error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["throwError"])("Something bad happened; please try again later.");
    }
    login(email, password) {
        let credential = {
            user: email,
            pass: password,
        };
        console.log(credential);
        return this.http
            .post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].login, JSON.stringify(credential), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["retry"])(2), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError)).toPromise();
    }
    getclients(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].client, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addclient(client, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].addclient, client, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updateclient(client, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].updateclient, client, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getflowers(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].flowers, opt).toPromise().then(flowers => {
                resolve(flowers);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addflowers(flower, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].addflowers, flower, opt).toPromise().then(flower => {
                resolve(flower);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updateflower(flower, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].updateflowers, flower, opt).toPromise().then(flower => {
                resolve(flower);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getfinca(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].finca, opt).toPromise().then(finca => {
                resolve(finca);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addfinca(finca, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].addfinca, finca, opt).toPromise().then(finca => {
                resolve(finca);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updatefinca(finca, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].updatefinca, finca, opt).toPromise().then(finca => {
                resolve(finca);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getdeliveries(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].empresaCargo, opt).toPromise().then(delivery => {
                resolve(delivery);
            }).catch(error => {
                reject(error);
            });
        });
    }
    adddelivery(delivery, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].addempresaCargo, delivery, opt).toPromise().then(delivery => {
                resolve(delivery);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updatedelivery(delivery, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].updateempresaCargo, delivery, opt).toPromise().then(delivery => {
                resolve(delivery);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getmarks(idCliente, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].marcaciones + idCliente, opt).toPromise().then(mark => {
                resolve(mark);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addmark(mark, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].addmarcaciones, mark, opt).toPromise().then(mark => {
                resolve(mark);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updatemark(mark, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].updatemarcaciones, mark, opt).toPromise().then(mark => {
                resolve(mark);
            }).catch(error => {
                reject(error);
            });
        });
    }
    httpPost(url, body) {
        const header = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]()
                .set("Content-Type", "application/x-www-form-urlencoded")
            //.set("Authorization", `Bearer ${environment.stripe.sk}`),
        };
        const order = this.JSON_to_URLEncoded(body);
        console.log(order);
        return this.http.post(url, order, header);
    }
    httpGet(url) {
        const header = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]()
                .set("Content-Type", "application/x-www-form-urlencoded")
            //.set("Authorization", `Bearer ${environment.stripe.sk}`),
        };
        return this.http.get(url, header);
    }
    JSON_to_URLEncoded(element, key, list) {
        let new_list = list || [];
        if (typeof element == "object") {
            for (let idx in element) {
                this.JSON_to_URLEncoded(element[idx], key ? key + "[" + idx + "]" : idx, new_list);
            }
        }
        else {
            new_list.push(key + "=" + encodeURIComponent(element));
        }
        return new_list.join("&");
    }
}
ApisService.UNKNOWN_USER = new AuthInfo(null);
ApisService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ factory: function ApisService_Factory() { return new ApisService(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"])); }, token: ApisService, providedIn: "root" });


/***/ })

}]);
//# sourceMappingURL=default~crm-clientes-clientes-module-ngfactory~crm-clientes-edit-edit-module-ngfactory~crm-delivery-~d498558d-es2015.js.map