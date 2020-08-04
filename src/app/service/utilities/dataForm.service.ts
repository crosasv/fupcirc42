import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {  
    PeriodoAcademico,
    studentInterface} from 'src/app/entities/interfaces';
@Injectable({
  providedIn: 'root'
})
export class DataFormService {
  private dataStudent = new BehaviorSubject({});

  private periodSubject = new BehaviorSubject<PeriodoAcademico>(null);
  constructor() { }

  getStudent(): Observable<any> {
    return this.dataStudent.asObservable();
  }
  
  setStudent(student: studentInterface) {
    this.dataStudent.next(student);
  }

  getPeriod(): Observable<any> {
    return this.periodSubject.asObservable();
  }
  
  setPeriod(period: PeriodoAcademico) {
    this.periodSubject.next(period);
  }

  get currentPeriod(): PeriodoAcademico{
    return this.periodSubject.value;
  }
}
