import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { raceFeature, JornadaPostulacion, Sexo, Ocupacion, EstadoCivil, Pais, Region, Ciudad } from 'src/app/entities/interfaces';

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
 
  public getCboPais(){
    const url = `${this.apiURL}combobox/getCboPais`;
    return this.http.post<Pais[]>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }

  public getCboEstadoCivil(){
    const url = `${this.apiURL}combobox/getCboEstadoCivil`;
    return this.http.post<EstadoCivil[]>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
  
  public getCboSexo(){
    const url = `${this.apiURL}combobox/getCboSexo`;
    return this.http.post<Sexo[]>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
  
  public getCboCiudad(i_regi_ccod: string){
    const url = `${this.apiURL}combobox/getCboCiudad?i_regi_ccod=${i_regi_ccod}`;
    return this.http.post<Ciudad[]>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
  
  public getCboRegion(){
    const url = `${this.apiURL}combobox/getCboRegion`;
    return this.http.post<Region[]>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
  
  public getCboOcupacion(){
    const url = `${this.apiURL}combobox/getCboOcupacion`;
    return this.http.post<Ocupacion[]>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }

  public getCboComunas(i_regi_ccod: string, i_ciud_tcomuna){
    const url = `${this.apiURL}combobox/getCboComunas?i_regi_ccod=${i_regi_ccod}&i_ciud_tcomuna=${i_ciud_tcomuna}`;
    return this.http.post<Ocupacion[]>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
}
