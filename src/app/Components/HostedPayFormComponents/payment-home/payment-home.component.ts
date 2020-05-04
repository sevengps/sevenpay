import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-payment-home",
  templateUrl: "./payment-home.component.html",
  styleUrls: ["./payment-home.component.scss"],
})
export class PaymentHomeComponent implements OnInit {
  currentUrl: string;
  constructor(private router: Router, private location: Location) {}

  @Output() paymentMethod = new EventEmitter();

  total = 37500;
  selectedGateway = "mobileMoney";
  url;
  successPayment = true;
  mobileNumber: any;
  connector1 = false;
  connector2 = false;
  number1 = true;
  number2 = false;
  openStep1 = true;
  number_1_Large = true;
  number_2_Large = false;
  number_3_Large = false;
  readOnly = false;
  number3;
  momopayWaiting = false;
  visacardWaiting = false;
  activeUrl = "";
  adjustContainer = false;
  hideButton = false;
  buttonState = "Continuer";

  ngOnInit() {}

  valueChanged(event) {
    this.url = this.router.url;
    localStorage.setItem("url", event.value);
    this.paymentMethod.emit(event.value);
  }

  next() {
    this.currentUrl = this.router.url;
    let gateway = localStorage.getItem("url");
    if (gateway != null) {
      this.currentUrl = `${this.currentUrl}/${gateway}`;
      localStorage.removeItem("url");
    }

    console.log(this.currentUrl);

    if (this.currentUrl === "/hostedPayment/payments") {
      this.router.navigate(["hostedPayment/payments/momopay"]);
      this.hideButton = true;
    }

    if (this.currentUrl === "/hostedPayment/payments/mobileMoney") {
      this.router.navigate(["hostedPayment/payments/momopay"]);
      this.hideButton = true;
    }

    if (this.currentUrl === "/hostedPayment/payments/visaCard") {
      this.router.navigate(["hostedPayment/payments/visapay"]);
      this.buttonState = "Paiement";
    }
  }
}
