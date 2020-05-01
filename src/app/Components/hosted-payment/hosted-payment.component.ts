import { PaymentsService } from "./../../Services/payments.service";
import { Component, OnInit, SimpleChanges, OnChanges } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-hosted-payment",
  templateUrl: "./hosted-payment.component.html",
  styleUrls: ["./hosted-payment.component.scss"],
})
export class HostedPaymentComponent implements OnInit {
  constructor(private router: Router) {}

  paymentHeader = "Selectionnez de votre mode de paiement";
  paymentHeaderResponsive = "Mode de paiement";
  selectedGateway = "";
  currentState = "Continuer";
  currentRoute = "";
  openStep2 = false;
  openStep3 = false;
  sucessPayment = false;
  waiting = false;
  formState;
  getUrl = this.router.url;
  ngOnInit() {}

  showPhone = false;
  showCard = false;

  getGateway(e) {
    this.selectedGateway = e;
    console.log(this.selectedGateway);
  }

  getActivatedComponentDetails(event) {
    console.log(event);

    if (event.openStep2 != undefined || event.waiting != undefined) {
      this.openStep2 = true;
      this.paymentHeader = "Mode de paiement";
    }

    if (event.openStep3 != undefined) {
      this.openStep3 = true;
      this.openStep2 = false;
      this.paymentHeader = "Paiement Effectué";
    }

    if (event.currentRoute != undefined && event.currentRoute === "momopay") {
      this.currentRoute = event.currentRoute;
    } else {
      if (event.currentRoute != undefined && event.currentRoute === "visapay") {
        this.currentRoute = event.currentRoute;
      }
    }
  }
}
