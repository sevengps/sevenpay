import { PaymentsService } from "./../../Services/payments.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-hosted-payment",
  templateUrl: "./hosted-payment.component.html",
  styleUrls: ["./hosted-payment.component.scss"],
})
export class HostedPaymentComponent implements OnInit {
  constructor() {}

  paymentHeader = "Selectionnez de votre mode de paiement";
  paymentHeaderResponsive = "Mode de paiement";
  selectedGateway = "";
  currentState = "Continuer";
  currentFormState: any;
  nextActiveState = "";
  previousActiveState: any;
  openStep2 = false;
  openStep3 = false;
  number1 = true;
  number2 = false;
  number3 = false;
  connector1 = false;
  connector2 = false;
  sucessPayment = false;
  waiting = false;
  formState;
  //OnInit lifecycle hook
  ngOnInit() {}

  getGateway(e) {
    this.selectedGateway = e;
    console.log(this.selectedGateway);
  }
  getCurrentFormState(event) {
    this.currentFormState = event;
    this.formState = event;
  }
  getNextEventFromButton(event) {
    this.nextActiveState = event;
    if (event === "step2" || event === "goBackToStep2") {
      this.paymentHeader = "Details de paiement";
    } else {
      if (event === "step2" || event === "goBackToStep2") {
        this.paymentHeader = "Details de paiement";
      } else {
        if (event === "waiting" || event === "goBackToWaiting") {
          this.paymentHeader = "Details de paiement";
        } else {
          if (event === "step3") {
            this.paymentHeader = "Paiement Effectué";
          }
        }
      }
    }
  }
  gotoPreviousFormState(event) {
    this.previousActiveState = event;
  }

  getPreviousFormState(event) {
    this.previousActiveState = event;
  }
}
