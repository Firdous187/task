
        // mongoose.connect("mongodb+srv://shaikfirdousunnisabegum882:begum882@createdatabase.n1bl7.mongodb.net/Employees?retryWrites=true&w=majority&appName=createDatabase");
        // console.log("Successfully connected to MDB");
        //getEmployeesFromDB();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const app = express();

/* Middleware */

app.use(cors());
app.use(express.json());

/* MongoDB Atlas Connection */

mongoose.connect(
"mongodb+srv://shaikfirdousunnisabegum882:begum882@createdatabase.n1bl7.mongodb.net/Employees?retryWrites=true&w=majority&appName=createDatabase"
)

.then(() => {
  console.log("MongoDB Atlas Connected");
})

.catch((error) => {
  console.log("MongoDB Connection Error:", error);
});

/* Routes */

app.use("/api", productRoutes);

/* Start Server */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});