export class RouteEntity {
  routID: number;
  busNumber: string;
  routName: string;
  routStops: string;
  transport: string;
  className: string;


  constructor(routID: number, busNumber: string, routName: string, routStops: string, transport: string, className: string) {
    this.routID = routID;
    this.busNumber = busNumber;
    this.routName = routName;
    this.routStops = routStops;
    this.transport = transport;
    this.className = className;
  }
}
