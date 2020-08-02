import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BuscarClienteBodyInterface } from 'src/app/entities/interfaceBody/interfaceBody';
import { ClienteAdapterInterface } from 'src/app/entities/interfaces';
import { SelectOptionsBase } from './searchForm.interface';
import { studentInterface } from '../../entities/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiURL = environment.apiUrl;
  // private apiURL = 'https://siga.desa.inacap.cl/inacap.cuentacorriente.mantenedorcliente/index.aspx/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
//FUP
  public getStudentLocked(pers_nrut: string | number, i_peri_ccod: number) {
    const url = `${this.apiURL}datos/getBloqueos?i_pers_nrut=${pers_nrut}&i_peri_ccod=${i_peri_ccod}`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
  public getPeriod(){
    const url = `${this.apiURL}datos/getPeriodoAcademico`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }

  public checkPlan(pers_nrut: string | number){
    const url = `${this.apiURL}datos/getPlanContinuidad?i_pers_nrut=${pers_nrut}`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }

  public getApplyStatus(pers_nrut: string | number, i_peri_ccod: number) {
    const url = `${this.apiURL}datos/getEstadoPostulacion?i_pers_nrut=${pers_nrut}&i_peri_ccod=${i_peri_ccod}`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
  public getApplicantInfo(post_ncorr: string | number) {
    const url = `${this.apiURL}datos/getDatosPostulacion?i_post_ncorr=${post_ncorr}`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }

  public getCampus() {
    const url = `${this.apiURL}combobox/getCboSedes`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: Array<SelectOptionsBase>) => {
          return res;
        })
      );
  }
  //FIN FUP
  public getTypeOfBenefit() {
    const url = `${this.apiURL}combobox/getCboTipoDescuento`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  public getSearchType(){
    const url = `${this.apiURL}combobox/getCboFiltro`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }


  public getCaja(body){
    const url = `${this.apiURL}combobox/getCajas?i_sede_ccod=${body.i_sede_ccod}&i_peri_ccod=${body.i_peri_ccod}`;
    //const url = `${this.apiURL}combobox/getCajas?i_sede_ccod=${body.i_sede_ccod}&i_peri_ccod=226`;
    return this.http.post<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  public getBeneficiarios(queryParams){
    const url = `${this.apiURL}benef/getBeneficiarios?${queryParams}`;
    
    return this.http.post<any>(url,this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
  public getBeneficiados(queryParams){
    const url = `${this.apiURL}benef/getBeneficiados?${queryParams}`;
    // const dataMock = 'i_mcaj_ncorr=1196204&i_peri_ccod=174';
    // const url = `${this.apiURL}benef/getBeneficiados?${dataMock}`;
    return this.http.post<any>(url,this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
  public getMalAsignados(queryParams){
    // ?i_peri_ccod=222&i_sede_ccod=18
    const url = `${this.apiURL}benef/getMalAsignados?${queryParams}`;
    // const dataMock= 'i_peri_ccod=174&i_sede_ccod=11';
    // const url = `${this.apiURL}benef/getMalAsignados?${dataMock}`;

    
    return this.http.post<any>(url,this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
    );
  }
  public asignarBeneficios(queryParams){
    const url = `${this.apiURL}benef/asignaBeneficios?${queryParams}`;
    return this.http.post<any>(url,this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
  public generaPDF(queryParams){
    const url = `${this.apiURL}benef/generaPDF?${queryParams}`;
    return this.http.post<any>(url,this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }
  public enviaCorreo(queryParams){
    const url = `${this.apiURL}benef/enviaCorreo?${queryParams}`;
    return this.http.post<any>(url,this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  };
  public asignarBeneficiosAll(queryParams){
    // i_peri_ccod=222&i_sede_ccod=18
    const url = `${this.apiURL}benef/asignaMasivo?${queryParams}`;
    return this.http.post<any>(url,this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
  }

  public downloadExcel(queryParams){
    const url = `${this.apiURL}excel/exportarExcel?${queryParams}`;
    window.open(url);
  }
}
