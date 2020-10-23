import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from 'src/app/service/utilities/loading.service';
import { DataFormService } from 'src/app/service/utilities/dataForm.service';
import { Observable } from 'rxjs';
import { ComboBoxService } from 'src/app/service/comboBox/comboBox.service';
import { studentInterface, Sede, JornadaPostulacion, CarreraPostulacion, Especialidad, PeriodoAcademico, raceFeature } from 'src/app/entities/interfaces';
import { FormBuilder } from '@angular/forms';
import { UserInterface } from 'src/app/service/user/user.interface';
import { PersonalInformationService } from 'src/app/service/personal-information/personal-information.service';

declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  @Input() dataUser: UserInterface;

  private studient$: Observable<studentInterface>;
  public period$: Observable<PeriodoAcademico>;

  public dataCombo = {
    sede:[],
    carreraPostulacion: [],
    especialidad:[],
    jornadaPostulacion:[],
  };
  public studentValueForDefault: studentInterface;
  
  public comboSelected = {
    sede: 'Seleccionar Sede',
    carreraPostulacion: 'Seleccionar Carrera',
    especialidad: 'Seleccionar Especialidad',
    jornadaPostulacion: 'Seleccionar Jornada',
  }

  public studentForm ;
  isSubmitted = false;

  public raceFeature: raceFeature[] = [];
  public creaPostulacionArt68: [] = [];

  public isDesabledFormPersonal = false;

  private count = 0;

  constructor(private comboBoxService: ComboBoxService,
    private loadingService: LoadingService,
    private dataFormService: DataFormService,
    public fb: FormBuilder,
    private personalInformationService: PersonalInformationService) {
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
        i_ofer_ncorr: ['']
      })
    }
    public transform(value: any) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
  }
  ngOnInit() {
    this.studient$.subscribe(
      (res: studentInterface) => {
          const keys = Object.keys(res);
          if (keys.length) {
            this.creaPostulacionArt68 = [];
            this.count = 0;
            this.studentValueForDefault = res;
            this.studentValueForDefault.RUT = this.transform(res.RUT)
            this.setValueForDefaultForm('sede',this.studentValueForDefault.SEDE_TDESC);
            this.setValueForDefaultForm('SEDE_CCOD',this.studentValueForDefault.SEDE_CCOD);
            this.setValueForDefaultForm('carreraPostulacion',this.studentValueForDefault.CARR_TDESC);
            this.setValueForDefaultForm('CARR_CCOD',this.studentValueForDefault.CARR_CCOD);
            this.setValueForDefaultForm('especialidad',this.studentValueForDefault.ESPE_TDESC);
            this.setValueForDefaultForm('ESPE_CCOD',this.studentValueForDefault.ESPE_CCOD);
            this.setValueForDefaultForm('jornadaPostulacion',this.studentValueForDefault.JORN_TDESC);
            this.setValueForDefaultForm('JORN_CCOD',this.studentValueForDefault.JORN_CCOD);
            this.loadData();
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
      i_ofer_ncorr: ''
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
      i_ofer_ncorr: ''
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
      ESPE_CCOD: element.ESPE_CCOD,
      jornadaPostulacion: '',
      JORN_CCOD: '',
      i_ofer_ncorr: ''
    });
    const ESPE_CCOD = element.ESPE_CCOD;
    this.getCboJornada(SEDE_CCOD, ESPE_CCOD);
    this.dataCombo.jornadaPostulacion = [];
  }

  public dropJornadaPostulacion(element: JornadaPostulacion){
    this.setValueForDefaultForm('jornadaPostulacion',element.JORN_TDESC);
    this.studentForm.patchValue({
      JORN_CCOD: element.JORN_CCOD,
      i_ofer_ncorr: element.OFER_NCORR
    });
    this.getCaracteristicasCarrera();
  }

  public onSubmit(){
    this.isSubmitted = true;
    if (!this.studentForm.valid) {
      return false;
    } else {
      // alert(JSON.stringify(this.studentForm.value))
    } 
  }

  public confirm(){
    const i_ofer_ncorr = this.studentForm.controls.i_ofer_ncorr.value;
    const i_pers_ncorr = this.studentValueForDefault.PERS_NCORR;
    this.comboBoxService.creaPostulacionArt68(i_pers_ncorr, i_ofer_ncorr).subscribe(
      (res: any)=>{
        this.loadingService.updateLoading(false);
        this.creaPostulacionArt68 = res;
        if( res[0].RESULTADO === 'OK'){
          this.getUltimoSemestrePEC();
          toastr.success('Datos guardados con &eacute;xito.');
        }else{
          toastr.error('No se pudo crear la postulación.');
        }
        $('#confirmar').addClass('d-none');
    });
  }

  private getUltimoSemestrePEC(){
    this.loadingService.updateLoading(true);
    const i_pers_ncorr = this.studentValueForDefault.PERS_NCORR;
    const allPeriod = this.dataFormService.currentPeriod;
    const i_peri_ccod = allPeriod.PERI_CCOD;
    this.personalInformationService.getUltimoSemestrePEC(i_pers_ncorr, i_peri_ccod).subscribe(
      res => {
        this.loadingService.updateLoading(false);
        if( res[0].SEMESTRES_ULTIMA_MATRICULA_CONTINUIDAD > 6){
          $('#ModalUltimaMatrícula').modal({backdrop: 'static', keyboard: false});
          $('#ModalUltimaMatrícula').modal('show');
          this.studentValueForDefault = null;
        }else{
          this.validaMatriculaVigentePeriodoActual();
        }
      }
    )
  }
  
  private validaMatriculaVigentePeriodoActual(){
    this.loadingService.updateLoading(true);
    const i_pers_ncorr = this.studentValueForDefault.PERS_NCORR;
    const allPeriod = this.dataFormService.currentPeriod;
    const i_peri_ccod = allPeriod.PERI_CCOD;
    this.personalInformationService.validaMatriculaVigentePeriodoActual(i_pers_ncorr, i_peri_ccod).subscribe(
      res => {
        this.loadingService.updateLoading(false);
        if( res[0].MENSAJE === "VIGENTE"){
          this.isDesabledFormPersonal = true;
          $('#ModalUltimaMatrícula').modal({backdrop: 'static', keyboard: false});
          $('#ModalUltimaMatrícula').modal('show');
        }else if( res[0].MATR_VIGENTE === 0){
          this.isDesabledFormPersonal = false;
        }
      }
    )
  }

  private loadData(){
    const SEDE_CCOD = this.studentValueForDefault.SEDE_CCOD; // consultar si sede viene siempre
    const CARR_CCOD = this.studentValueForDefault.CARR_CCOD;
    const ESPE_CCOD = this.studentValueForDefault.ESPE_CCOD;
    const JORN_CCOD = this.studentValueForDefault.JORN_CCOD;
    this.loadingService.updateLoading(true);
    this.getCboSedes(SEDE_CCOD);
    if(CARR_CCOD){
      this.getCboCarreras(SEDE_CCOD, CARR_CCOD);
      this.getCboEspecialidad(SEDE_CCOD, CARR_CCOD, ESPE_CCOD);
      this.getCboJornada(SEDE_CCOD, ESPE_CCOD, JORN_CCOD);
    }
  }

  public setValueForDefaultForm(type: string, value: string){
    this.studentForm.patchValue({
      [type]: [value]
    });
  }

  private getCboSedes(SEDE_CCOD?){
    this.comboBoxService.getCboSedes().subscribe(
      (res: any)=>{
        if(SEDE_CCOD){
          const exist = res.some(item => item.SEDE_CCOD === SEDE_CCOD);
          if( !exist ){
            $('#ModalOfertaAcadémicaNoExiste').modal({backdrop: 'static', keyboard: false});
            $('#ModalOfertaAcadémicaNoExiste').modal('show');
          }else{
            this.count += 1;
            if(this.count === 4){this.getCaracteristicasCarrera();}
          }
        }
        this.dataCombo.sede = res;
        // this.studentValueForDefault[0].SEDE_CCOD = 10;
        this.loadingService.updateLoading(false);
    });
  }

  private getCboCarreras(i_sede_ccod, CARR_CCOD?){
    this.comboBoxService.getCboCarreras(i_sede_ccod).subscribe(
      (res: any)=>{
        if(CARR_CCOD){
          const exist = res.some(item => item.CARR_CCOD === CARR_CCOD);
          if( !exist ){
            $('#ModalOfertaAcadémicaNoExiste').modal({backdrop: 'static', keyboard: false});
            $('#ModalOfertaAcadémicaNoExiste').modal('show');
          }else{
            this.count += 1;
            if(this.count === 4){this.getCaracteristicasCarrera();}
          }
        }
        this.dataCombo.carreraPostulacion = res;
        this.loadingService.updateLoading(false);
    });

  }

  private getCboEspecialidad(i_sede_ccod, i_carr_ccod, ESPE_CCOD?){
    this.comboBoxService.getCboEspecialidad(i_sede_ccod, i_carr_ccod).subscribe(
      (res: any)=>{
        if(ESPE_CCOD){
          const exist = res.some(item => item.ESPE_CCOD === ESPE_CCOD);
          if( !exist ){
            $('#ModalOfertaAcadémicaNoExiste').modal({backdrop: 'static', keyboard: false});
            $('#ModalOfertaAcadémicaNoExiste').modal('show');
          }else{
            this.count += 1;
            if(this.count === 4){this.getCaracteristicasCarrera();}
          }
        }
        this.dataCombo.especialidad = res;
        this.loadingService.updateLoading(false);
    });

  }

  private getCboJornada(i_sede_ccod, i_espe_ccod, JORN_CCOD?){
    this.comboBoxService.getCboJornada(i_sede_ccod, i_espe_ccod).subscribe(
      (res: JornadaPostulacion[])=>{
        if(JORN_CCOD){
          const exist = res.find(item => item.JORN_CCOD === JORN_CCOD);
          if( !exist ){
            $('#ModalOfertaAcadémicaNoExiste').modal({backdrop: 'static', keyboard: false});
            $('#ModalOfertaAcadémicaNoExiste').modal('show');
          }else{
            this.setValueForDefaultForm('i_ofer_ncorr', exist.OFER_NCORR)
            this.count += 1;
            if(this.count === 4){this.getCaracteristicasCarrera();}
          }
        }
        this.dataCombo.jornadaPostulacion = res;
        this.loadingService.updateLoading(false);
    });
  }

  private getCaracteristicasCarrera(){
    $('#confirmar').addClass('d-block');
    const period: PeriodoAcademico = this.dataFormService.currentPeriod;
    const i_peri_ccod = period.PERI_CCOD;
    const i_sede_ccod = this.studentForm.controls.SEDE_CCOD.value;
    const i_carr_ccod = this.studentForm.controls.CARR_CCOD.value;
    const i_espe_ccod = this.studentForm.controls.ESPE_CCOD.value;
    const i_jorn_ccod = this.studentForm.controls.JORN_CCOD.value;

    this.loadingService.updateLoading(true);
    this.comboBoxService.getCaracteristicasCarrera(i_peri_ccod, i_sede_ccod,i_carr_ccod, i_espe_ccod, i_jorn_ccod).subscribe(
      (res: raceFeature[])=>{
        this.loadingService.updateLoading(false);
        if( res[0].ESPE_TTITULO === 'No conduce a Título'){
          $('#ModalError').modal({backdrop: 'static', keyboard: false});
          $('#ModalError').modal('show');
          this.raceFeature = [];
        }else{
          this.raceFeature = res;
        }
    });
  }

}
