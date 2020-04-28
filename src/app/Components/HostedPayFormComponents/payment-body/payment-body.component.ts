import { PaymentsService } from "./../../../Services/payments.service";
import { Router } from "@angular/router";

import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  Input,
  SimpleChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material";
import { StripeModalComponent } from "../../stripe-modal/stripe-modal.component";

@Component({
  selector: "app-payment-body",
  templateUrl: "./payment-body.component.html",
  styleUrls: ["./payment-body.component.scss"],
})
export class PaymentBodyComponent implements OnInit, OnChanges {
  /**
   * OUTPUT EVENT EMITTERS
   */
  @Output() paymentMethod = new EventEmitter();
  @Output() emitCurrentState = new EventEmitter();
  @Output() emitPreviouState = new EventEmitter();
  @Input() receiveNextActiveState;
  @Input() receivePreviousActiveState;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private paymentService: PaymentsService
  ) {}

  successPayment = true;
  total = 37500;
  mobileNumber: any;
  loading: boolean;
  openStep1 = true;
  openStep2 = false;
  openStep3 = false;
  selectedGateway = "mobileMoney";
  useStripe = true;
  connector1 = false;
  connector2 = false;
  number1 = true;
  number2 = false;
  number_1_Large = true;
  number_2_Large = false;
  number_3_Large = false;
  readOnly = false;
  number3;
  momopayWaiting = false;
  visacardWaiting = false;

  ngOnInit() {
    this.emitCurrentState.emit(this.selectedGateway);
    this.paymentMethod.emit(this.selectedGateway);
  }

  ngOnChanges(changes: SimpleChanges): void {
    /**CHANGE DETECTOR FOR NEXT STEP EVENTS --- PAYMENT PROGRESSION */
    for (let propertyName in changes) {
      let change = changes[propertyName];
      let current = change.currentValue;
      let previous = change.previousValue;

      // console.log("current from body " + current);
      // console.log("previous from body " + previous);
      // console.log("this is receivedprev " + this.receivePreviousActiveState);
      // console.log(changes);

      if (current === "step1" || current === "goBackToStep1") {
        this.openStep1 = true;
        this.openStep2 = false;
        this.openStep3 = false;
        this.connector1 = false;
        this.number2 = false;
        this.emitCurrentState.emit(current);
        // this.emitPreviouState.emit(current);
      } else {
        if (current === "step2" || current === "goBackToStep2") {
          if (this.selectedGateway === "vissaCard") {
            this.openDialog(current);
            this.openStep1 = true;
            this.useStripe = false;
            this.number2 = true;
            this.connector1 = true;
            this.openStep2 = false;
            this.openStep3 = false;
            this.visacardWaiting = false;
            this.momopayWaiting = false;
            this.emitCurrentState.emit(current);
          } else {
            this.openStep2 = true;
            this.useStripe = false;
            this.number2 = true;
            this.connector1 = true;
            this.number_1_Large = false;
            this.number_2_Large = true;
            this.openStep1 = false;
            this.openStep3 = false;
            this.visacardWaiting = false;
            this.momopayWaiting = false;
            this.emitCurrentState.emit(current);
            // this.emitPreviouState.emit(current);
          }
        } else {
          if (current === "waiting" || current === "goBackToWaiting") {
            this.visacardWaiting = true;
            this.momopayWaiting = true;
            this.visacardWaiting = true;
            this.openStep2 = true;
            this.connector1 = true;
            this.readOnly = true;
            this.momopayWaiting = true;
            this.openStep3 = false;
            this.number3 = false;
            this.connector2 = false;
            this.openStep1 = false;
            this.emitCurrentState.emit(current);
            // this.emitPreviouState.emit(current);
          } else {
            if (current === "step3") {
              this.openStep3 = true;
              this.number3 = true;
              this.connector2 = true;
              this.number_1_Large = false;
              this.number_2_Large = false;
              this.number_3_Large = true;
              this.openStep1 = false;
              this.openStep2 = false;
              this.visacardWaiting = false;
              this.momopayWaiting = false;
              this.emitCurrentState.emit(current);
              // this.emitPreviouState.emit(current);
            } else {
              if (current === "close") {
                this.router.navigate([""]);
              }
            }
          }
        }
      }
    }
  }

  valueChanged(event) {
    console.log(event.value);
    this.selectedGateway = event.value;
    this.paymentMethod.emit(this.selectedGateway);
  }

  // MODAL
  animal: string;
  name: string;

  openDialog(current): void {
    const dialogRef = this.dialog.open(StripeModalComponent, {
      width: "460px",
      height: "530px",
      direction: "ltr",
      panelClass: "dailog-container",
      data: { name: this.name, animal: this.animal },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === "cancelled") {
        this.openStep1 = true;
        this.openStep2 = false;
        this.openStep3 = false;
        this.connector1 = false;
        this.number2 = false;
        this.emitCurrentState.emit("step1");
      } else {
        this.openStep3 = true;
        this.number3 = true;
        this.connector2 = true;
        this.openStep1 = false;
        this.openStep2 = false;
        this.visacardWaiting = false;
        this.momopayWaiting = false;
        this.emitCurrentState.emit("step3");
      }
    });
  }

  // momo payment
  momoPayment() {
    const customer = {
      amount: this.total,
      mobileNumber: this.mobileNumber,
    };
    this.loading = true;

    let referenceId;
    let userApikey;
    let userToken;
    let errorLog;

    this.paymentService.createApiUser().subscribe((user) => {
      referenceId = user.data.reference;
      console.log(referenceId);

      if (referenceId) {
        this.paymentService.createApiKey(referenceId).subscribe((apikey) => {
          userApikey = apikey.apiKey;
          console.log(userApikey);
          if (userApikey) {
            this.paymentService
              .createUserToken(referenceId, userApikey)
              .subscribe((authtoken) => {
                userToken = authtoken.data.access_token;
                console.log(userToken);
                if (userToken) {
                  this.paymentService
                    .makeMomoPayment(customer, userToken, referenceId)
                    .subscribe(
                      (payments) => {
                        console.log(payments);
                      },
                      (error) => {
                        errorLog = error.error.data;
                        console.log(errorLog);
                        if (errorLog === null) {
                          this.paymentService
                            .getTransactionDetails(userToken, referenceId)
                            .subscribe((transaction) => {
                              console.log(transaction);
                              if (transaction) {
                                this.paymentService
                                  .getUserBalance(userToken)
                                  .subscribe((accountBalance) => {
                                    console.log(accountBalance);
                                  });
                              }
                            });
                        }
                      }
                    );
                } else {
                  //no token generated
                }
              });
          } else {
            // user apikey could not be created
          }
        });
      } else {
        //no reference id returned. user not created
      }
    });
  }
  //Momo Payment ends here
}
