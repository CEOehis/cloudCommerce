import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  appName = 'Cloud Commerce';

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
