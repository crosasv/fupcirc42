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
       this.searchForm.patchValue({rut:'17190472-2'});
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
        this.loadingService.updateLoading(false);
      });
  }

  private getDataStudent(rut: string, peri_ccod: number){
    this.loadingService.updateLoading(true);
    this.searchService.getStudentLocked(rut, peri_ccod).subscribe(
      (res: any)=> {
        if (res[0].BLOQUEO !== null) {
          this.loadingService.updateLoading(false);
          $('#ModalEstudianteBloqueado').modal('show');
          this.searchForm.patchValue({rut:''});
        }else{
          this.getContinuidad(rut, peri_ccod);
        }
      });
  }

  private getContinuidad(rut: string, peri_ccod: number){
    this.loadingService.updateLoading(true);
    this.searchService.checkPlan(rut).subscribe(
      (res: any)=> {
        if (res[0].CONTINUIDAD === 1) {
          this.getApplyStatus(rut, peri_ccod); 
        } else { 
          this.modalBloqueoDescription = res[0].Texto;
          $('#ModalEstudianteBloqueado').modal('show');
          this.loadingService.updateLoading(false);
        }
        
      }
    );
  }

  private getPostulacion(rut: string, peri_ccod: number){
    this.loadingService.updateLoading(true);
    this.getApplyStatus(rut, peri_ccod);
    this.searchService.getApplyStatus(rut, peri_ccod).subscribe(
      (res: any)=> {
      }
    );
  }

  private getApplyStatus(rut: string, peri_ccod: number){
    this.loadingService.updateLoading(true);
    this.searchService.getApplyStatus(rut, peri_ccod).subscribe(
      (res: any)=> {
        this.loadingService.updateLoading(false);
        if (res[0].EPOS_CCOD === 2) {
          this.dataFormService.nextConstanciaPostulacion(true);
          this.getDatosPostulacion(res[0].POST_NCORR);
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
    );
  }

  private getDatosPostulacion(i_post_ncorr){
    this.loadingService.updateLoading(true);
    this.personalInformationService.getDatosPostulacion(i_post_ncorr).subscribe(
      res=>{
        this.loadingService.updateLoading(false);
        this.dataFormService.nextConstanciaPostulacion(true);
        this.dataFormService.dataConstanciaPostulacion = res[0];
        // TODO res to constacia postulacin
        console.log('ressssssss : getDatosPostulacion', res)
      }
    );
  }
}
