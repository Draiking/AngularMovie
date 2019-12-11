import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiMovieService} from '../../service/apiMovie.service';
import {MovieInterface} from '../../interface/movie.interface';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

    id: string;
    film: MovieInterface = {};
    unsubscribeAll = new Subject();

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiMovieService,
        private router: Router
    ) {
        this.id = this.route.snapshot.params.id;
    }

    ngOnInit() {
        console.log(this.id);
        this.apiService.getMovieById(this.id)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((res) => {
                this.film = res;
                localStorage.setItem('detail', JSON.stringify(this.film));
                console.log(res);
            });
    }

    back() {
        this.router.navigateByUrl('/');
    }

    ngOnDestroy() {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
