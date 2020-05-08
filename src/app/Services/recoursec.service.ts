import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LostItem} from '../Models/LostItem';
import {catchError} from 'rxjs/operators';
import {DocumentModel} from '../Models/DocumentModel';

@Injectable({
  providedIn: 'root'
})
export class RecoursecService {

  baseUrl = environment.APIEndpoint;
  getPartialsDocumentsUrl = this.baseUrl + '/Resources/PartialsDocument';
  getFinalsDocumentsUrl = this.baseUrl + '/Resources/FinalsDocument';
  getQuizzesDocumentsUrl = this.baseUrl + '/Resources/QuizzesDocument';
  addDocumentsUrl = this.baseUrl + '/Resources/Document';

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPartialsDocument(userId): Observable<Array<DocumentModel>> {
    return this.http.get<Array<DocumentModel>>(this.getPartialsDocumentsUrl, {params: new HttpParams().set('userId', userId)})
      .pipe(
        catchError(this.handleError<Array<DocumentModel>>('getLostItemByName()', []))
      );
  }

  getFinalsDocument(userId): Observable<Array<DocumentModel>> {
    return this.http.get<Array<DocumentModel>>(this.getFinalsDocumentsUrl, {params: new HttpParams().set('userId', userId)})
  .pipe(
      catchError(this.handleError<Array<DocumentModel>>('getFinalsDocument()', []))
    );
  }

  getQuizzesDocument(userId): Observable<Array<DocumentModel>> {
    return this.http.get<Array<DocumentModel>>(this.getQuizzesDocumentsUrl, {params: new HttpParams().set('userId', userId)})
  .pipe(
      catchError(this.handleError<Array<DocumentModel>>('getQuizzesDocument()', []))
    );
  }

  addDocument(p): Observable<string> {
    console.log('AAAAAAAAAAAAA');
    console.log(p);
    return this.http.post<string>(this.addDocumentsUrl, p,
    ).pipe(
      catchError(this.handleError<string>('addDocument()'))
    );
  }
}
