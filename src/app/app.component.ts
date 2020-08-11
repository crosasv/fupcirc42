import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { RegionesInterface,
  ComunaInterface,
  GiroInterface,
  ClasificacionInterface,
  BancoInterface,
  TipoCuentaBancoInterface
} from './entities/interfaces';
import { DataFormService } from './service/utilities/dataForm.service';
import { Observable, Subscription } from 'rxjs';
import { UserInterface } from './service/user/user.interface';
import { SearchService } from './service/search/search.service';
import { SelectOptionsBase } from './service/search/searchForm.interface';
import { LoadingService } from './service/utilities/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Cuenta Corriente T1 - T2';
  private cookieValue = '';
  public dataUser: UserInterface;
  /**Service state Loading */
  public loading$: Observable<false>;
  /**Service state Loading */
  
  public constanciaPostulacion$: Observable<false>;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private dataFormService: DataFormService,
    private loadingService: LoadingService,
    private searchService: SearchService) {
      this.cookieValue = this.cookieService.get('HTPSESIONIC');
      this.constanciaPostulacion$ = this.dataFormService.getConstanciaPostulacion();
     }
  ngOnInit(): void {
    this.loading$ = this.loadingService.getLoading();
    this.loadingService.loadDummyData();
    console.log('App Version, 0.0.10')
    if (this.cookieValue === '') {
      // window.location.href = 'https://portales.inacap.cl/';
    } else {
      // this.dataUser.data.push({NOMBRE:'María José Ayala Rodríguez'});
      this.userService.obtenerInfoUsuario(this.cookieValue)
        .subscribe(
          (res: UserInterface) => {
            this.dataUser = res;
            //console.log('resssss',res);
            // this.loadData(); 
          }
        );
    }
  }  
}


