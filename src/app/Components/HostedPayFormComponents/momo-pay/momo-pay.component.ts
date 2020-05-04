import { PaymentsService } from "./../../../Services/payments.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-momo-pay",
  templateUrl: "./momo-pay.component.html",
  styleUrls: ["./momo-pay.component.scss"],
})
export class MomoPayComponent implements OnInit {
  constructor(
    private router: Router,
    private paymentService: PaymentsService
  ) {}

  loading: boolean;
  mobileNumber: any;
  openStep2 = true;
  currentUrl: any;
  buttonState: string = "Paiement";
  hideBtn: boolean;
  currentRoute = "momopay";
  waiting = false;
  successPayment = true;
  animateElement = true;
  selectedGateway;
  total = 37500;
  useStripe = true;
  connector1 = true;
  connector2 = false;
  number1 = true;
  number2 = true;
  number_1_Large = false;
  number_2_Large = true;
  number_3_Large = false;
  readOnly = false;
  number3;
  momopayWaiting = false;
  visacardWaiting = false;
  activeUrl = "";
  adjustContainer = false;
  hideButton = false;

  ngOnInit() {}

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

    this.router.navigate(["hostedPayment/payments/momopay", "processing"]);
  }
  //Momo Payment ends here

  next() {
    let number = `${this.mobileNumber}`;
    console.log(number);
    if (number.length < 9 || number === undefined) {
      return false;
    } else {
      this.currentUrl = this.router.url;
      let gateway = localStorage.getItem("url");
      if (gateway != null) {
        this.currentUrl = `${this.currentUrl}/${gateway}`;
        localStorage.removeItem("url");
      }
      if (this.currentUrl === "/hostedPayment/payments/momopay") {
        this.router.navigate(["hostedPayment/payments/momopay", "processing"]);
      }
    }
  }

  validateNumberLength(event) {
    let number = `${event.target.value}`;
    if (number.length > 8 && event.key != "Backspace") {
      return false;
    }
  }
}
