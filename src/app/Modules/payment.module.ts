import { FormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentMethodsComponent } from "../Components/payment-methods/payment-methods.component";
import { SuccessPaymentComponent } from "../Components/success-payment/success-payment.component";
import { SelectPaymentComponent } from "../Components/select-payment/select-payment.component";
import { HostedPaymentComponent } from "../Components/hosted-payment/hosted-payment.component";
import { HeadComponent } from "../Components/HostedPayFormComponents/head/head.component";
import { PaymentButtonComponent } from "../Components/HostedPayFormComponents/payment-button/payment-button.component";
import { PaymentBodyComponent } from "../Components/HostedPayFormComponents/payment-body/payment-body.component";
import { SuccessTransactionComponent } from "../Components/HostedPayFormComponents/success-transaction/success-transaction.component";
import { StripeModalComponent } from "../Components/stripe-modal/stripe-modal.component";

const paymentComponents = [
  PaymentMethodsComponent,
  SuccessPaymentComponent,
  SelectPaymentComponent,
];

@NgModule({
  declarations: [
    paymentComponents,
    HostedPaymentComponent,
    HeadComponent,
    PaymentButtonComponent,
    PaymentBodyComponent,
    SuccessTransactionComponent,
    StripeModalComponent,
  ],
  // entryComponents: [StripeModalComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [paymentComponents],
})
export class PaymentModule {}
