/**
 * PAYMENTS ROUTING MODULE
 * Exposes all the API endpoints dealing with payments
 */

const stripe = require("stripe")("sk_test_V6FCFoUTTlJKuGmp8hdemHiK00uqvfEVuM");
const express = require("express");
const appRouter = express.Router();
const transactionModel = require("../appModels/Model");
const paymentValidator = require("../validatorMiddlewares/validators/payments.validator");

let stripeValidator = (req, res, next) => {
  return new paymentValidator().stripeValidation(req, res, next);
};

let amountValidator = (req, res, next) => {
  return new paymentValidator().validateAmount(req, res, next);
};

/** CREDIT CARD PAYMENT */
appRouter.post("/creditCard", stripeValidator, (req, res) => {
  try {
    stripe.customers
      .create({
        name: req.body.name,
        email: req.body.email,
        source: req.body.id,
      })
      .then((customer) =>
        stripe.charges.create({
          amount: req.body.amount * 100,
          currency: "usd",
          customer: customer.id,
        })
      )
      .then((customer) => {
        // store transaction details to db
        transactionModel
          .create({
            amount: req.body.amount,
            transactionDate: new Date().toISOString(),
            gateway: "creditCard",
            platformId: "web",
          })
          .then((document) => {
            console.log(document);
          });
        res.json({
          success: true,
          message: "Payment was successful.",
          id: customer.id,
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    res.json(err);
  }
});

/** MTN MOBILE MONEY PAYMENT */
appRouter.post("/mtnMobileMoney", amountValidator, (req, res) => {
  transactionModel
    .create({
      amount: req.body.amount,
      transactionDate: new Date().toISOString(),
      gateway: "mtn",
      platformId: "web",
    })
    .then((document) => {
      res.json(document);
    });
});

/** ORANGE MOBILE MONEY PAYMENT */
appRouter.post("/orangeMobileMoney", amountValidator, (req, res) => {
  transactionModel
    .create({
      amount: req.body.amount,
      transactionDate: new Date().toISOString(),
      gateway: "orange",
      platformId: "web",
    })
    .then((document) => {
      res.json(document);
    });
});

/** EXPRESS UNION MONEY PAYMENT */
appRouter.post("/euPay", amountValidator, (req, res) => {
  transactionModel
    .create({
      amount: req.body.amount,
      transactionDate: new Date().toISOString(),
      gateway: "euPay",
      platformId: "web",
    })
    .then((document) => {
      res.json(document);
    });
});

/** YUP MOBILE MONEY PAYMENT */
appRouter.post("/yupPay", amountValidator, (req, res) => {
  transactionModel
    .create({
      amount: req.body.amount,
      transactionDate: new Date().toISOString(),
      gateway: "yup",
      platformId: "web",
    })
    .then((document) => {
      res.json(document);
    });
});

/** SAVE TRANSACTION DETAILS FROM MOBILE APP */
appRouter.post("/mobile", amountValidator, (req, res) => {
  transactionDetails = {
    amount: req.body.amount,
    transactionDate: new Date().toISOString(),
    gateway: req.body.gateway,
    platformId: "mobile",
  };
  transactionModel.create(transactionDetails).then((transaction) => {
    if (transaction._id) {
      res.json({ message: "success" });
    }
  });
});

module.exports = appRouter;
