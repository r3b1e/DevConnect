const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://katudigamer:mongodb%4098@developer.gycc3lp.mongodb.net/?retryWrites=true&w=majority&appName=Developer"
    );
    console.log("Database is Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnect;

// EPSgLCrhFnWmVxEg