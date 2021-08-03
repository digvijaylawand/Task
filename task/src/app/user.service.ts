import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { User } from "./user";
import { Observable } from 'rxjs';

const localUrl = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'jwt-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public editId: string;

  constructor(private _http: HttpClient) { }

  addUsers(user): Observable<User> {
    
    return  this._http.post<User>(`${localUrl}/user/`, user, httpOptions);
  }

  getUserData(id): Observable<User> {
    console.log(`${localUrl}/user?id=`+ id);
    
    return  this._http.get<User>(`${localUrl}/user?id=`+ id, httpOptions);
  }

  updateUser(user,id): Observable<User> {
    console.log(`${localUrl}/user?id=`+ id);
    
    return  this._http.put<User>(`${localUrl}/user/`+ id,user, httpOptions);
  }

  updateImage(user,id): Observable<User> {
  
    return this._http.patch<User>(`${localUrl}/user/`+ id,user, httpOptions);
  }

}
