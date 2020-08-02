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


declare var $: any;
@Component({
  selector: 'app-search-old',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponentOld implements OnInit {
  @Input() dataForm: any;//{Array<SelectOptionsBase>}
  @Input() dataUser: UserInterface;
  @Input() dataStudent: studentInterface;
  @Input() dataBasic: basicInterface;

  public typeRoleUser: string;
  public dataTableResult: Array<any> = [];

  public isSubmitted = false;
  public isLoadding = true;
  public searchForm = this.fb.group({
    rut: ['']
  });

  public comboSelected = {
    campus:'Seleccionar Sede',
    period:'Seleccionar Periodo',
    typeOfBenefit:'Seleccionar Tipo de Beneficio',
  };

  public typeOfBenefitforTable: number;
  constructor(private fb: FormBuilder, 
    private searchService: SearchService, 
    private loadingService: LoadingService,
    private userService: UserService) { }

  ngOnInit() {
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
  private getCaja(body) {
    this.loadingService.updateLoading(true);
    this.searchService.getCaja(body).subscribe(
      (res: Array<SelectOptionsBase>)=>{     
        this.loadingService.updateLoading(false);
        this.dataForm.Caja = res;
      }
    )
  }
  //TODO
  private getStudentLocked() {
    const rutUnique = this.searchForm.value.rut === '' ? [-1]: this.searchForm.value.rut.split('-');
    this.loadingService.updateLoading(true);
    this.searchService.getPeriod().subscribe(
      (res: any)=>{     
        const rez = JSON.parse(res);
        debugger
        this.dataBasic = rez;
        this.searchService.getStudentLocked(rutUnique[0],rez[0].PERI_CCOD).subscribe(
          (res: any)=> {
            const rex = JSON.parse(res)
            //console.log('rex', rex);
            if (rex[0].BLOQUEO) {
              this.loadingService.updateLoading(false);
              $('#ModalEstudianteBloqueado').modal('show');
            }
            else {
              this.searchService.checkPlan(rutUnique[0]).subscribe(
                (res: any)=> {
                  const rey = JSON.parse(res);
                  if (Math.trunc(rey[0].CONTINUIDAD) === 1) {
                    this.searchService.getApplyStatus(rutUnique[0],rez[0].PERI_CCOD).subscribe(
                      (res: any)=> {
                        const rew = JSON.parse(res);
                        if (rew[0].EPOS_CCOD.length === 2) { //evaluar con vacío
                          //cerrado
                          //div que está cerrado
                        } else if (rew[0].EPOS_CCOD.length != 2) {
                          //pendiente
                          this.searchService.getApplicantInfo(rew[0].POST_NCORR).subscribe(
                            (res: any)=> {
                              this.loadingService.updateLoading(false);
                              const rz = JSON.parse(res);
                              this.dataStudent = rz;
                              //console.log('datastudent', this.dataStudent)
                              //console.log('nombre',this.dataStudent[0].NOMBRE);

                              //Llega hasta aquí donde se supone que se cargan los combobox de sede y varios que se ven en la maqueta
                            }
                          );
                          this.loadingService.updateLoading(false);
                          $('#resultados').show();
                        } else {
                          //no trae datos
                          $('#ModalEstudianteBloqueado').modal('show');
                        }
                      }
                    );
                    
                  } else { 
                    $('#ModalEstudianteBloqueado').modal('show');
                  }
                  
                }
              );
            }
          }
        )
        }
    )
  }


  public selectedInCombo(){
    if(this.searchForm.value.campus !== '' && this.searchForm.value.period !== ''){
      const body = {
        i_sede_ccod:this.searchForm.value.campus,
        i_peri_ccod:this.searchForm.value.period
      };
      this.getCaja(body);
    }
  }



  private getBeneficiarios(){
    this.clearCheckbox();
    const rutUnique = this.searchForm.value.rut === '' ? [-1]: this.searchForm.value.rut.split('-');
    this.loadingService.updateLoading(true);
    $('#TablaResultadosT').DataTable().destroy();
    $('#TablaResultadosE').DataTable().destroy();
    $('#TablaResultados').DataTable().destroy();
    if (this.searchForm.value.searchType === 3) {
      const campus = this.searchForm.value.campus === 'null'?-1:this.searchForm.value.campus;
      const body = `i_peri_ccod=${this.searchForm.value.period}&i_sede_ccod=${campus}`
      this.searchService.getMalAsignados(body).subscribe(
        res =>{
          this.dataTableResult = res;
          setTimeout(() => {
            this.loadingService.updateLoading(false);
            $('#resultados').show();
            $('#TablaResultadosE').DataTable();
            $('select[name="TablaResultados_length"]').materialSelect();          
          }, 250);
        }
      )   
    } else {
      if (this.searchForm.value.searchType === 1) {
        this.getRolesUsuario('SELECT');
        const campus = this.searchForm.value.campus === 'null'?-1:this.searchForm.value.campus;
        const body = `i_mcaj_ncorr=${this.searchForm.value.caja}&i_peri_ccod=${this.searchForm.value.period}`
        //console.log('body', body);
        this.searchService.getBeneficiados(body).subscribe(
          res =>{
            this.loadingService.updateLoading(false);
            this.dataTableResult = res;
            this.clearCheckbox();           
            setTimeout(() => {
              $('#resultados').show();
              $('#TablaResultados').DataTable();
              $('select[name="TablaResultados_length"]').materialSelect();          
            }, 250);
          }
        )   
      }else{
        this.getRolesUsuario('UPDATE');
        const body = [
          `i_tipo_beneficio=${this.searchForm.value.typeOfBenefit}`,
          `i_sede_ccod=${this.searchForm.value.campus}`,
          `i_pers_nrut_alumno=${rutUnique[0]}`,
          `i_peri_ccod=${this.searchForm.value.period}`
        ];
        this.searchService.getBeneficiarios(body.join('&')).subscribe(
          res =>{
            this.dataTableResult = res;
            setTimeout(() => {
              this.loadingService.updateLoading(false);
              this.clearCheckbox();
              $('#resultados').show();
              $('#TablaResultadosT').DataTable();
              $('select[name="TablaResultados_length"]').materialSelect();          
            }, 800);
          }
        );

      }   
    }


  }

  private clearCheckbox() {
    const checkboxs = document.querySelectorAll('.form-check-input');
    checkboxs.forEach((e) => {
      const checkbox = e as HTMLInputElement;
      checkbox.checked = false 
    });
  }
  
  private getRolesUsuario(type: string){
    // this.userService.getRolesUsuario(`${this.dataUser.pers_nrut}`,type).subscribe(
    //   res =>{
    //     this.typeRoleUser = res;
    //   }
    // )
  }

  public refreshTable(event){
    if(event){
      this.getBeneficiarios();
    }
  }

  public dropSelect(typeSelect: string, elementFromSelect: SelectOptionsBase){
    this.comboSelected[typeSelect] = elementFromSelect.descripcion;
    this.searchForm.controls[typeSelect].setValue(elementFromSelect.codigo);
    if(typeSelect === 'campus' || typeSelect === 'period'){this.selectedInCombo()}
  }

}
