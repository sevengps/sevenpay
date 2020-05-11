import { PaymentsService } from "src/app/Services/payments.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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

@Component({
  selector: "app-select-payment",
  templateUrl: "./select-payment.component.html",
  styleUrls: ["./select-payment.component.scss"],
})
export class SelectPaymentComponent implements OnInit {
  displayedColumns: string[] = [
    "No_deFacture",
    "Agence",
    "MoireConcerne",
    "MontantPayer",
    "date",
  ];

  dataSource = ELEMENT_DATA;

  constructor(
    private router: Router,
    private paymentService: PaymentsService
  ) {}

  ngOnInit() {}

  openHostedPayment() {
    // this.router.navigate(["/hostedPayment","payments"]);
    this.paymentService.myEasyLight({}).subscribe((data) => {
      console.log(data);
    });
  }
}

export interface PeriodicElement {
  No_deFacture: number;
  Agence: string;
  MoireConcerne: string;
  MontantPayer: string;
  date: string;
}
