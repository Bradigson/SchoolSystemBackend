const mongoose = require('mongoose');

const primeroSchema = mongoose.Schema({
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


const schoolPrimeroSchema = mongoose.model('primeros', primeroSchema);

module.exports = schoolPrimeroSchema;
