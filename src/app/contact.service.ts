import { Injectable } from '@angular/core';
import {HttpService} from './core/http/http.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpService: HttpService
  ) { }


  findContact(): any {
    return this.httpService.get('/api?results=5&exc=login,registered,id,nat&nat=us&noinfo');
  }

}
