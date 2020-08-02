import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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
    return this.http.get<any>(url, this.httpOptions)
      .pipe(
        map((res: any) => {
          const formaterToJson = JSON.parse(res);
          return formaterToJson;
        })
      );
    }

}














