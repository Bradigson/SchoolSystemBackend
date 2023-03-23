const docenteModels = require('../models/school.docentes.models');




class docenteController{


    //todos los docenntes
    async todosLosDocentes(req, res){
        await docenteModels.find()
        .then(data=>{
            res.json({
                status:200, 
                response: data
            })
        })
        .catch(err=>{
            res.json({
                error:
                    {
                        code:400,
                        message: "No data",
                        details:[
                            {
                                errorMessage : err
                            }
                        ]
                    }
                
            })
        })
    }






    //registrar docentes
    async registrarDocentes(req, res)
    {
        const _registrarDocenteResponse = await docenteModels(req.body);

        _registrarDocenteResponse
        .save()
        .then((data)=>{
            res.json({
                status:200,
                response:data
            })
        })
        .catch((err)=>{
            res.json({
                error:{
                    code:200,
                    message:"Docente no registrado",
                    details:[
                        {
                            errorMessage:err
                        }
                    ]
                }
            })
        })
        

    }






    //actualizar docente
    async actualizarDocentes(req, res){
        const {id} = req.params;
        const {

            nombreDocente,
            apellidoDocente,
            direscioniDocente,
            telefonoDocente,
            lunes:[{horarioLunes}],
            martes:[{horarioMartes}],
            miercoles:[{horarioMiercoles}],
            jueves:[{horarioJueves}],
            viernes:[{horarioViernes}]

        } = req.body;


        await docenteModels.findByIdAndUpdate(id, {

            nombreDocente,
            apellidoDocente,
            direscioniDocente,
            telefonoDocente,
            lunes:[{horarioLunes}],
            martes:[{horarioMartes}],
            miercoles:[{horarioMiercoles}],
            jueves:[{horarioJueves}],
            viernes:[{horarioViernes}]

        })
        .then(()=>{
            res.json({
                status:200,
                message:`Docente ${nombreDocente} actualizado`
            })
        })
        .catch(err=>{
            res.json({
                error:{
                    code:400,
                    message:"Docente no actualizado",
                    details:[
                        {
                            errorMessage:err
                        }
                    ]
                }
            })
        })
    }



    //eliminar docente
    async eliminarDocente(req, res){
        const {id} = req.params;

        await docenteModels.findByIdAndDelete(id)
        .then(()=>{
            res.json({
                status:200,
                message : `Docente ${id} eliminado`
            })
        })
        .catch(err=>{
            res.json({
                error:{
                    code:400,
                    message:"Docente no elimindo",
                    details:[
                        {
                            errorMessge:err
                        }
                    ]
                }
            })
        })
    }
}


module.exports = new docenteController;