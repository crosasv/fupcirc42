import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/service/utilities/loading.service';
import { DataFormService } from 'src/app/service/utilities/dataForm.service';
import { Observable } from 'rxjs';
import { ComboBoxService } from 'src/app/service/comboBox/comboBox.service';
import { studentInterface, Sede, JornadaPostulacion, CarreraPostulacion, Especialidad, PeriodoAcademico } from 'src/app/entities/interfaces';
import { FormBuilder } from '@angular/forms';

declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  private studient$: Observable<studentInterface>;
  public period$: Observable<PeriodoAcademico>;

  public dataCombo = {
    sede:[],
    carreraPostulacion: [],
    especialidad:[],
    jornadaPostulacion:[],
  };
  private studentValueForDefault: studentInterface;
  
  public comboSelected = {
    sede: 'Seleccionar Sede',
    carreraPostulacion: 'Seleccionar Carrera',
    especialidad: 'Seleccionar Especialidad',
    jornadaPostulacion: 'Seleccionar Jornada',
  }

  public studentForm ;
  isSubmitted = false;
  constructor(private comboBoxService: ComboBoxService,
    private loadingService: LoadingService,
    private dataFormService: DataFormService,
    public fb: FormBuilder) { 
      this.studient$ = this.dataFormService.getStudent();
      this.period$ = this.dataFormService.getPeriod();
      this.studentForm = this.fb.group({
        sede: [''],
        SEDE_CCOD: [''],
        carreraPostulacion: [''],
        CARR_CCOD: [''],
        especialidad: [''],
        ESPE_CCOD: [''],
        jornadaPostulacion: [''],
        JORN_CCOD: [''],
      })
    }

  ngOnInit() {
    this.studient$.subscribe(
      (res: studentInterface) => {
          const keys = Object.keys(res);
          if (keys.length) {
            this.studentValueForDefault = res;
            this.setValueForDefaultForm('sede',this.studentValueForDefault.SEDE_TDESC);
            this.setValueForDefaultForm('carreraPostulacion',this.studentValueForDefault.CARR_TDESC);
            this.setValueForDefaultForm('especialidad',this.studentValueForDefault.ESPE_TDESC);
            this.setValueForDefaultForm('jornadaPostulacion',this.studentValueForDefault.JORN_TDESC);
            this.loadData();
            console.log('studient$studient$studient$',res);
          }
      }
    )
  }

  public dropSedes(selectedElement: Sede){
    this.studentForm.patchValue({
      sede: selectedElement.SEDE_TDESC,
      SEDE_CCOD: selectedElement.SEDE_CCOD,
      carreraPostulacion: '',
      CARR_CCOD: '',
      especialidad: '',
      ESPE_CCOD: '',
      jornadaPostulacion: '',
      JORN_CCOD: '',
    });
    const SEDE_CCOD = selectedElement.SEDE_CCOD;
    this.dataCombo.carreraPostulacion = [];
    this.getCboCarreras(SEDE_CCOD);
    this.dataCombo.especialidad = [];
    this.dataCombo.jornadaPostulacion = [];
  }

  public dropSelect(typeDrop: string, selectedElement: Sede){
    this.comboSelected[typeDrop] = selectedElement.SEDE_TDESC;
  }
  public dropCarreraPostulacion(element: CarreraPostulacion){
    this.setValueForDefaultForm('carreraPostulacion',element.CARR_TDESC);
    const SEDE_CCOD = this.dataCombo.sede.find(item => item.SEDE_TDESC === this.studentForm.controls.sede.value).SEDE_CCOD;
    this.studentForm.patchValue({
      CARR_CCOD: element.CARR_CCOD,
      especialidad: '',
      ESPE_CCOD: '',
      jornadaPostulacion: '',
      JORN_CCOD: '',
    });
    const CARR_CCOD = element.CARR_CCOD;
    this.getCboEspecialidad(SEDE_CCOD, CARR_CCOD);
    this.dataCombo.especialidad = [];
    this.dataCombo.jornadaPostulacion = [];
  }

  public dropEspecialidad(element: Especialidad){
    this.setValueForDefaultForm('especialidad',element.ESPE_TDESC);
    const SEDE_CCOD = this.dataCombo.sede.find(item => item.SEDE_TDESC === this.studentForm.controls.sede.value).SEDE_CCOD;
    this.studentForm.patchValue({
      ESPE_CCOD: element.ESPE_TDESC,
      jornadaPostulacion: '',
      JORN_CCOD: '',
    });
    const ESPE_CCOD = element.ESPE_TDESC;
    this.getCboJornada(SEDE_CCOD, ESPE_CCOD);
    this.dataCombo.jornadaPostulacion = [];
  }

  public dropJornadaPostulacion(element: JornadaPostulacion){
    this.setValueForDefaultForm('jornadaPostulacion',element.JORN_TDESC);
    this.studentForm.patchValue({
      JORN_CCOD: element.JORN_CCOD
    });
    this.getCaracteristicasCarrera();
  }

  public onSubmit(){
    this.isSubmitted = true;
    if (!this.studentForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.studentForm.value))
    }
    
  }

  private loadData(){
    const SEDE_CCOD = this.studentValueForDefault.SEDE_CCOD;
    const CARR_CCOD = this.studentValueForDefault.CARR_CCOD;
    const ESPE_CCOD = this.studentValueForDefault.ESPE_CCOD;
    this.getCboSedes();
    this.getCboCarreras(SEDE_CCOD);
    this.getCboEspecialidad(SEDE_CCOD, CARR_CCOD);
    this.getCboJornada(SEDE_CCOD, ESPE_CCOD);
  }

  private setValueForDefaultForm(type: string, value: string){
    this.studentForm.patchValue({
      [type]: [value]
    });
  }

  private getCboSedes(){
    this.loadingService.updateLoading(true);
    this.comboBoxService.getCboSedes().subscribe(
      (res: any)=>{
        this.dataCombo.sede = res;
        // this.studentValueForDefault[0].SEDE_CCOD = 10;
        this.loadingService.updateLoading(false);
    });
  }

  private getCboCarreras(i_sede_ccod){
    this.loadingService.updateLoading(true);
    this.comboBoxService.getCboCarreras(i_sede_ccod).subscribe(
      (res: any)=>{
        this.dataCombo.carreraPostulacion = res;
        this.loadingService.updateLoading(false);
    });

  }

  private getCboEspecialidad(i_sede_ccod, i_carr_ccod){
    this.loadingService.updateLoading(true);
    this.comboBoxService.getCboEspecialidad(i_sede_ccod, i_carr_ccod).subscribe(
      (res: any)=>{
        this.dataCombo.especialidad = res;
        this.loadingService.updateLoading(false);
    });

  }

  private getCboJornada(i_sede_ccod, i_espe_ccod){
    this.loadingService.updateLoading(true);
    this.comboBoxService.getCboJornada(i_sede_ccod, i_espe_ccod).subscribe(
      (res: any)=>{
        this.dataCombo.jornadaPostulacion = res;
        this.loadingService.updateLoading(false);
    });
  }

  private getCaracteristicasCarrera(){
    const period: PeriodoAcademico = this.dataFormService.currentPeriod;
    const i_peri_ccod = period.PERI_CCOD;
    const i_sede_ccod = this.studentForm.controls.SEDE_CCOD.value;
    const i_carr_ccod = this.studentForm.controls.CARR_CCOD.value;
    const i_espe_ccod = this.studentForm.controls.ESPE_CCOD.value;
    const i_jorn_ccod = this.studentForm.controls.JORN_CCOD.value;
    debugger
    this.loadingService.updateLoading(true);
    this.comboBoxService.getCaracteristicasCarrera(i_peri_ccod, i_sede_ccod,i_carr_ccod, i_espe_ccod, i_jorn_ccod).subscribe(
      (res: any)=>{
        this.dataCombo.jornadaPostulacion = res;
        this.loadingService.updateLoading(false);
    });
  }

}
