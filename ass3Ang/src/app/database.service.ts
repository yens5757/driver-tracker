import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = '/35423056/Aiken/api/v1';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http: HttpClient) {

   }
  
  addDriver(driver: any) {
    return this.http.post(API_URL + '/drivers/add', driver, httpOptions);
  };
  getDrivers() {
    return this.http.get(API_URL + '/drivers');
  };
  deleteDriver(driverId: string) {
    return this.http.delete(API_URL + '/drivers/delete/' + driverId);
  };
  updateDriver(driver: any) {
    return this.http.put(API_URL + '/drivers/update', driver, httpOptions);
  };
  addPackage(newpackage: any) {
    return this.http.post(API_URL + '/packages/add', newpackage, httpOptions);
  };
  getPackages() {
    return this.http.get(API_URL + '/packages');
  };
  deletePackage(packageId: string) {
    return this.http.delete(API_URL + '/packages/delete/' + packageId);
  };
  updatePackage(up_package: any) {
    return this.http.put(API_URL + '/packages/update', up_package, httpOptions);
  };
}
