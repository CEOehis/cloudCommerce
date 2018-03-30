import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';

import { Item } from '../item';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public appName: string = 'Cloud Commerce';
  public myInterval: number = 5000;
  public noWrapSlides: boolean = false;
  public activeSlideIndex: number = 0;

  constructor(private shoppingSerivce: ShoppingService) { }
  itemsList;
  slideItems: Item[];
  ngOnInit() {
    this.itemsList = this.shoppingSerivce.getCategories();
    this.slideItems = this.getSlideItems();
  }

  getSlideItems(): Item[] {
    var items: Item[] = [];
    this.itemsList.forEach(category => {
      items.push(category.subcategories[0].items[0]);
    });
    return items;
  }

  toggleCarousel(ref) {
    // check if carousel is auto playing
    if(ref.isPlaying === false) {
      return ref.play();
    }
    ref.pause();
  }

}
