const mongoose = require('mongoose');
require("dotenv").config()
const dbconf = require('./db.json');
let dbString = "mongodb://" + dbconf.dbcredentials.user;
dbString = dbString + ":" + dbconf.dbcredentials.password;
dbString = dbString + "@" + dbconf.dbcredentials.address;
dbString = dbString + ":" + dbconf.dbcredentials.port;
dbString = dbString + "/" + dbconf.dbcredentials.database;


// let dbString = 'mongodb+srv://deepakvigorousit:zHr5Nra9mFylb3Xw@cluster0.p0asohm.mongodb.net/LeadManagement?retryWrites=true&w=majority'

console.log(dbString);
function connectDB() {
  try {
    mongoose.connect(dbString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("+ MongoDB is connected!! +");
  } catch (error) {
    console.error(error);
  }

}

module.exports = connectDB;


