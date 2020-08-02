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
    private dataFormService: DataFormService) { }

  ngOnInit() {
    setTimeout(() => {
       this.searchForm.patchValue({rut:'17190472-2'});
    }, 2000);
  }

  /**
   * keyupRut: when you press the enter in the input rut
   *
  public keyupRut(rut): boolean {
    return validationRut(rut);
  }*/
  // convenience getter for easy access to form fields
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
        this.getDataStudent(rutUnique[0], res[0].PERI_CCOD);
      });
  }

  private getDataStudent(rut: string, peri_ccod: number){
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

  private getApplyStatus(rut: string, peri_ccod: number){
    this.searchService.getApplyStatus(rut, peri_ccod).subscribe(
      (res: any)=> {
        if (res[0].EPOS_CCOD.length === 2) {
        } else if (res[0].EPOS_CCOD.length != 2) {
          this.searchService.getApplicantInfo(res[0].POST_NCORR).subscribe(
            (res: any)=> {
              this.loadingService.updateLoading(false);
              this.dataFormService.setStudent(res);
            }
          );
          this.loadingService.updateLoading(false);
          $('#resultados').show();
        } else {
          $('#ModalEstudianteBloqueado').modal('show');
        }
      }
    );
  }
}
