const mongoose = require('mongoose');

const studentsScheme = mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    apellido:{
        type:String,
        require:true
    },
    edad:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    direccionEstudiante:[
        {
            direccion:String,
            numeroCasa:String,
            referencia:String,
            numeroTelefono:String,
            numeroCelular:String
        }
    ],
    curso:{
        type:String,
        require:true
    },
    profesor:{
        type:String,
        require:true
    },
    calificacion:{
        type:String
    },
    nombrePadre:{
        type:String,
        require:true
    },
    nombreMadre:{
        type:String,
        require:true
    },
    tutor:{
        type:String
    },
    status:{
        type:String
    },
    condicionMedica:{
        type:String
    },
    fechaInscripcion:{
        type: String,
        require:true
    },
    fechaRetiro:{
        type:String,
    }
});

const schoolEstudientsSchema = mongoose.model("estudiantes", studentsScheme);
module.exports = schoolEstudientsSchema;