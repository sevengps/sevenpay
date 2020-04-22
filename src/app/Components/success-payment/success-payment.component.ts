import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-success-payment",
  templateUrl: "./success-payment.component.html",
  styleUrls: ["./success-payment.component.scss"],
})
export class SuccessPaymentComponent implements OnInit {
  constructor(private router: Router) {}

  transId;
  date = Date.now();
  ngOnInit() {
    this.transId = JSON.parse(localStorage.getItem("trans"));
    localStorage.removeItem("trans");
  }
  continueBrowsing() {
    this.router.navigate(["/"]);
  }
}
