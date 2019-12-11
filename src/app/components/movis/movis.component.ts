import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieInterface } from '../../interface/movie.interface';

@Component({
  selector: 'app-movis',
  templateUrl: './movis.component.html',
  styleUrls: ['./movis.component.scss'],
})
export class MovisComponent implements OnInit {

  @Input() item: MovieInterface;
  @Output() eventDelete = new EventEmitter();
  @Output() eventDetail = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  detail(): void {
    this.eventDetail.emit(this.item);
  }

  delete(): void {
    this.eventDelete.emit(this.item);
  }
}
