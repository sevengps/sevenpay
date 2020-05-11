import { UnauthorisedPageComponent } from "./Components/HostedPayFormComponents/unauthorised-page/unauthorised-page.component";
import { PaymentHomeComponent } from "./Components/HostedPayFormComponents/payment-home/payment-home.component";
import { MomoPayProcessingComponent } from "./Components/HostedPayFormComponents/momo-pay-processing/momo-pay-processing.component";
import { VisaPayProcessingComponent } from "./Components/HostedPayFormComponents/visa-pay-processing/visa-pay-processing.component";
import { SuccessTransactionComponent } from "./Components/HostedPayFormComponents/success-transaction/success-transaction.component";
import { WelcomeComponent } from "./Components/welcome/welcome.component";
import { HostedPaymentComponent } from "./Components/hosted-payment/hosted-payment.component";
import { HomeComponent } from "./Components/home/home.component";
import { PaymentMethodsComponent } from "./Components/payment-methods/payment-methods.component";
import { SuccessPaymentComponent } from "./Components/success-payment/success-payment.component";
import { SelectPaymentComponent } from "./Components/select-payment/select-payment.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MomoPayComponent } from "./Components/HostedPayFormComponents/momo-pay/momo-pay.component";
import { VisaPayComponent } from "./Components/HostedPayFormComponents/visa-pay/visa-pay.component";

const routes: Routes = [
  {
    path: "",
    component: SelectPaymentComponent,
  },
  {
    path: "payment",
    component: HomeComponent,
    children: [
      {
        path: "directPayment",
        component: PaymentMethodsComponent,
      },
      {
        path: "hostedPayment",
        component: SelectPaymentComponent,
      },
      {
        path: "successful",
        component: SuccessPaymentComponent,
      },
    ],
  },

  {
    path: "hostedPayment/:web",
    component: HostedPaymentComponent,
    children: [
      {
        path: "",
        component: PaymentHomeComponent,
      },
      {
        path: "momopay/:processing",
        component: MomoPayProcessingComponent,
      },
      {
        path: "visapay/:processing",
        component: VisaPayProcessingComponent,
      },
      {
        path: "momopay",
        component: MomoPayComponent,
      },
      {
        path: "visapay",
        component: VisaPayComponent,
      },
      {
        path: "orangeMoney",
        component: PaymentHomeComponent,
      },
      {
        path: "expressUnion",
        component: PaymentHomeComponent,
      },
      {
        path: "paypalCard",
        component: PaymentHomeComponent,
      },
      {
        path: "ubaCard",
        component: PaymentHomeComponent,
      },
      {
        path: "cardBlue",
        component: PaymentHomeComponent,
      },
      {
        path: "success",
        component: SuccessTransactionComponent,
      },
      {
        path: "**",
        component: PaymentHomeComponent,
      },
    ],
  },

  {
    path: "unauthorizedAccess",
    component: UnauthorisedPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
