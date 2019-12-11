import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiMovieService} from '../../service/apiMovie.service';
import {Router} from '@angular/router';
import {MovieInterface} from '../../interface/movie.interface';
import * as _ from 'lodash';
import {pipe, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {feakData} from './feakData';

@Component({
    selector: 'app-main-list',
    templateUrl: './main-list.component.html',
    styleUrls: ['./main-list.component.scss']
})
export class MainListComponent implements OnInit, OnDestroy {
    lists: Array<MovieInterface> = [];
    unsubscribeAll = new Subject();

    constructor(
        private apiService: ApiMovieService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.apiService.setFilm
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((value) => {
                this.lists.unshift(value);
                localStorage.setItem('list', JSON.stringify(this.lists));
            });
        this.lists = JSON.parse(localStorage.getItem('list'));

        if ( this.lists.length === 0) {
           this.lists = feakData.Search;
        }
    }

    detail(item) {
        this.router.navigateByUrl(`/detail/${item.imdbID}`);
    }

    delete(item) {
        this.lists = _.filter(this.lists, (it) => {
            return it.imdbID !== item.imdbID;
        });
        localStorage.setItem('list', JSON.stringify(this.lists));
    }

    ngOnDestroy() {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
