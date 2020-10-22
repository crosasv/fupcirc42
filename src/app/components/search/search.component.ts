import { Component, OnInit, Output, Input, SimpleChanges } from '@angular/core';
import { validationRut } from 'src/app/service/utilities/validateRut';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectOptionsBase } from 'src/app/service/search/searchForm.interface';
import { SearchService } from 'src/app/service/search/search.service';
import { LoadingService } from 'src/app/service/utilities/loading.service';
import { UserService } from 'src/app/service/user/user.service';
import { UserInterface } from 'src/app/service/user/user.interface';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { studentInterface } from 'src/app/entities/interfaces';
import { basicInterface } from 'src/app/entities/interfaces';
import { DataFormService } from 'src/app/service/utilities/dataForm.service';
import { PersonalInformationService } from 'src/app/service/personal-information/personal-information.service';


declare var $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public typeRoleUser: string;
  public dataTableResult: Array<any> = [];

  public isSubmitted = false;
  public isLoadding = true;
  public searchForm = this.fb.group({
    rut: ['']
  });

  public modalBloqueoDescription: string = '';

  public comboSelected = {
    campus:'Seleccionar Sede',
    period:'Seleccionar Periodo',
    typeOfBenefit:'Seleccionar Tipo de Beneficio',
  };

  public typeOfBenefitforTable: number;
  constructor(private fb: FormBuilder, 
    private searchService: SearchService, 
    private loadingService: LoadingService,
    private userService: UserService,
    private personalInformationService: PersonalInformationService,
    private dataFormService: DataFormService) { }

  ngOnInit() {
    setTimeout(() => {
       //this.searchForm.patchValue({rut:'17190472-2'});
    }, 2000);
  }
  
  get f() { return this.searchForm.controls; }
  public onSubmit() {
    this.isSubmitted = true;
    if (!this.searchForm.valid) {
      return;
    } else {
      if( this.searchForm.value.rut.length ){
        if(validationRut(this.searchForm.value.rut)){
          this.getStudentLocked();
          this.dataFormService.nextConstanciaPostulacion(false);
          //$('#buscarToggle').trigger('click');
        }else{
          this.searchForm.controls['rut'].setErrors({'incorrect': true});
        }
      }else{
        //this.getBeneficiarios();
        //$('#buscarToggle').trigger('click');
      }
      this.typeOfBenefitforTable = this.searchForm.value.searchType;
    }

  }
  //TODO
  private getStudentLocked() {
    const rutUnique = this.searchForm.value.rut === '' ? [-1]: this.searchForm.value.rut.split('-');
    this.loadingService.updateLoading(true);
    this.searchService.getPeriod().subscribe(
      (res: any)=>{
        this.dataFormService.setPeriod(res[0]);
        this.getDataStudent(rutUnique[0], res[0].PERI_CCOD);
        //this.getDataStudent(rutUnique[0], 226);
        this.loadingService.updateLoading(false);
      });
  }

  private getDataStudent(rut: string, peri_ccod: number){
    this.loadingService.updateLoading(true);
    this.searchService.getStudentLocked(rut, peri_ccod).subscribe(
      (res: any)=> {
        if (res[0].BLOQUEO === null || res[0].BLOQUEO === "") {
          this.getContinuidad(rut, peri_ccod);
        }
        else{
          this.loadingService.updateLoading(false);
          let Texto = res[0].BLOQUEO;
          Texto = Texto.toString().replace(/\\n/g, "<br>"); 
          this.modalBloqueoDescription = Texto;
          $('#ModalEstudianteBloqueado').modal('show');
          this.searchForm.patchValue({rut:''});
        }
      });
  }

  private getContinuidad(rut: string, peri_ccod: number){
    this.loadingService.updateLoading(true);
    this.searchService.checkPlan(rut).subscribe(
      (res: any)=> {
        this.loadingService.updateLoading(false);
        if (res[0].CONTINUIDAD === 1) {
          this.getDatosPostulante(rut, peri_ccod);
          //this.getEstadoPostulacion(rut, peri_ccod); 
        } else { 
          //TODO REVISAR CON LPG
          //this.modalBloqueoDescription = res[0].Texto;
          $('#ModalProgramaArt68').modal('show');
        }
        
      }
    );
  }

  private getDatosPostulante(rut: string, peri_ccod: number){
    this.loadingService.updateLoading(true);
    //this.getDatosPostulante(rut, peri_ccod);
    this.searchService.getDatosPostulante(rut, peri_ccod).subscribe(
      (res: any)=> {
        if(!res.length) {
          this.loadingService.updateLoading(false);
          $('#ModalErrorDatosAlumno').modal({backdrop: 'static', keyboard: false});
          $('#ModalErrorDatosAlumno').modal('show');
        }
        else {
          this.getEstadoPostulacion(rut, peri_ccod);
        }

      }
    );
  }

  private getPostulacion(rut: string, peri_ccod: number){
    this.loadingService.updateLoading(true);
    this.getEstadoPostulacion(rut, peri_ccod);
    this.searchService.getEstadoPostulacion(rut, peri_ccod).subscribe(
      (res: any)=> {
      }
    );
  }

  private getEstadoPostulacion(rut: string, peri_ccod: number){
    this.loadingService.updateLoading(true);
    this.searchService.getEstadoPostulacion(rut, peri_ccod).subscribe(
      (res: any)=> {
        if(!res.length){
          // this.getPersNcorr(rut, peri_ccod);
          this.getDatosSalidaIntermedia(rut, peri_ccod);
        }else{
          if (res[0].EPOS_CCOD === 2) {
            this.loadingService.updateLoading(false);
            //this.getDatosPostulacion(res[0].POST_NCORR);
            this.obtenerDatosFupCerrado(res[0].POST_NCORR);
          } else if (res[0].EPOS_CCOD != 2) {
            this.loadingService.updateLoading(true);
            this.searchService.getApplicantInfo(res[0].POST_NCORR).subscribe(
              (res: any)=> {
                this.loadingService.updateLoading(false);
                this.dataFormService.setStudent(res[0]);
              }
            );
            $('#resultados').show();
          } else {
            $('#ModalEstudianteBloqueado').modal('show');
          }
          
        }
      }
    );
  }

  private getPersNcorr(rut, peri_ccod){
    this.searchService.getPersNcorr(rut).subscribe(
      (res: any)=> {
        this.loadingService.updateLoading(false);
        this.getDatosSalidaIntermedia(rut, peri_ccod);
      }
    );
  }

  private getDatosSalidaIntermedia(rut, peri_ccod){
    this.searchService.getDatosSalidaIntermedia(rut, peri_ccod).subscribe(
      (res: any)=> {
        this.loadingService.updateLoading(false);
        const dv = this.searchForm.controls.rut.value.split('-')[1];
        const user: studentInterface = {
          ...res[0],
          RUT: rut,
          DV: dv
        }
        this.dataFormService.setStudent(user);
      }
    );
  }

  private getDatosPostulacion(i_post_ncorr){
    this.loadingService.updateLoading(true);
    this.personalInformationService.getDatosPostulacion(i_post_ncorr).subscribe(
      res=>{
        this.loadingService.updateLoading(false);
        this.dataFormService.nextConstanciaPostulacion(true);
        this.dataFormService.dataConstanciaPostulacion = res[0];
      }
    );
  }

  private obtenerDatosFupCerrado(i_post_ncorr){
    this.loadingService.updateLoading(true);
    this.searchService.obtenerDatosFupCerrado(i_post_ncorr).subscribe(
      res=>{
        this.loadingService.updateLoading(false);
        if(!res.length){
          this.cierraPostulacionArt68(i_post_ncorr);
        }
        else {
          console.log('res',res);
          this.dataFormService.nextConstanciaPostulacion(true);
          this.dataFormService.dataConstanciaPostulacion = res[0];
        }
      }
    );
  }

  private cierraPostulacionArt68(i_post_ncorr){
    this.personalInformationService.cierraPostulacionArt68(i_post_ncorr).subscribe(
      res=> {
        this.loadingService.updateLoading(false);
        if(res[0].RESULTADO === 'CERRADA'){
          this.obtenerDatosFupCerrado(i_post_ncorr);
        }
        else if((res[0].RESULTADO).match('ERROR')){
          $('#ModalError').modal({backdrop: 'static', keyboard: false});
          $('#ModalError').modal('show');
        }
      }
    );
  }
  
}
