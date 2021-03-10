import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IBGEUFResponse} from './IBGEUFResponse';
import {Observable} from 'rxjs';
import {IBGECityResponse} from './IBGECityResponse';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  private readonly url: string = environment.baseUrl + '/points';

  constructor(private http: HttpClient) {
  }


  getIBGEUfs = (): Observable<Array<IBGEUFResponse>> => {
    return this.http.get<Array<IBGEUFResponse>>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  };

  getIBGECitys = (selectedUf: string): Observable<Array<IBGECityResponse>> => {
    return this.http.get<Array<IBGECityResponse>>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`);
  };

  savePoint = (formData) => {
    return this.http.post(this.url, formData);
  };


}
