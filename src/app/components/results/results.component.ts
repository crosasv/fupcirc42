import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { validationRut } from 'src/app/service/utilities/validateRut';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectOptionsBase } from 'src/app/service/search/searchForm.interface';
import { SearchService } from 'src/app/service/search/search.service';
import { NumberSymbol } from '@angular/common';
import { LoadingService } from 'src/app/service/utilities/loading.service';
import { UserInterface } from 'src/app/service/user/user.interface';
import { studentInterface, basicInterface } from 'src/app/entities/interfaces';

declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input() dataForm: any;//{Array<SelectOptionsBase>}
  @Input() dataTable: Array<any> = [];
  @Input() typeOfBenefit: string;
  @Output() refreshTable = new EventEmitter<boolean>();
  @Input() period: number;
  @Input() caja: number;
  @Input() campus: number;
  @Input() type: number;
  @Input() typeRoleUser: string;
  @Input() dataUser: UserInterface;
  @Input() dataStudent: studentInterface;
  @Input() dataBasic: basicInterface;


  public nothingWorks = true;

  //FUP
  public dataFormSearch = {
    campus: [],
    typeOfBenefits: [],
    periods: [],
    searchTypes: [],
  };

  public comboSelected = {
    campus:'Seleccionar Sede',
  };
  
  public isEmpty: boolean;

  isChecked = false;
  isCheckedRow = [];

  private isSubmitted = false;
  public isLoadding = true;
  private dataSelectedInTable: Array<{num_matricula, tipo_benef}> = [];
  constructor(private searchService: SearchService,
    private loadingService: LoadingService) { }

  ngOnInit() {
    //this.getCampus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataTable && changes.dataTable.currentValue) {
      this.isEmpty =  this.dataTable.length ? true:false;
      this.dataTable.forEach(element => {
        this.isCheckedRow.push(false);
      });
    }
    if(changes.type && changes.type.currentValue){
       //$('#resultados').hide();
    }
  }

/*   private getCampus() {
    this.searchService.getCampus().subscribe(
      (res:Array<any>) => {
        this.dataForm.campus = res;
      }
    );
  } */

  asignarBeneficios(){
    this.loadingService.updateLoading(true)
    this.dataSelectedInTable.forEach((element, index) => {
      const body = `num_matricula=${element.num_matricula}&tipo_benef=${element.tipo_benef}&audi_tusuario=${this.dataUser.pers_nrut}`;
      this.searchService.asignarBeneficios(body).subscribe(
        res =>{
          const bodyBenef = `matr_ncorr=${element.num_matricula}`;
          this.loadingService.updateLoading(false);
          const response = `Se asign&oacute; con &eacute;xito el beneficio a matricula : ${element.num_matricula}.`;
          toastr.success(response);
          if(index === (this.dataSelectedInTable.length - 1 )) this.refreshTable.emit(true)
        },
        err =>{
          const response = `Se produjo un error por inconsistencia de datos, Matricula : ${element.num_matricula}`;
          toastr.error(response);
          this.refreshTable.emit(true)
        }
      )
    });
  }
  selectedCheckbox(index){
    this.isCheckedRow[index] = !this.isCheckedRow[index];
    const checkedList = this.isCheckedRow.filter(c=>{return c ===true;});
    this.isChecked = this.dataTable.length === checkedList.length ? true : false;
    if( this.isCheckedRow[index] ){
      this.dataSelectedInTable.push({num_matricula:this.dataTable[index].MATR_NCORR, tipo_benef:`T${this.typeOfBenefit}`});
    }else {
      const exist =  this.dataSelectedInTable.indexOf({num_matricula:this.dataTable[index].MATR_NCORR, tipo_benef:`T${this.typeOfBenefit}`})
      this.dataSelectedInTable.splice(exist,1)
    }
  }
  public selectedAll(isChecked){
    this.isChecked = !this.isChecked;
    if(this.isChecked){
      this.dataTable.forEach((element, index) => {
        const row = {num_matricula:element.MATR_NCORR, tipo_benef:`T${this.typeOfBenefit}`};
        const exist = this.dataSelectedInTable.find(d=>{return d === row});
        if(exist !== undefined){
          this.dataSelectedInTable.push({num_matricula:element.MATR_NCORR, tipo_benef:`T${this.typeOfBenefit}`})
        }
        this.isCheckedRow[index] = true;
      });
    }else{
      this.dataSelectedInTable = [];
      this.isCheckedRow=[]
    }
    //console.log('this.dataSelectedInTable',this.dataSelectedInTable)
  }

  

  public downloadExcel(){
    const body = `i_mcaj_ncorr=${this.caja}&i_peri_ccod=${this.period}`
    //const body = `i_mcaj_ncorr=1196204&i_peri_ccod=174`
    this.searchService.downloadExcel(body);
  }

  public asignarBeneficiosAll(){
    this.selectedAll(true);
    const body = `i_peri_ccod=${this.period}&i_sede_ccod=${this.campus}`;
    this.loadingService.updateLoading(true);
    this.searchService.asignarBeneficiosAll(body).subscribe(
      res =>{
        this.loadingService.updateLoading(false);
        const response = `${res[0].RESMENSAJE} .`;
        toastr.success(response);
        this.refreshTable.emit(true)
      }
    )
  }

  public someCheckIsSelected():boolean{
    return this.isCheckedRow.some(elem => elem === true);
  }
}
