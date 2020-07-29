import { CustomerRegistrationInterface, ClienteInterface, ClienteAdapterInterface } from './interfaces';
import { ClienteInacapInterface } from './interface-Inacap/interface';

export class CustomerRegistrationEntitie implements CustomerRegistrationInterface {
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

    constructor() {
        this.rut = '';
        this.nomRazonSocial = '';
        this.clasificacion = '';
        this.giro = '';
        this.direccion = '';
        this.numDireccion = '';
        this.codPostal = '';
        this.region = '';
        this.comuna = '';
        this.contactoComercial = '';
        this.telefono = '';
        this.correo = '';
        this.banco = '';
        this.tipoCuentaBanco = '';
        this.numCuentaBanco = '';
    }
}

export class ClienteEntitie implements ClienteInterface {
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
        this.rut = jsonData.rut;
        this.nomRazonSocial = jsonData.nomRazonSocial;
        this.clasificacion = jsonData.clasificacion;
        this.giro = jsonData.giro;
        this.direccion = jsonData.direccion;
        this.numDireccion = jsonData.numDireccion;
        this.codPostal = jsonData.codPostal;
        this.region = jsonData.region;
        this.comuna = jsonData.comuna;
        this.contactoComercial = jsonData.contactoComercial;
        this.telefono = jsonData.telefono;
        this.correo = jsonData.correo;
        this.banco = jsonData.banco;
        this.tipoCuentaBanco = jsonData.tipoCuentaBanco;
        this.numCuentaBanco = jsonData.numCuentaBanco;
        this.registradoPor = jsonData.registradoPor;
        this.fechaRegistro = jsonData.fechaRegistro;
    }
}
export class ClienteAdapter implements ClienteAdapterInterface {
    QueryString = '';
    iaudiTusuario = '';
    iPersNrut = '';
    iPersXdv = '';
    iPersTrazonSocial = '';
    iClasCcod = '';
    iGiro = '';
    iDireTcalle = '';
    iDiretNro = '';
    iDireTcodPostal = '';
    iRegiCcod = '';
    iciudCcod = '';
    iContacto = '';
    iTelefono = '';
    iCorreo = '';
    iBancCcod = '';
    iTcueCcod = '';
    InroCuenta = '';

    constructor(jsonData: CustomerRegistrationInterface, cookieValueQueryString: string, rutUserLogged: string) {
        const rut = (jsonData.rut.split('-')[0]).replace(/\./g,'');
        this.QueryString = cookieValueQueryString.toString();
        this.iaudiTusuario = rutUserLogged.toString();
        this.iPersNrut = rut;
        this.iPersXdv = jsonData.rut.split('-')[1];
        this.iPersTrazonSocial = jsonData.nomRazonSocial.toString();
        this.iClasCcod = jsonData.clasificacion.toString();
        this.iGiro = jsonData.giro.toString();
        this.iDireTcalle = jsonData.direccion.toString();
        this.iDiretNro = jsonData.numDireccion.toString();;
        this.iDireTcodPostal = jsonData.codPostal.toString();
        this.iRegiCcod = jsonData.region.toString();
        this.iciudCcod = jsonData.comuna.toString();
        this.iContacto = jsonData.contactoComercial.toString();
        this.iTelefono = jsonData.telefono.toString();
        this.iCorreo = jsonData.correo.toString();
        this.iBancCcod = jsonData.banco.toString()=== '-1'?'':jsonData.banco.toString();
        this.iTcueCcod = jsonData.tipoCuentaBanco.toString()=== '-1'?'':jsonData.tipoCuentaBanco.toString();
        this.InroCuenta = jsonData.numCuentaBanco.toString();
    }
}
export class ClienteInacapAdapterCliente implements CustomerRegistrationInterface {
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
    constructor(jsonData: ClienteInacapInterface ) {
        this.rut = `${this.checkNull(jsonData.PERS_NRUT)}-${this.checkNull(jsonData.PERS_XDV)}`;
        this.nomRazonSocial = this.checkNull(jsonData.PERS_TRAZON_SOCIAL);
        this.clasificacion = '';
        this.giro = '';
        this.region = '';
        this.comuna = '';
        this.banco = '';
        this.tipoCuentaBanco = '';
        this.numCuentaBanco = '';
        this.registradoPor = '';
        this.direccion = this.checkNull(jsonData.DIRE_TCALLE);
        this.numDireccion = this.checkNull(jsonData.DIRE_TNRO);
        this.codPostal = this.checkNull(jsonData.DIRE_CPOSTAL);
        this.contactoComercial = this.checkNull(jsonData.CONTACTO_COMERCIAL);
        this.telefono = this.checkNull(jsonData.PERS_TFONO);
        this.correo = this.checkNull(jsonData.PERS_TEMAIL);
        this.fechaRegistro = '';

        /** estos dos parametros var funcionalidad */
        // PERS_XDV: string;
        // RUT: string;
        // this.region = this.checkNull(jsonData.REGI_CCOD);
        // this.comuna = this.checkNull(jsonData.CIUD_CCOD);
        // this.tipoCuentaBanco = this.checkNull(jsonData.TIPO_CUENTA);
        // this.banco = this.checkNull(jsonData.BANC_CCOD);
        // this.numCuentaBanco = this.checkNull(jsonData.NUMERO_CUENTA);
        // this.registradoPor = this.checkNull(jsonData.PERS_NCORR);
    }

    private checkNull(value): string {
        if (value === null) {
          return '';
        }
        return value;
    }
}

