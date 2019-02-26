import { Injectable } from '@angular/core';
import { Auction } from '../model/auction';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Category } from '../model/category';
const baseUrl="http://localhost:3000/api";

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http :HttpClient) { }

getAuctions(params? :any): Observable<Auction[]>{
  let queryParams = {};
  if(params){
    queryParams = {params : new HttpParams()
      .set('sort', params.sort || "")
      .set('sortDirection', params.sortDirection || "")
      .set('page', params.page && params.page.toString() || "")
      .set('pageSize', params.pageSize && params.pageSize.toString() || "")
      .set('filter', params.filter && JSON.stringify(params.filter) || "")
    }
}
return this.http.get<Auction[]>(baseUrl + '/auctions',queryParams).pipe(map(
  response=> {return response.map(item=> new Auction(item));
  }
))
}

getCategory(): Observable<Category[]> {
  return this.http.get<Category[]>(baseUrl + '/categories').pipe(map( // znači dobavi objekte sa http://localhost:3000/api/categories
    res => {
      let kategorije = new Array<Category>(); // definisan Array koji očekuje da se u njega pushuje objekat Category
      res.forEach(kategorija => kategorije.push(new Category(kategorija))); // pushujemo svaku kategoriju koju pribavimo sa servera u gore definisan array
      return kategorije;
    }
  ));
}

}