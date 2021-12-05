const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PisoSchema = new Schema (
    {
        titular: {type:String, require:true},
        tipo: {type:String, require:true},
        direccion: {type:String, require:true},
        superficie: {type:Number, require:true},
        propietario: { type: String, ref: "usuarios", required: true },
        inmobiliaria: [{ type: String, ref: "inmobiliarias", required: true }],

    },
    {timestamps: true}
);

const Piso = mongoose.model('pisos',PisoSchema);
module.exports = Piso