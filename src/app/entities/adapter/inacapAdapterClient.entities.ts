import { ClienteInterface } from '../interfaces';

export class InacapHistoryClientAdapterCliente implements ClienteInterface {
    rut = '';
    nomRazonSocial = '';
    clasificacion = '';
    giro = '';
    direccion = '';
    numDireccion = '';
    codPostal = '';
    region = '';
    comuna = '';
    contactoComercial = '';
    telefono = '';
    correo = '';
    banco = '';
    tipoCuentaBanco = '';
    numCuentaBanco = '';
    registradoPor = '';
    fechaRegistro = '';

    constructor(jsonData: any) {
        this.rut = this.checkNull(jsonData.RUT);
        this.nomRazonSocial = this.checkNull(jsonData.PERS_TRAZON_SOCIAL);
        this.clasificacion = this.checkNull(jsonData.CLAS_TDESC);
        this.giro = this.checkNull(jsonData.PERS_TGIRO);
        this.direccion = this.checkNull(jsonData.DIRE_TCALLE);
        this.numDireccion = this.checkNull(jsonData.DIRE_TNRO);
        this.codPostal = this.checkNull(jsonData.DIRE_CPOSTAL);
        this.region = this.checkNull(jsonData.REGI_TDESC);
        this.comuna = this.checkNull(jsonData.CIUD_TDESC);
        this.contactoComercial = this.checkNull(jsonData.CONTACTO_COMERCIAL);
        this.telefono = this.checkNull(jsonData.PERS_TFONO);
        this.correo = this.checkNull(jsonData.PERS_TEMAIL);
        this.banco = this.checkNull(jsonData.BANC_TDESC);
        this.tipoCuentaBanco = this.checkNull(jsonData.COD_TIPO_CUENTA);
        this.numCuentaBanco = this.checkNull(jsonData.NUMERO_CUENTA);
        this.registradoPor = this.checkNull(jsonData.USUARIO);
        this.fechaRegistro = this.checkNull(jsonData.FECHA_REGISTRO);
    }
    private checkNull(value): string {
        if (value === null) {
          return '';
        }
        return value;
    }
}