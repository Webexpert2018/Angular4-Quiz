import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Items } from './model/items';
import 'rxjs/add/operator/map'

@Injectable()
export class ItemService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiURL = "http://webapidemo.spadez.co/api/";
    private addItemUrl = this.apiURL + 'items';  
    private itemsUrl = this.apiURL + 'items/GetAll';  
    private itemUrl = this.apiURL + 'items';  
    private deleteItemUrl = this.apiURL + 'items';
    private deleteUrl = this.apiURL + 'items/Delete';  
    private multideleteUrl = this.apiURL + 'items/deleteselected'; 
    constructor(private http: Http) { }

    addItem(model: Items) {
        debugger;
        let opts = new RequestOptions();
        opts.headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.addItemUrl, JSON.stringify(model), opts)
            .map((response: Response) => response.json())
    }

    // deleteItem(itemId): Promise<Items> {
    //     let opts = new RequestOptions();
    //     opts.headers = new Headers({ 'Content-Type': 'application/json' });
    //     return this.http.delete(this.deleteItemUrl+ '/'+itemId,opts)
    //         .toPromise()
    //         .then(response => response.json() as Items)
    //         .catch(this.handleError);
    // }
    getItem(itemId): Promise<Items> {
        return this.http.get(this.itemUrl+ '/'+itemId)
            .toPromise()
            .then(response => response.json() as Items)
            .catch(this.handleError);
    }
    
    getItems(): Promise<any> {
        return this.http.get(this.itemsUrl)
            .toPromise()
            .then(response => 
                response.json())
            .catch(this.handleError);
    }  
    
    deleteItem(itemId) {
        return this.http
            .get(this.deleteUrl + '?id=' + itemId)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    mutideleteItem(itemIds) {
        return this.http
            .get(this.multideleteUrl + '?selectedIds=' + itemIds)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        debugger;
        console.log('An error occurred', error); // for capturing and logging errors
        return Promise.reject(error.message || error);
    }
}