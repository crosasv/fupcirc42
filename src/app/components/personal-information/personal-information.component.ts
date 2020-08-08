import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from 'src/app/service/utilities/loading.service';
import { DataFormService } from 'src/app/service/utilities/dataForm.service';
import { Observable } from 'rxjs';
import { ComboBoxService } from 'src/app/service/comboBox/comboBox.service';
import { studentInterface, PersonalInformation, Sexo, Ocupacion, EstadoCivil, Pais, Region, Ciudad } from 'src/app/entities/interfaces';
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

  public paisCombo: Pais[] = [];
  public estadoCivilCombo: EstadoCivil[] = [];
  public sexoCombo: Sexo[] = [];
  public ocupacionCombo: Ocupacion[] = [];
  public regionCombo: Region[] = [];
  public ciudadCombo: Ciudad[] = [];
  public comunaCombo = [];

  constructor(
    private personalInformationService: PersonalInformationService,
    private loadingService: LoadingService,
    public fb: FormBuilder
  ){
    this.personalForm = this.structureForm();
  }

  ngOnInit(){
    this.loadData();
    this.viewComboPais();
  }

  public onSubmit(){
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
// CIUD_TDESC: "LAS CONDES"
// REGI_CCOD: 13
// REGI_TDESC: "REGIÓN METROPOLITANA"
// TDIR_CCOD: 1

// SEXO_CCOD: 2
// SEXO_TDESC: "FEMENINO"
// ECIV_CCOD: 1
// ECIV_TDESC: "SOLTERO"
// OCUP_CCOD: null
// OCUP_TDESC: null
// PAIS_CCOD: 1
// PAIS_TDESC: "CHILE"
// CIUD_CCOD: 1335
// CIUD_TCOMUNA: "SANTIAGO"
    const i_pers_xdv = datauser.RUT.split('-')[1];
    this.personalForm.patchValue({
      i_pers_tnombre: datauser.PERS_TNOMBRE,
      i_pers_tape_paterno: datauser.PERS_TAPE_PATERNO,
      i_pers_tape_materno: datauser.PERS_TAPE_MATERNO,
      i_pers_nrut: datauser.RUT,
      i_pers_xdv: i_pers_xdv,
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
      // i_ciud_ccod: datauser.,
      // comuna

      i_dire_tcalle: datauser.DIRE_TCALLE,
      i_dire_tnro: datauser.DIRE_TNRO,
      i_dire_tpoblacion: datauser.DIRE_TPOBLACION,
      i_dire_tblock: datauser.DIRE_TBLOCK,
      i_dire_tdepto: datauser.DIRE_TDEPTO,
      i_dire_tfono: datauser.DIRE_TFONO, // combo
      i_dire_tcelular: datauser.DIRE_TCELULAR,
      // i_pers_ncorr: datauser.,
      // i_audi_tusuario: datauser.,
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
