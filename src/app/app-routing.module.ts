import { SuccessTransactionComponent } from "./Components/HostedPayFormComponents/success-transaction/success-transaction.component";
import { WelcomeComponent } from "./Components/welcome/welcome.component";
import { HostedPaymentComponent } from "./Components/hosted-payment/hosted-payment.component";
import { HomeComponent } from "./Components/home/home.component";
import { PaymentMethodsComponent } from "./Components/payment-methods/payment-methods.component";
import { SuccessPaymentComponent } from "./Components/success-payment/success-payment.component";
import { SelectPaymentComponent } from "./Components/select-payment/select-payment.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

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
    path: "hostedPayment/:method",
    component: HostedPaymentComponent,
    children: [
      {
        path: "",
        component: PaymentMethodsComponent,
      },
      {
        path: "payment",
        component: SelectPaymentComponent,
      },
      {
        path: "processing",
        component: SuccessPaymentComponent,
      },
      {
        path: "success",
        component: SuccessTransactionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
