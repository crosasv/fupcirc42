export interface CustomerRegistrationInterface {
    rut: string;
    nomRazonSocial: string;
    clasificacion: string;
    giro: string;
    direccion: string;
    numDireccion: string;
    codPostal: string;
    region: string;
    comuna: string;
    contactoComercial: string;
    telefono: string;
    correo: string;
    banco: string;
    tipoCuentaBanco: string;
    numCuentaBanco: string;
}
export interface ClienteInterface extends CustomerRegistrationInterface {
    rut: string;
    nomRazonSocial: string;
    clasificacion: string;
    giro: string;
    direccion: string;
    numDireccion: string;
    codPostal: string;
    region: string;
    comuna: string;
    contactoComercial: string;
    telefono: string;
    correo: string;
    banco: string;
    tipoCuentaBanco: string;
    numCuentaBanco: string;
    registradoPor: string;
    fechaRegistro: string;
}

export interface GiroInterface {
    CODIGO: string;
    PERS_TGIRO: string;
}
export interface ClasificacionInterface {
    CLAS_CCOD: string;
    CLAS_TDESC: string;
}
export interface RegionesInterface {
    REGI_CCOD: string;
    REGI_TDESC: string;
}
export interface BancoInterface {
    BANC_CCOD: string;
    BANC_TDESC: string;
}
export interface TipoCuentaBancoInterface {
    CODIGO: string;
    DESCRIPCION: string;
}
export interface ComunaInterface {
    CIUD_CCOD: string;
    CIUD_TCOMUNA: string;
}

export interface ClienteAdapterInterface {
    QueryString?: string;
    iaudiTusuario?: string;
    iPersNrut: string;
    iPersXdv: string;
    iPersTrazonSocial: string;
    iClasCcod: string;
    iGiro: string;
    iDireTcalle: string;
    iDiretNro: string;
    iDireTcodPostal: string;
    iRegiCcod: string;
    iciudCcod: string;
    iContacto: string;
    iTelefono: string;
    iCorreo: string;
    iBancCcod: string;
    iTcueCcod: string;
    InroCuenta: string;
}

export interface studentInterface {
    RUT: string;
    NOMBRE: string;
    POST_NCORR: number;
    SEDE_CCOD: number;
    SEDE_TDESC: string;
    CARR_CCOD: string;
    CARR_TDESC: string;
    ESPE_CCOD: string;
    ESPE_TDESC: string;
    JORN_CCOD: number;
    JORN_TDESC: string;
    PERS_NCORR: number;
}

export interface basicInterface {
    PERI_CCOD: number;
    TAPE_CCOD: number;
    PERI_TDESC: string;
    ANOS_CCOD: number;
}

export interface Sede {
    SEDE_CCOD: number;
    SEDE_TDESC: string;
}

export interface JornadaPostulacion {
    JORN_CCOD: number;
    JORN_TDESC: string;
    OFER_NCORR: string;
}

export interface CarreraPostulacion {
    CARR_CCOD: number;
    CARR_TDESC: string;
}

export interface Especialidad {
    ESPE_CCOD: string;
    ESPE_TDESC: string;
}

export interface PeriodoAcademico{
    PERI_CCOD: number;
    TAPE_CCOD: number;
    PERI_TDESC: string;
    ANOS_CCOD: number;
}

export interface PeriodoAcademico{
    PERI_CCOD: number;
    TAPE_CCOD: number;
    PERI_TDESC: string;
    ANOS_CCOD: number;
}

export interface raceFeature {
    TTIT_TDESC: string;
    ESPE_TTITULO: string;
    ESPE_NDURACION: string;
}

export interface PersonalInformation{
    CIUD_CCOD: number;
    CIUD_TCOMUNA: string;
    CIUD_TDESC: string;
    DIRE_TBLOCK: number | string;
    DIRE_TCALLE: string;
    DIRE_TCELULAR: string;
    DIRE_TDEPTO: string;
    DIRE_TFONO: number | string;
    DIRE_TNRO: string;
    DIRE_TPOBLACION: number | string;
    ECIV_CCOD: number;
    ECIV_TDESC: string;
    OCUP_CCOD: number | string;
    OCUP_TDESC: number | string;
    PAIS_CCOD: number;
    PAIS_TDESC: string;
    PERS_FNACIMIENTO: string;
    PERS_TAPE_MATERNO: string;
    PERS_TAPE_PATERNO: string;
    PERS_TEMAIL: string;
    PERS_TNOMBRE: string;
    REGI_CCOD: number;
    REGI_TDESC: string;
    RUT: string;
    SEXO_CCOD: number;
    SEXO_TDESC: string;
    TDIR_CCOD: number;
}