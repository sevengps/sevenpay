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
export class HeadComponent implements OnInit, OnChanges {
  constructor() {}

  paymentHeader = "Selectionnez de votre mode de paiement";
  @Input() formState;
  @Output() emitPreviousStateEvent = new EventEmitter();
  previousEvent;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let propertyName in changes) {
      let change = changes[propertyName];
      let current = change.currentValue;
      let previous = change.previousValue;
      console.log('current from head '+current);
      console.log('previous from head '+previous);
      if (current === "step2") {
        this.previousEvent = "goBackToStep1";
      } else {
        if (current === "waiting") {
          this.previousEvent = "goBackToStep2";
        } else {
          if (current === "step3") {
            this.previousEvent = "goBackToWaiting";
          }
        }
      }
    }
  }

  gotoPrevious() {
    this.emitPreviousStateEvent.emit(this.previousEvent);
  }
}
