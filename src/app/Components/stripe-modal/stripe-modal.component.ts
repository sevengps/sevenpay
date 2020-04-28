import { PaymentsService } from "./../../Services/payments.service";
import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

declare const Stripe; // : stripe.StripeStatic;

@Component({
  selector: "app-stripe-modal",
  templateUrl: "./stripe-modal.component.html",
  styleUrls: ["./stripe-modal.component.scss"],
})
export class StripeModalComponent implements OnInit {
  constructor(
    // public dialogRef: MatDialogRef<StripeModalComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private paymentService: PaymentsService
  ) {}

  @ViewChild("cardElement") cardElement: ElementRef;
  @ViewChild("cardNumber") cardNumberElement: ElementRef;
  @ViewChild("cardExpiry") cardExpiryElement: ElementRef;
  @ViewChild("cardCvc") cardCvcElement: ElementRef;
  stripe;
  card;
  cardErrorOrPaymentSuccess;
  cardError = false;
  paymentSuccess = false;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  total = 37500;
  loading = false;
  pocessing = false;

  onNoClick(): void {
    // this.dialogRef.close();
  }
  ngOnInit() {
    const style = {
      base: {
        fontSize: "1rem",
        display: "none",
      },
    };

    this.stripe = Stripe("pk_test_cMSb95rYnQKA3lf8PkouCxxn00qYNqfZ1E");
    const elements = this.stripe.elements();

    this.cardNumber = elements.create("cardNumber", {
      showIcon: true,
      iconStyle: "solid",
      placeholder: "4242 4242 4242 4242 4242",
    });
    this.cardNumber.mount(this.cardNumberElement.nativeElement);

    this.cardNumber.addEventListener("change", ({ error }) => {
      this.cardErrorOrPaymentSuccess = error && error.message;
      this.cardError = true;
    });

    this.cardExpiry = elements.create("cardExpiry", {
      showIcon: true,
      iconStyle: "solid",
      placeholder: "09/22",
    });
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);

    this.cardExpiry.addEventListener("change", ({ error }) => {
      this.cardErrorOrPaymentSuccess = error && error.message;
      this.cardError = true;
    });

    this.cardCvc = elements.create("cardCvc", {
      showIcon: true,
      iconStyle: "solid",
      placeholder: "645",
    });
    this.cardCvc.mount(this.cardCvcElement.nativeElement);

    this.cardCvc.addEventListener("change", ({ error }) => {
      this.cardErrorOrPaymentSuccess = error && error.message;
      this.cardError = true;
    });
  }

  async makePayment(event) {
    event.preventDefault();
    const { source, error } = await this.stripe.createSource(this.cardNumber);
    if (error) {
      this.cardErrorOrPaymentSuccess = error.message;
      this.cardError = true;
    } else {
      this.pocessing = true;
      this.loading = true;
      const user = {
        id: source.id,
        username: "sinclairegps kambang",
        email: "sinclaire7gps@yahoomail.com",
        amount: this.total,
      };
      this.paymentService.makeCreditCardPayments(user).subscribe((response) => {
        setTimeout(() => {
          if (response) {
            console.log(response);
            if (response.message === "Payment was successful.") {
              this.loading = false;
              this.pocessing = false;
              this.cardErrorOrPaymentSuccess = response.message;
              this.paymentSuccess = true;
              setTimeout(() => {
                // this.dialogRef.close();
              }, 1000);
            }
          }
        }, 1000);
      });
    }
  }

  closeModal() {
    // this.dialogRef.close("cancelled");
  }
}
export interface DialogData {
  animal: string;
  name: string;
}
