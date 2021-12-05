const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InmobiliariaSchema = new Schema (
    {
        nombre: {type:String, require:true},
        ciudad: {type:String, require:true},
        telefono: {type:Number},
        piso: [{ type: Schema.Types.ObjectId, ref: "pisos"}],

    },
    {timestamps: true}
);

const Inmobiliaria = mongoose.model('inmobiliarias',InmobiliariaSchema);
module.exports = Inmobiliaria