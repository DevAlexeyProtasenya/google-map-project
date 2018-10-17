import {Component, OnInit} from '@angular/core';
import {RoutesServiceService} from '../routes-service.service';
import {RouteEntity} from '../entities/route-entity';
import {StopEntity} from '../entities/stop-entity';
import {TakeStopService} from '../take-stop.service';
import {ShareService} from '../share.service';

@Component({
  selector: 'app-table-routes',
  templateUrl: './table-routes.component.html',
  styleUrls: ['./table-routes.component.css']
})
export class TableRoutesComponent implements OnInit {
  routeSet: Set<RouteEntity>;
  transportRouteSet: Set<RouteEntity> = new Set<RouteEntity>();
  stopSet: Set<StopEntity>;
  selectedRoutes: RouteEntity;
  stopsFromSelectedRoutes: string[];
  stopWrongName: string[];
  GPSStops: Set<StopEntity> = new Set<StopEntity>();

  constructor(private routesService: RoutesServiceService, private stopsService: TakeStopService, private shareService: ShareService) {
  }

  ngOnInit() {
    this.componentParsing();
    this.busClick();
  }

  componentParsing(): void {
    this.routesService.parsing().subscribe(data => this.routeSet = data);
    this.routesService.findBus().subscribe(data => this.transportRouteSet = data);
    this.stopsService.parsing().subscribe(data => this.stopSet = data);
    this.busClick();
    //console.log(this.transportRouteSet);
  }

  onSelect(route: RouteEntity): void {
    this.GPSStops.clear();
    this.selectedRoutes = route;
    //console.log(this.selectedRoutes);
    this.stopsFromSelectedRoutes = this.selectedRoutes.routStops.split(',');
    this.findStop();
    this.shareService.setStops(this.GPSStops);
  }

  findStop(): void {
    this.stopSet.forEach(data => {
      if (this.stopsFromSelectedRoutes.includes(data.stopID.toString())) {
        if (data.stopName === '') {
          this.stopWrongName = data.stops.toString().split(',');
          this.stopSet.forEach(secondData => {
            if (this.stopWrongName[0] === secondData.stopID.toString()) {
              this.GPSStops.add(new StopEntity(data.stopID, secondData.stopName,
                data.lngStop.slice(0, 2) + '.' + data.lngStop.slice(2, data.lngStop.length - 1),
                data.latStop.slice(0, 2) + '.' + data.latStop.slice(2, data.latStop.length - 1),
                data.stops));
            }
          });
        } else {
          this.GPSStops.add(new StopEntity(data.stopID, data.stopName,
            data.lngStop.slice(0, 2) + '.' + data.lngStop.slice(2, data.lngStop.length - 1),
            data.latStop.slice(0, 2) + '.' + data.latStop.slice(2, data.latStop.length - 1),
            data.stops));
        }
      }
    });
    console.log(this.GPSStops);
    //console.log(this.stopsFromSelectedRoutes);
  }

  busClick(): void {
    this.transportRouteSet.clear();
    this.routeSet.forEach(data => {
      if (data.transport === 'bus') {
        this.transportRouteSet.add(data);
      }
    });
  }

  tramClick(): void {
    this.transportRouteSet.clear();
    this.routeSet.forEach(data => {
      if (data.transport === 'tram') {
        this.transportRouteSet.add(data);
      }
    });
  }

  trolClick(): void {
    this.transportRouteSet.clear();
    this.routeSet.forEach(data => {
      if (data.transport === 'trol') {
        this.transportRouteSet.add(data);
      }
    });
  }

  metroClick(): void {
    this.transportRouteSet.clear();
    this.routeSet.forEach(data => {
      if (data.transport === 'metro') {
        this.transportRouteSet.add(data);
      }
    });
  }
}
