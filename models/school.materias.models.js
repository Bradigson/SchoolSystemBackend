const mongoose = require('mongoose');

const materiasSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        unique:true
    }
})


const schoolMateriasSchema = mongoose.model('materias', materiasSchema);

module.exports = schoolMateriasSchema;