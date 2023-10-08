const {createConnection} = require('./dbConnection');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {checkforAuthentication, restrictRole} = require('./middlewares/handleSession');

//ROUTES
const AdminRouter = require('./routes/adminRoute');
const URLRouter = require('./routes/urlRoute')
const StaticRouter = require('./routes/staticRoute');
const userAuthRouter = require('./routes/userAuth');

const app = express();

//Create MongoDB Connection
createConnection("mongodb://127.0.0.1:27017/toothsDB")

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkforAuthentication)


//Server Side Routes with Inline-Middleware
app.use('/admin',restrictRole(['ADMIN']),AdminRouter)
app.use('/urls',restrictRole(['NORMAL','ADMIN']),URLRouter);
app.use('/',StaticRouter);
app.use('/user',userAuthRouter);


app.listen(3000,()=>{
    console.log("Server is running 🌟")
})