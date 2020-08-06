import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from 'src/app/service/utilities/loading.service';
import { DataFormService } from 'src/app/service/utilities/dataForm.service';
import { Observable } from 'rxjs';
import { ComboBoxService } from 'src/app/service/comboBox/comboBox.service';
import { studentInterface, PersonalInformation } from 'src/app/entities/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonalInformationService } from 'src/app/service/personal-information/personal-information.service';

declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-personal-information-form',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationFormComponent implements OnInit {

  @Input() studentValueForDefault: studentInterface;
  @Input() creaPostulacionArt68: [];

  public personalForm: FormGroup;

  constructor(
    private personalInformationService: PersonalInformationService,
    private loadingService: LoadingService,
    public fb: FormBuilder
  ){
    this.personalForm = this.structureForm();
  }

  ngOnInit(){
    this.loadData();
  }

  public onSubmit(){
  }

  private loadData(){
    this.loadingService.updateLoading(true);
    this.personalInformationService.getDatosPersonalesPostulante(this.studentValueForDefault.PERS_NCORR).subscribe(
      (res: PersonalInformation[])=>{
        console.log('getDatosPersonalesPostulante res ',res )
        this.loadingService.updateLoading(false);
        this.setDefaultDataForm(res[0]);
    });
  }

  private setDefaultDataForm(datauser: PersonalInformation){
    this.personalForm.patchValue({
      nombres: datauser.PERS_TNOMBRE,
      apellidoPaterno: datauser.PERS_TAPE_PATERNO,
      apellidoMaterno: datauser.PERS_TAPE_MATERNO,
      rut: datauser.RUT,
      genero: datauser.SEXO_TDESC,
      fechaNacimiento: datauser.PERS_FNACIMIENTO,
      estadoCivil: datauser.ECIV_TDESC,
      ocupacion: datauser.OCUP_CCOD,
      email: datauser.PERS_TEMAIL,
      nacionalidad: datauser.PAIS_TDESC,
    });
    console.log(this.personalForm.getRawValue())
  }

  private structureForm(){
    return this.fb.group({
      nombres: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      rut: [''] ,
      genero: [''],
      fechaNacimiento: [''],
      estadoCivil: [''],
      ocupacion: [''],
      email: [''],
      nacionalidad: [''],
    })
  }
}
