export class StopEntity {
  stopID: number;
  stopName: string;
  lngStop: string;
  latStop: string;
  stops: string;

  constructor(stopID: number, stopName: string, lngStop: string, latStop: string, stops: string) {
    this.stopID = stopID;
    this.lngStop = lngStop;
    this.stopName = stopName;
    this.latStop = latStop;
    this.stops = stops;
  }
}
