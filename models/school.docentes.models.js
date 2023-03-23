const mongoose = require('mongoose');

const docentesSchemas = mongoose.Schema({
    nombreDocente:{
        type:String,
        require:true,
    },
    apellidoDocente:{
        type:String,
        require:true,
    },
    direscioniDocente:{
        type:String,
    },
    telefonoDocente:{
        type:String
    },
    materiasDocente:[
        {
            nombreMateria:String
        }
    ],
    lunes:[
        {
            horarioLunes:String
        }
    ],
    martes:[
        {
            horarioMartes:String
        }
    ],
    miercoles:[
        {
            horarioMiercoles:String
        }
    ],
    jueves:[
        {
            horarioJueves:String
        }
    ],
    viernes:[
        {
            horarioViernes:String
        }
    ]

});

module.exports = mongoose.model('docentes', docentesSchemas);