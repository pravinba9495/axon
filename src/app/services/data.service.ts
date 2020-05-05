import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/Data';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    data: Data = new Data();

    constructor(
        private http: HttpClient,
    ) { }

    retrieveData() {
        this.http.get('/assets/data/data.json').subscribe((response: Data) => {
            this.data = response;
        }, (error) => {
            console.error(error);
        })
    }
}
