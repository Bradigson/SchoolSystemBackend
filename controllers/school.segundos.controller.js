const segundoModels = require('../models/school.segundos.models');

class segundoController{
    
    //todos los estudiantes de segundo
    async todosLosEstudiantesSegundo(req, res){
        await segundoModels.find()
        .then((data)=>{
            res.json({
                status:200,
                response:data
            })
        })
        .catch((err)=>{
            res.json({
                error:{
                    code:400,
                    message:"No data",
                    details:[
                        {
                            errorMessage:err
                        }
                    ]
                }
            })
        })
    }




    //inscribir en segundo

    async inscribirEstudianteEnSegundo(req, res){


        const segundo = await (await segundoModels.find()).map(async (data)=>{
           

            if(req.body.nombre === data.nombre)
            {
                const students = data.studiantes;
                
                const newEstudiante = req.body;
                const getNewEstudianteNombre = newEstudiante.studiantes.map(newEstu=> newEstu.nombreEstudainte);
                const getNewEstudianteApellido = newEstudiante.studiantes.map(newEstu=> newEstu.apellidoEstudiante);

            
                const newStudentsFound = students.find(p=> p.nombreEstudainte === getNewEstudianteNombre.toString() && p.apellidoEstudiante === getNewEstudianteApellido.toString());
                

                if(newStudentsFound != null){
                   
                   res.json({
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

                    const newStudentsSegundo = {
                        nombreEstudainte: newEstudiante.studiantes.map(newEstu=> newEstu.nombreEstudainte).toString(),
                        apellidoEstudiante: newEstudiante.studiantes.map(newEstu=> newEstu.apellidoEstudiante).toString(),
                        cursoEstudiante: newEstudiante.studiantes.map(newEstu=> newEstu.cursoEstudiante).toString(),
                        edadEstudiante: parseInt(newEstudiante.studiantes.map(newEstu=> newEstu.edadEstudiante)),
                        profesorEstudiante: newEstudiante.studiantes.map(newEstu=> newEstu.profesorEstudiante).toString(),
                        madreEstudiante: newEstudiante.studiantes.map(newEstu=> newEstu.madreEstudiante).toString(),
                        padreEstudiante: newEstudiante.studiantes.map(newEstu=> newEstu.padreEstudiante).toString()
                       
                    }

                   
                    const addStudents = await segundoModels.findByIdAndUpdate(data._id, {$push:{studiantes : newStudentsSegundo}})
                    .then(()=>{
                        res.json({
                            status:200,
                            messae:{
                                response: "Estudiante inscripto exitosamente",
                                name: newStudentsSegundo.nombreEstudainte,
                                sesion:newStudentsSegundo.cursoEstudiante
                            }
                        })
                    })
                    .catch(error=>{
                        res.json({
                            error:{
                                code:400,
                                details:error
                            }
                        })
                    })
                }



            }else{

                res.json({
                    res:"esta es la sesion de los primeros",
                   
                })

            }
            
                
            
        })

    
    }






    //actualizar estudiante de segundo A

    async actualizarEstudianteSegundoA(req, res){

        const {curso, nombreEstudianteActual, update} = req.body
        const segundoAEstudianteUpdate = await segundoModels.updateOne(
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


        if(segundoAEstudianteUpdate.matchedCount == 0){
            res.json({
                error:{
                    code:400,
                    message: "Estudiante no encontrado",
                    details:[
                        {
                            name:`El estudiante ${nombreEstudianteActual} no fue encontrado en Segundo A`
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
    async eliminarEstudianteDeSegundoA(req, res){

        const {userId} = req.params;

        const getStudentToDelete = await (await segundoModels.find()).map(async(data)=>{
            let itemsRemove = data.studiantes.find(stu=> stu._id.toString() === userId);

            if(itemsRemove){
                try{
                    data.studiantes.pull(itemsRemove)
                    let response = await  data.save();


                    res.json({
                        status:200,
                        message:`El usuario ${userId} ha sido eliminado de la sesion Segundo A`

                    })
                    
                }catch(err){
                    res.json({
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
                res.json({
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



module.exports = new segundoController;