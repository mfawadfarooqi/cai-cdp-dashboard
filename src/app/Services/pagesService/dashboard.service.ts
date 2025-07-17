import {HttpClient} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {ConfigApiService} from '../urls/config-api.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private tokenKey = 'access_token';
  constructor(private httpClient: HttpClient,  private configApiService:ConfigApiService){

  }
  getDashboardCounts(endDate, startDate, countType){
    return this.httpClient.get<any>(this.configApiService.getDashboardCounts(endDate, startDate, countType))
  }
  getList(endDate, startDate){
    return this.httpClient.get<any>(this.configApiService.getAttacksList(endDate, startDate))
  }
  getCounts(endDate, startDate){
    return this.httpClient.get<any>(this.configApiService.getCounts(endDate, startDate))
  }
  getLookupServices(country, type, endDate, startDate){
    return this.httpClient.get<any>(this.configApiService.getLookupServices(country, type, endDate, startDate))
  }
}
