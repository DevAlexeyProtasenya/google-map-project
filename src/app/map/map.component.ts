import {Component, OnInit} from '@angular/core';
import {ShareService} from '../share.service';
import {StopEntity} from '../entities/stop-entity';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  stopSet: Set<StopEntity>;

  title: string = 'My first AGM project';
  latCenter: number = 53.9045326;
  lngCenter: number = 27.5744375;

  constructor(private share: ShareService) {
    this.share.onClick.subscribe(stops => {
      this.stopSet = stops;
      console.log(this.stopSet);
    });
  }

  ngOnInit() {
  }

}
