import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public appName: string = 'Cloud Commerce';
  public myInterval: number = 1000;
  public noWrapSlides: boolean = false;
  public activeSlideIndex: number = 0;

  activeSlideChange() {
    console.log(this.activeSlideIndex);
  }

  public slides: Array<Object> = [
    { "image": "https://webmppcapstone.blob.core.windows.net/vegetableimages/asparagus.jpg", "text": "baz" },
    { "image": "https://webmppcapstone.blob.core.windows.net/breads-royaltyfree/baguette.png", "text": "barz" },
    { "image": "https://webmppcapstone.blob.core.windows.net/babycare-royaltyfree/babyblanket.png", "text": "barz" },
  ];


  constructor() { }

  ngOnInit() {
  }

  toggleCarousel(ref) {
    // check if carousel is auto playing
    if(ref.isPlaying === false) {
      return ref.play();
    }
    ref.pause();
  }

}
