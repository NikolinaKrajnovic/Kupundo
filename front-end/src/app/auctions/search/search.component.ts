import {Category} from '../model/category';
import { Component, OnInit } from '@angular/core';
import { Auction } from '../model/auction';
import { AuctionService } from '../service/auction.service';

@Component({
  selector: 'kupi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private auction: Auction[];
  private categories: Category[];

  private params = {
		sort: "",
		sortDirection: "desc",
		page: 1,
		pageSize: 5,
		filter: {
      name: "",
      category: ""
		}
  }

  showLoadMore = true;



  constructor(private as :AuctionService) { }

  ngOnInit() {
    this.refreshList();
    this.as.getCategory().subscribe(res => this.categories = res);
  }

  refreshList(){
		this.as.getAuctions(this.params).subscribe(
			data => {
        this.showLoadMore = (data.length<5)? false:true;
        if(this.params.page===1){
        this.auction = data;
      }else{
        data.forEach(item => {this.auction.push(item)})
      }
			}
		);
  }

  setCategory(category: string) {
    this.params.filter.category = category;
    this.refreshList();
    this.params.pageSize = 5;
  }

  setName(name: string) {
    this.params.filter.name = name;
    this.refreshList();
    this.params.pageSize = 5;
  }

  loadMore(){
    this.params.page++;
    this.refreshList();
  }

}