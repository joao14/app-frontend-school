(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~crm-clientes-clientes-module-ngfactory~crm-clientes-edit-edit-module-ngfactory~crm-delivery-~e453b710"],{

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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");







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
        this.authInfo$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](ApisService.UNKNOWN_USER);
        /** Http Options */
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])("Something bad happened; please try again later.");
    }
    login(email, password) {
        let credential = {
            user: email,
            pass: password,
        };
        ;
        return this.http
            .post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].login, JSON.stringify(credential), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retry"])(2), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.handleError)).toPromise();
    }
    resetpassword(email, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].resetpassword + email, opt).toPromise().then(email => {
                resolve(email);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getUsers(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].users, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addUser(user, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].adduser, user, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updateUser(user, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].updateuser, user, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getRoles(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].roles, opt).toPromise().then(roles => {
                resolve(roles);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addRolesByUser(rol, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].rolesbyuser, rol, opt).toPromise().then(roles => {
                resolve(roles);
            }).catch(error => {
                reject(error);
            });
        });
    }
    removeRolesByUser(rol, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].removeroles, rol, opt).toPromise().then(roles => {
                resolve(roles);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getclients(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].client, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addclient(client, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].addclient, client, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updateclient(client, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].updateclient, client, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getflowers(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].flowers, opt).toPromise().then(flowers => {
                resolve(flowers);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addflowers(flower, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].addflowers, flower, opt).toPromise().then(flower => {
                resolve(flower);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updateflower(flower, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].updateflowers, flower, opt).toPromise().then(flower => {
                resolve(flower);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getflowerbyname(name_, token) {
        let json = {
            name: name_
        };
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].searchflower, json, opt).toPromise().then(flowers => {
                resolve(flowers);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addResourcesflowers(flower, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].addresourcesflower, flower, opt).toPromise().then(flower => {
                resolve(flower);
            }).catch(error => {
                reject(error);
            });
        });
    }
    removeResourcesflowers(idResource, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].removeresourcesflower + idResource, null, opt).toPromise().then(flower => {
                resolve(flower);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getfinca(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].finca, opt).toPromise().then(finca => {
                resolve(finca);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addfinca(finca, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].addfinca, finca, opt).toPromise().then(finca => {
                resolve(finca);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updatefinca(finca, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].updatefinca, finca, opt).toPromise().then(finca => {
                resolve(finca);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getdeliveries(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].empresaCargo, opt).toPromise().then(delivery => {
                resolve(delivery);
            }).catch(error => {
                reject(error);
            });
        });
    }
    adddelivery(delivery, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].addempresaCargo, delivery, opt).toPromise().then(delivery => {
                resolve(delivery);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updatedelivery(delivery, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].updateempresaCargo, delivery, opt).toPromise().then(delivery => {
                resolve(delivery);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getmarks(idCliente, token) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let opt = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                })
            };
            return new Promise((resolve, reject) => {
                this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].marcaciones + idCliente, opt).toPromise().then(mark => {
                    resolve(mark);
                }).catch(error => {
                    reject(error);
                });
            });
        });
    }
    addmark(mark, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].addmarcaciones, mark, opt).toPromise().then(mark => {
                resolve(mark);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updatemark(mark, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].updatemarcaciones, mark, opt).toPromise().then(mark => {
                resolve(mark);
            }).catch(error => {
                reject(error);
            });
        });
    }
    registerInvoice(invoice, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].registerinvoice, invoice, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            });
        });
    }
    registerInvoiceDraft(invoice, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].registerinvoicedraft, invoice, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            });
        });
    }
    registerPaymentClaim(payment, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].registerpaymentandclaim, payment, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            });
        });
    }
    registerPrealert(prealert, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].registerprealert, prealert, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getObjectbyNameComplete(type, name, token) {
        let json = {
            name: name
        };
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].searchtypeComplete + type, json, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getObjectbyName(type, name, token) {
        let json = {
            name: name
        };
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].searchtype + type, json, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getsales(dateIni, dateFin, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].getsales + dateIni + '/' + dateFin, opt).toPromise().then(sales => {
                resolve(sales);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getInvoicesbyClient(idClient, dateIni, dateFin, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].getinvoicesbyclient + idClient + '/' + dateIni + '/' + dateFin, opt).toPromise().then(sales => {
                resolve(sales);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getBalanceGeneralbyClient(idClient, dateIni, dateFin, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].getbalancegenral + idClient + '/' + dateIni + '/' + dateFin, opt).toPromise().then(sales => {
                resolve(sales);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getMarcbyName(idClient, name_, token) {
        let json = {
            name: name_
        };
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].getmarcsbyname + idClient, json, opt).toPromise().then(marc => {
                resolve(marc);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getPrealertActive(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].getprealertactive, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getPrealertActivebyClient(idClient, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].getprealertactivebyClient + idClient, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            });
        });
    }
    sendEmail(email, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].sendEmail, email, opt).toPromise().then(email => {
                resolve(email);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getinvoicesdraft(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].invoicesdrafts, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getcharts(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].charts, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getchartsbyclient(idClient, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].chartsbyclient + idClient, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getprealertsdraft(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].prealertdrafts, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            });
        });
    }
    generatePdfInvoiceDraft(invoices, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].viewdraft, invoices, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getExcelPrealertDraft(prealert, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].getXlsPrealert, prealert, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getstatusprealert(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].getstatusprealert, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addstatusprealert(status, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].addstatusprealert, status, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updatestatusprealert(status, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].updatestatusprealert, status, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            });
        });
    }
    deletestatusprealert(status, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].deletestatusprealert, status, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getTemplates(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].templates, opt).toPromise().then(template => {
                resolve(template);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addTemplateHead(headTemplate, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].addtemplateshead, headTemplate, opt).toPromise().then(template => {
                resolve(template);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addTemplateDetaill(detailTemplate, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].addtemplatesdetaill, detailTemplate, opt).toPromise().then(template => {
                resolve(template);
            }).catch(error => {
                reject(error);
            });
        });
    }
    deleteTemplate(idTemplate, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].deletetemplate + idTemplate, null, opt).toPromise().then(template => {
                resolve(template);
            }).catch(error => {
                reject(error);
            });
        });
    }
    deleteTemplateDetalle(idDetalle, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].deletetemplatedetalle + idDetalle, null, opt).toPromise().then(template => {
                resolve(template);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updateTemplateDetalle(detaill, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].updatetemplatedetalle, detaill, opt).toPromise().then(template => {
                resolve(template);
            }).catch(error => {
                reject(error);
            });
        });
    }
    pedidos(token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].pedidos, opt).toPromise().then(pedidos => {
                resolve(pedidos);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getInformationAllOrders(dateIni, dateFin, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].historicordersall + '/' + dateIni + '/' + dateFin, opt).toPromise().then(pedidos => {
                resolve(pedidos);
            }).catch(error => {
                reject(error);
            });
        });
    }
    getInformationAllOrdersbyClient(clieId, estado, dateIni, dateFin, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].historicordersbyclient + clieId + '/' + estado + '/' + dateIni + '/' + dateFin, opt).toPromise().then(pedidos => {
                resolve(pedidos);
            }).catch(error => {
                reject(error);
            });
        });
    }
    pedidosbyclient(clieId, estado, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].pedidobyclient + clieId + '/' + estado + '/20210414000000/20210414000000', opt).toPromise().then(pedidos => {
                resolve(pedidos);
            }).catch(error => {
                reject(error);
            });
        });
    }
    addpedido(pedido, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].pedidoregister, pedido, opt).toPromise().then(pedido => {
                resolve(pedido);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updatedatesorder(order, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].updatedatesorder, order, opt).toPromise().then(order => {
                resolve(order);
            }).catch(error => {
                reject(error);
            });
        });
    }
    sendnotification(pedido, token) {
        let opt = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].notificationprealert, pedido, opt).toPromise().then(notification => {
                resolve(notification);
            }).catch(error => {
                reject(error);
            });
        });
    }
    httpPost(url, body) {
        const header = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]()
                .set("Content-Type", "application/x-www-form-urlencoded")
            //.set("Authorization", `Bearer ${environment.stripe.sk}`),
        };
        const order = this.JSON_to_URLEncoded(body);
        return this.http.post(url, order, header);
    }
    httpGet(url) {
        const header = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]()
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
ApisService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ factory: function ApisService_Factory() { return new ApisService(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"])); }, token: ApisService, providedIn: "root" });


/***/ })

}]);
//# sourceMappingURL=default~crm-clientes-clientes-module-ngfactory~crm-clientes-edit-edit-module-ngfactory~crm-delivery-~e453b710-es2015.js.map