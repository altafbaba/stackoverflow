import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

const route: Route[] = [
  {
    path: '',
    component: QuestionComponent,
  },
  {
    path: ':id',
    component: QuestionDetailComponent,
  },
];

@NgModule({
  declarations: [QuestionComponent, QuestionDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
  ],
})
export class QuestionModule {}
