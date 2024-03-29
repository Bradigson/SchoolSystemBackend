
const { model } = require('mongoose');
const primerosModels = require('../models/school.primero.models');


class primerosInscribir{



    
    // todos los estudiantes de primero a
    async todosLosEstudiantesDePrimeroA(req, res){
        const primerA = await primerosModels.find();
        if(primerA){
            res.json({
                code:200,
                body:primerA
            })
        }else{
            res.status(400).json({
                error:{
                    code:400,
                    details:[
                        {
                            message: "Sesion Primero A vacia"
                        }
                    ]
                }
            })
        }
    }







     //inscribir en primero A
     async inscribirEnPimeroA(req, res){


        const primeros = await (await primerosModels.find()).map(async (data)=>{
           

            if(req.body.nombre === data.nombre)
            {
                const students = data.studiantes;
                
                const newEstudiante = req.body;
                const getNewEstudianteNombre = newEstudiante.studiantes.map(newEstu=> newEstu.nombreEstudainte);
                const getNewEstudianteApellido = newEstudiante.studiantes.map(newEstu=> newEstu.apellidoEstudiante);

            
                const newStudentsFound = students.find(p=> p.nombreEstudainte === getNewEstudianteNombre.toString() && p.apellidoEstudiante === getNewEstudianteApellido.toString());
                

                if(newStudentsFound != null){
                   
                   res.status(400).json({
                    error:{
                        code:400,
                        details:[
                            {
                                message: `Estudiante ${getNewEstudianteNombre} ya esta inscripto`
                            }
                        ]
                    }
                   })

                }else{

                    const newStudentsPrimeroA = {
                        nombreEstudainte: newEstudiante.studiantes.map(newEstu=> newEstu.nombreEstudainte).toString(),
                        apellidoEstudiante: newEstudiante.studiantes.map(newEstu=> newEstu.apellidoEstudiante).toString(),
                        cursoEstudiante: newEstudiante.studiantes.map(newEstu=> newEstu.cursoEstudiante).toString(),
                        edadEstudiante: parseInt(newEstudiante.studiantes.map(newEstu=> newEstu.edadEstudiante)),
                        profesorEstudiante: newEstudiante.studiantes.map(newEstu=> newEstu.profesorEstudiante).toString(),
                        madreEstudiante: newEstudiante.studiantes.map(newEstu=> newEstu.madreEstudiante).toString(),
                        padreEstudiante: newEstudiante.studiantes.map(newEstu=> newEstu.padreEstudiante).toString()
                       
                    }

                   
                    const addStudents = await primerosModels.findByIdAndUpdate(data._id, {$push:{studiantes : newStudentsPrimeroA}})
                    .then(()=>{
                        res.json({
                            status:200,
                            messae:{
                                response: "Estudiante inscripto exitosamente",
                                name: newStudentsPrimeroA.nombreEstudainte,
                                sesion:newStudentsPrimeroA.cursoEstudiante
                            }
                        })
                    })
                    .catch(error=>{
                        res.status(400).json({
                            error:{
                                code:400,
                                details:error
                            }
                        })
                    })
                }



            }else{

                res.status(400).json({
                    res:"esta es la sesion de los primeros",
                   
                })

            }
            
                
            
        })

    
    }





    //actualizar estudiante de primero A

    async actualizarEstudiantePrimeroA(req, res){

        const {curso, nombreEstudianteActual, update} = req.body
        const primeroAEstudianteUpdate = await primerosModels.updateOne(
            {
                   "nombre":`${curso}`,
                   "studiantes.nombreEstudainte":`${nombreEstudianteActual}`
            },
            {
               $set: {
                    "studiantes.$.nombreEstudainte" : `${update.nombreEstudainte}`,
                    "studiantes.$.apellidoEstudiante":`${update.apellidoEstudiante}`,
                    "studiantes.$.cursoEstudiante":`${update.cursoEstudiante}`,
                    "studiantes.$.edadEstudiante":`${update.edadEstudiante}`,
                    "studiantes.$.profesorEstudiante":`${update.profesorEstudiante}`,
                    "studiantes.$.madreEstudiante":`${update.madreEstudiante}`,
                    "studiantes.$.padreEstudiante":`${update.padreEstudiante}`
               }
            }
        )


        if(primeroAEstudianteUpdate.matchedCount == 0){
            res.status(400).json({
                error:{
                    code:400,
                    message: "Estudiante no encontrado",
                    details:[
                        {
                            name:`El estudiante ${nombreEstudianteActual} no fue encontrado en Primero A`
                        }
                    ]
                }
            })
        }else{
            res.json({
                status:200,
                message: `Estudainte ${nombreEstudianteActual} actualizado`
            })
        }
       

    }







//eliminar estudiante de primeroa
async eliminarEstudianteDePrimeroA(req, res){

    const {userId} = req.params;

    const getStudentToDelete = await (await primerosModels.find()).map(async(data)=>{
        let itemsRemove = data.studiantes.find(stu=> stu._id.toString() === userId);

        if(itemsRemove){
            try{
                data.studiantes.pull(itemsRemove)
                let response = await  data.save();


                res.json({
                    status:200,
                    message:`El usuario ${userId} ha sido eliminado de la sesion Primero A`

                })
                
            }catch(err){
                res.status(400).json({
                    error:{
                        code:400,
                        details:[
                            {
                                message:err
                            }
                        ]
                    }
                })
            }
        }else{
            res.status(400).json({
                error:{
                    code:400,
                    details:[
                        {
                            message:`Usuario ${userId} no encontrado`
                        }
                    ]
                }
            })
        }
        
    })
    

}
}

module.exports = new primerosInscribir;
