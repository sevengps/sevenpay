import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-success-transaction",
  templateUrl: "./success-transaction.component.html",
  styleUrls: ["./success-transaction.component.scss"],
})
export class SuccessTransactionComponent implements OnInit {
  transDate = new Date().toUTCString();

  constructor() {}
  successPayment = true;

  transId ="N° TR54HA00959";
  total = 37500;
  ngOnInit() {}
}
