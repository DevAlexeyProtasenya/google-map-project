import {Injectable} from '@angular/core';
import {Papa} from 'ngx-papaparse';
import {HttpClient} from '@angular/common/http';
import {RouteEntity} from './entities/route-entity';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutesServiceService {

  constructor() {
  }

  parsing(): Observable<Set<RouteEntity>> {
    //const resultArray: Set<RouteEntity> = new Set<RouteEntity>();
    let transport: string;
    const resultArray: Set<RouteEntity> = new Set<RouteEntity>();
    const papa: Papa = new Papa();
    $.ajax({
      url: 'https://gp-js-test.herokuapp.com/proxy/http://www.minsktrans.by/city/minsk/routes.txt',
      complete: function (response) {
        papa.parse(response.responseText.toString(), {
          download: false,
          header: true,
          complete: function (results) {
            results.data.valueOf().forEach(result => {
              if (result['Transport'] !== '') {
                transport = result['Transport'];
              }
              if (result['RouteType'] === 'A>B' && result['RouteNum'] !== '') {
                switch (transport) {
                  case 'bus': {
                    resultArray.add(new RouteEntity(result['RouteID'], result['RouteNum'], result['RouteName'], result['RouteStops'],
                      'bus', 'number' + result['RouteNum'].length.toString()));
                    break;
                  }
                  case 'metro': {
                    resultArray.add(new RouteEntity(result['RouteID'], result['RouteNum'], result['RouteName'], result['RouteStops'],
                      'metro', 'number' + result['RouteNum'].length.toString()));
                    break;
                  }
                  case 'tram': {
                    resultArray.add(new RouteEntity(result['RouteID'], result['RouteNum'], result['RouteName'], result['RouteStops'],
                      'tram', 'number' + result['RouteNum'].length.toString()));
                    break;
                  }
                  case 'trol': {
                    resultArray.add(new RouteEntity(result['RouteID'], result['RouteNum'], result['RouteName'], result['RouteStops'],
                      'trol', 'number' + result['RouteNum'].length.toString()));
                    break;
                  }
                }
              }
            });
            //console.log(resultArray);
          }
        });
        //  $('#output').html(response.responseText);
      },
      error: function () {
        $('#output').html('Bummer: there was an error!');
      },
    });

    //console.log(resultArray);
    return of(resultArray);
    //this.http.get('http://www.minsktrans.by/city/minsk/routes.txt').subscribe(data => console.log(data));
  }

  findBus(): Observable<Set<RouteEntity>> {
    let transport: string;
    const resultArray: Set<RouteEntity> = new Set<RouteEntity>();
    const papa: Papa = new Papa();
    $.ajax({
      url: 'https://gp-js-test.herokuapp.com/proxy/http://www.minsktrans.by/city/minsk/routes.txt',
      complete: function (response) {
        papa.parse(response.responseText.toString(), {
          download: false,
          header: true,
          complete: function (results) {
            results.data.valueOf().forEach(result => {
              if (result['Transport'] !== '') {
                transport = result['Transport'];
              }
              if (result['RouteType'] === 'A>B' && result['RouteNum'] !== '') {
                if (transport === 'bus') {
                  resultArray.add(new RouteEntity(result['RouteID'], result['RouteNum'], result['RouteName'], result['RouteStops'],
                    'bus', 'number' + result['RouteNum'].length.toString()));
                }
              }
            });
            //console.log(resultArray);
          }
        });
        //  $('#output').html(response.responseText);
      },
      error: function () {
        $('#output').html('Bummer: there was an error!');
      },
    });

    //console.log(resultArray);
    return of(resultArray);
  }
}
