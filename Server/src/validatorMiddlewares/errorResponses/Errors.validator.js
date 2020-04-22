module.exports = {
  invalidType: (field, expected, res) => {
    res.status(400).json({
      status: 400,
      message: `Invalid type sent. Expected ${typeof expected} but got ${typeof field}`,
    });
  },
  emptyField: (parameter,value, res) => {
    res.status(400).json({
      status: 400,
      message: `Received ${value}.Value for ${parameter} cannot be empty or undefined.`,
    });
  },
};
