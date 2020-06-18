import {EventEmitter, Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {NameCodePair} from "../model/name-code-pair";
import {endPoints, URL_SEPARATOR} from "../model/constants";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loginLogOutEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private httpService: HttpService) {
  }

  onLogin(params: NameCodePair[]) {
    const endPoint = endPoints.session.concat(URL_SEPARATOR).concat(endPoints.authenticate);
    return this.httpService.post(endPoint, {}, {}, params);
  }

  onRegister(user: any) {
    const endPoint = endPoints.session.concat(URL_SEPARATOR).concat(endPoints.register);
    return this.httpService.post(endPoint, user );
  }
}
