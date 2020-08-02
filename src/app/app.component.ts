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
  public dataFormSearch = {
    campus: [],
    typeOfBenefits: [],
    periods: [],
    searchTypes: [],
    caja: []
  };

  /**Service state Loading */
  public loading$: Observable<false>;
  /**Service state Loading */

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private dataFormService: DataFormService,
    private loadingService: LoadingService,
    private searchService: SearchService) {
      this.cookieValue = this.cookieService.get('HTPSESIONIC');
     }
  ngOnInit(): void {
    this.loading$ = this.loadingService.getLoading();
    this.loadingService.loadDummyData();
    console.log('App Version, 0.0.10')
    if (this.cookieValue === '') {
      window.location.href = 'https://portales.inacap.cl/';
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
  private loadData(): void {
    this.getPeriod();
  }
  
  private getCampus() {
    this.searchService.getCampus().subscribe(
      (res:Array<any>) => {
        this.dataFormSearch.campus = res;
      }
    );
  }
  private getTypeOfBenefit(){
    this.searchService.getTypeOfBenefit().subscribe(
      (res: Array<SelectOptionsBase>)=>{
        this.dataFormSearch.typeOfBenefits = res;
      }
    )
  }
  private getPeriod(){
    this.searchService.getPeriod().subscribe(
      (res: Array<SelectOptionsBase>)=>{
        this.dataFormSearch.periods = res;
      }
    )
  }
  private getsearchType(){
    this.searchService.getSearchType().subscribe(
      (res: Array<SelectOptionsBase>)=>{
        this.dataFormSearch.searchTypes = res;
      }
    )
  }
}


