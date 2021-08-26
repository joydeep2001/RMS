const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(3001);
