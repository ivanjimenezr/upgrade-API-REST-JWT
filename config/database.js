// //Requerimos dotenv para acceder a las variables de entorno
const dotenv = require("dotenv");
dotenv.config();

// //Requerimos mongoose para comunicarnos con la bd
// const mongoose = require("mongoose");
// //guardamos la url de Mongo en una variable
// const MONGO_DB="mongodb+srv://chiklete:.Lechuga!@cluster0.f3k1j.mongodb.net/pisos?retryWrites=true&w=majority"
// const mongoDb = process.env.MONGO_DB;
// //Configuramos la función connect 

const mongoose = require('mongoose');

const MONGO_DB = "mongodb+srv://chiklete:.Lechuga!@cluster0.f3k1j.mongodb.net/pisos?retryWrites=true&w=majority";

const connect = async () => {
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
// //exportamos la funcion connect
// module.exports = { connect };


                

// const dbConnection = mongoose.connect(DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

module.exports = { connect};