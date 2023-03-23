const loginModels = require('../models/school.login.models');
const jwt = require('jsonwebtoken');
const validator = require('validator');


class loginController{


    //signup
    async signUp(req, res){

        const {userName, userPassword } = req.body;

        if(validator.default.isEmpty(userName)){
            res.json({
                error:{
                    code:400,
                    message:"Campo userName vacio",
                    details:[
                        {
                            errorMessage:'El campo userName no puede estar vacio'
                        }
                    ]
                }
            })

        }else if(validator.default.isEmpty(userPassword)){
            res.json({
                error:{
                    code:400,
                    message:"Campo userPassword vacio",
                    details:[
                        {
                            errorMessage:'El campo userPassword no puede estar vacio'
                        }
                    ]
                }
            })

        }else{

            const userFound = await loginModels.find({
                userName : userName,
                userPassword: userPassword
            })


        
    
            if(userFound.userName != null){
                res.json({
                    error:{
                        code:400,
                        message:"El usuario registrado",
                        details:[
                            {
                                errorMessage:`El usuario ${userName} ya esta registrado`
                            }
                        ]
                    }
                })
            }else{
                await loginModels(req.body)
                .save()
                .then(()=>{
                    res.json({
                        status:200,
                        message: `Usuario ${req.bodyuserName} registrado` 
                    })
                })
                .catch((err)=>{
                    res.json({
                        error:{
                            code:400,
                            message:"El usuario y contraseña ya existe",
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




    //login
    async loginUser(req, res){


        const {userName, userPassword } = req.body;

        const foundUser = await loginModels.find({
            userName : userName,
            userPassword: userPassword
        })

        if(foundUser.length === 0){
            
            res.json({
                error:{
                    code:400,
                    message:"unauthorized",
                    details:[
                        {
                            errorMessage:`El usuario ${userName} no esta autorizado, debe de registrarse`
                        }
                    ]
                }
            })

        }else{
            
            const {userName, userPassword} = req.body;
            const user = {userName : userName};
            const password = {userPassword : userPassword};

            const accessToken = jwt.sign(user, process.env.TOKEN_KEY, {expiresIn:'1h'});

            res.header('authorization', accessToken).json({
                status:200,
                message:`Usuario  ${userName} logueado`,
                token: accessToken
            })
        }
    }



    //validar token en los endpoint
    async validateUrlWithToken(req, res, next){
        const accessToken = req.headers['authorization'];
        if(!accessToken){
            res.status(400).send({message : 'Access is denied'});
        }else{
            
            jwt.verify(accessToken, process.env.TOKEN_KEY, (err, user)=>{
                if(err){
                    res.status(400).send({message : 'Access is dinied or token expired'});
                }else{
                    req.user = user;
                    next();
                }
            });
        }
        
    }

}


module.exports = new loginController;
