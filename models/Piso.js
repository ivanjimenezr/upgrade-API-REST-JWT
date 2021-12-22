const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PisoSchema = new Schema (
    {
        titular: {type:String, require:true},
        precio: {type: String, required:true},
        tipo: {type:String, require:true},
        direccion: {type:String, require:true},
        superficie: {type:Number, require:true},
        imagen: {type:String, required:true},
        inmobiliaria: [{type: mongoose.Types.ObjectId, ref: 'Inmobiliarias'}],

    },
    {timestamps: true}
);

const Piso = mongoose.model('Pisos',PisoSchema);
module.exports = Piso