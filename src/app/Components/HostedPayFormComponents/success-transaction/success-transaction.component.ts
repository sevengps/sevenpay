import { PaymentsService } from "src/app/Services/payments.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-success-transaction",
  templateUrl: "./success-transaction.component.html",
  styleUrls: ["./success-transaction.component.scss"],
})
export class SuccessTransactionComponent implements OnInit {
  transDate = new Date("Thu, 07 May 2020").toUTCString();
  Date;
  Time;
  currentUrl: any;

  constructor(
    private router: Router,
    private paymentService: PaymentsService
  ) {}

  successPayment = true;
  openStep3 = true;
  transId = "N° TR54HA00959";
  total = 37500;
  selectedGateway = "mobileMoney";
  currentRoute = "success";
  url;
  mobileNumber: any;
  loading: boolean;
  connector1 = true;
  connector2 = true;
  number3 = true;
  number1 = true;
  number2 = true;
  number_1_Large = false;
  number_2_Large = false;
  number_3_Large = true;
  readOnly = false;
  momopayWaiting = false;
  visacardWaiting = false;
  activeUrl = "";
  adjustContainer = false;
  hideButton = false;
  buttonState = "Continuer";

  ngOnInit() {}

  next() {
    this.currentUrl = this.router.url;
    let gateway = localStorage.getItem("url");
    if (gateway != null) {
      this.currentUrl = `${this.currentUrl}/${gateway}`;
      localStorage.removeItem("url");
    }
    console.log(this.currentUrl);
    if (this.currentUrl === "/hostedPayment/payments/success") {
      this.buttonState = "Continuer";
      // this.router.navigate([""]);
      this.paymentService.successRedirect({}).subscribe((data)=>{
        console.log(data);
        
      });
    }
  }
}
