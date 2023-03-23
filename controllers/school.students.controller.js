const studentsModels = require('../models/school.students.models');
const validator = require('validator');

class studenstController{


    // estudiantes registrados

    async todosLosEstudiantesDeLaEscuela(req, res){
        const allEstudiantes = await studentsModels.find();

        if(allEstudiantes != null){
            res.json({
                status:200,
                response:allEstudiantes
            })
        }else{
            res.json({
                error:{
                    code:400,
                    message: "No hay estudiantes registrados",
                    details:[
                        {
                            error:"No data in the database"
                        }
                    ]
                }
            })
        }
    }






    // registrar estudiantes
    async inscribirEstudiante(req, res){

        if(validator.default.isEmail(req.body.email)){
            
            if(validator.default.isEmpty(req.body.nombre)){
                res.json(
                    {
                        error: {
                           code: 400,
                           message: "Debe de indicar el nombre del estudiante",
                           details: [
                              {
                                 field: "Nombre",
                                 message: "Campo nombre no puede estar vacio"
                              }
                           ]
                        }
                     }
                )
            }else{
               
                if(validator.default.isEmpty(req.body.nombreMadre)){
                    res.json(
                        {
                            error: {
                               code: 400,
                               message: "Debe de indicar el nombre de la madre del estudiante",
                               details: [
                                  {
                                     field: "nombreMadre",
                                     message: "Campo nombreMadre no puede estar vacio"
                                  }
                               ]
                            }
                         }
                    )
                }else{

                    const validarSiEstudianteExiste = await studentsModels.findOne({
                        nombre : req.body.nombre,
                        apellido : req.body.apellido,
                        curso : req.body.curso
                    });


                    if(validarSiEstudianteExiste != null)
                    {

                       
                        res.json(
                            {
                                error: 
                                {
                                    code: 400,
                                    message: `El estudiante ( ${validarSiEstudianteExiste.nombre} ) ya esta registrado`,
                                    details: 
                                    [
                                        {
                                            field: "nombre",
                                            message: `${validarSiEstudianteExiste.nombre}`
                                        },
                                        {
                                            field: "apellido",
                                            message: `${validarSiEstudianteExiste.apellido}`
                                        }
                                    ]
                                }
                            }
                        )
                        
                    }else
                    {
                        const _responseInscripcion = await studentsModels(req.body);
                        _responseInscripcion
                        .save()
                        .then((data)=>{
                            res.json({
                                state:200,
                                message: `Estudiante ${req.body.nombre} registrado exitosamente`

                            })

                        } )
                        .catch((err)=> 
                            res.json(
                                {
                                    error: 
                                    {
                                        code: 400,
                                        message: err,
                                    }
                                }
                            ));

                    }

                }
            }
        }else{
            res.json({
                state:400,
                message : `Correo electronico ${req.body.email} no valido`
            })

        }
    }



   



    // editar estudiantes registrado

    async actualizarEstudianteRegistrado(req, res)
    {
        
         const {id} = req.params;
        const {nombre, apellido, edad, email, direccionEstudiante:[{direccion, numeroCasa, referencia, numeroTelefono, numeroCelular}],
        curso, profesor, calificacion, nombrePadre, nombreMadre, tutor, status, condicionMedica, fechaInscripcion, fechaRetiro} = req.body;
        
        const actualizarEstudiante = await studentsModels.findByIdAndUpdate(id, {nombre, apellido, edad, email, 
            direccionEstudiante:[{direccion, numeroCasa, referencia, numeroTelefono, numeroCelular}],
            curso, profesor, calificacion, nombrePadre, nombreMadre, tutor, status, condicionMedica, fechaInscripcion, fechaRetiro})
            .then((data)=>{
                res.json({
                    status:200,
                    message:`Estudiante ${nombre} actualizado`
                })
            })
            .catch(err=>{
                res.json({
                    error:{
                        code:400,
                        details:[
                            {
                                errorMessage:err
                            }
                        ]
                    }
                })

                console.log(err);
            })

    }






    // eliminar estudiante registrado

    async eliminarEstudianteRegistrado(req, res){
        const {id} = req.params;

        await studentsModels.findByIdAndDelete(id)
        .then(()=>{
            res.json({
                status:200,
                message:`Estudiante ${id} eliminado`
            })
        })
        .catch(err=>{
            res.json({
                error:{
                    code:400,
                    message:`Estudiante ${id} no eliminado`,
                    details:[
                        {
                            errorMessage:err
                        }
                    ]
                }
            })
        })

    }

}




module.exports = new studenstController;