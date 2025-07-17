import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.staging';
import {HttpClient} from '@angular/common/http';
import {ConfigApiService} from './urls/config-api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'access_token';
  constructor(private httpClient: HttpClient,  private configApiService:ConfigApiService){

  }
  login(value:any) {
    return this.httpClient.post(this.configApiService.login(), value);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
