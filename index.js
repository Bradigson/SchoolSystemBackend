const express = require('express');
const db = require('./db/school.dbconnection');
const routes = require('./routes/school.route');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 2000);

app.use(cors('*'))
app.use(express.json());

app.use('/api/v1', routes);

const port = app.get('port');

app.listen(port, ()=>{
    console.log('port available at : ', port)
});