import { PaymentsService } from "./../../Services/payments.service";
import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

const ELEMENT_DATA: PeriodicElement[] = [
  {
    No_deFacture: 4090365,
    Agence: "Bonamoussadi",
    MoireConcerne: "Fev 2020",
    MontantPayer: "25 000 FCFA",
    date: "18/03/2020",
  },

  {
    No_deFacture: 2025577,
    Agence: "Bonamoussadi",
    MoireConcerne: "Jan 2020",
    MontantPayer: "10 000 FCFA",
    date: "18/01/2020",
  },

  {
    No_deFacture: 3590776,
    Agence: "Bonamoussadi",
    MoireConcerne: "Dec 2020",
    MontantPayer: "2 500 FCFA",
    date: "09/02/2020",
  },
];

declare const Stripe; // : stripe.StripeStatic;

@Component({
  selector: "app-payment-methods",
  templateUrl: "./payment-methods.component.html",
  styleUrls: ["./payment-methods.component.scss"],
})
export class PaymentMethodsComponent implements OnInit {
  displayedColumns: string[] = [
    "No_deFacture",
    "Agence",
    "MoireConcerne",
    "MontantPayer",
    "date",
  ];

  dataSource = ELEMENT_DATA;

  momoPaymentMethod = false;
  allowMomoPayment = true;
  allowCardPayment = true;
  creditCardPaymentMethod = false;
  tickCreditCard = "tickCreditCard";
  hideMomo = "";
  hideCard = "";
  showCard = false;
  showMomo = false;
  loading: boolean;
  total = 37500;
  stripe;
  card;
  cardErrors;
  @ViewChild("cardElement") cardElement: ElementRef;
  @ViewChild("cardNumber") cardNumberElement: ElementRef;
  @ViewChild("cardExpiry") cardExpiryElement: ElementRef;
  @ViewChild("cardCvc") cardCvcElement: ElementRef;
  cardNumber: any;

  cardExpiry: any;

  cardCvc: any;
  mobileNumber: any;

  constructor(
    private router: Router,
    private paymentService: PaymentsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const style = {
      base: {
        fontSize: "1rem",
        display: "none",
      },
    };

    this.stripe = Stripe("pk_test_cMSb95rYnQKA3lf8PkouCxxn00qYNqfZ1E");
    const elements = this.stripe.elements();

    this.cardNumber = elements.create("cardNumber", {
      showIcon: true,
      iconStyle: "solid",
      placeholder: "4242 4242 4242 4242 4242",
    });
    this.cardNumber.mount(this.cardNumberElement.nativeElement);

    this.cardNumber.addEventListener("change", ({ error }) => {
      this.cardErrors = error && error.message;
    });

    this.cardExpiry = elements.create("cardExpiry");
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);

    this.cardExpiry.addEventListener("change", ({ error }) => {
      this.cardErrors = error && error.message;
    });

    this.cardCvc = elements.create("cardCvc");
    this.cardCvc.mount(this.cardCvcElement.nativeElement);

    this.cardCvc.addEventListener("change", ({ error }) => {
      this.cardErrors = error && error.message;
    });
  }

  // Making momo payment
  momoPayment() {
    const customer = {
      amount: this.total,
      mobileNumber: this.mobileNumber,
    };
    this.loading = true;
    this.snackBar.open("Pocessing...Please Wait", "", {
      duration: 2000,
    });

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

  //Credit card payment
  async payment(event) {
    event.preventDefault();

    const { source, error } = await this.stripe.createSource(this.cardNumber);

    if (error) {
      this.cardErrors = error.message;
    } else {
      this.loading = true;
      this.snackBar.open("Pocessing...Please Wait", "", {
        duration: 2000,
      });
      const user = {
        id: source.id,
        username: "sinclairegps kambang",
        email: "sinclaire7gps@yahoomail.com",
        amount: this.total,
      };

      this.paymentService.makeCreditCardPayments(user).subscribe((response) => {
        if (response) {
          console.log(response);
          setTimeout(() => {
            this.loading = false;
            this.snackBar.open(response.message, "", {
              duration: 3000,
            });
            localStorage.setItem("trans", JSON.stringify(response.id));
            this.router.navigate(["/payment/successful"]);
          }, 1000);
        }
      });
    }
  }
  // End credit card payment

  openMobileMoneyForm() {
    this.showMomo = true;
    this.showCard = false;
  }
  openCreditCardForm() {
    this.showCard = true;
    this.showMomo = false;
  }

  validatePayment() {
    this.router.navigate(["/payment/successful"]);
  }
}

export interface PeriodicElement {
  No_deFacture: number;
  Agence: string;
  MoireConcerne: string;
  MontantPayer: string;
  date: string;
}
