const mongoose = require('mongoose');
const Piso = require('../models/Piso')
//const  dbConnection  = require('../config/database')



// definimos datos para meter en la base de datos
const pisos = [
    {
      titular: 'Piso en las Rozas',
      tipo: 'Duplex',
      direccion: 'Avenida Europa 33',
      superficie: 150,
      inmobiliaria: ['61ac0fccf109cbc060de405b']
    },
    {
      titular: 'Chalé casi nuevo',
      tipo: 'Chalé',
      direccion: 'Avenida Princesa 24',
      superficie: 345,
      inmobiliaria: ['61ac0fccf109cbc060de405b']
    },
    {
      titular: 'Casita en la playa',
      tipo: 'Apartamento',
      direccion: 'Cantabrico 678',
      superficie: 46,
      inmobiliaria: ['61ac0fccf109cbc060de405b']
    },
    {
      titular: 'Piso a reformar',
      tipo: 'Piso',
      direccion: 'Doctor revilla 3',
      superficie: 78,
      inmobiliaria: ['61ac0fccf109cbc060de405b']
    },
    {
      titular: 'Casa en la montaña',
      tipo: 'Chalé',
      direccion: 'Picos de Europa 97',
      superficie: 467,
      inmobiliaria: ['61ac0fccf109cbc060de405b']
    },
    {
      titular: 'Como nuevo',
      tipo: 'Piso',
      direccion: 'Alcala 245',
      superficie: 65,
      inmobiliaria: ['61ac0fccf109cbc060de405b']
    },
  ];

const pisosDocuments = pisos.map(piso => new Piso(piso));


// dbConnection
mongoose
  .connect('mongodb+srv://chiklete:.Lechuga!@cluster0.f3k1j.mongodb.net/pisos?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // 1. Eliminar el contenido de esta colección en Atlas
  .then(async () => {
    const allPisos = await Piso.find();
    if (allPisos.length > 0) {
        await Piso.collection.drop();
    }
})
.catch((error) => console.error('Error eliminando colección Pisos:', error))
// 2. Añadir los pisos de la semilla a la colección
.then(async () => {
    await Piso.insertMany(pisosDocuments)
    console.log('Base de datos creada')
})
.catch((error) => console.error('Error al insertar en Pisos:', error))
// 3. Desconectarnos
.finally(() => mongoose.disconnect());