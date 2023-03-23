const mongoose = require('mongoose');

const segundoSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    studiantes:[
        {
            nombreEstudainte:String,
            apellidoEstudiante:String,
            cursoEstudiante:String,
            edadEstudiante:Number,
            profesorEstudiante:String,
            madreEstudiante:String,
            padreEstudiante:String
        }
    ]
});


const schoolSegundoSchema = mongoose.model('segundos', segundoSchema);

module.exports = schoolSegundoSchema;
