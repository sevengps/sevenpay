/**
 *  REPORTING MIDDLEWARE
 * Validates all parameters to be accessed in the router module
 */

const errorMessages = require("../errorResponses/Errors.validator");
module.exports = class Report {
  constructor() {}

  dateValidator(req, res, next) {
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let expectedType = "";
    if (startDate === undefined) {
      errorMessages.emptyField('startDate',startDate, res);
    } else {
      if (endDate === undefined) {
        errorMessages.emptyField('endDate',endDate, res);
      } else {
        if (typeof startDate != "string") {
          errorMessages.invalidType(startDate, expectedType, res);
        } else {
          if (typeof endDate != "string") {
            errorMessages.invalidType(endDate, expectedType, res);
          } else {
            return true;
          }
        }
      }
    }
  }

  gatewayValidator(req, res, next) {
    let gateway = req.body.gateway;
    let expectedType = "";
    if (gateway === undefined) {
      errorMessages.emptyField('gateway',gateway, res);
    } else {
      if (typeof gateway != "string") {
        errorMessages.invalidType(gateway, expectedType, res);
      } else {
        return true;
      }
    }
  }

  platformValidator(req, res, next) {
    let platformId = req.body.platformId;
    let expectedType = "";
    if (platformId === undefined) {
      errorMessages.emptyField('platformId',platformId, res);
    } else {
      if (typeof platformId != "string") {
        errorMessages.invalidType(platformId, expectedType, res);
      } else {
        return true;
      }
    }
  }
};
