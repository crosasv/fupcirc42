import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from 'src/app/service/utilities/loading.service';
import { DataFormService } from 'src/app/service/utilities/dataForm.service';
import { Observable } from 'rxjs';
import { ComboBoxService } from 'src/app/service/comboBox/comboBox.service';
import { studentInterface, PersonalInformation, Sexo, Ocupacion, EstadoCivil, Pais, Region, Ciudad } from 'src/app/entities/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonalInformationService } from 'src/app/service/personal-information/personal-information.service';
import { UserInterface } from 'src/app/service/user/user.interface';

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
  @Input() dataUser: UserInterface;

  public personalForm: FormGroup;

  public paisCombo: Pais[] = [];
  public estadoCivilCombo: EstadoCivil[] = [];
  public sexoCombo: Sexo[] = [];
  public ocupacionCombo: Ocupacion[] = [];
  public regionCombo: Region[] = [];
  public ciudadCombo: Ciudad[] = [];
  public comunaCombo = [];

  public isSubmitted = false;

  constructor(
    private personalInformationService: PersonalInformationService,
    private loadingService: LoadingService,
    public fb: FormBuilder,
    private dataFormService: DataFormService
  ){
    this.personalForm = this.structureForm();
  }

  ngOnInit(){
    this.loadData();
    this.viewComboPais();
  }

  public aceptModal(event){
    const rowForm = this.personalForm.getRawValue();
    const dataFormat = this.formtDataForEndpoint(rowForm);
    console.log('dataFromat', dataFormat);
    this.personalInformationService.insDatosPostulante(dataFormat).subscribe(
      res=>{
        this.dataFormService.nextConstanciaPostulacion(true);
      }
    )
    const i_pers_ncorr= this.studentValueForDefault.PERS_NCORR;
    this.personalInformationService.cierraPostulacionArt68(i_pers_ncorr).subscribe(
      res=>{
        // TODO check this part
      }
    );
    const i_post_ncorr = this.studentValueForDefault.POST_NCORR;
    this.personalInformationService.getDatosPostulacion(i_post_ncorr).subscribe(
      res=>{
        // TODO res to constacia postulacin
        console.log('ressssssss : getDatosPostulacion', res)
      }
    );
  }

  public onSubmit(){
    this.isSubmitted = true;
    if (!this.personalForm.valid) {
      return false;
    } else {
      $('#ModalConfirmacion').modal('show')
      // alert(JSON.stringify(this.studentForm.value))
    } 
  }

  public dropSelected(type: string, value: Sexo | Ocupacion | EstadoCivil | Ciudad | Region | Pais, paramCod: string, paramDesc: string){
    const fieldCombo = `${type}_Combo`
    this.personalForm.patchValue({
      [type]: value[paramCod],
      [fieldCombo]: value[paramDesc]
    });
    if (type === 'i_region_ccod'){
      this.getCboCiudad(value[paramCod]);
    }
    console.log('sadas',this.personalForm.getRawValue())
  }
  public dropSelectedCiudad(ciudad: string){
    console.log('ciudad',ciudad)
    this.personalForm.patchValue({
      i_ciud_ccod: ciudad
    });
    const region = this.personalForm.controls.i_region_ccod.value;
    this.getCboComunas(String(region), ciudad);
  }

  private loadData(){
    this.getDatosPersonalesPostulante();
    this.getCboPais();
    this.getCboEstadoCivil();
    this.getCboSexo();
    this.getCboRegion();
    this.getCboOcupacion();
  }

  private getCboPais(){
    this.loadingService.updateLoading(true);
    this.personalInformationService.getCboPais().subscribe(
      (res)=>{
        this.loadingService.updateLoading(false);
        this.paisCombo = res
    })
    
  }
  private getCboEstadoCivil(){
    this.loadingService.updateLoading(true);
    this.personalInformationService.getCboEstadoCivil().subscribe(
      (res: EstadoCivil[])=>{
        this.loadingService.updateLoading(false);
        this.estadoCivilCombo = res
    })
    
  }
  private getCboSexo(){
    this.loadingService.updateLoading(true);
    this.personalInformationService.getCboSexo().subscribe(
      (res)=>{
        this.loadingService.updateLoading(false);
        this.sexoCombo = res
    })
  }
 
  private getCboRegion(){
    this.loadingService.updateLoading(true);
    this.personalInformationService.getCboRegion().subscribe(
      (res)=>{
        this.loadingService.updateLoading(false);
        this.regionCombo = res
    })
    
  }
  private getCboOcupacion(){
    this.loadingService.updateLoading(true);
    this.personalInformationService.getCboOcupacion().subscribe(
      (res: Ocupacion[])=>{
        this.loadingService.updateLoading(false);
        this.ocupacionCombo = res
    })
  } 

  private getCboCiudad(i_region_ccod: string){
    this.loadingService.updateLoading(true);
    this.personalInformationService.getCboCiudad(i_region_ccod).subscribe(
      (res)=>{
        this.loadingService.updateLoading(false);
        this.ciudadCombo = res
    });
  }

  private getCboComunas(i_region_ccod: string, i_ciud_tcomuna: string){
    this.loadingService.updateLoading(true);
    this.personalInformationService.getCboComunas(i_region_ccod, i_ciud_tcomuna).subscribe(
      (res)=>{
        this.loadingService.updateLoading(false);
        this.comunaCombo = res
    });
  }

  private getDatosPersonalesPostulante(){
    this.loadingService.updateLoading(true);
    this.personalInformationService.getDatosPersonalesPostulante(this.studentValueForDefault.PERS_NCORR).subscribe(
      (res: PersonalInformation[])=>{
        this.loadingService.updateLoading(false);
        this.setDefaultDataForm(res[0]);
    })
  }

  private setDefaultDataForm(datauser: PersonalInformation){
    const rutSplit = datauser.RUT.split('-');
    this.personalForm.patchValue({
      i_pers_tnombre: datauser.PERS_TNOMBRE,
      i_pers_tape_paterno: datauser.PERS_TAPE_PATERNO,
      i_pers_tape_materno: datauser.PERS_TAPE_MATERNO,
      i_pers_nrut: rutSplit[0],
      i_pers_xdv: rutSplit[1],
      i_sexo_ccod: datauser.SEXO_CCOD, // combo OK
      i_sexo_ccod_Combo: datauser.SEXO_TDESC,  // combo OK
      i_pers_fnacimiento: datauser.PERS_FNACIMIENTO, // no set
      i_eciv_ccod: datauser.ECIV_CCOD, // combo
      i_eciv_ccod_Combo: datauser.ECIV_TDESC, // combo
      i_ocup_ccod: datauser.OCUP_CCOD, // combo
      i_ocup_ccod_Combo: datauser.OCUP_TDESC, // combo
      i_pers_temail: datauser.PERS_TEMAIL,
      i_pais_ccod: datauser.PAIS_CCOD, // combo
      i_pais_ccod_Combo: datauser.PAIS_TDESC,

      i_region_ccod: datauser.REGI_CCOD,
      i_region_ccod_Combo: datauser.REGI_TDESC,
      i_ciud_ccod: datauser.CIUD_TCOMUNA,

      i_comuna_ccod: datauser.CIUD_CCOD,
      i_comuna_ccod_Combo: datauser.CIUD_TDESC,
      // i_ciud_ccod: datauser.,
      // comuna

      i_dire_tcalle: datauser.DIRE_TCALLE,
      i_dire_tnro: datauser.DIRE_TNRO,
      i_dire_tpoblacion: datauser.DIRE_TPOBLACION,
      i_dire_tblock: datauser.DIRE_TBLOCK,
      i_dire_tdepto: datauser.DIRE_TDEPTO,
      i_dire_tfono: datauser.DIRE_TFONO, // combo
      i_dire_tcelular: datauser.DIRE_TCELULAR,
      i_pers_ncorr: this.studentValueForDefault.PERS_NCORR,
      i_audi_tusuario: this.dataUser.pers_nrut
    });
    this.getCboCiudad(String(datauser.REGI_CCOD));
    console.log(this.personalForm.getRawValue())
  }

  private structureForm(){
    return this.fb.group({
      i_pers_tnombre: [''],
      i_pers_tape_paterno: [''],
      i_pers_tape_materno: [''],
      i_pers_nrut: [''],
      i_pers_xdv: [''],
      i_sexo_ccod: [''],
      i_sexo_ccod_Combo: [''],
      i_pers_fnacimiento: [''],
      i_eciv_ccod: [''],
      i_eciv_ccod_Combo: [''],
      i_ocup_ccod: [''],
      i_ocup_ccod_Combo: [''],
      i_pers_temail: [''],
      i_pais_ccod: [''],
      i_pais_ccod_Combo: [''],
    
      i_region_ccod: [''],
      i_region_ccod_Combo: [''],

      i_ciud_ccod: [''],

      i_comuna_ccod: [''],
      i_comuna_ccod_Combo: [''],
      
      i_dire_tcalle: [''],
      i_dire_tnro: [''],
      i_dire_tpoblacion: [''],
      i_dire_tblock: [''],
      i_dire_tdepto: [''],
      i_dire_tfono: [''],
      i_dire_tcelular: [''],
      
      i_pers_ncorr: [''],
      i_audi_tusuario: [''],
    })
  }

  private formtDataForEndpoint(row: any){
    const format = {
      ...row,
      i_ciud_ccod: row.i_comuna_ccod
    };
    delete format.i_comuna_ccod;
    delete format.i_sexo_ccod_Combo;
    delete format.i_eciv_ccod_Combo;
    delete format.i_ocup_ccod_Combo;
    delete format.i_pais_ccod_Combo;
    delete format.i_region_ccod_Combo;
    delete format.i_comuna_ccod_Combo;
    return format;
  }

  private viewComboPais(){
    $('#radio-extranjero').click(function() {
      if($('#radio-extranjero').is(':checked')) { 
        $('.nacionalidad-extranjera').removeClass('d-none');
      } 
    });
    $('#radio-chile').click(function() {
      if($('#radio-chile').is(':checked')) { 
        $('.nacionalidad-extranjera').addClass('d-none');
      } 
    });
  }
}
