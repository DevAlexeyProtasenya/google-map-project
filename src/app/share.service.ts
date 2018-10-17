import {EventEmitter, Injectable} from '@angular/core';
import {StopEntity} from './entities/stop-entity';
import {TableRoutesComponent} from './table-routes/table-routes.component';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  stopSet: Set<StopEntity>;
  onClick: EventEmitter<Set<StopEntity>> = new EventEmitter();

  public setStops(stopSet: Set<StopEntity>) {
    this.stopSet = stopSet;
    this.onClick.emit(this.stopSet);
   // console.log(this.stopSet);
  }
}
