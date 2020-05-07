import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { PaymentsService } from "src/app/Services/payments.service";
import { Router } from "@angular/router";
declare const Stripe;
@Component({
  selector: "app-visa-pay",
  templateUrl: "./visa-pay.component.html",
  styleUrls: ["./visa-pay.component.scss"],
})
export class VisaPayComponent implements OnInit {
  currentUrl: any;

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
  buttonState = "Paiement";
  hideButton = false;
  alternate;

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
      this.cardErrorOrPaymentSuccess = error && error.message;
      this.cardError = true;
    });

    this.cardExpiry = elements.create("cardExpiry", {
      showIcon: true,
      iconStyle: "solid",
      placeholder: "09/22",
    });
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);

    this.cardExpiry.addEventListener("change", ({ error }) => {
      this.cardErrorOrPaymentSuccess = error && error.message;
      this.cardError = true;
    });

    this.cardCvc = elements.create("cardCvc", {
      showIcon: true,
      iconStyle: "solid",
      placeholder: "645",
    });
    this.cardCvc.mount(this.cardCvcElement.nativeElement);

    this.cardCvc.addEventListener("change", ({ error }) => {
      this.cardErrorOrPaymentSuccess = error && error.message;
      this.cardError = true;
    });
  }

  async makePayment() {
    const { source, error } = await this.stripe.createSource(this.cardNumber);
    if (error) {
      this.cardErrorOrPaymentSuccess = error.message;
      this.cardError = true;
    } else {
      this.router.navigate(["hostedPayment/payments/visapay", "processing"]);
    }
  }

  triggerPayment(event) {
    if (
      event.code.startsWith("Num") ||
      event.code.startsWith("Digi") ||
      event.code.startsWith("Minus") ||
      event.code.startsWith("Equal")
    ) {
      return false;
    } else {
      if (event.key === "Enter") {
        this.makePayment();
      }
    }
  }

  next(event) {
    this.makePayment();
  }
}
