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

  constructor() { }

  getDataForm(): Observable<any> {
    return this.dataFormSubject.asObservable();
  }

  private refresh() {
    // Emitir los nuevos valores para que todos los que dependan se actualicen.
    this.dataFormSubject.next(this.dataForm);
  }

  createDataForm(dataForm: any, type: string) {
    /**
    * Evitar hacer this.user.push() pues estaríamos modificando los valores directamente,
    * se debe generar un nuevo array !!!!.
    */
    this.dataForm[type] = dataForm;
    this.refresh();
  }

  loadDummyData() {
    this.dataForm = {};
    this.refresh();
  }

  approveAll() {
    /**
    * Evitar hacer un forEach e ir modificando cada property !!! this.users.forEach(user => user.isPremium = true);
    * 
    * Pudieramos Utilizar el .map pues siempre nos retorna un nuevo array pero si olvidamos el Object.assign( {}, ... )
    * siempre estariamos tomando la referencia del objeto en memoria y estariamos modificando nuevamente el valor
    * original en vez de crear una nueva copia o version del dato.
    * 
    
    this.dataForm = this.dataForm.map(user => Object.assign({}, user, { isPremium: true }));
    this.refresh();*/
  }
}
