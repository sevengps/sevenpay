import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { PaymentsService } from "src/app/Services/payments.service";
import { Router } from "@angular/router";
declare const Stripe;
@Component({
  selector: "app-visa-pay-processing",
  templateUrl: "./visa-pay-processing.component.html",
  styleUrls: ["./visa-pay-processing.component.scss"],
})
export class VisaPayProcessingComponent implements OnInit {
  currentUrl: any;

  buttonState: string;
  constructor(
    private paymentService: PaymentsService,
    private router: Router
  ) {}

  @ViewChild("cardElement") cardElement: ElementRef;
  @ViewChild("cardNumber") cardNumberElement: ElementRef;
  @ViewChild("cardExpiry") cardExpiryElement: ElementRef;
  @ViewChild("cardCvc") cardCvcElement: ElementRef;
  stripe;
  card;
  cardErrorOrPaymentSuccess;
  cardError = false;
  paymentSuccess = false;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  pocessing = false;

  successPayment = true;
  total = 37500;
  mobileNumber: any;
  loading: boolean;
  openStep2 = true;
  currentRoute = "visapay";
  selectedGateway = "mobileMoney";
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
  hideButton = false;

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(["hostedPayment/payments/success"]);
    }, 3000);

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
      this.cardErrorOrPaymentSuccess.innerHTML = error && error.message;
      this.cardError = true;
    });

    this.cardExpiry = elements.create("cardExpiry", {
      showIcon: true,
      iconStyle: "solid",
      placeholder: "09/22",
    });
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);

    this.cardExpiry.addEventListener("change", ({ error }) => {
      this.cardErrorOrPaymentSuccess.innerHTML = error && error.message;
      this.cardError = true;
    });

    this.cardCvc = elements.create("cardCvc", {
      showIcon: true,
      iconStyle: "solid",
      placeholder: "645",
    });
    this.cardCvc.mount(this.cardCvcElement.nativeElement);

    this.cardCvc.addEventListener("change", ({ error }) => {
      this.cardErrorOrPaymentSuccess.innerHTML = error && error.message;
      this.cardError = true;
    });
  }

  next() {
    this.currentUrl = this.router.url;
    let gateway = localStorage.getItem("url");
    if (gateway != null) {
      this.currentUrl = `${this.currentUrl}/${gateway}`;
      localStorage.removeItem("url");
    }

    console.log(this.currentUrl);

    if (this.currentUrl === "/hostedPayment/payments/visapay/processing") {
      this.router.navigate(["hostedPayment/payments/success"]);
      this.buttonState = "Continuer";
    }
  }
}
