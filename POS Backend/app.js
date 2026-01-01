require("dotenv").config();

const express = require("express");  // 👈 yaha sahi karo
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const PORT = config.PORT;
connectDB();

// Middlewares
const allowedOrigins = [
  "http://localhost:5173",
  "https://pos-restorant-management.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests like Postman (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

app.use(express.json()); //parse incoming request in json format
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded data


// Root Endpoints
app.get("/", (req, res) => {
    res.json({ message: "Hello From Pos Server !" });
});

// Other Endpoints
app.use("/api/user", require("./routes/userRoute.js"))
app.use("/api/order", require("./routes/orderRoute"))
app.use("/api/table", require("./routes/tableRoute"))
app.get("/", (req, res) => {res.send("Hello from Pos Server")})

// Global Error Handler
app.use(globalErrorHandler);

// Server
app.listen(PORT, () => {
    console.log(`Pos Server is Listening on port ${PORT}.`);
});
