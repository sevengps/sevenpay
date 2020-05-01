import { PaymentsService } from "./../../../Services/payments.service";
import { Router, ActivatedRoute } from "@angular/router";

import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  Input,
  SimpleChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material";
import { StripeModalComponent } from "../../stripe-modal/stripe-modal.component";

@Component({
  selector: "app-payment-body",
  templateUrl: "./payment-body.component.html",
  styleUrls: ["./payment-body.component.scss"],
})
export class PaymentBodyComponent implements OnInit {
  /**
   * OUTPUT EVENT EMITTERS
   */
  @Output() paymentMethod = new EventEmitter();
  @Output() emitCurrentState = new EventEmitter();
  @Output() emitPreviouState = new EventEmitter();
  @Input() receiveNextActiveState;
  @Input() receivePreviousActiveState;
  currentUrl: string;
  buttonState: string = "Continuer";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private paymentService: PaymentsService
  ) {}

  successPayment = true;
  total = 37500;
  mobileNumber: any;
  loading: boolean;
  openStep1 = true;
  openStep2 = false;
  openStep3 = false;
  selectedGateway = "mobileMoney";
  useStripe = true;
  connector1 = false;
  connector2 = false;
  number1 = true;
  number2 = false;
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

  ngOnInit() {
    this.emitCurrentState.emit(this.selectedGateway);
    this.paymentMethod.emit(this.selectedGateway);
    console.log(this.router.url);
    this.route.paramMap.subscribe((url) => {
      console.log(url);
    });
  }

  getActivatedRoute(event) {
    console.log(event);
    if (
      (event.selectedGateway != undefined &&
        event.selectedGateway === "mobileMoney") ||
      event.selectedGateway === "visaCard"
    ) {
      this.paymentMethod.emit(event.selectedGateway);
    }

    if (event.openStep2 != undefined || event.waiting != undefined) {
      this.openStep2 = true;
      this.connector1 = true;
      this.number_2_Large = true;
      this.number_1_Large = false;
      this.number2 = true;
    } else {
      this.number_2_Large = false;
      this.number2 = false;
      this.connector1 = false;
      this.number3 = false;
      this.openStep3 = false;
      this.number_3_Large = false;
      this.connector2 = false;
    }

    if (event.openStep3 != undefined) {
      this.openStep3 = true;
      this.connector1 = true;
      this.connector2 = true;
      this.number2 = true;
      this.number_2_Large = false;
      this.number_1_Large = false;
      this.number_3_Large = true;
      this.number3 = true;
    }

    if (event.currentRoute != undefined && event.currentRoute === "momopay") {
      this.adjustContainer = true;
    } else {
      this.adjustContainer = false;
    }
  }

  selectionChange(eevent) {
    console.log(eevent);
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

    if (this.currentUrl === "/hostedPayment/payments/momopay") {
      this.router.navigate(["hostedPayment/payments/momopay", "processing"]);
      this.hideButton = false;
      this.buttonState = "Loading";
    }

    if (this.currentUrl === "/hostedPayment/payments/momopay/processing") {
      this.router.navigate(["hostedPayment/payments/success"]);
      this.buttonState = "Continuer";
    }

    if (this.currentUrl === "/hostedPayment/payments/visaCard") {
      this.router.navigate(["hostedPayment/payments/visapay"]);
      this.buttonState = "Paiement";
    }

    if (this.currentUrl === "/hostedPayment/payments/visapay") {
      this.router.navigate(["hostedPayment/payments/visapay", "processing"]);
      this.buttonState = "Loading";
    }

    if (this.currentUrl === "/hostedPayment/payments/visapay/processing") {
      this.router.navigate(["hostedPayment/payments/success"]);
      this.buttonState = "Continuer";
    }

    if (this.currentUrl === "/hostedPayment/payments/success") {
      this.buttonState = "Continuer";
      this.router.navigate([""]);
    }
  }
}
