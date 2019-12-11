import { Component, OnInit } from '@angular/core';
import { MovieInterface } from '../../interface/movie.interface';
import { ApiMovieService } from '../../service/apiMovie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  options: Array<MovieInterface> = [];
  search: string;

  constructor(
    private apiService: ApiMovieService,
  ) {
  }

  ngOnInit(): void {
  }

  searchMovie(value): void {
    if (value.length > 3) {
      this.apiService.getMovie(value)
        .subscribe((res) => {
          if (res && res.Search) {
            this.options = res.Search;
          }
        });
    }

  }

  selected(e): void {
    console.log(e.option.value);
    this.search = '';
    this.apiService.setFilm.next(e.option.value);
  }

}
