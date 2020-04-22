import { PaymentsService } from "./../../Services/payments.service";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Input,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";

declare const Stripe; // : stripe.StripeStatic;

@Component({
  selector: "app-hosted-payment",
  templateUrl: "./hosted-payment.component.html",
  styleUrls: ["./hosted-payment.component.scss"],
})
export class HostedPaymentComponent implements OnInit {
  constructor() {}

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
  }
  gotoPreviousFormState(event) {
    this.previousActiveState = event;
    console.log("this is the previous state  " + event);
  }

  // getPreviousFormState(event) {}
}
