const materiasModels = require('../models/school.materias.models');
const validator = require('validator');

class materiasController{



    //todas las materias
    async todasLasMaterias(req, res){
        await materiasModels.find()
        .then((data)=>{
            res.json({
                status:200,
                response:data
            })

        })
        .catch((err)=>{
            res.status(400).json({
                error:{
                    code:200,
                    message:"No hay materias",
                    details:[
                        {
                            errorMessage: err
                        }
                    ]
                }
            })
        })
    }




    //agregar materias
    async agregarMaterias(req, res){

        if(validator.default.isEmpty(req.body.nombre)){
            res.status(400).json({
                error:{
                    code:400,
                    message:"Campo materia vacio",
                    details:[
                        {
                            errorMessage:"El campo nombre materia esta vacio"
                        }
                    ]
                }
            })
        }else{

            const meteriaEncontrada = await materiasModels.findOne({
                nombre:req.body.nombre
            });
            
           if(meteriaEncontrada != null){
                res.status(400).json({
                    error:{
                        code:400,
                        message:"Materia encontrada",
                        details:[
                            {
                                errorMessage: `La materia ${req.body.nombre} ya existe`
                            }
                        ]
                    }
                })
           }else{

                await materiasModels(req.body)
                .save()
                .then(()=>{
                    res.json({
                        status:200,
                        message: `Materias (${req.body.nombre}) agregada`
                    })
                })
                .catch((err)=>{
                    res.status(400).json({
                        error:{
                            code:400,
                            message:`Materia (${req.body.nombre}) no agregada`,
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
    }




    //actualizar 
    async actualizarMaterias(req, res){
        const {id} = req.params;
        const {nombre} = req.body;

        await materiasModels.findByIdAndUpdate(id, {nombre})
        .then((data)=>{
            res.json({
                status:200,
                message: `Materia ${nombre} actualizada`
            })
        })
        .catch((err)=>{
            res.status(400).json({
                error:{
                    code:400,
                    message:"Materia no actualizada",
                    details:[
                        {
                            errorMessage: err
                        }
                    ]
                }
            })
        })
    }






    //eliminar materia
    async eliminarMateria(req, res){
        const {id} = req.params;
        await materiasModels.findByIdAndDelete(id)
        .then((data)=>{
            res.json({
                status:200,
                message:`Materia ${id} eliminada`
            })
        })
        .catch(err=>{
            res.status(400).json({
                error:{
                    code:400,
                    message:"Materia no eliminada",
                    details:[
                        {
                            messageError : err
                        }
                    ]
                }
            })
        })
        
    }

}


module.exports = new materiasController;
