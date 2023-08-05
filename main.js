const devenv = require('dotenv');
//Morgan req res هي وسيلة تسجيل لتطبيقات
const morgan = require('morgan');
const express = require("express")
const cors = require ("cors")

const routerauth = require("./routes/auth")
const routerhotel = require("./routes/hotel")
const routeruser = require("./routes/userRoutes")
const routerRoom = require("./routes/rooms")

var cookieParser = require('cookie-parser')
devenv.config({path: 'config.env'});
const app = express();
const PORT = process.env.port || 4000;

const dbconnection = require('./datebase');

app.use(express.json())
if (process.env.NODE_ENV = "development") {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`)
}


app.use(cookieParser())
app.use(cors())

app.use(express.json());
app.use('/api/hotels', routerhotel );
app.use('/api/auth', routerauth );
app.use('/api/users', routeruser );
app.use('/api/room', routerRoom );

app.use((err,req, res,next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
 return res.status(errorStatus).json({
  success: false,
  status: errorStatus,
  message:errorMessage,
  stack: err.stack,
 });
});

dbconnection();

app.get("/" , (req, res) => {
    res.send("Hello World");

});

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`)
})

