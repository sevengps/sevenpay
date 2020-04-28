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
  @Output() emitSelectedGateway = new EventEmitter();
  @Output() nextEvent = new EventEmitter();
  @Input() selectedPayment;
  @Input() currentState;
  @Input() formState;

  constructor() {}

  openStep1 = true;
  openStep2 = true;
  openStep3 = true;
  waiting = true;
  emitNextEvent = "step2";
  buttonState;

  // OnInit lifecycle hook
  ngOnInit() {
    if (this.formState === "mobileMoney") {
      this.buttonState = "Continuer";
    }
  }

  // OnChanges lifecycle hook
  ngOnChanges(changes: SimpleChanges): void {
    for (let propertyName in changes) {
      let change = changes[propertyName];
      let current = change.currentValue;
      let previous = change.previousValue;

      if (current === "") {
        this.emitNextEvent = "step2";
        this.buttonState = "Paiement";
      } else {
        if (current === "step2") {
          this.emitNextEvent = "waiting";
          this.buttonState = "Paiement";
        } else {
          if (current === "waiting") {
            this.buttonState = "Loading";
            setTimeout(() => {
              this.nextEvent.emit("step3");
            }, 3000);
            this.emitNextEvent = "waiting";
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
