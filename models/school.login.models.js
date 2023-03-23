const mongoose = require('mongoose');


const loginSchoolScheme = mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true,
    },
    userPassword:{
        type:String,
        require:true,
        unique:true
    }
    
});


module.exports = mongoose.model('logins', loginSchoolScheme)