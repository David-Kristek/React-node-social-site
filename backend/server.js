const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const cors = require('cors');

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log(err));
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/auth"));
