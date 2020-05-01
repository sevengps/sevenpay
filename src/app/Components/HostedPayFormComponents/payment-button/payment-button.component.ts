import { Observable } from "rxjs";
import { Location } from "@angular/common";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-payment-button",
  templateUrl: "./payment-button.component.html",
  styleUrls: ["./payment-button.component.scss"],
})
export class PaymentButtonComponent implements OnInit {
  /**
   * EVENTS
   */
  @Output() emitSelectedGateway = new EventEmitter();
  @Output() nextEvent = new EventEmitter();
  @Input() selectedPayment;
  @Input() currentState;
  @Input() formState;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  openStep1 = true;
  openStep2 = true;
  openStep3 = true;
  waiting = true;
  emitNextEvent = "step2";
  buttonState;
  hideBtn;
  currentUrl = this.router.url;
  obsUrl: Observable<any>;

  // OnInit lifecycle hook
  ngOnInit() {
    if (this.formState === "mobileMoney") {
      this.buttonState = "Continuer";
    }

    this.route.paramMap.subscribe((url) => {
      console.log(url.get("web"));
    });
    this.obsUrl = Observable.create((observer) => {
      observer.next(this.router.url);
    });
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
      this.buttonState = "Paiement";
    }

    if (this.currentUrl === "/hostedPayment/payments/mobileMoney") {
      this.router.navigate(["hostedPayment/payments/momopay"]);
      this.buttonState = "Paiement";
    }

    if (this.currentUrl === "/hostedPayment/payments/momopay") {
      this.router.navigate(["hostedPayment/payments/momopay", "processing"]);
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
