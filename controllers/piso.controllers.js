// Cargamos el modelo recien creado
const Piso = require("../models/Piso");
// Cargamos el fichero de los HTTPSTATUSCODE
const HTTPSTATUSCODE = require("../utils/httpStatusCode");

//Metodo para retornar todos los pisos registrados en la base de datos

const getAllPisos = async (req, res, next) => {
    try {
      if (req.query.page) { //Se le añade paginación
        const page = parseInt(req.query.page);
        const skip = (page - 1) * 20;
        const pisos = await Piso.find().skip(skip).limit(20).populate('inmobiliaria');
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { pisos: pisos },
        });
      } else {
        const pisos = await Piso.find().populate('inmobiliaria');
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { pisos: pisos },
        });
      }
    } catch (err) {
      return next(err);
    }
  };

// Metodo para la busqueda de pisos por ID
const getPisoById = async (req, res, next) => {
    
    try {
      const pisoId = req.params.pisoId;
      
      const pisoById = await Piso.findById(pisoId).populate('inmobiliaria');
      
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { pisos: pisoById }
      });
    } catch (err) {
      return next(err);
      
    }
  };
  

// Metodo para crear un nuevo piso
const newPiso = async (req, res, next) => {
  try {
    //console.log("req.authority", req.authority)
    const newPiso = new Piso();
    newPiso.titular = req.body.titular;
    newPiso.precio = req.body.precio;
    newPiso.tipo = req.body.tipo;
    newPiso.direccion = req.body.direccion;
    newPiso.superficie = req.body.superficie;
    newPiso.imagen = req.body.imagen;
    newPiso.inmobiliaria = req.body.inmobiliaria;
    
    
    const pisoDb = await newPiso.save()
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: { pisos: pisoDb }
    });
  } catch (err) {
    return next(err);
  }
}


//Metodo para eliminar algun registro de la base de datos
const deletePisoById = async (req, res, next) => {
  try {
    const { pisoId } = req.params;
    
    // const authority = req.authority.id
    // const userPiso = await Piso.findById(pisoId)

    // if (authority == userPiso.author._id) {
      // const pisoDeleted = await Piso.findByIdAndDelete(id);
      const pisoDeleted = await Piso.findOneAndRemove(pisoId);
      if (!pisoDeleted) {
        return res.json({
          status: 200,
          message: "There is not a piso with that Id",
          data: null
        })
      } else {
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { pisos: pisoDeleted },
        });
      }
    // } else {
    //   return res.json({
    //     status: 403,
    //     message: HTTPSTATUSCODE[403],
    //     data: null
    //   })
    // }
  } catch (err) {
    return next(err);
  }
};

//Metodo para actualizar algun registro de la base de datos
const updatePisoById = async (req, res, next) => {
  try {
    const { pisoId } = req.params;
    console.log(pisoId)
    const authority = req.authority.id
    console.log(authority)
      const pisoToUpdate = new Piso();
      
      if (req.body.titular) pisoToUpdate.titular = req.body.titular;
      if (req.body.precio) pisoToUpdate.precio = req.body.precio;
      if (req.body.tipo) pisoToUpdate.tipo = req.body.tipo;
      if (req.body.direccion) pisoToUpdate.direccion = req.body.direccion;
      if (req.body.superficie) pisoToUpdate.superficie = req.body.superficie;
      if (req.body.imagen) pisoToUpdate.imagen = req.body.imagen;
      if (req.body.inmobiliaria) pisoToUpdate.inmobiliaria = req.body.inmobiliaria;


      pisoToUpdate._id = pisoId;

      const pisoUpdated = await Piso.findByIdAndUpdate(pisoId, pisoToUpdate);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { pisos: pisoUpdated }
      });
    

  } catch (err) {
    return next(err);
  }
}

//Exportamos las funciones
module.exports = {
  getAllPisos,
  getPisoById,
  newPiso,
  deletePisoById,
  updatePisoById,
}