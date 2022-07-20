import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IDTO } from 'src/app/core/dto.types';
import { IItems } from 'src/app/core/services/items.types';
import { QuestionService } from 'src/app/core/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, AfterViewInit, OnDestroy {
  searchCtrl = new FormControl('', [Validators.required]);
  response: IDTO;
  unsubscribeAll = new Subject();
  displayedColumns = [
    'type',
    'name',
    'creation_date',
    'last_edit_date',
    'score',
  ];
  dataSource: MatTableDataSource<IItems> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  search() {
    this.searchCtrl.markAllAsTouched();

    if (this.searchCtrl.invalid) return;

    this.questionService
      .getIitems(this.searchCtrl.value ?? '')
      .subscribe((x) => {
        this.response = x;
        this.dataSource.data = x.items;
      });
  }
}
