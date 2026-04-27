exports.transfer = (req, res) => {
  const { amount } = req.body;

  if (amount <= 0 || amount > 100000) {
    return res.status(400).send("Invalid amount");
  }

  res.send("Transaction successful");
};
