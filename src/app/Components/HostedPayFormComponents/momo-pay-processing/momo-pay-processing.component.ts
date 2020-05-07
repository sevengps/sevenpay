import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-momo-pay-processing",
  templateUrl: "./momo-pay-processing.component.html",
  styleUrls: ["./momo-pay-processing.component.scss"],
})
export class MomoPayProcessingComponent implements OnInit {
  currentUrl: string;
  constructor(private router: Router) {}

  buttonState: any;
  openStep2 = true;
  selectedGateway = "mobileMoney";
  currentRoute = "momopay";
  successPayment = true;
  total = 37500;
  mobileNumber: any;
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

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(["hostedPayment/payments/success"]);
    }, 3000);
  }

  next() {
    this.currentUrl = this.router.url;
    let gateway = localStorage.getItem("url");
    if (gateway != null) {
      this.currentUrl = `${this.currentUrl}/${gateway}`;
      localStorage.removeItem("url");
    }
    console.log(this.currentUrl);

    if (this.currentUrl === "/hostedPayment/payments/momopay/processing") {
      this.router.navigate(["hostedPayment/payments/success"]);
      this.buttonState = "Continuer";
    }
  }
}
