import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carro } from '../../modelos/carro';

@Injectable()
export class CarrosServiceProvider {

  constructor(private http: HttpClient) {
    console.log('Hello CarrosServiceProvider Provider');
  }

  lista() {
    return this.http.get<Carro[]>("http://192.168.1.17:8080/api/carro/listaTodos");
  }

}
