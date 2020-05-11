import { RouterModule } from "@angular/router";
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
import { MomoPayComponent } from "../Components/HostedPayFormComponents/momo-pay/momo-pay.component";
import { MomoPayProcessingComponent } from "../Components/HostedPayFormComponents/momo-pay-processing/momo-pay-processing.component";
import { VisaPayProcessingComponent } from "../Components/HostedPayFormComponents/visa-pay-processing/visa-pay-processing.component";
import { VisaPayComponent } from "../Components/HostedPayFormComponents/visa-pay/visa-pay.component";
import { PaymentHomeComponent } from "../Components/HostedPayFormComponents/payment-home/payment-home.component";
import { UnauthorisedPageComponent } from "../Components/HostedPayFormComponents/unauthorised-page/unauthorised-page.component";

const paymentComponents = [
  PaymentMethodsComponent,
  SuccessPaymentComponent,
  SelectPaymentComponent,
  HostedPaymentComponent,
  HeadComponent,
  PaymentButtonComponent,
  PaymentBodyComponent,
  SuccessTransactionComponent,
  StripeModalComponent,
  MomoPayComponent,
  MomoPayProcessingComponent,
  VisaPayProcessingComponent,
  VisaPayComponent,
  PaymentHomeComponent,
  UnauthorisedPageComponent,
];

@NgModule({
  declarations: [paymentComponents],
  // entryComponents: [StripeModalComponent],
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  exports: [paymentComponents],
})
export class PaymentModule {}
