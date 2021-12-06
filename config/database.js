// //Requerimos dotenv para acceder a las variables de entorno
const dotenv = require("dotenv");
dotenv.config();



const mongoose = require('mongoose');
// const { DB_URL } = require('../config/config');
// console.log(DB_URL)
const MONGO_DB = "mongodb+srv://chiklete:.Lechuga!@cluster0.f3k1j.mongodb.net/pisos?retryWrites=true&w=majority";

const dbConnection = async () => {
  try {
    const db = await mongoose.connect(MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { name, host } = db.connection;
    console.log(`Connected with db: ${name}, in host: ${host}`);
  } catch (error) {
    console.log("Error to connect with BD", error);
  }
};

module.exports =  dbConnection;





