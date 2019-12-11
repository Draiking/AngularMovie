import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovieInterface } from '../../interface/movie.interface';
import { ApiMovieService } from '../../service/apiMovie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {

  id: string;
  film: MovieInterface = {};
  unsubscribeAll = new Subject();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiMovieService,
    private router: Router,
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    console.log(this.id);
    this.apiService.getMovieById(this.id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.film = res;
        /* tslint:disable */
        localStorage.setItem('detail', JSON.stringify(this.film));
        /* tslint:enable */
        console.log(res);
      });
  }

  back(): void {
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
