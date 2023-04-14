const registerUser = (req, res) => {
  try {
    const { name, email, phone, password } = req.fields;
    const { image } = req.files;
    res.status(201).json({
      message: "user is created",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { registerUser };
