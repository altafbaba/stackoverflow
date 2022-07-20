import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ParamMap,
  Router,
} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IItems } from 'src/app/core/services/items.types';
import { QuestionService } from 'src/app/core/services/question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
  public itm: IItems;
  private unsubscribeAll = new Subject();
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params: ParamMap) => {
        this.questionService
          .getQuestionById(params.get('id'))
          .pipe(takeUntil(this.unsubscribeAll))
          .subscribe(
            (x) => {
              this.itm = x;
            },
            (err) => {
              this.router.navigate(['.']);
            }
          );
      });
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}
