const testRoute = (req, res) => {
  res.status(200).json({ message: "Test route is working perfectly!" });
};

module.exports = {
  testRoute,
};
