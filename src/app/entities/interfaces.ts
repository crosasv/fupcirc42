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
