import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserInterface } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = environment.apiUrl;
  // private apiURL = 'http://nepsdns.no-ip.biz:9999/me/index.aspx/';
  // private apiURL = 'https://siga.desa.inacap.cl/inacap.cuentacorriente.mantenedorcliente/index.aspx/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  public obtenerInfoUsuario(session: string) {
    const url = `${this.apiURL}sesion/obtenerDatosUsuario?sesi_ccod=${session}`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: Array<UserInterface>) => {
          return res[0];
        })
      );
  }

  public redirectToHome(): void {
    window.location.href = 'https://portales.inacap.cl/';
  }
}
