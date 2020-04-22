/**
 *  REPORTING ROUTING MODULE.
 *  Exposes all the API endpoints dealing with transaction or payments reporting
 */

const express = require("express");
const appRouter = express.Router();
const transactionModel = require("../appModels/Model");
const validator = require("../validatorMiddlewares/validators/report.validator");

let reportValidator = new validator();

/** ALL TRANSACTIONS PER PERIOD SPECIFIED */
appRouter.post("/perPeriod", (req, res, next) => {
  if (reportValidator.dateValidator(req, res, next)) {
    let startDate = new Date(req.body.startDate).toISOString();
    let endDate = new Date(req.body.endDate).toISOString();
    transactionModel
      .find({
        transactionDate: {
          $gte: startDate,
          $lt: endDate,
        },
      })
      .then((transactions) => {
        console.log(transactions);
        res.json(transactions);
      });
  }
});

/** ALL TRANSACTIONS PER PAYMENT GATEWAY */
appRouter.post("/perGateway", (req, res, next) => {
  if (reportValidator.gatewayValidator(req, res, next)) {
    transactionModel
      .find({ gateway: req.body.gateway })
      .then((transactions) => {
        if (transactions != null) {
          res.json(transactions);
        } else {
          res.json({ message: "Gateway not found" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

/** ALL TRANSACTIONS PER PAYMENT GATEWAY DURING PERIOD SPECIFIED */
appRouter.post("/gatewayPerPeriod", (req, res, next) => {
  if (
    reportValidator.gatewayValidator(req, res, next) &&
    reportValidator.dateValidator(req, res, next)
  ) {
    let startDate = new Date(req.body.startDate).toISOString();
    let endDate = new Date(req.body.endDate).toISOString();
    transactionModel
      .find({
        transactionDate: { $gte: startDate, $lt: endDate },
        gateway: req.body.gateway,
      })
      .then((data) => {
        if (data.length > 0) {
          res.json(data);
        } else {
          res.json({
            message: `Transactions were not recorded by ${req.body.gateway} between ${req.body.startDate} and ${req.body.endDate}`,
          });
        }
      });
  }
});

/** ALL TRANSACTIONS PER PAYMENT GATEWAY DURING PERIOD SPECIFIED USING THE PLATFORM SPECIFIED*/
appRouter.post("/platformPerPeriodGateway", (req, res, next) => {
  if (
    reportValidator.dateValidator(req, res, next) &&
    reportValidator.gatewayValidator(req, res, next) &&
    reportValidator.platformValidator(req, res, next)
  ) {
    let startDate = new Date(req.body.startDate).toISOString();
    let endDate = new Date(req.body.endDate).toISOString();
    transactionModel
      .find({
        transactionDate: { $gte: startDate, $lt: endDate },
        gateway: req.body.gateway,
        platformId: req.body.platformId,
      })
      .then((data) => {
        if (data.length > 0) {
          res.json(data);
        } else {
          res.json({
            message: `Transactions were not recorded by ${req.body.gateway} between ${req.body.startDate} and ${req.body.endDate} using ${req.body.platformId}`,
          });
        }
      });
  }
});

/** ALL TRANSACTIONS RECORDED SO FAR */
appRouter.get("/allPayments", (req, res) => {
  transactionModel.find({}, (error, transactions) => {
    res.json(transactions);
  });
});

module.exports = appRouter;
