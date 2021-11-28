import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  trips: any[] = [
    {
      title: "Title",
      descritpion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur varius ultricies. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum pretium luctus enim a dapibus. Vestibulum efficitur et ante vel pretium. In vitae volutpat erat. Maecenas vulputate, urna eget interdum molestie, augue sem venenatis ante, in pulvinar neque risus id tellus. Donec maximus, eros eget tempor vehicula",
      img: 'assets/ponte_sant_angelo_rome_italy_travel-wallpaper-1920x1080.jpg'
    },
    {
      title: "Title",
      descritpion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur varius ultricies. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum pretium luctus enim a dapibus. Vestibulum efficitur et ante vel pretium. In vitae volutpat erat. Maecenas vulputate, urna eget interdum molestie, augue sem venenatis ante, in pulvinar neque risus id tellus. Donec maximus, eros eget tempor vehicula",
      img: 'assets/ponte_sant_angelo_rome_italy_travel-wallpaper-1920x1080.jpg'
    },
    {
      title: "Title",
      descritpion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur varius ultricies. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum pretium luctus enim a dapibus. Vestibulum efficitur et ante vel pretium. In vitae volutpat erat. Maecenas vulputate, urna eget interdum molestie, augue sem venenatis ante, in pulvinar neque risus id tellus. Donec maximus, eros eget tempor vehicula",
      img: 'assets/ponte_sant_angelo_rome_italy_travel-wallpaper-1920x1080.jpg'
    },
    {
      title: "Title",
      descritpion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur varius ultricies. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum pretium luctus enim a dapibus. Vestibulum efficitur et ante vel pretium. In vitae volutpat erat. Maecenas vulputate, urna eget interdum molestie, augue sem venenatis ante, in pulvinar neque risus id tellus. Donec maximus, eros eget tempor vehicula",
      img: 'assets/ponte_sant_angelo_rome_italy_travel-wallpaper-1920x1080.jpg'
    },
    {
      title: "Title",
      descritpion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur varius ultricies. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum pretium luctus enim a dapibus. Vestibulum efficitur et ante vel pretium. In vitae volutpat erat. Maecenas vulputate, urna eget interdum molestie, augue sem venenatis ante, in pulvinar neque risus id tellus. Donec maximus, eros eget tempor vehicula",
      img: 'assets/ponte_sant_angelo_rome_italy_travel-wallpaper-1920x1080.jpg'
    },
    {
      title: "Title",
      descritpion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur varius ultricies. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum pretium luctus enim a dapibus. Vestibulum efficitur et ante vel pretium. In vitae volutpat erat. Maecenas vulputate, urna eget interdum molestie, augue sem venenatis ante, in pulvinar neque risus id tellus. Donec maximus, eros eget tempor vehicula",
      img: 'assets/ponte_sant_angelo_rome_italy_travel-wallpaper-1920x1080.jpg'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
