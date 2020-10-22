import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoadingService } from 'src/app/service/utilities/loading.service';
import { DataFormService } from 'src/app/service/utilities/dataForm.service';
import { Observable } from 'rxjs';
import { ComboBoxService } from 'src/app/service/comboBox/comboBox.service';
import { studentInterface, PersonalInformation, Sexo, Ocupacion, EstadoCivil, Pais, Region, Ciudad } from 'src/app/entities/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonalInformationService } from 'src/app/service/personal-information/personal-information.service';

declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-modal-postulacion',
  templateUrl: './modal-postulacion.component.html',
  styleUrls: ['./modal-postulacion.component.scss']
})
export class ModalPostulacionComponent {

  @Output() aceptModal = new EventEmitter<any>();

  constructor(){}

  closeModal(){
    $('#ModalConfirmacion').modal('hide')
    this.aceptModal.emit(true);
    //REV IT 2
    window.location.href = 'https://portales.inacap.cl/';
  }

}
