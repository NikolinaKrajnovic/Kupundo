import { AuctionService } from './../service/auction.service';
import { Component, OnInit } from '@angular/core';
import { Auction } from '../model/auction';

@Component({
  selector: 'kupi-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  auctionsEnd: Auction[] = [];
  auctionsStart: Auction[] = [];
  auctionsNew: Auction[] = [];
  auctionsOld: Auction[] = [];
  
  constructor(private as : AuctionService) { }

  ngOnInit() {// Dobavi aukcije preko auction servisa, sortiraj po datumu kreiranja, u opadajućem nizu
    this.as.getAuctions({ sort: "dateEnd", sortDirection: "desc" }).subscribe(
      res => {
        this.auctionsStart = res;
        for (let i = 0; i < 5; i++) {
          // Ubaci 5 najnovijih aukcija u auctionsNew listu (koju ćemo kasnije prikazati u templejtu, tj. carouselu)
          this.auctionsNew.push(this.auctionsStart[i]);
        }
      }
    );

    // Dobavi aukcije preko auction servisa, sortiraj po datumu isteka, u rastućem nizu
    this.as.getAuctions({ sort: "dateEnd", sortDirection: "asc"}).subscribe(
      res => {
        this.auctionsEnd = res;
        for (let i = 0; i < 5; i++) {
          // Ubaci 5 aukcija koje će najpre isteći u listu auctionsOld (koju ćemo prikazati u carouselu za aukcije koje treba da isteknu)
          this.auctionsOld.push(this.auctionsEnd[i]);
        }
      }
    );
  }
  }

