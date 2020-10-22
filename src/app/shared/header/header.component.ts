import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  public urlActive: string;
  @Input() userName: string;

  constructor() { }
  public exit_to_app(){
    window.location.href = 'https://portales.inacap.cl/';
  }
}
