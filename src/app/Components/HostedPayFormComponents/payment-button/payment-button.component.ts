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
  selector: "app-payment-button",
  templateUrl: "./payment-button.component.html",
  styleUrls: ["./payment-button.component.scss"],
})
export class PaymentButtonComponent implements OnInit, OnChanges {
  /**
   * EVENTS
   */
  @Input() selectedPayment;
  @Output() emitSelectedGateway = new EventEmitter();
  @Output() nextEvent = new EventEmitter();
  @Input() currentState;
  @Input() formState;
  constructor() {}
  openStep1 = true;
  openStep2 = true;
  openStep3 = true;
  waiting = true;
  emitNextEvent = "step2";
  buttonState;
  ngOnInit() {
    if (this.formState === "mobileMoney") {
      this.buttonState = "Continuer";
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    for (let propertyName in changes) {
      let change = changes[propertyName];
      let current = change.currentValue;
      let previous = change.previousValue;

      console.log("current from button " + current);
      console.log("previous from button " + previous);
      if (current === "") {
        this.emitNextEvent = "step2";
        this.buttonState = "Paiement";
      } else {
        if (current === "step2") {
          this.emitNextEvent = "waiting";
          this.buttonState = "Paiement";
        } else {
          if (current === "waiting") {
            this.emitNextEvent = "step3";
            this.buttonState = "Loading";
          } else {
            if (current === "step3") {
              this.emitNextEvent = "close";
              this.buttonState = "Continuer";
            } else {
              if (current === "goBackToStep1") {
                //emit step 1 event
                this.emitNextEvent = "";
                this.buttonState = "Continue";
              } else {
                if (current === "goBackToStep2") {
                  //emit step2 event
                  this.emitNextEvent = "step2";
                  this.buttonState = "Paiement";
                } else {
                  if (current === "goBackToWaiting") {
                    //emit waiting event
                    this.emitNextEvent = "waiting";
                    this.buttonState = "Paiement";
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  next() {
    this.nextEvent.emit(this.emitNextEvent);
  }
}
