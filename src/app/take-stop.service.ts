import { Injectable } from '@angular/core';
import {RouteEntity} from './entities/route-entity';
import {Papa} from 'ngx-papaparse';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StopEntity} from './entities/stop-entity';
import * as $ from 'jquery';
import {st} from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class TakeStopService {

  constructor(private httpClient: HttpClient) {
  }

  parsing(): Observable<Set<StopEntity>> {
    const resultArray: Set<StopEntity> = new Set<StopEntity>();
    const papa: Papa = new Papa();
    //fetch('../publicData/routes.txt')
    $.ajax({
      url: 'https://gp-js-test.herokuapp.com/proxy/http://www.minsktrans.by/city/minsk/stops.txt',
      complete: function(response) {
        papa.parse(response.responseText, {
          download: false,
          header: true,
          complete: function (results) {
            //console.log(results);
            results.data.valueOf().forEach(result => {
              resultArray.add(new StopEntity(result['ID'], result['Name'], result['Lng'], result['Lat'], result['Stops']));
            });
           // console.log(resultArray);
          }
        });
      },
      error: function() {
        $('#output').html('Bummer: there was an error!');
      },
    });

    return of(resultArray);
    //this.http.get('http://www.minsktrans.by/city/minsk/routes.txt').subscribe(data => console.log(data));
  }
}
