import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovieInterface } from '../../interface/movie.interface';
import { ApiMovieService } from '../../service/apiMovie.service';
import { feakData } from './feakData';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss'],
})
export class MainListComponent implements OnInit, OnDestroy {
  lists: Array<MovieInterface> = [];
  unsubscribeAll = new Subject();

  constructor(
    private apiService: ApiMovieService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.apiService.setFilm
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((value) => {
        this.lists.unshift(value);
        /* tslint:disable */
        localStorage.setItem('list', JSON.stringify(this.lists));
        /* tslint:enable */
      });
    /* tslint:disable */
    this.lists = JSON.parse(localStorage.getItem('list'));
    /* tslint:enable */
    if (this.lists.length === 0) {
      this.lists = feakData.Search;
    }
  }

  detail(item): void {
    this.router.navigateByUrl(`/detail/${item.imdbID}`);
  }

  delete(item): void {
    this.lists = _.filter(this.lists, (it) => it.imdbID !== item.imdbID);
    /* tslint:disable */
    localStorage.setItem('list', JSON.stringify(this.lists));
    /* tslint:enable */
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
