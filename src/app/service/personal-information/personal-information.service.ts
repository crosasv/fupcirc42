import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { raceFeature, JornadaPostulacion, Sexo, Ocupacion, EstadoCivil, Pais, Region, Ciudad } from 'src/app/entities/interfaces';
import { of } from 'rxjs';

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

  public getUltimoSemestrePEC(i_pers_ncorr, i_peri_ccod){
    const url = `${this.apiURL}datos/getUltimoSemestrePEC?i_pers_ncorr=${i_pers_ncorr}&i_peri_ccod=${i_peri_ccod}`;
    return this.http.post<Ocupacion[]>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
  
  public cierraPostulacionArt68(i_post_ncorr) {
    const url = `${this.apiURL}datos/cierraPostulacionArt68?i_post_ncorr=${i_post_ncorr}`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }

  public insDatosPostulante(postulante: any){
    const rut = postulante.i_pers_nrut.split('-');
    const queryParams= `i_pers_ncorr=${postulante.i_pers_ncorr}&i_ciud_ccod=${postulante.i_ciud_ccod}&i_dire_tcalle=${postulante.i_dire_tcalle}&i_dire_tnro=${postulante.i_dire_tnro}&i_dire_tpoblacion=${postulante.i_dire_tpoblacion}&i_dire_tblock=${postulante.i_dire_tblock}&i_dire_tdepto=${postulante.i_dire_tdepto}&i_dire_tcelular=${postulante.i_dire_tcelular}&i_pers_tnombre=${postulante.i_pers_tnombre}&i_pers_tape_paterno=${postulante.i_pers_tape_paterno}&i_pers_tape_materno=${postulante.i_pers_tape_materno}&i_pers_nrut=${rut[0]}&i_pers_xdv=${rut[1]}&i_sexo_ccod=${postulante.i_sexo_ccod}&i_pers_fnacimiento=${postulante.i_pers_fnacimiento}&i_eciv_ccod=${postulante.i_eciv_ccod}&i_ocup_ccod=${postulante.i_ocup_ccod}&i_pers_temail=${postulante.i_pers_temail}&i_pais_ccod=${postulante.i_pais_ccod}&i_audi_tusuario=${postulante.i_audi_tusuario}`
    const url = `${this.apiURL}datos/insDatosPostulante?${queryParams}`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }

  public getDatosPostulacion(i_post_ncorr){
    const url = `${this.apiURL}datos/obtenerDatosFupCerrado?i_post_ncorr=${i_post_ncorr}`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }

  public validaMatriculaVigentePeriodoActual(i_pers_ncorr, i_peri_ccod){
    const url = `${this.apiURL}datos/validaMatriculaVigentePeriodoActual?i_pers_ncorr=${i_pers_ncorr}&i_peri_ccod=${i_peri_ccod}`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
}
