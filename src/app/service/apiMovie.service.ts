import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiMovieService {


    setFilm = new Subject();

    constructor(
        private http: HttpClient
    ) {
    }

    getMovie(value): Observable<any> {
        const url = `${environment.urlApi}?s=${value}&apikey=c930f8c4`;
        return  this.http.get(url);
    }

    getMovieById(id): Observable<any> {
        const url = `${environment.urlApi}?i=${id}&apikey=c930f8c4`;
        return  this.http.get(url);
    }

}
