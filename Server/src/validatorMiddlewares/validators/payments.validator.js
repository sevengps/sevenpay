const errorMessages = require("../errorResponses/Errors.validator");
module.exports = class Payment {
  constructor() {}

  validateAmount(req, res, next) {
    let amount = req.body.amount;
    let actualAmountType = 0;
    if (amount === undefined) {
      errorMessages.emptyField('amount',amount, res);
    } else {
      if (typeof amount != "number") {
        errorMessages.invalidType(amount, actualAmountType, res);
      } else {
        return true;
      }
    }
  }

  validatename(req, res, next) {
    let name = req.body.username;
    let actualnameType = "";
    if (name === undefined) {
      errorMessages.emptyField('username',name, res);
    } else {
      if (typeof name != "string") {
        errorMessages.invalidType(name, actualnameType, res);
      } else {
        return true;
      }
    }
  }

  validateEmail(req, res, next) {
    let email = req.body.email;
    let actualEmailType = "";
    if (email === undefined) {
      errorMessages.emptyField('email',email, res);
    } else {
      if (typeof email != "string") {
        errorMessages.invalidType(email, actualEmailType, res);
      } else {
        return true;
      }
    }
  }

  stripeValidation(req, res, next) {
    if (
      this.validateAmount(req, res, next) &&
      this.validateEmail(req, res, next) &&
      this.validatename(req, res, next)
    ) {
      next();
    }
  }
};
