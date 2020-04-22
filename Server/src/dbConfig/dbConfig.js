const mongoose = require("mongoose");
module.exports = {
  dbConfig: (dbUrl) => {
    mongoose.connect(
      dbUrl,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (error, res) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Successfully connected to the database");
        }
      }
    );
  },
};
