import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadingComponent,
    BreadcrumbComponent
  ],
  exports: [
    LoadingComponent,
    BreadcrumbComponent
  ]
})
export class SharedModule { }
