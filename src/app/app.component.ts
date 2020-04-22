import {Router, ActivatedRoute, } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  hide = false;

  routeChanged(e) {
    console.log(e);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(route => {
      console.log(route.get("method"));
    });
  }

}
