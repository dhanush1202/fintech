//create express app
const exp = require("express");
const app = exp();
const cors = require('cors');

app.use(exp.json())
app.use(cors()); 

const mclient = require("mongodb").MongoClient;
const userApp = require('./APIs/userApi')
require("dotenv").config();
//import path module
const path = require("path");
app.use('/user', userApp);

//DB connection URL
const DBurl = process.env.DATABASE_CONNECTION;
app.use('*', (request, response) => {
  response.sendFile(path.join(__dirname, './build/index.html'))
})
//connect with mongoDB server
mclient
  .connect(DBurl)
  .then((client) => {
    //get DB object
    let dbObj = client.db("usersdb");

    //create collection objects
    let userCollectionObject = dbObj.collection("usersCollection");

    app.set("userCollectionObject", userCollectionObject);

    console.log("DB connection success");
  })
  .catch((err) => console.log("Error in DB connection ", err));
const port = process.env.PORT;
app.listen(port, () => {console.log( `server listening on port ${port}`)})