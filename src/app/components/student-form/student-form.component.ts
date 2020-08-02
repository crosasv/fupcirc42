import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/service/utilities/loading.service';
import { DataFormService } from 'src/app/service/utilities/dataForm.service';
import { Observable } from 'rxjs';
import { ComboBoxService } from 'src/app/service/comboBox/comboBox.service';
import { studentInterface, Sede } from 'src/app/entities/interfaces';

declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  private studient$: Observable<{}>

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

  constructor(private comboBoxService: ComboBoxService,
    private loadingService: LoadingService,
    private dataFormService: DataFormService) { 
      this.studient$ = this.dataFormService.getStudent();
    }

  ngOnInit() {
    this.studient$.subscribe(
      (res: studentInterface[]) => {
        if(res.length){
          this.studentValueForDefault = res[0];
          this.loadData();
          console.log('studient$studient$studient$',res)
          
        }
      }
    )
  }


  public dropSelectSedes(typeDrop: string, selectedElement: Sede){
    console.log('typeDrop',typeDrop);
    console.log('selectedElement',selectedElement);
    this.comboSelected.sede = selectedElement.SEDE_TDESC;
    this.getCboSedes(selectedElement.SEDE_CCOD, this.studentValueForDefault.CARR_CCOD, this.studentValueForDefault.ESPE_CCOD)
  }

  public dropSelect(typeDrop: string, selectedElement: Sede){
    this.comboSelected[typeDrop] = selectedElement.SEDE_TDESC;
  }
  public dropSelectCarrera(selectedElement: any){
    this.comboSelected.carreraPostulacion = selectedElement.CARR_TDESC;
  }

  private loadData(){
    this.getCboSedes(this.studentValueForDefault.SEDE_CCOD, this.studentValueForDefault.CARR_CCOD, this.studentValueForDefault.ESPE_CCOD);
  }

  private getCboSedes(SEDE_CCOD, CARR_CCOD , ESPE_CCOD){
    this.loadingService.updateLoading(true);
    this.comboBoxService.getCboSedes().subscribe(
      (res: any)=>{
        this.dataCombo.sede = res;
        // this.studentValueForDefault[0].SEDE_CCOD = 10;
        this.getCboCarreras(SEDE_CCOD);
        this.getCboEspecialidad(SEDE_CCOD, CARR_CCOD);
        this.getCboJornada(SEDE_CCOD, ESPE_CCOD);
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

}
