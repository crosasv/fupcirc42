import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegionesInterface, ComunaInterface, 
    GiroInterface, ClasificacionInterface, BancoInterface, 
    TipoCuentaBancoInterface } from 'src/app/entities/interfaces';
@Injectable({
  providedIn: 'root'
})
export class DataFormService {
  private dataFormSubject = new BehaviorSubject([]);
  private dataForm: any = {
    regiones: Array<RegionesInterface>(),
    comuna: Array<ComunaInterface>(),
    giro: Array<GiroInterface>(),
    clasificacion: Array<ClasificacionInterface>(),
    bancos: Array<BancoInterface>(),
    tipoCuentaBanco: Array<TipoCuentaBancoInterface>()
  };

  private dataStudent = new BehaviorSubject({});

  constructor() { }

  getDataForm(): Observable<any> {
    return this.dataFormSubject.asObservable();
  }

  private refresh() {
    this.dataFormSubject.next(this.dataForm);
  }

  createDataForm(dataForm: any, type: string) {
    this.dataForm[type] = dataForm;
    this.refresh();
  }

  loadDummyData() {
    this.dataForm = {};
    this.refresh();
  }

  getStudent(): Observable<any> {
    return this.dataStudent.asObservable();
  }

  private refreshStudent() {
    this.dataStudent.next(this.dataForm);
  }
  
  setStudent(student: any) {
    this.dataForm = student;
    this.refreshStudent();
  }

}
