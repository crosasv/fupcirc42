import { Component, OnInit, Input } from '@angular/core';
import { DataFormService } from 'src/app/service/utilities/dataForm.service';
import { constanciaPostulacion, studentInterface } from 'src/app/entities/interfaces';

declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-constancia-postulacion',
  templateUrl: './constancia-postulacion.component.html',
  styleUrls: ['./constancia-postulacion.component.scss']
})
export class ConstanciaPostulacionComponent {
  public constancia: constanciaPostulacion;
  constructor( private dataFormService: DataFormService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.constancia = this.dataFormService.dataConstanciaPostulacion;
  }

}
