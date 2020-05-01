import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Location } from "@angular/common";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from "@angular/core";

@Component({
  selector: "app-head",
  templateUrl: "./head.component.html",
  styleUrls: ["./head.component.scss"],
})
export class HeadComponent implements OnInit {
  constructor(private location: Location, private router: Router) {}

  @Input() paymentHeader;
  @Input() paymentHeaderResponsive;
  @Input() formState;
  @Output() emitPreviousStateEvent = new EventEmitter();
  previousEvent;
  frenchElement: any;
  hideBackBtn = false;
  observeUrl: Observable<any>;

  ngOnInit() {
    this.frenchElement = document.querySelector(".language-container-french");
    this.observeUrl = Observable.create((observer) => {
      observer.next(this.router.url);
    });
    this.observeUrl.subscribe((url) => {
      console.log(url);
      if (url === "/hostedPayment/payments/success") {
        this.hideBackBtn = true;
      }
    });
  }

  showFrenchOption() {
    this.frenchElement.classList.add("showElement");
    setTimeout(() => {
      this.hideFrenchOption();
    }, 2500);
  }
  hideFrenchOption() {
    this.frenchElement.classList.remove("showElement");
  }
  gotoPrevious() {
    // this.emitPreviousStateEvent.emit(this.previousEvent);
    this.location.back();
  }
}
