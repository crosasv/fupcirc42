import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { raceFeature, JornadaPostulacion } from 'src/app/entities/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ComboBoxService {
  private apiURL = environment.apiUrl;
  // private apiURL = 'https://siga.desa.inacap.cl/inacap.cuentacorriente.mantenedorcliente/index.aspx/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  public getCboSedes(){
    const url = `${this.apiURL}combobox/getCboSedes`;
    return this.http.get<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }

  public getCboCarreras(i_sede_ccod){
    const url = `${this.apiURL}combobox/getCboCarreras?i_sede_ccod=${i_sede_ccod}`;
    return this.http.get<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }

  public getCboEspecialidad(i_sede_ccod, i_carr_ccod){
    const url = `${this.apiURL}combobox/getCboEspecialidad?i_sede_ccod=${i_sede_ccod}&i_carr_ccod=${i_carr_ccod}`;
    return this.http.get<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
    }

  public getCboJornada(i_sede_ccod, i_espe_ccod){
    const url = `${this.apiURL}combobox/getCboJornada?i_sede_ccod=${i_sede_ccod}&i_espe_ccod=${i_espe_ccod}`;
    return this.http.get<JornadaPostulacion[]>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
    }
  public getCaracteristicasCarrera(i_peri_ccod, i_sede_ccod,i_carr_ccod, i_espe_ccod, i_jorn_ccod) {
    const url = `${this.apiURL}postulacion/getCaracteristicasCarrera?i_peri_ccod=${i_peri_ccod}&i_sede_ccod=${i_sede_ccod}&i_carr_ccod=${i_carr_ccod}&i_espe_ccod=${i_espe_ccod}&i_jorn_ccod=${i_jorn_ccod}`;
    return this.http.post<raceFeature[]>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }

    
  public creaPostulacionArt68(i_pers_ncorr, i_ofer_ncorr) {
    const url = `${this.apiURL}postulacion/creaPostulacionArt68?i_pers_ncorr=${i_pers_ncorr}&i_ofer_ncorr=${i_ofer_ncorr}`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }

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














