import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, take, map, switchMap, throwError, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { IDTO } from '../dto.types';
import { IItems } from './items.types';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl = environment.baseUrl;

  private items: BehaviorSubject<IItems[]> = new BehaviorSubject<IItems[]>([]);
  private selectedQuestion: BehaviorSubject<IItems> =
    new BehaviorSubject<IItems>(null);
  constructor(private httpClient: HttpClient) {}

  get items$(): Observable<any> {
    return this.items.asObservable();
  }

  getIitems(searchText?: string): Observable<IDTO> {
    return this.httpClient
      .get<IDTO>(`${this.baseUrl}/2.3/search`, {
        params: {
          intitle: `${searchText}`,
          site: 'stackoverflow',
          pagesize: 100,
        },
      })
      .pipe(
        tap((response) => {
          this.items.next(response.items);
        })
      );
  }

  getQuestionById(question_id) {
    return this.items.pipe(
      take(1),
      map((ques) => {
        const ast = ques.find((ast) => ast.question_id == question_id || null);
        this.selectedQuestion.next(ast);
        return ast;
      }),
      switchMap((ast) => {
        if (!ast) {
          return throwError(
            'Could not found question with id of ' + question_id + '!'
          );
        }
        return of(ast);
      })
    );
  }
}
