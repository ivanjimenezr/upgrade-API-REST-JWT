// Cargamos el modelo recien creado
const Inmobiliaria = require("../models/Inmobiliaria");
// Cargamos el fichero de los HTTPSTATUSCODE
const HTTPSTATUSCODE = require("../utils/httpStatusCode");

//Metodo para retornar todas las inmobiliarias registradas en la base de datos

const getAllInmobiliarias = async (req, res, next) => {
  try {
    if (req.query.page) {
      const page = parseInt(req.query.page);
      const skip = (page - 1) * 20;
      const inmobiliarias = await Inmobiliaria.find().skip(skip).limit(20).populate('piso');
      // const inmobiliarias = await Inmobiliaria.find().skip(skip).limit(20).populate("pisos");
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { inmobiliarias: inmobiliarias },
      });
    } else {
      const inmobiliarias = await Inmobiliaria.find().populate('piso');
      // const inmobiliarias = await Inmobiliaria.find().populate("nombre");
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { inmobiliarias: inmobiliarias },
      });
    }
  } catch (err) {
    return next(err);
  }
};

// Metodo para la busqueda de inmobiliarias por ID
const getInmobiliariasById = async (req, res, next) => {
  try {
    const { inmobiliariaId } = req.params;
    const inmobiliariaDb = await Inmobiliaria.findById(inmobiliariaId).populate('piso');
    // const inmobiliariaDb = await Inmobiliaria.findById(inmobiliariaId).populate("pisos");
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: { inmobiliarias: inmobiliariaDb },
    });
  } catch (err) {
    return next(err);
  }
};


// Metodo para crear una nueva inmobiliaria
const newInmobiliaria = async (req, res, next) => {
  try {
    //console.log("req.authority", req.authority)
    const newInmobiliaria = new Inmobiliaria();
    newInmobiliaria.nombre = req.body.nombre;
    newInmobiliaria.ciudad = req.body.ciudad;
    newInmobiliaria.telefono = req.body.telefono;
    newInmobiliaria.piso =  req.body.piso || [];
    
    
    const inmobiliariaDb = await newInmobiliaria.save()
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: { inmobiliarias: inmobiliariaDb }
    });
  } catch (err) {
    return next(err);
  }
}




//Metodo para eliminar algun registro de la base de datos
const deleteInmobiliariaById = async (req, res, next) => {
  try {
    const { inmobiliariaId } = req.params;
    const authority = req.authority.id
    const userInmobiliaria = await Inmobiliaria.findById(inmobiliariaId)

    if (authority == userInmobiliaria.author._id) {

      const inmobiliariaDeleted = await Inmobiliaria.findByIdAndDelete(inmobiliariaId);
      if (!inmobiliariaDeleted) {
        return res.json({
          status: 200,
          message: "There is not a inmobiliaria with that Id",
          data: null
        })
      } else {
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { inmobiliarias: inmobiliariaDeleted },
        });
      }
    } else {
      return res.json({
        status: 403,
        message: HTTPSTATUSCODE[403],
        data: null
      })
    }
  } catch (err) {
    return next(err);
  }
};

//Metodo para actualizar algun registro de la base de datos
const updateInmobiliariaById = async (req, res, next) => {
  try {
    const { inmobiliariaId } = req.params;
    console.log(inmobiliariaId)
    const authority = req.authority.id
    console.log(authority)
      const inmobiliariaToUpdate = new Inmobiliaria();
      
      if (req.body.nombre) inmobiliariaToUpdate.nombre = req.body.nombre;
      if (req.body.ciudad) inmobiliariaToUpdate.ciudad = req.body.ciudad;
      if (req.body.telefono) inmobiliariaToUpdate.telefono = req.body.telefono;
      if (req.body.piso) inmobiliariaToUpdate.piso = req.body.piso || [];
      inmobiliariaToUpdate._id = inmobiliariaId;

      const inmobiliariaUpdated = await Inmobiliaria.findByIdAndUpdate(inmobiliariaId, inmobiliariaToUpdate).populate('piso');
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { inmobiliarias: inmobiliariaUpdated }
      });
    

  } catch (err) {
    return next(err);
  }
}

//Exportamos la funciones
module.exports = {
  newInmobiliaria,
  getAllInmobiliarias,
  getInmobiliariasById,
  deleteInmobiliariaById,
  updateInmobiliariaById
}