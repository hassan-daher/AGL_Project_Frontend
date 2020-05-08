import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {LostItem} from '../Models/LostItem';
import {AddLostItemModel} from '../Models/AddLostItemModel';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const httpOptions1 = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
};

@Injectable({
  providedIn: 'root'
})
export class LostAndFoundService {

  baseUrl = environment.APIEndpoint;
  getLostAndFoundUrl = this.baseUrl + '/lostAndFound';
  claimLostItemUrl = this.baseUrl + '/lostAndFound/claimLostItem/';
  addLostItemUrl = this.baseUrl + '/lostAndFound/LostItem';
  getLostItemByNameUrl = this.baseUrl + '/lostAndFound/getLostItemByName';

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getLostItems(): Observable<Array<LostItem>> {
    return this.http.get<Array<LostItem>>(this.getLostAndFoundUrl)
      .pipe(
        catchError(this.handleError<Array<LostItem>>('getLostItems()', []))
      );
  }

  getLostItemByName(name): Observable<Array<LostItem>> {
    return this.http.get<Array<LostItem>>(this.getLostItemByNameUrl, {params: new HttpParams().set('name', name)})
      .pipe(
        catchError(this.handleError<Array<LostItem>>('getLostItemByName()', []))
      );
  }

  claimLostItem(id): Observable<{}> {
    return this.http.delete(this.claimLostItemUrl + id  , httpOptions)
      .pipe(
        catchError(this.handleError('claimLostItem()'))
      );
  }

  addLostItem(p): Observable<string> {
    console.log('AAAAAAAAAAAAA');
    console.log(p);
    return this.http.post<string>(this.addLostItemUrl, p,
    ).pipe(
      catchError(this.handleError<string>('addLostItem()'))
    );
  }
}
