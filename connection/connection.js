const mongoose = require('mongoose');
require("dotenv").config()
// const dbconf = require('./db.json');
// let dbString = "mongodb://" + dbconf.dbcredentials.user;
// dbString = dbString + ":" + dbconf.dbcredentials.password;
// dbString = dbString + "@" + dbconf.dbcredentials.address;
// dbString = dbString + ":" + dbconf.dbcredentials.port;
// dbString = dbString + "/" + dbconf.dbcredentials.database;

// let dbString = 'mongodb+srv://dpknayak111:Fi3wXSDIwlOYqqlb@cluster.yjjuaig.mongodb.net/ThemeProviderApp?retryWrites=true&w=majority&appName=Cluster';
// console.log(dbString);
let dbString = 'mongodb://127.0.0.1:27017/ThemeProviderApp';
console.log(dbString);

async function connectDB() {
  try {
    await mongoose.connect(dbString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("+ MongoDB is connected!! +");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectDB;


