import { Injectable } from '@angular/core';

import * as data from './itemsdata.json';
import { Subcategory } from './subCategory';

@Injectable()
export class ShoppingService {

  constructor() { }

  getCategories() {
    return data;
  }
}
