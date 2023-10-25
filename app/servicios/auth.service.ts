import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { map } from   'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: { email: string, password: string }[] = [
    { email: 'email1', password: 'password1' },
    { email: 'email2', password: 'password2' },
    
  ];
  constructor(private httpClient: HttpClient) { }

  GetAllUsers():Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${environment.apiUrl}/usuarios`);
  }
  GetUserById(codigo: any):Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${environment.apiUrl}/usuarios/?email=${codigo}`);
  }
  validateUser(email: string, password: string): Observable<boolean>{
    return this.httpClient.get<Usuario[]>(`${environment.apiUrl}/usuarios/?email=${email}`).pipe(
      map(users => {
        if (users.length === 1) {
          const user = users[0];
          return user.password === password;
        }
        return false;
      })
    );
  }
  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
  GetUserrole(){
  return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():''
  }

}
