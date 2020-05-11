import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

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
  // private baseUrl = "http://localhost:5000/";
  private paymentbaseUrl = "http://192.168.100.10/payments/payments/";
  /**
   *
   * TRY LOCALS
   */
  myEasyLight(body): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization:
          "Basic username=Sinclairekambang:password=1234567891012345",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    body = {
      transactions: [
        {
          amount: 37500,
          bill_ref: 1452877897,
        },
      ],
      transaction_id: 587946213,
      total_amount: 37500,
      return_url: "https://www.eneocameroon.cm/index.php/en/",
      API_KEY: "khdfkjshkjds56456465sdfsdfsdfsdfsdf6544dxhsajkhfds9678946vsdv",
    };
    console.log("hello");

    return this.httpClient.post<any>(
      this.baseUrl + "sevenpay/payment/pay",
      body,
      httpOptions
    );
  }

  successRedirect(body): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    body = {
      transactions: [
        {
          amount: 37500,
          bill_ref: 1452877897,
        },
      ],
      transaction_id: 587946213,
      total_amount: 37500,
      return_url: "https://eneo/myeasylight.com",
      API_KEY: "khdfkjshkjds56456465sdfsdfsdfsdfsdf",
    };
    console.log("hello");

    return this.httpClient.post<any>(
      this.baseUrl + "sevenpay/payment/success",
      body,
      httpOptions
    );
  }

  getAuthHeader(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "sevenpay/payment/auth");
  }

  getAllAvailableProviders(auth): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: auth,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
    };
    return this.httpClient.get<any>(
      this.baseUrl + "sevenpay/payment/providers"
    );
  }

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
