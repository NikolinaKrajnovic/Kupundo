import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../model/category';

@Component({
  selector: 'kupi-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  // Input koji ćemo koristiti u templejtu za listanje kategorija
  @Input() categories: Category[];
  // Output koji ćemo proslediti komponenti search.component (emituju promene parametara, u ovom slučaju category i name)
  @Output() onChangeCategory: EventEmitter<string> = new EventEmitter();
  @Output() onChangeName: EventEmitter<string> = new EventEmitter();
  newCategory: number;
  newSubcategory: string[] = [];
  editedSubcategory: string;
  editedName: string;
  constructor() { }

  ngOnInit() {
  }
  updateSubcategory() {
    for (let i in this.categories) { // Za svaku kategoriju u listi kategorija
      if (this.categories[i]._id === this.newCategory) {  // ukoliko se ta kategorija poklapa sa newCategory
        this.newSubcategory = this.categories[i].subcategories; // prikaži podkategorije postavljene kategorije
      } else {
        this.editedSubcategory = "";
        this.changeCategory();
      }
    }
  }

  changeCategory() {
    // Emituj (dojavi templejtu) promenu kategorije
    this.onChangeCategory.emit(this.editedSubcategory);
  }

  changeName() {
    // Emituj (dojavi templejtu) promenu imena
    this.onChangeName.emit(this.editedName);
  }

}
