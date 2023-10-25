import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpclient: HttpClient){ }

  CrearUsuario(newUsuario: Usuario): Observable<Usuario>{
    return this.httpclient.post<Usuario>(`${environment.apiUrl}/usuarios`, newUsuario);
  }
}
