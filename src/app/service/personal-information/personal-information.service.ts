import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { raceFeature, JornadaPostulacion } from 'src/app/entities/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {
  private apiURL = environment.apiUrl;
  // private apiURL = 'https://siga.desa.inacap.cl/inacap.cuentacorriente.mantenedorcliente/index.aspx/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  public getDatosPersonalesPostulante(i_pers_ncorr){
    const url = `${this.apiURL}datos/getDatosPersonalesPostulante?i_pers_ncorr=${i_pers_ncorr}`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
  
}
