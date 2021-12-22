const mongoose = require('mongoose');
const Piso = require('../models/Piso')
//const  dbConnection  = require('../config/database')



// definimos datos para meter en la base de datos
const pisos = [
    {
      titular: 'Casa o chalet independiente en Club de Golf, Las Rozas de Madrid',
      precio: '2.200.000€',
      tipo: 'Chalet',
      direccion: 'Avenida Europa 33',
      superficie: 500,
      imagen: 'https://img3.idealista.com/blur/WEB_LISTING-M/0/id.pro.es.image.master/8b/a1/9f/920719733.jpg',
      inmobiliaria: ['61ac0fccf109cbc060de405b']
    },
    {
      titular: 'Casa o chalet independiente en Las Matas- Peñascales, Las Rozas de Madrid',
      precio: '590.000€',
      tipo: 'Chalet',
      direccion: 'Avenida Princesa 24',
      superficie: 300,
      imagen: 'https://img3.idealista.com/blur/WEB_LISTING-M/0/id.pro.es.image.master/c9/54/74/940514642.jpg',
      inmobiliaria: ['61ac0fccf109cbc060de405b']
    },
    {
      titular: 'Chalet en Monte Rozas, Las Rozas de Madrid',
      precio: '790.000€',
      tipo: 'Chalet',
      direccion: 'Calle del rio 71',
      superficie: 297,
      imagen: 'https://img3.idealista.com/blur/WEB_LISTING-M/0/id.pro.es.image.master/68/b5/6c/932357676.jpg',
      inmobiliaria: ['61ac0fccf109cbc060de405b']
    },
    {
      titular: 'Piso en Alto de la Jabonería, Las Rozas de Madrid',
      precio: '189.000€',
      tipo: 'Piso',
      direccion: 'Calle germany 246',
      superficie: 78,
      imagen: 'https://img3.idealista.com/blur/WEB_LISTING-M/0/id.pro.es.image.master/87/52/88/942198327.jpg',
      inmobiliaria: ['61ac0fccf109cbc060de405b']
    },
    {
      titular: 'Casa o chalet independiente en Las Matas- Peñascales, Las Rozas de Madrid',
      precio: '740.000€',
      tipo: 'Chalet',
      direccion: 'Calle alegría 87',
      superficie: 451,
      imagen: 'https://img3.idealista.com/blur/WEB_LISTING-M/0/id.pro.es.image.master/3e/51/32/900607976.jpg',
      inmobiliaria: ['61ac0fccf109cbc060de405b']
    },
    {
      titular: 'Casa o chalet independiente en Las Matas- Peñascales, Las Rozas de Madrid',
      precio: '460.000€',
      tipo: 'Chalet',
      direccion: 'Calle margarita 987',
      superficie: 220,
      imagen: 'https://img3.idealista.com/blur/WEB_LISTING-M/0/id.pro.es.image.master/97/52/d0/805411071.jpg',
      inmobiliaria: ['61ac0fccf109cbc060de405b']
    },
    {
      titular: 'Piso en El Pinar- Punta Galea, Las Rozas de Madrid',
      precio: '390.000€',
      tipo: 'Piso',
      direccion: 'Avda Hipolito 16',
      superficie: 220,
      imagen: 'https://img3.idealista.com/blur/WEB_LISTING-M/180/id.pro.es.image.master/f5/70/53/931462301.jpg',
      inmobiliaria: ['61ac0fccf109cbc060de405b']
    },
    {
      titular: 'Casa o chalet independiente en El Cantizal, El Cantizal, Las Rozas de Madrid',
      precio: '970.000€',
      tipo: 'Chalet',
      direccion: 'Avda las Rosas 216',
      superficie: 420,
      imagen: 'https://img3.idealista.com/blur/WEB_LISTING-M/0/id.pro.es.image.master/55/ef/e5/942265939.jpg',
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