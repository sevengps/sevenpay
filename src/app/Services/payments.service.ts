import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import * as $ from "jquery";

@Injectable({
  providedIn: "root",
})
export class PaymentsService {
  constructor(private httpClient: HttpClient) {}

  private Ocp_Apim_Subscription_Key = "bbaa48e584444f60be88c8b85676940e";
  private X_Reference_Id = "10f12a03-189c-436b-98e0-02df35f98354";
  callbackHost = {
    providerCallbackHost:
      "https://webhook.site/b448c4dc-a6ce-452b-88df-332a24d479ee",
  };

  private baseUrl = "https://sevenpay.herokuapp.com/";
  private paymentbaseUrl = "http://192.168.100.10/payments/payments/";

  /** ALL PAYMENT METHODS */

  //CREDIT CARD PAYMENT WITH STRIPE
  makeCreditCardPayments(card): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.httpClient.post<any>(
      this.baseUrl + "sevenpay/payment/creditCard",
      card,
      httpOptions
    );
  }

  /**CREATE API USER */
  createApiUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Ocp-Apim-Subscription-Key": this.Ocp_Apim_Subscription_Key,
        "X-Reference-Id": this.X_Reference_Id,
        "Content-Type": "application/json",
        Authorization:
          "Basic " + btoa("sevenpay-payments" + ":" + "sevenpay-payments@2020"),
      }),
    };
    return this.httpClient.post<any>(
      this.baseUrl + "payments/apiuser",
      this.callbackHost,
      httpOptions
    );
  }

  /**GET API USER */
  getApiUser(referenceId) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Ocp-Apim-Subscription-Key": this.Ocp_Apim_Subscription_Key,
        Authorization:
          "Basic " + btoa("sevenpay-payments" + ":" + "sevenpay-payments@2020"),
      }),
    };
    return this.httpClient.get(
      this.baseUrl + `payments/apiuser?X-Reference-Id=${referenceId}`,
      httpOptions
    );
  }

  /**CREATE API KEY */
  createApiKey(referenceId) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Ocp-Apim-Subscription-Key": this.Ocp_Apim_Subscription_Key,
        Authorization:
          "Basic " + btoa("sevenpay-payments" + ":" + "sevenpay-payments@2020"),
      }),
    };
    return this.httpClient.post<any>(
      this.baseUrl + "payments/apikey",
      { "X-Reference-Id": referenceId },
      httpOptions
    );
  }

  /**CREATE USER TOKEN */
  createUserToken(referenceId, apikey) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          "Basic " + btoa("sevenpay-payments" + ":" + "sevenpay-payments@2020"),
        "Ocp-Apim-Subscription-Key": this.Ocp_Apim_Subscription_Key,
      }),
    };
    return this.httpClient.post<any>(
      this.baseUrl + "payments/token",
      { "MoMo-Authorization": `Basic ${btoa(referenceId + ":" + apikey)}` },
      httpOptions
    );
  }

  /**MAKE PAYMENT */
  makeMomoPayment(customer, token, referenceId) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          "Basic " + btoa("sevenpay-payments" + ":" + "sevenpay-payments@2020"),
        "Ocp-Apim-Subscription-Key": this.Ocp_Apim_Subscription_Key,
        "X-Reference-Id": referenceId,
        "X-Target-Environment": "sandbox",
        "Content-Type": "application/json",
        "X-Callback-Url": this.callbackHost.providerCallbackHost,
      }),
    };
    const body = {
      amount: +customer.amount,
      currency: "CFA",
      externalId: "546457845",
      payer: {
        partyIdType: "MSISDN",
        partyId: +customer.mobileNumber,
      },
      payerMessage: "Pay for resources",
      payeeNote: "Credit account",
      "MoMo-Authorization": "Bearer" + " " + token,
    };
    console.log(body);
    return this.httpClient.post(
      this.baseUrl + "payments/momopay",
      JSON.stringify(body),
      httpOptions
    );
  }

  /**GET PAYMENT RESPONSE */
  getTransactionDetails(token, referenceId) {
    const httpOptions = {
      headers: new HttpHeaders({
        " Authorization": "Bearer " + token,
        "Ocp-Apim-Subscription-Key": this.Ocp_Apim_Subscription_Key,
        "X-Target-Environment": "sandbox",
      }),
    };
    return this.httpClient.get(
      this.baseUrl + `payments/checkpay?X-Reference-Id=${referenceId}`,
      httpOptions
    );
  }

  /**GET USER BALANCE */
  getUserBalance(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        " Authorization": "Bearer " + token,
        "Ocp-Apim-Subscription-Key": this.Ocp_Apim_Subscription_Key,
        "X-Target-Environment": "sandbox",
      }),
    };
    return this.httpClient.get(
      this.baseUrl + `payments/accountbalance`,
      httpOptions
    );
  }
}
