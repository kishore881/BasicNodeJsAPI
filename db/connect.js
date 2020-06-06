const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
