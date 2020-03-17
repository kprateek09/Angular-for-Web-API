import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Users } from '../Models/Users';
import { Injectable, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { newUsers } from '../Models/newUsers';

@Injectable()

export class UserDataService {

    //baseUrl = "https://localhost:5001/api/";
    newBaseUrl = "https://localhost:44389/api/";

    requestheaders : HttpHeaders;
    getHeaders : HttpHeaders = new HttpHeaders();


    constructor(
        private http: HttpClient
    ) { }

    sendData(formData : Users) : Observable<any> {
        //const body = JSON.stringify(userData);
        //const headerOptions = new HttpHeaders({'Content-Type': 'application/json'});
        
        //this.requestheaders.append("Some Random Header" , "A value");

        const httpOptions = {
            requestheaders : new HttpHeaders({
                
            })
        };
        httpOptions.requestheaders = httpOptions.requestheaders.set('Some Random Header', 'Some Random Value');
        return this.http.post<any>(this.newBaseUrl + 'ValidateUser', formData, {headers : httpOptions.requestheaders} );
    }

    getAllUsers() : Observable<newUsers[]> {
        //this.headerValue = this.requestheaders.get("Some Random Header");
        //this.getHeaders = this.requestheaders.set("Some Random Header", "Some Random value");
        const httpOptions = {
            requestheaders : new HttpHeaders({
                
            })
        };
        httpOptions.requestheaders = httpOptions.requestheaders.set('content-type', 'json').append('MyHeader', 'CustomToken_268942');
        
        return this.http.get<newUsers[]>(this.newBaseUrl + "getUsers" , {headers : httpOptions.requestheaders}).pipe(retry(1));
    }

    postUserData(formData : newUsers) : Observable<any> {
        return this.http.post<any>(this.newBaseUrl + "addUser", formData);
    }

    removeUser(data) : Observable<any> {
        return this.http.get<any>(this.newBaseUrl + "deleteUser/" + data).pipe(retry(1));
    }

    updateUser(formData : newUsers) : Observable<any> {
        return this.http.post<any>(this.newBaseUrl + "updateUser", formData);
    }
}