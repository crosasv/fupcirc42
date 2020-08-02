import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { validationRut } from 'src/app/service/utilities/validateRut';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectOptionsBase } from 'src/app/service/search/searchForm.interface';
import { SearchService } from 'src/app/service/search/search.service';
import { NumberSymbol } from '@angular/common';
import { LoadingService } from 'src/app/service/utilities/loading.service';
import { UserInterface } from 'src/app/service/user/user.interface';
import { studentInterface, basicInterface } from 'src/app/entities/interfaces';

declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  constructor(private searchService: SearchService,
    private loadingService: LoadingService) { }

  ngOnInit() {}

}
