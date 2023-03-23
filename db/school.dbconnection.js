const mongoose = require('mongoose');

require('dotenv').config({path:'./.env'});


const connectionstring = `${process.env.DB_URL_STUDENTS}`;
const conection = mongoose.connect(connectionstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true
     })   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err + `${process.env.DB_USERNAME}`));


module.exports = conection;