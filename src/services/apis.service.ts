import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError, Observable } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from "@angular/common/http";
export class AuthInfo {
    constructor(public $uid: string) { }

    isLoggedIn() {
        return !!this.$uid;
    }
}

@Injectable({
    providedIn: "root",
})
export class ApisService {
    static UNKNOWN_USER = new AuthInfo(null);

    public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(
        ApisService.UNKNOWN_USER
    );
    constructor(
        private http: HttpClient
    ) { }

    /** Http Options */
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        }),
    };

    /** Captura de errores */
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error("An error occurred:", error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
        // return an observable with a user-facing error message
        return throwError("Something bad happened; please try again later.");
    }


    public login(email: string, password: string): Promise<any> {
        let credential = {
            user: email,
            pass: password,
        };
        console.log(credential);
        return this.http
            .post<any>(
                environment.login,
                JSON.stringify(credential),
                this.httpOptions
            )
            .pipe(retry(2), catchError(this.handleError)).toPromise();
    }

    public getclients(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.client, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addclient(client: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addclient, client, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public updateclient(client: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.updateclient, client, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            })
        });
    }


    public getflowers(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.flowers, opt).toPromise().then(flowers => {
                resolve(flowers);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addflowers(flower: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addflowers, flower, opt).toPromise().then(flower => {
                resolve(flower);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public updateflower(flower: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.updateflowers, flower, opt).toPromise().then(flower => {
                resolve(flower);
            }).catch(error => {
                reject(error);
            })
        });
    }


    public getfinca(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.finca, opt).toPromise().then(finca => {
                resolve(finca);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addfinca(finca: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addfinca, finca, opt).toPromise().then(finca => {
                resolve(finca);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public updatefinca(finca: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.updatefinca, finca, opt).toPromise().then(finca => {
                resolve(finca);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public getdeliveries(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.empresaCargo, opt).toPromise().then(delivery => {
                resolve(delivery);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public adddelivery(delivery: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addempresaCargo, delivery, opt).toPromise().then(delivery => {
                resolve(delivery);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public updatedelivery(delivery: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.updateempresaCargo, delivery, opt).toPromise().then(delivery => {
                resolve(delivery);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public getmarks(idCliente: number, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.marcaciones + idCliente, opt).toPromise().then(mark => {
                resolve(mark);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addmark(mark: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addmarcaciones, mark, opt).toPromise().then(mark => {
                resolve(mark);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public updatemark(mark: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.updatemarcaciones, mark, opt).toPromise().then(mark => {
                resolve(mark);
            }).catch(error => {
                reject(error);
            })
        });
    }





    httpPost(url, body) {
        const header = {
            headers: new HttpHeaders()
                .set("Content-Type", "application/x-www-form-urlencoded")
            //.set("Authorization", `Bearer ${environment.stripe.sk}`),
        };
        const order = this.JSON_to_URLEncoded(body);
        console.log(order);
        return this.http.post(url, order, header);
    }

    httpGet(url) {
        const header = {
            headers: new HttpHeaders()
                .set("Content-Type", "application/x-www-form-urlencoded")
            //.set("Authorization", `Bearer ${environment.stripe.sk}`),
        };

        return this.http.get(url, header);
    }

    JSON_to_URLEncoded(element, key?, list?) {
        let new_list = list || [];
        if (typeof element == "object") {
            for (let idx in element) {
                this.JSON_to_URLEncoded(
                    element[idx],
                    key ? key + "[" + idx + "]" : idx,
                    new_list
                );
            }
        } else {
            new_list.push(key + "=" + encodeURIComponent(element));
        }
        return new_list.join("&");
    }
}
