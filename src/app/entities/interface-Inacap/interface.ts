export interface ClienteInacapInterface {
    PERS_NCORR: string;
    PERS_NRUT: string;
    PERS_XDV: string;
    RUT: string;
    PERS_TRAZON_SOCIAL: string;
    DIRE_TCALLE: string;
    DIRE_TNRO: string;
    REGI_CCOD: string;
    CIUD_CCOD: string;// CIUD_TCOMUNA: "ARICA"
    DIRE_CPOSTAL: string;
    CONTACTO_COMERCIAL: string;
    PERS_TFONO: string;
    PERS_TEMAIL: string;
    BANC_CCOD: string;
    TIPO_CUENTA: string;
    NUMERO_CUENTA: string;
}

export interface ClienteHistoryTableInterface {
    BANC_CCOD: string;
    BANC_TDESC: string;
    CIUD_CCOD: string;
    CIUD_TCOMUNA: string;
    CIUD_TDESC: string;
    CLAS_CCOD: string;
    CLAS_TDESC: string;
    COD_TIPO_CUENTA: string;
    CONTACTO_COMERCIAL: string;
    DIRE_CPOSTAL: string;
    DIRE_TCALLE: string;
    DIRE_TNRO: string;
    FECHA_REGISTRO: string;
    NUMERO_CUENTA: string;
    PERS_NCORR: string;
    PERS_NRUT: string;
    PERS_TEMAIL: string;
    PERS_TFONO: string;
    PERS_TGIRO: string;
    PERS_TRAZON_SOCIAL: string;
    PERS_XDV: string;
    REGI_CCOD: string;
    REGI_TDESC: string;
    RUT: string;
    TIPO_CUENTA: string;
    USUARIO: string;
}